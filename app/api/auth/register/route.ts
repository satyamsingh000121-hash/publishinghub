import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/auth.service";
import { AuthValidator } from "@/backend/validators/auth.validator";
import { EmailService } from "@/backend/services/email.service";
import { getAppBaseUrl } from "@/lib/baseUrl";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = AuthValidator.validateRegister(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, AuthValidator.formatErrors(validation.error));
    }

    const { user, token, rawResetToken, isRetry } = await AuthService.register(validation.data);

    // Resolve application base URL
    const baseUrl = getAppBaseUrl(req);
    const myAccountUrl = `${baseUrl}/my-account`;
    const passwordSetupUrl = rawResetToken
      ? `${baseUrl}/set-password?token=${rawResetToken}&email=${encodeURIComponent(user.email)}`
      : `${baseUrl}/my-account`;

    // Send welcome email through Resend
    const emailResult = await EmailService.sendWelcomeEmail({
      name: user.name,
      email: user.email,
      username: user.name,
      passwordSetupUrl,
      myAccountUrl,
    });

    // If Resend failed to send, do not claim success or return 201
    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: emailResult.error || "Failed to send welcome email via Resend.",
          data: {
            user,
            emailSent: false,
            emailError: emailResult.error,
            isRetry,
          },
        },
        { status: 502 }
      );
    }

    const response = successResponse(
      {
        user,
        token: validation.data.password ? token : undefined,
        emailSent: true,
        messageId: emailResult.messageId,
        isRetry,
      },
      `Account created successfully. A welcome email with your password setup link has been sent to ${user.email}.`,
      201
    );

    // Set secure auth cookie only if registered directly with a password
    if (validation.data.password) {
      response.cookies.set({
        name: "auth_token",
        value: token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
    }

    return response;
  } catch (error: any) {
    if (error.message?.includes("already exists")) {
      return errorResponse("An account with this email address already exists. Please log in.", 409);
    }
    return serverErrorResponse(error.message || "Failed to register user");
  }
}
