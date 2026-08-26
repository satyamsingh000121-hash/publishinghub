"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  Search,
  Moon,
  Sun,
  Bell,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import { AuthSessionUser } from "@/types/user";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  currentUser?: AuthSessionUser | null;
}

export default function AdminHeader({ onToggleSidebar, currentUser }: AdminHeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial document theme
    const hasDark = document.documentElement.classList.contains("dark");
    setIsDark(hasDark);
  }, []);

  const handleToggleTheme = () => {
    const root = document.documentElement;
    const currentIsDark = root.classList.contains("dark");

    if (currentIsDark) {
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem("publishinghub_theme", "light");
      setIsDark(false);
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      localStorage.setItem("publishinghub_theme", "dark");
      setIsDark(true);
    }
  };

  const displayName = currentUser?.name || "John Smith";
  const displayRole = currentUser?.role || "Admin";

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/my-account";
    } catch {
      window.location.href = "/my-account";
    }
  };

  return (
    <header className="sticky top-0 z-30 h-[72px] admin-header-bg border-b px-4 sm:px-8 flex items-center justify-between transition-colors duration-200">
      {/* Left: Menu Toggle + Search Box */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
          className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Minimal Search Input */}
        <div className="relative w-full max-w-sm hidden sm:block">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search books, orders, authors..."
            className="w-full pl-9 pr-4 py-2 admin-input-bg rounded-lg text-[13px] placeholder-[#94A3B8] focus:outline-none focus:border-[#8B5CF6] transition-colors"
          />
        </div>
      </div>

      {/* Right: Dark/Light Theme Toggle, Notifications & Profile */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Dark/Light Theme Toggle Button */}
        <button
          onClick={handleToggleTheme}
          aria-label="Toggle Dark/Light Theme"
          title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
          className="w-9 h-9 rounded-full flex items-center justify-center admin-card shadow-sm hover:scale-105 transition-all cursor-pointer"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-[#FBBF24]" />
          ) : (
            <Moon className="w-4 h-4 text-[#8B5CF6]" />
          )}
        </button>

        {/* Notification Bell with Badge 3 */}
        <div className="relative">
          <button
            aria-label="Notifications"
            className="relative w-9 h-9 rounded-full flex items-center justify-center admin-card shadow-sm hover:scale-105 transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4 admin-text-secondary" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#8B5CF6] text-white text-[9.5px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#0F172A]">
              3
            </span>
          </button>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="User Menu"
            className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1E293B] transition-colors text-left cursor-pointer"
          >
            {/* Avatar Photo */}
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#E2E8F0] dark:border-[#334155] flex-shrink-0" style={{ width: "36px", height: "36px", minWidth: "36px", minHeight: "36px" }}>
              <img
                src="/images/author-03.jpg"
                alt={displayName}
                className="w-full h-full object-cover"
                style={{ width: "36px", height: "36px", objectFit: "cover" }}
              />
            </div>

            {/* Name and Role */}
            <div className="hidden sm:flex flex-col">
              <span className="text-[13px] font-bold admin-text-primary leading-tight">
                {displayName}
              </span>
              <span className="text-[11px] text-[#94A3B8] font-medium capitalize">
                {displayRole.toLowerCase()}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] hidden sm:block ml-0.5" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 admin-card rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in duration-100">
              <div className="px-3.5 py-2 border-b border-gray-100 dark:border-gray-700">
                <p className="text-[12px] font-semibold admin-text-primary">{displayName}</p>
                <p className="text-[11px] text-[#94A3B8]">{currentUser?.email || "admin@publishinghub.com"}</p>
              </div>
              <a
                href="/my-account"
                className="flex items-center gap-2 px-3.5 py-2 text-[12.5px] admin-text-primary hover:bg-[#FAF8FF] dark:hover:bg-[#334155]"
              >
                <User className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>My Account</span>
              </a>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3.5 py-2 text-[12.5px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-left cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
