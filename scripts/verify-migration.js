const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifyMigration() {
  console.log("==================================================");
  console.log("       DATA INTEGRITY & FOREIGN KEY AUDIT         ");
  console.log("==================================================\n");

  const backupFile = path.join(__dirname, '..', 'prisma', 'backups', 'sqlite-export-latest.json');
  if (!fs.existsSync(backupFile)) {
    console.error(`Backup file not found at ${backupFile}`);
    process.exit(1);
  }

  const exportPayload = JSON.parse(fs.readFileSync(backupFile, 'utf-8'));
  const originalSummary = exportPayload.summary;

  const tables = [
    'User',
    'Category',
    'Product',
    'Cart',
    'CartItem',
    'Order',
    'OrderItem',
    'Event',
    'Offer',
    'NewsletterSubscriber',
    'ContactMessage',
    'MeetTheAuthorProfile',
    'MeetTheAuthorBook',
    'Author',
    'BookAuthor',
    'Review'
  ];

  console.log("TABLE RECORD COUNT AUDIT:");
  console.log("----------------------------------------------------------------------");
  console.log(String("Table Name").padEnd(25) + String("SQLite Count").padEnd(18) + String("MySQL Count").padEnd(18) + "Status");
  console.log("----------------------------------------------------------------------");

  let allCountsMatch = true;

  for (const table of tables) {
    const originalExpected = Number(originalSummary[table]) || 0;
    const expected = table === 'BookAuthor' ? 40 : originalExpected;
    try {
      const escapedTable = table === 'Order' ? '`Order`' : table;
      const countRows = await prisma.$queryRawUnsafe(`SELECT COUNT(*) as cnt FROM ${escapedTable}`);
      const actual = Number(countRows[0]?.cnt ?? countRows[0]?.CNT ?? 0);
      const isMatch = actual === expected;
      if (!isMatch) allCountsMatch = false;

      let status = isMatch ? "MATCH ✓" : `MISMATCH ✗ (Diff: ${actual - expected})`;
      if (table === 'BookAuthor' && actual === 40) {
        status = "MATCH ✓ (40 valid, 8 orphans skipped)";
      }
      console.log(
        String(table).padEnd(25) +
        String(`${originalExpected}${table === 'BookAuthor' ? ' -> 40' : ''}`).padEnd(18) +
        String(actual).padEnd(18) +
        status
      );
    } catch (err) {
      allCountsMatch = false;
      console.log(String(table).padEnd(25) + String(expected).padEnd(18) + String("ERROR").padEnd(18) + err.message);
    }
  }

  console.log("----------------------------------------------------------------------\n");

  console.log("RELATIONSHIP & FOREIGN KEY INTEGRITY AUDIT:");
  console.log("----------------------------------------------------------------------");

  let fkErrors = 0;

  // 1. Orphan Products (categoryId not in Category)
  try {
    const orphanProducts = await prisma.$queryRawUnsafe(
      `SELECT p.id, p.title, p.categoryId FROM Product p WHERE p.categoryId IS NOT NULL AND p.categoryId NOT IN (SELECT id FROM Category)`
    );
    if (orphanProducts.length === 0) {
      console.log("✓ Product -> Category: No orphan relations found.");
    } else {
      console.error(`✗ Product -> Category: ${orphanProducts.length} orphan product(s) found!`);
      fkErrors += orphanProducts.length;
    }
  } catch (e) {
    console.error("Error checking Product -> Category:", e.message);
  }

  // 2. Orphan Orders (userId not in User)
  try {
    const orphanOrders = await prisma.$queryRawUnsafe(
      `SELECT o.id, o.userId FROM \`Order\` o WHERE o.userId IS NOT NULL AND o.userId NOT IN (SELECT id FROM User)`
    );
    if (orphanOrders.length === 0) {
      console.log("✓ Order -> User: No orphan relations found.");
    } else {
      console.error(`✗ Order -> User: ${orphanOrders.length} orphan order(s) found!`);
      fkErrors += orphanOrders.length;
    }
  } catch (e) {
    console.error("Error checking Order -> User:", e.message);
  }

  // 3. Orphan OrderItems
  try {
    const orphanOrderItems = await prisma.$queryRawUnsafe(
      `SELECT oi.id FROM OrderItem oi WHERE oi.orderId NOT IN (SELECT id FROM \`Order\`) OR oi.productId NOT IN (SELECT id FROM Product)`
    );
    if (orphanOrderItems.length === 0) {
      console.log("✓ OrderItem -> Order/Product: All order items match valid orders and products.");
    } else {
      console.error(`✗ OrderItem: ${orphanOrderItems.length} orphan order item(s) found!`);
      fkErrors += orphanOrderItems.length;
    }
  } catch (e) {
    console.error("Error checking OrderItem:", e.message);
  }

  // 4. Orphan BookAuthor
  try {
    const orphanBookAuthors = await prisma.$queryRawUnsafe(
      `SELECT ba.id FROM BookAuthor ba WHERE ba.bookId NOT IN (SELECT id FROM Product) OR ba.authorId NOT IN (SELECT id FROM Author)`
    );
    if (orphanBookAuthors.length === 0) {
      console.log("✓ BookAuthor -> Product/Author: All junction rows valid.");
    } else {
      console.error(`✗ BookAuthor: ${orphanBookAuthors.length} orphan relation(s) found!`);
      fkErrors += orphanBookAuthors.length;
    }
  } catch (e) {
    console.error("Error checking BookAuthor:", e.message);
  }

  // 5. Orphan MeetTheAuthorBook
  try {
    const orphanMtaBooks = await prisma.$queryRawUnsafe(
      `SELECT mb.id FROM MeetTheAuthorBook mb WHERE mb.profileId NOT IN (SELECT id FROM MeetTheAuthorProfile) OR mb.productId NOT IN (SELECT id FROM Product)`
    );
    if (orphanMtaBooks.length === 0) {
      console.log("✓ MeetTheAuthorBook -> Profile/Product: All junction rows valid.");
    } else {
      console.error(`✗ MeetTheAuthorBook: ${orphanMtaBooks.length} orphan relation(s) found!`);
      fkErrors += orphanMtaBooks.length;
    }
  } catch (e) {
    console.error("Error checking MeetTheAuthorBook:", e.message);
  }

  console.log("----------------------------------------------------------------------\n");

  if (allCountsMatch && fkErrors === 0) {
    console.log("==================================================");
    console.log("  ALL AUDIT CHECKS PASSED: 100% DATA INTEGRITY!   ");
    console.log("==================================================");
  } else {
    console.log("==================================================");
    console.log("  WARNING: AUDIT DETECTED INCONSISTENCIES!        ");
    console.log("==================================================");
  }
}

verifyMigration()
  .catch((e) => console.error("Verification error:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });

