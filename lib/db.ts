import { prisma } from "./prisma";

let isSchemaEnsured = false;

export async function ensureSchemaUpdated(): Promise<void> {
  if (isSchemaEnsured) return;
  isSchemaEnsured = true;

  const columnsToAdd = [
    "ALTER TABLE Product ADD COLUMN isbn TEXT",
    "ALTER TABLE Product ADD COLUMN publisher TEXT",
    "ALTER TABLE Product ADD COLUMN publicationDate TEXT",
    "ALTER TABLE Product ADD COLUMN pages INTEGER",
    "ALTER TABLE Product ADD COLUMN language TEXT DEFAULT 'English'",
    "ALTER TABLE Product ADD COLUMN format TEXT DEFAULT 'Hardcover'",
    "ALTER TABLE Product ADD COLUMN rating REAL DEFAULT 5.0",
    "ALTER TABLE Product ADD COLUMN reviewCount INTEGER DEFAULT 0",
    "ALTER TABLE Product ADD COLUMN displayOrder INTEGER DEFAULT 0",
    "ALTER TABLE Product ADD COLUMN showInMeetAuthor INTEGER DEFAULT 0",
  ];

  for (const query of columnsToAdd) {
    try {
      await prisma.$executeRawUnsafe(query);
    } catch {
      // Column already exists, ignore
    }
  }

  const tablesToCreate = [
    `CREATE TABLE IF NOT EXISTS Author (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      image TEXT,
      bio TEXT,
      tagline TEXT,
      facebook TEXT,
      twitter TEXT,
      instagram TEXT,
      pinterest TEXT,
      linkedin TEXT,
      youtube TEXT,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS BookAuthor (
      id TEXT PRIMARY KEY,
      bookId TEXT NOT NULL,
      authorId TEXT NOT NULL,
      "order" INTEGER NOT NULL DEFAULT 0,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS book_author_unique ON BookAuthor(bookId, authorId)`,
    `CREATE TABLE IF NOT EXISTS MeetTheAuthorProfile (
      id TEXT PRIMARY KEY,
      authorName TEXT NOT NULL DEFAULT 'Santosh Kumar Mishra',
      authorImage TEXT NOT NULL DEFAULT '/images/Gemini_Generated_Image_f41einf41einf41e.png',
      quote TEXT,
      facebook TEXT,
      twitter TEXT,
      linkedin TEXT,
      instagram TEXT,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS MeetTheAuthorBook (
      id TEXT PRIMARY KEY,
      profileId TEXT NOT NULL DEFAULT 'default',
      productId TEXT NOT NULL,
      "order" INTEGER NOT NULL DEFAULT 0,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
  ];

  for (const query of tablesToCreate) {
    try {
      await prisma.$executeRawUnsafe(query);
    } catch {
      // Table or index already exists, ignore
    }
  }

  // One-time cleanup for duplicate authors and extra empty profiles
  try {
    // 1. Merge duplicate "Hof Nurgin" profiles
    const hofProfiles: any[] = await prisma.$queryRawUnsafe(
      `SELECT id, authorImage FROM MeetTheAuthorProfile WHERE LOWER(authorName) = 'hof nurgin' ORDER BY createdAt ASC`
    );
    if (hofProfiles && hofProfiles.length > 1) {
      const primaryId = hofProfiles[0].id;
      // Use the best image
      const bestImage = hofProfiles.find((h) => h.authorImage && h.authorImage.startsWith("/uploads/"))?.authorImage || hofProfiles[0].authorImage;
      await prisma.$executeRawUnsafe(
        `UPDATE MeetTheAuthorProfile SET authorImage = ? WHERE id = ?`,
        bestImage,
        primaryId
      );

      for (let i = 1; i < hofProfiles.length; i++) {
        const dupId = hofProfiles[i].id;
        const dupBooks: any[] = await prisma.$queryRawUnsafe(
          `SELECT productId, "order" FROM MeetTheAuthorBook WHERE profileId = ?`,
          dupId
        );
        for (const db of dupBooks) {
          const exists: any[] = await prisma.$queryRawUnsafe(
            `SELECT id FROM MeetTheAuthorBook WHERE profileId = ? AND productId = ? LIMIT 1`,
            primaryId,
            db.productId
          );
          if (!exists || exists.length === 0) {
            const rowId = `mta_b_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
            await prisma.$executeRawUnsafe(
              `INSERT INTO MeetTheAuthorBook (id, profileId, productId, "order") VALUES (?, ?, ?, ?)`,
              rowId,
              primaryId,
              db.productId,
              db.order || 99
            );
          }
        }
        await prisma.$executeRawUnsafe(`DELETE FROM MeetTheAuthorBook WHERE profileId = ?`, dupId);
        await prisma.$executeRawUnsafe(`DELETE FROM MeetTheAuthorProfile WHERE id = ?`, dupId);
      }
    }

    // 2. Remove specified extra 0-book profiles
    const extrasToRemove = [
      "mta_1789019925381_6p03", // Koga Forescar
      "mta_1789019925308_t2w3", // Marcus Hathaway
      "mta_1789019925375_r2fd", // Santosh Kumar
      "mta_1789021019485_ct49", // Santosh Kumar Mishra
      "mta_1789019925389_c7aa", // Sophie Collins
      "mta_1789020341676_izdp", // Stephanie Foo
    ];
    for (const eid of extrasToRemove) {
      await prisma.$executeRawUnsafe(`DELETE FROM MeetTheAuthorBook WHERE profileId = ?`, eid);
      await prisma.$executeRawUnsafe(`DELETE FROM MeetTheAuthorProfile WHERE id = ?`, eid);
    }

    // 3. Auto-seed default Meet The Author profiles on Live deployment if empty
    const existingCount: any[] = await prisma.$queryRawUnsafe(
      `SELECT count(*) as count FROM MeetTheAuthorProfile`
    );
    const countVal = existingCount?.[0]?.count ?? existingCount?.[0]?.["count(*)"] ?? 0;
    if (Number(countVal) === 0) {
      const { DEFAULT_MEET_THE_AUTHOR_PROFILES } = await import("./initial-authors-data");
      for (const p of DEFAULT_MEET_THE_AUTHOR_PROFILES) {
        try {
          await prisma.$executeRawUnsafe(
            `INSERT INTO MeetTheAuthorProfile (id, authorName, authorImage, quote, facebook, twitter, linkedin, instagram, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
            p.id,
            p.authorName,
            p.authorImage,
            p.quote,
            p.facebook || "#facebook",
            p.twitter || "#twitter",
            p.linkedin || "#linkedin",
            p.instagram || "#instagram"
          );

          if (p.books && p.books.length > 0) {
            for (let idx = 0; idx < p.books.length; idx++) {
              const b = p.books[idx];
              const bRowId = `mta_b_seed_${p.id}_${idx}_${Date.now()}`;
              await prisma.$executeRawUnsafe(
                `INSERT INTO MeetTheAuthorBook (id, profileId, productId, "order") VALUES (?, ?, ?, ?)`,
                bRowId,
                p.id,
                b.id,
                idx
              );
            }
          }
        } catch (e) {
          // ignore duplicate
        }
      }
    }

    // 4. Ensure A Teaspoon of Earth and Sea is updated to multi-author (Savanna Walker, Shia Ung)
    try {
      await prisma.$executeRawUnsafe(
        `UPDATE Product SET author = 'By Savanna Walker, Shia Ung', authorName = 'Savanna Walker' WHERE slug = 'a-teaspoon-of-earth-and-sea'`
      );
    } catch {}
  } catch (err) {
    console.error("Error during Meet The Author schema cleanup and seed:", err);
  }
}

export async function checkDbConnection(): Promise<{ isConnected: boolean; error?: string }> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    await ensureSchemaUpdated();
    return { isConnected: true };
  } catch (error: any) {
    console.error("Database connection error:", error?.message || error);
    return { isConnected: false, error: error?.message || "Failed to connect to database" };
  }
}

export { prisma };
