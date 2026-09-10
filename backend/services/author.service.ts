import { prisma } from "@/lib/prisma";
import { ensureSchemaUpdated } from "@/lib/db";
import { AuthorProfileDTO } from "@/types/product";

function formatAuthorName(name: string): string {
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

const AUTHOR_PRESETS: Record<string, { image: string; quote: string }> = {
  "chai iam": {
    image: "/images/author-01.jpg",
    quote: "Poetry is the rhythmical creation of beauty in words, an intimate whisper to the quiet soul.",
  },
  "hof nurgin": {
    image: "/images/author-03.jpg",
    quote: "A poem should not mean, but be — capturing life's unspoken wonders night by night.",
  },
  "santosh kumar": {
    image: "/images/Gemini_Generated_Image_f41einf41einf41e.png",
    quote: "Every visionary journey begins with the audacity to dream and the courage to persist.",
  },
  "dina nayeri": {
    image: "/images/author-02.jpg",
    quote: "My books are marked down because most of them are marked with a deep longing for home on the edge by publishers.",
  },
  "mesho buvahr": {
    image: "/images/author-06 (1).jpg",
    quote: "Curiosity and imagination are the twin engines of genuine childhood discovery.",
  },
  "sero glan": {
    image: "/images/author-04 (1).jpg",
    quote: "To live deeply in two worlds at once is the sacred privilege of every storyteller.",
  },
};

const DEFAULT_AVATARS = [
  "/images/author-01.jpg",
  "/images/author-03.jpg",
  "/images/author-02.jpg",
  "/images/author-05.jpg",
  "/images/author-07.jpg",
];

export class AuthorService {
  /**
   * Syncs a book's authors list to the Author and BookAuthor tables
   */
  static async syncBookAuthors(bookId: string, authorNames: string[]): Promise<AuthorProfileDTO[]> {
    await ensureSchemaUpdated();

    const cleanNames = authorNames
      .map((n) => formatAuthorName(n))
      .filter((n) => n.length > 0);

    if (cleanNames.length === 0) return [];

    const authorProfiles: AuthorProfileDTO[] = [];

    // 1. Ensure each author exists in Author table
    for (let i = 0; i < cleanNames.length; i++) {
      const name = cleanNames[i];
      const lowerName = name.toLowerCase();
      const preset = AUTHOR_PRESETS[lowerName];
      const baseSlug = lowerName
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") || `author-${Date.now()}`;

      let authorRecord: any = null;

      try {
        const rows: any[] = await prisma.$queryRawUnsafe(
          `SELECT * FROM Author WHERE LOWER(name) = LOWER(?) LIMIT 1`,
          name
        );
        if (rows && rows.length > 0) {
          authorRecord = rows[0];
          // Only update if it still has generic Gemini image and no custom admin image was set
          if (
            authorRecord.image &&
            authorRecord.image.includes("Gemini_Generated") &&
            preset?.image
          ) {
            const updatedImg = preset.image;
            const updatedQuote = authorRecord.tagline || authorRecord.bio || preset.quote;
            try {
              await prisma.$executeRawUnsafe(
                `UPDATE Author SET image = ?, tagline = ?, bio = ? WHERE id = ?`,
                updatedImg,
                updatedQuote,
                updatedQuote,
                authorRecord.id
              );
              authorRecord.image = updatedImg;
              authorRecord.tagline = updatedQuote;
            } catch {}
          }
        }
      } catch {}

      if (!authorRecord) {
        const authorId = `auth_${Date.now()}_${i}`;
        const slug = baseSlug;
        const defaultImage = preset?.image || DEFAULT_AVATARS[i % DEFAULT_AVATARS.length];
        const defaultBio = preset?.quote || `Acclaimed author of contemporary literature and visionary works.`;

        try {
          await prisma.$executeRawUnsafe(
            `INSERT INTO Author (id, name, slug, image, bio, tagline, facebook, twitter, instagram, pinterest, linkedin, youtube, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, '#facebook', '#twitter', '#instagram', '#pinterest', '#linkedin', '#youtube', CURRENT_TIMESTAMP)`,
            authorId,
            name,
            slug,
            defaultImage,
            defaultBio,
            defaultBio
          );

          authorRecord = {
            id: authorId,
            name,
            slug,
            image: defaultImage,
            bio: defaultBio,
            tagline: defaultBio,
            facebook: "#facebook",
            twitter: "#twitter",
            instagram: "#instagram",
            pinterest: "#pinterest",
            linkedin: "#linkedin",
            youtube: "#youtube",
          };
        } catch (insertErr) {
          // If collision occurred, try to find by slug
          try {
            const rows: any[] = await prisma.$queryRawUnsafe(
              `SELECT * FROM Author WHERE slug = ? LIMIT 1`,
              slug
            );
            if (rows && rows.length > 0) authorRecord = rows[0];
          } catch {}
        }
      }

      if (authorRecord) {
        authorProfiles.push({
          id: authorRecord.id,
          name: formatAuthorName(authorRecord.name),
          slug: authorRecord.slug,
          image: authorRecord.image,
          bio: authorRecord.bio,
          tagline: authorRecord.tagline || authorRecord.bio,
          facebook: authorRecord.facebook,
          twitter: authorRecord.twitter,
          instagram: authorRecord.instagram,
          pinterest: authorRecord.pinterest,
          linkedin: authorRecord.linkedin,
          youtube: authorRecord.youtube,
        });
      }
    }

    // 2. Clear old BookAuthor mapping for this book
    try {
      await prisma.$executeRawUnsafe(
        `DELETE FROM BookAuthor WHERE bookId = ?`,
        bookId
      );
    } catch {}

    // 3. Insert new mappings with order
    for (let i = 0; i < authorProfiles.length; i++) {
      const auth = authorProfiles[i];
      const baId = `ba_${bookId}_${auth.id}_${Date.now()}`;
      try {
        await prisma.$executeRawUnsafe(
          `INSERT INTO BookAuthor (id, bookId, authorId, "order") VALUES (?, ?, ?, ?)`,
          baId,
          bookId,
          auth.id,
          i
        );
      } catch (e) {
        console.error("Error inserting BookAuthor row:", e);
      }
    }

    return authorProfiles;
  }

  /**
   * Retrieves all authors for a specific book
   */
  static async getAuthorsForBook(bookId: string, fallbackAuthorStr?: string): Promise<AuthorProfileDTO[]> {
    await ensureSchemaUpdated();

    try {
      const rows: any[] = await prisma.$queryRawUnsafe(
        `SELECT a.* FROM Author a
         JOIN BookAuthor ba ON ba.authorId = a.id
         WHERE ba.bookId = ?
         ORDER BY ba."order" ASC`,
        bookId
      );

      if (rows && rows.length > 0) {
        return rows.map((r) => {
          const lower = (r.name || "").toLowerCase();
          const preset = AUTHOR_PRESETS[lower];
          const hasCustomImg = r.image && !r.image.includes("Gemini_Generated");
          const finalImg = hasCustomImg ? r.image : (preset?.image || r.image || "/images/author-01.jpg");
          const finalQuote = r.tagline || r.bio || preset?.quote || "Acclaimed author of contemporary literature and visionary works.";

          return {
            id: r.id,
            name: formatAuthorName(r.name),
            slug: r.slug,
            image: finalImg,
            bio: finalQuote,
            tagline: finalQuote,
            facebook: r.facebook || "#facebook",
            twitter: r.twitter || "#twitter",
            instagram: r.instagram || "#instagram",
            pinterest: r.pinterest || "#pinterest",
            linkedin: r.linkedin || "#linkedin",
            youtube: r.youtube || "#youtube",
          };
        });
      }
    } catch (e) {
      console.error("Error querying BookAuthor:", e);
    }

    // Legacy fallback: parse comma/and separated author string
    if (fallbackAuthorStr) {
      const rawNames = fallbackAuthorStr
        .replace(/^By\s+/i, "")
        .split(/,\s*|\s+and\s+|\s*&\s*/i)
        .map((s) => s.trim())
        .filter(Boolean);

      if (rawNames.length > 0) {
        return this.syncBookAuthors(bookId, rawNames);
      }
    }

    return [];
  }

  /**
   * Retrieves dynamic showcase books for a specific author from the database relationship
   */
  static async getShowcaseBooksForAuthor(authorName: string, authorId?: string, excludeBookId?: string): Promise<any[]> {
    await ensureSchemaUpdated();

    if (!authorName) return [];

    try {
      const { MeetTheAuthorService } = await import("@/backend/services/meetTheAuthor.service");
      const profile = await MeetTheAuthorService.getProfileByAuthorName(authorName);

      if (profile && profile.books && profile.books.length > 0) {
        const filtered = profile.books.filter((b) => b.id !== excludeBookId);
        return filtered.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          oldPrice: p.oldPrice || undefined,
          slug: p.slug,
          image: p.image,
          badge: p.badge || undefined,
          author: p.author,
        }));
      }
    } catch (e) {
      console.error("Error fetching showcase books from MeetTheAuthorService:", e);
    }

    // If no books are assigned to this author in Meet The Author, return empty list
    return [];
  }
}

