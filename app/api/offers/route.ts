import { OrderService } from "@/backend/services/order.service";
import { successResponse, serverErrorResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const offers = await OrderService.getOffers();
    return successResponse(offers, "Offers retrieved successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message);
  }
}
