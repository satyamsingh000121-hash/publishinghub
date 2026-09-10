import { prisma } from "@/lib/prisma";
import { ensureSchemaUpdated } from "@/lib/db";
import {
  MeetTheAuthorProfileData,
  CreateMeetTheAuthorPayload,
  UpdateMeetTheAuthorPayload,
  MeetTheAuthorBookItem,
} from "@/types/meetTheAuthor";

export class MeetTheAuthorService {
  /**
   * Helper to format author name
   */
  private static formatName(name: string): string {
    const trimmed = name.trim();
    if (trimmed.length > 2 && trimmed === trimmed.toUpperCase()) {
      return trimmed
        .toLowerCase()
        .split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }
    return trimmed;
  }

  /**
   * Auto-discover authors from existing Product database (Disabled to prevent resurrecting deleted authors)
   */
  private static async syncAuthorsFromProducts(): Promise<void> {
    // Disabled: authors are managed independently in Meet The Author section
    return;
  }

  /**
   * Fetch all Meet The Author profiles with their ordered books
   */
  static async getAllProfiles(): Promise<MeetTheAuthorProfileData[]> {
    await ensureSchemaUpdated();

    try {
      const profiles: any[] = await prisma.$queryRawUnsafe(
        `SELECT * FROM MeetTheAuthorProfile ORDER BY authorName ASC`
      );

      if (!profiles || profiles.length === 0) {
        return [];
      }

      const results: MeetTheAuthorProfileData[] = [];

      for (const prof of profiles) {
        const books = await this.getBooksForProfile(prof.id);
        results.push({
          id: prof.id,
          authorName: prof.authorName,
          authorImage: prof.authorImage || "/images/author-01.jpg",
          quote: prof.quote || "",
          facebook: prof.facebook || "#facebook",
          twitter: prof.twitter || "#twitter",
          linkedin: prof.linkedin || "#linkedin",
          instagram: prof.instagram || "#instagram",
          books,
          createdAt: prof.createdAt,
          updatedAt: prof.updatedAt,
        });
      }

      return results;
    } catch (e) {
      console.error("Error querying getAllProfiles:", e);
      return [];
    }
  }

  /**
   * Helper: Fetch ordered books for a specific profile ID
   */
  private static async getBooksForProfile(profileId: string): Promise<MeetTheAuthorBookItem[]> {
    try {
      const selectedRows: Array<{ productId: string; order: number }> =
        await prisma.$queryRawUnsafe(
          `SELECT productId, "order" FROM MeetTheAuthorBook WHERE profileId = ? ORDER BY "order" ASC`,
          profileId
        );

      if (!selectedRows || selectedRows.length === 0) {
        return [];
      }

      const productIds = selectedRows.map((r) => r.productId);
      const dbProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      const prodMap = new Map(dbProducts.map((p) => [p.id, p]));

      return selectedRows
        .map((r) => {
          const prod = prodMap.get(r.productId);
          if (!prod) return null;
          return {
            id: prod.id,
            title: prod.title,
            author: prod.author,
            price: prod.price,
            oldPrice: prod.originalPrice || undefined,
            image: prod.image,
            slug: prod.slug,
            badge: prod.badge || undefined,
            order: r.order,
          };
        })
        .filter(Boolean) as MeetTheAuthorBookItem[];
    } catch (e) {
      console.error("Error querying books for profile:", profileId, e);
      return [];
    }
  }

  /**
   * Fetch single profile by ID
   */
  static async getProfileById(id: string): Promise<MeetTheAuthorProfileData | null> {
    await ensureSchemaUpdated();

    try {
      const rows: any[] = await prisma.$queryRawUnsafe(
        `SELECT * FROM MeetTheAuthorProfile WHERE id = ? LIMIT 1`,
        id
      );

      if (!rows || rows.length === 0) {
        return null;
      }

      const prof = rows[0];
      const books = await this.getBooksForProfile(prof.id);

      return {
        id: prof.id,
        authorName: prof.authorName,
        authorImage: prof.authorImage || "/images/author-01.jpg",
        quote: prof.quote || "",
        facebook: prof.facebook || "#facebook",
        twitter: prof.twitter || "#twitter",
        linkedin: prof.linkedin || "#linkedin",
        instagram: prof.instagram || "#instagram",
        books,
        createdAt: prof.createdAt,
        updatedAt: prof.updatedAt,
      };
    } catch (e) {
      console.error("Error in getProfileById:", e);
      return null;
    }
  }

