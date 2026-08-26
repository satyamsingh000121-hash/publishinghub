import { NextRequest } from "next/server";
import { ProductService } from "@/backend/services/product.service";
import { ProductValidator } from "@/backend/validators/product.validator";
import { requireRole } from "@/backend/middleware/auth.middleware";
import {
  successResponse,
  errorResponse,
  forbiddenResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    // Check by ID or Slug
    let product = await ProductService.getProductById(params.id);
    if (!product) {
      product = await ProductService.getProductBySlug(params.id);
    }

    if (!product) {
      return notFoundResponse(`Product '${params.id}' not found.`);
    }

    return successResponse(product, "Product fetched successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const admin = await requireRole(req, "ADMIN");
    if (!admin) {
      return forbiddenResponse("Only administrators can update products.");
    }

    const body = await req.json();
    const validation = ProductValidator.validateUpdateProduct(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, ProductValidator.formatErrors(validation.error));
    }

    const updated = await ProductService.updateProduct(params.id, validation.data);
    return successResponse(updated, "Product updated successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const admin = await requireRole(req, "ADMIN");
    if (!admin) {
      return forbiddenResponse("Only administrators can delete products.");
    }

    await ProductService.deleteProduct(params.id);
    return successResponse({ deleted: true }, "Product deleted successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
