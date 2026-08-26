import { NextRequest } from "next/server";
import { ProductService } from "@/backend/services/product.service";
import { ProductValidator } from "@/backend/validators/product.validator";
import { requireRole } from "@/backend/middleware/auth.middleware";
import { successResponse, errorResponse, forbiddenResponse, serverErrorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const categories = await ProductService.getCategories();
    return successResponse(categories, "Categories retrieved successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireRole(req, "ADMIN");
    if (!admin) {
      return forbiddenResponse("Only administrators can create categories.");
    }

    const body = await req.json();
    const validation = ProductValidator.validateCreateCategory(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, ProductValidator.formatErrors(validation.error));
    }

    const category = await ProductService.createCategory(validation.data);
    return successResponse(category, "Category created successfully", 201);
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
