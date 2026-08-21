"use client";

import React from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import BookCoverArt from "./BookCoverArt";

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
    <section className="py-20 bg-[#080d0a] border-b border-[#f2eee3]/10">
      <div className="container-custom">
        
        {/* Centered Heading */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#f2eee3]">
            Our Newest Arrivals
          </h2>
          <div className="w-16 h-[2px] bg-[#b89245] mx-auto mt-3" />
        </div>

        {/* Layout: Left Big Promo Card + Right 4x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Special Offer Card (3 columns on lg) */}
          <div className="lg:col-span-3 bg-gradient-to-b from-[#0d2217] via-[#08150e] to-[#040a07] border border-[#d4b56a]/30 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:border-[#d4b56a] transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
            {/* Radial Gold & Emerald Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,181,106,0.12),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-2 border border-[#d4b56a]/20 pointer-events-none" />
            <div className="absolute inset-3 border border-[#d4b56a]/10 pointer-events-none" />

            {/* Top Text (Moved Down & Enlarged/Bolded) */}
            <div className="relative z-10 text-center pt-12 sm:pt-16">
              <span className="font-display italic text-2xl sm:text-3xl font-semibold text-[#d4b56a] block drop-shadow-md">
                Get Extra
              </span>
              <h3 className="font-display text-5xl sm:text-6xl font-black text-[#f2eee3] tracking-tight mt-1.5 drop-shadow-xl">
                Sale <span className="text-[#d4b56a]">-25%</span>
              </h3>
              <span className="text-[11px] sm:text-xs tracking-[0.24em] font-extrabold text-[#c0d4c8] uppercase block mt-2.5">
                ON ORDER OVER £150
              </span>
            </div>

            {/* Bookshelf / Books Graphic */}
            <div className="relative z-10 my-4 -mx-2 sm:-mx-3 flex items-center justify-center overflow-visible">
              <div className="relative w-full h-52 sm:h-60 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src="/images/Gemini_Generated_Image_n0hwhvn0hwhvn0hw-Photoroom.png"
                  alt="Special Offer Books Collection"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] scale-110 sm:scale-115"
                />
              </div>
            </div>

            {/* Bottom Button (Moved Higher Up) */}
            <div className="relative z-10 text-center pb-8 sm:pb-12">
              <a
                href="#bestsellers"
                className="w-full py-3.5 bg-[#2c7650] hover:bg-[#37865d] text-white border border-[#d4b56a]/40 text-[12px] font-extrabold tracking-[0.16em] uppercase inline-flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 shadow-xl shadow-black/60"
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
                className="group relative bg-[#060a08] border border-[#f2eee3]/10 hover:border-[#b89245]/50 transition-all duration-300 p-2.5 sm:p-3 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full bg-[#0d120f] overflow-hidden flex items-center justify-center">
                  
                  {/* Badges (SALE & HOT) */}
                  <div className="absolute top-1.5 left-1.5 z-20 flex flex-col gap-1">
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

                  {/* Artwork Cover */}
                  <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                    <BookCoverArt id={book.coverId} title={book.title} author={book.author.replace(/^(By|by)\s+/i, "")} />
                  </div>

                  {/* Add to cart quick button */}
                  <button
                    onClick={() => onAddToCart && onAddToCart(book.title)}
                    className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#2c7650] hover:bg-[#37865d] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md"
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
