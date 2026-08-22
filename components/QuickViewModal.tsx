"use client";

import React from "react";
import { X, ShoppingCart, Star, Check } from "lucide-react";
import BookCoverArt from "./BookCoverArt";

interface Book {
  id: string;
  coverId: string;
  title: string;
  author: string;
  price: string;
  oldPrice?: string;
  saleBadge?: string;
}

interface QuickViewModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToCart: (title: string) => void;
}

export default function QuickViewModal({ book, onClose, onAddToCart }: QuickViewModalProps) {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar bg-[#0b1410] border border-[#d4b56a]/40 shadow-2xl p-5 sm:p-6 md:p-8 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#888b83] hover:text-[#f2eee3] p-1"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Book Art */}
          <div className="md:col-span-5 aspect-[3/4] bg-[#070c09] border border-[#f2eee3]/10 overflow-hidden relative shadow-xl">
            {book.saleBadge && (
              <span className="absolute top-2 left-2 z-20 bg-[#2c7650] text-white text-[8px] font-bold px-2 py-0.5">
                {book.saleBadge}
              </span>
            )}
            <BookCoverArt id={book.coverId} title={book.title} author={book.author.replace("by ", "")} />
          </div>

          {/* Details */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-[9px] tracking-[0.25em] text-[#d4b56a] uppercase font-bold">
                FEATURED EDITION
              </span>
              <h3 className="font-display text-2xl font-medium text-[#f2eee3] leading-tight mt-1">
                {book.title}
              </h3>
              <p className="text-xs text-[#888b83] mt-1">{book.author}</p>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-1.5 text-[#d4b56a]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
              <span className="text-xs text-[#9a9b94] ml-2">(4.9/5 from 128 readers)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 text-lg">
              <span className="font-display font-semibold text-2xl text-[#d4b56a]">
                {book.price}
              </span>
              {book.oldPrice && (
                <span className="text-sm text-[#656861] line-through font-normal">
                  {book.oldPrice}
                </span>
              )}
            </div>

            <p className="text-xs text-[#aaa9a1] leading-relaxed">
              Carefully curated with archival acid-free paper, rich gold foil embossed typography, and collector hardcover binding designed for lifelong preservation.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  onAddToCart(book.title);
                  onClose();
                }}
                className="flex-1 min-h-[44px] bg-[#2c7650] hover:bg-[#37865d] text-white text-xs font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-colors"
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
