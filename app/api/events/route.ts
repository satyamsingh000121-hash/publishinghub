import { OrderService } from "@/backend/services/order.service";
import { successResponse, serverErrorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const events = await OrderService.getEvents();
    return successResponse(events, "Events retrieved successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
