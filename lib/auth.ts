import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthSessionUser } from "@/types/user";

const JWT_SECRET = process.env.JWT_SECRET || "publishinghub_dev_jwt_secret_key_849204820942";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * Hash a plain-text password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare a plain-text password with a hashed password
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Sign a JWT token containing user payload
 */
export function signToken(user: AuthSessionUser): string {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN as any,
    }
  );
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): AuthSessionUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthSessionUser;
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Extract Bearer token from Authorization header or cookie string
 */
export function extractTokenFromHeader(authHeader?: string | null): string | null {
  if (!authHeader) return null;
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }
  return authHeader.trim();
}
