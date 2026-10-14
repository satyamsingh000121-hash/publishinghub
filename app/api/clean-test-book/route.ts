import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: "Architecture" } },
          { title: { contains: "Test" } },
          { author: { contains: "TEST" } },
          { slug: { contains: "test" } },
        ],
      },
    });
    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
