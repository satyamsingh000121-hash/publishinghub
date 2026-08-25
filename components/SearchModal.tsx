"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, BookOpen, ArrowRight } from "lucide-react";
import { ALL_BOOKS_DATABASE, getBookSlug } from "@/lib/books";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const popularSearches = [
    "A Poem for Every Night",
    "A Teaspoon of Earth and Sea",
    "Henry & The Good Dog",
    "Life of Pi",
    "Visions of Victory",
    "The Summer of Impossible Things",
  ];

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return ALL_BOOKS_DATABASE.filter((book) => {
      return (
        book.title.toLowerCase().includes(q) ||
        (book.author && book.author.toLowerCase().includes(q)) ||
        (book.authorName && book.authorName.toLowerCase().includes(q)) ||
        (book.category && book.category.toLowerCase().includes(q)) ||
        (book.description && book.description.toLowerCase().includes(q))
      );
    }).slice(0, 6);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#09110d] border border-[#e9e1f5] dark:border-[#d4b56a]/40 shadow-2xl p-5 sm:p-6 rounded-[2px] text-[#18181b] dark:text-[#f2eee3] max-h-[85vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#71717a] hover:text-[#18181b] dark:text-[#888b83] dark:hover:text-[#f2eee3] cursor-pointer"
          aria-label="Close Search"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#9333ea]/30 dark:border-[#d4b56a]/50 pb-3">
          <Search className="w-5 h-5 text-[#9333ea] dark:text-[#d4b56a] mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by book title, author, category..."
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-[#18181b] dark:text-[#f2eee3] placeholder-[#a1a1aa] dark:placeholder-[#666a64] outline-none pr-8"
          />
        </div>

        {/* Live Search Results */}
        {query.trim().length > 0 && (
          <div className="mt-4 overflow-y-auto flex-1 max-h-[360px] divide-y divide-[#e9e1f5] dark:divide-[#f2eee3]/10">
            {searchResults.length > 0 ? (
              searchResults.map((book) => {
                const slug = getBookSlug(book);
                return (
                  <Link
                    key={book.id || slug}
                    href={`/product/${slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3.5 py-3 hover:bg-[#fbf7fe] dark:hover:bg-[#0f1d16] px-2 rounded-[2px] transition-colors group cursor-pointer"
                  >
                    <div className="w-11 h-14 bg-[#edebe4] dark:bg-[#121c17] rounded-[2px] overflow-hidden flex-shrink-0 border border-[#e5e7eb] dark:border-[#27272a] flex items-center justify-center">
                      {book.image ? (
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <BookOpen className="w-5 h-5 text-[#9333ea] dark:text-[#d4b56a]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm font-medium text-[#18181b] dark:text-[#f2eee3] group-hover:text-[#9333ea] dark:group-hover:text-[#d4b56a] truncate">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-[#71717a] dark:text-[#888b83] truncate">
                        {book.author}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#9333ea] dark:text-[#d4b56a]">
                        {book.price}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#a1a1aa] dark:text-[#888b83] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-[#71717a] dark:text-[#888b83]">
                No books found matching &ldquo;{query}&rdquo;. Try another title or author.
              </div>
            )}
          </div>
        )}

        {/* Popular Searches */}
        <div className="mt-5 pt-3 border-t border-[#e9e1f5] dark:border-[#f2eee3]/10">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#9333ea] dark:text-[#d4b56a] block mb-2.5">
            POPULAR SEARCHES
          </span>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((item) => (
              <button
                key={item}
                onClick={() => setQuery(item)}
                className="text-xs px-3 py-1.5 bg-[#f6f0fc] dark:bg-[#0e1813] border border-[#e9e1f5] dark:border-[#f2eee3]/10 hover:border-[#9333ea] dark:hover:border-[#d4b56a] text-[#581c87] dark:text-[#888b83] dark:hover:text-[#f2eee3] rounded-[2px] transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
