"use client";

import React from "react";
import { X, ShoppingCart, Star } from "lucide-react";
import BookCoverArt from "./BookCoverArt";

export interface Book {
  id: string;
  coverId?: string;
  image?: string;
  title: string;
  author: string;
  price: string;
  oldPrice?: string;
  originalPrice?: string;
  saleBadge?: string;
  badge?: string;
  numericPrice?: number;
  category?: string;
  availability?: string;
  description?: string;
}

interface QuickViewModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToCart: (title: string, price?: string) => void;
}

export default function QuickViewModal({ book, onClose, onAddToCart }: QuickViewModalProps) {
  if (!book) return null;

  const displayOldPrice = book.oldPrice || book.originalPrice;
  const displayBadge = book.saleBadge || book.badge;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar bg-white dark:bg-[#0b1410] border border-[#e9e1f5] dark:border-[#d4b56a]/40 text-[#18181b] dark:text-[#f2eee3] shadow-2xl p-5 sm:p-6 md:p-8 rounded-[2px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#71717a] hover:text-[#18181b] dark:text-[#888b83] dark:hover:text-[#f2eee3] p-1 transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Book Art */}
          <div className="md:col-span-5 aspect-[3/4] bg-[#faf7fd] dark:bg-[#070c09] border border-[#e9e1f5] dark:border-[#f2eee3]/10 overflow-hidden relative shadow-md rounded-[2px]">
            {displayBadge && (
              <span className="absolute top-2.5 left-2.5 z-20 bg-[#9333ea] dark:bg-[#2c7650] text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider shadow">
                {displayBadge.replace("_", " ")}
              </span>
            )}
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <BookCoverArt
                id={book.coverId || book.id}
                title={book.title}
                author={book.author.replace(/^(by|By)\s+/i, "")}
              />
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-[9px] tracking-[0.25em] text-[#9333ea] dark:text-[#d4b56a] uppercase font-bold">
                FEATURED EDITION
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#18181b] dark:text-[#f2eee3] leading-tight mt-1">
                {book.title}
              </h3>
              <p className="text-xs text-[#71717a] dark:text-[#888b83] mt-1 font-normal uppercase tracking-wider">
                {book.author}
              </p>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-1.5 text-[#9333ea] dark:text-[#d4b56a]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
              <span className="text-xs text-[#71717a] dark:text-[#9a9b94] ml-2">
                (4.9/5 from 128 readers)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 text-lg">
              <span className="font-display font-semibold text-2xl text-[#9333ea] dark:text-[#d4b56a]">
                {book.price}
              </span>
              {displayOldPrice && (
                <span className="text-sm text-[#a1a1aa] line-through font-normal">
                  {displayOldPrice}
                </span>
              )}
            </div>

            <p className="text-xs text-[#52525b] dark:text-[#aaa9a1] leading-relaxed">
              {book.description ||
                "Carefully curated with archival acid-free paper, rich embossed typography, and collector hardcover binding designed for lifelong preservation."}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  onAddToCart(book.title, book.price);
                  onClose();
                }}
                className="flex-1 min-h-[44px] bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#2c7650] dark:hover:bg-[#37865d] text-white text-xs font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-colors rounded-[2px] shadow-md cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" /> ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
