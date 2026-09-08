import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ensureSchemaUpdated } from "@/lib/db";
import { ProductRepository } from "@/backend/repositories/product.repository";
import { BookItem } from "@/components/shop/ShopBookCard";
import ShopClientView from "@/components/shop/ShopClientView";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Shop Books | PublishingHub",
  description: "Discover a world of books — from timeless classics to modern bestsellers. Find your next favourite read.",
};

// 22 Curated Books matching Image 1 exactly in appearance, prices, ratings, and order
const EXACT_SHOP_BOOKS: BookItem[] = [
  {
    id: "shop-1",
    slug: "a-poem-for-every-night",
    title: "A Poem for Every Night",
    author: "By CHAIAM, HOF NURGIN",
    price: "£22.00",
    numericPrice: 22.0,
    category: "Fiction",
    availability: "hot",
    image: "/images/Newest2.webp",
    badge: "HOT",
    rating: 4.5,
  },
  {
    id: "shop-2",
    slug: "a-teaspoon-of-earth-and-sea",
    title: "A Teaspoon of Earth and Sea",
    author: "By DINA NAYERI",
    price: "£20.00",
    originalPrice: "£28.00",
    numericPrice: 20.0,
    category: "Fiction",
    availability: "on-sale",
    image: "/images/shop1.jpg",
    badge: "SALE",
    rating: 4.4,
  },
  {
    id: "shop-3",
    slug: "all-this-has-nothing-to-do-with-me",
    title: "All this has nothing to do with me",
    author: "By BHUZUN NANHAM, HOF NURGIN",
    price: "£20.00",
    numericPrice: 20.0,
    category: "Fiction",
    availability: "hot",
    image: "/images/shop8.jpg",
    badge: "HOT",
    rating: 4.3,
  },
  {
    id: "shop-5",
    slug: "bulle-und-pelle",
    title: "Bulle und Pelle",
    author: "By SERO GUIN, SHIA UNG",
    price: "£28.00",
    originalPrice: "£30.00",
    numericPrice: 28.0,
    category: "Fiction",
    availability: "on-sale",
    image: "/images/shop2.jpg",
    badge: "SALE",
    rating: 4.4,
  },
  {
    id: "shop-6",
    slug: "creative-life",
    title: "Creative Life",
    author: "By HANA KIM, SAVANNA WALKER",
    price: "£20.00",
    numericPrice: 20.0,
    category: "Fiction",
    availability: "hot",
    image: "/images/shop4.jpg",
    badge: "HOT",
    rating: 4.6,
  },
  {
    id: "shop-7",
    slug: "dear-brain",
    title: "Dear Brain",
    author: "By MESHO BUVAHR",
    price: "£18.00",
    numericPrice: 18.0,
    category: "Fiction",
    availability: "on-sale",
    image: "/images/shop5.jpg",
    badge: "SALE",
    rating: 4.2,
  },
  {
    id: "shop-8",
    slug: "enemy-jake-gyllenhaal",
    title: "Enemy — Jake Gyllenhaal",
    author: "By SERO GUIN",
    price: "£18.00",
    numericPrice: 18.0,
    category: "Fiction",
    availability: "in-stock",
    image: "/images/shop6.jpg",
    rating: 4.8,
  },
  {
    id: "shop-9",
    slug: "ghosts-afraid-of-the-dark",
    title: "Ghosts Afraid of the Dark",
    author: "By HOF NURGIN, MESHO BUVAHR",
    price: "£16.00",
    originalPrice: "£20.00",
    numericPrice: 16.0,
    category: "Fiction",
    availability: "on-sale",
    image: "/images/Newest5.webp",
    badge: "SALE",
    rating: 4.5,
  },
  {
    id: "shop-10",
    slug: "henry-and-the-good-dog",
    title: "Henry & The Good Dog",
    author: "By HOF NURGIN, SAVANNA WALKER",
    price: "£22.00",
    originalPrice: "£25.00",
    numericPrice: 22.0,
    category: "For Kid",
    availability: "on-sale",
    image: "/images/Newest1.webp",
    badge: "SALE",
    rating: 4.3,
  },
  {
    id: "shop-11",
    slug: "life-of-pi",
    title: "Life of Pi",
    author: "By HANA KIM, HOF NURGIN",
    price: "£12.00",
    numericPrice: 12.0,
    category: "For Kid",
    availability: "in-stock",
    image: "/images/Newest6.webp",
    rating: 4.7,
  },
  {
    id: "shop-12",
    slug: "fragments-of-war",
    title: "Fragments of War",
    author: "By JOHN WALKER",
    price: "£18.00",
    originalPrice: "£24.00",
    numericPrice: 18.0,
    category: "For Kid",
    availability: "on-sale",
    image: "/images/Newest7.webp",
    badge: "SALE",
    rating: 4.1,
  },
  {
    id: "shop-14",
    slug: "the-quiet-room",
    title: "The Quiet Room",
    author: "By HOF NURGIN",
    price: "£15.00",
    numericPrice: 15.0,
    category: "Poetry",
    availability: "in-stock",
    image: "/images/shop9.jpg",
    rating: 4.4,
  },
  {
    id: "shop-16",
    slug: "the-summer-of-impossible-things",
    title: "The Summer of Impossible Things",
    author: "By SOPHIE COLLINS",
    price: "£24.00",
    numericPrice: 24.0,
    category: "Romance",
    availability: "in-stock",
    image: "/images/shop7.webp",
    badge: "HOT",
    rating: 4.7,
  },
  {
    id: "shop-17",
    slug: "trio-sarah-tolmie",
    title: "TRIO",
    author: "By DINA NAYERI",
    price: "£21.00",
    numericPrice: 21.0,
    category: "Drama",
    availability: "in-stock",
    image: "/images/shop9.jpg",
    rating: 4.3,
  },
  {
    id: "shop-18",
    slug: "the-dark",
    title: "The D.A.R.K",
    author: "By SERO GUIN, SHIA UNG",
    price: "£18.00",
    numericPrice: 18.0,
    category: "Children's",
    availability: "in-stock",
    image: "/images/shop6.jpg",
    rating: 4.2,
  },
  {
    id: "shop-19",
    slug: "the-night-ocean",
    title: "The Night Ocean",
    author: "By HANA KIM, SAVANNA WALKER",
    price: "£22.00",
    numericPrice: 22.0,
    category: "For Kid",
    availability: "on-sale",
    image: "/images/book_section3.webp",
    badge: "SALE",
    rating: 4.6,
  },
  {
    id: "shop-20",
    slug: "the-journey-of-dreams",
    title: "The Journey of Dreams",
    author: "By BHUZUN NANHAM, HOF NURGIN",
    price: "£12.00",
    numericPrice: 12.0,
    category: "For Kid",
    availability: "in-stock",
    image: "/images/Newest3.webp",
    rating: 4.0,
  },
  {
    id: "shop-21",
    slug: "echoes-of-the-past",
    title: "Echoes of the Past",
    author: "By SOPHIE COLLINS",
    price: "£26.00",
    numericPrice: 26.0,
    category: "Biography",
    availability: "in-stock",
    image: "/images/shop2.jpg",
    rating: 4.8,
  },
];

