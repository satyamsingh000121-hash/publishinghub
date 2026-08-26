"use client";

import React, { useState, useEffect } from "react";
import { X, AlertTriangle, Check, ExternalLink, Trash2 } from "lucide-react";
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
    stock: 100,
    availability: "in-stock",
    image: "/images/book_section1.png",
    featured: false,
    summary: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (book && mode === "edit") {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        category: book.category || (categories[0] || "Fiction"),
        price: book.price || `£${book.numericPrice || 19.99}`,
        numericPrice: book.numericPrice || 19.99,
        stock: book.stock ?? 100,
        availability: book.availability || "in-stock",
        image: book.image || "/images/book_section1.png",
        featured: book.featured || false,
        summary: book.summary || "",
        description: book.description || "",
      });
    } else if (mode === "add") {
      setFormData({
        title: "",
        author: "",
        category: categories[0] || "Fiction",
        price: "£19.99",
        numericPrice: 19.99,
        stock: 50,
        availability: "in-stock",
        image: "/images/book_section1.png",
        featured: false,
        summary: "",
        description: "",
      });
    }
    setErrorMessage("");
  }, [book, mode, categories]);

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
            stock: Number(formData.stock) || 50,
            availability: formData.availability,
            image: formData.image,
            featured: formData.featured,
            summary: formData.summary,
            description: formData.description,
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
            stock: Number(formData.stock) || 50,
            availability: formData.availability,
            image: formData.image,
            featured: formData.featured,
            summary: formData.summary,
            description: formData.description,
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
              <div className="w-20 h-28 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border shadow-sm flex-shrink-0" style={{ width: "80px", height: "112px", minWidth: "80px", minHeight: "112px" }}>
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  style={{ width: "80px", height: "112px", objectFit: "cover" }}
                />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold admin-pill-bg text-[#8B5CF6] dark:text-[#C4B5FD]">
                  {book.category}
                </span>
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

            <div>
              <label className="font-semibold admin-text-primary block mb-1">
                Cover Image Path / URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/images/book_section1.png"
                className="w-full px-3.5 py-2 admin-input-bg rounded-xl focus:outline-none focus:border-[#8B5CF6]"
              />
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
