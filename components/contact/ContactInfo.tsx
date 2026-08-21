"use client";

import React from "react";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Top Headline & Mission Statement */}
      <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium dark:text-[#d4b56a] text-[#9333ea] tracking-tight">
          Keep In Touch With Us
        </h2>
        <p className="text-xs sm:text-sm dark:text-[#9a9d95] text-[#71717a] leading-relaxed font-sans max-w-2xl mx-auto">
          The Publishing Hub is a premier monthly book review publication reaching 400,000 dedicated readers through partnering bookstores and public libraries. The Publishing Hub offers a curated selection of the finest new books released each month, serving as an essential guide for literary enthusiasts.
        </p>
      </div>

      {/* 3-Column Info Details Row matching reference design */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x dark:divide-[#f2eee3]/10 divide-[#e9e1f5] border dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:bg-[#070e0a]/50 bg-white rounded-xs p-6 sm:p-8 lg:p-10 shadow-xs">
        
        {/* Column 1: Address */}
        <div className="flex items-start gap-4 pb-6 md:pb-0 md:pr-6 lg:pr-8">
          <div className="p-2.5 rounded-full dark:bg-[#0f1d15] bg-[#faf5ff] border dark:border-[#d4b56a]/30 border-[#e9d5ff] text-[#d4b56a] dark:text-[#d4b56a] flex-shrink-0">
            <MapPin className="w-5 h-5 dark:text-[#d4b56a] text-[#9333ea]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase dark:text-[#d4b56a] text-[#9333ea] font-sans">
              ADDRESS
            </h3>
            <p className="text-xs sm:text-[13px] dark:text-[#dedacf] text-[#3f3f46] leading-relaxed font-serif">
              12 Shirley Road, Southampton,<br />
              SO15 3EU, UK
            </p>
          </div>
        </div>

        {/* Column 2: Contact */}
        <div className="flex items-start gap-4 py-6 md:py-0 md:px-6 lg:px-8">
          <div className="p-2.5 rounded-full dark:bg-[#0f1d15] bg-[#faf5ff] border dark:border-[#d4b56a]/30 border-[#e9d5ff] text-[#d4b56a] dark:text-[#d4b56a] flex-shrink-0">
            <Phone className="w-5 h-5 dark:text-[#d4b56a] text-[#9333ea]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase dark:text-[#d4b56a] text-[#9333ea] font-sans">
              CONTACT
            </h3>
            <p className="text-xs sm:text-[13px] dark:text-[#dedacf] text-[#3f3f46] leading-relaxed font-serif">
              <a href="tel:+447454675398" className="hover:underline block">
                (+44) 7454 675398
              </a>
              <span className="text-[11px] sm:text-xs dark:text-[#888b83] text-[#71717a] font-sans block mt-0.5">
                Mail: <a href="mailto:hello@thepublishinghub.co.uk" className="hover:underline dark:text-[#dedacf] text-[#18181b]">hello@thepublishinghub.co.uk</a>
              </span>
            </p>
          </div>
        </div>

        {/* Column 3: Hour of Operation */}
        <div className="flex items-start gap-4 pt-6 md:pt-0 md:pl-6 lg:pl-8">
          <div className="p-2.5 rounded-full dark:bg-[#0f1d15] bg-[#faf5ff] border dark:border-[#d4b56a]/30 border-[#e9d5ff] text-[#d4b56a] dark:text-[#d4b56a] flex-shrink-0">
            <Clock className="w-5 h-5 dark:text-[#d4b56a] text-[#9333ea]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase dark:text-[#d4b56a] text-[#9333ea] font-sans">
              HOUR OF OPERATION
            </h3>
            <p className="text-xs sm:text-[13px] dark:text-[#dedacf] text-[#3f3f46] leading-relaxed font-serif">
              Monday - Friday, 09:00 - 17:00
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
