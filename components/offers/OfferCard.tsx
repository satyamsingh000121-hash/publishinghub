"use client";

import React from "react";

export interface PackageOffer {
  id: string;
  title: string;
  subtitle: string;
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
  return (
    <div className="flex flex-col justify-between bg-[#060c08]/90 border border-[#1e3b2b] hover:border-[#d4b56a]/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_rgba(24,82,56,0.25)] group relative">
      
      {/* Top Header Pill Container */}
      <div>
        <div className="w-full py-4 px-3 sm:px-4 rounded-full bg-gradient-to-b from-[#0b1b13] to-[#06100b] border border-[#d4b56a]/50 text-center shadow-inner group-hover:border-[#d4b56a] transition-colors duration-300">
          <h3 className="font-display text-lg sm:text-xl md:text-[22px] font-medium text-[#d4b56a] group-hover:text-[#e6c880] transition-colors leading-tight">
            {offer.title}
          </h3>
          {/* Subtle gold line accent */}
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#d4b56a]/80 to-transparent mx-auto mt-2" />
        </div>

        {/* Subtitle Banner in Uppercase */}
        <h4 className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#f2eee3] text-center leading-snug py-6 font-sans">
          {offer.subtitle}
        </h4>

        {/* Bullet Points List matching reference */}
        <div className="space-y-3.5 text-[12px] sm:text-[13px] text-[#9a9d95] leading-relaxed pb-6">
          {offer.points.map((pt, idx) => (
            <div key={idx}>
              {pt.text && (
                <p className="flex items-start gap-2">
                  <span className="text-[#d4b56a] font-bold select-none">•</span>
                  <span>{pt.text}</span>
                </p>
              )}

              {pt.subHeading && (
                <div className="mt-2">
                  <p className="flex items-start gap-2 text-[#dedacf] font-medium">
                    <span className="text-[#d4b56a] font-bold select-none">•</span>
                    <span>{pt.subHeading}</span>
                  </p>
                  {pt.subPoints && pt.subPoints.length > 0 && (
                    <ul className="pl-6 pt-1.5 space-y-1">
                      {pt.subPoints.map((sub, subIdx) => (
                        <li key={subIdx} className="flex items-start gap-2 text-[#9a9d95]">
                          <span className="text-[#d4b56a]/80 select-none">•</span>
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
      <div className="pt-6 border-t border-[#f2eee3]/10 text-center space-y-4">
        {/* Price */}
        <div className="font-display text-2xl sm:text-3xl font-medium text-[#d4b56a] tracking-wide">
          {offer.price}
        </div>

        {/* Select Plan Button matching reference */}
        <button
          onClick={() => onSelectPlan?.(offer)}
          className="w-full py-3 px-6 bg-[#08120c] hover:bg-[#d4b56a] text-[#d4b56a] hover:text-[#050807] border border-[#d4b56a]/70 hover:border-[#d4b56a] text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-[2px] shadow-md hover:shadow-lg"
        >
          SELECT PLAN
        </button>
      </div>

    </div>
  );
}
