"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Eye } from "lucide-react";
import BookCoverArt from "./BookCoverArt";
import { getBookSlug } from "@/lib/books";

interface Book {
  id: string;
  coverId: string;
  title: string;
  author: string;
  price: string;
  oldPrice?: string;
  saleBadge?: string;
  category: string;
}    

interface BestsellerSectionProps {
  onAddToCart?: (bookTitle: string) => void;
  onQuickView?: (book: Book) => void;
}

const ALL_BOOKS: Book[] = [
  {
    id: "b1",
    coverId: "bestseller-1",
    title: "The Journey of a Young Entrepreneur",
    author: "by Santosh Kumar",
    price: "£18.00",
    oldPrice: "£22.00",
    saleBadge: "SALE -20%",
    category: "bestseller",
  },
  {
    id: "b2",
    coverId: "bestseller-2",
    title: "Fragments of War",
    author: "by John Walker",
    price: "£18.00",
    oldPrice: "£24.00",
    saleBadge: "SALE -20%",
    category: "bestseller",
  },
  {
    id: "b3",
    coverId: "bestseller-3",
    title: "The Night I Died",
    author: "by Jonathan Ashwood",
    price: "£16.00",
    oldPrice: "£20.00",
    saleBadge: "SALE -20%",
    category: "bestseller",
  },
  {
    id: "b4",
    coverId: "bestseller-4",
    title: "The Mind's Mastery",
    author: "by Marcus Hathaway",
    price: "£22.00",
    category: "bestseller",
  },
  {
    id: "b5",
    coverId: "bestseller-5",
    title: "Enemy of the Quiet Mind",
    author: "by Alexander Kent",
    price: "£21.00",
    category: "bestseller",
  },
  {
    id: "b6",
    coverId: "bestseller-6",
    title: "Wounds Down, Wisdom Up",
    author: "by Olivia Hart",
    price: "£19.00",
    category: "bestseller",
  },
  {
    id: "b7",
    coverId: "bestseller-7",
    title: "Built & Broken",
    author: "by Sophie Collins",
    price: "£18.00",
    saleBadge: "SALE -20%",
    category: "bestseller",
  },
  {
    id: "b8",
    coverId: "bestseller-8",
    title: "The Summer of Impossible Things",
    author: "by Ethan Morris",
    price: "£17.00",
    category: "bestseller",
  },
];

export default function BestsellerSection({ onAddToCart, onQuickView }: BestsellerSectionProps) {
  const [activeTab, setActiveTab] = useState<"bestseller" | "sale" | "featured">("bestseller");

  const filteredBooks = ALL_BOOKS.filter((book) => {
    if (activeTab === "sale") return !!book.saleBadge;
    if (activeTab === "featured") return ["b1", "b3", "b5", "b7"].includes(book.id);
    return true;
  });

  return (
    <section id="bestsellers" className="py-20 bg-[#050807] border-b border-[#f2eee3]/10">
      <div className="container-custom">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 pb-4 border-b border-[#f2eee3]/10">
          <div className="w-full sm:w-auto">
            <span className="text-[9px] sm:text-[10px] tracking-[0.28em] text-[#d4b56a] font-bold uppercase block mb-1.5 sm:mb-2">
              PEOPLE&apos;S CHOICE
            </span>
            <div className="flex items-center gap-4 sm:gap-8 pt-1 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setActiveTab("bestseller")}
                className={`font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight transition-colors relative pb-2 whitespace-nowrap cursor-pointer ${activeTab === "bestseller" ? "text-[#f2eee3]" : "text-[#777970] hover:text-[#d9d5ca]"
                  }`}
              >
                Bestseller Books
                {activeTab === "bestseller" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b89245]" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("sale")}
                className={`font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight transition-colors relative pb-2 whitespace-nowrap cursor-pointer ${activeTab === "sale" ? "text-[#f2eee3]" : "text-[#777970] hover:text-[#d9d5ca]"
                  }`}
              >
                Sale
                {activeTab === "sale" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b89245]" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("featured")}
                className={`font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight transition-colors relative pb-2 whitespace-nowrap cursor-pointer ${activeTab === "featured" ? "text-[#f2eee3]" : "text-[#777970] hover:text-[#d9d5ca]"
                  }`}
              >
                Featured Books
                {activeTab === "featured" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b89245]" />
                )}
              </button>
            </div>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase text-[#2c7650] hover:text-[#d4b56a] transition-colors self-start sm:self-end"
          >
            VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Cards 2-Col Mobile / 4-Col Desktop Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredBooks.map((book) => {
            const productUrl = `/product/${getBookSlug(book)}`;
            return (
              <div
                key={book.id}
                className="group relative dark:bg-[#080d0a] bg-white border dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:hover:border-[#b89245]/50 hover:border-[#9333ea] transition-all duration-300 p-2.5 sm:p-4 pb-4 sm:pb-6 flex flex-col justify-between shadow-xs hover:shadow-lg hover:shadow-purple-500/10 rounded-xs"
              >
                {/* Book Artwork Frame */}
                <div className="relative aspect-[3/4] w-full dark:bg-[#101612] bg-[#fbf8fe] overflow-hidden flex items-center justify-center border dark:border-black/40 border-[#f3e8ff] rounded-xs">
                  
                  {/* Sale Badge */}
                  {book.saleBadge && (
                    <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-20 bg-[#2c7650] text-white text-[7.5px] sm:text-[8px] font-extrabold tracking-wider uppercase px-1.5 sm:px-2 py-0.5 shadow-md">
                      {book.saleBadge}
                    </span>
                  )}

                  {/* Cover Rendering with Link */}
                  <Link href={productUrl} className="w-full h-full block transform group-hover:scale-105 transition-transform duration-500 cursor-pointer">
                    <BookCoverArt id={book.coverId} title={book.title} author={book.author.replace(/^by\s+/i, "")} />
                  </Link>

                  {/* Quick Action Overlay on Hover / Mobile Touch */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 sm:gap-3 z-30">
                    <button
                      onClick={() => onAddToCart && onAddToCart(book.title)}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2c7650] hover:bg-[#37865d] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                      title="Add to Cart"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <Link
                      href={productUrl}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0b120f] border border-[#d4b56a] hover:bg-[#d4b56a] text-[#f2eee3] hover:text-[#050807] flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                      title="View Product Details"
                      aria-label="View product details"
                    >
                      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>

                {/* Book Information */}
                <div className="mt-2.5 sm:mt-4">
                  <Link href={productUrl} className="block cursor-pointer">
                    <h4 className="font-display text-sm sm:text-lg font-medium text-[#f2eee3] group-hover:text-[#d4b56a] transition-colors line-clamp-1 leading-snug">
                      {book.title}
                    </h4>
                  </Link>
                  <p className="text-[10px] sm:text-[11px] text-[#85877f] mt-0.5 truncate">
                    {book.author}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
                    {book.oldPrice && (
                      <span className="text-[11px] sm:text-xs text-[#656861] line-through font-normal">
                        {book.oldPrice}
                      </span>
                    )}
                    <span className="text-[11px] sm:text-xs font-semibold text-[#d4b56a]">
                      {book.price}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