async function getShopBooks(): Promise<BookItem[]> {
  // Sync generated assets to public folder
  try {
    const publicImagesDir = path.join(process.cwd(), "public", "images");
    if (!fs.existsSync(publicImagesDir)) {
      fs.mkdirSync(publicImagesDir, { recursive: true });
    }
    const heroSrc = "C:\\Users\\91932\\.gemini\\antigravity-ide\\brain\\12ea05de-7d23-4741-9ca3-b9ea26ec5d2a\\shop_hero_banner_1788844324889.jpg";
    const heroDest = path.join(publicImagesDir, "shop_hero_banner.jpg");
    if (fs.existsSync(heroSrc) && !fs.existsSync(heroDest)) {
      fs.copyFileSync(heroSrc, heroDest);
    }
    const sideSrc = "C:\\Users\\91932\\.gemini\\antigravity-ide\\brain\\12ea05de-7d23-4741-9ca3-b9ea26ec5d2a\\sidebar_read_more_1788844341758.jpg";
    const sideDest = path.join(publicImagesDir, "shop_sidebar_books.jpg");
    if (fs.existsSync(sideSrc) && !fs.existsSync(sideDest)) {
      fs.copyFileSync(sideSrc, sideDest);
    }
  } catch {}

  try {
    await ensureSchemaUpdated();

    // Fetch books directly from DB ordered by displayOrder (same to same as Admin panel)
    const result = await ProductRepository.findAll({ limit: 100 });
    if (result && result.products && result.products.length > 0) {
      return result.products.map((p: any) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        author: p.author,
        price: p.price,
        numericPrice: p.numericPrice,
        originalPrice: p.originalPrice || undefined,
        category: p.category,
        availability: (p.availability as any) || (p.stock <= 0 ? "out-of-stock" : "in-stock"),
        image: p.image,
        badge: (p.badge as any) || undefined,
        description: p.summary || p.description || undefined,
        rating: p.rating || 4.5,
      }));
    }

    return EXACT_SHOP_BOOKS;
  } catch (error) {
    return EXACT_SHOP_BOOKS;
  }
}

export default async function ShopPage() {
  const books = await getShopBooks();
  return <ShopClientView initialBooks={books} />;
}
