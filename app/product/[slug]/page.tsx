import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ensureSchemaUpdated } from "@/lib/db";
import { getBookBySlug, BookDetailData } from "@/lib/books";
import { MeetTheAuthorService } from "@/backend/services/meetTheAuthor.service";
import { AuthorService } from "@/backend/services/author.service";
import ProductClientView from "@/components/product/ProductClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
          { slug: rawSlug.trim().toLowerCase() },
        ],
      },
    });

    if (dbProduct) {
      const prod = dbProduct as any;

      // Query related products from same category
      let relatedDb: any[] = [];
      try {
        relatedDb = await prisma.product.findMany({
          where: {
            category: prod.category,
            id: { not: prod.id },
          },
          take: 4,
        });
      } catch (e) {
        // ignore
      }

      // Query other books by same author
      let authorDb: any[] = [];
      try {
        authorDb = await prisma.product.findMany({
          where: {
            author: prod.author,
            id: { not: prod.id },
          },
          take: 4,
        });
      } catch (e) {
        // ignore
      }

      // Query multi-author profiles and their associated showcase books
      let authorsList: any[] = [];
      try {
        const rawAuthors = await AuthorService.getAuthorsForBook(prod.id, prod.author);
        if (rawAuthors && rawAuthors.length > 0) {
          authorsList = await Promise.all(
            rawAuthors.map(async (a) => {
              // Fetch specific Meet The Author profile by author name
              const mtaProf = await MeetTheAuthorService.getProfileByAuthorName(a.name);

              const authorImage = mtaProf?.authorImage || a.image || "/images/author-01.jpg";
              const authorQuote = mtaProf?.quote || a.tagline || a.bio || "";
              const authorSocials = {
                facebook: mtaProf?.facebook || a.facebook || "#facebook",
                twitter: mtaProf?.twitter || a.twitter || "#twitter",
                linkedin: mtaProf?.linkedin || a.linkedin || "#linkedin",
                instagram: mtaProf?.instagram || a.instagram || "#instagram",
                pinterest: a.pinterest,
                youtube: a.youtube,
              };

              // Use assigned showcase books from admin (preserve all assigned books)
              const rawBooks = mtaProf?.books && mtaProf.books.length > 0
                ? mtaProf.books
                : await AuthorService.getShowcaseBooksForAuthor(a.name, a.id, prod.id);

              const assignedBooks = rawBooks && rawBooks.length > 0 ? rawBooks : [];

              return {
                ...a,
                image: authorImage,
                quote: authorQuote,
                tagline: authorQuote,
                bio: authorQuote,
                books: assignedBooks,
                ...authorSocials,
                isCurated: Boolean(mtaProf && assignedBooks.length > 0),
              };
            })
          );
        }
      } catch (err) {
        console.error("Failed to load multi-author profiles:", err);
      }

      // If DB returned no authors, check static catalog author names and enrich with DB profiles
      if (authorsList.length === 0) {
        try {
          const staticFallback = getBookBySlug(cleanSlug) || getBookBySlug(rawSlug);
          if (staticFallback?.authorsList && staticFallback.authorsList.length > 0) {
            authorsList = await Promise.all(
              staticFallback.authorsList.map(async (sa) => {
                const mtaProf = await MeetTheAuthorService.getProfileByAuthorName(sa.name);
                return {
                  ...sa,
                  image: mtaProf?.authorImage || sa.image || "/images/author-01.jpg",
                  quote: mtaProf?.quote || sa.quote || "",
                  tagline: mtaProf?.quote || sa.quote || "",
                  bio: mtaProf?.quote || sa.quote || "",
                  facebook: mtaProf?.facebook || sa.facebook || "#facebook",
                  twitter: mtaProf?.twitter || sa.twitter || "#twitter",
                  linkedin: mtaProf?.linkedin || sa.linkedin || "#linkedin",
                  instagram: mtaProf?.instagram || sa.instagram || "#instagram",
                  books: mtaProf?.books && mtaProf.books.length > 0 ? mtaProf.books : sa.books,
                };
              })
            );
          }
        } catch {}
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
          prod.authorName ||
          prod.author,
        authorImage:
          primaryAuthor?.image ||
          prod.authorImage ||
          "/images/author-01.jpg",
        authorQuote:
          primaryAuthor?.quote ||
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
            : [],
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

  // 2. Fallback to static catalog if book is not in DB or DB query failed
  try {
    const staticBook = getBookBySlug(cleanSlug) || getBookBySlug(rawSlug);
    if (staticBook && staticBook.title) {
      // Enrich staticBook with live Meet The Author profiles from database
      const authorStr = staticBook.author || staticBook.authorName || "";
      const rawNames = authorStr
        .replace(/^By\s+/i, "")
        .split(/,\s*|\s+and\s+|\s*&\s*/i)
        .map((s) => s.trim())
        .filter(Boolean);

      if (staticBook.authorsList && staticBook.authorsList.length > 0) {
        for (const sa of staticBook.authorsList) {
          if (!rawNames.some((n) => n.toLowerCase() === sa.name.toLowerCase())) {
            rawNames.push(sa.name);
          }
        }
      }

      if (rawNames.length > 0) {
        const enrichedAuthors = await Promise.all(
          rawNames.map(async (name) => {
            const mtaProf = await MeetTheAuthorService.getProfileByAuthorName(name);
            const baseAuthor = staticBook.authorsList?.find((a) => a.name.toLowerCase() === name.toLowerCase());
            return {
              name: mtaProf?.authorName || name,
              image: mtaProf?.authorImage || baseAuthor?.image || staticBook.authorImage || "/images/author-01.jpg",
              quote: mtaProf?.quote || baseAuthor?.quote || staticBook.authorQuote || "",
              tagline: mtaProf?.quote || baseAuthor?.quote || staticBook.authorQuote || "",
              bio: mtaProf?.quote || baseAuthor?.quote || staticBook.authorQuote || "",
              facebook: mtaProf?.facebook || baseAuthor?.facebook || "#facebook",
              twitter: mtaProf?.twitter || baseAuthor?.twitter || "#twitter",
              linkedin: mtaProf?.linkedin || baseAuthor?.linkedin || "#linkedin",
              instagram: mtaProf?.instagram || baseAuthor?.instagram || "#instagram",
              books: mtaProf?.books && mtaProf.books.length > 0 ? mtaProf.books : (baseAuthor?.books || staticBook.authorBooks || []),
            };
          })
        );

        if (enrichedAuthors.length > 0) {
          const primary = enrichedAuthors[0];
          return {
            ...staticBook,
            authorsList: enrichedAuthors,
            authorName: primary.name,
            authorImage: primary.image,
            authorQuote: primary.quote,
            authorBooks: primary.books,
          };
        }
      }

      return staticBook;
    }
  } catch (err) {
    console.error("Static book lookup fallback error:", err);
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
