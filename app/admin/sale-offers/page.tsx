"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Tag,
  Eye,
  Save,
  CheckCircle2,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import { SidebarPromoData } from "@/types/promo";
import { defaultAdminPromoData } from "@/lib/adminPromoData";
import SidebarPromoCard from "@/components/SidebarPromoCard";

export default function SaleOffersPage() {
  const [promo, setPromo] = useState<SidebarPromoData>(defaultAdminPromoData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/promo")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data) {
          setPromo(json.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promo),
      });
      const json = await res.json();
      if (json?.success) {
        setSuccessMsg("Sale offers updated successfully! Navbar banner & sidebar updated.");
        // Update both sidebar and navbar in real-time
        window.dispatchEvent(
          new CustomEvent("admin-promo-updated", { detail: promo })
        );
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      console.error("Failed to save sale offer", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Link
            href="/admin"
            className="text-xs font-semibold text-[#8B5CF6] hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-[#8B5CF6]">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display text-[28px] sm:text-[32px] font-semibold admin-text-primary tracking-tight">
              Sale Offer Manager
            </h1>
            <p className="text-[13px] admin-text-secondary mt-0.5">
              Control the store's promotional banners: Top Announcement Bar & Sidebar Promo Card.
            </p>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* ========================================================================= */}
        {/* 1. TOP ANNOUNCEMENT BANNER (Website Header Bar)                           */}
        {/* ========================================================================= */}
        <div className="admin-card rounded-2xl p-6 space-y-5 border border-amber-500/20 shadow-sm relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <Megaphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold admin-text-primary flex items-center gap-2">
                  Top Navbar Announcement Bar
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-full">
                    Shown at Top of Website
                  </span>
                </h3>
                <p className="text-xs admin-text-secondary mt-0.5">
                  The slim green banner above the main website header.
                </p>
              </div>
            </div>

            {/* Top Banner Active/Inactive Switch */}
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#0F172A] px-4 py-2 rounded-xl border border-gray-200/60 dark:border-gray-800">
              <span className="text-xs font-medium admin-text-primary">
                Banner Status:{" "}
                <strong className={promo.topBannerActive !== false ? "text-emerald-500" : "text-gray-400"}>
                  {promo.topBannerActive !== false ? "Active (Visible)" : "Hidden (Inactive)"}
                </strong>
              </span>
              <button
                type="button"
                onClick={() =>
                  setPromo((prev) => ({
                    ...prev,
                    topBannerActive: prev.topBannerActive === false ? true : false,
                  }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  promo.topBannerActive !== false ? "bg-[#8B5CF6]" : "bg-gray-300 dark:bg-gray-700"
                }`}
                role="switch"
                aria-checked={promo.topBannerActive !== false}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    promo.topBannerActive !== false ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Top Banner Live Preview Box */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
              Live Banner Preview
            </span>
            <div className="rounded-xl overflow-hidden border border-[#b89245]/40 shadow-xs">
              <div className="bg-[#0d2a1d] text-[#f2eee3] text-[10px] tracking-[0.08em] uppercase py-2 px-4 flex flex-wrap items-center justify-center gap-3 text-center">
                <span className="font-medium">
                  {promo.topBannerText || "SUMMER SALE IS LIVE — GET UP TO 45% OFF ON SELECTED BOOKS!"}
                </span>
                <span className="text-[#d4b56a] font-bold inline-flex items-center gap-1">
                  {promo.topBannerButtonText || "SHOP NOW"} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>

          {/* Top Banner Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-medium admin-text-secondary mb-1">
                Announcement Message
              </label>
              <input
                type="text"
                value={promo.topBannerText || ""}
                onChange={(e) => setPromo({ ...promo, topBannerText: e.target.value })}
                placeholder="e.g. SUMMER SALE IS LIVE — GET UP TO 45% OFF ON SELECTED BOOKS!"
                className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6] font-medium"
                required
              />
            </div>
            <div>
              <label className="block font-medium admin-text-secondary mb-1">
                Button Text (CTA)
              </label>
              <input
                type="text"
                value={promo.topBannerButtonText || ""}
                onChange={(e) => setPromo({ ...promo, topBannerButtonText: e.target.value })}
                placeholder="e.g. SHOP NOW"
                className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                required
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block font-medium admin-text-secondary mb-1">
                Button Target URL
              </label>
              <input
                type="text"
                value={promo.topBannerButtonUrl || ""}
                onChange={(e) => setPromo({ ...promo, topBannerButtonUrl: e.target.value })}
                placeholder="e.g. /shop"
                className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                required
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SIDEBAR PROMOTIONAL CARD (Admin Left Sidebar)                          */}
        {/* ========================================================================= */}
        <div className="admin-card rounded-2xl p-6 space-y-6 border border-purple-200/50 dark:border-purple-500/20 shadow-sm relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-[#8B5CF6]">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold admin-text-primary flex items-center gap-2">
                  Sidebar Promotional Card Details
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 bg-purple-100 dark:bg-purple-950/60 text-[#8B5CF6] rounded-full">
                    Active in Admin Sidebar
                  </span>
                </h3>
                <p className="text-xs admin-text-secondary mt-0.5">
                  Edit the sale title, discount headline, CTA link, and book cover.
                </p>
              </div>
            </div>

            {/* Sidebar Card Active Status Switch */}
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#0F172A] px-4 py-2 rounded-xl border border-gray-200/60 dark:border-gray-800">
              <span className="text-xs font-medium admin-text-primary">
                Card Status:{" "}
                <strong className={promo.isActive ? "text-emerald-500" : "text-gray-400"}>
                  {promo.isActive ? "Active (Visible)" : "Hidden (Inactive)"}
                </strong>
              </span>
              <button
                type="button"
                onClick={() => setPromo((prev) => ({ ...prev, isActive: !prev.isActive }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  promo.isActive ? "bg-[#8B5CF6]" : "bg-gray-300 dark:bg-gray-700"
                }`}
                role="switch"
                aria-checked={promo.isActive}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    promo.isActive ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Form Inputs (2 Cols) */}
            <div className="lg:col-span-2 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block font-medium admin-text-secondary mb-1">
                    Promo Title / Name
                  </label>
                  <input
                    type="text"
                    value={promo.title}
                    onChange={(e) => setPromo({ ...promo, title: e.target.value })}
                    placeholder="e.g. Summer Sale, Flash Deal"
                    className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                    required
                  />
                </div>

                {/* Offer Headline */}
                <div>
                  <label className="block font-medium admin-text-secondary mb-1">
                    Discount / Offer Headline
                  </label>
                  <input
                    type="text"
                    value={promo.offer}
                    onChange={(e) => setPromo({ ...promo, offer: e.target.value })}
                    placeholder="e.g. UP TO 45% OFF, FLAT 50% OFF"
                    className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6] font-bold"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block font-medium admin-text-secondary mb-1">
                    Description Subtext
                  </label>
                  <input
                    type="text"
                    value={promo.description}
                    onChange={(e) => setPromo({ ...promo, description: e.target.value })}
                    placeholder="e.g. ON SELECTED BOOKS"
                    className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                    required
                  />
                </div>

                {/* Badge Tag */}
                <div>
                  <label className="block font-medium admin-text-secondary mb-1">
                    Top Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={promo.badge || ""}
                    onChange={(e) => setPromo({ ...promo, badge: e.target.value })}
                    placeholder="e.g. SPECIAL OFFER, LIMITED DEAL"
                    className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                {/* Button Text */}
                <div>
                  <label className="block font-medium admin-text-secondary mb-1">
                    Button Text (CTA)
                  </label>
                  <input
                    type="text"
                    value={promo.buttonText}
                    onChange={(e) => setPromo({ ...promo, buttonText: e.target.value })}
                    placeholder="e.g. View Offers, Shop Now"
                    className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                    required
                  />
                </div>

                {/* Button URL */}
                <div>
                  <label className="block font-medium admin-text-secondary mb-1">
                    Button Destination URL
                  </label>
                  <input
                    type="text"
                    value={promo.buttonUrl}
                    onChange={(e) => setPromo({ ...promo, buttonUrl: e.target.value })}
                    placeholder="e.g. /shop, /admin/books"
                    className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                    required
                  />
                </div>
              </div>

              {/* Book Image */}
              <div>
                <label className="block font-medium admin-text-secondary mb-1 flex items-center justify-between">
                  <span>Book Cover Image URL / Path (Optional)</span>
                  {promo.imageUrl && (
                    <button
                      type="button"
                      onClick={() => setPromo({ ...promo, imageUrl: "" })}
                      className="text-[11px] text-red-500 hover:underline cursor-pointer"
                    >
                      Remove Image
                    </button>
                  )}
                </label>
                <input
                  type="text"
                  value={promo.imageUrl || ""}
                  onChange={(e) => setPromo({ ...promo, imageUrl: e.target.value })}
                  placeholder="e.g. /images/book_section1.png"
                  className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                />
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] text-gray-400">Quick presets:</span>
                  <button
                    type="button"
                    onClick={() => setPromo({ ...promo, imageUrl: "/images/book_section1.png" })}
                    className="text-[11px] px-2.5 py-1 rounded bg-purple-50 dark:bg-purple-950/40 text-[#8B5CF6] hover:underline cursor-pointer font-medium"
                  >
                    Book 1
                  </button>
                  <button
                    type="button"
                    onClick={() => setPromo({ ...promo, imageUrl: "/images/3_book.png" })}
                    className="text-[11px] px-2.5 py-1 rounded bg-purple-50 dark:bg-purple-950/40 text-[#8B5CF6] hover:underline cursor-pointer font-medium"
                  >
                    3 Books
                  </button>
                  <button
                    type="button"
                    onClick={() => setPromo({ ...promo, imageUrl: "" })}
                    className="text-[11px] px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:underline cursor-pointer font-medium"
                  >
                    No Image
                  </button>
                </div>
              </div>
            </div>

            {/* Right Live Sidebar Preview */}
            <div className="flex flex-col items-center justify-start p-4 rounded-2xl bg-gray-50/70 dark:bg-[#0F172A]/70 border border-gray-200/60 dark:border-gray-800">
              <div className="flex items-center gap-1.5 text-xs font-bold admin-text-primary mb-3">
                <Eye className="w-3.5 h-3.5 text-[#8B5CF6]" />
                Live Sidebar Preview
              </div>

              <div className="w-[220px] max-w-full">
                {promo.isActive ? (
                  <SidebarPromoCard promo={promo} className="p-0" />
                ) : (
                  <div className="p-6 text-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl text-xs text-gray-400">
                    Card is currently <strong>Hidden</strong>.<br />
                    Toggle status above to show.
                  </div>
                )}
              </div>
              <p className="text-[11px] text-gray-400 text-center mt-3">
                This card appears dynamically in your left sidebar.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. HOMEPAGE NEW ARRIVALS SPECIAL OFFER CARD                               */}
        {/* ========================================================================= */}
        <div className="admin-card rounded-2xl p-6 space-y-6 border border-emerald-500/20 shadow-sm relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold admin-text-primary flex items-center gap-2">
                  Homepage New Arrivals Offer Card
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded-full">
                    Shown on Home Page
                  </span>
                </h3>
                <p className="text-xs admin-text-secondary mt-0.5">
                  The tall vertical green card with gold borders displayed in the "Our Newest Arrivals" section.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Inputs (2 Cols) */}
            <div className="lg:col-span-2 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Subtitle */}
                <div>
                  <label className="block font-medium admin-text-secondary mb-1">
                    Top Italic Subtitle
                  </label>
                  <input
                    type="text"
                    value={promo.newArrivalSubtitle || ""}
                    onChange={(e) => setPromo({ ...promo, newArrivalSubtitle: e.target.value })}
                    placeholder="e.g. Get Extra"
                    className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                    required
                  />
                </div>

                {/* Main Word / Title */}
                <div>
                  <label className="block font-medium admin-text-secondary mb-1">
                    Offer Headline
                  </label>
                  <input
                    type="text"
                    value={promo.newArrivalTitle || ""}
                    onChange={(e) => setPromo({ ...promo, newArrivalTitle: e.target.value })}
                    placeholder="e.g. Sale"
                    className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                    required
                  />
                </div>

                {/* Discount Tag */}
                <div>
                  <label className="block font-medium admin-text-secondary mb-1">
                    Discount Highlight
                  </label>
                  <input
                    type="text"
                    value={promo.newArrivalDiscount || ""}
                    onChange={(e) => setPromo({ ...promo, newArrivalDiscount: e.target.value })}
                    placeholder="e.g. -25%, -45%, UP TO 50%"
                    className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6] font-bold text-[#b89245]"
                    required
                  />
                </div>

                {/* Order Condition / Description */}
                <div>
                  <label className="block font-medium admin-text-secondary mb-1">
                    Order Condition / Description
                  </label>
                  <input
                    type="text"
                    value={promo.newArrivalDescription || ""}
                    onChange={(e) => setPromo({ ...promo, newArrivalDescription: e.target.value })}
                    placeholder="e.g. ON ORDER OVER £100"
                    className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                    required
                  />
                </div>

                {/* Button Text */}
                <div>
                  <label className="block font-medium admin-text-secondary mb-1">
                    Button Text (CTA)
                  </label>
                  <input
                    type="text"
                    value={promo.newArrivalButtonText || ""}
                    onChange={(e) => setPromo({ ...promo, newArrivalButtonText: e.target.value })}
                    placeholder="e.g. VIEW MORE, SHOP NOW"
                    className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                    required
                  />
                </div>

                {/* Button URL */}
                <div>
                  <label className="block font-medium admin-text-secondary mb-1">
                    Button Destination URL
                  </label>
                  <input
                    type="text"
                    value={promo.newArrivalButtonUrl || ""}
                    onChange={(e) => setPromo({ ...promo, newArrivalButtonUrl: e.target.value })}
                    placeholder="e.g. /shop"
                    className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                    required
                  />
                </div>
              </div>

              {/* Book Graphic URL */}
              <div>
                <label className="block font-medium admin-text-secondary mb-1">
                  Book 3D Graphic Image Path
                </label>
                <input
                  type="text"
                  value={promo.newArrivalImage || ""}
                  onChange={(e) => setPromo({ ...promo, newArrivalImage: e.target.value })}
                  placeholder="e.g. /images/Gemini_Generated_Image_n0hwhvn0hwhvn0hw-Photoroom.png"
                  className="w-full px-3.5 py-2.5 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                />
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] text-gray-400">Quick presets:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setPromo({
                        ...promo,
                        newArrivalImage:
                          "/images/Gemini_Generated_Image_n0hwhvn0hwhvn0hw-Photoroom.png",
                      })
                    }
                    className="text-[11px] px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer font-medium"
                  >
                    Visions to Victory (Default)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPromo({
                        ...promo,
                        newArrivalImage: "/images/3_book.png",
                      })
                    }
                    className="text-[11px] px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer font-medium"
                  >
                    3 Books Stack
                  </button>
                </div>
              </div>
            </div>

            {/* Live Preview of Homepage Card */}
            <div className="flex flex-col items-center justify-start p-4 rounded-2xl bg-gray-50/70 dark:bg-[#0F172A]/70 border border-gray-200/60 dark:border-gray-800">
              <div className="flex items-center gap-1.5 text-xs font-bold admin-text-primary mb-3">
                <Eye className="w-3.5 h-3.5 text-emerald-500" />
                Live Homepage Card Preview
              </div>

              {/* Exact Home Page Card Replica */}
              <div className="w-[210px] max-w-full bg-gradient-to-b from-[#0d2217] via-[#08150e] to-[#040a07] border border-[#d4b56a]/30 p-4 flex flex-col justify-between relative overflow-hidden rounded-xs text-center shadow-lg">
                <div className="absolute inset-1.5 border border-[#d4b56a]/20 pointer-events-none" />
                <div className="absolute inset-2.5 border border-[#d4b56a]/10 pointer-events-none" />

                <div className="relative z-10 pt-4">
                  <span className="font-serif italic text-base font-semibold text-[#d4b56a] block">
                    {promo.newArrivalSubtitle || "Get Extra"}
                  </span>
                  <h4 className="font-serif text-3xl font-black text-[#f2eee3] tracking-tight mt-0.5">
                    {promo.newArrivalTitle || "Sale"}{" "}
                    <span className="text-[#d4b56a]">{promo.newArrivalDiscount || "-25%"}</span>
                  </h4>
                  <span className="text-[8.5px] tracking-[0.2em] font-extrabold text-[#c0d4c8] uppercase block mt-1">
                    {promo.newArrivalDescription || "ON ORDER OVER £100"}
                  </span>
                </div>

                <div className="relative z-10 my-2 flex items-center justify-center">
                  <img
                    src={
                      promo.newArrivalImage ||
                      "/images/Gemini_Generated_Image_n0hwhvn0hwhvn0hw-Photoroom.png"
                    }
                    alt="Book Offer"
                    className="w-full h-28 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                  />
                </div>

                <div className="relative z-10 pb-2">
                  <div className="w-full py-2 bg-[#2c7650] text-white border border-[#d4b56a]/40 text-[10px] font-extrabold tracking-[0.14em] uppercase inline-flex items-center justify-center gap-1 rounded-sm">
                    {promo.newArrivalButtonText || "VIEW MORE"} <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 text-center mt-3">
                Renders on Home Page under "Our Newest Arrivals".
              </p>
            </div>
          </div>
        </div>

        {/* Global Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold shadow-lg hover:shadow-purple-500/25 transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving Changes..." : "Save All Promotional Offers"}
          </button>
        </div>
      </form>
    </div>
  );
}
