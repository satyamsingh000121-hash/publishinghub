import { NextRequest } from "next/server";
import { authenticateRequest } from "@/backend/middleware/auth.middleware";
import { OrderService } from "@/backend/services/order.service";
import { OrderValidator } from "@/backend/validators/order.validator";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const authUser = await authenticateRequest(req);
    const sessionId = req.headers.get("x-session-id") || req.cookies.get("cart_session_id")?.value;

    const cart = await OrderService.getCart(authUser?.id, sessionId || undefined);
    return successResponse(cart, "Cart retrieved successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await authenticateRequest(req);
    const sessionId = req.headers.get("x-session-id") || req.cookies.get("cart_session_id")?.value;

    const body = await req.json();
    const validation = OrderValidator.validateAddToCart(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, OrderValidator.formatErrors(validation.error));
    }

    const cart = await OrderService.addToCart({
      userId: authUser?.id,
      sessionId: sessionId || undefined,
      productId: validation.data.productId,
      quantity: validation.data.quantity,
    });

    return successResponse(cart, "Item added to cart successfully", 200);
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authUser = await authenticateRequest(req);
    const sessionId = req.headers.get("x-session-id") || req.cookies.get("cart_session_id")?.value;

    const body = await req.json();
    const validation = OrderValidator.validateUpdateCartItem(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, OrderValidator.formatErrors(validation.error));
    }

    const cart = await OrderService.updateCartItem({
      userId: authUser?.id,
      sessionId: sessionId || undefined,
      productId: validation.data.productId,
      quantity: validation.data.quantity,
    });

    return successResponse(cart, "Cart updated successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authUser = await authenticateRequest(req);
    const sessionId = req.headers.get("x-session-id") || req.cookies.get("cart_session_id")?.value;

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    let cart;
    if (productId) {
      cart = await OrderService.removeCartItem({
        userId: authUser?.id,
        sessionId: sessionId || undefined,
        productId,
      });
    } else {
      cart = await OrderService.clearCart(authUser?.id, sessionId || undefined);
    }

    return successResponse(cart, "Cart item removed successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
