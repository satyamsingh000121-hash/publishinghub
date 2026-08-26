"use client";

import React, { useState, useMemo } from "react";
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

// Catalog of 22 Books matching reference design
const ALL_SHOP_BOOKS: BookItem[] = [
  {
    id: "shop-1",
    title: "A Poem for Every Night",
    author: "By CHAI IAM, HOF NURGIN",
    price: "£22.00",
    numericPrice: 22.0,
    category: "Poetry",
    availability: "in-stock",
    image: "/images/Newest2.webp",
    description: "A magical collection of poems curated to inspire dreams, contemplation, and peaceful night thoughts.",
  },
  {
    id: "shop-2",
    title: "A Teaspoon of Earth and Sea",
    author: "By SAVANNA WALKER, SHIA UNG",
    price: "£18.00",
    numericPrice: 18.0,
    category: "Fiction",
    availability: "in-stock",
    image: "/images/shop1.jpg",
    description: "An evocative story of identity, longing, and storytelling spanning across seas and generations.",
  },
  {
    id: "shop-3",
    title: "All this has nothing to do with Me",
    author: "By BHUZUN NAHLAM, HOF NURGIN",
    price: "£20.00",
    numericPrice: 20.0,
    badge: "HOT",
    category: "Fiction",
    availability: "hot",
    image: "/images/shop2.jpg",
    description: "A witty, insightful exploration of modern life, detachments, and rediscovering inner purpose.",
  },
  {
    id: "shop-4",
    title: "Bulle & Pelle",
    author: "By SAVANNA WALKER",
    price: "£16.00",
    originalPrice: "£19.00",
    numericPrice: 16.0,
    badge: "SALE_AND_HOT",
    category: "Children's",
    availability: "on-sale",
    image: "/images/book_section7.webp",
    description: "A gripping narrative of resilience and courage against unexpected odds in a rapidly changing world.",
  },
  {
    id: "shop-5",
    title: "Bulle und Pelle",
    author: "By OSCAR OULLIÈRE",
    price: "£14.00",
    numericPrice: 14.0,
    badge: "SALE",
    category: "Children's",
    availability: "on-sale",
    image: "/images/Newest5.webp",
    description: "A delightful illustrated journey exploring childhood wonder, adventurous whimsy, and boundless joy.",
  },
  {
    id: "shop-6",
    title: "Creative Life",
    author: "By DORCAS CHENG-TOZUN",
    price: "£13.00",
    numericPrice: 13.0,
    badge: "HOT",
    category: "Non-fiction",
    availability: "hot",
    image: "/images/shop3.jpg",
    description: "Practical insights and soulful practices for sustaining creativity and purpose in demanding times.",
  },
  {
    id: "shop-7",
    title: "Dear Brain",
    author: "By NEDRA GLOVER TAWWAB",
    price: "£14.00",
    numericPrice: 14.0,
    category: "Non-fiction",
    availability: "in-stock",
    image: "/images/shop4.jpg",
    description: "An honest and empowering guide to understanding cognitive patterns and cultivating inner clarity.",
  },
  {
    id: "shop-8",
    slug: "enemy-jake-gyllenhaal",
    title: "Enemy — Jake Gyllenhaal",
    author: "By BRUCE SANG",
    price: "£18.00",
    numericPrice: 18.0,
    category: "Fiction",
    availability: "in-stock",
    image: "/images/book_section5.webp",
    description: "A powerful philosophical critique examining noise, contemplation, and modern distractions.",
  },
  {
    id: "shop-9",
    slug: "ghosts-afraid-of-the-dark",
    title: "Ghosts Around of the Dark",
    author: "By MESHO BUVAHR",
    price: "£16.00",
    numericPrice: 16.0,
    badge: "SALE",
    category: "Fiction",
    availability: "on-sale",
    image: "/images/shop8.jpg",
    description: "A heartwarming and courageous tale about embracing vulnerabilities and finding light in darkness.",
  },
  {
    id: "shop-10",
    slug: "henry-and-the-good-dog",
    title: "Henry & The Good Dog",
    author: "By MESHO BUVAHR",
    price: "£17.00",
    numericPrice: 17.0,
    badge: "SALE",
    category: "Children's",
    availability: "on-sale",
    image: "/images/Newest1.webp",
    description: "A beautifully told story of loyal companionship, ocean voyage adventures, and enduring friendship.",
  },
  {
    id: "shop-11",
    slug: "life-of-pi",
    title: "Life of Pi",
    author: "By YANN MARTEL",
    price: "£16.00",
    numericPrice: 16.0,
    badge: "HOT",
    category: "Fiction",
    availability: "hot",
    image: "/images/Newest4.webp",
    description: "The timeless epic of survival, spirituality, and wonder adrift on the vast Pacific ocean.",
  },
  {
    id: "shop-12",
    slug: "peter-and-the-wolf",
    title: "Peter and the Wolf",
    author: "By JOHN WALKER",
    price: "£18.00",
    originalPrice: "£40.00",
    numericPrice: 18.0,
    badge: "SALE",
    category: "Non-fiction",
    availability: "on-sale",
    image: "/images/book_section2.png",
    description: "A timeless symphonic and narrative tale of courage, nature, and adventure.",
  },
  {
    id: "shop-13",
    title: "Some Bodies is Not Broken",
    author: "By STEPHANIE FOO",
    price: "£14.00",
    numericPrice: 14.0,
    badge: "SALE",
    category: "Fiction",
    availability: "on-sale",
    image: "/images/Newest6.webp",
    description: "A deeply moving memoir about healing complex trauma and discovering resilience and wholeness.",
  },
  {
    id: "shop-14",
    title: "The Mind’s Mastery",
    author: "By MARCUS HATHAWAY",
    price: "£13.00",
    numericPrice: 13.0,
    category: "Fiction",
    availability: "in-stock",
    image: "/images/book_section4.webp",
    description: "Frameworks and mental models to master focus, emotional balance, and high-performance execution.",
  },
  {
    id: "shop-15",
    title: "The Carrot Plan",
    author: "By NOREEN HARRIS",
    price: "£15.00",
    numericPrice: 15.0,
    category: "Children's",
    availability: "in-stock",
    image: "/images/shop5.jpg",
    description: "A clever and charming fable about goal-setting, community collaboration, and sweet rewards.",
  },
  {
    id: "shop-16",
    title: "The D.A.R.K",
    author: "By MESHO BUVAHR",
    price: "£17.00",
    numericPrice: 17.0,
    category: "Fiction",
    availability: "in-stock",
    image: "/images/shop6.jpg",
    description: "Memoir of deep discovery exploring the boundaries of science, mystery, and human resilience.",
  },
  {
    id: "shop-17",
    slug: "the-journey-of-dreams",
    title: "The Journey of Dreams",
    author: "By BHUZUN NAHLAM, JOHN WALKER",
    price: "£12.00",
    numericPrice: 12.0,
    badge: "HOT",
    category: "Fiction",
    availability: "hot",
    image: "/images/Newest3.webp",
    description: "A poetic and inspiring fable about following destiny across mystical landscapes and unexpected friendships.",
  },
  {
    id: "shop-18",
    slug: "the-journey-of-visions-to-victory",
    title: "The Journey of Visions to Victory",
    author: "By SANTOSH KUMAR MISHRA",
    price: "£35.00",
    numericPrice: 35.0,
    category: "Fiction",
    availability: "in-stock",
    image: "/images/book_section1.png",
    description: "The definitive bestselling guide to turning ambitious dreams into triumphant realities and purposeful leadership.",
  },
  {
    id: "shop-19",
    slug: "the-night-ocean",
    title: "The Night Ocean",
    author: "By SERO GLAN, SI MODARSK",
    price: "£22.00",
    originalPrice: "£25.00",
    numericPrice: 22.0,
    badge: "SALE",
    category: "Children's",
    availability: "on-sale",
    image: "/images/book_section3.webp",
    description: "A mysterious, labyrinthine journey through identity, lost manuscripts, and atmospheric literary secrets.",
  },
  {
    id: "shop-20",
    slug: "the-summer-of-impossible-things",
    title: "The Summer of Impossible Things",
    author: "By CHAI IAM, HOF NURGIN",
    price: "£24.00",
    numericPrice: 24.0,
    category: "Fiction",
    availability: "in-stock",
    image: "/images/book_section8.webp",
    description: "If you could change the past, would you? A breathtaking journey through love, memory, and sacrifice.",
  },
  {
    id: "shop-21",
    slug: "trio-sarah-tolmie",
    title: "TRIO – Sarah Tolmie",
    author: "By CHAI IAM, SAVANNA WALKER",
    price: "£21.00",
    originalPrice: "£24.00",
    numericPrice: 21.0,
    badge: "SALE_AND_HOT",
    category: "Poetry",
    availability: "on-sale",
    image: "/images/shop9.jpg",
    description: "An evocative, lyrical collection exploring love, human forms, and spiritual endurance.",
  },
  {
    id: "shop-22",
    slug: "when-the-doves-disappeared",
    title: "When the Doves disappeared",
    author: "By HOF NURGIN",
    price: "£24.00",
    numericPrice: 24.0,
    category: "Poetry",
    availability: "in-stock",
    image: "/images/book_section6.webp",
    description: "A gripping, multi-generational saga of betrayal, resilience, and survival during turbulent eras.",
  },
];

