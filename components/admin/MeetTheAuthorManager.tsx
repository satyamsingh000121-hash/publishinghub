"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  CheckCircle2,
  AlertCircle,
  Search,
  BookOpen,
  Image as ImageIcon,
  ExternalLink,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Quote,
} from "lucide-react";
import { MeetTheAuthorProfileData, MeetTheAuthorBookItem } from "@/types/meetTheAuthor";

interface StoreProduct {
  id: string;
  title: string;
  author: string;
  price: string;
  originalPrice?: string;
  image: string;
  slug?: string;
  badge?: string;
}

export default function MeetTheAuthorManager() {
  const [profile, setProfile] = useState<MeetTheAuthorProfileData>({
    id: "default",
    authorName: "Santosh Kumar Mishra",
    authorImage: "/images/Gemini_Generated_Image_f41einf41einf41e.png",
    quote: "Empowering readers through transformative stories and visionary leadership.",
    facebook: "#facebook",
    twitter: "#twitter",
    linkedin: "#linkedin",
    instagram: "#instagram",
    books: [],
  });

  const [availableProducts, setAvailableProducts] = useState<StoreProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // 1. Fetch current profile and all store products
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [profileRes, productsRes] = await Promise.all([
          fetch("/api/meet-the-author"),
          fetch("/api/products?limit=100"),
        ]);

        const profileJson = await profileRes.json();
        if (profileJson?.success && profileJson.data) {
          setProfile(profileJson.data);
          setImageUrlInput(profileJson.data.authorImage || "");
        }

        const productsJson = await productsRes.json();
        if (productsJson?.success && Array.isArray(productsJson.data)) {
          setAvailableProducts(
            productsJson.data.map((p: any) => ({
              id: p.id,
              title: p.title,
              author: p.author,
              price: p.price,
              originalPrice: p.originalPrice || undefined,
              image: p.image,
              slug: p.slug,
              badge: p.badge || undefined,
            }))
          );
        }
      } catch (err: any) {
        console.error("Failed to load Meet The Author data:", err);
        setErrorMsg("Failed to load data from server.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // 2. Handle Image Upload
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local instant preview
    const previewUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, authorImage: previewUrl }));

    setIsUploading(true);
    setErrorMsg("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const json = await res.json();
      if (res.ok && json?.data?.url) {
        setProfile((prev) => ({ ...prev, authorImage: json.data.url }));
        setImageUrlInput(json.data.url);
      } else {
        // Fallback to FileReader base64
        const reader = new FileReader();
        reader.onload = () => {
          const b64 = reader.result as string;
          setProfile((prev) => ({ ...prev, authorImage: b64 }));
          setImageUrlInput(b64);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      setErrorMsg("Image upload failed. You can paste a direct image URL below.");
    } finally {
      setIsUploading(false);
    }
  };

  // 3. Books Management: Add book
  const handleAddBook = (prod: StoreProduct) => {
    if (profile.books.some((b) => b.id === prod.id)) return;

    const newBook: MeetTheAuthorBookItem = {
      id: prod.id,
      title: prod.title,
      author: prod.author,
      price: prod.price,
      oldPrice: prod.originalPrice,
      image: prod.image,
      slug: prod.slug,
      badge: prod.badge,
      order: profile.books.length,
    };

    setProfile((prev) => ({
      ...prev,
      books: [...prev.books, newBook],
    }));
  };

  // Remove book
  const handleRemoveBook = (bookId: string) => {
    setProfile((prev) => ({
      ...prev,
      books: prev.books.filter((b) => b.id !== bookId),
    }));
  };

  // Move book up
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    setProfile((prev) => {
      const newBooks = [...prev.books];
      const temp = newBooks[index];
      newBooks[index] = newBooks[index - 1];
      newBooks[index - 1] = temp;
      return { ...prev, books: newBooks };
    });
  };

  // Move book down
  const handleMoveDown = (index: number) => {
    if (index >= profile.books.length - 1) return;
    setProfile((prev) => {
      const newBooks = [...prev.books];
      const temp = newBooks[index];
      newBooks[index] = newBooks[index + 1];
      newBooks[index + 1] = temp;
      return { ...prev, books: newBooks };
    });
  };

  // Filter available products by search query
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return availableProducts;
    return availableProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
    );
  }, [availableProducts, searchQuery]);

  // 4. Save Changes to Server
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const payload = {
        authorName: profile.authorName,
        authorImage: profile.authorImage,
        quote: profile.quote,
        facebook: profile.facebook,
        twitter: profile.twitter,
        linkedin: profile.linkedin,
        instagram: profile.instagram,
        bookIds: profile.books.map((b) => b.id),
      };

      const res = await fetch("/api/meet-the-author", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setProfile(json.data);
        setSuccessMsg("Meet The Author profile & books updated successfully!");
        setTimeout(() => setSuccessMsg(""), 5000);
      } else {
        setErrorMsg(json.message || "Failed to save Meet The Author changes.");
      }
    } catch (err: any) {
      console.error("Failed to save profile:", err);
      setErrorMsg(err.message || "Failed to save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mr-3" />
        Loading Meet The Author manager...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-6xl pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Link
            href="/admin"
            className="text-xs font-semibold text-[#8B5CF6] hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-[#8B5CF6]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-[26px] sm:text-[32px] font-semibold admin-text-primary tracking-tight">
                Meet The Author Manager
              </h1>
              <p className="text-[13px] admin-text-secondary mt-0.5">
                Control the author profile, portrait image, quote, and curated showcase books displayed on product detail pages.
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 text-white font-medium text-xs rounded-xl shadow-lg shadow-purple-500/25 inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            {saving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Main Grid: Left Author Profile + Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Author Form Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Author Profile Info */}
          <div className="admin-card rounded-2xl p-5 sm:p-6 space-y-5 border border-purple-500/20 shadow-sm">
            <h2 className="text-base font-semibold admin-text-primary flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
              <User className="w-4 h-4 text-[#8B5CF6]" />
              Author Details
            </h2>

            {/* Author Name */}
            <div>
              <label className="block text-xs font-semibold admin-text-secondary uppercase tracking-wider mb-2">
                Author Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={profile.authorName}
                onChange={(e) => setProfile({ ...profile, authorName: e.target.value })}
                placeholder="e.g. Santosh Kumar Mishra"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#0B101B] admin-text-primary text-sm focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />
            </div>

            {/* Author Profile Image */}
            <div>
              <label className="block text-xs font-semibold admin-text-secondary uppercase tracking-wider mb-2">
                Author Portrait Photo <span className="text-red-500">*</span>
              </label>
              
              <div className="flex items-start gap-4">
                {/* Thumbnail Preview */}
                <div className="w-24 h-32 aspect-[3.8/5] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/30 shrink-0 relative">
                  {profile.authorImage ? (
                    <img
                      src={profile.authorImage}
                      alt={profile.authorName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                {/* Upload Buttons */}
                <div className="space-y-2 flex-1">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-[#8B5CF6] text-xs font-semibold rounded-xl cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    {isUploading ? "Uploading Image..." : "Upload New Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>

                  <div>
                    <button
                      type="button"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="text-[11px] text-[#8B5CF6] hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      {showUrlInput ? "Hide image URL input" : "Or enter image URL manually"}
                    </button>
                  </div>

                  {showUrlInput && (
                    <div className="pt-1 flex gap-2">
                      <input
                        type="text"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="https://... or /images/..."
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0B101B] text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (imageUrlInput.trim()) {
                            setProfile((prev) => ({ ...prev, authorImage: imageUrlInput.trim() }));
                          }
                        }}
                        className="px-3 py-1.5 bg-gray-200 dark:bg-gray-800 text-xs font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Recommended: 3:4 or 3.8:5 portrait aspect ratio image (e.g. 400x520px).
                  </p>
                </div>
              </div>
            </div>

            {/* Author Quote */}
            <div>
              <label className="block text-xs font-semibold admin-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Quote className="w-3 h-3 text-[#8B5CF6]" />
                Author Quote / Short Bio
              </label>
              <textarea
                rows={3}
                value={profile.quote || ""}
                onChange={(e) => setProfile({ ...profile, quote: e.target.value })}
                placeholder="Empowering readers through transformative stories and visionary leadership..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#0B101B] admin-text-primary text-sm focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
              />
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-3">
              <label className="block text-xs font-semibold admin-text-secondary uppercase tracking-wider">
                Social Profile Links (Optional)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0B101B]">
                  <Facebook className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <input
                    type="text"
                    value={profile.facebook || ""}
                    onChange={(e) => setProfile({ ...profile, facebook: e.target.value })}
                    placeholder="Facebook URL (#facebook)"
                    className="w-full bg-transparent text-xs admin-text-primary focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0B101B]">
                  <Twitter className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <input
                    type="text"
                    value={profile.twitter || ""}
                    onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                    placeholder="Twitter/X URL (#twitter)"
                    className="w-full bg-transparent text-xs admin-text-primary focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0B101B]">
                  <Linkedin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <input
                    type="text"
                    value={profile.linkedin || ""}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    placeholder="LinkedIn URL (#linkedin)"
                    className="w-full bg-transparent text-xs admin-text-primary focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0B101B]">
                  <Instagram className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                  <input
                    type="text"
                    value={profile.instagram || ""}
                    onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                    placeholder="Instagram URL (#instagram)"
                    className="w-full bg-transparent text-xs admin-text-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Live Section Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="admin-card rounded-2xl p-5 sm:p-6 border border-amber-500/20 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-base font-semibold admin-text-primary flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-amber-500" />
                Live Preview
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Public Card Look
              </span>
            </div>

            {/* Rendered Preview Card (Dark Emerald Style) */}
            <div className="rounded-xl bg-[#091510] border border-[#2c7650]/50 p-5 text-center sm:text-left relative overflow-hidden shadow-md">
              <div className="flex flex-col items-center sm:items-start">
                <div className="w-28 h-36 aspect-[3.8/5] overflow-hidden rounded-[3px] bg-black/40 border border-[#2c7650]/60 shadow-md">
                  <img
                    src={profile.authorImage || "/images/Gemini_Generated_Image_f41einf41einf41e.png"}
                    alt={profile.authorName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-display text-lg font-medium text-[#f2eee3] mt-3">
                  {profile.authorName || "Author Name"}
                </h3>

                {profile.quote && (
                  <p className="text-xs text-[#a3b8ad] italic mt-1.5 line-clamp-3 leading-relaxed">
                    &ldquo;{profile.quote}&rdquo;
                  </p>
                )}

                {/* Social Icons */}
                <div className="flex items-center gap-2 mt-3 text-[#a3b8ad]">
                  <span className="w-6 h-6 rounded-full border border-[#2c7650]/60 flex items-center justify-center text-[10px] bg-black/20">
                    <Facebook className="w-3 h-3 text-[#d4b56a]" />
                  </span>
                  <span className="w-6 h-6 rounded-full border border-[#2c7650]/60 flex items-center justify-center text-[10px] bg-black/20">
                    <Twitter className="w-3 h-3 text-[#d4b56a]" />
                  </span>
                  <span className="w-6 h-6 rounded-full border border-[#2c7650]/60 flex items-center justify-center text-[10px] bg-black/20">
                    <Linkedin className="w-3 h-3 text-[#d4b56a]" />
                  </span>
                  <span className="w-6 h-6 rounded-full border border-[#2c7650]/60 flex items-center justify-center text-[10px] bg-black/20">
                    <Instagram className="w-3 h-3 text-[#d4b56a]" />
                  </span>
                </div>
              </div>

              {/* Books counter info */}
              <div className="mt-4 pt-3 border-t border-[#2c7650]/30 flex items-center justify-between text-[11px] text-[#c0d4c8]">
                <span>Showcase Books:</span>
                <span className="font-bold text-[#d4b56a]">{profile.books.length} Selected</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: BOOK SELECTION & REORDERING                                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Selected Books (Reorder & Remove) - 6 cols */}
        <div className="lg:col-span-6 space-y-4">
          <div className="admin-card rounded-2xl p-5 sm:p-6 border border-purple-500/20 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#8B5CF6]" />
                <h2 className="text-base font-semibold admin-text-primary">
                  Selected Books in Section
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950 text-[#8B5CF6]">
                {profile.books.length} Selected
              </span>
            </div>

            <p className="text-xs admin-text-secondary">
              These books appear in the Meet The Author grid/carousel on the public product page. Use the arrows to change display order.
            </p>

            {profile.books.length === 0 ? (
              <div className="py-10 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-xs admin-text-secondary">No books selected yet.</p>
                <p className="text-[11px] text-gray-400 mt-1">
                  Select books from the available catalog on the right.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {profile.books.map((book, index) => (
                  <div
                    key={book.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 dark:bg-[#0B101B] border border-gray-200 dark:border-gray-800 hover:border-purple-500/40 transition-all group"
                  >
                    {/* Order badge */}
                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950/80 text-[#8B5CF6] font-bold text-[11px] flex items-center justify-center shrink-0">
                      #{index + 1}
                    </div>

                    {/* Cover thumbnail */}
                    <div className="w-10 h-14 rounded overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0 border border-gray-300 dark:border-gray-700">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Book info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold admin-text-primary truncate">
                        {book.title}
                      </h4>
                      <p className="text-[11px] admin-text-secondary truncate mt-0.5">
                        {book.author}
                      </p>
                      <div className="text-[11px] font-bold text-[#b89245] dark:text-[#d4b56a] mt-0.5">
                        {book.price}
                      </div>
                    </div>

                    {/* Reorder Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        title="Move Up"
                        className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-950 text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === profile.books.length - 1}
                        title="Move Down"
                        className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-950 text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveBook(book.id)}
                        title="Remove book from section"
                        className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950/60 hover:bg-red-200 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 flex items-center justify-center cursor-pointer transition-colors ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Available Books Catalog (Search & Add) - 6 cols */}
        <div className="lg:col-span-6 space-y-4">
          <div className="admin-card rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <h2 className="text-base font-semibold admin-text-primary">
                  Available Store Books
                </h2>
              </div>
              <span className="text-xs text-gray-400">
                {filteredProducts.length} books found
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0B101B] admin-text-primary text-xs focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            {/* Products List */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredProducts.map((prod) => {
                const isSelected = profile.books.some((b) => b.id === prod.id);

                return (
                  <div
                    key={prod.id}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-purple-50/50 dark:bg-purple-950/20 border-purple-300 dark:border-purple-900/50 opacity-75"
                        : "bg-white dark:bg-[#0B101B] border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                  >
                    {/* Cover thumbnail */}
                    <div className="w-9 h-12 rounded overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0 border border-gray-200 dark:border-gray-700">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium admin-text-primary truncate">
                        {prod.title}
                      </h4>
                      <p className="text-[11px] admin-text-secondary truncate">
                        {prod.author}
                      </p>
                      <span className="text-[11px] font-semibold text-[#b89245] dark:text-[#d4b56a]">
                        {prod.price}
                      </span>
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      onClick={() => handleAddBook(prod)}
                      disabled={isSelected}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                          : "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-xs"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          Add
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>

      {/* Sticky Bottom Save Action Bar */}
      <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-xl flex items-center justify-between gap-4">
        <div className="text-xs admin-text-secondary">
          <span className="font-semibold admin-text-primary">{profile.books.length} books</span> configured for the Meet The Author section.
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-lg shadow-purple-500/25 inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            {saving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
