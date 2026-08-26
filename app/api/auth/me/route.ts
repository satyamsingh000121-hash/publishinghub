import { NextRequest } from "next/server";
import { authenticateRequest } from "@/backend/middleware/auth.middleware";
import { AuthService } from "@/backend/services/auth.service";
import { successResponse, unauthorizedResponse, serverErrorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const authUser = await authenticateRequest(req);
    if (!authUser) {
      return unauthorizedResponse();
    }

    const profile = await AuthService.getProfile(authUser.id);
    if (!profile) {
      return unauthorizedResponse("User not found");
    }

    return successResponse(profile, "User profile fetched successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
