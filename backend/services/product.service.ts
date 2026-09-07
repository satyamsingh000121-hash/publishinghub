import { ProductRepository } from "@/backend/repositories/product.repository";
import { ProductDTO, ProductFilterParams, CategoryDTO } from "@/types/product";
import { ensureSchemaUpdated, prisma } from "@/lib/db";
import { ALL_BOOKS_DATABASE } from "@/lib/books";

export class ProductService {
  static async syncLiveBooksToDb(): Promise<{ count: number; total: number }> {
    await ensureSchemaUpdated();

    // 1. Fetch existing categories to prevent unique constraint conflicts
    const existingCats = await prisma.category.findMany();
    const categoryMap = new Map<string, string>();
    for (const ec of existingCats) {
      categoryMap.set(ec.name.toLowerCase().trim(), ec.id);
      categoryMap.set(ec.slug.toLowerCase().trim(), ec.id);
    }

    const categoryNames = Array.from(
      new Set(ALL_BOOKS_DATABASE.map((b) => b.category || "Literature").filter(Boolean))
    );

    for (const catName of categoryNames) {
      const cleanName = catName.trim();
      const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "literature";

      if (!categoryMap.has(cleanName.toLowerCase()) && !categoryMap.has(slug)) {
        try {
          const newCat = await prisma.category.create({
            data: {
              name: cleanName,
              slug,
              description: `Explore our finest collection of ${cleanName} books.`,
            },
          });
          categoryMap.set(cleanName.toLowerCase(), newCat.id);
          categoryMap.set(slug, newCat.id);
        } catch {
          // If collision occurs, find by name or slug
          try {
            const foundCat = await prisma.category.findFirst({
              where: { OR: [{ name: cleanName }, { slug }] },
            });
            if (foundCat) {
              categoryMap.set(cleanName.toLowerCase(), foundCat.id);
              categoryMap.set(slug, foundCat.id);
            }
          } catch {}
        }
      }
    }

    // 2. Safely upsert each book from ALL_BOOKS_DATABASE
    let syncedCount = 0;
    for (const book of ALL_BOOKS_DATABASE) {
      try {
        const rawSlug = book.slug || book.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const cleanSlug = (rawSlug || `book-${Date.now()}`).toLowerCase().trim();
        const categoryName = (book.category || "Literature").trim();
        const categoryId =
          categoryMap.get(categoryName.toLowerCase()) ||
          categoryMap.get(categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-")) ||
          null;

        const numPrice =
          typeof book.numericPrice === "number" && !isNaN(book.numericPrice)
            ? book.numericPrice
            : parseFloat((book.price || "20").replace(/[^0-9.]/g, "")) || 20.0;

        const formattedPrice = book.price?.startsWith("£") ? book.price : `£${numPrice.toFixed(2)}`;

        // Check if book exists by slug OR by title
        const existing = await prisma.product.findFirst({
          where: {
            OR: [
              { slug: cleanSlug },
              { title: book.title.trim() },
            ],
          },
        });

        const bookPayload: any = {
          title: book.title.trim(),
          author: book.author || "Unknown Author",
          authorName: book.authorName || null,
          authorImage: book.authorImage || null,
          authorQuote: book.authorQuote || null,
          price: formattedPrice,
          numericPrice: numPrice,
          originalPrice: book.originalPrice || book.oldPrice || null,
          badge: (book.badge as any) || null,
          category: categoryName,
          availability: book.availability || "in-stock",
          image: book.image || "/images/shop1.jpg",
          coverId: book.coverId || null,
          summary: book.summary || null,
          description: book.description || null,
          stock: existing ? existing.stock : 100,
        };

        const targetCategoryId = categoryId || (existing ? (existing as any).categoryId : null);
        if (targetCategoryId) {
          bookPayload.categoryRel = { connect: { id: targetCategoryId } };
        }

        let savedProduct: any;
        if (existing) {
          savedProduct = await prisma.product.update({
            where: { id: existing.id },
            data: bookPayload,
          });
        } else {
          savedProduct = await prisma.product.create({
            data: {
              ...bookPayload,
              slug: cleanSlug,
              featured: syncedCount < 6,
            },
          });
        }

        if (savedProduct?.id && (book.isbn || book.publisher || book.pages || book.publicationDate)) {
          try {
            await prisma.$executeRawUnsafe(
              `UPDATE Product SET isbn = ?, publisher = ?, pages = ?, publicationDate = ? WHERE id = ?`,
              book.isbn || null,
              book.publisher || null,
              book.pages || null,
              book.publicationDate || null,
              savedProduct.id
            );
          } catch {}
        }

        syncedCount++;
      } catch (bookErr) {
        console.error(`Error saving book "${book.title}":`, bookErr);
      }
    }

    const total = await prisma.product.count();
    return { count: syncedCount, total };
  }

  static async getProducts(params?: ProductFilterParams) {
    await ensureSchemaUpdated();

    // Only auto-sync on initial run when database is completely empty (0 books)
    try {
      const currentCount = await prisma.product.count();
      if (currentCount === 0) {
        await this.syncLiveBooksToDb();
      }
    } catch (err) {
      console.error("Initial auto-sync error:", err);
    }

    return ProductRepository.findAll(params);
  }

  static async getProductById(id: string): Promise<ProductDTO | null> {
    await ensureSchemaUpdated();
    const product = await ProductRepository.findById(id);
    return product as unknown as ProductDTO | null;
  }

  static async getProductBySlug(slug: string): Promise<ProductDTO | null> {
    await ensureSchemaUpdated();
    const cleanSlug = slug.toLowerCase().trim();
    const product = await ProductRepository.findBySlug(cleanSlug);
    return product as unknown as ProductDTO | null;
  }

  static async createProduct(data: any): Promise<ProductDTO> {
    await ensureSchemaUpdated();

    // Generate clean, URL-friendly unique slug
    const rawTitle = data.title || "Book";
    const baseSlug = (data.slug || rawTitle)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") || `book-${Date.now()}`;

    let finalSlug = baseSlug;
    const existing = await ProductRepository.findBySlug(finalSlug);
    if (existing) {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }
    data.slug = finalSlug;

    const product = await ProductRepository.create(data);
    return product as unknown as ProductDTO;
  }

  static async updateProduct(id: string, data: any): Promise<ProductDTO> {
    await ensureSchemaUpdated();
    const product = await ProductRepository.update(id, data);
    return product as unknown as ProductDTO;
  }

  static async deleteProduct(id: string): Promise<boolean> {
    await ensureSchemaUpdated();
    await ProductRepository.delete(id);
    return true;
  }

  static async reorderProducts(ids: string[], startIndex: number = 0): Promise<boolean> {
    await ensureSchemaUpdated();
    return ProductRepository.reorder(ids, startIndex);
  }

  // Categories
  static async getCategories(): Promise<CategoryDTO[]> {
    const categories = await ProductRepository.findAllCategories();
    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      productCount: c._count.products,
    }));
  }

  static async getCategoryById(id: string) {
    return ProductRepository.findCategoryById(id);
  }

  static async createCategory(data: { name: string; slug: string; description?: string }) {
    return ProductRepository.createCategory(data);
  }

  static async updateCategory(id: string, data: { name?: string; slug?: string; description?: string }) {
    return ProductRepository.updateCategory(id, data);
  }

  static async deleteCategory(id: string) {
    return ProductRepository.deleteCategory(id);
  }
}
