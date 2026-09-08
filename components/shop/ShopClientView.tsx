"use client";

import React, { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopFilterBar from "@/components/shop/ShopFilterBar";
import ShopSidebar, { FilterState } from "@/components/shop/ShopSidebar";
import ShopBookCard, { BookItem } from "@/components/shop/ShopBookCard";
import ShopPagination from "@/components/shop/ShopPagination";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import { Check, X } from "lucide-react";
import Link from "next/link";

interface ShopClientViewProps {
  initialBooks: BookItem[];
}

const ITEMS_PER_PAGE = 12;

export default function ShopClientView({ initialBooks }: ShopClientViewProps) {
  const [books, setBooks] = useState<BookItem[]>(initialBooks);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

  // Compute maximum price from books
  const maxPriceCeiling = useMemo(() => {
    if (!books || books.length === 0) return 500;
    const maxVal = Math.max(...books.map((b) => b.numericPrice || 0));
    return Math.max(100, Math.ceil(maxVal / 50) * 50);
  }, [books]);

  const initialFilterState: FilterState = useMemo(() => ({
    maxPrice: maxPriceCeiling,
    categories: [],
    authors: [],
    availability: [],
    authorQuery: "",
  }), [maxPriceCeiling]);

  // Filters State
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(initialFilterState);
  const [tempFilters, setTempFilters] = useState<FilterState>(initialFilterState);

  // Update maxPrice if maxPriceCeiling changes and user hasn't touched the filter
  useEffect(() => {
    setAppliedFilters((prev) => ({
      ...prev,
      maxPrice: Math.max(prev.maxPrice, maxPriceCeiling),
    }));
    setTempFilters((prev) => ({
      ...prev,
      maxPrice: Math.max(prev.maxPrice, maxPriceCeiling),
    }));
  }, [maxPriceCeiling]);

  // Client-side live sync with database (matches admin order and edits in real-time)
  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const res = await fetch("/api/products?limit=100");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            const dbMapped: BookItem[] = json.data.map((p: any) => ({
              id: p.id,
              slug: p.slug,
              title: p.title,
              author: p.author,
              price: p.price,
              numericPrice: p.numericPrice,
              originalPrice: p.originalPrice || undefined,
              category: p.category,
              availability: p.availability || (p.stock <= 0 ? "out-of-stock" : "in-stock"),
              image: p.image,
              badge: p.badge || undefined,
              description: p.summary || p.description || undefined,
              rating: p.rating || 4.5,
            }));

            // Exactly same order and data as Admin Panel
            setBooks(dbMapped);
          }
        }
      } catch {
        // use initialBooks
      }
    };

    fetchLatestBooks();
  }, []);

  // Cart & Modals
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("publishinghub_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch {}
  }, []);

  const updateCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    try {
      localStorage.setItem("publishinghub_cart", JSON.stringify(newItems));
    } catch {}
  };

  // Compute Dynamic Categories, Authors, and Counts from real database books
  const { availableCategories, availableAuthors, categoryCounts, authorCounts, availabilityCounts } = useMemo(() => {
    const catCounts: Record<string, number> = {};
    const authCounts: Record<string, number> = {};
    const availCounts: Record<string, number> = {
      "in-stock": 0,
      "on-sale": 0,
      "hot": 0,
    };

    books.forEach((b) => {
      if (b.category) {
        catCounts[b.category] = (catCounts[b.category] || 0) + 1;
      }
      if (b.author) {
        const cleanAuthor = b.author.replace(/^by\s+/i, "").trim();
        authCounts[cleanAuthor] = (authCounts[cleanAuthor] || 0) + 1;
      }
      if (b.availability) {
        availCounts[b.availability] = (availCounts[b.availability] || 0) + 1;
      }
    });

    return {
      availableCategories: Object.keys(catCounts),
      availableAuthors: Object.keys(authCounts),
      categoryCounts: catCounts,
      authorCounts: authCounts,
      availabilityCounts: availCounts,
    };
  }, [books]);

  // Apply & Clear Filter Handlers
  const handleApplyFilters = () => {
    setAppliedFilters({ ...tempFilters });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setTempFilters(initialFilterState);
    setAppliedFilters(initialFilterState);
    setCurrentPage(1);
  };

  // Filter books based on applied filters
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // 1. Price
      if (book.numericPrice > appliedFilters.maxPrice) {
        return false;
      }
      // 2. Category
      if (
        appliedFilters.categories.length > 0 &&
        (!book.category || !appliedFilters.categories.includes(book.category))
      ) {
        return false;
      }
      // 3. Author
      if (appliedFilters.authors.length > 0) {
        const matchesAuthor = appliedFilters.authors.some((a) =>
          book.author.toLowerCase().includes(a.toLowerCase())
        );
        if (!matchesAuthor) return false;
      }
      // 4. Availability
      if (appliedFilters.availability.length > 0) {
        if (!book.availability || !appliedFilters.availability.includes(book.availability)) {
          return false;
        }
      }
      return true;
    });
  }, [books, appliedFilters]);

  // Sort books
  const sortedBooks = useMemo(() => {
    const list = [...filteredBooks];
    if (sortBy === "price-low") {
      list.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (sortBy === "title-az") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "newest") {
      list.sort((a, b) => (b.badge === "NEW" ? 1 : 0) - (a.badge === "NEW" ? 1 : 0));
    }
    return list;
  }, [filteredBooks, sortBy]);

  // Pagination calculation
  const totalResults = sortedBooks.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE));

  // Reset currentPage if it exceeds totalPages (e.g. if previously on page 3)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalResults);
  const currentBooks = sortedBooks.slice(startIndex, endIndex);

  const rangeText =
    totalResults === 0
      ? "Showing 0 results"
      : `Showing ${startIndex + 1}–${endIndex} of ${totalResults} results`;

  // Active filter badge count
  const activeFilterCount =
    (appliedFilters.maxPrice < maxPriceCeiling ? 1 : 0) +
    appliedFilters.categories.length +
    appliedFilters.authors.length +
    appliedFilters.availability.length;

  const handleAddToCart = (
    title: string,
    price: string = "£18.00",
    id?: string,
    image?: string
  ) => {
    const targetId = id || `cart-${Date.now()}`;
    const targetImage = image || "/images/shop1.jpg";

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === targetId || item.title === title);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [
          ...prev,
          {
            id: targetId,
            title,
            price,
            quantity: 1,
            image: targetImage,
          },
        ];
      }
      try {
        localStorage.setItem("publishinghub_cart", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setToastMessage(`"${title}" added to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
    setIsCartOpen(true);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#fbfaf8] dark:bg-[#050807] text-[#18181b] dark:text-[#f2eee3] flex flex-col font-sans selection:bg-[#b89245] selection:text-white transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18181b] dark:bg-[#0d1c14] text-white border border-[#b89245] dark:border-[#d4b56a]/40 px-4 py-3 rounded-[2px] shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <Check className="w-4 h-4 text-[#d4b56a]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        activeTab="SHOP"
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Shop Title & Breadcrumbs */}
      <ShopHeader totalResults={books.length} />

      {/* Main Content Area: Sidebar + Book Catalog */}
      <section className="py-8 sm:py-12 bg-[#fbfaf8] dark:bg-[#050807] flex-1 transition-colors duration-200">
        <div className="container-custom">
          
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
            
            {/* ================= DESKTOP LEFT SIDEBAR ================= */}
            <div className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-24">
              <ShopSidebar
                filters={appliedFilters}
                tempFilters={tempFilters}
                setTempFilters={setTempFilters}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
                categoryCounts={categoryCounts}
                authorCounts={authorCounts}
                availabilityCounts={availabilityCounts}
                availableCategories={availableCategories}
                availableAuthors={availableAuthors}
                maxPriceLimit={maxPriceCeiling}
              />
            </div>

            {/* ================= MOBILE FILTER DRAWER ================= */}
            {isMobileFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden flex">
                <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
                  onClick={() => setIsMobileFilterOpen(false)}
                />
                <div className="relative ml-auto w-full max-w-xs bg-white dark:bg-[#09110d] h-full shadow-2xl p-6 overflow-y-auto z-10">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e5e7eb] dark:border-[#27272a]">
                    <h2 className="font-display text-xl font-medium text-[#1c1917] dark:text-[#f2eee3]">
                      Filters
                    </h2>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="p-1 text-[#78716c] hover:text-[#1c1917] dark:text-[#a1a1aa] dark:hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <ShopSidebar
                    filters={appliedFilters}
                    tempFilters={tempFilters}
                    setTempFilters={setTempFilters}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                    categoryCounts={categoryCounts}
                    authorCounts={authorCounts}
                    availabilityCounts={availabilityCounts}
                    availableCategories={availableCategories}
                    availableAuthors={availableAuthors}
                    maxPriceLimit={maxPriceCeiling}
                    onCloseMobile={() => setIsMobileFilterOpen(false)}
                  />
                </div>
              </div>
            )}

            {/* ================= RIGHT MAIN CATALOG ================= */}
            <div className="flex-1 w-full">
              
              {/* Filter Bar: Showing 1-12 of results | Sort: Featured | Grid/List switcher */}
              <ShopFilterBar
                currentRangeText={rangeText}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
                activeFilterCount={activeFilterCount}
              />

              {/* Books Content */}
              {currentBooks.length > 0 ? (
                viewMode === "grid" ? (
                  /* 2-Col Mobile / 3-Col Tablet / 4-Col Desktop Grid matching Image 1 */
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                    {currentBooks.map((book) => (
                      <ShopBookCard
                        key={book.id}
                        book={book}
                        viewMode="grid"
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                ) : (
                  /* List Mode */
                  <div className="space-y-5">
                    {currentBooks.map((book) => (
                      <ShopBookCard
                        key={book.id}
                        book={book}
                        viewMode="list"
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                )
              ) : books.length === 0 ? (
                /* Empty state when no books exist in DB yet */
                <div className="text-center py-20 bg-[#faf8f5] dark:bg-[#0c1310] border border-[#e5e7eb] dark:border-[#27272a] rounded-[2px] p-8">
                  <h3 className="font-display text-2xl text-[#1c1917] dark:text-[#f2eee3] mb-2">
                    No books available in the store yet
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78716c] dark:text-[#a1a1aa] mb-6">
                    Books added from the Admin Dashboard will appear here immediately.
                  </p>
                  <Link
                    href="/admin/books"
                    className="inline-block px-6 py-2.5 bg-[#18181b] hover:bg-[#b89245] text-white text-xs font-bold tracking-[0.14em] uppercase transition-colors rounded-[2px]"
                  >
                    Add Books in Admin
                  </Link>
                </div>
              ) : (
                /* Empty state when no books match filters */
                <div className="text-center py-20 bg-[#faf8f5] dark:bg-[#0c1310] border border-[#e5e7eb] dark:border-[#27272a] rounded-[2px] p-8">
                  <h3 className="font-display text-2xl text-[#1c1917] dark:text-[#f2eee3] mb-2">
                    No books match your selected filters
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78716c] dark:text-[#a1a1aa] mb-6">
                    Try adjusting the price range, category, or author selections.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-2.5 bg-[#1e3527] hover:bg-[#284936] text-white text-xs font-bold tracking-[0.14em] uppercase transition-colors rounded-[2px]"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

              {/* Pagination Navigation */}
              {totalPages > 1 && (
                <ShopPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Site Footer */}
      <Footer />

      {/* Interactive Cart & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </main>
  );
}
