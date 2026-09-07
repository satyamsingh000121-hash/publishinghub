import { NextRequest } from "next/server";
import { ProductService } from "@/backend/services/product.service";
import { requireRole } from "@/backend/middleware/auth.middleware";
import {
  successResponse,
  errorResponse,
  forbiddenResponse,
  serverErrorResponse,
} from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
  try {
    const admin = await requireRole(req, "ADMIN");
    if (!admin) {
      return forbiddenResponse("Only administrators can reorder books.");
    }

    const body = await req.json();
    const ids: string[] = body?.ids;
    const startIndex: number = typeof body?.startIndex === "number" ? body.startIndex : 0;

    if (!Array.isArray(ids) || ids.length === 0) {
      return errorResponse("Missing or invalid 'ids' array in request body.", 400);
    }

    await ProductService.reorderProducts(ids, startIndex);
    return successResponse({ count: ids.length }, "Books order updated successfully");
  } catch (error: any) {
    console.error("Error reordering books:", error);
    return serverErrorResponse(error.message || "Failed to update books order");
  }
}
