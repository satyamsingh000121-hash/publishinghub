export type ProductBadge = "SALE" | "HOT" | "NEW" | "SALE_AND_HOT" | "SALE_AND_NEW";
export type ProductAvailability = "in-stock" | "on-sale" | "hot" | "out-of-stock";

export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  productCount?: number;
}

export interface AuthorProfileDTO {
  id?: string;
  name: string;
  slug?: string;
  image?: string | null;
  tagline?: string | null;
  bio?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  pinterest?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  books?: any[];
}

export interface ProductDTO {
  id: string;
  slug: string;
  title: string;
  author: string;
  authors?: string[];
  authorProfiles?: AuthorProfileDTO[];
  authorName?: string | null;
  authorImage?: string | null;
  authorQuote?: string | null;
  price: string;
  numericPrice: number;
  originalPrice?: string | null;
  badge?: ProductBadge | null;
  category: string;
  categoryId?: string | null;
  availability: ProductAvailability;
  image: string;
  coverId?: string | null;
  summary?: string | null;
  description?: string | null;
  stock: number;
  featured: boolean;
  showInMeetAuthor?: boolean;
  displayOrder?: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ProductFilterParams {
  category?: string;
  author?: string;
  minPrice?: number;
  maxPrice?: number;
  availability?: string;
  badge?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "price_asc" | "price_desc" | "title_asc" | "newest" | "featured";
}
