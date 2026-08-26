import { NextRequest } from "next/server";
import { authenticateRequest } from "@/backend/middleware/auth.middleware";
import { OrderService } from "@/backend/services/order.service";
import {
  successResponse,
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
    const order = await OrderService.getOrderById(params.id);

    if (!order) {
      return notFoundResponse("Order not found");
    }

    // Allow user who created the order or admin to view
    if (order.userId && authUser?.id !== order.userId && authUser?.role !== "ADMIN") {
      return forbiddenResponse();
    }

    return successResponse(order, "Order details retrieved successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
