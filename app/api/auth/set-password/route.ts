import { NextRequest } from "next/server";
import { AuthService } from "@/backend/services/auth.service";
import { AuthValidator } from "@/backend/validators/auth.validator";
import { signToken } from "@/lib/auth";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/api-response";
import { AuthSessionUser } from "@/types/user";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = AuthValidator.validateSetPassword(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, AuthValidator.formatErrors(validation.error));
    }

    const { user } = await AuthService.setPassword(validation.data);

    // Create session token for the user now that their password is secure
    const sessionUser: AuthSessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as any,
    };
    const token = signToken(sessionUser);

    const response = successResponse(
      { user, token },
      "Password has been set successfully. You are now logged in.",
      200
    );

    // Set secure auth cookie
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    if (error.message?.includes("Invalid or expired")) {
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error.message || "Failed to set password.");
  }
}
