import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const srcPath = "C:\\Users\\91932\\.gemini\\antigravity-ide\\brain\\1e6146db-0349-4bb4-83fc-1d4c65552143\\.user_uploaded\\media_1789718959592.jpg";
    const destPath = path.join(process.cwd(), "public", "images", "shop_section_day.jpg");

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      const imageBuffer = fs.readFileSync(destPath);
      return new NextResponse(imageBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (fs.existsSync(destPath)) {
      const imageBuffer = fs.readFileSync(destPath);
      return new NextResponse(imageBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
    }

    return NextResponse.json({ error: "Day podium image not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
