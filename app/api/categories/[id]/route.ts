import { NextRequest } from "next/server";
import { ProductService } from "@/backend/services/product.service";
import { requireRole } from "@/backend/middleware/auth.middleware";
import {
  successResponse,
  forbiddenResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const category = await ProductService.getCategoryById(params.id);
    if (!category) return notFoundResponse("Category not found");
    return successResponse(category, "Category details retrieved");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const admin = await requireRole(req, "ADMIN");
    if (!admin) return forbiddenResponse();

    const body = await req.json();
    const updated = await ProductService.updateCategory(params.id, body);
    return successResponse(updated, "Category updated successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const admin = await requireRole(req, "ADMIN");
    if (!admin) return forbiddenResponse();

    await ProductService.deleteCategory(params.id);
    return successResponse({ deleted: true }, "Category deleted successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
