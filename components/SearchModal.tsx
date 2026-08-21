"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const popularSearches = [
    "Visions of Victory",
    "Fragments of War",
    "Santosh Kumar",
    "Historical Memoir",
    "Psychological Thriller",
    "Poetry Collections",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#09110d] border border-[#d4b56a]/40 shadow-2xl p-6 rounded-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#888b83] hover:text-[#f2eee3]"
          aria-label="Close Search"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative flex items-center border-b border-[#d4b56a]/50 pb-3">
          <Search className="w-5 h-5 text-[#d4b56a] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, category, ISBN..."
            autoFocus
            className="w-full bg-transparent text-sm text-[#f2eee3] placeholder-[#666a64] outline-none"
          />
        </div>

        <div className="mt-5">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#d4b56a] block mb-2">
            POPULAR SEARCHES
          </span>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((item) => (
              <button
                key={item}
                onClick={() => setQuery(item)}
                className="text-xs px-3 py-1.5 bg-[#0e1813] border border-[#f2eee3]/10 hover:border-[#d4b56a] text-[#888b83] hover:text-[#f2eee3] rounded-sm transition-colors"
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
