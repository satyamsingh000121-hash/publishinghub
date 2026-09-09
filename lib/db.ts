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
    `CREATE UNIQUE INDEX IF NOT EXISTS meet_author_book_unique ON MeetTheAuthorBook(profileId, productId)`,
    `INSERT OR IGNORE INTO MeetTheAuthorProfile (id, authorName, authorImage, quote, facebook, twitter, linkedin, instagram)
     VALUES ('default', 'Santosh Kumar Mishra', '/images/Gemini_Generated_Image_f41einf41einf41e.png', 'Empowering readers through transformative stories and visionary leadership.', '#facebook', '#twitter', '#linkedin', '#instagram')`,
  ];

  for (const query of tablesToCreate) {
    try {
      await prisma.$executeRawUnsafe(query);
    } catch {
      // Table or index already exists, ignore
    }
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
