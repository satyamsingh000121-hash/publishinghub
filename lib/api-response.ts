import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api";

export function successResponse<T>(data?: T, message?: string, status = 200, meta?: ApiResponse["meta"]) {
  const body: ApiResponse<T> = {
    success: true,
    ...(message ? { message } : {}),
    ...(data !== undefined ? { data } : {}),
    ...(meta ? { meta } : {}),
  };
  return NextResponse.json(body, { status });
}

export function errorResponse(error: string, status = 400, errors?: Record<string, string[] | string>) {
  const body: ApiResponse = {
    success: false,
    error,
    ...(errors ? { errors } : {}),
  };
  return NextResponse.json(body, { status });
}

export function unauthorizedResponse(message = "Unauthorized. Please authenticate to proceed.") {
  return errorResponse(message, 401);
}

export function forbiddenResponse(message = "Forbidden. You do not have permission to perform this action.") {
  return errorResponse(message, 403);
}

export function notFoundResponse(message = "Resource not found.") {
  return errorResponse(message, 404);
}

export function serverErrorResponse(message = "Internal server error. Please try again later.") {
  return errorResponse(message, 500);
}
