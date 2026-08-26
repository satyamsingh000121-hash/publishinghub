import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ALL_BOOKS_DATABASE } from "../lib/books";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Default Users
  const adminPasswordHash = await bcrypt.hash("admin123456", 10);
  const userPasswordHash = await bcrypt.hash("user123456", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@publishinghub.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@publishinghub.com",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      avatar: "/images/author-01.jpg",
    },
  });

  const demoUser = await prisma.user.upsert({
    where: { email: "user@publishinghub.com" },
    update: {},
    create: {
      name: "Demo Customer",
      email: "user@publishinghub.com",
      passwordHash: userPasswordHash,
      role: "USER",
      avatar: "/images/author-02.jpg",
    },
  });

  console.log(`Created admin: ${admin.email} and demo user: ${demoUser.email}`);

  // 2. Extract and create unique Categories
  const categoryNames = Array.from(
    new Set(ALL_BOOKS_DATABASE.map((b) => b.category || "Literature"))
  );

  const categoryMap = new Map<string, string>();

  for (const catName of categoryNames) {
    const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const category = await prisma.category.upsert({
      where: { slug },
      update: { name: catName },
      create: {
        name: catName,
        slug,
        description: `Explore our finest collection of ${catName} books.`,
      },
    });
    categoryMap.set(catName, category.id);
  }

  console.log(`Created ${categoryNames.length} categories.`);

  // 3. Seed Products from ALL_BOOKS_DATABASE
  let count = 0;
  for (const book of ALL_BOOKS_DATABASE) {
    const slug = (book.slug || book.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")).toLowerCase();
    const categoryName = book.category || "Literature";
    const categoryId = categoryMap.get(categoryName);

    await prisma.product.upsert({
      where: { slug },
      update: {
        title: book.title,
        author: book.author || "Unknown Author",
        authorName: book.authorName || null,
        authorImage: book.authorImage || null,
        authorQuote: book.authorQuote || null,
        price: book.price,
        numericPrice: book.numericPrice || parseFloat(book.price.replace(/[^0-9.]/g, "")) || 20.0,
        originalPrice: book.originalPrice || book.oldPrice || null,
        badge: book.badge || null,
        category: categoryName,
        categoryId: categoryId || null,
        availability: book.availability || "in-stock",
        image: book.image || "/images/shop1.jpg",
        coverId: book.coverId || null,
        summary: book.summary || null,
        description: book.description || null,
        stock: 100,
        featured: count < 6,
      },
      create: {
        slug,
        title: book.title,
        author: book.author || "Unknown Author",
        authorName: book.authorName || null,
        authorImage: book.authorImage || null,
        authorQuote: book.authorQuote || null,
        price: book.price,
        numericPrice: book.numericPrice || parseFloat(book.price.replace(/[^0-9.]/g, "")) || 20.0,
        originalPrice: book.originalPrice || book.oldPrice || null,
        badge: book.badge || null,
        category: categoryName,
        categoryId: categoryId || null,
        availability: book.availability || "in-stock",
        image: book.image || "/images/shop1.jpg",
        coverId: book.coverId || null,
        summary: book.summary || null,
        description: book.description || null,
        stock: 100,
        featured: count < 6,
      },
    });
    count++;
  }

  console.log(`Seeded ${count} products.`);

  // 4. Seed sample Offers
  await prisma.offer.upsert({
    where: { code: "WELCOME20" },
    update: {},
    create: {
      title: "New Reader 20% Discount",
      code: "WELCOME20",
      discountPercent: 20.0,
      validUntil: new Date("2027-12-31"),
      isActive: true,
    },
  });

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
