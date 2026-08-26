import { NextRequest } from "next/server";
import { AuthService } from "@/backend/services/auth.service";
import { AuthValidator } from "@/backend/validators/auth.validator";
import { EmailService } from "@/backend/services/email.service";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = AuthValidator.validateRegister(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, AuthValidator.formatErrors(validation.error));
    }

    const { user, token } = await AuthService.register(validation.data);

    // Send async welcome email (non-blocking)
    EmailService.sendWelcomeEmail({ name: user.name, email: user.email }).catch(() => {});

    const response = successResponse({ user, token }, "User registered successfully", 201);
    
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
    if (error.message?.includes("already exists")) {
      return errorResponse(error.message, 409);
    }
    return serverErrorResponse(error.message || "Failed to register user");
  }
}
