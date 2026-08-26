"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  Sparkles,
} from "lucide-react";

export interface BookItemData {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  price: string;
  numericPrice: number;
  stock: number;
  availability: string;
  image: string;
  badge?: string | null;
  featured?: boolean;
  summary?: string | null;
  description?: string | null;
}

interface BookRowProps {
  book: BookItemData;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onView: (book: BookItemData) => void;
  onEdit: (book: BookItemData) => void;
  onDelete: (book: BookItemData) => void;
}

export default function BookRow({
  book,
  isSelected,
  onToggleSelect,
  onView,
  onEdit,
  onDelete,
}: BookRowProps) {
  const [showMenu, setShowMenu] = useState(false);

  const isOutOfStock = book.availability === "out-of-stock" || book.stock === 0;
  const isFeatured = book.featured;

  return (
    <tr className="hover:bg-gray-50/60 dark:hover:bg-[#334155]/20 transition-colors group">
      {/* Checkbox */}
      <td className="py-3.5 pl-4 pr-2 w-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(book.id)}
          aria-label={`Select ${book.title}`}
          className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-[#8B5CF6] focus:ring-[#8B5CF6] cursor-pointer"
        />
      </td>

      {/* Book Thumbnail & Title */}
      <td className="py-3.5 px-3 min-w-[240px] max-w-[320px]">
        <div className="flex items-center gap-3.5">
          {/* Cover Image */}
          <div className="w-11 h-15 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm border border-gray-200/70 dark:border-gray-700 flex-shrink-0 relative group-hover:scale-105 transition-transform" style={{ width: "44px", height: "60px", minWidth: "44px", minHeight: "60px" }}>
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover"
              style={{ width: "44px", height: "60px", objectFit: "cover" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/shop1.jpg";
              }}
            />
          </div>

          {/* Title & Badge */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-[13.5px] font-bold admin-text-primary truncate leading-tight group-hover:text-[#8B5CF6] transition-colors">
                {book.title}
              </h4>
              {isFeatured && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#FAF5FF] dark:bg-[#7C3AED]/20 text-[#8B5CF6] dark:text-[#C4B5FD] border border-[#F3E8FF] dark:border-[#7C3AED]/30">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Featured</span>
                </span>
              )}
            </div>
            <p className="text-[11.5px] admin-text-secondary truncate mt-0.5">
              {book.summary || book.category}
            </p>
          </div>
        </div>
      </td>

      {/* Author */}
      <td className="py-3.5 px-3 text-[13px] font-medium admin-text-secondary whitespace-nowrap">
        {book.author}
      </td>

      {/* Category */}
      <td className="py-3.5 px-3 text-[12.5px] whitespace-nowrap">
        <span className="inline-block px-2.5 py-1 rounded-lg text-[11.5px] font-semibold admin-pill-bg text-[#8B5CF6] dark:text-[#C4B5FD]">
          {book.category}
        </span>
      </td>

      {/* Price */}
      <td className="py-3.5 px-3 text-[13.5px] font-bold admin-text-primary whitespace-nowrap">
        {book.price.startsWith("£") ? book.price : `£${book.numericPrice.toFixed(2)}`}
      </td>

      {/* Stock */}
      <td className="py-3.5 px-3 text-[12.5px] whitespace-nowrap">
        <span className="font-semibold admin-text-primary">
          {book.stock}
        </span>
        <span className="text-[11px] admin-text-secondary ml-1">
          units
        </span>
      </td>

      {/* Status Pill */}
      <td className="py-3.5 px-3 whitespace-nowrap">
        {isOutOfStock ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF2F2] dark:bg-[#7F1D1D]/30 text-[#DC2626] dark:text-[#F87171]">
            Out of Stock
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] dark:bg-[#064E3B]/30 text-[#10B981] dark:text-[#34D399]">
            In Stock
          </span>
        )}
      </td>

      {/* Actions (Three dots + Dropdown) */}
      <td className="py-3.5 pr-4 pl-2 text-right relative">
        <div className="inline-block text-left">
          <button
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Book actions"
            className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Action Popover Menu */}
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 mt-1 w-36 admin-card rounded-xl shadow-xl py-1.5 z-30 animate-in fade-in duration-100 text-left text-xs">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onView(book);
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 admin-text-primary hover:bg-gray-50 dark:hover:bg-[#334155] cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onEdit(book);
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 admin-text-primary hover:bg-gray-50 dark:hover:bg-[#334155] cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>Edit Book</span>
                </button>
                <div className="h-[1px] bg-gray-100 dark:bg-gray-700 my-1" />
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDelete(book);
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Book</span>
                </button>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
