import { NextRequest } from "next/server";
import { OrderService } from "@/backend/services/order.service";
import { OrderValidator } from "@/backend/validators/order.validator";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = OrderValidator.validateContactMessage(body);

    if (!validation.success) {
      return errorResponse("Validation error", 400, OrderValidator.formatErrors(validation.error));
    }

    const contact = await OrderService.submitContactMessage(validation.data);
    return successResponse(contact, "Your message has been sent successfully. We will get back to you shortly.", 201);
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
