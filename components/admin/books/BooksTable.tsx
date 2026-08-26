"use client";

import React from "react";
import BookRow, { BookItemData } from "./BookRow";
import BooksLoadingState from "./BooksLoadingState";
import BooksEmptyState from "./BooksEmptyState";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BooksTableProps {
  books: BookItemData[];
  isLoading: boolean;
  isFiltered: boolean;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onView: (book: BookItemData) => void;
  onEdit: (book: BookItemData) => void;
  onDelete: (book: BookItemData) => void;
  onAddNew: () => void;
  onResetFilters: () => void;
  page: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
}

export default function BooksTable({
  books,
  isLoading,
  isFiltered,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onView,
  onEdit,
  onDelete,
  onAddNew,
  onResetFilters,
  page,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}: BooksTableProps) {
  const allSelected = books.length > 0 && selectedIds.length === books.length;
  const startItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);

  return (
    <div className="admin-card rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden transition-colors">
      {/* Table Content Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-[11.5px] font-bold admin-text-secondary uppercase tracking-wider bg-gray-50/50 dark:bg-gray-800/30">
              <th className="py-3.5 pl-4 pr-2 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  aria-label="Select all books"
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-[#8B5CF6] focus:ring-[#8B5CF6] cursor-pointer"
                />
              </th>
              <th className="py-3.5 px-3">Book</th>
              <th className="py-3.5 px-3">Author</th>
              <th className="py-3.5 px-3">Category</th>
              <th className="py-3.5 px-3">Price</th>
              <th className="py-3.5 px-3">Stock</th>
              <th className="py-3.5 px-3">Status</th>
              <th className="py-3.5 pr-4 pl-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-[13px]">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="p-0">
                  <BooksLoadingState />
                </td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-0">
                  <BooksEmptyState
                    isFiltered={isFiltered}
                    onAddNew={onAddNew}
                    onResetFilters={onResetFilters}
                  />
                </td>
              </tr>
            ) : (
              books.map((b) => (
                <BookRow
                  key={b.id}
                  book={b}
                  isSelected={selectedIds.includes(b.id)}
                  onToggleSelect={onToggleSelect}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {!isLoading && totalCount > 0 && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs admin-text-secondary">
          <div>
            Showing <span className="font-semibold admin-text-primary">{startItem}</span> to{" "}
            <span className="font-semibold admin-text-primary">{endItem}</span> of{" "}
            <span className="font-semibold admin-text-primary">{totalCount}</span> results
          </div>

          {/* Page Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="p-2 admin-input-bg rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              // Simple pagination window
              if (
                p === 1 ||
                p === totalPages ||
                (p >= page - 1 && p <= page + 1)
              ) {
                const isActive = p === page;
                return (
                  <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`w-8 h-8 rounded-lg font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#8B5CF6] text-white shadow-sm"
                        : "admin-input-bg hover:opacity-90"
                    }`}
                  >
                    {p}
                  </button>
                );
              }
              if (p === page - 2 || p === page + 2) {
                return (
                  <span key={p} className="px-1 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              className="p-2 admin-input-bg rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
