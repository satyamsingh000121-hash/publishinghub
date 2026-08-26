import { NextRequest } from "next/server";
import { requireRole } from "@/backend/middleware/auth.middleware";
import { UserService } from "@/backend/services/user.service";
import { successResponse, forbiddenResponse, serverErrorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    // Only Admin can list all users
    const admin = await requireRole(req, "ADMIN");
    if (!admin) {
      return forbiddenResponse("Only administrators can view the user list.");
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || undefined;

    const result = await UserService.getAllUsers({ page, limit, search });

    return successResponse(result.users, "Users retrieved successfully", 200, {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    });
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