  /**
   * Fetch profile by author name (case-insensitive)
   */
  static async getProfileByAuthorName(authorName: string): Promise<MeetTheAuthorProfileData | null> {
    await ensureSchemaUpdated();

    if (!authorName) return null;
    const clean = authorName.toLowerCase().trim();

    try {
      const rows: any[] = await prisma.$queryRawUnsafe(
        `SELECT * FROM MeetTheAuthorProfile WHERE LOWER(authorName) = ? LIMIT 1`,
        clean
      );

      if (rows && rows.length > 0) {
        const prof = rows[0];
        const books = await this.getBooksForProfile(prof.id);
        return {
          id: prof.id,
          authorName: prof.authorName,
          authorImage: prof.authorImage || "/images/author-01.jpg",
          quote: prof.quote || "",
          facebook: prof.facebook || "#facebook",
          twitter: prof.twitter || "#twitter",
          linkedin: prof.linkedin || "#linkedin",
          instagram: prof.instagram || "#instagram",
          books,
        };
      }

      // Fuzzy / partial search fallback
      const allRows: any[] = await prisma.$queryRawUnsafe(
        `SELECT * FROM MeetTheAuthorProfile`
      );
      for (const row of allRows) {
        const rName = (row.authorName || "").toLowerCase().trim();
        if (rName && (rName === clean || rName.includes(clean) || clean.includes(rName))) {
          const books = await this.getBooksForProfile(row.id);
          return {
            id: row.id,
            authorName: row.authorName,
            authorImage: row.authorImage || "/images/author-01.jpg",
            quote: row.quote || "",
            facebook: row.facebook || "#facebook",
            twitter: row.twitter || "#twitter",
            linkedin: row.linkedin || "#linkedin",
            instagram: row.instagram || "#instagram",
            books,
          };
        }
      }
    } catch (e) {
      console.error("Error in getProfileByAuthorName:", e);
    }

    return null;
  }

  /**
   * Default single profile fetcher for backward compatibility
   */
  static async getProfile(): Promise<MeetTheAuthorProfileData> {
    const all = await this.getAllProfiles();
    if (all.length > 0) {
      // Find "default" or first profile
      const defaultProf = all.find((p) => p.id === "default") || all[0];
      return defaultProf;
    }

    return {
      id: "default",
      authorName: "Santosh Kumar Mishra",
      authorImage: "/images/Gemini_Generated_Image_f41einf41einf41e.png",
      quote: "Empowering readers through transformative stories and visionary leadership.",
      facebook: "#facebook",
      twitter: "#twitter",
      linkedin: "#linkedin",
      instagram: "#instagram",
      books: [],
    };
  }

  /**
   * Create a new author profile and assign books
   */
  static async createProfile(payload: CreateMeetTheAuthorPayload): Promise<MeetTheAuthorProfileData> {
    await ensureSchemaUpdated();

    const authorName = this.formatName(payload.authorName || "New Author");
    const authorImage = payload.authorImage?.trim() || "/images/author-01.jpg";
    const quote = payload.quote?.trim() || "";
    const facebook = payload.facebook?.trim() || "#facebook";
    const twitter = payload.twitter?.trim() || "#twitter";
    const linkedin = payload.linkedin?.trim() || "#linkedin";
    const instagram = payload.instagram?.trim() || "#instagram";

    // Check if profile with same author name already exists
    const existing: any[] = await prisma.$queryRawUnsafe(
      `SELECT id FROM MeetTheAuthorProfile WHERE LOWER(TRIM(authorName)) = LOWER(?) LIMIT 1`,
      authorName.trim()
    );

    if (existing && existing.length > 0) {
      return this.updateProfile({
        id: existing[0].id,
        authorName,
        authorImage,
        quote,
        facebook,
        twitter,
        linkedin,
        instagram,
        bookIds: payload.bookIds,
      });
    }

    const id = `mta_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    // 1. Insert into MeetTheAuthorProfile
    await prisma.$executeRawUnsafe(
      `INSERT INTO MeetTheAuthorProfile (id, authorName, authorImage, quote, facebook, twitter, linkedin, instagram, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      id,
      authorName,
      authorImage,
      quote,
      facebook,
      twitter,
      linkedin,
      instagram
    );

    // 2. Insert assigned books with order
    if (Array.isArray(payload.bookIds) && payload.bookIds.length > 0) {
      for (let i = 0; i < payload.bookIds.length; i++) {
        const pId = payload.bookIds[i];
        const rowId = `mta_b_${Date.now()}_${i}`;
        try {
          await prisma.$executeRawUnsafe(
            `INSERT INTO MeetTheAuthorBook (id, profileId, productId, "order") VALUES (?, ?, ?, ?)`,
            rowId,
            id,
            pId,
            i
          );
        } catch (e) {
          console.error("Error inserting MeetTheAuthorBook:", e);
        }
      }
    }

    // 3. Synchronize with Author table
    await this.syncToAuthorTable(authorName, authorImage, quote, facebook, twitter, linkedin, instagram);

    const created = await this.getProfileById(id);
    return created!;
  }

