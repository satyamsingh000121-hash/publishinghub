import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "@/backend/services/product.service";

export async function POST(req: NextRequest) {
  try {
    const result = await ProductService.syncLiveBooksToDb();
    return NextResponse.json({
      success: true,
      message: `Successfully synced ${result.count} live books to backend database!`,
      data: result,
    });
  } catch (error: any) {
    console.error("Error syncing live books:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to sync live books to database",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const result = await ProductService.syncLiveBooksToDb();
    return NextResponse.json({
      success: true,
      message: `Successfully synced ${result.count} live books to backend database!`,
      data: result,
    });
  } catch (error: any) {
    console.error("Error syncing live books:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to sync live books to database",
      },
      { status: 500 }
    );
  }
}
