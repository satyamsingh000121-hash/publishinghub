import { notFoundResponse } from "@/lib/api-response";

export async function GET() {
  return notFoundResponse("Endpoint not available.");
}
