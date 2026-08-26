import React from "react";
import Link from "next/link";

interface TopBookItem {
  id: string;
  title: string;
  author: string;
  image: string;
  unitsSold: number;
  revenue: number;
}

const defaultBooks: TopBookItem[] = [
  {
    id: "1",
    title: "Visions of Victory",
    author: "by Samantha Walker",
    image: "/images/book_section1.png",
    unitsSold: 342,
    revenue: 3420,
  },
  {
    id: "2",
    title: "The Journey of a Young Entrepreneur",
    author: "by Bruce Sang",
    image: "/images/book_section4.webp",
    unitsSold: 298,
    revenue: 2980,
  },
  {
    id: "3",
    title: "All This Has Nothing to Do with Me",
    author: "by Hof Nurgin",
    image: "/images/shop2.jpg",
    unitsSold: 267,
    revenue: 2670,
  },
  {
    id: "4",
    title: "Bulle & Pelle",
    author: "by Savanna Walker",
    image: "/images/shop7.webp",
    unitsSold: 214,
    revenue: 2140,
  },
];

export default function TopSellingBooks({ books }: { books?: TopBookItem[] }) {
  const displayList = books && books.length > 0 ? books : defaultBooks;

  return (
    <div className="admin-card rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-bold admin-text-primary">
          Top Selling Books
        </h3>
        <Link
          href="/shop"
          className="text-xs font-semibold text-[#8B5CF6] dark:text-[#A78BFA] hover:text-[#7C3AED] transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Books List */}
      <div className="space-y-3.5 my-auto">
        {displayList.slice(0, 4).map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Thumbnail */}
              <div className="w-10 h-13 rounded overflow-hidden shadow-sm flex-shrink-0 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Author */}
              <div className="min-w-0">
                <h4 className="text-[13px] font-bold admin-text-primary truncate leading-tight">
                  {book.title}
                </h4>
                <p className="text-[11.5px] admin-text-secondary truncate mt-0.5">
                  {book.author}
                </p>
              </div>
            </div>

            {/* Sales Stats */}
            <div className="flex items-center gap-5 text-right flex-shrink-0">
              <span className="text-[12px] admin-text-secondary whitespace-nowrap">
                {book.unitsSold} sold
              </span>
              <span className="text-[13px] font-bold admin-text-primary min-w-[52px] text-right">
                £{book.revenue.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
