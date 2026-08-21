"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopFilterBar from "@/components/shop/ShopFilterBar";
import ShopBookCard, { BookItem } from "@/components/shop/ShopBookCard";
import ShopPagination from "@/components/shop/ShopPagination";
import QuickViewModal from "@/components/QuickViewModal";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import { Check } from "lucide-react";

// The 16 Books catalog from reference image
const SHOP_BOOKS_PAGE_1: BookItem[] = [
  {
    id: "shop-1",
    title: "A Poem For Every night",
    author: "by ALLIE ESIRI",
    price: "£22.00",
    numericPrice: 22.0,
    image: "/images/Newest2.webp",
    description: "A magical collection of poems curated to inspire dreams, contemplation, and peaceful night thoughts.",
  },
  {
    id: "shop-2",
    title: "A Teaspoon of Earth and Sea",
    author: "by DINA NAYERI",
    price: "£18.00",
    numericPrice: 18.0,
    image: "/images/shop1.jpg",
    description: "An evocative story of identity, longing, and storytelling spanning across seas and generations.",
  },
  {
    id: "shop-3",
    title: "All this has nothing to do with Me",
    author: "by SCARLETT SOLLACE",
    price: "£16.00",
    numericPrice: 16.0,
    badge: "NEW",
    image: "/images/shop2.jpg",
    description: "A witty, insightful exploration of modern life, detachments, and rediscovering inner purpose.",
  },
  {
    id: "shop-4",
    title: "Rule & a Mile",
    author: "by TARYN FISHER",
    price: "£21.00",
    numericPrice: 21.0,
    badge: "SALE_AND_NEW",
    image: "/images/book_section7.webp",
    description: "A gripping narrative of resilience and courage against unexpected odds in a rapidly changing world.",
  },
  {
    id: "shop-5",
    title: "Bubble and Ride",
    author: "by OSCAR OULLIÈRE",
    price: "£14.00",
    numericPrice: 14.0,
    badge: "SALE",
    image: "/images/Newest5.webp",
    description: "A delightful illustrated journey exploring childhood wonder, adventurous whimsy, and boundless joy.",
  },
  {
    id: "shop-6",
    title: "Creative Life",
    author: "by DORCAS CHENG-TOZUN",
    price: "£13.00",
    numericPrice: 13.0,
    badge: "NEW",
    image: "/images/shop3.jpg",
    description: "Practical insights and soulful practices for sustaining creativity and purpose in demanding times.",
  },
  {
    id: "shop-7",
    title: "Dear Brain",
    author: "by NEDRA GLOVER TAWWAB",
    price: "£14.00",
    numericPrice: 14.0,
    badge: "SALE",
    image: "/images/shop4.jpg",
    description: "An honest and empowering guide to understanding cognitive patterns and cultivating inner clarity.",
  },
  {
    id: "shop-8",
    title: "Enemy — of the Quietist",
    author: "by BRUCE SANG",
    price: "£18.00",
    numericPrice: 18.0,
    image: "/images/book_section5.webp",
    description: "A powerful philosophical critique examining noise, contemplation, and modern distractions.",
  },
  {
    id: "shop-9",
    title: "Ghosts Around of the Dark",
    author: "by LUPITA NYONG'O",
    price: "£16.00",
    numericPrice: 16.0,
    badge: "SALE",
    image: "/images/shop8.jpg",
    description: "A heartwarming and courageous tale about embracing vulnerabilities and finding light in darkness.",
  },
  {
    id: "shop-10",
    title: "Henry & The Good Dog",
    author: "by RODRIGO FOLGUERA",
    price: "£17.00",
    numericPrice: 17.0,
    badge: "SALE",
    image: "/images/Newest1.webp",
    description: "A beautifully told story of loyal companionship, ocean voyage adventures, and enduring friendship.",
  },
  {
    id: "shop-11",
    title: "Life of Pi",
    author: "by YANN MARTEL",
    price: "£16.00",
    numericPrice: 16.0,
    badge: "SALE",
    image: "/images/Newest4.webp",
    description: "The timeless epic of survival, spirituality, and wonder adrift on the vast Pacific ocean.",
  },
  {
    id: "shop-12",
    title: "Dreams of the War",
    author: "by SUN TZU",
    price: "£18.00",
    numericPrice: 18.0,
    badge: "SALE",
    image: "/images/book_section2.png",
    description: "Timeless strategic wisdom and historical reflections on conflict, harmony, and leadership.",
  },
  {
    id: "shop-13",
    title: "Some Bodies is Not Broken",
    author: "by STEPHANIE FOO",
    price: "£14.00",
    numericPrice: 14.0,
    badge: "SALE",
    image: "/images/Newest6.webp",
    description: "A deeply moving memoir about healing complex trauma and discovering resilience and wholeness.",
  },
  {
    id: "shop-14",
    title: "The Mind’s Mastery",
    author: "by MARCUS HATHAWAY",
    price: "£13.00",
    numericPrice: 13.0,
    image: "/images/book_section4.webp",
    description: "Frameworks and mental models to master focus, emotional balance, and high-performance execution.",
  },
  {
    id: "shop-15",
    title: "The Carrot Plan",
    author: "by NOREEN HARRIS",
    price: "£15.00",
    numericPrice: 15.0,
    image: "/images/shop5.jpg",
    description: "A clever and charming fable about goal-setting, community collaboration, and sweet rewards.",
  },
  {
    id: "shop-16",
    title: "The D.A.R.K",
    author: "by JONATHAN LITTLE",
    price: "£17.00",
    numericPrice: 17.0,
    image: "/images/shop6.jpg",
    description: "Memoir of deep discovery exploring the boundaries of science, mystery, and human resilience.",
  },
];

