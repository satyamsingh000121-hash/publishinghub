"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { PackageOffer } from "./OfferCard";

interface PlanModalProps {
  plan: PackageOffer | null;
  onClose: () => void;
  onConfirm: (plan: PackageOffer) => void;
}

export default function PlanModal({ plan, onClose, onConfirm }: PlanModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (plan) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [plan, onClose]);

  if (!plan) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[580px] bg-white dark:bg-[#0c1611] rounded-2xl p-7 sm:p-9 shadow-2xl border border-[#e9e1f5] dark:border-[#1e3b2b] transition-all transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Eyebrow, Title & Close Button */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#9333ea] dark:text-[#a855f7] uppercase block">
              SELECTED PUBLISHING PLAN
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-[34px] font-normal text-[#18181b] dark:text-[#f2eee3] leading-tight">
              {plan.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Thin Divider Line */}
        <div className="w-full h-[1px] bg-[#f1ebf8] dark:bg-[#f2eee3]/10 my-6" />

        {/* Subtitle / Description */}
        <p className="text-xs sm:text-[13px] font-medium tracking-wide uppercase text-[#52525b] dark:text-[#a1a1aa] leading-relaxed mb-6 font-sans">
          {plan.subtitle}
        </p>

        {/* Total Package Investment Box */}
        <div className="bg-[#fbf7ff] dark:bg-[#050a07] border border-[#ebd9fc] dark:border-[#9333ea]/30 rounded-xl p-5 sm:p-6 mb-8 flex items-center justify-between shadow-xs">
          <span className="text-sm sm:text-[15px] font-bold text-[#18181b] dark:text-[#dedacf]">
            Total Package Investment
          </span>
          <span className="font-display text-2xl sm:text-3xl font-medium text-[#9333ea] dark:text-[#d4b56a] tracking-wide">
            {plan.price}
          </span>
        </div>

        {/* Footer Actions: Cancel and Confirm Plan */}
        <div className="flex items-center justify-end gap-3.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 sm:px-7 sm:py-3 border border-[#e4e4e7] dark:border-white/20 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 text-[#52525b] dark:text-[#d4d4d8] text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(plan)}
            className="px-7 py-2.5 sm:px-8 sm:py-3 bg-[#9333ea] hover:bg-[#7e22ce] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-lg transition-all shadow-[0_4px_14px_rgba(147,51,234,0.35)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.5)] active:scale-98 cursor-pointer"
          >
            CONFIRM PLAN
          </button>
        </div>
      </div>
    </div>
  );
}