const INITIAL_FILTERS: FilterState = {
  maxPrice: 40,
  categories: [],
  authors: [],
  availability: [],
  authorQuery: "",
};

const ITEMS_PER_PAGE = 12;

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters State
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [tempFilters, setTempFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Cart & Modals
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", title: "A Poem for Every Night", price: "£22.00", quantity: 1 },
    { id: "2", title: "Henry & The Good Dog", price: "£17.00", quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewBook, setQuickViewBook] = useState<BookItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Apply & Clear Filter Handlers
  const handleApplyFilters = () => {
    setAppliedFilters({ ...tempFilters });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setTempFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  // Compute Static Filter Counts based on catalog
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "Fiction": 9,
      "Children's": 7,
      "Poetry": 3,
      "Non-fiction": 3,
    };
    return counts;
  }, []);

  const authorCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "Savanna Walker": 4,
      "Hof Nurgin": 4,
      "Mesho Buvahr": 5,
      "Oscar Oullière": 2,
      "Bruce Sang": 2,
    };
    return counts;
  }, []);

  const availabilityCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "in-stock": 20,
      "on-sale": 6,
      "hot": 4,
    };
    return counts;
  }, []);

  // Filter books based on applied filters
  const filteredBooks = useMemo(() => {
    return ALL_SHOP_BOOKS.filter((book) => {
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
  }, [appliedFilters]);

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
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalResults);
  const currentBooks = sortedBooks.slice(startIndex, endIndex);

  const rangeText =
    totalResults === 0
      ? "Showing 0 results"
      : `Showing ${startIndex + 1}–${endIndex} of ${totalResults} results`;

  // Active filter badge count
  const activeFilterCount =
    (appliedFilters.maxPrice < 40 ? 1 : 0) +
    appliedFilters.categories.length +
    appliedFilters.authors.length +
    appliedFilters.availability.length;

  const handleAddToCart = (title: string, price: string = "£18.00") => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.title === title);
      if (existing) {
        return prev.map((item) =>
          item.title === title ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: Math.random().toString(), title, price, quantity: 1 }];
    });

    setToastMessage(`"${title}" added to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-white dark:bg-[#050807] text-[#18181b] dark:text-[#f2eee3] flex flex-col font-sans selection:bg-[#b89245] selection:text-white transition-colors duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e3527] text-white border border-[#2c7650] px-4 py-3 rounded-[2px] shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-semibold">
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
      <ShopHeader totalResults={ALL_SHOP_BOOKS.length} />

      {/* Main Content Area: Sidebar + Book Catalog */}
      <section className="py-10 sm:py-14 bg-white dark:bg-[#050807] flex-1 transition-colors duration-300">
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
                    onCloseMobile={() => setIsMobileFilterOpen(false)}
                  />
                </div>
              </div>
            )}

            {/* ================= RIGHT MAIN CATALOG ================= */}
            <div className="flex-1 w-full">
              
              {/* Filter Bar: Showing 1-12 of 22 results | Sort: Featured | Grid/List switcher */}
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
                  /* 2-Col Mobile / 3-Col Tablet / 4-Col Desktop Grid */
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12">
                    {currentBooks.map((book) => (
                      <ShopBookCard
                        key={book.id}
                        book={book}
                        viewMode="grid"
                        onAddToCart={handleAddToCart}
                        onQuickView={(b) => setQuickViewBook(b)}
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
                        onQuickView={(b) => setQuickViewBook(b)}
                      />
                    ))}
                  </div>
                )
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
