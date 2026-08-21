"use client";

import React, { useState } from "react";
import { ArrowRight, Calendar, Check, Mail } from "lucide-react";

export default function EventsNewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 4000);
    }
  };

  return (
    <section id="events" className="border-t border-b border-[#f2eee3]/10 bg-[#050807] overflow-hidden">
      {/* 2-Column Split Panel Grid matching the dark publishing theme */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#f2eee3]/10">
        
        {/* Left Panel: The Bookshop Events with Sunflower Engraving */}
        <div className="relative p-10 sm:p-14 lg:p-20 bg-[#080e0b] flex flex-col justify-between min-h-[380px] lg:min-h-[440px] overflow-hidden group">
          {/* Sunflower Botanical Background Watermark */}
          <div className="absolute -top-6 right-0 w-72 h-72 sm:w-96 sm:h-96 opacity-15 pointer-events-none transform rotate-12 group-hover:rotate-6 transition-transform duration-700">
            <svg viewBox="0 0 200 200" className="w-full h-full text-[#d4b56a] fill-none stroke-current" strokeWidth="0.75">
              {/* Sunflower Center Disc */}
              <circle cx="100" cy="100" r="28" fill="#18231c" stroke="#d4b56a" strokeWidth="1" />
              <circle cx="100" cy="100" r="20" stroke="#d4b56a" strokeWidth="0.5" strokeDasharray="2 2" />
              <circle cx="100" cy="100" r="12" stroke="#d4b56a" strokeWidth="0.5" />
              {/* Sunflower Petals */}
              {[...Array(24)].map((_, i) => {
                const angle = (i * 360) / 24;
                return (
                  <path
                    key={i}
                    d="M100,72 C94,40 106,40 100,72"
                    transform={`rotate(${angle} 100 100)`}
                    fill="#d4b56a"
                    fillOpacity="0.15"
                    stroke="#d4b56a"
                    strokeWidth="0.75"
                  />
                );
              })}
              {/* Stem and Leaves */}
              <path d="M100,128 Q95,170 85,200" stroke="#2c7650" strokeWidth="1.5" />
              <path d="M96,150 Q70,140 60,160 Q85,165 94,155" fill="#2c7650" fillOpacity="0.2" stroke="#2c7650" strokeWidth="0.8" />
              <path d="M90,175 Q115,165 125,185 Q100,190 88,180" fill="#2c7650" fillOpacity="0.2" stroke="#2c7650" strokeWidth="0.8" />
            </svg>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#d4b56a]" />
              <span className="text-[11px] tracking-[0.3em] font-bold text-[#d4b56a] uppercase">
                UPCOMING EVENTS
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#f2eee3] leading-[1.02]">
              The Bookshop Events
            </h2>

            <p className="text-xs sm:text-sm text-[#9a9b94] font-light max-w-[460px] leading-relaxed pt-1">
              Join us for intimate author signings, evening book club discussions, poetry recitals, and creative writing workshops throughout the season.
            </p>

            {/* Event Highlights List */}
            <div className="space-y-3 pt-3">
              <div className="flex items-center gap-3 text-xs dark:bg-[#050807]/60 bg-[#faf5ff] border dark:border-[#f2eee3]/10 border-[#e9e1f5] p-3 rounded-sm shadow-xs">
                <span className="text-[#d4b56a] font-bold tracking-wider font-display text-sm">AUG 28</span>
                <div className="w-[1px] h-4 dark:bg-[#f2eee3]/20 bg-[#e9e1f5]" />
                <span className="dark:text-[#e2ded2] text-[#18181b] font-medium">Santosh Kumar: Author Reading &amp; Signing</span>
              </div>
              <div className="flex items-center gap-3 text-xs dark:bg-[#050807]/60 bg-[#faf5ff] border dark:border-[#f2eee3]/10 border-[#e9e1f5] p-3 rounded-sm shadow-xs">
                <span className="text-[#d4b56a] font-bold tracking-wider font-display text-sm">SEP 05</span>
                <div className="w-[1px] h-4 dark:bg-[#f2eee3]/20 bg-[#e9e1f5]" />
                <span className="dark:text-[#e2ded2] text-[#18181b] font-medium">Autumn Poetry &amp; Acoustic Evening</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8">
            <a
              href="#bestsellers"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase text-[#d4b56a] hover:text-white transition-colors"
            >
              EXPLORE ALL EVENTS <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Panel: Stay In Touch with Our Updates / Newsletter */}
        <div className="relative p-10 sm:p-14 lg:p-20 bg-[#0b1510] flex flex-col justify-between min-h-[380px] lg:min-h-[440px]">
          {/* Subtle Mail Pattern overlay */}
          <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
            <Mail className="w-36 h-36 text-[#2c7650]" />
          </div>

          <div className="relative z-10 space-y-4">
            <span className="text-[11px] tracking-[0.3em] font-bold text-[#d4b56a] uppercase block">
              NEWSLETTER
            </span>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#f2eee3] leading-[1.02]">
              Stay In Touch with Our Updates
            </h2>

            <p className="text-xs sm:text-sm text-[#9a9b94] font-light leading-relaxed">
              Newsletter to get in touch. Receive exclusive early access to curated editions, signed copies, and subscriber discounts.
            </p>

            {/* Newsletter Form matching the requested fields */}
            <form onSubmit={handleSubmit} className="pt-4 space-y-4 max-w-[480px]">
              <div>
                <label htmlFor="newsletter-email" className="block text-xs text-[#888b83] uppercase tracking-wider mb-2 font-semibold">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    required
                    className="w-full h-12 bg-[#050807]/80 border border-[#f2eee3]/20 focus:border-[#d4b56a] px-4 text-sm text-[#f2eee3] placeholder-[#666a64] outline-none transition-colors rounded-none"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="min-h-[46px] px-8 bg-[#2c7650] hover:bg-[#37865d] text-white text-xs font-bold tracking-[0.16em] uppercase transition-all duration-200 hover:-translate-y-0.5 dark:shadow-black/50 shadow-[0_6px_18px_rgba(147,51,234,0.25)] inline-flex items-center justify-center gap-2 rounded-sm"
                >
                  {isSubscribed ? (
                    <span className="flex items-center gap-2 text-[#d4b56a]">
                      <Check className="w-4 h-4" /> SUBSCRIBED!
                    </span>
                  ) : (
                    "SUBSCRIBE"
                  )}
                </button>
              </div>

              {isSubscribed && (
                <p className="text-xs text-[#37865d] pt-1">
                  Thank you! You have been successfully added to our mailing list.
                </p>
              )}
            </form>
          </div>

          <div className="relative z-10 pt-6 text-[11px] text-[#646860]">
            <p>We respect your privacy. Unsubscribe anytime with one click.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
