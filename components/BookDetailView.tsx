"use client";

import React, { useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeftRight,
  Facebook,
  Twitter,
  Mail,
  Share2,
  Instagram,
  Linkedin,
  Check,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import BookCoverArt from "./BookCoverArt";

export interface BookDetailViewProps {
  onAddToCart?: (title: string, price?: string, quantity?: number) => void;
  onBack?: () => void;
}

export default function BookDetailView({ onAddToCart, onBack }: BookDetailViewProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [addedAlert, setAddedAlert] = useState<boolean>(false);

  // Author's other books
  const authorBooks = [
    {
      id: "auth-1",
      coverId: "arrival-5",
      title: "Life of Pi",
      price: "£16.00",
    },
    {
      id: "auth-2",
      coverId: "bestseller-4",
      title: "All this has nothing to do with Me",
      badge: "HOT",
      badgeColor: "bg-[#d9482b]",
      price: "£16.00",
    },
    {
      id: "auth-3",
      coverId: "bestseller-3",
      title: "Ghosts of the Dark",
      badge: "SALE",
      badgeColor: "bg-[#2c7650]",
      price: "£16.00",
      oldPrice: "£20.00",
    },
    {
      id: "auth-4",
      coverId: "arrival-2",
      title: "Henry & the Good Dog",
      price: "£17.00",
    },
  ];

  // Related products
  const relatedBooks = [
    {
      id: "rel-1",
      coverId: "bestseller-4",
      title: "All this has nothing to do with Me",
      badge: "HOT",
      badgeColor: "bg-[#d9482b]",
      price: "£16.00",
    },
    {
      id: "rel-2",
      coverId: "arrival-5",
      title: "Life of Pi",
      price: "£16.00",
    },
    {
      id: "rel-3",
      coverId: "bestseller-2",
      title: "The Dark",
      price: "£17.00",
    },
    {
      id: "rel-4",
      coverId: "bestseller-5",
      title: "Enemy - of the Quietist",
      price: "£18.00",
    },
    {
      id: "rel-5",
      coverId: "bestseller-3",
      title: "Ghosts of the Dark",
      badge: "SALE",
      badgeColor: "bg-[#2c7650]",
      price: "£16.00",
      oldPrice: "£20.00",
    },
  ];

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart("A Poem for Every night", "£22.00", quantity);
    }
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 3000);
  };

  return (
    <div className="bg-[#050907] text-[#f2eee3] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* ========================================================================= */}
        {/* TOP SECTION: MAIN PRODUCT SHOWCASE (LEFT: BIG BOOK, RIGHT: DETAILS)      */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Large Main Book Cover */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[49/62] rounded-l-[3px] rounded-r-[6px] overflow-hidden shadow-2xl dark:shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-[#d4b56a]/30 bg-[#0d1612]">
              {/* Spine Highlight */}
              <div className="absolute top-0 left-0 bottom-0 w-[8%] bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10 pointer-events-none" />
              <img
                src="/images/Newest2.webp"
                alt="A Poem for Every night"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Book Details */}
          <div className="md:col-span-7 space-y-5">
            {/* Category / Genre Tag */}
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#d4b56a] uppercase block">
              POETRY
            </span>

            {/* Book Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#f2eee3] leading-tight">
              A Poem for Every night
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              <div className="flex text-[#d4b56a]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-[#9d9f96] ml-1">
                ( 128 reviews )
              </span>
            </div>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-[#babcb2] leading-relaxed max-w-xl">
              Be inspired, soothed and delighted by a poem for every night of the year, chosen by the award-winning poet and author Allie Esiri.
            </p>

            {/* Price & Stock status */}
            <div className="flex items-center gap-4 pt-1">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-[#f2eee3]">
                £22.00
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#2c7650] font-semibold bg-[#2c7650]/10 px-2.5 py-1 rounded-full border border-[#2c7650]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2c7650] animate-pulse" />
                In Stock
              </div>
            </div>

            {/* Quantity Selector + Add to Cart Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[#d4b56a]/40 bg-[#0a120e] rounded-[2px] h-11 px-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-full flex items-center justify-center text-[#d4b56a] hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-9 text-center font-display text-sm font-semibold text-[#f2eee3]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-full flex items-center justify-center text-[#d4b56a] hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add To Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] h-11 bg-[#2c7650] hover:bg-[#37865d] text-white text-xs font-extrabold tracking-[0.18em] uppercase flex items-center justify-center gap-2 rounded-[2px] transition-all shadow-lg hover:shadow-[#2c7650]/20"
              >
                <ShoppingCart className="w-4 h-4" /> ADD TO CART
              </button>
            </div>

            {addedAlert && (
              <div className="text-xs text-[#2c7650] flex items-center gap-1.5 font-medium animate-in fade-in">
                <Check className="w-4 h-4" /> Added {quantity} item(s) to your cart!
              </div>
            )}

            {/* Wishlist & Compare Links */}
            <div className="flex items-center gap-6 pt-3 text-xs text-[#9d9f96] border-t border-[#f2eee3]/10">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex items-center gap-1.5 transition-colors ${
                  isWishlisted ? "text-[#d4b56a]" : "hover:text-[#f2eee3]"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current" : ""}`} />
                {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
              </button>
              <button className="flex items-center gap-1.5 hover:text-[#f2eee3] transition-colors">
                <ArrowLeftRight className="w-3.5 h-3.5" /> Add to Compare
              </button>
            </div>

            {/* Share Icons */}
            <div className="flex items-center gap-3 pt-2 text-xs text-[#9d9f96]">
              <span className="text-[#656861]">Share:</span>
              <button className="w-7 h-7 rounded-full bg-[#0d1612] hover:bg-[#d4b56a] hover:text-black flex items-center justify-center transition-colors">
                <Facebook className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-full bg-[#0d1612] hover:bg-[#d4b56a] hover:text-black flex items-center justify-center transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-full bg-[#0d1612] hover:bg-[#d4b56a] hover:text-black flex items-center justify-center transition-colors">
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-full bg-[#0d1612] hover:bg-[#d4b56a] hover:text-black flex items-center justify-center transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 2: MEET THE AUTHOR                                                */}
        {/* ========================================================================= */}
        <section className="pt-6 border-t border-[#f2eee3]/10 space-y-8">
          <div className="text-center">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#d4b56a] font-medium tracking-tight">
              Meet The Author
            </h2>
            <p className="font-display italic text-xs sm:text-sm text-[#babcb2] max-w-xl mx-auto mt-2">
              &ldquo;My aim is to make classic poems accessible for new readers as well as old, in all their glory and brilliance.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Author Profile Card */}
            <div className="md:col-span-4 flex flex-col items-center text-center p-6 bg-[#080e0a] border border-[#d4b56a]/20 rounded-[2px]">
              <div className="w-36 h-36 rounded-md overflow-hidden border-2 border-[#d4b56a]/40 shadow-xl mb-4">
                <img
                  src="/images/testimonial-01.jpg"
                  alt="Allie Esiri"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl font-medium text-[#d4b56a]">
                Allie Esiri
              </h3>
              <p className="text-[11px] text-[#85877f] uppercase tracking-wider mt-1">
                Poet & Anthologist
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-4 text-[#d4b56a]">
                <button className="w-7 h-7 rounded-full bg-[#0f1b14] hover:bg-[#d4b56a] hover:text-black flex items-center justify-center transition-colors">
                  <Facebook className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 rounded-full bg-[#0f1b14] hover:bg-[#d4b56a] hover:text-black flex items-center justify-center transition-colors">
                  <Twitter className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 rounded-full bg-[#0f1b14] hover:bg-[#d4b56a] hover:text-black flex items-center justify-center transition-colors">
                  <Instagram className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 rounded-full bg-[#0f1b14] hover:bg-[#d4b56a] hover:text-black flex items-center justify-center transition-colors">
                  <Linkedin className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Author Books Grid */}
            <div className="md:col-span-8 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {authorBooks.map((b) => (
                  <div
                    key={b.id}
                    className="group bg-[#080d0a] border border-[#f2eee3]/10 hover:border-[#d4b56a]/50 p-2.5 flex flex-col justify-between rounded-[2px] transition-all"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0d1612] rounded-[2px] flex items-center justify-center">
                      {b.badge && (
                        <span
                          className={`absolute top-1.5 left-1.5 z-20 text-white text-[7.5px] font-extrabold uppercase px-1.5 py-0.5 shadow ${b.badgeColor}`}
                        >
                          {b.badge}
                        </span>
                      )}
                      <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-300">
                        <BookCoverArt id={b.coverId} title={b.title} />
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <h4 className="font-display text-xs text-[#f2eee3] group-hover:text-[#d4b56a] transition-colors line-clamp-1">
                        {b.title}
                      </h4>
                      <div className="flex items-center justify-center gap-1.5 text-[11px] mt-1">
                        <span className="font-semibold text-[#d4b56a]">
                          {b.price}
                        </span>
                        {b.oldPrice && (
                          <span className="text-[#656861] line-through text-[10px]">
                            {b.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Indicator Dots */}
              <div className="flex justify-center gap-2 pt-2">
                <span className="w-2 h-2 rounded-full bg-[#d4b56a]" />
                <span className="w-2 h-2 rounded-full bg-[#d4b56a]/30" />
                <span className="w-2 h-2 rounded-full bg-[#d4b56a]/30" />
              </div>
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 3: TABS (DESCRIPTION & REVIEWS)                                   */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex justify-center items-center gap-8 border-b border-[#f2eee3]/10 pb-3">
            <button
              onClick={() => setActiveTab("description")}
              className={`font-display text-base sm:text-lg font-medium transition-colors relative pb-2 ${
                activeTab === "description" ? "text-[#d4b56a]" : "text-[#777970] hover:text-[#d9d5ca]"
              }`}
            >
              Description
              {activeTab === "description" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b89245]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`font-display text-base sm:text-lg font-medium transition-colors relative pb-2 ${
                activeTab === "reviews" ? "text-[#d4b56a]" : "text-[#777970] hover:text-[#d9d5ca]"
              }`}
            >
              Reviews (128)
              {activeTab === "reviews" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b89245]" />
              )}
            </button>
          </div>

          <div className="max-w-3xl mx-auto text-xs sm:text-sm text-[#babcb2] leading-relaxed text-center space-y-4">
            {activeTab === "description" ? (
              <p>
                A beautiful collection of 365 poems – one for every night of the year. Featuring classic verses and contemporary favourites, this book offers inspiration, comfort, and delight for readers everywhere. Beautifully hardbound with foil embossed lettering and an archival bookmark ribbon.
              </p>
            ) : (
              <div className="space-y-3 text-left bg-[#080d0a] p-5 border border-[#f2eee3]/10 rounded-[2px]">
                <div className="flex items-center justify-between border-b border-[#f2eee3]/10 pb-2">
                  <span className="font-semibold text-[#f2eee3]">Sophia Turner</span>
                  <div className="flex text-[#d4b56a]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#9d9f96]">
                  &ldquo;An extraordinary bedside companion. Each poem brings peace and a wonderful end to a busy day.&rdquo;
                </p>
              </div>
            )}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 4: RELATED PRODUCTS                                               */}
        {/* ========================================================================= */}
        <section className="space-y-8 pt-6 border-t border-[#f2eee3]/10">
          <div className="text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#d4b56a]">
              Related products
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedBooks.map((b) => (
              <div
                key={b.id}
                className="group bg-[#080d0a] border border-[#f2eee3]/10 hover:border-[#d4b56a]/50 p-2.5 flex flex-col justify-between rounded-[2px] transition-all"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0d1612] rounded-[2px] flex items-center justify-center">
                  {b.badge && (
                    <span
                      className={`absolute top-1.5 left-1.5 z-20 text-white text-[7.5px] font-extrabold uppercase px-1.5 py-0.5 shadow ${b.badgeColor}`}
                    >
                      {b.badge}
                    </span>
                  )}
                  <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-300">
                    <BookCoverArt id={b.coverId} title={b.title} />
                  </div>
                </div>
                <div className="mt-2.5 text-center">
                  <h4 className="font-display text-xs text-[#f2eee3] group-hover:text-[#d4b56a] transition-colors line-clamp-1">
                    {b.title}
                  </h4>
                  <div className="flex items-center justify-center gap-1.5 text-[11px] mt-1">
                    <span className="font-semibold text-[#d4b56a]">
                      {b.price}
                    </span>
                    {b.oldPrice && (
                      <span className="text-[#656861] line-through text-[10px]">
                        {b.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex justify-center gap-2 pt-2">
            <span className="w-2 h-2 rounded-full bg-[#d4b56a]" />
            <span className="w-2 h-2 rounded-full bg-[#d4b56a]/30" />
            <span className="w-2 h-2 rounded-full bg-[#d4b56a]/30" />
            <span className="w-2 h-2 rounded-full bg-[#d4b56a]/30" />
          </div>
        </section>

      </div>
    </div>
  );
}
