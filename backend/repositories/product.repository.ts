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

    const where: any = {};

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

    return {
      products: products as unknown as ProductDTO[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async create(data: any) {
    return prisma.product.create({
      data,
    });
  }

  static async update(id: string, data: any) {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
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
