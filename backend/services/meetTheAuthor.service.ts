import { prisma } from "@/lib/prisma";
import { ensureSchemaUpdated } from "@/lib/db";
import { MeetTheAuthorProfileData, UpdateMeetTheAuthorPayload, MeetTheAuthorBookItem } from "@/types/meetTheAuthor";

export class MeetTheAuthorService {
  /**
   * Fetch the current Meet The Author profile and its ordered books
   */
  static async getProfile(): Promise<MeetTheAuthorProfileData> {
    await ensureSchemaUpdated();

    // 1. Fetch profile record
    let profile: any = null;
    try {
      const rows: any[] = await prisma.$queryRawUnsafe(
        `SELECT * FROM MeetTheAuthorProfile WHERE id = 'default' LIMIT 1`
      );
      if (rows && rows.length > 0) {
        profile = rows[0];
      }
    } catch (e) {
      console.error("Error querying MeetTheAuthorProfile:", e);
    }

    const defaultProfile = {
      id: "default",
      authorName: profile?.authorName || "Santosh Kumar Mishra",
      authorImage: profile?.authorImage || "/images/Gemini_Generated_Image_f41einf41einf41e.png",
      quote: profile?.quote || "Empowering readers through transformative stories and visionary leadership.",
      facebook: profile?.facebook || "#facebook",
      twitter: profile?.twitter || "#twitter",
      linkedin: profile?.linkedin || "#linkedin",
      instagram: profile?.instagram || "#instagram",
    };

    // 2. Fetch selected books
    let selectedRows: Array<{ productId: string; order: number }> = [];
    try {
      selectedRows = await prisma.$queryRawUnsafe(
        `SELECT productId, "order" FROM MeetTheAuthorBook WHERE profileId = 'default' ORDER BY "order" ASC`
      );
    } catch (e) {
      console.error("Error querying MeetTheAuthorBook:", e);
    }

    let books: MeetTheAuthorBookItem[] = [];

    if (selectedRows.length > 0) {
      const productIds = selectedRows.map((r) => r.productId);
      const dbProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      // Maintain user-selected order
      const prodMap = new Map(dbProducts.map((p) => [p.id, p]));
      books = selectedRows
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
    } else {
      // Fallback: If no books curated yet, pick 3 books from the store
      const initialBooks = await prisma.product.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
      });        

      books = initialBooks.map((prod, idx) => ({
        id: prod.id,
        title: prod.title,
        author: prod.author,
        price: prod.price,
        oldPrice: prod.originalPrice || undefined,
        image: prod.image,
        slug: prod.slug,
        badge: prod.badge || undefined,
        order: idx,
      }));
    }

    return {
      ...defaultProfile,
      books,
    };
  }

  /**
   * Update Meet The Author profile and curated book list
   */
  static async updateProfile(payload: UpdateMeetTheAuthorPayload): Promise<MeetTheAuthorProfileData> {
    await ensureSchemaUpdated();

    const authorName = payload.authorName?.trim() || "Santosh Kumar Mishra";
    const authorImage = payload.authorImage?.trim() || "/images/Gemini_Generated_Image_f41einf41einf41e.png";
    const quote = payload.quote?.trim() || "";
    const facebook = payload.facebook?.trim() || "";
    const twitter = payload.twitter?.trim() || "";
    const linkedin = payload.linkedin?.trim() || "";
    const instagram = payload.instagram?.trim() || "";

    // 1. Upsert profile table
    await prisma.$executeRawUnsafe(
      `INSERT INTO MeetTheAuthorProfile (id, authorName, authorImage, quote, facebook, twitter, linkedin, instagram, updatedAt)
       VALUES ('default', ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(id) DO UPDATE SET
         authorName = excluded.authorName,
         authorImage = excluded.authorImage,
         quote = excluded.quote,
         facebook = excluded.facebook,
         twitter = excluded.twitter,
         linkedin = excluded.linkedin,
         instagram = excluded.instagram,
         updatedAt = CURRENT_TIMESTAMP`,
      authorName,
      authorImage,
      quote,
      facebook,
      twitter,
      linkedin,
      instagram
    );

    // 2. Clear old books mapping
    await prisma.$executeRawUnsafe(
      `DELETE FROM MeetTheAuthorBook WHERE profileId = 'default'`
    );

    // 3. Insert newly ordered books
    if (Array.isArray(payload.bookIds) && payload.bookIds.length > 0) {
      for (let i = 0; i < payload.bookIds.length; i++) {
        const pId = payload.bookIds[i];
        const rowId = `mta_${Date.now()}_${i}`;
        try {
          await prisma.$executeRawUnsafe(
            `INSERT INTO MeetTheAuthorBook (id, profileId, productId, "order") VALUES (?, 'default', ?, ?)`,
            rowId,
            pId,
            i
          );
        } catch (e) {
          console.error("Error inserting MeetTheAuthorBook row:", e);
        }
      }
    }

    // 4. Sync Author table so author has this photo, quote, and socials
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
          facebook,
          twitter,
          linkedin,
          instagram,
          existingAuthors[0].id
        );
      } else {
        const authorId = `auth_${Date.now()}`;
        const baseSlug = authorName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") || `author-${Date.now()}`;

        await prisma.$executeRawUnsafe(
          `INSERT INTO Author (id, name, slug, image, bio, tagline, facebook, twitter, linkedin, instagram, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
          authorId,
          authorName,
          baseSlug,
          authorImage,
          quote,
          quote,
          facebook,
          twitter,
          linkedin,
          instagram
        );
      }
    } catch (authSyncErr) {
      console.error("Error syncing Author table in MTA updateProfile:", authSyncErr);
    }

    // 5. Sync Product table showInMeetAuthor flags
    try {
      await prisma.$executeRawUnsafe(`UPDATE Product SET showInMeetAuthor = 0`);
      if (Array.isArray(payload.bookIds) && payload.bookIds.length > 0) {
        for (const pId of payload.bookIds) {
          await prisma.$executeRawUnsafe(
            `UPDATE Product SET showInMeetAuthor = 1 WHERE id = ?`,
            pId
          );
        }
      }
    } catch (prodSyncErr) {
      console.error("Error syncing showInMeetAuthor on Products:", prodSyncErr);
    }

    return this.getProfile();
  }
}
