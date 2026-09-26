import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureSchemaUpdated } from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { CreateReviewSchema } from "@/lib/validations";
import {
  successResponse,
  errorResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/lib/api-response";

export const dynamic = "force-dynamic";

export interface ReviewResponseItem {
  id: string;
  book_id: string;
  name: string;
  rating: number;
  review: string;
  created_at: string;
}

// GET: Fetch reviews for a specific book
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId")?.trim();
    const slug = searchParams.get("slug")?.trim();

    if (!bookId && !slug) {
      return badRequestResponse("Book ID or slug parameter is required.");
    }

    const targetId = bookId || slug || "";
    const targetSlug = slug || bookId || "";

    let reviews: ReviewResponseItem[] = [];
    let supabaseLoaded = false;

    // 1. Attempt retrieval from Supabase reviews table
    try {
      let query = supabase
        .from("reviews")
        .select("id, book_id, name, rating, review, created_at");

      if (targetId && targetSlug && targetId !== targetSlug) {
        query = query.or(`book_id.eq.${targetId},book_id.eq.${targetSlug}`);
      } else {
        query = query.eq("book_id", targetId);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        reviews = data.map((item: any) => ({
          id: String(item.id),
          book_id: String(item.book_id),
          name: String(item.name || "Verified Reader"),
          rating: Number(item.rating) || 5,
          review: String(item.review || ""),
          created_at: item.created_at ? new Date(item.created_at).toISOString() : new Date().toISOString(),
        }));
        supabaseLoaded = true;
      }
    } catch (err) {
      // Supabase connection or table not accessible yet, fall through to SQLite
    }

    // 2. Fallback to local SQLite if Supabase had an error or no records found
    if (!supabaseLoaded || reviews.length === 0) {
      try {
        await ensureSchemaUpdated();
        const localRows: any[] = await prisma.$queryRawUnsafe(
          `SELECT id, book_id, name, rating, review, created_at FROM Review WHERE book_id = ? OR book_id = ? ORDER BY created_at DESC`,
          targetId,
          targetSlug
        );

        if (localRows && localRows.length > 0) {
          const localMapped: ReviewResponseItem[] = localRows.map((r) => ({
            id: String(r.id),
            book_id: String(r.book_id),
            name: String(r.name || "Verified Reader"),
            rating: Number(r.rating) || 5,
            review: String(r.review || ""),
            created_at: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
          }));

          // Deduplicate if any items already exist from Supabase
          const existingIds = new Set(reviews.map((r) => r.id));
          for (const item of localMapped) {
            if (!existingIds.has(item.id)) {
              reviews.push(item);
            }
          }
        }
      } catch (err) {
        console.error("Local reviews query error:", err);
      }
    }

    return successResponse<ReviewResponseItem[]>(reviews);
  } catch (error: any) {
    console.error("GET /api/reviews error:", error);
    return serverErrorResponse("Failed to fetch reviews.");
  }
}

// POST: Submit a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Server-side validation with Zod
    const validationResult = CreateReviewSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const path = issue.path.join(".");
        fieldErrors[path] = issue.message;
      }
      return errorResponse("Please verify your review inputs.", 400, fieldErrors);
    }

    const { book_id, book_slug, name, email, rating, review } = validationResult.data;
    const reviewId = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const createdAt = new Date().toISOString();

    // 2. Persist to Supabase
    try {
      await supabase.from("reviews").insert([
        {
          id: reviewId,
          book_id: book_id.trim(),
          name: name.trim(),
          email: email.trim().toLowerCase(),
          rating,
          review: review.trim(),
          created_at: createdAt,
        },
      ]);
    } catch (sbError) {
      console.warn("Supabase review insert warning:", sbError);
    }

    // 3. Persist to SQLite
    try {
      await ensureSchemaUpdated();
      await prisma.$executeRawUnsafe(
        `INSERT INTO Review (id, book_id, name, email, rating, review, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        reviewId,
        book_id.trim(),
        name.trim(),
        email.trim().toLowerCase(),
        rating,
        review.trim(),
        createdAt
      );

      // Recalculate and update product reviewCount & rating in SQLite
      try {
        const stats: any[] = await prisma.$queryRawUnsafe(
          `SELECT count(*) as count, avg(rating) as avgRating FROM Review WHERE book_id = ? OR book_id = ?`,
          book_id.trim(),
          (book_slug || book_id).trim()
        );

        if (stats && stats.length > 0) {
          const totalCount = Number(stats[0].count ?? stats[0]["count(*)"] ?? 1);
          const avg = Number(stats[0].avgRating ?? stats[0]["avg(rating)"] ?? rating);
          await prisma.$executeRawUnsafe(
            `UPDATE Product SET reviewCount = ?, rating = ? WHERE id = ? OR slug = ?`,
            totalCount,
            avg,
            book_id.trim(),
            (book_slug || book_id).trim()
          );
        }
      } catch (statsErr) {
        // ignore product update error
      }
    } catch (sqliteErr) {
      console.error("SQLite review insert error:", sqliteErr);
    }

    const responseItem: ReviewResponseItem = {
      id: reviewId,
      book_id: book_id.trim(),
      name: name.trim(),
      rating,
      review: review.trim(),
      created_at: createdAt,
    };

    return successResponse(
      responseItem,
      "Your review has been submitted successfully.",
      201
    );
  } catch (error: any) {
    console.error("POST /api/reviews error:", error);
    return serverErrorResponse("Failed to submit review. Please try again.");
  }
}
