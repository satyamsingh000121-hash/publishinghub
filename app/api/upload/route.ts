import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return errorResponse("No file uploaded", 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads directory
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const rawExt = path.extname(file.name) || ".png";
    const ext = rawExt.toLowerCase();
    const baseName = path
      .basename(file.name, rawExt)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 30);

    const fileName = `${baseName || "cover"}_${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${fileName}`;

    return successResponse(
      {
        url: fileUrl,
        name: file.name,
        size: file.size,
      },
      "Image uploaded successfully"
    );
  } catch (error: any) {
    return serverErrorResponse(error.message || "Failed to upload file");
  }
}
