const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const books = await prisma.product.findMany({
    select: { id: true, title: true, slug: true, author: true, showInMeetAuthor: true }
  });
  console.log("Found " + books.length + " books:");
  books.forEach(b => console.log(`- [${b.id}] ${b.title} (slug: ${b.slug}) | author: ${b.author} | showInMeet: ${b.showInMeetAuthor}`));
}

check().catch(console.error).finally(() => prisma.$disconnect());