  /**
   * Update an existing author profile and its assigned books
   */
  static async updateProfile(payload: UpdateMeetTheAuthorPayload): Promise<MeetTheAuthorProfileData> {
    await ensureSchemaUpdated();

    const id = payload.id || "default";
    const authorName = this.formatName(payload.authorName || "Author");
    const authorImage = payload.authorImage?.trim() || "/images/author-01.jpg";
    const quote = payload.quote?.trim() || "";
    const facebook = payload.facebook?.trim() || "";
    const twitter = payload.twitter?.trim() || "";
    const linkedin = payload.linkedin?.trim() || "";
    const instagram = payload.instagram?.trim() || "";

    // 1. Upsert profile table
    await prisma.$executeRawUnsafe(
      `INSERT INTO MeetTheAuthorProfile (id, authorName, authorImage, quote, facebook, twitter, linkedin, instagram, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(id) DO UPDATE SET
         authorName = excluded.authorName,
         authorImage = excluded.authorImage,
         quote = excluded.quote,
         facebook = excluded.facebook,
         twitter = excluded.twitter,
         linkedin = excluded.linkedin,
         instagram = excluded.instagram,
         updatedAt = CURRENT_TIMESTAMP`,
      id,
      authorName,
      authorImage,
      quote,
      facebook,
      twitter,
      linkedin,
      instagram
    );

    // 2. Clear old books mapping for this specific profile ID
    await prisma.$executeRawUnsafe(
      `DELETE FROM MeetTheAuthorBook WHERE profileId = ?`,
      id
    );

    // 3. Insert newly ordered books for this author profile
    if (Array.isArray(payload.bookIds) && payload.bookIds.length > 0) {
      for (let i = 0; i < payload.bookIds.length; i++) {
        const pId = payload.bookIds[i];
        const rowId = `mta_b_${Date.now()}_${i}`;
        try {
          await prisma.$executeRawUnsafe(
            `INSERT INTO MeetTheAuthorBook (id, profileId, productId, "order") VALUES (?, ?, ?, ?)`,
            rowId,
            id,
            pId,
            i
          );
        } catch (e) {
          console.error("Error inserting MeetTheAuthorBook row:", e);
        }
      }
    }

    // 4. Synchronize with Author table
    await this.syncToAuthorTable(authorName, authorImage, quote, facebook, twitter, linkedin, instagram);

    const updated = await this.getProfileById(id);
    return updated!;
  }

  /**
   * Delete an author profile and its book relationships. NEVER touches Product table.
   */
  static async deleteProfile(id: string): Promise<boolean> {
    await ensureSchemaUpdated();

    try {
      // 1. Remove only the MeetTheAuthorBook relationships for this profile
      await prisma.$executeRawUnsafe(
        `DELETE FROM MeetTheAuthorBook WHERE profileId = ?`,
        id
      );

      // 2. Remove the author profile record
      await prisma.$executeRawUnsafe(
        `DELETE FROM MeetTheAuthorProfile WHERE id = ?`,
        id
      );

      return true;
    } catch (e) {
      console.error("Error deleting MeetTheAuthorProfile:", id, e);
      return false;
    }
  }

  /**
   * Sync profile data to Author table
   */
  private static async syncToAuthorTable(
    authorName: string,
    authorImage: string,
    quote: string,
    facebook?: string,
    twitter?: string,
    linkedin?: string,
    instagram?: string
  ): Promise<void> {
    try {
      const existingAuthors: any[] = await prisma.$queryRawUnsafe(
        `SELECT id FROM Author WHERE LOWER(name) = LOWER(?) LIMIT 1`,
        authorName
      );

      if (existingAuthors && existingAuthors.length > 0) {
        await prisma.$executeRawUnsafe(
          `UPDATE Author SET
             name = ?,
             image = ?,
             tagline = ?,
             bio = ?,
             facebook = ?,
             twitter = ?,
             linkedin = ?,
             instagram = ?,
             updatedAt = CURRENT_TIMESTAMP
           WHERE id = ?`,
          authorName,
          authorImage,
          quote,
          quote,
          facebook || "",
          twitter || "",
          linkedin || "",
          instagram || "",
          existingAuthors[0].id
        );
      } else {
        const authorId = `auth_${Date.now()}`;
        const baseSlug = authorName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") || `author-${Date.now()}`;
        const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

        await prisma.$executeRawUnsafe(
          `INSERT INTO Author (id, name, slug, image, bio, tagline, facebook, twitter, linkedin, instagram, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
          authorId,
          authorName,
          uniqueSlug,
          authorImage,
          quote,
          quote,
          facebook || "",
          twitter || "",
          linkedin || "",
          instagram || ""
        );
      }
    } catch (e) {
      console.error("Error syncing Author table in MeetTheAuthorService:", e);
    }
  }
}
