import { NextRequest } from "next/server";
import { ProductService } from "@/backend/services/product.service";
import { ProductValidator } from "@/backend/validators/product.validator";
import { requireRole } from "@/backend/middleware/auth.middleware";
import { successResponse, errorResponse, forbiddenResponse, serverErrorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const author = searchParams.get("author") || undefined;
    const search = searchParams.get("search") || undefined;
    const badge = searchParams.get("badge") || undefined;
    const availability = searchParams.get("availability") || undefined;
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
    const sortBy = (searchParams.get("sortBy") as any) || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "24", 10);

    const result = await ProductService.getProducts({
      category,
      author,
      search,
      badge,
      availability,
      minPrice,
      maxPrice,
      sortBy,
      page,
      limit,
    });

    return successResponse(result.products, "Products retrieved successfully", 200, {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    });
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireRole(req, "ADMIN");
    if (!admin) {
      return forbiddenResponse("Only administrators can create new products.");
    }

    const body = await req.json();
    const validation = ProductValidator.validateCreateProduct(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, ProductValidator.formatErrors(validation.error));
    }

    const product = await ProductService.createProduct(validation.data);
    return successResponse(product, "Product created successfully", 201);
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
