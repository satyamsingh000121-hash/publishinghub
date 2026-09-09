import { NextRequest } from "next/server";
import { MeetTheAuthorService } from "@/backend/services/meetTheAuthor.service";
import { requireRole } from "@/backend/middleware/auth.middleware";
import { successResponse, forbiddenResponse, serverErrorResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await MeetTheAuthorService.getProfile();
    return successResponse(data, "Meet The Author profile retrieved successfully");
  } catch (error: any) {
    console.error("GET /api/meet-the-author error:", error);
    return serverErrorResponse(error.message || "Failed to retrieve Meet The Author profile");
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await requireRole(req, "ADMIN");
    if (!admin) {
      return forbiddenResponse("Only administrators can modify Meet The Author.");
    }

    const body = await req.json();
    const updated = await MeetTheAuthorService.updateProfile(body);

    // Revalidate affected pages
    try {
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/product/[slug]", "page");
      revalidatePath("/product", "page");
      revalidatePath("/admin/meet-the-author");
    } catch (e) {
      // ignore
    }

    return successResponse(updated, "Meet The Author updated successfully");
  } catch (error: any) {
    console.error("PUT /api/meet-the-author error:", error);
    return serverErrorResponse(error.message || "Failed to update Meet The Author");
  }
}

export async function POST(req: NextRequest) {
  return PUT(req);
}
