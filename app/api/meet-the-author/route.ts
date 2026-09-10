import { NextRequest } from "next/server";
import { MeetTheAuthorService } from "@/backend/services/meetTheAuthor.service";
import { requireRole } from "@/backend/middleware/auth.middleware";
import { prisma } from "@/lib/prisma";
import {
  successResponse,
  forbiddenResponse,
  badRequestResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    if (id) {
      const profile = await MeetTheAuthorService.getProfileById(id);
      if (!profile) {
        return notFoundResponse("Author profile not found");
      }
      return successResponse(profile, "Author profile retrieved successfully");
    }

    if (name) {
      const profile = await MeetTheAuthorService.getProfileByAuthorName(name);
      return successResponse(profile, "Author profile retrieved successfully");
    }

    const authors = await MeetTheAuthorService.getAllProfiles();
    return successResponse(
      { authors, count: authors.length },
      "All Meet The Author profiles retrieved successfully"
    );
  } catch (error: any) {
    console.error("GET /api/meet-the-author error:", error);
    return serverErrorResponse(error.message || "Failed to retrieve Meet The Author profiles");
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireRole(req, "ADMIN");
    if (!admin) {
      return forbiddenResponse("Only administrators can create Meet The Author profiles.");
    }

    const body = await req.json();
    if (!body?.authorName || !body.authorName.trim()) {
      return badRequestResponse("Author name is required");
    }

    const created = await MeetTheAuthorService.createProfile(body);

    // Revalidate affected paths
    try {
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/", "layout");
      revalidatePath("/product/[slug]", "page");
      revalidatePath("/admin/meet-the-author");
    } catch {}

    return successResponse(created, "Author profile created successfully");
  } catch (error: any) {
    console.error("POST /api/meet-the-author error:", error);
    return serverErrorResponse(error.message || "Failed to create author profile");
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await requireRole(req, "ADMIN");
    if (!admin) {
      return forbiddenResponse("Only administrators can modify Meet The Author.");
    }

    const body = await req.json();
    if (!body?.authorName || !body.authorName.trim()) {
      return badRequestResponse("Author name is required");
    }

    const updated = await MeetTheAuthorService.updateProfile(body);

    // Revalidate affected pages
    try {
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/", "layout");
      revalidatePath("/product/[slug]", "page");
      revalidatePath("/admin/meet-the-author");
    } catch {}

    return successResponse(updated, "Meet The Author updated successfully");
  } catch (error: any) {
    console.error("PUT /api/meet-the-author error:", error);
    return serverErrorResponse(error.message || "Failed to update Meet The Author");
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = await requireRole(req, "ADMIN");
    if (!admin) {
      return forbiddenResponse("Only administrators can delete Meet The Author profiles.");
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return badRequestResponse("Profile ID is required to delete");
    }

    const deleted = await MeetTheAuthorService.deleteProfile(id);
    if (!deleted) {
      return serverErrorResponse("Failed to delete author profile");
    }

    // Revalidate affected pages
    try {
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/", "layout");
      revalidatePath("/product/[slug]", "page");
      revalidatePath("/admin/meet-the-author");
    } catch {}

    return successResponse({ id }, "Author profile removed from Meet The Author successfully");
  } catch (error: any) {
    console.error("DELETE /api/meet-the-author error:", error);
    return serverErrorResponse(error.message || "Failed to delete author profile");
  }
}
