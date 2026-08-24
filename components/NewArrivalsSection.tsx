"use client";

import React from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import BookCoverArt from "./BookCoverArt";
import { PerspectiveBook } from "./PerspectiveBook";

interface NewArrivalsSectionProps {
  onAddToCart?: (bookTitle: string) => void;
}

const NEW_ARRIVALS = [
  {
    id: "a1",
    coverId: "arrival-1",
    title: "The Journey of Visions to Victory",
    author: "By SANTOSH KUMAR MISHRA",
    price: "£35.00",
  },
  {
    id: "a2",
    coverId: "arrival-2",
    title: "Henry & The Good Dog",
    author: "By MESHO BUVAHR, SAVANNA WALKER",
    price: "£22.00",
    oldPrice: "£25.00",
    saleBadge: "SALE",
  },
  {
    id: "a3",
    coverId: "arrival-3",
    title: "A Poem for Every night",
    author: "By CHAI IAM, HOF NURGIN",
    price: "£22.00",
  },
  {
    id: "a4",
    coverId: "arrival-4",
    title: "The Journey of Dreams",
    author: "By BHUZUN NAHLAM, JOHN WALKER",
    price: "£12.00",
    hotBadge: "HOT",
  },
  {
    id: "a5",
    coverId: "arrival-5",
    title: "Life of Pi",
    author: "By YANN MARTEL",
    price: "£18.00",
  },
  {
    id: "a6",
    coverId: "arrival-6",
    title: "Bulle und Pelle",
    author: "By SILKE LAMBECK",
    price: "£15.00",
    oldPrice: "£19.00",
    saleBadge: "SALE",
  },
  {
    id: "a7",
    coverId: "arrival-7",
    title: "Sam & Dave Dig a Hole",
    author: "By MAC BARNETT, JON KLASSEN",
    price: "£14.00",
    oldPrice: "£17.00",
    saleBadge: "SALE",
  },
  {
    id: "a8",
    coverId: "arrival-8",
    title: "Peter and the Wolf",
    author: "By SERGEI PROKOFIEV",
    price: "£16.00",
    oldPrice: "£20.00",
    saleBadge: "SALE",
    hotBadge: "HOT",
  },
];

