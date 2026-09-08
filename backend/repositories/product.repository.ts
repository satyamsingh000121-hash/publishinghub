import { prisma } from "@/lib/prisma";
import { ProductDTO, ProductFilterParams } from "@/types/product";

export class ProductRepository {
  static async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: { categoryRel: true },
    });
  }

  static async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug: slug.toLowerCase() },
      include: { categoryRel: true },
    });
  }

  static async findAll(params?: ProductFilterParams) {
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {
      slug: { notIn: ["bulle-and-pelle", "visions-of-victory"] },
    };

    if (params?.category && params.category !== "all") {
      where.category = { contains: params.category };
    }

    if (params?.author) {
      where.author = { contains: params.author };
    }

    if (params?.minPrice !== undefined || params?.maxPrice !== undefined) {
      where.numericPrice = {};
      if (params.minPrice !== undefined) where.numericPrice.gte = params.minPrice;
      if (params.maxPrice !== undefined) where.numericPrice.lte = params.maxPrice;
    }

    if (params?.availability) {
      where.availability = params.availability;
    }

    if (params?.badge) {
      where.badge = params.badge;
    }

    if (params?.search) {
      where.OR = [
        { title: { contains: params.search } },
        { author: { contains: params.search } },
        { category: { contains: params.search } },
        { description: { contains: params.search } },
      ];
    }

    let orderBy: any = { createdAt: "desc" };
    if (params?.sortBy === "price_asc") orderBy = { numericPrice: "asc" };
    if (params?.sortBy === "price_desc") orderBy = { numericPrice: "desc" };
    if (params?.sortBy === "title_asc") orderBy = { title: "asc" };
    if (params?.sortBy === "featured") orderBy = [{ featured: "desc" }, { createdAt: "desc" }];

    if (!params?.sortBy) {
      // Global ordering by displayOrder
      const allMatching = await prisma.product.findMany({
        where,
        select: { id: true, createdAt: true },
      });

      let orderMap = new Map<string, number>();
      try {
        const orderRows = await prisma.$queryRawUnsafe<Array<{ id: string; displayOrder: number }>>(
          `SELECT id, COALESCE(displayOrder, 0) as displayOrder FROM Product`
        );
        for (const r of orderRows) {
          orderMap.set(r.id, Number(r.displayOrder) || 0);
        }
      } catch {}

      allMatching.sort((a, b) => {
        const ordA = orderMap.get(a.id) ?? 0;
        const ordB = orderMap.get(b.id) ?? 0;
        if (ordA !== ordB) return ordA - ordB;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      const total = allMatching.length;
      const pageSlice = allMatching.slice(skip, skip + limit);
      const pageIds = pageSlice.map((p) => p.id);

      const products = await prisma.product.findMany({
        where: { id: { in: pageIds } },
        include: { categoryRel: true },
      });

      const prodMap = new Map(products.map((p) => [p.id, p]));
      const orderedProducts: any[] = [];
      for (const item of pageSlice) {
        const p = prodMap.get(item.id);
        if (p) {
          (p as any).displayOrder = orderMap.get(item.id) ?? 0;
          orderedProducts.push(p);
        }
      }

      return {
        products: orderedProducts as unknown as ProductDTO[],
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    }

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: { categoryRel: true },
      }),
    ]);

    // Attach displayOrder from SQLite
    try {
      const orderRows = await prisma.$queryRawUnsafe<Array<{ id: string; displayOrder: number }>>(
        `SELECT id, COALESCE(displayOrder, 0) as displayOrder FROM Product`
      );
      const orderMap = new Map<string, number>();
      for (const r of orderRows) {
        orderMap.set(r.id, Number(r.displayOrder) || 0);
      }
      for (const p of products) {
        (p as any).displayOrder = orderMap.get(p.id) ?? 0;
      }
    } catch {}

    return {
      products: products as unknown as ProductDTO[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async reorder(ids: string[], startIndex: number = 0): Promise<boolean> {
    if (!Array.isArray(ids) || ids.length === 0) return false;
    for (let i = 0; i < ids.length; i++) {
      try {
        await prisma.$executeRawUnsafe(
          `UPDATE Product SET displayOrder = ? WHERE id = ? OR slug = ?`,
          startIndex + i,
          ids[i],
          ids[i].toLowerCase()
        );
      } catch (err) {
        console.error(`Failed to update displayOrder for book ${ids[i]}:`, err);
      }
    }
    return true;
  }

  static async create(data: any) {
    const {
      categoryId,
      categoryRel,
      isbn,
      publisher,
      publicationDate,
      pages,
      language,
      format,
      rating,
      reviewCount,
      ...cleanData
    } = data;

    if (categoryId) {
      cleanData.categoryRel = { connect: { id: categoryId } };
    } else if (categoryRel) {
      cleanData.categoryRel = categoryRel;
    }

    const product = await prisma.product.create({
      data: cleanData,
    });

    const extraUpdates: string[] = [];
    const extraParams: any[] = [];
    if (isbn !== undefined) { extraUpdates.push("isbn = ?"); extraParams.push(isbn); }
    if (publisher !== undefined) { extraUpdates.push("publisher = ?"); extraParams.push(publisher); }
    if (publicationDate !== undefined) { extraUpdates.push("publicationDate = ?"); extraParams.push(publicationDate); }
    if (pages !== undefined) { extraUpdates.push("pages = ?"); extraParams.push(pages); }
    if (language !== undefined) { extraUpdates.push("language = ?"); extraParams.push(language); }
    if (format !== undefined) { extraUpdates.push("format = ?"); extraParams.push(format); }
    if (rating !== undefined) { extraUpdates.push("rating = ?"); extraParams.push(rating); }
    if (reviewCount !== undefined) { extraUpdates.push("reviewCount = ?"); extraParams.push(reviewCount); }

    if (extraUpdates.length > 0 && product?.id) {
      try {
        extraParams.push(product.id);
        await prisma.$executeRawUnsafe(
          `UPDATE Product SET ${extraUpdates.join(", ")} WHERE id = ?`,
          ...extraParams
        );
      } catch (err) {
        console.error("Failed to update extra product columns:", err);
      }
    }

    return product;
  }

  static async update(idOrSlug: string, data: any) {
    const existing = await prisma.product.findFirst({
      where: {
        OR: [
          { id: idOrSlug },
          { slug: idOrSlug.toLowerCase() },
        ],
      },
    });

    if (!existing) {
      throw new Error(`Book '${idOrSlug}' not found.`);
    }

    const id = existing.id;

    const {
      categoryId,
      categoryRel,
      isbn,
      publisher,
      publicationDate,
      pages,
      language,
      format,
      rating,
      reviewCount,
      ...cleanData
    } = data;

    if (categoryId) {
      cleanData.categoryRel = { connect: { id: categoryId } };
    } else if (categoryId === null) {
      cleanData.categoryRel = { disconnect: true };
    } else if (categoryRel) {
      cleanData.categoryRel = categoryRel;
    }

    const product = await prisma.product.update({
      where: { id },
      data: cleanData,
    });

    const extraUpdates: string[] = [];
    const extraParams: any[] = [];
    if (isbn !== undefined) { extraUpdates.push("isbn = ?"); extraParams.push(isbn); }
    if (publisher !== undefined) { extraUpdates.push("publisher = ?"); extraParams.push(publisher); }
    if (publicationDate !== undefined) { extraUpdates.push("publicationDate = ?"); extraParams.push(publicationDate); }
    if (pages !== undefined) { extraUpdates.push("pages = ?"); extraParams.push(pages); }
    if (language !== undefined) { extraUpdates.push("language = ?"); extraParams.push(language); }
    if (format !== undefined) { extraUpdates.push("format = ?"); extraParams.push(format); }
    if (rating !== undefined) { extraUpdates.push("rating = ?"); extraParams.push(rating); }
    if (reviewCount !== undefined) { extraUpdates.push("reviewCount = ?"); extraParams.push(reviewCount); }

    if (extraUpdates.length > 0 && id) {
      try {
        extraParams.push(id);
        await prisma.$executeRawUnsafe(
          `UPDATE Product SET ${extraUpdates.join(", ")} WHERE id = ?`,
          ...extraParams
        );
      } catch (err) {
        console.error("Failed to update extra product columns on update:", err);
      }
    }

    return product;
  }

  static async delete(idOrSlug: string) {
    const existing = await prisma.product.findFirst({
      where: {
        OR: [
          { id: idOrSlug },
          { slug: idOrSlug.toLowerCase() },
        ],
      },
    });

    if (!existing) {
      // Already deleted or not found
      return null;
    }

    const id = existing.id;

    // Delete associated cart items first to prevent FK constraints
    try {
      await prisma.cartItem.deleteMany({
        where: { productId: id },
      });
    } catch {}

    // Delete associated order items if any
    try {
      await prisma.orderItem.deleteMany({
        where: { productId: id },
      });
    } catch {}

    return prisma.product.delete({
      where: { id },
    });
  }

  // Categories
  static async findAllCategories() {
    return prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: "asc" },
    });
  }

  static async findCategoryById(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  static async createCategory(data: { name: string; slug: string; description?: string }) {
    return prisma.category.create({
      data,
    });
  }

  static async updateCategory(id: string, data: { name?: string; slug?: string; description?: string }) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  static async deleteCategory(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  }
}
