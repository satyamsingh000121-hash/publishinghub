import React from "react";

export default function BooksLoadingState() {
  return (
    <div className="divide-y divide-[#F1F0F5] dark:divide-[#334155]/40 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-11 h-15 bg-gray-200 dark:bg-gray-700 rounded shadow-sm flex-shrink-0" />
            <div className="space-y-2 flex-1 max-w-sm">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
            </div>
          </div>
          <div className="hidden md:block w-28">
            <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
          </div>
          <div className="hidden sm:block w-24">
            <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          </div>
          <div className="w-20 text-right">
            <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-full ml-auto" />
          </div>
          <div className="hidden lg:block w-20 text-center">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16 mx-auto" />
          </div>
          <div className="w-8">
            <div className="h-7 w-7 bg-gray-200 dark:bg-gray-700 rounded-lg ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}
