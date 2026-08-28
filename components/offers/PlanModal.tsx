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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[580px] bg-white dark:bg-[#07120c] rounded-2xl p-7 sm:p-9 shadow-2xl border border-[#e9e1f5] dark:border-[#d4b56a]/35 text-left transition-all transform animate-in zoom-in-95 duration-200 dark:shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Eyebrow, Title & Close Button */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#9333ea] dark:text-[#d4b56a] uppercase block transition-colors">
              SELECTED PUBLISHING PLAN
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-[34px] font-normal text-[#18181b] dark:text-[#f2eee3] mt-1 leading-tight transition-colors">
              {plan.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:text-[#888b83] dark:hover:text-[#f2eee3] p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Thin Divider Line */}
        <div className="w-full h-[1px] bg-[#f1ebf8] dark:bg-[#f2eee3]/10 my-6 transition-colors" />

        {/* Subtitle / Description */}
        <p className="text-xs sm:text-[13px] font-medium tracking-wide uppercase text-[#52525b] dark:text-[#9a9d95] leading-relaxed mb-6 font-sans transition-colors">
          {plan.subtitle}
        </p>

        {/* Total Package Investment Box */}
        <div className="bg-[#faf5ff] dark:bg-[#0d1f16] border border-[#e9d5ff] dark:border-[#d4b56a]/40 rounded-xl p-5 sm:p-6 mb-8 flex items-center justify-between shadow-xs transition-colors">
          <span className="text-sm sm:text-[15px] font-bold text-[#18181b] dark:text-[#dedacf] transition-colors">
            Total Package Investment
          </span>
          <span className="font-display text-2xl sm:text-3xl font-medium text-[#9333ea] dark:text-[#d4b56a] tracking-wide transition-colors">
            {plan.price}
          </span>
        </div>

        {/* Footer Actions: Cancel and Confirm Plan */}
        <div className="flex items-center justify-end gap-3.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 sm:px-7 sm:py-3 border border-[#e4e4e7] dark:border-[#f2eee3]/20 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-[#12241b] text-[#52525b] dark:text-[#dedacf] text-sm font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(plan)}
            className="px-7 py-2.5 sm:px-8 sm:py-3 bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#2c7650] dark:hover:bg-[#37865d] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-lg transition-all shadow-[0_4px_14px_rgba(147,51,234,0.35)] dark:shadow-[0_4px_16px_rgba(44,118,80,0.4)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.5)] dark:hover:shadow-[0_6px_22px_rgba(44,118,80,0.55)] active:scale-98 cursor-pointer"
          >
            CONFIRM PLAN
          </button>
        </div>
      </div>
    </div>
  );
}
