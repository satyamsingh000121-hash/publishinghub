"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  AlertTriangle,
  Check,
  ExternalLink,
  Trash2,
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  Link2,
} from "lucide-react";
import Link from "next/link";
import { BookItemData } from "./BookRow";

interface BookActionsModalProps {
  mode: "add" | "edit" | "view" | "delete" | null;
  book: BookItemData | null;
  categories: string[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function BookActionsModal({
  mode,
  book,
  categories,
  onClose,
  onSuccess,
}: BookActionsModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "£19.99",
    numericPrice: 19.99,
    originalPrice: "",
    stock: 100,
    availability: "in-stock",
    badge: "",
    image: "",
    featured: false,
    summary: "",
    description: "",
    isbn: "",
    publisher: "",
    pages: 250,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (book && mode === "edit") {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        category: book.category || (categories[0] || "Fiction"),
        price: book.price || `£${book.numericPrice || 19.99}`,
        numericPrice: book.numericPrice || 19.99,
        originalPrice: book.originalPrice || "",
        stock: book.stock ?? 100,
        availability: book.availability || "in-stock",
        badge: book.badge || "",
        image: book.image || "",
        featured: book.featured || false,
        summary: book.summary || "",
        description: book.description || "",
        isbn: book.isbn || "",
        publisher: book.publisher || "",
        pages: book.pages || 250,
      });
    } else if (mode === "add") {
      setFormData({
        title: "",
        author: "",
        category: categories[0] || "Fiction",
        price: "£19.99",
        numericPrice: 19.99,
        originalPrice: "",
        stock: 50,
        availability: "in-stock",
        badge: "",
        image: "",
        featured: false,
        summary: "",
        description: "",
        isbn: "",
        publisher: "",
        pages: 250,
      });
    }
    setErrorMessage("");
    setShowUrlInput(false);
  }, [book, mode, categories]);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant local preview
    const localPreview = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, image: localPreview }));

    setIsUploading(true);
    setErrorMessage("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const json = await res.json();
      if (res.ok && json?.data?.url) {
        setFormData((prev) => ({ ...prev, image: json.data.url }));
      } else {
        // Fallback to local Base64 data URL if needed
        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prev) => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      console.error("Upload failed, falling back to base64:", err);
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
    }
  };

  if (!mode) return null;

  // Submit Handler (Add or Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (mode === "add") {
        const slug = formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") || `book-${Date.now()}`;

        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug,
            title: formData.title,
            author: formData.author,
            category: formData.category,
            price: formData.price.startsWith("£") ? formData.price : `£${formData.price}`,
            numericPrice: Number(formData.numericPrice) || 19.99,
            originalPrice: formData.originalPrice.trim() || undefined,
            stock: Number(formData.stock) || 50,
            availability: formData.availability,
            badge: formData.badge || undefined,
            image: formData.image || "/images/book_section1.png",
            featured: formData.featured,
            summary: formData.summary,
            description: formData.description,
            isbn: formData.isbn.trim() || undefined,
            publisher: formData.publisher.trim() || undefined,
            pages: Number(formData.pages) || undefined,
          }),
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || "Failed to create book");
        }
      } else if (mode === "edit" && book) {
        const res = await fetch(`/api/products/${book.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            author: formData.author,
            category: formData.category,
            price: formData.price.startsWith("£") ? formData.price : `£${formData.price}`,
            numericPrice: Number(formData.numericPrice) || 19.99,
            originalPrice: formData.originalPrice.trim() || undefined,
            stock: Number(formData.stock) || 50,
            availability: formData.availability,
            badge: formData.badge || null,
            image: formData.image || "/images/book_section1.png",
            featured: formData.featured,
            summary: formData.summary,
            description: formData.description,
            isbn: formData.isbn.trim() || undefined,
            publisher: formData.publisher.trim() || undefined,
            pages: Number(formData.pages) || undefined,
          }),
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || "Failed to update book");
        }
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Handler
  const handleDelete = async () => {
    if (!book) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch(`/api/products/${book.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to delete book");
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to delete book.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="admin-card rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-display text-lg font-bold admin-text-primary">
            {mode === "add" && "Add New Book"}
            {mode === "edit" && "Edit Book Details"}
            {mode === "view" && "Book Overview"}
            {mode === "delete" && "Confirm Deletion"}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-5 mt-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 1. VIEW MODE */}
        {mode === "view" && book && (
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-20 h-28 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border shadow-sm flex-shrink-0 relative" style={{ width: "80px", height: "112px", minWidth: "80px", minHeight: "112px" }}>
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  style={{ width: "80px", height: "112px", objectFit: "cover" }}
                />
                {book.badge && (
                  <div className="absolute top-1 left-0 z-10 flex flex-col gap-0.5 pointer-events-none">
                    {(book.badge === "SALE" || book.badge === "SALE_AND_HOT" || book.badge === "SALE_AND_NEW") && (
                      <span
                        className="bg-[#56ab84] text-white text-[7.5px] font-bold px-1.5 py-0.2 uppercase tracking-wider"
                        style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                      >
                        SALE
                      </span>
                    )}
                    {(book.badge === "HOT" || book.badge === "SALE_AND_HOT") && (
                      <span
                        className="bg-[#e05638] text-white text-[7.5px] font-bold px-1.5 py-0.2 uppercase tracking-wider"
                        style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                      >
                        HOT
                      </span>
                    )}
                    {(book.badge === "NEW" || book.badge === "SALE_AND_NEW") && (
                      <span
                        className="bg-[#df5a29] text-white text-[7.5px] font-bold px-1.5 py-0.2 uppercase tracking-wider"
                        style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                      >
                        NEW
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold admin-pill-bg text-[#8B5CF6] dark:text-[#C4B5FD]">
                    {book.category}
                  </span>
                  {book.badge && (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#e05638]/10 text-[#e05638] border border-[#e05638]/30">
                      {book.badge.replace(/_/g, " ")}
                    </span>
                  )}
                </div>
                <h4 className="font-display text-lg font-bold admin-text-primary leading-snug">
                  {book.title}
                </h4>
                <p className="text-xs admin-text-secondary">
                  By <strong className="admin-text-primary">{book.author}</strong>
                </p>
                <p className="text-base font-bold text-[#8B5CF6] pt-1">
                  {book.price}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 admin-card rounded-xl">
                <span className="admin-text-secondary block">Stock Level</span>
                <span className="font-bold admin-text-primary">{book.stock} units</span>
              </div>
              <div className="p-3 admin-card rounded-xl">
                <span className="admin-text-secondary block">Availability</span>
                <span className="font-bold capitalize admin-text-primary">
                  {book.availability.replace("-", " ")}
                </span>
              </div>
            </div>

            {book.summary && (
              <div className="text-xs space-y-1">
                <span className="font-semibold admin-text-primary block">Summary</span>
                <p className="admin-text-secondary leading-relaxed bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl">
                  {book.summary}
                </p>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <Link
                href={`/product/${book.slug || book.id}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:underline"
              >
                <span>View on Live Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={onClose}
                className="px-4 py-2 admin-card rounded-xl text-xs font-semibold hover:opacity-90 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* 2. ADD & EDIT MODE */}
        {(mode === "add" || mode === "edit") && (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
            <div>
              <label className="font-semibold admin-text-primary block mb-1">
                Book Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Visions of Victory"
                className="w-full px-3.5 py-2 admin-input-bg rounded-xl focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold admin-text-primary block mb-1">
                  Author *
                </label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="e.g. Samantha Walker"
                  className="w-full px-3.5 py-2 admin-input-bg rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="font-semibold admin-text-primary block mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 admin-input-bg rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-semibold admin-text-primary block mb-1">
                  Price *
                </label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => {
                    const cleanNum = parseFloat(e.target.value.replace(/[^0-9.]/g, "")) || 0;
                    setFormData({
                      ...formData,
                      price: e.target.value,
                      numericPrice: cleanNum,
                    });
                  }}
                  placeholder="£19.99"
                  className="w-full px-3.5 py-2 admin-input-bg rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="font-semibold admin-text-primary block mb-1">
                  Stock Units
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-3.5 py-2 admin-input-bg rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="font-semibold admin-text-primary block mb-1">
                  Availability
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full px-3.5 py-2 admin-input-bg rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                >
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>

            {/* Cover Image Upload & Preview Component */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold admin-text-primary text-xs">
                  Book Cover Image *
                </label>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-[11px] text-[#8B5CF6] dark:text-[#C4B5FD] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Link2 className="w-3 h-3" />
                  <span>{showUrlInput ? "Switch to File Upload" : "Or enter URL manually"}</span>
                </button>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />

              {showUrlInput ? (
                /* Fallback URL input */
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/cover.jpg or /images/..."
                  className="w-full px-3.5 py-2 text-xs admin-input-bg rounded-xl border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
                />
              ) : formData.image ? (
                /* Uploaded Image Preview Card */
                <div className="flex items-center gap-4 p-3 admin-input-bg border border-gray-200 dark:border-gray-800 rounded-xl">
                  {/* Thumbnail */}
                  <div className="w-14 h-18 rounded-lg overflow-hidden bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-gray-700 flex-shrink-0 flex items-center justify-center relative">
                    <img
                      src={formData.image}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Actions & Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-semibold admin-text-primary">
                      <ImageIcon className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span className="truncate">Cover Image Selected</span>
                    </div>
                    <p className="text-[11px] admin-text-secondary mt-0.5 truncate">
                      {isUploading ? "Uploading to server..." : "Ready to publish"}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#8B5CF6]/15 text-[#8B5CF6] dark:text-[#C4B5FD] hover:bg-[#8B5CF6]/25 transition-colors cursor-pointer"
                      >
                        Change Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: "" })}
                        disabled={isUploading}
                        className="px-2 py-1 text-[11px] font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Drag & Drop / Click to Upload Dropzone */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-[#8B5CF6] dark:hover:border-[#8B5CF6] rounded-xl p-5 text-center cursor-pointer transition-colors bg-gray-50/50 dark:bg-[#1E293B]/20 hover:bg-[#8B5CF6]/5 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    {isUploading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <UploadCloud className="w-5 h-5" />
                    )}
                  </div>
                  <p className="text-xs font-semibold admin-text-primary">
                    {isUploading ? "Uploading image..." : "Click to upload book cover"}
                  </p>
                  <p className="text-[11px] admin-text-secondary mt-0.5">
                    Supports PNG, JPG, WEBP from your computer
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="font-semibold admin-text-primary block mb-1">
                Summary / Tagline
              </label>
              <input
                type="text"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Brief synopsis..."
                className="w-full px-3.5 py-2 admin-input-bg rounded-xl focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="font-semibold admin-text-primary block mb-1">
                Full Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed book description, plot overview, and highlights..."
                className="w-full px-3.5 py-2 admin-input-bg rounded-xl focus:outline-none focus:border-[#8B5CF6] text-xs resize-y"
              />
            </div>

            {/* Optional Publishing Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div>
                <label className="font-semibold admin-text-primary text-[11px] block mb-1">
                  Original / Old Price
                </label>
                <input
                  type="text"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="£25.00"
                  className="w-full px-3 py-1.5 text-xs admin-input-bg rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="font-semibold admin-text-primary text-[11px] block mb-1">
                  ISBN (Optional)
                </label>
                <input
                  type="text"
                  value={formData.isbn}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  placeholder="978-0123456789"
                  className="w-full px-3 py-1.5 text-xs admin-input-bg rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="font-semibold admin-text-primary text-[11px] block mb-1">
                  Publisher (Optional)
                </label>
                <input
                  type="text"
                  value={formData.publisher}
                  onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                  placeholder="Publishing Hub Press"
                  className="w-full px-3 py-1.5 text-xs admin-input-bg rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="font-semibold admin-text-primary text-[11px] block mb-1">
                  Page Count
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.pages}
                  onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-3 py-1.5 text-xs admin-input-bg rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>
            </div>

            {/* Ribbon Badges (HOT & SALE) */}
            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-[#1e293b]/40 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-semibold admin-text-primary text-xs block">
                    Product Ribbon Badges (HOT & SALE)
                  </label>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    Display &quot;HOT&quot; and/or &quot;SALE&quot; ribbon flags on the book cover
                  </span>
                </div>
                {/* Live Ribbon Preview */}
                {formData.badge && (
                  <div className="flex flex-col gap-1 items-end pl-2">
                    {(formData.badge === "SALE" || formData.badge === "SALE_AND_HOT" || formData.badge === "SALE_AND_NEW") && (
                      <span
                        className="bg-[#56ab84] text-white text-[9.5px] font-bold px-2.5 pt-0.5 pb-1 uppercase tracking-wider shadow-sm flex items-center justify-center"
                        style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                      >
                        SALE
                      </span>
                    )}
                    {(formData.badge === "HOT" || formData.badge === "SALE_AND_HOT") && (
                      <span
                        className="bg-[#e05638] text-white text-[9.5px] font-bold px-2.5 pt-0.5 pb-1 uppercase tracking-wider shadow-sm flex items-center justify-center"
                        style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                      >
                        HOT
                      </span>
                    )}
                    {(formData.badge === "NEW" || formData.badge === "SALE_AND_NEW") && (
                      <span
                        className="bg-[#df5a29] text-white text-[9.5px] font-bold px-2.5 pt-0.5 pb-1 uppercase tracking-wider shadow-sm flex items-center justify-center"
                        style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                      >
                        NEW
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, badge: "" })}
                  className={`px-3 py-2 rounded-xl font-semibold border transition-all cursor-pointer text-center ${
                    !formData.badge
                      ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-[#8B5CF6] dark:text-[#C4B5FD]"
                      : "border-gray-200 dark:border-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  No Badge
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      badge: formData.badge === "HOT" ? "" : "HOT",
                    })
                  }
                  className={`px-3 py-2 rounded-xl font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    formData.badge === "HOT"
                      ? "border-[#e05638] bg-[#e05638]/15 text-[#e05638]"
                      : "border-gray-200 dark:border-gray-700/80 hover:border-[#e05638]/50 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span
                    className="bg-[#e05638] text-white text-[8.5px] font-bold px-2 py-0.5 uppercase tracking-wider"
                    style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                  >
                    HOT
                  </span>
                  <span>Hot Title</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      badge: formData.badge === "SALE" ? "" : "SALE",
                    })
                  }
                  className={`px-3 py-2 rounded-xl font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    formData.badge === "SALE"
                      ? "border-[#56ab84] bg-[#56ab84]/15 text-[#56ab84]"
                      : "border-gray-200 dark:border-gray-700/80 hover:border-[#56ab84]/50 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span
                    className="bg-[#56ab84] text-white text-[8.5px] font-bold px-2 py-0.5 uppercase tracking-wider"
                    style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                  >
                    SALE
                  </span>
                  <span>On Sale</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      badge: formData.badge === "SALE_AND_HOT" ? "" : "SALE_AND_HOT",
                    })
                  }
                  className={`px-3 py-2 rounded-xl font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    formData.badge === "SALE_AND_HOT"
                      ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-[#8B5CF6] dark:text-[#C4B5FD]"
                      : "border-gray-200 dark:border-gray-700/80 hover:border-[#8B5CF6]/50 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span
                    className="bg-[#56ab84] text-white text-[8px] font-bold px-1.5 py-0.5 uppercase"
                    style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                  >
                    SALE
                  </span>
                  <span
                    className="bg-[#e05638] text-white text-[8px] font-bold px-1.5 py-0.5 uppercase"
                    style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                  >
                    HOT
                  </span>
                </button>
              </div>

              {/* Individual Toggle Checkboxes for precision */}
              <div className="flex flex-wrap items-center gap-5 pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.badge === "HOT" || formData.badge === "SALE_AND_HOT"}
                    onChange={(e) => {
                      const isHot = e.target.checked;
                      const isSale = formData.badge === "SALE" || formData.badge === "SALE_AND_HOT";
                      let newBadge = "";
                      if (isHot && isSale) newBadge = "SALE_AND_HOT";
                      else if (isHot) newBadge = "HOT";
                      else if (isSale) newBadge = "SALE";
                      setFormData({ ...formData, badge: newBadge });
                    }}
                    className="w-4 h-4 rounded text-[#e05638] focus:ring-[#e05638] cursor-pointer"
                  />
                  <span className="admin-text-primary font-medium flex items-center gap-1.5">
                    <span
                      className="bg-[#e05638] text-white text-[8px] font-bold px-1.5 py-0.2 uppercase"
                      style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                    >
                      HOT
                    </span>
                    <span>Enable HOT Ribbon</span>
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.badge === "SALE" || formData.badge === "SALE_AND_HOT" || formData.badge === "SALE_AND_NEW"}
                    onChange={(e) => {
                      const isSale = e.target.checked;
                      const isHot = formData.badge === "HOT" || formData.badge === "SALE_AND_HOT";
                      let newBadge = "";
                      if (isSale && isHot) newBadge = "SALE_AND_HOT";
                      else if (isSale) newBadge = "SALE";
                      else if (isHot) newBadge = "HOT";
                      setFormData({ ...formData, badge: newBadge });
                    }}
                    className="w-4 h-4 rounded text-[#56ab84] focus:ring-[#56ab84] cursor-pointer"
                  />
                  <span className="admin-text-primary font-medium flex items-center gap-1.5">
                    <span
                      className="bg-[#56ab84] text-white text-[8px] font-bold px-1.5 py-0.2 uppercase"
                      style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                    >
                      SALE
                    </span>
                    <span>Enable SALE Ribbon</span>
                  </span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="featuredCheck"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded text-[#8B5CF6] focus:ring-[#8B5CF6] cursor-pointer"
              />
              <label htmlFor="featuredCheck" className="admin-text-primary cursor-pointer font-medium">
                Mark as Featured Title
              </label>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 admin-card rounded-xl font-semibold hover:opacity-90 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold rounded-xl shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : mode === "add" ? "Create Book" : "Update Book"}
              </button>
            </div>
          </form>
        )}

        {/* 3. DELETE CONFIRMATION MODE */}
        {mode === "delete" && book && (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>

            <h4 className="text-base font-bold admin-text-primary">
              Delete &quot;{book.title}&quot;?
            </h4>
            <p className="text-xs admin-text-secondary max-w-sm mx-auto">
              Are you sure you want to remove this book from your catalog? This action will delete the catalog record and cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 admin-card rounded-xl text-xs font-semibold hover:opacity-90 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isSubmitting}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Deleting..." : "Yes, Delete Book"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
