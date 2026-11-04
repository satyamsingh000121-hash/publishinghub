const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const replacer = (key, value) => {
  if (typeof value === 'bigint') return value.toString();
  return value;
};

async function exportAllData() {
  console.log("==========================================");
  console.log("   SQLITE DATA EXPORT (ZERO DATA LOSS)    ");
  console.log("==========================================\n");

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

  const exportPayload = {
    exportedAt: new Date().toISOString(),
    sourceDatabase: 'SQLite (prisma/dev.db)',
    summary: {},
    data: {}
  };

  let totalRecords = 0;

  for (const table of tables) {
    try {
      const rows = await prisma.$queryRawUnsafe(`SELECT * FROM "${table}"`);
      exportPayload.data[table] = rows;
      exportPayload.summary[table] = rows.length;
      totalRecords += rows.length;
      console.log(`✓ Table [${table}]: ${rows.length} record(s) exported.`);
    } catch (err) {
      console.error(`✗ Table [${table}] query error:`, err.message);
      exportPayload.summary[table] = { error: err.message };
      exportPayload.data[table] = [];
    }
  }

  exportPayload.totalRecords = totalRecords;

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupDir = path.join(__dirname, '..', 'prisma', 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const exportPathLatest = path.join(backupDir, 'sqlite-export-latest.json');
  const exportPathTimestamped = path.join(backupDir, `sqlite-export-${timestamp}.json`);

  const jsonString = JSON.stringify(exportPayload, replacer, 2);
  fs.writeFileSync(exportPathLatest, jsonString, 'utf-8');
  fs.writeFileSync(exportPathTimestamped, jsonString, 'utf-8');

  console.log(`\n==========================================`);
  console.log(`Total Records Exported: ${totalRecords}`);
  console.log(`Saved to: ${exportPathLatest}`);
  console.log(`Saved to: ${exportPathTimestamped}`);
  console.log(`==========================================\n`);
}

exportAllData()
  .catch((e) => {
    console.error("Export failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

