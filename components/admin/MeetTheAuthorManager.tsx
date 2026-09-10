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
  X,
  Layers,
  Sparkles,
  HelpCircle,
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

const DEFAULT_AVATAR = "/images/author-01.jpg";

export default function MeetTheAuthorManager() {
  const [authorsList, setAuthorsList] = useState<MeetTheAuthorProfileData[]>([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>("");

  const [profile, setProfile] = useState<MeetTheAuthorProfileData>({
    id: "",
    authorName: "",
    authorImage: DEFAULT_AVATAR,
    quote: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    books: [],
  });

  const [availableProducts, setAvailableProducts] = useState<StoreProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // 1. Fetch all profiles and all store products
  const loadData = async (preferredId?: string) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const [profilesRes, productsRes] = await Promise.all([
        fetch("/api/meet-the-author"),
        fetch("/api/products?limit=100"),
      ]);

      const profilesJson = await profilesRes.json();
      const productsJson = await productsRes.json();

      let loadedAuthors: MeetTheAuthorProfileData[] = [];
      if (profilesJson?.success && profilesJson.data) {
        if (Array.isArray(profilesJson.data.authors)) {
          loadedAuthors = profilesJson.data.authors;
        } else if (Array.isArray(profilesJson.data)) {
          loadedAuthors = profilesJson.data;
        } else if (profilesJson.data.id) {
          loadedAuthors = [profilesJson.data];
        }
      }

      setAuthorsList(loadedAuthors);

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

      // Pick selected author
      if (loadedAuthors.length > 0) {
        const target = preferredId
          ? loadedAuthors.find((a) => a.id === preferredId) || loadedAuthors[0]
          : loadedAuthors[0];
        setSelectedAuthorId(target.id);
        setProfile({
          ...target,
          books: target.books || [],
        });
        setImageUrlInput(target.authorImage || "");
      } else {
        handleAddNewAuthor();
      }
    } catch (err: any) {
      console.error("Failed to load Meet The Author data:", err);
      setErrorMsg("Failed to load data from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. Select an author from the cards
  const handleSelectAuthor = (auth: MeetTheAuthorProfileData) => {
    setSelectedAuthorId(auth.id);
    setProfile({
      ...auth,
      books: auth.books || [],
    });
    setImageUrlInput(auth.authorImage || "");
    setErrorMsg("");
    setSuccessMsg("");
  };

  // 3. Start "+ Add Author"
  const handleAddNewAuthor = () => {
    setSelectedAuthorId("new");
    setProfile({
      id: "",
      authorName: "",
      authorImage: DEFAULT_AVATAR,
      quote: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      books: [],
    });
    setImageUrlInput(DEFAULT_AVATAR);
    setErrorMsg("");
    setSuccessMsg("");
  };

  // 4. Handle Image Upload
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant local preview
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

  // 5. Books Management: Add book to currently selected author
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

  // Remove book from currently selected author
  const handleRemoveBook = (bookId: string) => {
    setProfile((prev) => ({
      ...prev,
      books: prev.books.filter((b) => b.id !== bookId),
    }));
  };

  // Move book up (reorder)
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

  // Move book down (reorder)
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

  // Available books (filter out already selected, plus search query)
  const availableBooksFiltered = useMemo(() => {
    const selectedIds = new Set(profile.books.map((b) => b.id));
    const unselected = availableProducts.filter((p) => !selectedIds.has(p.id));

    const q = searchQuery.toLowerCase().trim();
    if (!q) return unselected;

    return unselected.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
    );
  }, [availableProducts, profile.books, searchQuery]);

  // 6. Save Author & Books
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.authorName || !profile.authorName.trim()) {
      setErrorMsg("Author Name is required.");
      return;
    }

    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const isNew = selectedAuthorId === "new" || !profile.id;
      const method = isNew ? "POST" : "PUT";

      const payload = {
        id: profile.id || undefined,
        authorName: profile.authorName.trim(),
        authorImage: profile.authorImage || DEFAULT_AVATAR,
        quote: profile.quote || "",
        facebook: profile.facebook || "",
        twitter: profile.twitter || "",
        linkedin: profile.linkedin || "",
        instagram: profile.instagram || "",
        bookIds: profile.books.map((b) => b.id),
      };

      const res = await fetch("/api/meet-the-author", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success && json.data) {
        const savedData: MeetTheAuthorProfileData = json.data;
        setSuccessMsg(`Author "${savedData.authorName}" and assigned books saved successfully!`);
        setTimeout(() => setSuccessMsg(""), 5000);

        // Reload all data to refresh author list
        await loadData(savedData.id);
      } else {
        setErrorMsg(json.message || "Failed to save author profile.");
      }
    } catch (err: any) {
      console.error("Failed to save author profile:", err);
      setErrorMsg(err.message || "Failed to save author profile changes.");
    } finally {
      setSaving(false);
    }
  };

  // 7. Delete Author Profile
  const handleDeleteAuthor = async () => {
    if (!profile.id || selectedAuthorId === "new") {
      setShowDeleteModal(false);
      return;
    }

    setDeleting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`/api/meet-the-author?id=${encodeURIComponent(profile.id)}`, {
        method: "DELETE",
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSuccessMsg(`Author profile "${profile.authorName}" deleted. (Books in database remain untouched).`);
        setShowDeleteModal(false);
        setTimeout(() => setSuccessMsg(""), 5000);
        await loadData();
      } else {
        setErrorMsg(json.message || "Failed to delete author profile.");
        setShowDeleteModal(false);
      }
    } catch (err: any) {
      console.error("Failed to delete author profile:", err);
      setErrorMsg(err.message || "Failed to delete author profile.");
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] space-y-4">
        <div className="w-10 h-10 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium admin-text-secondary">
          Loading Meet The Author manager...
        </p>
      </div>
    );
  }

  const isNewAuthor = selectedAuthorId === "new" || !profile.id;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header Bar */}
      <div>
        <div className="mb-2">
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
                Manage independent author profiles and curated book showcases for the public product detail pages.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddNewAuthor}
              className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-[#8B5CF6] text-[#8B5CF6] hover:bg-purple-50 dark:hover:bg-purple-950/30 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Author</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 text-white font-medium text-xs rounded-xl shadow-lg shadow-purple-500/25 inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              {saving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* AUTHOR CARDS LIST: SELECT AUTHOR TO MANAGE                                */}
      {/* ========================================================================= */}
      <div className="admin-card rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm border border-purple-500/15">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#8B5CF6]" />
            <h2 className="text-sm sm:text-base font-semibold admin-text-primary">
              Author Profiles ({authorsList.length})
            </h2>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Click an author to view and edit their profile &amp; assigned books.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {authorsList.map((auth) => {
            const isSelected = selectedAuthorId === auth.id;
            const bookCount = auth.books?.length || 0;

            return (
              <div
                key={auth.id}
                onClick={() => handleSelectAuthor(auth)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative flex items-center gap-3 group ${
                  isSelected
                    ? "bg-purple-50/70 dark:bg-purple-950/40 border-[#8B5CF6] shadow-md ring-2 ring-[#8B5CF6]/30"
                    : "bg-white dark:bg-[#0B101B] border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-800"
                }`}
              >
                {/* Author Thumbnail */}
                <div className="w-12 h-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-black/30 shrink-0 border border-gray-200/80 dark:border-gray-700">
                  <img
                    src={auth.authorImage || DEFAULT_AVATAR}
                    alt={auth.authorName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Author Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-semibold admin-text-primary truncate">
                    {auth.authorName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                      {bookCount} {bookCount === 1 ? "book" : "books"}
                    </span>
                  </div>
                </div>

                {/* Quick Edit / Delete Buttons */}
                <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100">
                  <button
                    type="button"
                    title="Delete Author Profile"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAuthor(auth);
                      setShowDeleteModal(true);
                    }}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* New Author Card Button */}
          <div
            onClick={handleAddNewAuthor}
            className={`p-3.5 rounded-xl border border-dashed flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isNewAuthor
                ? "border-[#8B5CF6] bg-purple-50/50 dark:bg-purple-950/30 text-[#8B5CF6]"
                : "border-gray-300 dark:border-gray-700 text-gray-500 hover:border-[#8B5CF6] hover:text-[#8B5CF6]"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs font-semibold">Add New Author</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: AUTHOR PROFILE DETAILS (CURRENTLY ACTIVE AUTHOR)              */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Author Profile Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="admin-card rounded-2xl p-5 sm:p-6 space-y-5 border border-purple-500/20 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-sm sm:text-base font-semibold admin-text-primary flex items-center gap-2">
                <User className="w-4 h-4 text-[#8B5CF6]" />
                <span>
                  {isNewAuthor
                    ? "SECTION 1 — New Author Profile"
                    : `SECTION 1 — Profile: ${profile.authorName || "Author"}`}
                </span>
              </h2>

              {!isNewAuthor && (
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="text-xs text-red-500 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Profile
                </button>
              )}
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-xs font-semibold admin-text-secondary uppercase tracking-wider mb-2">
                Author Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={profile.authorName}
                onChange={(e) => setProfile({ ...profile, authorName: e.target.value })}
                placeholder="e.g. Savanna Walker"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#0B101B] admin-text-primary text-sm focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                Must match the author name associated with their books in Admin &gt; Books.
              </p>
            </div>

            {/* Author Portrait Image Upload */}
            <div>
              <label className="block text-xs font-semibold admin-text-secondary uppercase tracking-wider mb-2">
                Author Portrait Image
              </label>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-gray-700 shrink-0 shadow-xs">
                  <img
                    src={profile.authorImage || DEFAULT_AVATAR}
                    alt={profile.authorName || "Author Portrait"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                    }}
                  />
                </div>

                <div className="space-y-2 flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="px-4 py-2 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/50 dark:hover:bg-purple-900/60 text-[#8B5CF6] text-xs font-semibold rounded-xl border border-purple-200 dark:border-purple-800/60 inline-flex items-center gap-2 transition-colors cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload Portrait Photo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded-xl transition-colors cursor-pointer"
                    >
                      {showUrlInput ? "Hide URL" : "Enter Image URL"}
                    </button>
                  </div>

                  {showUrlInput && (
                    <div className="flex items-center gap-2 pt-1 animate-in fade-in">
                      <input
                        type="text"
                        value={imageUrlInput}
                        onChange={(e) => {
                          setImageUrlInput(e.target.value);
                          setProfile((prev) => ({ ...prev, authorImage: e.target.value }));
                        }}
                        placeholder="https://example.com/author.jpg"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#0B101B] admin-text-primary text-xs focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  )}

                  <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    Recommended aspect ratio: 3.8:5 or 4:5 portrait photo. JPG, PNG or WEBP.
                  </p>
                </div>
              </div>
            </div>

            {/* Author Quote / Short Bio */}
            <div>
              <label className="block text-xs font-semibold admin-text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Author Quote / Short Bio</span>
                <span className="text-[11px] text-gray-400 font-normal">Displayed in italics on public page</span>
              </label>
              <textarea
                value={profile.quote || ""}
                onChange={(e) => setProfile({ ...profile, quote: e.target.value })}
                rows={3}
                placeholder="e.g. Curiosity and imagination are the twin engines of genuine storytelling."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#0B101B] admin-text-primary text-sm focus:outline-none focus:border-[#8B5CF6] transition-colors leading-relaxed"
              />
            </div>

            {/* Social Links */}
            <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
              <label className="block text-xs font-semibold admin-text-secondary uppercase tracking-wider">
                Social Profile Links
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Facebook */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#0B101B]">
                  <Facebook className="w-4 h-4 text-blue-600 shrink-0" />
                  <input
                    type="text"
                    value={profile.facebook || ""}
                    onChange={(e) => setProfile({ ...profile, facebook: e.target.value })}
                    placeholder="Facebook URL or #facebook"
                    className="w-full bg-transparent text-xs admin-text-primary focus:outline-none"
                  />
                </div>

                {/* Twitter / X */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#0B101B]">
                  <Twitter className="w-4 h-4 text-sky-500 shrink-0" />
                  <input
                    type="text"
                    value={profile.twitter || ""}
                    onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                    placeholder="Twitter/X URL or #twitter"
                    className="w-full bg-transparent text-xs admin-text-primary focus:outline-none"
                  />
                </div>

                {/* LinkedIn */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#0B101B]">
                  <Linkedin className="w-4 h-4 text-blue-700 shrink-0" />
                  <input
                    type="text"
                    value={profile.linkedin || ""}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    placeholder="LinkedIn URL or #linkedin"
                    className="w-full bg-transparent text-xs admin-text-primary focus:outline-none"
                  />
                </div>

                {/* Instagram */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#0B101B]">
                  <Instagram className="w-4 h-4 text-pink-600 shrink-0" />
                  <input
                    type="text"
                    value={profile.instagram || ""}
                    onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                    placeholder="Instagram URL or #instagram"
                    className="w-full bg-transparent text-xs admin-text-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Realtime Public Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="admin-card rounded-2xl p-5 sm:p-6 space-y-4 border border-purple-500/20 shadow-sm sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xs font-semibold uppercase tracking-wider admin-text-secondary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                Public Page Preview
              </h3>
              <span className="text-[11px] text-gray-400">Live Preview</span>
            </div>

            {/* Preview Box styled like public Meet The Author section */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-black/40 border border-gray-200/80 dark:border-gray-800 flex flex-col items-center text-center space-y-3">
              <h4 className="font-display text-lg font-medium admin-text-primary">
                Meet The Author
              </h4>

              {profile.quote && (
                <p className="font-display italic text-xs text-gray-500 dark:text-[#a3b8ad] max-w-xs line-clamp-2">
                  &ldquo;{profile.quote}&rdquo;
                </p>
              )}

              {/* Portrait */}
              <div className="w-28 aspect-[3.8/5] rounded-sm overflow-hidden bg-white shadow-xs border border-gray-200 dark:border-gray-700">
                <img
                  src={profile.authorImage || DEFAULT_AVATAR}
                  alt={profile.authorName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h5 className="font-display text-base font-semibold admin-text-primary">
                {profile.authorName || "Author Name"}
              </h5>

              {/* Social icons */}
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <span className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center">
                  <Facebook className="w-3 h-3" />
                </span>
                <span className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center">
                  <Twitter className="w-3 h-3" />
                </span>
                <span className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center">
                  <Linkedin className="w-3 h-3" />
                </span>
                <span className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center">
                  <Instagram className="w-3 h-3" />
                </span>
              </div>

              {/* Book count preview */}
              <div className="pt-2 text-[11px] text-gray-500 border-t border-gray-200 dark:border-gray-800 w-full">
                <strong>{profile.books.length} books</strong> assigned to this author
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: AUTHOR'S BOOKS (SELECTED BOOKS + AVAILABLE BOOKS)              */}
      {/* ========================================================================= */}
      <div className="admin-card rounded-2xl p-5 sm:p-6 space-y-6 border border-purple-500/20 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-sm sm:text-base font-semibold admin-text-primary flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8B5CF6]" />
              <span>
                SECTION 2 — Author&apos;s Books:{" "}
                <span className="text-[#8B5CF6]">{profile.authorName || "Current Author"}</span>
              </span>
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Select which books belong to this author. Use arrows to adjust public showcase order.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/60 text-xs font-semibold text-[#8B5CF6]">
            <span>{profile.books.length} books selected</span>
          </div>
        </div>

        {/* 2A: SELECTED BOOKS FOR THIS AUTHOR */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold admin-text-secondary uppercase tracking-wider flex items-center gap-1.5">
            <span>Selected Books (Assigned to {profile.authorName || "Author"})</span>
          </h3>

          {profile.books.length > 0 ? (
            <div className="space-y-2.5">
              {profile.books.map((b, index) => (
                <div
                  key={b.id}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-gray-50/70 dark:bg-[#0B101B] border border-gray-200/80 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-800 transition-colors"
                >
                  {/* Order Index */}
                  <span className="w-6 text-center text-xs font-bold text-gray-400 shrink-0">
                    #{index + 1}
                  </span>

                  {/* Cover */}
                  <div className="w-10 h-14 rounded overflow-hidden bg-gray-200 dark:bg-black/30 shrink-0 border border-gray-200 dark:border-gray-700">
                    <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Title & Author */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold admin-text-primary truncate">
                      {b.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {b.author}
                    </p>
                  </div>

                  {/* Price */}
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
                    {b.price}
                  </span>

                  {/* Order Buttons (Up / Down) */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      title="Move Up"
                      className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-black dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === profile.books.length - 1}
                      title="Move Down"
                      className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-black dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveBook(b.id)}
                    title="Remove from this author"
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 rounded-xl bg-gray-50/50 dark:bg-[#0B101B]/50 border border-dashed border-gray-200 dark:border-gray-800 space-y-1">
              <p className="text-xs font-semibold admin-text-secondary">
                No books currently assigned to {profile.authorName || "this author"}.
              </p>
              <p className="text-[11px] text-gray-400">
                Click &ldquo;+ Add&rdquo; on any book from the Available Books list below.
              </p>
            </div>
          )}
        </div>

        {/* 2B: AVAILABLE BOOKS (SEARCHABLE DATABASE LIST) */}
        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <h3 className="text-xs font-semibold admin-text-secondary uppercase tracking-wider flex items-center gap-1.5">
              <span>Available Books in Database</span>
              <span className="text-[11px] text-gray-400 lowercase font-normal">
                ({availableBooksFiltered.length} available)
              </span>
            </h3>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#0B101B] admin-text-primary text-xs focus:outline-none focus:border-[#8B5CF6]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1 rounded-xl">
            {availableBooksFiltered.length > 0 ? (
              availableBooksFiltered.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center gap-3.5 p-2.5 rounded-xl bg-white dark:bg-[#0B101B] border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-800 transition-colors"
                >
                  {/* Cover */}
                  <div className="w-9 h-12 rounded overflow-hidden bg-gray-100 dark:bg-black/30 shrink-0 border border-gray-200 dark:border-gray-700">
                    <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Title & Author */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold admin-text-primary truncate">
                      {prod.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {prod.author}
                    </p>
                  </div>

                  {/* Price */}
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 shrink-0">
                    {prod.price}
                  </span>

                  {/* Add Button */}
                  <button
                    type="button"
                    onClick={() => handleAddBook(prod)}
                    className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/50 dark:hover:bg-purple-900/60 text-[#8B5CF6] text-xs font-semibold inline-flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-gray-400">
                {searchQuery
                  ? "No available books match your search."
                  : "All database books are currently assigned to this author."}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Save Action Footer */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/95 dark:bg-[#0B101B]/95 border border-purple-500/20 backdrop-blur-md shadow-2xl">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Editing author:{" "}
          <strong className="admin-text-primary">{profile.authorName || "New Author"}</strong>{" "}
          ({profile.books.length} books assigned)
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 text-white font-medium text-xs rounded-xl shadow-lg shadow-purple-500/25 inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            {saving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving Author &amp; Books...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Author &amp; Books</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#0D1322] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-500">
              <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/60">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold admin-text-primary">
                Delete Author Profile?
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Are you sure you want to delete the author profile for{" "}
              <strong>&ldquo;{profile.authorName}&rdquo;</strong>?
            </p>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs">
              <strong>IMPORTANT:</strong> This will only remove the Meet The Author author profile
              and book showcase assignment. Books in the Products database will{" "}
              <strong>NOT</strong> be deleted.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAuthor}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete Author</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
