import { CreateProductSchema, UpdateProductSchema, CreateCategorySchema } from "@/lib/validations";
import { ZodError } from "zod";

export class ProductValidator {
  static validateCreateProduct(data: unknown) {
    return CreateProductSchema.safeParse(data);
  }

  static validateUpdateProduct(data: unknown) {
    return UpdateProductSchema.safeParse(data);
  }

  static validateCreateCategory(data: unknown) {
    return CreateCategorySchema.safeParse(data);
  }

  static formatErrors(error: ZodError): Record<string, string> {
    const formatted: Record<string, string> = {};
    error.errors.forEach((err) => {
      const field = err.path.join(".");
      if (field) {
        formatted[field] = err.message;
      }
    });
    return formatted;
  }
}
