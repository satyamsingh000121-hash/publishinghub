import { NextRequest } from "next/server";
import { authenticateRequest, requireRole } from "@/backend/middleware/auth.middleware";
import { OrderService } from "@/backend/services/order.service";
import { OrderValidator } from "@/backend/validators/order.validator";
import { EmailService } from "@/backend/services/email.service";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  serverErrorResponse,
} from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const authUser = await authenticateRequest(req);
    if (!authUser) return unauthorizedResponse();

    // If admin, can view all orders or query by user
    if (authUser.role === "ADMIN") {
      const { searchParams } = new URL(req.url);
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "20", 10);
      const status = searchParams.get("status") || undefined;

      const result = await OrderService.getAllOrders({ page, limit, status });
      return successResponse(result.orders, "Orders retrieved successfully", 200, {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      });
    }

    // Regular user views their own orders
    const orders = await OrderService.getUserOrders(authUser.id);
    return successResponse(orders, "User orders retrieved successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await authenticateRequest(req);
    const body = await req.json();
    const validation = OrderValidator.validateCreateOrder(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, OrderValidator.formatErrors(validation.error));
    }

    const order = await OrderService.createOrder({
      userId: authUser?.id,
      customerName: validation.data.customerName,
      customerEmail: validation.data.customerEmail,
      customerPhone: validation.data.customerPhone,
      shippingAddress: validation.data.shippingAddress,
      paymentMethod: validation.data.paymentMethod,
      items: validation.data.items,
    });

    // Send order confirmation email
    EmailService.sendOrderConfirmation({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      totalAmount: order.totalAmount,
    }).catch(() => {});

    return successResponse(order, "Order placed successfully", 201);
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
