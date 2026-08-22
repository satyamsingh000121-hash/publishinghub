"use client";

import React, { useState } from "react";
import { Eye, ShoppingBag } from "lucide-react";

export interface BookItem {
  id: string;
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
}

interface ShopBookCardProps {
  book: BookItem;
  viewMode?: "grid" | "list";
  onAddToCart?: (bookTitle: string, price: string) => void;
  onQuickView?: (book: BookItem) => void;
}

export default function ShopBookCard({
  book,
  viewMode = "grid",
  onAddToCart,
  onQuickView,
}: ShopBookCardProps) {
  const [imageError, setImageError] = useState(false);

  // Render Badge helper
  const renderBadges = () => {
    if (!book.badge) return null;
    return (
      <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1 pointer-events-none">
        {(book.badge === "SALE" || book.badge === "SALE_AND_HOT" || book.badge === "SALE_AND_NEW") && (
          <span className="bg-[#2c7650] text-white text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase shadow-xs rounded-[1px]">
            SALE
          </span>
        )}
        {(book.badge === "HOT" || book.badge === "SALE_AND_HOT") && (
          <span className="bg-[#c2410c] text-white text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase shadow-xs rounded-[1px]">
            HOT
          </span>
        )}
        {(book.badge === "NEW" || book.badge === "SALE_AND_NEW") && (
          <span className="bg-[#df5a29] text-white text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase shadow-xs rounded-[1px]">
            NEW
          </span>
        )}
      </div>
    );
  };

  if (viewMode === "list") {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-6 p-5 sm:p-6 bg-white dark:bg-[#080e0a] border border-[#e5e7eb] dark:border-[#f2eee3]/10 hover:border-[#b89245]/50 dark:hover:border-[#d4b56a]/40 transition-all duration-200 rounded-[2px] group">
        {/* Book Cover Thumbnail */}
        <div className="relative w-32 sm:w-40 aspect-[3/4] flex-shrink-0 bg-[#f5f5f4] dark:bg-[#0c1611] rounded-[2px] overflow-hidden border border-[#e5e7eb] dark:border-[#f2eee3]/10 shadow-sm">
          {renderBadges()}

          {book.image && !imageError ? (
            <img
              src={book.image}
              alt={book.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-[#edebe4] dark:bg-[#0e1712]">
              <span className="font-display font-medium text-xs text-[#1c1917] dark:text-[#f2eee3] leading-tight">
                {book.title}
              </span>
              <span className="text-[9px] text-[#78716c] dark:text-[#888b83] mt-1">
                {book.author}
              </span>
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="flex-1 space-y-2.5 text-center sm:text-left">
          {/* Price */}
          <div className="flex items-center justify-center sm:justify-start gap-2">
            {book.originalPrice && (
              <span className="text-xs text-[#a8a29e] line-through font-normal">
                {book.originalPrice}
              </span>
            )}
            <span className="text-sm font-semibold text-[#b89245] dark:text-[#d4b56a]">
              {book.price}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-xl sm:text-2xl font-normal text-[#1c1917] dark:text-[#f2eee3] group-hover:text-[#b89245] dark:group-hover:text-[#e6c880] transition-colors leading-tight">
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-[11px] text-[#78716c] dark:text-[#888b83] tracking-wide">
            {book.author}
          </p>

          {/* Description */}
          <p className="text-xs text-[#57534e] dark:text-[#9a9b94] leading-relaxed max-w-xl">
            {book.description ||
              "An inspiring literature piece featuring exceptional storytelling, rich insights, and engaging narratives for avid book lovers."}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
            <button
              onClick={() => onAddToCart?.(book.title, book.price)}
              className="px-4 py-2 bg-[#1e3527] hover:bg-[#284936] text-white text-[10px] font-bold tracking-[0.14em] uppercase transition-colors flex items-center gap-1.5 rounded-[2px]"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> ADD TO CART
            </button>
            <button
              onClick={() => onQuickView?.(book)}
              className="px-4 py-2 border border-[#d6d3d1] dark:border-[#f2eee3]/20 hover:border-[#b89245] dark:hover:border-[#d4b56a] text-[#44403c] dark:text-[#dedacf] hover:text-[#b89245] dark:hover:text-[#d4b56a] text-[10px] font-bold tracking-[0.14em] uppercase transition-colors flex items-center gap-1.5 rounded-[2px]"
            >
              <Eye className="w-3.5 h-3.5" /> QUICK VIEW
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode
  return (
    <div className="flex flex-col items-center text-center group select-none">
      {/* Cover Image Frame */}
      <div className="relative w-full aspect-[3/4] bg-[#edebe4] dark:bg-[#0c1611] rounded-[2px] overflow-hidden border border-[#e5e7eb] dark:border-[#f2eee3]/10 hover:border-[#b89245]/60 dark:hover:border-[#d4b56a]/40 shadow-xs hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
        
        {/* Badges on Top-Left */}
        {renderBadges()}

        {/* Book Spine 3D Shading on Left */}
        <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none z-10" />

        {/* Cover Content */}
        {book.image && !imageError ? (
          <img
            src={book.image}
            alt={book.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Graceful Elegant Fallback Book Cover Design */
          <div className="w-full h-full flex flex-col justify-between p-5 bg-[#faf8f5] dark:bg-[#0e1712] border border-[#e7e3da] dark:border-[#27272a]">
            <div className="text-left">
              <span className="text-[7px] tracking-[0.25em] text-[#b89245] dark:text-[#d4b56a] uppercase font-semibold block">
                PUBLISHING HUB
              </span>
            </div>
            <div className="py-2">
              <h4 className="font-display text-base sm:text-lg font-medium text-[#1c1917] dark:text-[#f2eee3] leading-snug">
                {book.title}
              </h4>
            </div>
            <div>
              <span className="text-[8px] tracking-wider text-[#78716c] dark:text-[#9a9b94] uppercase block">
                {book.author}
              </span>
            </div>
          </div>
        )}

        {/* Quick Action Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2.5 p-4 z-20 backdrop-blur-[1.5px]">
          <button
            onClick={() => onAddToCart?.(book.title, book.price)}
            className="w-full py-2.5 bg-[#1e3527] hover:bg-[#284936] text-white text-[10px] font-bold tracking-[0.14em] uppercase transition-all shadow-md flex items-center justify-center gap-1.5 rounded-[2px]"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> ADD TO CART
          </button>
          <button
            onClick={() => onQuickView?.(book)}
            className="w-full py-2 bg-white hover:bg-[#f5f5f4] text-[#1c1917] text-[10px] font-bold tracking-[0.14em] uppercase transition-all shadow-md flex items-center justify-center gap-1.5 rounded-[2px]"
          >
            <Eye className="w-3.5 h-3.5" /> QUICK VIEW
          </button>
        </div>
      </div>

      {/* Book Metadata Below Cover matching reference design */}
      <div className="pt-3.5 space-y-1 w-full text-center">
        {/* Price (with originalPrice strikethrough if on sale) */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] font-semibold text-[#b89245] dark:text-[#d4b56a]">
          {book.originalPrice && (
            <span className="text-[#a8a29e] line-through font-normal text-xs">
              {book.originalPrice}
            </span>
          )}
          <span>{book.price}</span>
        </div>

        {/* Book Title in Serif */}
        <h3 className="font-display text-[16px] sm:text-[17px] font-normal text-[#1c1917] dark:text-[#f2eee3] group-hover:text-[#b89245] dark:group-hover:text-[#d4b56a] transition-colors leading-snug line-clamp-1">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-[11px] text-[#78716c] dark:text-[#888b83] font-normal tracking-wide uppercase">
          {book.author}
        </p>
      </div>
    </div>
  );
}
