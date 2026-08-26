import { UserRepository } from "@/backend/repositories/user.repository";
import { comparePassword, hashPassword, signToken } from "@/lib/auth";
import { AuthResponseData, AuthSessionUser, UserDTO } from "@/types/user";

export class AuthService {
  static async register(data: {
    name: string;
    email: string;
    password: string;
    role?: string;
    phoneNumber?: string;
  }): Promise<{ user: UserDTO; token: string }> {
    const existing = await UserRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("User with this email already exists.");
    }

    const passwordHash = await hashPassword(data.password);
    const user = await UserRepository.create({
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role || "USER",
      phoneNumber: data.phoneNumber,
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

    return { user: userDTO, token };
  }

  static async login(data: {
    email: string;
    password: string;
  }): Promise<AuthResponseData> {
    const user = await UserRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isMatch = await comparePassword(data.password, user.passwordHash);
    if (!isMatch) {
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
