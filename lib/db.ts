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
  ];

  for (const query of columnsToAdd) {
    try {
      await prisma.$executeRawUnsafe(query);
    } catch {
      // Column already exists, ignore
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
