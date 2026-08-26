import { NextRequest } from "next/server";
import { AuthService } from "@/backend/services/auth.service";
import { AuthValidator } from "@/backend/validators/auth.validator";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = AuthValidator.validateLogin(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, AuthValidator.formatErrors(validation.error));
    }

    const authData = await AuthService.login(validation.data);

    const response = successResponse(authData, "Login successful", 200);

    // Set secure auth cookie
    response.cookies.set({
      name: "auth_token",
      value: authData.token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    if (error.message?.includes("Invalid email or password")) {
      return errorResponse(error.message, 401);
    }
    return serverErrorResponse(error.message || "Failed to log in");
  }
}
