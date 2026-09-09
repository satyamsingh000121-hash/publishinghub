"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarPromoCard from "@/components/SidebarPromoCard";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  User,
  Calendar,
  Users,
  Star,
  Tag,
  BarChart2,
  Settings,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Books", href: "/admin/books", icon: BookOpen },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Sale Offers", href: "/admin/sale-offers", icon: Tag },
  { name: "Meet The Author", href: "/admin/meet-the-author", icon: User },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[240px] admin-sidebar-bg border-r z-50 flex flex-col justify-between overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Top Logo & Navigation */}
        <div className="flex flex-col">
          {/* Logo Brand Header */}
          <div className="h-[72px] px-5 flex items-center justify-between border-b border-[#F8FAFC] dark:border-[#1E293B]/60">
            <Link href="/" className="flex items-center group py-1">
              <img
                src="/images/The-Publishing-Hub-Final-Logo-02-Photoroom.png"
                alt="The Publishing Hub"
                className="h-9 w-auto max-w-[175px] object-contain object-left transition-transform duration-200 group-hover:scale-105"
                style={{ height: "36px", maxHeight: "36px", maxWidth: "170px", width: "auto", objectFit: "contain" }}
              />
            </Link>
            <button
              onClick={onClose}
              aria-label="Close Sidebar"
              className="lg:hidden text-gray-400 hover:text-gray-700 dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-3 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)]">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13.5px] transition-all duration-150 ${
                    isActive
                      ? "bg-[#F4E8FF] dark:bg-[#7C3AED]/25 text-[#7C3AED] dark:text-[#C4B5FD] font-semibold"
                      : "admin-text-secondary hover:text-[#1E293B] dark:hover:text-white hover:bg-[#FAF8FF] dark:hover:bg-[#1E293B]/60 font-medium"
                  }`}
                >
                  {/* Left Purple Indicator Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-[#7C3AED] dark:bg-[#A78BFA] rounded-r-full" />
                  )}

                  <Icon
                    className={`w-[17px] h-[17px] transition-colors ${
                      isActive
                        ? "text-[#7C3AED] dark:text-[#C4B5FD]"
                        : "text-[#94A3B8] dark:text-[#64748B] group-hover:text-[#64748B] dark:group-hover:text-white"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Promotional Card (Reusable Component) */}
        <SidebarPromoCard
          onNavigate={() => {
            if (typeof window !== "undefined" && window.innerWidth < 1024) onClose();
          }}
        />
      </aside>
    </>
  );
}
