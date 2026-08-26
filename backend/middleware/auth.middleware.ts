import { NextRequest } from "next/server";
import { extractTokenFromHeader, verifyToken } from "@/lib/auth";
import { AuthSessionUser, UserRole } from "@/types/user";

export interface AuthContext {
  user: AuthSessionUser;
}

/**
 * Authenticate incoming request via Authorization header or auth_token cookie
 */
export async function authenticateRequest(req: NextRequest): Promise<AuthSessionUser | null> {
  // 1. Try Authorization header
  const authHeader = req.headers.get("authorization");
  const tokenFromHeader = extractTokenFromHeader(authHeader);

  if (tokenFromHeader) {
    const user = verifyToken(tokenFromHeader);
    if (user) return user;
  }

  // 2. Try cookie
  const cookieToken = req.cookies.get("auth_token")?.value;
  if (cookieToken) {
    const user = verifyToken(cookieToken);
    if (user) return user;
  }

  return null;
}

/**
 * Require authentication or throw/return null
 */
export async function requireAuth(req: NextRequest): Promise<AuthSessionUser | null> {
  return authenticateRequest(req);
}

/**
 * Require specific role (e.g. ADMIN)
 */
export async function requireRole(req: NextRequest, requiredRole: UserRole): Promise<AuthSessionUser | null> {
  const user = await authenticateRequest(req);
  if (!user) return null;
  if (user.role !== requiredRole && user.role !== "ADMIN") return null;
  return user;
}
