"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, ChevronDown, Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import SearchModal from "@/components/SearchModal";
import { SidebarPromoData } from "@/types/promo";
import { defaultAdminPromoData } from "@/lib/adminPromoData";

interface NavbarProps {
  cartCount?: number;
  activeTab?: string;
  onOpenCart?: () => void;
  onOpenSearch?: () => void;
  showAnnouncement?: boolean;
}

export default function Navbar({
  cartCount: controlledCartCount,
  activeTab: controlledActiveTab,
  onOpenCart: controlledOnOpenCart,
  onOpenSearch,
  showAnnouncement = true,
}: NavbarProps) {
  const { totalQuantity, openCart } = useCart();
  const cartCount = controlledCartCount !== undefined ? controlledCartCount : totalQuantity;
  const handleCartClick = controlledOnOpenCart || openCart;

  const { user, isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getInitials = (name?: string, email?: string): string => {
    if (name && name.trim()) {
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (email && email.trim()) {
      return email.trim().slice(0, 2).toUpperCase();
    }
    return "U";
  };

  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [isInternalSearchOpen, setIsInternalSearchOpen] = useState(false);
  const [promoConfig, setPromoConfig] = useState<SidebarPromoData>(defaultAdminPromoData);

  useEffect(() => {
    fetch("/api/admin/promo")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data) setPromoConfig(json.data);
      })
      .catch(() => {});

    const handleUpdate = (e: any) => {
      if (e.detail) {
        setPromoConfig((prev) => ({ ...prev, ...e.detail }));
      } else {
        fetch("/api/admin/promo")
          .then((res) => (res.ok ? res.json() : null))
          .then((json) => {
            if (json?.data) setPromoConfig(json.data);
          })
          .catch(() => {});
      }
    };
    window.addEventListener("admin-promo-updated", handleUpdate);
    return () => window.removeEventListener("admin-promo-updated", handleUpdate);
  }, []);

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
    if (path.startsWith("/about-us") || path.startsWith("/about")) return "ABOUT US";
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
    if (path.startsWith("/contact-us") || path.startsWith("/contact")) return "CONTACT US";
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
    { label: "ABOUT US", href: "/about-us" },
    { label: "SHOP", href: "/shop" },
    { label: "OUR OFFER", href: "/our-offer" },
    { label: "EVENT", href: "/events" },
    { label: "CONTACT US", href: "/contact-us" },
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
      {showAnnouncement && !announcementDismissed && promoConfig.topBannerActive !== false && (
        <div className="bg-[#0d2a1d] text-[#f2eee3] text-[9px] sm:text-[10px] tracking-[0.06em] sm:tracking-[0.08em] uppercase py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#b89245]/40 flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 text-center z-50 relative">
          <span className="font-medium">
            {promoConfig.topBannerText || "SUMMER SALE IS LIVE — GET UP TO 45% OFF ON SELECTED BOOKS!"}
          </span>
          <a
            href={promoConfig.topBannerButtonUrl || "/shop"}
            className="text-[#d4b56a] hover:text-white font-bold inline-flex items-center gap-1 transition-colors duration-200"
          >
            {promoConfig.topBannerButtonText || "SHOP NOW"} <ArrowRight className="w-3 h-3" />
          </a>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d4b56a] hover:text-white p-1 cursor-pointer"
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


            {/* Cart Button */}
            <button
              type="button"
              onClick={handleCartClick}
              className="p-1.5 hover:text-[#d4b56a] hover:-translate-y-0.5 transition-all duration-200 relative flex items-center cursor-pointer"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span
                suppressHydrationWarning
                className="absolute -top-1 -right-1 bg-[#2c7650] text-[#ffffff] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#050807]"
              >
                {cartCount}
              </span>
            </button>

            {/* Account Icon / Profile Status */}
            <a
              href="/my-account"
              className="p-1.5 hover:text-[#d4b56a] hover:-translate-y-0.5 transition-all duration-200 relative flex items-center justify-center group"
              title={
                isMounted && isAuthenticated && user
                  ? `Logged in as ${user.name} — My Account`
                  : "Log In / My Account"
              }
              aria-label={
                isMounted && isAuthenticated && user
                  ? `Logged in as ${user.name}`
                  : "Log In or Register"
              }
            >
              {isMounted && isAuthenticated && user ? (
                <div className="relative flex items-center justify-center">
                  {/* Luxury User Initials Badge (Dynamic Day/Night Theme) */}
                  <span
                    className="navbar-user-avatar w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-full text-[11px] sm:text-xs font-bold tracking-wider flex items-center justify-center uppercase group-hover:scale-105 transition-all duration-200 select-none"
                  >
                    {getInitials(user.name, user.email)}
                  </span>
                  {/* Refined Emerald Online Status Dot */}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center pointer-events-none">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span className="navbar-status-dot relative inline-flex rounded-full h-2.5 w-2.5 shadow-xs"></span>
                  </span>
                </div>
              ) : (
                <div className="relative flex items-center justify-center">
                  <User className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </div>
              )}

              {/* Tooltip on Hover */}
              <span className="navbar-user-tooltip hidden sm:block absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                {isMounted && isAuthenticated && user ? (
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span>My Account</span>
                  </span>
                ) : (
                  <span>Log In</span>
                )}
              </span>
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

            {/* Account Status in Mobile Drawer */}
            <div className="pb-3 border-b border-[#f2eee3]/10">
              {isMounted && isAuthenticated && user ? (
                <a
                  href="/my-account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-user-card flex items-center justify-between p-2.5 rounded transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span
                        className="navbar-user-avatar w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center uppercase shadow-sm"
                      >
                        {getInitials(user.name, user.email)}
                      </span>
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center pointer-events-none">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                        <span className="navbar-status-dot relative inline-flex rounded-full h-2.5 w-2.5"></span>
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-[#f2eee3] group-hover:text-[#d4b56a] transition-colors leading-tight">
                        {user.name}
                      </p>
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Logged in • My Account
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#d4b56a] group-hover:translate-x-0.5 transition-transform" />
                </a>
              ) : (
                <a
                  href="/my-account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded hover:bg-[#f2eee3]/5 transition-colors group"
                >
                  <div className="flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-[#dddcd5] group-hover:text-[#d4b56a]">
                    <User className="w-4 h-4 text-[#d4b56a]" />
                    <span>Log In / Register</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4b56a] group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => {
                      if (!item.hasDropdown) setMobileMenuOpen(false);
                      else setMobileLeagueOpen(!mobileLeagueOpen);
                    }}
                    className="flex items-center justify-between py-2 text-sm font-semibold tracking-wider text-[#dddcd5] hover:text-[#d4b56a]"
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileLeagueOpen ? "rotate-180 text-[#d4b56a]" : ""
                        }`}
                      />
                    )}
                  </a>
                  {item.hasDropdown && mobileLeagueOpen && (
                    <div className="pl-4 space-y-2 pt-1 pb-2 border-l border-[#f2eee3]/10 ml-1">
                      {item.options?.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 text-xs text-[#9a9b94] hover:text-[#d4b56a]"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isInternalSearchOpen}
        onClose={() => setIsInternalSearchOpen(false)}
      />
    </>
  );
}
