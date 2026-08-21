"use client";

import React from "react";

interface BookCoverArtProps {
  id: string;
  title: string;
  author?: string;
  className?: string;
}

export default function BookCoverArt({ id, title, author, className = "" }: BookCoverArtProps) {
  switch (id) {
    case "visions-yellow":
    case "bestseller-1":
    case "arrival-1":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/book_section1.png"
            alt={title || "Visions of Victory"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "fragments-war":
    case "bestseller-2":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/book_section2.png"
            alt={title || "Fragments of War"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "night-died":
    case "bestseller-3":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/book_section3.webp"
            alt={title || "The Night I Died"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "minds-mastery":
    case "bestseller-4":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/book_section4.webp"
            alt={title || "The Mind's Mastery"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "enemy-quiet":
    case "bestseller-5":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/book_section5.webp"
            alt={title || "Enemy of the Quiet Mind"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "wounds-down":
    case "bestseller-6":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/book_section6.webp"
            alt={title || "Wounds Down, Wisdom Up"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "built-broken":
    case "bestseller-7":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/book_section7.webp"
            alt={title || "Built & Broken"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "summer-impossible":
    case "bestseller-8":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/book_section8.webp"
            alt={title || "The Summer of Impossible Things"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "arrival-1":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/Newest1.webp"
            alt={title || "The Journey of Visions to Victory"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "arrival-2":
    case "henry-good-dog":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/Newest1.webp"
            alt={title || "Henry & The Good Dog"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "arrival-3":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/Newest2.webp"
            alt={title || "A Poem for Every night"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "arrival-4":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/Newest3.webp"
            alt={title || "The Journey of Dreams"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "arrival-5":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/Newest4.webp"
            alt={title || "Life of Pi"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "arrival-6":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/Newest5.webp"
            alt={title || "Bulle und Pelle"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "arrival-7":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/Newest6.webp"
            alt={title || "Sam & Dave Dig a Hole"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "arrival-8":
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          <img
            src="/images/Newest7.webp"
            alt={title || "Peter and the Wolf"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      );

    case "hero-green-book":
    default:
      return (
        <div className={`relative w-full h-full bg-[#0d2a1d] overflow-hidden flex flex-col justify-between p-6 select-none border border-[#b89245]/30 ${className}`}>
          {/* Deep Forest Green luxury embossed leather effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#164833] via-[#0d2a1d] to-[#05140d]" />
          <div className="absolute inset-2 border border-[#b89245]/30 pointer-events-none" />
          <div className="absolute inset-3 border border-[#b89245]/15 pointer-events-none" />

          <div className="relative z-10 text-center pt-4">
            <span className="text-[8px] tracking-[0.3em] text-[#d4b56a] uppercase font-bold block mb-2">
              EXCLUSIVE EDITION
            </span>
            <div className="py-3">
              <h2 className="font-display font-semibold text-3xl leading-none tracking-wider text-[#f2eee3] uppercase drop-shadow">
                VISIONS
              </h2>
              <span className="font-display italic text-sm text-[#d4b56a] block my-1">
                OF
              </span>
              <h2 className="font-display font-semibold text-3xl leading-none tracking-wider text-[#f2eee3] uppercase drop-shadow">
                VICTORY
              </h2>
            </div>
            <div className="w-16 h-[1px] bg-[#d4b56a]/60 mx-auto my-2" />
            <p className="text-[8px] tracking-[0.2em] text-[#c9b78e] uppercase font-medium">
              STRATEGIES FOR SUCCESS AND GROWTH
            </p>
          </div>

          <div className="relative z-10 text-center pb-2">
            <span className="text-[9px] tracking-[0.25em] text-[#f2eee3] uppercase font-semibold py-1 px-4 border border-[#d4b56a]/40 bg-[#061710]/70 inline-block">
              {author || "SANTOSH KUMAR"}
            </span>
          </div>
        </div>
      );
  }
}
