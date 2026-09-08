"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SidebarPromoData } from "@/types/promo";
import { defaultAdminPromoData } from "@/lib/adminPromoData";

export interface SidebarPromoCardProps {
  /**
   * Optional custom promotional data.
   * If omitted, the card uses defaultAdminPromoData and syncs with /api/admin/promo.
   */
  promo?: SidebarPromoData;

  /**
   * Optional callback when CTA link is clicked (e.g. to close mobile sidebar).
   */
  onNavigate?: () => void;

  /**
   * Optional custom container styling.
   */
  className?: string;
}

export default function SidebarPromoCard({
  promo,
  onNavigate,
  className = "",
}: SidebarPromoCardProps) {
  const [promoData, setPromoData] = useState<SidebarPromoData>(
    promo || defaultAdminPromoData
  );

  useEffect(() => {
    if (promo) {
      setPromoData(promo);
      return;
    }

    // Fetch initial saved promo config from API
    fetch("/api/admin/promo")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data) {
          setPromoData(json.data);
        }
      })
      .catch(() => {});

    // Listen for live updates from Admin Settings without page reload
    const handleUpdate = (e: any) => {
      if (e.detail) {
        setPromoData(e.detail);
      } else {
        fetch("/api/admin/promo")
          .then((res) => (res.ok ? res.json() : null))
          .then((json) => {
            if (json?.data) setPromoData(json.data);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("admin-promo-updated", handleUpdate);
    return () => {
      window.removeEventListener("admin-promo-updated", handleUpdate);
    };
  }, [promo]);

  // 1. Requirement: Do not render if isActive is false
  if (!promoData || !promoData.isActive) {
    return null;
  }

  const {
    title,
    offer,
    description,
    buttonText,
    buttonUrl,
    badge,
    imageUrl,
  } = promoData;

  return (
    <div className={`p-3.5 pb-4 shrink-0 transition-opacity duration-200 ${className}`}>
      <div
        className="group relative rounded-2xl p-4 text-center overflow-hidden border transition-all duration-300
                   bg-gradient-to-b from-[#FAF5FF] via-[#F6EEFF] to-[#FAF5FF] border-[#E9D5FF] shadow-[0_2px_10px_rgba(124,58,237,0.06)]
                   dark:bg-gradient-to-b dark:from-[#1E1B4B]/60 dark:via-[#151D36] dark:to-[#0F172A] dark:border-[#7C3AED]/30 hover:dark:border-[#7C3AED]/50 dark:shadow-[0_4px_20px_rgba(15,23,42,0.6)]"
      >
        {/* Subtle Ambient Radial Glow Effect */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-xl transition-opacity duration-300 group-hover:opacity-100 opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 -left-8 w-20 h-20 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-lg opacity-50"
        />

        {/* Optional Green / Emerald Offer Badge */}
        {badge && (
          <div className="flex justify-center mb-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {badge}
            </span>
          </div>
        )}

        {/* Promo Title */}
        <span className="text-[11.5px] font-semibold text-[#8B5CF6] dark:text-[#C4B5FD] tracking-wide block mb-0.5 uppercase">
          {title}
        </span>

        {/* Highlighted Offer */}
        <h4 className="text-[13.5px] font-black text-[#1E1B4B] dark:text-[#F8FAFC] tracking-tight leading-tight">
          {offer}
        </h4>

        {/* Offer Description */}
        <p className="text-[10px] text-[#64748B] dark:text-[#94A3B8] font-semibold tracking-wider uppercase mb-3 mt-0.5">
          {description}
        </p>

        {/* Interactive CTA Button with Micro-Animation */}
        <Link
          href={buttonUrl}
          onClick={() => {
            if (onNavigate) onNavigate();
          }}
          className="group/cta relative inline-flex items-center justify-center gap-1.5 w-full py-2 px-3
                     bg-[#8B5CF6] hover:bg-[#7C3AED] dark:bg-[#7C3AED] dark:hover:bg-[#6D28D9]
                     text-white text-[11.5px] font-semibold rounded-lg shadow-sm
                     hover:shadow-[0_4px_14px_rgba(124,58,237,0.35)]
                     transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer mb-2"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-1" />
        </Link>

        {/* Optional Book Cover / Promotional Illustration Area */}
        {imageUrl && (
          <div
            className="flex justify-center -mb-2 overflow-hidden pt-1 select-none"
            style={{ maxHeight: "68px" }}
          >
            <img
              src={imageUrl}
              alt={title}
              className="h-16 w-auto object-contain drop-shadow-md transform -rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-transform duration-300"
              style={{ maxHeight: "64px", maxWidth: "60px", width: "auto", objectFit: "contain" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