export default function NewArrivalsSection({ onAddToCart }: NewArrivalsSectionProps) {
  return (
    <section className="py-14 sm:py-20 bg-[#080d0a] border-b border-[#f2eee3]/10">
      <div className="container-custom">
        
        {/* Centered Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#f2eee3]">
            Our Newest Arrivals
          </h2>
          <div className="w-16 h-[2px] bg-[#b89245] mx-auto mt-2 sm:mt-3" />
        </div>

        {/* Layout: Left Big Promo Card + Right 4x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Left Special Offer Card (3 columns on lg) */}
          <div className="lg:col-span-3 bg-gradient-to-b dark:from-[#0d2217] dark:via-[#08150e] dark:to-[#040a07] from-white via-[#faf5ff] to-[#f3e8ff] border dark:border-[#d4b56a]/30 border-[#e9d5ff] p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:border-[#9333ea] transition-all duration-300 dark:shadow-[0_15px_35px_rgba(0,0,0,0.8)] shadow-[0_8px_24px_rgba(147,51,234,0.08)] rounded-xs">
            {/* Radial Gold & Emerald Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,181,106,0.12),transparent_70%)] pointer-events-none dark:block hidden" />
            <div className="absolute inset-2 border dark:border-[#d4b56a]/20 border-[#9333ea]/15 pointer-events-none" />
            <div className="absolute inset-3 border dark:border-[#d4b56a]/10 border-[#9333ea]/10 pointer-events-none" />

            {/* Top Text */}
            <div className="relative z-10 text-center pt-8 sm:pt-16">
              <span className="font-display italic text-xl sm:text-3xl font-semibold text-[#d4b56a] block drop-shadow-xs">
                Get Extra
              </span>
              <h3 className="font-display text-4xl sm:text-6xl font-black text-[#f2eee3] tracking-tight mt-1">
                Sale <span className="text-[#d4b56a]">-25%</span>
              </h3>
              <span className="text-[10px] sm:text-xs tracking-[0.24em] font-extrabold text-[#c0d4c8] dark:text-[#c0d4c8] uppercase block mt-2">
                ON ORDER OVER £150
              </span>
            </div>

            {/* Bookshelf / Books Graphic */}
            <div className="relative z-10 my-3 sm:my-4 -mx-2 sm:-mx-3 flex items-center justify-center overflow-visible">
              <div className="relative w-full h-44 sm:h-60 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src="/images/Gemini_Generated_Image_n0hwhvn0hwhvn0hw-Photoroom.png"
                  alt="Special Offer Books Collection"
                  className="w-full h-full object-contain dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] drop-shadow-[0_10px_20px_rgba(147,51,234,0.15)] scale-105 sm:scale-115"
                />
              </div>
            </div>

            {/* Bottom Button */}
            <div className="relative z-10 text-center pb-6 sm:pb-12">
              <a
                href="#bestsellers"
                className="w-full py-3 sm:py-3.5 bg-[#2c7650] hover:bg-[#37865d] text-white border dark:border-[#d4b56a]/40 border-transparent text-[11px] sm:text-[12px] font-extrabold tracking-[0.16em] uppercase inline-flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 dark:shadow-black/60 shadow-[0_6px_20px_rgba(147,51,234,0.3)] rounded-sm"
              >
                VIEW MORE <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right 4x2 Grid of New Arrival Book Cards (9 columns on lg) */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {NEW_ARRIVALS.map((book) => (
              <div
                key={book.id}
                className="group relative dark:bg-[#060a08] bg-white border dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:hover:border-[#b89245]/50 hover:border-[#9333ea] transition-all duration-300 p-2.5 sm:p-3 flex flex-col justify-between shadow-xs hover:shadow-md hover:shadow-purple-500/10 rounded-xs"
              >
                {/* Image Container with 3D Book Animation */}
                <div className="relative aspect-[3/4] w-full flex items-center justify-center rounded-xs overflow-hidden">
                  
                  {/* Badges (SALE & HOT) */}
                  <div className="absolute top-1.5 left-1.5 z-20 flex flex-col gap-1 pointer-events-none">
                    {book.saleBadge && (
                      <span className="bg-[#2c7650] text-white text-[7.5px] font-extrabold tracking-wider uppercase px-2 py-0.5 shadow">
                        {book.saleBadge}
                      </span>
                    )}
                    {book.hotBadge && (
                      <span className="bg-[#d9482b] text-white text-[7.5px] font-extrabold tracking-wider uppercase px-2 py-0.5 shadow">
                        {book.hotBadge}
                      </span>
                    )}
                  </div>

                  {/* 3D Perspective Animated Artwork Cover */}
                  <PerspectiveBook>
                    <BookCoverArt id={book.coverId} title={book.title} author={book.author.replace(/^(By|by)\s+/i, "")} />
                  </PerspectiveBook>

                  {/* Add to cart quick button */}
                  <button
                    onClick={() => onAddToCart && onAddToCart(book.title)}
                    className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#2c7650] hover:bg-[#37865d] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md z-30"
                    title="Add to cart"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-3 h-3" />
                  </button>
                </div>

                {/* Title, Author & Price */}
                <div className="mt-2.5 text-center">
                  {/* Price at top of info */}
                  <div className="flex items-center justify-center gap-1.5 text-[11px] mb-1">
                    {book.oldPrice && (
                      <span className="text-[#656861] line-through">
                        {book.oldPrice}
                      </span>
                    )}
                    <span className="font-semibold text-[#d4b56a]">
                      {book.price}
                    </span>
                  </div>

                  <h4 className="font-display text-xs sm:text-[13px] font-medium text-[#f2eee3] group-hover:text-[#d4b56a] transition-colors leading-snug line-clamp-2 min-h-[32px]">
                    {book.title}
                  </h4>
                  <p className="text-[9px] text-[#85877f] truncate mt-1">
                    {book.author}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
