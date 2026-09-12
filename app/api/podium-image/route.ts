import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const srcPath = "C:\\Users\\91932\\.gemini\\antigravity-ide\\brain\\11facf95-9273-4326-9f27-b20b1549241e\\green_marble_podium_1789202109049.jpg";
    const destPath = path.join(process.cwd(), "public", "images", "green_marble_podium.jpg");

    if (fs.existsSync(srcPath)) {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
      const imageBuffer = fs.readFileSync(srcPath);
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

    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
