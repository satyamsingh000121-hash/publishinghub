import { AddToCartSchema, UpdateCartItemSchema, CreateOrderSchema, ContactMessageSchema, NewsletterSubscriberSchema } from "@/lib/validations";
import { ZodError } from "zod";

export class OrderValidator {
  static validateAddToCart(data: unknown) {
    return AddToCartSchema.safeParse(data);
  }

  static validateUpdateCartItem(data: unknown) {
    return UpdateCartItemSchema.safeParse(data);
  }

  static validateCreateOrder(data: unknown) {
    return CreateOrderSchema.safeParse(data);
  }

  static validateContactMessage(data: unknown) {
    return ContactMessageSchema.safeParse(data);
  }

  static validateNewsletter(data: unknown) {
    return NewsletterSubscriberSchema.safeParse(data);
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
