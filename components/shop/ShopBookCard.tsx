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
  coverId?: string;
  badge?: "SALE" | "NEW" | "SALE_AND_NEW";
  category?: string;
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

  if (viewMode === "list") {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-[#080e0a] border border-[#f2eee3]/10 hover:border-[#d4b56a]/40 transition-all duration-300 rounded-sm group">
        {/* Book Cover Thumbnail */}
        <div className="relative w-36 sm:w-44 aspect-[3/4] flex-shrink-0 bg-[#0c1611] rounded-sm overflow-hidden border border-[#f2eee3]/10 shadow-lg">
          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1">
            {(book.badge === "SALE" || book.badge === "SALE_AND_NEW") && (
              <span className="bg-[#2c7650] text-white text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase shadow">
                SALE
              </span>
            )}
            {(book.badge === "NEW" || book.badge === "SALE_AND_NEW") && (
              <span className="bg-[#df5a29] text-white text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase shadow">
                NEW
              </span>
            )}
          </div>

          {book.image && !imageError ? (
            <img
              src={book.image}
              alt={book.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-[#122319] to-[#070e0a]">
              <span className="font-display font-semibold text-xs text-[#f2eee3] leading-tight">
                {book.title}
              </span>
              <span className="text-[9px] text-[#888b83] mt-1">
                {book.author}
              </span>
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="flex-1 space-y-3 text-center sm:text-left">
          <span className="text-sm sm:text-base font-semibold text-[#d4b56a]">
            {book.price}
          </span>
          <h3 className="font-display text-2xl font-medium text-[#f2eee3] group-hover:text-[#e6c880] transition-colors leading-tight">
            {book.title}
          </h3>
          <p className="text-xs text-[#888b83] uppercase tracking-wider">
            {book.author}
          </p>
          <p className="text-xs text-[#9a9b94] leading-relaxed max-w-xl">
            {book.description ||
              "An inspiring literature piece featuring exceptional storytelling, rich insights, and engaging narratives for avid book lovers."}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
            <button
              onClick={() => onAddToCart?.(book.title, book.price)}
              className="px-5 py-2 bg-[#2c7650] hover:bg-[#37865d] text-white text-[10px] font-bold tracking-[0.14em] uppercase transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> ADD TO CART
            </button>
            <button
              onClick={() => onQuickView?.(book)}
              className="px-4 py-2 border border-[#f2eee3]/20 hover:border-[#d4b56a] text-[#dedacf] hover:text-[#d4b56a] text-[10px] font-bold tracking-[0.14em] uppercase transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> QUICK VIEW
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode (Matching 4x4 Grid in reference design)
  return (
    <div className="flex flex-col items-center text-center group select-none">
      {/* Cover Image Frame */}
      <div className="relative w-full aspect-[3/4] dark:bg-[#0c1611] bg-[#fbf8fe] rounded-sm overflow-hidden border dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:hover:border-[#d4b56a]/40 hover:border-[#9333ea] dark:shadow-[0_8px_25px_rgba(0,0,0,0.6)] shadow-[0_6px_20px_rgba(147,51,234,0.1)] transition-all duration-300 group-hover:-translate-y-1">
        
        {/* Badges on Top-Left */}
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1 pointer-events-none">
          {(book.badge === "SALE" || book.badge === "SALE_AND_NEW") && (
            <span className="bg-[#2c7650] text-white text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase shadow-md rounded-[1px]">
              SALE
            </span>
          )}
          {(book.badge === "NEW" || book.badge === "SALE_AND_NEW") && (
            <span className="bg-[#df5a29] text-white text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase shadow-md rounded-[1px]">
              NEW
            </span>
          )}
        </div>

        {/* Book Spine 3D Shading on Left */}
        <div className="absolute top-0 left-0 bottom-0 w-3.5 bg-gradient-to-r from-black/20 via-black/10 to-transparent pointer-events-none z-10" />

        {/* Cover Content */}
        {book.image && !imageError ? (
          <img
            src={book.image}
            alt={book.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Graceful Fallback Book Cover Design */
          <div className="w-full h-full flex flex-col justify-between p-5 dark:bg-gradient-to-b dark:from-[#14261c] dark:via-[#0b1611] dark:to-[#060c08] bg-[#faf5ff] border dark:border-[#d4b56a]/20 border-[#e9d5ff]">
            <div className="text-left">
              <span className="text-[7px] tracking-[0.25em] dark:text-[#d4b56a] text-[#9333ea] uppercase font-semibold block">
                PUBLISHING HUB
              </span>
            </div>
            <div className="py-2">
              <h4 className="font-display text-base sm:text-lg font-medium dark:text-[#f2eee3] text-[#18181b] leading-snug">
                {book.title}
              </h4>
            </div>
            <div>
              <span className="text-[8px] tracking-wider dark:text-[#9a9b94] text-[#71717a] uppercase block">
                {book.author}
              </span>
            </div>
          </div>
        )}

        {/* Quick Action Overlay on Hover */}
        <div className="absolute inset-0 dark:bg-[#050807]/80 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2.5 p-4 z-20 backdrop-blur-[2px]">
          <button
            onClick={() => onAddToCart?.(book.title, book.price)}
            className="w-full py-2 bg-[#9333ea] dark:bg-[#2c7650] hover:bg-[#7e22ce] dark:hover:bg-[#37865d] text-white text-[9px] font-bold tracking-[0.14em] uppercase transition-all shadow-lg flex items-center justify-center gap-1.5 rounded-sm"
          >
            <ShoppingBag className="w-3 h-3" /> ADD TO CART
          </button>
          <button
            onClick={() => onQuickView?.(book)}
            className="w-full py-2 dark:bg-[#0d1611] bg-white hover:bg-[#faf5ff] dark:hover:bg-[#15231c] border dark:border-[#f2eee3]/20 border-[#e9e1f5] hover:border-[#9333ea] dark:hover:border-[#d4b56a] dark:text-[#f2eee3] text-[#18181b] hover:text-[#9333ea] dark:hover:text-[#d4b56a] text-[9px] font-bold tracking-[0.14em] uppercase transition-all shadow-md flex items-center justify-center gap-1.5 rounded-sm"
          >
            <Eye className="w-3 h-3" /> QUICK VIEW
          </button>
        </div>
      </div>

      {/* Book Metadata Below Cover matching reference design */}
      <div className="pt-3.5 space-y-1 w-full">
        {/* Price */}
        <div className="text-xs sm:text-sm font-semibold dark:text-[#d4b56a] text-[#9333ea]">
          {book.price}
        </div>

        {/* Book Title in Serif */}
        <h3 className="font-display text-base sm:text-[17px] font-medium dark:text-[#f2eee3] text-[#18181b] dark:group-hover:text-[#d4b56a] group-hover:text-[#9333ea] transition-colors leading-snug line-clamp-1">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-[11px] dark:text-[#888b83] text-[#71717a] font-normal tracking-wide">
          {book.author}
        </p>
      </div>
    </div>
  );
}
