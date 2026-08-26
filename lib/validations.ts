import { z } from "zod";

// Auth Validation Schemas
export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN"]).optional().default("USER"),
  phoneNumber: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phoneNumber: z.string().optional(),
  avatar: z.string().optional(),
});

// Product Validation Schemas
export const CreateProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  author: z.string().min(1, "Author is required"),
  authorName: z.string().optional(),
  authorImage: z.string().optional(),
  authorQuote: z.string().optional(),
  price: z.string().min(1, "Price string is required (e.g. £20.00)"),
  numericPrice: z.number().positive("Numeric price must be positive"),
  originalPrice: z.string().optional(),
  badge: z.enum(["SALE", "HOT", "NEW", "SALE_AND_HOT", "SALE_AND_NEW"]).optional().nullable(),
  category: z.string().min(1, "Category is required"),
  categoryId: z.string().optional().nullable(),
  availability: z.enum(["in-stock", "on-sale", "hot", "out-of-stock"]).optional().default("in-stock"),
  image: z.string().min(1, "Product image is required"),
  coverId: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  stock: z.number().int().nonnegative().optional().default(100),
  featured: z.boolean().optional().default(false),
});

export const UpdateProductSchema = CreateProductSchema.partial();

// Category Validation Schemas
export const CreateCategorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional(),
});

// Cart Validation Schemas
export const AddToCartSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().positive("Quantity must be greater than zero").default(1),
});

export const UpdateCartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().nonnegative("Quantity cannot be negative"),
});

// Order Validation Schemas
export const CreateOrderSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().min(5, "Shipping address is required"),
  paymentMethod: z.string().default("CARD"),
  items: z.array(
    z.object({
      productId: z.string().min(1, "Product ID is required"),
      quantity: z.number().int().positive("Quantity must be positive"),
    })
  ).min(1, "Order must contain at least one item"),
});

// Contact & Newsletter Schemas
export const ContactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email is required"),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export const NewsletterSubscriberSchema = z.object({
  email: z.string().email("Valid email is required"),
});
