import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ensureSchemaUpdated } from "@/lib/db";
import { getBookBySlug, BookDetailData } from "@/lib/books";
import { MeetTheAuthorService } from "@/backend/services/meetTheAuthor.service";
import { AuthorService } from "@/backend/services/author.service";
import ProductClientView from "@/components/product/ProductClientView";

interface ProductPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

async function resolveSlug(params: Promise<{ slug: string }> | { slug: string }): Promise<string> {
  if (!params) return "";
  if (typeof (params as Promise<{ slug: string }>).then === "function") {
    const resolved = await params;
    return resolved.slug || "";
  }
  return (params as { slug: string }).slug || "";
}

async function getProductData(rawSlug: string): Promise<BookDetailData | null> {
  if (!rawSlug) return null;
  const cleanSlug = decodeURIComponent(rawSlug).toLowerCase().trim();

  // 1. Try querying the live Prisma SQLite database
  try {
    await ensureSchemaUpdated();
    const dbProduct = await prisma.product.findFirst({
      where: {
        OR: [
          { slug: cleanSlug },
          { id: rawSlug },
        ],
      },
    });

    if (dbProduct) {
      const prod = dbProduct as any;

      // Query related products from same category
      const relatedDb = await prisma.product.findMany({
        where: {
          category: prod.category,
          id: { not: prod.id },
        },
        take: 4,
      });

      // Query other books by same author
      const authorDb = await prisma.product.findMany({
        where: {
          author: prod.author,
          id: { not: prod.id },
        },
        take: 4,
      });

      // 1. Fetch dynamic Meet The Author profile first
      let mtaProfile: any = null;
      try {
        mtaProfile = await MeetTheAuthorService.getProfile();
      } catch (err) {
        console.error("Failed to load MeetTheAuthor profile:", err);
      }

      // Query multi-author profiles and their associated showcase books
      let authorsList: any[] = [];
      try {
        const rawAuthors = await AuthorService.getAuthorsForBook(prod.id, prod.author);
        if (rawAuthors && rawAuthors.length > 0) {
          authorsList = await Promise.all(
            rawAuthors.map(async (a) => {
              const cleanMtaName = (mtaProfile?.authorName || "").toLowerCase().trim();
              const cleanAuthorName = (a.name || "").toLowerCase().trim();
              const isMtaAuthor =
                cleanMtaName &&
                (cleanMtaName === cleanAuthorName ||
                  cleanMtaName.includes(cleanAuthorName) ||
                  cleanAuthorName.includes(cleanMtaName));

              const authorImage =
                isMtaAuthor && mtaProfile?.authorImage
                  ? mtaProfile.authorImage
                  : a.image;
              const authorQuote =
                isMtaAuthor && mtaProfile?.quote
                  ? mtaProfile.quote
                  : a.tagline || a.bio;
              const authorSocials = isMtaAuthor && mtaProfile
                ? {
                    facebook: mtaProfile.facebook || a.facebook,
                    twitter: mtaProfile.twitter || a.twitter,
                    linkedin: mtaProfile.linkedin || a.linkedin,
                    instagram: mtaProfile.instagram || a.instagram,
                    pinterest: a.pinterest,
                    youtube: a.youtube,
                  }
                : {
                    facebook: a.facebook,
                    twitter: a.twitter,
                    instagram: a.instagram,
                    pinterest: a.pinterest,
                    linkedin: a.linkedin,
                    youtube: a.youtube,
                  };

              const books =
                isMtaAuthor && mtaProfile?.books && mtaProfile.books.length > 0
                  ? mtaProfile.books
                  : await AuthorService.getShowcaseBooksForAuthor(a.name, a.id, prod.id);

              return {
                ...a,
                image: authorImage,
                quote: authorQuote,
                tagline: authorQuote,
                bio: authorQuote,
                books,
                ...authorSocials,
                isCurated: Boolean(isMtaAuthor),
              };
            })
          );

          // Prioritize curated Meet The Author profile to index 0 so it displays first by default
          authorsList.sort((x, y) => {
            if (x.isCurated && !y.isCurated) return -1;
            if (!x.isCurated && y.isCurated) return 1;
            return 0;
          });
        }
      } catch (err) {
        console.error("Failed to load multi-author profiles:", err);
      }

      const primaryAuthor = authorsList[0];

      return {
        id: prod.id,
        slug: prod.slug,
        title: prod.title,
        author: prod.author,
        authorsList: authorsList.length > 0 ? authorsList : undefined,
        authorName:
          primaryAuthor?.name ||
          mtaProfile?.authorName ||
          prod.authorName ||
          prod.author,
        authorImage:
          primaryAuthor?.image ||
          mtaProfile?.authorImage ||
          prod.authorImage ||
          "/images/author-01.jpg",
        authorQuote:
          primaryAuthor?.quote ||
          mtaProfile?.quote ||
          prod.authorQuote ||
          undefined,
        authorSocials: primaryAuthor
          ? {
              facebook: primaryAuthor.facebook,
              twitter: primaryAuthor.twitter,
              instagram: primaryAuthor.instagram,
              pinterest: primaryAuthor.pinterest,
              linkedin: primaryAuthor.linkedin,
              youtube: primaryAuthor.youtube,
            }
          : mtaProfile
          ? {
              facebook: mtaProfile.facebook,
              twitter: mtaProfile.twitter,
              linkedin: mtaProfile.linkedin,
              instagram: mtaProfile.instagram,
            }
          : undefined,
        price: prod.price,
        numericPrice: prod.numericPrice,
        originalPrice: prod.originalPrice || undefined,
        category: prod.category,
        badge: prod.badge || undefined,
        availability: prod.availability || (prod.stock <= 0 ? "out-of-stock" : "in-stock"),
        stock: prod.stock,
        rating: prod.rating ?? 5.0,
        reviewCount: prod.reviewCount ?? 0,
        image: prod.image,
        coverId: prod.coverId || undefined,
        summary: prod.summary || undefined,
        description: prod.description || undefined,
        isbn: prod.isbn || undefined,
        publisher: prod.publisher || undefined,
        publicationDate: prod.publicationDate || undefined,
        pages: prod.pages || undefined,
        language: prod.language || "English",
        format: prod.format || "Hardcover",
        authorBooks:
          primaryAuthor?.books && primaryAuthor.books.length > 0
            ? primaryAuthor.books
            : mtaProfile?.books && mtaProfile.books.length > 0
            ? mtaProfile.books.map((b: any) => ({
                id: b.id,
                title: b.title,
                price: b.price,
                oldPrice: b.oldPrice,
                slug: b.slug,
                image: b.image,
                badge: b.badge,
                author: b.author,
              }))
            : authorDb.length > 0
            ? authorDb.map((p) => ({
                id: p.id,
                title: p.title,
                price: p.price,
                oldPrice: p.originalPrice || undefined,
                slug: p.slug,
                image: p.image,
                badge: p.badge || undefined,
                author: p.author,
              }))
            : undefined,
        relatedBooks:
          relatedDb.length > 0
            ? relatedDb.map((p) => ({
                id: p.id,
                title: p.title,
                author: p.author,
                price: p.price,
                oldPrice: p.originalPrice || undefined,
                slug: p.slug,
                image: p.image,
                badge: p.badge || undefined,
                badgeType: p.badge?.toLowerCase().includes("sale") ? "sale" : "hot",
              }))
            : undefined,
      };
    }
  } catch (error) {
    console.error("Database product lookup error:", error);
  }

  // 2. Fallback to static catalog only if database has 0 products
  try {
    const count = await prisma.product.count();
    if (count === 0) {
      const staticBook = getBookBySlug(cleanSlug);
      if (staticBook && staticBook.title) {
        return staticBook;
      }
    }
  } catch {
    // ignore
  }

  return null;
}  

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  const slug = await resolveSlug(props.params);
  const book = await getProductData(slug);

  if (!book) {
    return {
      title: "Book Not Found | PublishingHub",
      description: "The requested book could not be found.",
    };
  }

  return {
    title: `${book.title} | PublishingHub`,
    description:
      book.summary ||
      book.description?.slice(0, 160) ||
      `Buy ${book.title} by ${book.author || "PublishingHub author"}.`,
    openGraph: {
      title: book.title,
      description: book.summary || undefined,
      images: book.image ? [{ url: book.image }] : [],
    },
  };
}

export default async function ProductDetailPage(props: ProductPageProps) {
  const slug = await resolveSlug(props.params);
  const book = await getProductData(slug);

  if (!book) {
    notFound();
  }

  return <ProductClientView book={book} />;
}
