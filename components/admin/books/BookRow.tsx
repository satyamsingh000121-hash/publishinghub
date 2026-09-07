"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  Sparkles,
  ExternalLink,
  GripVertical,
  ChevronUp,
  ChevronDown,
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
  displayOrder?: number | null;
  summary?: string | null;
  description?: string | null;
  originalPrice?: string | null;
  isbn?: string | null;
  publisher?: string | null;
  pages?: number | null;
  format?: string | null;
}

interface BookRowProps {
  book: BookItemData;
  index: number;
  totalBooks: number;
  displayNumber?: number;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onView: (book: BookItemData) => void;
  onEdit: (book: BookItemData) => void;
  onDelete: (book: BookItemData) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragOver?: (e: React.DragEvent, index: number) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, index: number) => void;
  isDragging?: boolean;
  isDragOver?: boolean;
  openUpwards?: boolean;
}

export default function BookRow({
  book,
  index,
  totalBooks,
  displayNumber,
  isSelected,
  onToggleSelect,
  onView,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  isDragging = false,
  isDragOver = false,
  openUpwards = false,
}: BookRowProps) {
  const [showMenu, setShowMenu] = useState(false);

  const isOutOfStock = book.availability === "out-of-stock" || book.stock === 0;
  const isFeatured = book.featured;

  return (
    <tr
      draggable
      onDragStart={(e) => onDragStart?.(e, index)}
      onDragOver={(e) => onDragOver?.(e, index)}
      onDragEnd={onDragEnd}
      onDrop={(e) => onDrop?.(e, index)}
      className={`transition-all duration-150 group ${
        isDragging
          ? "opacity-30 bg-[#8B5CF6]/10 scale-[0.99] border-dashed border-[#8B5CF6]"
          : isDragOver
          ? "border-t-2 border-[#8B5CF6] bg-[#8B5CF6]/10"
          : "hover:bg-gray-50/60 dark:hover:bg-[#334155]/20"
      }`}
    >
      {/* Drag Handle & Ordering */}
      <td className="py-3.5 pl-3 pr-1 w-16 text-center select-none">
        <div className="flex items-center justify-center gap-1">
          <div
            title="Click and drag up or down to reorder"
            className="p-1 text-gray-400 hover:text-[#8B5CF6] cursor-grab active:cursor-grabbing hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors flex items-center"
          >
            <GripVertical className="w-4 h-4" />
            <span className="text-[10px] font-semibold text-gray-400 min-w-[18px] text-right">
              {displayNumber ?? index + 1}
            </span>
          </div>
          <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => onMoveUp?.(index)}
              title="Move Up"
              className="p-0.5 text-gray-400 hover:text-[#8B5CF6] disabled:opacity-20 disabled:hover:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronUp className="w-3 h-3" />
            </button>
            <button
              type="button"
              disabled={index === totalBooks - 1}
              onClick={() => onMoveDown?.(index)}
              title="Move Down"
              className="p-0.5 text-gray-400 hover:text-[#8B5CF6] disabled:opacity-20 disabled:hover:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </td>

      {/* Checkbox */}
      <td className="py-3.5 pl-2 pr-2 w-10">
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
            {book.badge && (
              <div className="absolute top-0.5 left-0 z-10 flex flex-col gap-0.5 pointer-events-none">
                {(book.badge === "SALE" || book.badge === "SALE_AND_HOT" || book.badge === "SALE_AND_NEW") && (
                  <span
                    className="bg-[#56ab84] text-white text-[6.5px] font-bold px-1 py-0.2 uppercase"
                    style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                  >
                    SALE
                  </span>
                )}
                {(book.badge === "HOT" || book.badge === "SALE_AND_HOT") && (
                  <span
                    className="bg-[#e05638] text-white text-[6.5px] font-bold px-1 py-0.2 uppercase"
                    style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                  >
                    HOT
                  </span>
                )}
                {(book.badge === "NEW" || book.badge === "SALE_AND_NEW") && (
                  <span
                    className="bg-[#df5a29] text-white text-[6.5px] font-bold px-1 py-0.2 uppercase"
                    style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                  >
                    NEW
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Title & Badge */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-[13.5px] font-bold admin-text-primary truncate leading-tight group-hover:text-[#8B5CF6] transition-colors">
                {book.title}
              </h4>
              {book.badge && (
                <div className="inline-flex items-center gap-1">
                  {(book.badge === "SALE" || book.badge === "SALE_AND_HOT" || book.badge === "SALE_AND_NEW") && (
                    <span
                      className="bg-[#56ab84] text-white text-[8px] font-bold px-1.5 py-0.2 uppercase tracking-wider"
                      style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                    >
                      SALE
                    </span>
                  )}
                  {(book.badge === "HOT" || book.badge === "SALE_AND_HOT") && (
                    <span
                      className="bg-[#e05638] text-white text-[8px] font-bold px-1.5 py-0.2 uppercase tracking-wider"
                      style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                    >
                      HOT
                    </span>
                  )}
                  {(book.badge === "NEW" || book.badge === "SALE_AND_NEW") && (
                    <span
                      className="bg-[#df5a29] text-white text-[8px] font-bold px-1.5 py-0.2 uppercase tracking-wider"
                      style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                    >
                      NEW
                    </span>
                  )}
                </div>
              )}
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

      {/* Actions (Quick Edit, Quick Delete, More Popover) */}
      <td className="py-3.5 pr-4 pl-2 text-right relative">
        <div className="inline-flex items-center justify-end gap-1">
          {/* Quick Edit */}
          <button
            type="button"
            onClick={() => onEdit(book)}
            title="Edit Book"
            aria-label="Edit Book"
            className="p-1.5 text-gray-400 hover:text-[#8B5CF6] dark:hover:text-[#A78BFA] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          {/* Quick Delete */}
          <button
            type="button"
            onClick={() => onDelete(book)}
            title="Delete Book"
            aria-label="Delete Book"
            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* More Actions Popover */}
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              aria-label="More book actions"
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
                <div
                  className={`absolute right-0 ${
                    openUpwards ? "bottom-full mb-1" : "top-full mt-1"
                  } w-40 admin-card rounded-xl shadow-2xl py-1.5 z-40 border border-gray-100 dark:border-gray-700/80 animate-in fade-in duration-100 text-left text-xs`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      onView(book);
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 admin-text-primary hover:bg-gray-50 dark:hover:bg-[#334155] cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span>View Details</span>
                  </button>
                  <a
                    href={`/product/${book.slug || book.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowMenu(false)}
                    className="w-full flex items-center gap-2 px-3.5 py-2 admin-text-primary hover:bg-gray-50 dark:hover:bg-[#334155] cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span>Live Store Page</span>
                  </a>
                  <button
                    type="button"
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
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      onDelete(book);
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    <span>Delete Book</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}
