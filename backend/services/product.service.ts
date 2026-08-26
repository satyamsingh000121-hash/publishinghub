import { ProductRepository } from "@/backend/repositories/product.repository";
import { ProductDTO, ProductFilterParams, CategoryDTO } from "@/types/product";

export class ProductService {
  static async getProducts(params?: ProductFilterParams) {
    return ProductRepository.findAll(params);
  }

  static async getProductById(id: string): Promise<ProductDTO | null> {
    const product = await ProductRepository.findById(id);
    return product as unknown as ProductDTO | null;
  }

  static async getProductBySlug(slug: string): Promise<ProductDTO | null> {
    const product = await ProductRepository.findBySlug(slug);
    return product as unknown as ProductDTO | null;
  }

  static async createProduct(data: any): Promise<ProductDTO> {
    const product = await ProductRepository.create(data);
    return product as unknown as ProductDTO;
  }

  static async updateProduct(id: string, data: any): Promise<ProductDTO> {
    const product = await ProductRepository.update(id, data);
    return product as unknown as ProductDTO;
  }

  static async deleteProduct(id: string): Promise<boolean> {
    await ProductRepository.delete(id);
    return true;
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
