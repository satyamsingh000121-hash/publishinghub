import { NextRequest } from "next/server";
import { authenticateRequest } from "@/backend/middleware/auth.middleware";
import { UserService } from "@/backend/services/user.service";
import { AuthValidator } from "@/backend/validators/auth.validator";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const authUser = await authenticateRequest(req);
    if (!authUser) return unauthorizedResponse();

    // User can view their own profile, or Admin can view any profile
    if (authUser.id !== params.id && authUser.role !== "ADMIN") {
      return forbiddenResponse();
    }

    const user = await UserService.getUserById(params.id);
    if (!user) return notFoundResponse("User not found");

    return successResponse(user, "User details retrieved successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const authUser = await authenticateRequest(req);
    if (!authUser) return unauthorizedResponse();

    // User can update their own profile, or Admin can update any
    if (authUser.id !== params.id && authUser.role !== "ADMIN") {
      return forbiddenResponse();
    }

    const body = await req.json();
    const validation = AuthValidator.validateUpdateProfile(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, AuthValidator.formatErrors(validation.error));
    }

    const updatedUser = await UserService.updateUser(params.id, validation.data);
    return successResponse(updatedUser, "Profile updated successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const authUser = await authenticateRequest(req);
    if (!authUser) return unauthorizedResponse();

    if (authUser.id !== params.id && authUser.role !== "ADMIN") {
      return forbiddenResponse();
    }

    await UserService.deleteUser(params.id);
    return successResponse({ deleted: true }, "User account deleted successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
