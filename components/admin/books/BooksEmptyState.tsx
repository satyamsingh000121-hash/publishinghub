import React from "react";
import { BookOpen, Plus } from "lucide-react";

interface BooksEmptyStateProps {
  onAddNew?: () => void;
  isFiltered?: boolean;
  onResetFilters?: () => void;
}

export default function BooksEmptyState({
  onAddNew,
  isFiltered = false,
  onResetFilters,
}: BooksEmptyStateProps) {
  return (
    <div className="py-16 px-6 text-center flex flex-col items-center justify-center">
      {/* Icon Circle */}
      <div className="w-16 h-16 rounded-full admin-pill-bg text-[#8B5CF6] dark:text-[#C4B5FD] flex items-center justify-center mb-4">
        <BookOpen className="w-8 h-8 stroke-[1.5]" />
      </div>

      <h3 className="text-lg font-bold admin-text-primary mb-1">
        {isFiltered ? "No matching books found" : "No books found"}
      </h3>

      <p className="text-xs admin-text-secondary max-w-sm mb-6">
        {isFiltered
          ? "Try adjusting your search criteria, category filters, or status to find what you're looking for."
          : "Your publishing catalog is currently empty. Add your first book to get started."}
      </p>

      <div className="flex items-center gap-3">
        {isFiltered && onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 text-xs font-semibold admin-card rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            Reset Filters
          </button>
        )}

        {onAddNew && (
          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Book</span>
          </button>
        )}
      </div>
    </div>
  );
}
