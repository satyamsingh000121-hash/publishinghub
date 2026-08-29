"use client";

import React, { useState } from "react";
import { ChevronUp, MapPin, Twitter, Mail, Linkedin, Check } from "lucide-react";
import BookCoverArt from "./BookCoverArt";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#040605] border-t border-[#f2eee3]/10 text-[#888b83]">
      <div className="container-custom">

        {/* Main Footer 4 Columns Grid - Balanced Sweet Spot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 py-10 sm:py-16 lg:py-20">

          {/* Column 1: Connect (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5 sm:space-y-4">
            <h4 className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#d4b56a] uppercase">
              CONNECT
            </h4>

            <div className="space-y-1.5 text-[#9a9b94] leading-relaxed text-[13px] sm:text-sm">
              <p>32 Bishop Road,</p>
              <p>Birmingham, B15 1AA</p>
              <p>United Kingdom</p>
              <p className="pt-1.5 text-[#f2eee3] font-medium">(+44) 0121 496 7890</p>
              <p className="text-[#d4b56a] hover:underline cursor-pointer">
                hello@thepublishing.com
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { icon: MapPin, label: "Location" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Mail, label: "Email" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    className="w-8 h-8 rounded-full dark:bg-[#0d1410] bg-[#faf5ff] border dark:border-[#f2eee3]/15 border-[#e9e1f5] dark:hover:border-[#d4b56a] hover:border-[#9333ea] dark:text-[#d9d5ca] text-[#71717a] hover:text-[#9333ea] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
                    aria-label={item.label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>

            {/* Payment Method Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {/* Visa */}
              <div className="px-2.5 py-1 dark:bg-[#1a1f1c] bg-[#faf5ff] border dark:border-white/10 border-[#e9e1f5] rounded-sm flex items-center justify-center">
                <span className="text-[10px] font-black tracking-widest text-[#1a73e8] italic">
                  VISA
                </span>
              </div>
              {/* Mastercard */}
              <div className="px-2.5 py-1 dark:bg-[#1a1f1c] bg-[#faf5ff] border dark:border-white/10 border-[#e9e1f5] rounded-sm flex items-center justify-center gap-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#eb001b] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#f79e1b] -ml-1.5 inline-block opacity-90" />
              </div>
              {/* Maestro / Cirrus */}
              <div className="px-2.5 py-1 dark:bg-[#1a1f1c] bg-[#faf5ff] border dark:border-white/10 border-[#e9e1f5] rounded-sm flex items-center justify-center gap-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00a2e5] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#eb001b] -ml-1.5 inline-block opacity-90" />
              </div>
              {/* American Express */}
              <div className="px-2.5 py-1 bg-[#006fcf] rounded-sm text-[9px] font-bold text-white tracking-tighter">
                AMEX
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#d4b56a] uppercase">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-[13px] sm:text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Shop", href: "/shop" },
                { name: "Our Offer", href: "/our-offer" },
                { name: "Event", href: "/events" },
                { name: "Contact Us", href: "/contact" },
                { name: "Join The League", href: "/join-the-league/author" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#888b83] hover:text-[#f2eee3] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Your Account (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#d4b56a] uppercase">
              YOUR ACCOUNT
            </h4>
            <ul className="space-y-2.5 text-[13px] sm:text-sm">
              {[
                { name: "Shop", href: "/shop" },
                { name: "My Orders", href: "/my-account" },
                { name: "My Account", href: "/my-account" },
                { name: "Wishlist", href: "/my-account" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#888b83] hover:text-[#f2eee3] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Best Sellers & Newsletter (3.5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#d4b56a] uppercase">
              BEST SELLERS
            </h4>

            {/* Featured Book Preview */}
            <div className="flex items-center gap-3.5 dark:bg-[#09100c] bg-[#faf5ff] border dark:border-[#f2eee3]/10 border-[#e9e1f5] p-2.5 rounded-sm shadow-xs">
              <div className="w-12 h-16 dark:bg-[#164833] bg-white flex-shrink-0 rounded-sm overflow-hidden border dark:border-[#d4b56a]/30 border-[#e9d5ff]">
                <img
                  src="/images/book_section1.png"
                  alt="Visions of Victory - The Journey of a Young Entrepreneur"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h5 className="font-display text-sm font-medium text-[#f2eee3] leading-snug">
                  Visions of Victory
                </h5>
                <p className="text-[11px] text-[#888b83]">
                  The Journey of a Young Entrepreneur
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold text-[#d4b56a]">
                    £19.00
                  </span>
                  <span className="text-[11px] text-[#656861] line-through">
                    £29.00
                  </span>
                </div>
              </div>
            </div>

            {/* Newsletter subscription form */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex items-center border dark:border-[#f2eee3]/20 border-[#e9e1f5] dark:bg-[#070d09] bg-white focus-within:border-[#9333ea] transition-colors rounded-sm overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email..."
                  required
                  className="w-full h-10 bg-transparent px-3 text-xs sm:text-sm text-[#f2eee3] placeholder-[#666a64] outline-none"
                />
                <button
                  type="submit"
                  className="h-10 px-5 bg-[#2c7650] hover:bg-[#37865d] text-white text-[9px] font-bold tracking-[0.12em] uppercase transition-colors whitespace-nowrap"
                >
                  {subscribed ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#d4b56a]" /> JOINED
                    </span>
                  ) : (
                    "SUBSCRIBE"
                  )}
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-[#37865d]">
                  Thank you for subscribing to our book club newsletter!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-[#f2eee3]/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#747870]">
          <p>© 2026 The Publishing Hub. All Rights Reserved.</p>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a href="/refund_returns" className="hover:text-[#d4b56a] transition-colors">
              Refund & Returns (Privacy Policy)
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-sm dark:bg-[#123d2b] bg-[#9333ea] hover:bg-[#7e22ce] dark:hover:bg-[#2c7650] text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-md"
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <ChevronUp className="w-4 h-4 dark:text-[#d4b56a] text-white" />
          </button>
        </div>

      </div>
    </footer>
  );
}
