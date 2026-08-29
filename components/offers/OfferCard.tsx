"use client";

import React from "react";
import Link from "next/link";

export interface PackageOffer {
  id: string;
  title: string;
  subtitle: string;
  link?: string;
  points: {
    text?: string;
    subHeading?: string;
    subPoints?: string[];
  }[];
  price: string;
  isPopular?: boolean;
}

interface OfferCardProps {
  offer: PackageOffer;
  onSelectPlan?: (offer: PackageOffer) => void;
}

export default function OfferCard({ offer, onSelectPlan }: OfferCardProps) {
  const HeaderPill = (
    <div className="w-full py-4 px-3 sm:px-4 rounded-full dark:bg-gradient-to-b dark:from-[#0b1b13] dark:to-[#06100b] bg-gradient-to-b from-[#faf5ff] to-[#f3e8ff] border dark:border-[#d4b56a]/50 border-[#d8b4fe] text-center shadow-inner dark:group-hover:border-[#d4b56a] group-hover:border-[#9333ea] transition-colors duration-300">
      <h3 className="font-display text-lg sm:text-xl md:text-[22px] font-medium dark:text-[#d4b56a] text-[#7e22ce] dark:group-hover:text-[#e6c880] group-hover:text-[#9333ea] transition-colors leading-tight">
        {offer.title}
      </h3>
      {/* Subtle gold/purple line accent */}
      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent dark:via-[#d4b56a]/80 via-[#9333ea]/80 to-transparent mx-auto mt-2" />
    </div>
  );

  return (
    <div className="flex flex-col justify-between dark:bg-[#060c08]/90 bg-white dark:border-[#1e3b2b] border-[#e9e1f5] dark:hover:border-[#d4b56a]/60 hover:border-[#9333ea] rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 dark:shadow-[0_15px_40px_rgba(0,0,0,0.7)] shadow-[0_10px_30px_rgba(147,51,234,0.06)] dark:hover:shadow-[0_20px_50px_rgba(24,82,56,0.25)] hover:shadow-[0_15px_35px_rgba(147,51,234,0.15)] group relative">
      
      {/* Top Header Pill Container */}
      <div>
        {offer.link ? (
          <Link href={offer.link} className="block cursor-pointer">
            {HeaderPill}
          </Link>
        ) : (
          HeaderPill
        )}

        {/* Subtitle Banner in Uppercase */}
        <h4 className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase dark:text-[#f2eee3] text-[#3f3f46] text-center leading-snug py-6 font-sans">
          {offer.subtitle}
        </h4>

        {/* Bullet Points List matching reference */}
        <div className="space-y-3.5 text-[12px] sm:text-[13px] dark:text-[#9a9d95] text-[#52525b] leading-relaxed pb-6">
          {offer.points.map((pt, idx) => (
            <div key={idx}>
              {pt.text && (
                <p className="flex items-start gap-2">
                  <span className="dark:text-[#d4b56a] text-[#9333ea] font-bold select-none">•</span>
                  <span>{pt.text}</span>
                </p>
              )}

              {pt.subHeading && (
                <div className="mt-2">
                  <p className="flex items-start gap-2 dark:text-[#dedacf] text-[#18181b] font-medium">
                    <span className="dark:text-[#d4b56a] text-[#9333ea] font-bold select-none">•</span>
                    <span>{pt.subHeading}</span>
                  </p>
                  {pt.subPoints && pt.subPoints.length > 0 && (
                    <ul className="pl-6 pt-1.5 space-y-1">
                      {pt.subPoints.map((sub, subIdx) => (
                        <li key={subIdx} className="flex items-start gap-2 dark:text-[#9a9d95] text-[#71717a]">
                          <span className="dark:text-[#d4b56a]/80 text-[#9333ea]/80 select-none">•</span>
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Pricing & Select Plan Button */}
      <div className="pt-6 border-t dark:border-[#f2eee3]/10 border-[#e9e1f5] text-center space-y-4">
        {/* Price */}
        <div className="font-display text-2xl sm:text-3xl font-medium dark:text-[#d4b56a] text-[#9333ea] tracking-wide">
          {offer.price}
        </div>

        {/* Select Plan Button matching reference */}
        {offer.link ? (
          <Link
            href={offer.link}
            className="block w-full py-3 px-6 dark:bg-[#08120c] bg-white hover:bg-[#9333ea] dark:hover:bg-[#d4b56a] dark:text-[#d4b56a] text-[#9333ea] hover:text-white dark:hover:text-[#050807] dark:border-[#d4b56a]/70 border-[#9333ea] hover:border-[#9333ea] dark:hover:border-[#d4b56a] text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-[2px] shadow-md hover:shadow-lg text-center"
          >
            SELECT PLAN
          </Link>
        ) : (
          <button
            onClick={() => onSelectPlan?.(offer)}
            className="w-full py-3 px-6 dark:bg-[#08120c] bg-white hover:bg-[#9333ea] dark:hover:bg-[#d4b56a] dark:text-[#d4b56a] text-[#9333ea] hover:text-white dark:hover:text-[#050807] dark:border-[#d4b56a]/70 border-[#9333ea] hover:border-[#9333ea] dark:hover:border-[#d4b56a] text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-[2px] shadow-md hover:shadow-lg"
          >
            SELECT PLAN
          </button>
        )}
      </div>

    </div>
  );
}
