import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const srcFile = path.join(
      process.cwd(),
      "public",
      "images",
      "ChatGPT Image Sep 22, 2026, 12_13_14 PM.png"
    );
    const destJpg = path.join(process.cwd(), "public", "images", "shop_section_day.jpg");
    const destPng = path.join(process.cwd(), "public", "images", "shop_section_day.png");

    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destPng);
      fs.copyFileSync(srcFile, destJpg);
      const imageBuffer = fs.readFileSync(srcFile);
      return new NextResponse(imageBuffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "no-store",
        },
      });
    }

    if (fs.existsSync(destPng)) {
      const imageBuffer = fs.readFileSync(destPng);
      return new NextResponse(imageBuffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "no-store",
        },
      });
    }

    return NextResponse.json({ error: "Source image not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
