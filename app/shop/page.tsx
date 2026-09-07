import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ensureSchemaUpdated } from "@/lib/db";
import { getAllBooks } from "@/lib/books";
import { BookItem } from "@/components/shop/ShopBookCard";
import ShopClientView from "@/components/shop/ShopClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Shop Books | PublishingHub",
  description: "Explore our collection of curated books, poetry, literature, and children's stories.",
};

async function getShopBooks(): Promise<BookItem[]> {
  const catalog = getAllBooks() || [];
  const mappedCatalog: BookItem[] = catalog.map((b) => ({
    id: b.id || `cat-${b.slug}`,
    slug: b.slug,
    title: b.title,
    author: b.author || "PublishingHub Author",
    price: b.price || "£20.00",
    numericPrice: b.numericPrice || parseFloat((b.price || "20").replace(/[^0-9.]/g, "")) || 20,
    originalPrice: b.originalPrice || b.oldPrice || undefined,
    category: b.category || "Fiction",
    availability: (b.availability as any) || "in-stock",
    image: b.image || "/images/shop1.jpg",
    badge: (b.badge as any) || undefined,
    description: b.summary || b.description || undefined,
  }));

  try {
    await ensureSchemaUpdated();
    const dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (dbProducts.length === 0) {
      return mappedCatalog;
    }

    // Attach displayOrder from SQLite
    try {
      const orderRows = await prisma.$queryRawUnsafe<Array<{ id: string; displayOrder: number }>>(
        `SELECT id, COALESCE(displayOrder, 0) as displayOrder FROM Product`
      );
      const orderMap = new Map<string, number>();
      for (const r of orderRows) {
        orderMap.set(r.id, Number(r.displayOrder) || 0);
      }
      for (const p of dbProducts) {
        (p as any).displayOrder = orderMap.get(p.id) ?? 0;
      }
      dbProducts.sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    } catch {}

    const mappedDbProducts: BookItem[] = dbProducts.map((p) => {
      const prod = p as any;
      return {
        id: prod.id,
        slug: prod.slug,
        title: prod.title,
        author: prod.author,
        price: prod.price,
        numericPrice: prod.numericPrice,
        originalPrice: prod.originalPrice || undefined,
        category: prod.category,
        availability: (prod.availability as any) || (prod.stock <= 0 ? "out-of-stock" : "in-stock"),
        image: prod.image,
        badge: (prod.badge as any) || undefined,
        description: prod.summary || prod.description || undefined,
      };
    });

    // Return live database products directly in custom order
    return mappedDbProducts;
  } catch (error) {
    console.error("Failed to fetch shop books from database:", error);
    return mappedCatalog;
  }
}

export default async function ShopPage() {
  const books = await getShopBooks();
  return <ShopClientView initialBooks={books} />;
}
