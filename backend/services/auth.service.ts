import crypto from "crypto";
import { UserRepository } from "@/backend/repositories/user.repository";
import { EmailService } from "@/backend/services/email.service";
import { comparePassword, hashPassword, signToken } from "@/lib/auth";
import { AuthResponseData, AuthSessionUser, UserDTO } from "@/types/user";

export class AuthService {
  static async register(data: {
    email: string;
    name?: string;
    password?: string;
    role?: string;
    phoneNumber?: string;
  }): Promise<{
    user: UserDTO;
    token: string;
    rawResetToken?: string;
    resetTokenExpires?: Date;
    isRetry?: boolean;
  }> {
    const normalizedEmail = data.email.toLowerCase().trim();
    const existing = await UserRepository.findByEmail(normalizedEmail);
    if (existing) {
      // Check if account was created via email-only flow and is still awaiting password setup
      const hasPendingPasswordSetup = existing.passwordResetTokenHash !== null;

      // If user registered with a direct password or already completed password setup, block duplicate
      if (!hasPendingPasswordSetup || (data.password && data.password.trim() !== "")) {
        throw new Error("User with this email already exists.");
      }

      // Safe retry: generate a fresh single-use password setup token without creating a duplicate record
      const rawResetToken = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(rawResetToken).digest("hex");
      const resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const updatedUser = await UserRepository.setPasswordResetToken(
        existing.id,
        tokenHash,
        resetTokenExpires
      );

      const sessionUser: AuthSessionUser = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role as any,
      };

      const token = signToken(sessionUser);

      const userDTO: UserDTO = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role as any,
        avatar: updatedUser.avatar,
        phoneNumber: updatedUser.phoneNumber,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      };

      return {
        user: userDTO,
        token,
        rawResetToken,
        resetTokenExpires,
        isRetry: true,
      };
    }

    const displayName = data.name?.trim() || normalizedEmail.split("@")[0];
    let passwordHash: string;
    let rawResetToken: string | undefined;
    let tokenHash: string | undefined;
    let resetTokenExpires: Date | undefined;

    if (data.password && data.password.trim() !== "") {
      passwordHash = await hashPassword(data.password);
    } else {
      // Email-only registration: generate unguessable temporary password hash
      const randomSecret = crypto.randomBytes(32).toString("hex");
      passwordHash = await hashPassword(randomSecret);

      // Generate secure single-use password setup token (valid for 24 hours)
      rawResetToken = crypto.randomBytes(32).toString("hex");
      tokenHash = crypto.createHash("sha256").update(rawResetToken).digest("hex");
      resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }

    const user = await UserRepository.create({
      name: displayName,
      email: normalizedEmail,
      passwordHash,
      role: data.role || "USER",
      phoneNumber: data.phoneNumber,
      passwordResetTokenHash: tokenHash || null,
      passwordResetExpires: resetTokenExpires || null,
    });

    const sessionUser: AuthSessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as any,
    };

    const token = signToken(sessionUser);

    const userDTO: UserDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as any,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return {
      user: userDTO,
      token,
      rawResetToken,
      resetTokenExpires,
      isRetry: false,
    };
  }

  static async setPassword(data: {
    token: string;
    email: string;
    password: string;
  }): Promise<{ user: UserDTO }> {
    const normalizedEmail = data.email.toLowerCase().trim();
    const tokenHash = crypto.createHash("sha256").update(data.token.trim()).digest("hex");

    const user = await UserRepository.findByResetTokenHash(tokenHash);

    if (!user || user.email.toLowerCase() !== normalizedEmail) {
      throw new Error("Invalid or expired password setup link. Please request a new one.");
    }

    // Hash the new user password
    const newPasswordHash = await hashPassword(data.password);

    // Invalidate the token immediately and update password
    const updatedUser = await UserRepository.updatePasswordAndClearToken(user.id, newPasswordHash);

    const userDTO: UserDTO = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role as any,
      avatar: updatedUser.avatar,
      phoneNumber: updatedUser.phoneNumber,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    return { user: userDTO };
  }

  static async requestPasswordReset(data: {
    email: string;
    baseUrl: string;
  }): Promise<{
    userExists: boolean;
    emailSent: boolean;
    messageId?: string;
    deliveryError?: string;
  }> {
    const normalizedEmail = data.email.toLowerCase().trim();
    const user = await UserRepository.findByEmail(normalizedEmail);

    if (!user) {
      // User not found: do not disclose existence to prevent user enumeration
      return {
        userExists: false,
        emailSent: false,
      };
    }

    // Generate cryptographically secure random 32-byte hex token
    const rawResetToken = crypto.randomBytes(32).toString("hex");
    // Generate SHA-256 hash for secure database storage
    const tokenHash = crypto.createHash("sha256").update(rawResetToken).digest("hex");
    // Set expiration time to 1 hour
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

    // Save token hash and expiry to database
    await UserRepository.setPasswordResetToken(user.id, tokenHash, resetTokenExpires);

    // Resolve reset link to existing set-password page
    const resetUrl = `${data.baseUrl}/set-password?token=${rawResetToken}&email=${encodeURIComponent(user.email)}`;

    // Dispatch email via Resend
    const emailResult = await EmailService.sendPasswordResetEmail({
      name: user.name,
      email: user.email,
      resetUrl,
    });

    if (!emailResult.success) {
      return {
        userExists: true,
        emailSent: false,
        deliveryError: emailResult.error || "Failed to send password reset email via Resend.",
      };
    }

    return {
      userExists: true,
      emailSent: true,
      messageId: emailResult.messageId,
    };
  }

  static async login(data: {
    email: string;
    password: string;
  }): Promise<AuthResponseData> {
    const user = await UserRepository.findByEmailOrUsername(data.email);
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isMatch = await comparePassword(data.password, user.passwordHash);
    if (!isMatch) {
      if (user.passwordResetTokenHash !== null && user.passwordResetExpires && user.passwordResetExpires > new Date()) {
        throw new Error("Your account was created via email registration, but your password is not set yet. Please check your inbox for the 'Set Your Password' link.");
      }
      throw new Error("Invalid email or password.");
    }

    const sessionUser: AuthSessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as any,
    };

    const token = signToken(sessionUser);

    const userDTO: UserDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as any,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return {
      user: userDTO,
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    };
  }

  static async getProfile(userId: string): Promise<UserDTO | null> {
    const user = await UserRepository.findById(userId);
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as any,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
