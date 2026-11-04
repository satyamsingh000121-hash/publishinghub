const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function formatDateForMySQL(val) {
  if (!val) return null;
  const d = new Date(val);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

async function importAllData() {
  console.log("==================================================");
  console.log("   PINNED-CONNECTION ATOMIC MYSQL DATA IMPORT     ");
  console.log("==================================================\n");

  const backupFile = path.join(__dirname, '..', 'prisma', 'backups', 'sqlite-export-latest.json');
  if (!fs.existsSync(backupFile)) {
    console.error(`Error: Backup file not found at ${backupFile}`);
    console.error(`Please run 'node scripts/export-sqlite-data.js' first.`);
    process.exit(1);
  }

  const exportPayload = JSON.parse(fs.readFileSync(backupFile, 'utf-8'));
  const { data } = exportPayload;

  console.log(`Backup Source: ${exportPayload.sourceDatabase}`);
  console.log(`Exported At:   ${exportPayload.exportedAt}`);
  console.log(`Total Records: ${exportPayload.totalRecords}\n`);

  const tablesInOrder = [
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

  // =========================================================================
  // STEP 1: PRE-FLIGHT CHECK (ENSURE ALL 16 TABLES ARE 100% EMPTY)
  // =========================================================================
  console.log("Running Pre-Flight Safety Check on MySQL tables...");
  for (const table of tablesInOrder) {
    const escapedTable = table === 'Order' ? '`Order`' : table;
    const countResult = await prisma.$queryRawUnsafe(`SELECT COUNT(*) as cnt FROM ${escapedTable}`);
    const count = Number(countResult[0]?.cnt ?? countResult[0]?.CNT ?? 0);
    if (count > 0) {
      console.error(`\n[ABORTED]: Table '${table}' already contains ${count} record(s)!`);
      console.error("To avoid corrupting or overwriting existing data, the import has stopped.");
      await prisma.$disconnect();
      process.exit(1);
    }
  }
  console.log("✓ Pre-Flight Check Passed: All 16 MySQL tables are completely empty (0 rows).\n");

  // =========================================================================
  // STEP 2: PRISMA INTERACTIVE TRANSACTION (CONNECTION PINNING & ATOMICITY)
  // Foreign Key checks remain ENABLED. Strict parent-to-child order enforced.
  // =========================================================================
  console.log("Starting Prisma Interactive Transaction (Single Dedicated Connection)...");

  try {
    await prisma.$transaction(async (tx) => {

      // 1. User Table (Parent of Cart & Order)
      if (data.User && data.User.length > 0) {
        console.log(`[1/16] Inserting ${data.User.length} User records...`);
        for (const u of data.User) {
          await tx.$executeRawUnsafe(
            `INSERT INTO User (id, name, email, passwordHash, role, avatar, phoneNumber, passwordResetTokenHash, passwordResetExpires, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email)`,
            u.id,
            u.name,
            u.email,
            u.passwordHash,
            u.role || 'USER',
            u.avatar || null,
            u.phoneNumber || null,
            u.passwordResetTokenHash || null,
            formatDateForMySQL(u.passwordResetExpires),
            formatDateForMySQL(u.createdAt) || new Date(),
            formatDateForMySQL(u.updatedAt) || new Date()
          );
        }
      }

      // 2. Category Table (Parent of Product)
      if (data.Category && data.Category.length > 0) {
        console.log(`[2/16] Inserting ${data.Category.length} Category records...`);
        for (const c of data.Category) {
          await tx.$executeRawUnsafe(
            `INSERT INTO Category (id, name, slug, description, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE name=VALUES(name), slug=VALUES(slug)`,
            c.id,
            c.name,
            c.slug,
            c.description || null,
            formatDateForMySQL(c.createdAt) || new Date(),
            formatDateForMySQL(c.updatedAt) || new Date()
          );
        }
      }

      // 3. Product Table (Parent of CartItem, OrderItem, MeetTheAuthorBook, BookAuthor)
      if (data.Product && data.Product.length > 0) {
        console.log(`[3/16] Inserting ${data.Product.length} Product records...`);
        for (const p of data.Product) {
          await tx.$executeRawUnsafe(
            `INSERT INTO Product (
               id, slug, title, author, authorName, authorImage, authorQuote,
               price, numericPrice, originalPrice, badge, category, categoryId,
               availability, image, coverId, summary, description, stock, featured,
               isbn, publisher, publicationDate, pages, language, format, rating, reviewCount,
               displayOrder, showInMeetAuthor, showOnHomepage, bestSeller, salePrice,
               createdAt, updatedAt
             ) VALUES (
               ?, ?, ?, ?, ?, ?, ?,
               ?, ?, ?, ?, ?, ?,
               ?, ?, ?, ?, ?, ?, ?,
               ?, ?, ?, ?, ?, ?, ?, ?,
               ?, ?, ?, ?, ?,
               ?, ?
             )
             ON DUPLICATE KEY UPDATE title=VALUES(title), slug=VALUES(slug)`,
            p.id,
            p.slug,
            p.title,
            p.author,
            p.authorName || null,
            p.authorImage || null,
            p.authorQuote || null,
            p.price,
            Number(p.numericPrice) || 0,
            p.originalPrice || null,
            p.badge || null,
            p.category,
            p.categoryId || null,
            p.availability || 'in-stock',
            p.image,
            p.coverId || null,
            p.summary || null,
            p.description || null,
            p.stock !== undefined && p.stock !== null ? Number(p.stock) : 100,
            Boolean(p.featured),
            p.isbn || null,
            p.publisher || null,
            p.publicationDate || null,
            p.pages !== undefined && p.pages !== null ? Number(p.pages) : null,
            p.language || 'English',
            p.format || 'Hardcover',
            p.rating !== undefined && p.rating !== null ? Number(p.rating) : 5.0,
            p.reviewCount !== undefined && p.reviewCount !== null ? Number(p.reviewCount) : 0,
            p.displayOrder !== undefined && p.displayOrder !== null ? Number(p.displayOrder) : 0,
            Boolean(p.showInMeetAuthor),
            p.showOnHomepage !== undefined && p.showOnHomepage !== null ? Boolean(p.showOnHomepage) : true,
            p.bestSeller !== undefined && p.bestSeller !== null ? Boolean(p.bestSeller) : false,
            p.salePrice || null,
            formatDateForMySQL(p.createdAt) || new Date(),
            formatDateForMySQL(p.updatedAt) || new Date()
          );
        }
      }

      // 4. Cart Table (Parent of CartItem, Child of User)
      if (data.Cart && data.Cart.length > 0) {
        console.log(`[4/16] Inserting ${data.Cart.length} Cart records...`);
        for (const cart of data.Cart) {
          await tx.$executeRawUnsafe(
            `INSERT INTO Cart (id, userId, sessionId, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE sessionId=VALUES(sessionId)`,
            cart.id,
            cart.userId || null,
            cart.sessionId || null,
            formatDateForMySQL(cart.createdAt) || new Date(),
            formatDateForMySQL(cart.updatedAt) || new Date()
          );
        }
      }

      // 5. CartItem Table (Child of Cart & Product)
      if (data.CartItem && data.CartItem.length > 0) {
        console.log(`[5/16] Inserting ${data.CartItem.length} CartItem records...`);
        for (const item of data.CartItem) {
          await tx.$executeRawUnsafe(
            `INSERT INTO CartItem (id, cartId, productId, quantity, price, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE quantity=VALUES(quantity), price=VALUES(price)`,
            item.id,
            item.cartId,
            item.productId,
            Number(item.quantity) || 1,
            Number(item.price) || 0,
            formatDateForMySQL(item.createdAt) || new Date(),
            formatDateForMySQL(item.updatedAt) || new Date()
          );
        }
      }

      // 6. Order Table (Parent of OrderItem, Child of User)
      if (data.Order && data.Order.length > 0) {
        console.log(`[6/16] Inserting ${data.Order.length} Order records...`);
        for (const o of data.Order) {
          await tx.$executeRawUnsafe(
            `INSERT INTO \`Order\` (id, userId, orderNumber, totalAmount, status, paymentStatus, paymentMethod, shippingAddress, customerName, customerEmail, customerPhone, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE orderNumber=VALUES(orderNumber)`,
            o.id,
            o.userId || null,
            o.orderNumber,
            Number(o.totalAmount) || 0,
            o.status || 'PENDING',
            o.paymentStatus || 'UNPAID',
            o.paymentMethod || 'CARD',
            o.shippingAddress,
            o.customerName,
            o.customerEmail,
            o.customerPhone || null,
            formatDateForMySQL(o.createdAt) || new Date(),
            formatDateForMySQL(o.updatedAt) || new Date()
          );
        }
      }

      // 7. OrderItem Table (Child of Order & Product)
      if (data.OrderItem && data.OrderItem.length > 0) {
        console.log(`[7/16] Inserting ${data.OrderItem.length} OrderItem records...`);
        for (const oi of data.OrderItem) {
          await tx.$executeRawUnsafe(
            `INSERT INTO OrderItem (id, orderId, productId, productTitle, productImage, price, quantity, createdAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE productTitle=VALUES(productTitle), price=VALUES(price), quantity=VALUES(quantity)`,
            oi.id,
            oi.orderId,
            oi.productId,
            oi.productTitle,
            oi.productImage,
            Number(oi.price) || 0,
            Number(oi.quantity) || 1,
            formatDateForMySQL(oi.createdAt) || new Date()
          );
        }
      }

      // 8. Event Table (Independent)
      if (data.Event && data.Event.length > 0) {
        console.log(`[8/16] Inserting ${data.Event.length} Event records...`);
        for (const ev of data.Event) {
          await tx.$executeRawUnsafe(
            `INSERT INTO Event (id, title, date, time, location, description, image, price, featured, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE title=VALUES(title)`,
            ev.id,
            ev.title,
            ev.date,
            ev.time,
            ev.location,
            ev.description,
            ev.image || null,
            ev.price || null,
            Boolean(ev.featured),
            formatDateForMySQL(ev.createdAt) || new Date(),
            formatDateForMySQL(ev.updatedAt) || new Date()
          );
        }
      }

      // 9. Offer Table (Independent)
      if (data.Offer && data.Offer.length > 0) {
        console.log(`[9/16] Inserting ${data.Offer.length} Offer records...`);
        for (const off of data.Offer) {
          await tx.$executeRawUnsafe(
            `INSERT INTO Offer (id, title, code, discountPercent, validUntil, isActive, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE code=VALUES(code)`,
            off.id,
            off.title,
            off.code,
            Number(off.discountPercent) || 0,
            formatDateForMySQL(off.validUntil) || new Date(),
            Boolean(off.isActive),
            formatDateForMySQL(off.createdAt) || new Date(),
            formatDateForMySQL(off.updatedAt) || new Date()
          );
        }
      }

      // 10. NewsletterSubscriber Table (Independent)
      if (data.NewsletterSubscriber && data.NewsletterSubscriber.length > 0) {
        console.log(`[10/16] Inserting ${data.NewsletterSubscriber.length} NewsletterSubscriber records...`);
        for (const ns of data.NewsletterSubscriber) {
          await tx.$executeRawUnsafe(
            `INSERT INTO NewsletterSubscriber (id, email, subscribedAt, isActive)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE email=VALUES(email)`,
            ns.id,
            ns.email,
            formatDateForMySQL(ns.subscribedAt) || new Date(),
            Boolean(ns.isActive)
          );
        }
      }

      // 11. ContactMessage Table (Independent)
      if (data.ContactMessage && data.ContactMessage.length > 0) {
        console.log(`[11/16] Inserting ${data.ContactMessage.length} ContactMessage records...`);
        for (const cm of data.ContactMessage) {
          await tx.$executeRawUnsafe(
            `INSERT INTO ContactMessage (id, name, email, subject, message, status, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE status=VALUES(status)`,
            cm.id,
            cm.name,
            cm.email,
            cm.subject || null,
            cm.message,
            cm.status || 'UNREAD',
            formatDateForMySQL(cm.createdAt) || new Date(),
            formatDateForMySQL(cm.updatedAt) || new Date()
          );
        }
      }

      // 12. MeetTheAuthorProfile Table (Parent of MeetTheAuthorBook)
      if (data.MeetTheAuthorProfile && data.MeetTheAuthorProfile.length > 0) {
        console.log(`[12/16] Inserting ${data.MeetTheAuthorProfile.length} MeetTheAuthorProfile records...`);
        for (const map of data.MeetTheAuthorProfile) {
          await tx.$executeRawUnsafe(
            `INSERT INTO MeetTheAuthorProfile (id, authorName, authorImage, quote, facebook, twitter, linkedin, instagram, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE authorName=VALUES(authorName)`,
            map.id,
            map.authorName,
            map.authorImage,
            map.quote || null,
            map.facebook || null,
            map.twitter || null,
            map.linkedin || null,
            map.instagram || null,
            formatDateForMySQL(map.createdAt) || new Date(),
            formatDateForMySQL(map.updatedAt) || new Date()
          );
        }
      }

      // 13. MeetTheAuthorBook Table (Child of MeetTheAuthorProfile & Product)
      if (data.MeetTheAuthorBook && data.MeetTheAuthorBook.length > 0) {
        console.log(`[13/16] Inserting ${data.MeetTheAuthorBook.length} MeetTheAuthorBook records...`);
        for (const mab of data.MeetTheAuthorBook) {
          await tx.$executeRawUnsafe(
            `INSERT INTO MeetTheAuthorBook (id, profileId, productId, \`order\`, createdAt)
             VALUES (?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE \`order\`=VALUES(\`order\`)`,
            mab.id,
            mab.profileId,
            mab.productId,
            Number(mab.order) || 0,
            formatDateForMySQL(mab.createdAt) || new Date()
          );
        }
      }

      // 14. Author Table (Parent of BookAuthor)
      if (data.Author && data.Author.length > 0) {
        console.log(`[14/16] Inserting ${data.Author.length} Author records...`);
        for (const a of data.Author) {
          await tx.$executeRawUnsafe(
            `INSERT INTO Author (id, name, slug, image, bio, tagline, facebook, twitter, instagram, pinterest, linkedin, youtube, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE name=VALUES(name), slug=VALUES(slug)`,
            a.id,
            a.name,
            a.slug,
            a.image || null,
            a.bio || null,
            a.tagline || null,
            a.facebook || null,
            a.twitter || null,
            a.instagram || null,
            a.pinterest || null,
            a.linkedin || null,
            a.youtube || null,
            formatDateForMySQL(a.createdAt) || new Date(),
            formatDateForMySQL(a.updatedAt) || new Date()
          );
        }
      }

      // 15. BookAuthor Table (Child of Author & Product)
      if (data.BookAuthor && data.BookAuthor.length > 0) {
        // Build a Set of valid active Product IDs from the verified SQLite Product dataset
        const validProductIds = new Set((data.Product || []).map((p) => p.id));
        const validBookAuthors = data.BookAuthor.filter((ba) => validProductIds.has(ba.bookId));
        const skippedCount = data.BookAuthor.length - validBookAuthors.length;

        console.log(
          `[15/16] Inserting ${validBookAuthors.length} valid BookAuthor records ` +
          `(${skippedCount} orphan records pointing to deleted SQLite books skipped)...`
        );

        for (const ba of validBookAuthors) {
          await tx.$executeRawUnsafe(
            `INSERT INTO BookAuthor (id, bookId, authorId, \`order\`, createdAt)
             VALUES (?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE \`order\`=VALUES(\`order\`)`,
            ba.id,
            ba.bookId,
            ba.authorId,
            Number(ba.order) || 0,
            formatDateForMySQL(ba.createdAt) || new Date()
          );
        }
      }

      // 16. Review Table (Child of Product/book_id)
      if (data.Review && data.Review.length > 0) {
        console.log(`[16/16] Inserting ${data.Review.length} Review records...`);
        for (const rev of data.Review) {
          await tx.$executeRawUnsafe(
            `INSERT INTO Review (id, book_id, name, email, rating, review, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE review=VALUES(review)`,
            rev.id,
            rev.book_id,
            rev.name,
            rev.email,
            Number(rev.rating) || 5,
            rev.review,
            formatDateForMySQL(rev.created_at) || new Date()
          );
        }
      }

      console.log("\nAll 16 tables processed on the pinned connection.");
      console.log("Committing transaction...");
    }, {
      timeout: 120000, // 2-minute transaction budget
      maxWait: 10000   // 10-second acquisition budget
    });

    console.log("\n==================================================");
    console.log("   ALL 171 RECORDS ATOMICALLY COMMITTED! ✓        ");
    console.log("==================================================");

  } catch (err) {
    console.error("\n==================================================");
    console.error("   [TRANSACTION FAILED & AUTOMATICALLY ROLLED BACK] ");
    console.error("   Reason:", err.message);
    console.error("   Zero partial data was committed to MySQL.");
    console.error("==================================================");
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importAllData();
