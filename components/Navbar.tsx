"use client";

import React, { useState } from "react";
import { Search, ShoppingBag, Heart, User, ChevronDown, Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface NavbarProps {
  cartCount?: number;
  activeTab?: string;
  onOpenCart?: () => void;
  onOpenSearch?: () => void;
}

export default function Navbar({
  cartCount = 0,
  activeTab: controlledActiveTab,
  onOpenCart,
  onOpenSearch,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalActiveTab, setInternalActiveTab] = useState(controlledActiveTab || "HOME");
  const activeTab = controlledActiveTab || internalActiveTab;
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT US", href: "/about" },
    { label: "SHOP", href: "/shop" },
    { label: "OUR OFFER", href: "/our-offer" },
    { label: "EVENTS", href: "/events" },
    { label: "CONTACT US", href: "/contact" },
    { label: "EXTRA PAGES", href: "#", hasDropdown: true },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#0d2a1d] text-[#f2eee3] text-[9px] sm:text-[10px] tracking-[0.06em] sm:tracking-[0.08em] uppercase py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#b89245]/40 flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 text-center z-50 relative">
        <span className="font-medium">
          SUMMER SALE IS LIVE — Up To 30% OFF!
        </span>
        <a
          href="#bestsellers"
          className="text-[#d4b56a] hover:text-white font-bold inline-flex items-center gap-1 transition-colors duration-200"
        >
          SHOP NOW <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#050807]/95 backdrop-blur-md border-b border-[#f2eee3]/10 transition-all duration-300">
        <div className="container-custom flex items-center justify-between min-h-[64px] sm:min-h-[76px] lg:min-h-[82px] gap-2 sm:gap-6">
          
          {/* Brand Logo */}
          <a href="/" className="flex items-center group select-none py-1 flex-shrink-0">
            <img
              src="/images/The-Publishing-Hub-Final-Logo-02-Photoroom.png"
              alt="The Publishing Hub"
              className="brand-logo-img h-7 sm:h-9 md:h-11 w-auto max-w-[140px] sm:max-w-[190px] md:max-w-[240px] object-contain transition-all duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-9">
            {navItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <div key={item.label} className="relative py-7 group">
                  <a
                    href={item.href}
                    onClick={() => setInternalActiveTab(item.label)}
                    className={`flex items-center gap-1 text-[11px] font-semibold tracking-[0.06em] uppercase transition-colors duration-200 ${
                      isActive ? "text-[#f2eee3] font-bold" : "text-[#dddcd5] hover:text-[#d4b56a]"
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className="w-3 h-3 text-[#d4b56a] transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </a>
                  {/* Underline Active Indicator */}
                  <span
                    className={`absolute bottom-5 left-0 right-0 h-[2px] bg-[#d4b56a] transition-all duration-300 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    }`}
                  />
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 text-[#d9d5ca]">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full border border-[#f2eee3]/15 hover:border-[#d4b56a]/60 bg-[#f2eee3]/5 hover:bg-[#d4b56a]/15 text-[#d4b56a] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#e6c880]" />
              ) : (
                <Moon className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#9333ea]" />
              )}
            </button>

            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 hover:text-[#d4b56a] hover:-translate-y-0.5 transition-all duration-200"
              title="Search Books"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Wishlist Button (Hidden on xs phones, visible in drawer) */}
            <a
              href="#wishlist"
              className="hidden sm:flex p-1.5 hover:text-[#d4b56a] hover:-translate-y-0.5 transition-all duration-200 relative items-center"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span className="absolute -top-1 -right-1 bg-[#2c7650] text-[#ffffff] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#050807]">
                0
              </span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="p-1.5 hover:text-[#d4b56a] hover:-translate-y-0.5 transition-all duration-200 relative flex items-center"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span className="absolute -top-1 -right-1 bg-[#2c7650] text-[#ffffff] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#050807]">
                {cartCount}
              </span>
            </button>

            {/* Account Icon (Desktop & Tablet) */}
            <a
              href="#account"
              className="hidden md:flex p-1.5 hover:text-[#d4b56a] hover:-translate-y-0.5 transition-all duration-200"
              title="My Account"
              aria-label="Account"
            >
              <User className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#f2eee3] hover:text-[#d4b56a] transition-colors rounded-sm"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#07100c]/98 backdrop-blur-xl border-b border-[#f2eee3]/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Theme switch in drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-[#f2eee3]/10">
              <span className="text-xs tracking-wider uppercase font-semibold text-[#dddcd5]">Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-[#f2eee3]/20 text-[#d4b56a] hover:border-[#d4b56a]"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-[#e6c880]" /> : <Moon className="w-4 h-4 text-[#9333ea]" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>

            {/* Navigation links */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setInternalActiveTab(item.label);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-sm text-xs font-semibold tracking-wider uppercase transition-colors ${
                    activeTab === item.label
                      ? "text-[#d4b56a] bg-[#d4b56a]/10 font-bold"
                      : "text-[#dddcd5] hover:text-[#d4b56a] hover:bg-[#f2eee3]/5"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </a>
              ))}
            </div>

            {/* Account and Wishlist links in mobile drawer */}
            <div className="pt-3 border-t border-[#f2eee3]/10 grid grid-cols-2 gap-2">
              <a
                href="#wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2 px-3 text-xs border border-[#f2eee3]/15 rounded-sm text-[#dddcd5] hover:text-[#d4b56a]"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Wishlist (0)</span>
              </a>
              <a
                href="#account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2 px-3 text-xs border border-[#f2eee3]/15 rounded-sm text-[#dddcd5] hover:text-[#d4b56a]"
              >
                <User className="w-3.5 h-3.5" />
                <span>Account</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
