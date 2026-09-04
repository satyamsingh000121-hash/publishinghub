"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, User, ChevronDown, Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import SearchModal from "@/components/SearchModal";

interface NavbarProps {
  cartCount?: number;
  activeTab?: string;
  onOpenCart?: () => void;
  onOpenSearch?: () => void;
  showAnnouncement?: boolean;
}

export default function Navbar({
  cartCount = 0,
  activeTab: controlledActiveTab,
  onOpenCart,
  onOpenSearch,
  showAnnouncement = true,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [isInternalSearchOpen, setIsInternalSearchOpen] = useState(false);

  const handleOpenSearch = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      setIsInternalSearchOpen(true);
    }
  };

  const getAutoActiveTab = (path: string | null): string => {
    if (!path) return "HOME";
    if (path === "/") return "HOME";
    if (path.startsWith("/about")) return "ABOUT US";
    if (
      path.startsWith("/shop") ||
      path.startsWith("/product") ||
      path.startsWith("/book") ||
      path.startsWith("/a-teaspoon")
    ) {
      return "SHOP";
    }
    if (path.startsWith("/our-offer")) return "OUR OFFER";
    if (path.startsWith("/events") || path.startsWith("/event")) return "EVENT";
    if (path.startsWith("/contact")) return "CONTACT US";
    if (path.startsWith("/join-the-league")) return "JOIN THE LEAGUE";
    return "";
  };

  const autoActiveTab = getAutoActiveTab(pathname);
  const [internalActiveTab, setInternalActiveTab] = useState<string>("");
  const activeTab = controlledActiveTab || autoActiveTab || internalActiveTab || "HOME";
  const { theme, toggleTheme } = useTheme();

  const leagueOptions = [
    { label: "AS AN AUTHOR", href: "/join-the-league/author", role: "author" },
    { label: "AS A PUBLISHER", href: "/join-the-league/publisher", role: "publisher" },
    { label: "AS A DISTRIBUTOR", href: "/join-the-league/distributor", role: "distributor" },
    { label: "AS A LITERARY AGENT", href: "/join-the-league/literary-agent", role: "literary-agent" },
    { label: "AS A SPEAKER", href: "/join-the-league/speaker", role: "speaker" },
    { label: "AS A THOUGHT LEADER", href: "/join-the-league/thought-leader", role: "thought-leader" },
    { label: "AS A PRINTER", href: "/join-the-league/printer", role: "printer" },
  ];

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT US", href: "/about" },
    { label: "SHOP", href: "/shop" },
    { label: "OUR OFFER", href: "/our-offer" },
    { label: "EVENT", href: "/events" },
    { label: "CONTACT US", href: "/contact" },
    {
      label: "JOIN THE LEAGUE",
      href: "/join-the-league/author",
      hasDropdown: true,
      options: leagueOptions,
    },
  ];

  const [mobileLeagueOpen, setMobileLeagueOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar */}
      {showAnnouncement && !announcementDismissed && (
        <div className="bg-[#0d2a1d] text-[#f2eee3] text-[9px] sm:text-[10px] tracking-[0.06em] sm:tracking-[0.08em] uppercase py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#b89245]/40 flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 text-center z-50 relative">
          <span className="font-medium">
            SUMMER SALE IS LIVE — Get Up to 30% OFF on Selected Books!
          </span>
          <a
            href="/shop"
            className="text-[#d4b56a] hover:text-white font-bold inline-flex items-center gap-1 transition-colors duration-200"
          >
            SHOP NOW <ArrowRight className="w-3 h-3" />
          </a>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d4b56a] hover:text-white p-1"
            title="Dismiss Announcement"
            aria-label="Dismiss Announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

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
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-8">
            {navItems.map((item) => {
              const isLeagueActive = activeTab === "JOIN THE LEAGUE" || activeTab?.startsWith("JOIN THE LEAGUE");
              const isActive = item.hasDropdown
                ? isLeagueActive
                : activeTab === item.label || (item.label === "EVENT" && activeTab === "EVENTS");

              return (
                <div key={item.label} className="relative py-7 group">
                  <a
                    href={item.href}
                    onClick={() => setInternalActiveTab(item.label)}
                    className={`flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em] uppercase transition-colors duration-200 ${
                      isActive ? "text-[#d4b56a] font-bold" : "text-[#dddcd5] hover:text-[#d4b56a]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-[#d4b56a] transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </a>

                  {/* Underline Active Indicator */}
                  <span
                    className={`absolute bottom-5 left-0 right-0 h-[2px] bg-[#d4b56a] transition-all duration-300 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    }`}
                  />

                  {/* Dropdown Menu Popup (Matching User Image 1) */}
                  {item.hasDropdown && (
                    <div className="absolute top-[calc(100%-8px)] left-0 w-64 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="dark:bg-[#070e0a] bg-white border dark:border-[#d4b56a]/40 border-[#d8b4fe] shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-md py-2 px-1.5 divide-y dark:divide-[#f2eee3]/10 divide-[#f3e8ff]">
                        {item.options?.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => setInternalActiveTab("JOIN THE LEAGUE")}
                            className="block px-4 py-2.5 text-xs font-bold tracking-wider dark:text-[#f2eee3] text-[#1e1b4b] dark:hover:text-[#d4b56a] hover:text-[#9333ea] dark:hover:bg-[#0d1c14] hover:bg-[#faf5ff] transition-all duration-150 rounded-sm"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
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
              onClick={handleOpenSearch}
              className="p-1.5 hover:text-[#d4b56a] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
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
            {onOpenCart ? (
              <button
                onClick={onOpenCart}
                className="p-1.5 hover:text-[#d4b56a] hover:-translate-y-0.5 transition-all duration-200 relative flex items-center cursor-pointer"
                title="Shopping Cart"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="absolute -top-1 -right-1 bg-[#2c7650] text-[#ffffff] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#050807]">
                  {cartCount}
                </span>
              </button>
            ) : (
              <a
                href="/cart"
                className="p-1.5 hover:text-[#d4b56a] hover:-translate-y-0.5 transition-all duration-200 relative flex items-center cursor-pointer"
                title="Your Cart"
                aria-label="Your Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="absolute -top-1 -right-1 bg-[#2c7650] text-[#ffffff] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#050807]">
                  {cartCount}
                </span>
              </a>
            )}

            {/* Account Icon */}
            <a
              href="/my-account"
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
              {navItems.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div key={item.label} className="border-t border-[#f2eee3]/10 pt-1 mt-1">
                      <button
                        onClick={() => setMobileLeagueOpen(!mobileLeagueOpen)}
                        className="w-full flex items-center justify-between py-2.5 px-3 rounded-sm text-xs font-semibold tracking-wider uppercase text-[#d4b56a] bg-[#d4b56a]/10"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileLeagueOpen ? "rotate-180" : ""}`} />
                      </button>

                      {mobileLeagueOpen && (
                        <div className="pl-4 pr-1 py-1 space-y-1 mt-1 border-l-2 border-[#d4b56a]/40 ml-2">
                          {item.options?.map((sub) => (
                            <a
                              key={sub.label}
                              href={sub.href}
                              onClick={() => {
                                setInternalActiveTab("JOIN THE LEAGUE");
                                setMobileMenuOpen(false);
                              }}
                              className="block py-2 px-3 text-[11px] font-medium tracking-wide text-[#dddcd5] hover:text-[#d4b56a] hover:bg-[#f2eee3]/5 rounded-xs"
                            >
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const isItemActive = item.label === activeTab || (item.label === "EVENT" && activeTab === "EVENTS");

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setInternalActiveTab(item.label);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-sm text-xs font-semibold tracking-wider uppercase transition-colors ${
                      isItemActive
                        ? "text-[#d4b56a] bg-[#d4b56a]/10 font-bold"
                        : "text-[#dddcd5] hover:text-[#d4b56a] hover:bg-[#f2eee3]/5"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                  </a>
                );
              })}
            </div>

            {/* Search, Account and Wishlist links in mobile drawer */}
            <div className="pt-3 border-t border-[#f2eee3]/10 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenSearch();
                }}
                className="w-full flex items-center justify-between py-2 px-3 text-xs border border-[#f2eee3]/15 rounded-sm text-[#dddcd5] hover:text-[#d4b56a] hover:border-[#d4b56a]/40 bg-[#f2eee3]/5 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-[#d4b56a]" />
                  <span>Search Books</span>
                </span>
                <ArrowRight className="w-3 h-3 opacity-50" />
              </button>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 text-xs border border-[#f2eee3]/15 rounded-sm text-[#d4b56a] hover:border-[#d4b56a] bg-[#d4b56a]/10 font-semibold"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Cart ({cartCount})</span>
                </a>
                <a
                  href="#wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 text-xs border border-[#f2eee3]/15 rounded-sm text-[#dddcd5] hover:text-[#d4b56a]"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Wishlist</span>
                </a>
                <a
                  href="/my-account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 text-xs border border-[#f2eee3]/15 rounded-sm text-[#dddcd5] hover:text-[#d4b56a]"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Account</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Internal Search Modal for all pages without external handler */}
      {!onOpenSearch && (
        <SearchModal
          isOpen={isInternalSearchOpen}
          onClose={() => setIsInternalSearchOpen(false)}
        />
      )}
    </>
  );
}