// Additional books for page 2 demonstration
const SHOP_BOOKS_PAGE_2: BookItem[] = [
  {
    id: "shop-17",
    title: "Visions of Victory",
    author: "by SANTOSH KUMAR",
    price: "£19.00",
    numericPrice: 19.0,
    badge: "NEW",
    image: "/images/Newest3.webp",
    description: "The bestselling guide to turning ambitious dreams into triumphant realities.",
  },
  {
    id: "shop-18",
    title: "Sam & Dave Dig a Hole",
    author: "by MAC BARNETT",
    price: "£14.00",
    numericPrice: 14.0,
    badge: "SALE",
    image: "/images/book_section1.png",
    description: "An amusing story about perspective, persistence, and unexpected treasures.",
  },
  {
    id: "shop-19",
    title: "Peter and the Wolf",
    author: "by SERGEI PROKOFIEV",
    price: "£16.00",
    numericPrice: 16.0,
    badge: "SALE",
    image: "/images/book_section3.webp",
    description: "The classic musical fairy tale brought alive with rich artwork and storytelling.",
  },
  {
    id: "shop-20",
    title: "The Night I Died",
    author: "by BRAYDEN COLLINS",
    price: "£20.00",
    numericPrice: 20.0,
    image: "/images/shop7.webp",
    description: "A gripping psychological mystery exploring truth, memories, and redemption.",
  },
   {
    id: "shop-20",
    title: "The Night I Died",
    author: "by BRAYDEN COLLINS",
    price: "£20.00",
    numericPrice: 20.0,
    image: "/images/shop9.jpg",
    description: "A gripping psychological mystery exploring truth, memories, and redemption.",
  },
   {
    id: "shop-20",
    title: "The Night I Died",
    author: "by BRAYDEN COLLINS",
    price: "£20.00",
    numericPrice: 20.0,
    image: "/images/book_section6.webp",
    description: "A gripping psychological mystery exploring truth, memories, and redemption.",
  },
];

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Pre-populating 2 sample items to match screenshot's badge "2"
    { id: "1", title: "A Poem For Every night", price: "£22.00", quantity: 1 },
    { id: "2", title: "Henry & The Good Dog", price: "£17.00", quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewBook, setQuickViewBook] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active items based on current page
  const rawBooks = currentPage === 1 ? SHOP_BOOKS_PAGE_1 : SHOP_BOOKS_PAGE_2;

  // Sorting
  const sortedBooks = useMemo(() => {
    const list = [...rawBooks];
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
  }, [rawBooks, sortBy]);

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
    <main className="min-h-screen bg-[#050807] text-[#f2eee3] flex flex-col font-sans selection:bg-[#b89245] selection:text-[#050807]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d2a1d] border border-[#d4b56a] text-[#f2eee3] px-4 py-3 rounded shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <Check className="w-4 h-4 text-[#d4b56a]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar with activeTab="SHOP" */}
      <Navbar
        cartCount={totalCartCount}
        activeTab="SHOP"
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Shop Title & Breadcrumbs */}
      <ShopHeader totalResults={27} />

      {/* Filter & View Switcher Bar */}
      <ShopFilterBar
        currentRangeText={
          currentPage === 1
            ? "Showing 1–16 of 27 results"
            : "Showing 17–20 of 27 results"
        }
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main Books Catalog */}
      <section className="py-12 sm:py-16 bg-[#050807] flex-1">
        <div className="container-custom">
          {viewMode === "grid" ? (
            /* 4 Columns x 4 Rows Grid matching reference design */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-14">
              {sortedBooks.map((book) => (
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
            <div className="space-y-6 max-w-4xl mx-auto">
              {sortedBooks.map((book) => (
                <ShopBookCard
                  key={book.id}
                  book={book}
                  viewMode="list"
                  onAddToCart={handleAddToCart}
                  onQuickView={(b) => setQuickViewBook(b)}
                />
              ))}
            </div>
          )}

          {/* Pagination Navigation */}
          <ShopPagination
            currentPage={currentPage}
            totalPages={2}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </section>

      {/* Site Footer */}
      <Footer />

      {/* Interactive Cart & Modals */}
      <QuickViewModal
        book={quickViewBook}
        onClose={() => setQuickViewBook(null)}
        onAddToCart={(title) => handleAddToCart(title)}
      />

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
