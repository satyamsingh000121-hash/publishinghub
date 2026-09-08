import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const sidebarSrc = "C:\\Users\\91932\\.gemini\\antigravity-ide\\brain\\12ea05de-7d23-4741-9ca3-b9ea26ec5d2a\\sidebar_read_more_1788844341758.jpg";
  try {
    if (fs.existsSync(sidebarSrc)) {
      const fileBuffer = fs.readFileSync(sidebarSrc);
      try {
        const publicDir = path.join(process.cwd(), "public", "images");
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }
        const sidebarDest = path.join(publicDir, "shop_sidebar_books.jpg");
        if (!fs.existsSync(sidebarDest)) {
          fs.writeFileSync(sidebarDest, fileBuffer);
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
