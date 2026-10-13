import { prisma } from "../lib/prisma";

async function main() {
  try {
    console.log("Checking columns in User table...");
    const tableInfo: any = await prisma.$queryRawUnsafe("PRAGMA table_info(User);");
    console.log("Current User columns:", tableInfo.map((c: any) => c.name));

    const colNames = tableInfo.map((c: any) => c.name);

    if (!colNames.includes("passwordResetTokenHash")) {
      console.log("Adding column passwordResetTokenHash...");
      await prisma.$executeRawUnsafe("ALTER TABLE User ADD COLUMN passwordResetTokenHash TEXT;");
      console.log("Column passwordResetTokenHash added.");
    } else {
      console.log("Column passwordResetTokenHash already exists.");
    }

    if (!colNames.includes("passwordResetExpires")) {
      console.log("Adding column passwordResetExpires...");
      await prisma.$executeRawUnsafe("ALTER TABLE User ADD COLUMN passwordResetExpires DATETIME;");
      console.log("Column passwordResetExpires added.");
    } else {
      console.log("Column passwordResetExpires already exists.");
    }

    const updatedInfo: any = await prisma.$queryRawUnsafe("PRAGMA table_info(User);");
    console.log("Updated User columns:", updatedInfo.map((c: any) => c.name));
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
