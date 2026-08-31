import { NextRequest } from "next/server";
import { AnalyticsService } from "@/backend/services/analytics.service";
import { successResponse, serverErrorResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const data = await AnalyticsService.getDashboardData();
    return successResponse(data, "Dashboard analytics retrieved successfully");
  } catch (error: any) {
    return serverErrorResponse(error.message || "Failed to fetch analytics");
  }
}
