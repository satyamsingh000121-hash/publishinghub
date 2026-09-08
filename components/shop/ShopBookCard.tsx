"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { getBookSlug } from "@/lib/books";

export interface BookItem {
  id: string;
  slug?: string;
  title: string;
  author: string;
  price: string;
  numericPrice: number;
  originalPrice?: string;
  image?: string;
  coverBg?: string;
  coverId?: string;
  badge?: "SALE" | "HOT" | "NEW" | "SALE_AND_HOT" | "SALE_AND_NEW";
  category?: string;
  availability?: "in-stock" | "on-sale" | "hot";
  description?: string;
  rating?: number;
}

interface ShopBookCardProps {
  book: BookItem;
  viewMode?: "grid" | "list";
  onAddToCart?: (bookTitle: string, price: string, id?: string, image?: string) => void;
  onQuickView?: (book: BookItem) => void;
}

export default function ShopBookCard({
  book,
  viewMode = "grid",
  onAddToCart,
  onQuickView,
}: ShopBookCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const bookSlug = getBookSlug(book);
  const productUrl = `/product/${bookSlug}`;

  const rating = book.rating || 4.5;
  const cleanAuthor = book.author.replace(/^by\s+/i, "").toUpperCase();

  // Badges matching Image 1: rounded pill tag in top left
  const renderBadges = () => {
    if (!book.badge) return null;
    return (
      <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1 pointer-events-none">
        {(book.badge === "HOT" || book.badge === "SALE_AND_HOT") && (
          <span className="bg-[#df5a29] text-white text-[9.5px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
            HOT
          </span>
        )}
        {(book.badge === "SALE" || book.badge === "SALE_AND_HOT" || book.badge === "SALE_AND_NEW") && (
          <span className="bg-[#3f916e] text-white text-[9.5px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
            SALE
          </span>
        )}
        {(book.badge === "NEW" || book.badge === "SALE_AND_NEW") && (
          <span className="bg-[#b89245] text-white text-[9.5px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
            NEW
          </span>
        )}
      </div>
    );
  };

  if (viewMode === "list") {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-5 p-4 sm:p-5 bg-white dark:bg-[#080d0a] border border-[#e5e7eb] dark:border-[#f2eee3]/10 hover:border-[#b89245]/50 dark:hover:border-[#d4b56a]/40 transition-all duration-300 rounded-lg shadow-xs hover:shadow-md group">
        {/* Book Cover Thumbnail */}
        <Link
          href={productUrl}
          className="relative w-32 sm:w-36 aspect-[3/4] flex-shrink-0 bg-[#f4f2ed] dark:bg-[#0c1611] rounded-md overflow-hidden border border-[#e5e7eb] dark:border-[#f2eee3]/10 shadow-xs block cursor-pointer"
        >
          {renderBadges()}
          {book.image && !imageError ? (
            <img
              src={book.image}
              alt={book.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-[#f4f2ed] dark:bg-[#0e1712]">
              <span className="font-display font-medium text-xs text-[#18181b] dark:text-[#f2eee3] leading-tight">
                {book.title}
              </span>
              <span className="text-[9px] text-[#71717a] dark:text-[#888b83] mt-1">
                {book.author}
              </span>
            </div>
          )}
        </Link>

        {/* Book Details */}
        <div className="flex-1 space-y-2 text-left w-full">
          <Link href={productUrl} className="block cursor-pointer">
            <h3 className="font-display text-xl sm:text-2xl font-normal text-[#18181b] dark:text-[#f2eee3] group-hover:text-[#b89245] dark:group-hover:text-[#d4b56a] transition-colors leading-tight">
              {book.title}
            </h3>
          </Link>

          <p className="text-[11px] text-[#71717a] dark:text-[#888b83] uppercase tracking-wider">
            BY {cleanAuthor}
          </p>

          {/* Rating Stars: Gold in both themes */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#d4b56a]">{"★".repeat(5)}</span>
            <span className="text-[#71717a] dark:text-[#888b83]">({rating.toFixed(1)})</span>
          </div>

          <p className="text-xs text-[#52525b] dark:text-[#9a9b94] leading-relaxed max-w-xl line-clamp-2">
            {book.description ||
              "An inspiring literature piece featuring exceptional storytelling, rich insights, and engaging narratives for avid book lovers."}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              {book.originalPrice && (
                <span className="text-xs text-[#a1a1aa] dark:text-[#71717a] line-through">
                  {book.originalPrice}
                </span>
              )}
              <span className="text-base font-semibold text-[#18181b] dark:text-[#f2eee3]">
                {book.price}
              </span>
            </div>

            <button
              onClick={() => onAddToCart?.(book.title, book.price, book.id, book.image)}
              className="px-4 py-2 bg-[#d4b56a] hover:bg-[#c5a659] text-[#050807] text-[11px] font-bold tracking-wider uppercase transition-colors flex items-center gap-2 rounded-full cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2.2]" /> ADD TO CART
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode (Supports both Day & Night theme beautifully)
  return (
    <div className="flex flex-col bg-white dark:bg-[#080d0a] border border-[#e5e7eb] dark:border-[#f2eee3]/10 hover:border-[#b89245]/50 dark:hover:border-[#d4b56a]/40 transition-all duration-300 rounded-lg p-3 sm:p-3.5 shadow-xs hover:shadow-md group select-none">
      {/* Cover Image Frame */}
      <div className="relative w-full aspect-[3/4] bg-[#f4f2ed] dark:bg-[#0c1611] rounded-md overflow-hidden border border-[#e5e7eb] dark:border-[#f2eee3]/10 shadow-xs">
        {/* Badges on Top-Left */}
        {renderBadges()}

        {/* Book Spine Shading on Left */}
        <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none z-10" />

        {/* Cover Link */}
        <Link href={productUrl} className="block w-full h-full cursor-pointer">
          {book.image && !imageError ? (
            <img
              src={book.image}
              alt={book.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col justify-between p-4 bg-[#f4f2ed] dark:bg-[#0e1712] border border-[#e5e7eb] dark:border-[#f2eee3]/10">
              <span className="text-[7px] tracking-[0.25em] text-[#b89245] dark:text-[#d4b56a] uppercase font-semibold block">
                PUBLISHING HUB
              </span>
              <h4 className="font-display text-sm font-medium text-[#18181b] dark:text-[#f2eee3] leading-snug">
                {book.title}
              </h4>
              <span className="text-[8px] tracking-wider text-[#71717a] dark:text-[#888b83] uppercase block">
                {book.author}
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Book Metadata Below Cover: Crisp & readable in both Day & Night themes */}
      <div className="pt-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Book Title */}
          <Link href={productUrl} className="block cursor-pointer">
            <h3 className="text-[13px] sm:text-[14px] font-medium text-[#18181b] dark:text-[#f2eee3] group-hover:text-[#b89245] dark:group-hover:text-[#d4b56a] transition-colors leading-snug line-clamp-1 text-left">
              {book.title}
            </h3>
          </Link>

          {/* Author */}
          <p className="text-[10px] text-[#71717a] dark:text-[#888b83] font-normal tracking-wide uppercase text-left mt-0.5 line-clamp-1">
            BY {cleanAuthor}
          </p>

          {/* Rating Stars: Gold in both themes */}
          <div className="flex items-center gap-1.5 mt-1 text-left">
            <span className="text-[#d4b56a] text-xs tracking-[1px] leading-none">
              ★★★★★
            </span>
            <span className="text-[10px] text-[#71717a] dark:text-[#888b83] font-normal">
              ({rating.toFixed(1)})
            </span>
          </div>
        </div>

        {/* Bottom Row: Price & Action Buttons (Heart + Gold Round Cart) */}
        <div className="flex items-center justify-between pt-2.5 mt-1.5 border-t border-[#f3f4f6] dark:border-[#f2eee3]/5">
          {/* Price */}
          <div className="flex items-center gap-1.5 text-xs sm:text-[13px]">
            {book.originalPrice && (
              <span className="text-[#a1a1aa] dark:text-[#71717a] line-through text-[11px] font-normal">
                {book.originalPrice}
              </span>
            )}
            <span className="font-semibold text-[#18181b] dark:text-[#f2eee3]">
              {book.price}
            </span>
          </div>

          {/* Right Action Icons: Wishlist Heart + Solid Gold Cart Button */}
          <div className="flex items-center gap-1.5">
            {/* Wishlist Heart */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsWishlisted(!isWishlisted);
              }}
              className={`w-7 h-7 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer ${
                isWishlisted
                  ? "border-[#d4b56a] bg-[#d4b56a]/15 text-[#d4b56a]"
                  : "border-[#d1d5db] dark:border-[#f2eee3]/20 hover:border-[#b89245] dark:hover:border-[#d4b56a] text-[#71717a] dark:text-[#888b83] hover:text-[#b89245] dark:hover:text-[#d4b56a] bg-white dark:bg-transparent"
              }`}
              title="Add to Wishlist"
              aria-label="Add to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current text-[#d4b56a]" : ""}`} />
            </button>

            {/* Solid Gold Add to Cart Circle (Gold in both Day and Night modes!) */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart?.(book.title, book.price, book.id, book.image);
              }}
              className="w-7 h-7 rounded-full bg-[#d4b56a] hover:bg-[#c5a659] active:scale-95 text-[#050807] flex items-center justify-center shadow-xs transition-all duration-200 cursor-pointer"
              title="Add to Cart"
              aria-label="Add to Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
