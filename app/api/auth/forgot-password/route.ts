import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/auth.service";
import { AuthValidator } from "@/backend/validators/auth.validator";
import { getAppBaseUrl } from "@/lib/baseUrl";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = AuthValidator.validateForgotPassword(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, AuthValidator.formatErrors(validation.error));
    }

    const baseUrl = getAppBaseUrl(req);
    const result = await AuthService.requestPasswordReset({
      email: validation.data.email,
      baseUrl,
    });

    // If account exists but email delivery failed via Resend
    if (result.userExists && !result.emailSent) {
      return NextResponse.json(
        {
          success: false,
          error: result.deliveryError || "Failed to send password reset email via Resend.",
          data: {
            emailSent: false,
            deliveryError: result.deliveryError,
          },
        },
        { status: 502 }
      );
    }

    // Generic safe success message to prevent user account enumeration
    return successResponse(
      { emailSent: result.emailSent },
      "If an account with this email address exists, a password reset link has been sent. Please check your inbox.",
      200
    );
  } catch (error: any) {
    console.error("[ForgotPasswordRoute] Error processing request:", error);
    return serverErrorResponse(error.message || "Failed to process password reset request.");
  }
}
