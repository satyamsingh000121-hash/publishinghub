"use client";

import React from "react";
import BookRow, { BookItemData } from "./BookRow";
import BooksLoadingState from "./BooksLoadingState";
import BooksEmptyState from "./BooksEmptyState";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

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
  onBulkDelete?: (ids: string[]) => void;
  onAddNew: () => void;
  onResetFilters: () => void;
  page: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange?: (newSize: number) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
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
  onBulkDelete,
  onAddNew,
  onResetFilters,
  page,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onReorder,
}: BooksTableProps) {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    try {
      e.dataTransfer.setData("text/plain", `${index}`);
    } catch (err) {}
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onReorder?.(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      onReorder?.(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < books.length - 1) {
      onReorder?.(index, index + 1);
    }
  };
  const allSelected = books.length > 0 && selectedIds.length === books.length;
  const startItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);

  return (
    <div className="admin-card rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden transition-colors">
      {/* Bulk Selection Action Bar */}
      {selectedIds.length > 0 && (
        <div className="px-4 py-2.5 bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 border-b border-[#8B5CF6]/20 flex flex-wrap items-center justify-between gap-2 text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#8B5CF6] dark:text-[#C4B5FD]">
              {selectedIds.length} {selectedIds.length === 1 ? "book" : "books"} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onBulkDelete && (
              <button
                type="button"
                onClick={() => onBulkDelete(selectedIds)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected ({selectedIds.length})</span>
              </button>
            )}
            <button
              type="button"
              onClick={onSelectAll}
              className="px-2.5 py-1.5 admin-card rounded-lg font-medium hover:opacity-90 cursor-pointer"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Table Content Container */}
      <div className="overflow-x-auto min-h-[220px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-[11.5px] font-bold admin-text-secondary uppercase tracking-wider bg-gray-50/50 dark:bg-gray-800/30">
              <th className="py-3.5 pl-3 pr-1 w-16 text-center text-[10px] text-gray-400 font-semibold" title="Order / Move">
                #
              </th>
              <th className="py-3.5 pl-2 pr-2 w-10">
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
              <th className="py-3.5 pr-4 pl-2 text-right min-w-[110px]">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-[13px]">
            {isLoading ? (
              <tr>
                <td colSpan={9} className="p-0">
                  <BooksLoadingState />
                </td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-0">
                  <BooksEmptyState
                    isFiltered={isFiltered}
                    onAddNew={onAddNew}
                    onResetFilters={onResetFilters}
                  />
                </td>
              </tr>
            ) : (
              books.map((b, index) => (
                <BookRow
                  key={b.id}
                  book={b}
                  index={index}
                  totalBooks={books.length}
                  displayNumber={(page - 1) * (pageSize >= 1000 ? 0 : pageSize) + index + 1}
                  isSelected={selectedIds.includes(b.id)}
                  onToggleSelect={onToggleSelect}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                  onDrop={handleDrop}
                  isDragging={draggedIndex === index}
                  isDragOver={dragOverIndex === index && draggedIndex !== index}
                  openUpwards={books.length <= 3 ? index > 0 : index >= books.length - 2}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {!isLoading && totalCount > 0 && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs admin-text-secondary">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              Showing <span className="font-semibold admin-text-primary">{startItem}</span> to{" "}
              <span className="font-semibold admin-text-primary">{endItem}</span> of{" "}
              <span className="font-semibold admin-text-primary">{totalCount}</span> results
            </div>

            {/* Rows Per Page Selector with "All" option */}
            {onPageSizeChange && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gray-400">Show:</span>
                <div className="inline-flex rounded-lg p-0.5 admin-input-bg border border-gray-200/60 dark:border-gray-700/60">
                  {[10, 25, 50, 1000].map((size) => {
                    const isSelected = size === 1000 ? pageSize >= 1000 : pageSize === size;
                    const label = size === 1000 ? "All" : size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => onPageSizeChange(size)}
                        className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#8B5CF6] text-white shadow-xs"
                            : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Page Buttons (Hidden if showing All or only 1 page) */}
          {totalPages > 1 && pageSize < 1000 && (
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
          )}
        </div>
      )}
    </div>
  );
}
