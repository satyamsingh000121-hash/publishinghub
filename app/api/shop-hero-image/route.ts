import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const heroSrc = "C:\\Users\\91932\\.gemini\\antigravity-ide\\brain\\12ea05de-7d23-4741-9ca3-b9ea26ec5d2a\\shop_hero_banner_1788844324889.jpg";
  try {
    if (fs.existsSync(heroSrc)) {
      const fileBuffer = fs.readFileSync(heroSrc);
      try {
        const publicDir = path.join(process.cwd(), "public", "images");
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }
        const heroDest = path.join(publicDir, "shop_hero_banner.jpg");
        if (!fs.existsSync(heroDest)) {
          fs.writeFileSync(heroDest, fileBuffer);
        }
      } catch {}
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch {}
  return new NextResponse(null, { status: 404 });
}
