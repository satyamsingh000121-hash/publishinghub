import { NextRequest } from "next/server";
import { OrderService } from "@/backend/services/order.service";
import { OrderValidator } from "@/backend/validators/order.validator";
import { EmailService } from "@/backend/services/email.service";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = OrderValidator.validateNewsletter(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, OrderValidator.formatErrors(validation.error));
    }

    const subscriber = await OrderService.subscribeNewsletter(validation.data.email);
    EmailService.sendNewsletterWelcome(subscriber.email).catch(() => {});

    return successResponse(subscriber, "Subscribed to newsletter successfully", 201);
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
