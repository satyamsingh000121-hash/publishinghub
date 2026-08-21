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
    { label: "BEST SELLERS", href: "/#bestsellers" },
    { label: "EVENTS", href: "/events" },
    { label: "CONTACT US", href: "/contact" },
    { label: "EXTRA PAGES", href: "#", hasDropdown: true },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#0d2a1d] text-[#f2eee3] text-[10px] tracking-[0.08em] uppercase py-2 px-4 border-b border-[#b89245]/40 flex items-center justify-center gap-4 text-center z-50 relative">
        <span className="font-medium">
          SUMMER SALE IS LIVE — Get Up To 30% OFF on Selected Books!
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
        <div className="container-custom flex items-center justify-between min-h-[82px] gap-8">
          
          {/* Brand Logo */}
          <a href="/" className="flex items-center group select-none py-1">
            <img
              src="/images/The-Publishing-Hub-Final-Logo-02-Photoroom.png"
              alt="The Publishing Hub"
              className="brand-logo-img h-9 sm:h-11 w-auto max-w-[200px] sm:max-w-[240px] object-contain transition-all duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-10">
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
          <div className="flex items-center gap-4 sm:gap-5 text-[#d9d5ca]">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[#f2eee3]/15 hover:border-[#d4b56a]/60 bg-[#f2eee3]/5 hover:bg-[#d4b56a]/15 text-[#d4b56a] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-[17px] h-[17px] text-[#e6c880] animate-spin-slow" />
              ) : (
                <Moon className="w-[17px] h-[17px] text-[#123d2b]" />
              )}
            </button>

            <button
              onClick={onOpenSearch}
              className="p-1.5 hover:text-[#d4b56a] hover:-translate-y-0.5 transition-all duration-200"
              title="Search Books"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            <a
              href="#wishlist"
              className="p-1.5 hover:text-[#d4b56a] hover:-translate-y-0.5 transition-all duration-200 relative flex items-center"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-[18px] h-[18px]" />
              <span className="absolute -top-1 -right-1 bg-[#2c7650] text-[#ffffff] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#050807]">
                0
              </span>
            </a>

            <button
              onClick={onOpenCart}
              className="p-1.5 hover:text-[#d4b56a] hover:-translate-y-0.5 transition-all duration-200 relative flex items-center"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              <span className="absolute -top-1 -right-1 bg-[#2c7650] text-[#ffffff] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#050807]">
                {cartCount}
              </span>
            </button>

            <a
              href="#account"
              className="p-1.5 hover:text-[#d4b56a] hover:-translate-y-0.5 transition-all duration-200"
              title="My Account"
              aria-label="Account"
            >
              <User className="w-[18px] h-[18px]" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#f2eee3] hover:text-[#d4b56a]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#07100c] border-b border-[#f2eee3]/10 px-6 py-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f2eee3]/10">
              <span className="text-xs tracking-wider uppercase font-semibold text-[#dddcd5]">Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-[#f2eee3]/20 text-[#d4b56a]"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-[#e6c880]" /> : <Moon className="w-4 h-4" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  setInternalActiveTab(item.label);
                  setMobileMenuOpen(false);
                }}
                className={`block py-2 text-xs font-semibold tracking-wider uppercase ${
                  activeTab === item.label ? "text-[#d4b56a]" : "text-[#dddcd5]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
