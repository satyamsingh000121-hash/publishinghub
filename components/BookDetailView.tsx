"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Globe,
  Youtube,
} from "lucide-react";
import BookCoverArt from "./BookCoverArt";
import BookOpenCard from "./BookOpenCard";
import bookStyles from "./BookOpenCard.module.css";

export interface BookDetailViewProps {
  onAddToCart?: (title: string, price?: string, quantity?: number) => void;
  onBack?: () => void;
}

export default function BookDetailView({ onAddToCart, onBack }: BookDetailViewProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [addedAlert, setAddedAlert] = useState<boolean>(false);

  // Author's other books (Matching exact reference image)
  const authorBooks = [
    {
      id: "auth-1",
      image: "/images/Newest2.webp",
      title: "A Poem for Every night",
      price: "£22.00",
    },
    {
      id: "auth-2",
      image: "/images/Newest4.webp",
      title: "Life of PI",
      price: "£12.00",
    },
    {
      id: "auth-3",
      image: "/images/shop2.jpg",
      title: "All this has nothing to do with Me",
      badge: "HOT",
      price: "£20.00",
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
    <div className="bg-white dark:bg-[#050807] text-[#18181b] dark:text-[#f2eee3] min-h-screen py-8 sm:py-14 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* ========================================================================= */}
        {/* TOP SECTION: 3D OPENING BOOK SHOWCASE (MATCHING USER SCREENSHOT)          */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center bg-white dark:bg-transparent py-4">
          
          {/* Left: 3D Animated Book Cover (Opens On Hover) */}
          <div className="md:col-span-5 flex justify-center">
            <div
              className={bookStyles.stage}
              tabIndex={0}
              role="region"
              aria-label="3D Animated Book Cover for A Poem for Every night"
            >
              {/* Soft Contact Shadow beneath book */}
              <div className={bookStyles.contactShadow} aria-hidden="true" />

              {/* 3D Book Assembly */}
              <div className={bookStyles.book}>
                {/* Book Body (Back Cover & Stacked Pages Layer) */}
                <div className={bookStyles.bookBody}>
                  {/* Stacked Pages Layer */}
                  <div className={bookStyles.pagesLayer}>
                    {/* Inside Page Content */}
                    <div className={bookStyles.pageContent}>
                      <div className="space-y-1 border-b border-[#e2d8c3] pb-1.5">
                        <span className="text-[7.5px] tracking-[0.22em] font-bold text-[#9333ea] dark:text-[#d4b56a] uppercase block">
                          POETRY
                        </span>
                        <h3 className="font-display text-xs font-semibold text-[#18181b] leading-tight">
                          A Poem for Every night
                        </h3>
                      </div>
                      <p className="font-display italic text-[8.5px] text-[#555] leading-relaxed line-clamp-6">
                        &ldquo;Be inspired, soothed and delighted by a poem for every night of the year, chosen by the award-winning poet and author Allie Esiri.&rdquo;
                      </p>
                      <div className="text-[7.5px] font-display text-[#888] pt-1 text-right border-t border-[#e2d8c3]/50">
                        Page 1 • The Publishing Hub
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3D Hinged Front Cover (Swings open on hover) */}
                <div className={bookStyles.cover}>
                  {/* Front Face: Book Artwork Image */}
                  <div className={bookStyles.frontFace}>
                    <div className={bookStyles.spineHighlight} aria-hidden="true" />
                    <img
                      src="/images/Newest2.webp"
                      alt="A Poem for Every night"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Back Face: Cream Inner Facing Page */}
                  <div className={bookStyles.backFace} aria-hidden="true">
                    <div className={bookStyles.innerPagePattern}>
                      <div className="text-center p-3">
                        <div className="w-8 h-[1px] bg-[#9333ea] dark:bg-[#d4b56a] mb-1.5 mx-auto opacity-50" />
                        <span className="font-display text-[8px] tracking-[0.2em] uppercase text-[#9333ea] dark:text-[#d4b56a] font-bold block">
                          Ex Libris
                        </span>
                        <div className="w-8 h-[1px] bg-[#9333ea] dark:bg-[#d4b56a] mt-1.5 mx-auto opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right: Book Details (Exact Match to Screenshot) */}
          <div className="md:col-span-7 space-y-5">
            {/* Category Tag */}
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#9333ea] dark:text-[#d4b56a] uppercase block">
              POETRY
            </span>

            {/* Book Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#18181b] dark:text-[#f2eee3] leading-tight">
              A Poem for Every night
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              <div className="flex text-[#9333ea] dark:text-[#d4b56a]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-[#71717a] dark:text-[#9d9f96] ml-1">
                ( 128 reviews )
              </span>
            </div>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-[#52525b] dark:text-[#babcb2] leading-relaxed max-w-xl">
              Be inspired, soothed and delighted by a poem for every night of the year, chosen by the award-winning poet and author Allie Esiri.
            </p>

            {/* Price & In Stock status */}
            <div className="flex items-center gap-4 pt-1">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-[#18181b] dark:text-[#f2eee3]">
                £22.00
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#16a34a] font-semibold bg-[#16a34a]/10 px-2.5 py-1 rounded-full border border-[#16a34a]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                In Stock
              </div>
            </div>

            {/* Quantity Selector + Add to Cart Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#e9e1f5] dark:border-[#d4b56a]/40 bg-[#faf5ff] dark:bg-[#0a120e] rounded-[2px] h-11 px-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-full flex items-center justify-center text-[#9333ea] dark:text-[#d4b56a] hover:opacity-80 transition-opacity"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-9 text-center font-display text-sm font-semibold text-[#18181b] dark:text-[#f2eee3]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-full flex items-center justify-center text-[#9333ea] dark:text-[#d4b56a] hover:opacity-80 transition-opacity"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Purple Add To Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] h-11 bg-[#9333ea] hover:bg-[#7e22ce] text-white text-xs font-extrabold tracking-[0.18em] uppercase flex items-center justify-center gap-2 rounded-[2px] transition-all shadow-lg hover:shadow-purple-500/25 active:scale-[0.99]"
              >
                <ShoppingCart className="w-4 h-4" /> ADD TO CART
              </button>
            </div>

            {addedAlert && (
              <div className="text-xs text-[#16a34a] flex items-center gap-1.5 font-medium animate-in fade-in">
                <Check className="w-4 h-4" /> Added {quantity} item(s) to your cart!
              </div>
            )}

            {/* Wishlist & Compare Links */}
            <div className="flex items-center gap-6 pt-3 text-xs text-[#71717a] dark:text-[#9d9f96] border-t border-[#e9e1f5] dark:border-[#f2eee3]/10">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex items-center gap-1.5 transition-colors ${
                  isWishlisted ? "text-[#9333ea] dark:text-[#d4b56a]" : "hover:text-[#18181b] dark:hover:text-[#f2eee3]"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current" : ""}`} />
                {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
              </button>
              <button className="flex items-center gap-1.5 hover:text-[#18181b] dark:hover:text-[#f2eee3] transition-colors">
                <ArrowLeftRight className="w-3.5 h-3.5" /> Add to Compare
              </button>
            </div>

            {/* Social Share Icons */}
            <div className="flex items-center gap-3 pt-2 text-xs text-[#71717a] dark:text-[#9d9f96]">
              <span>Share:</span>
              <button className="w-7 h-7 rounded-full bg-[#f4ecfa] dark:bg-[#0d1612] text-[#9333ea] dark:text-[#d4b56a] hover:bg-[#9333ea] hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-full bg-[#f4ecfa] dark:bg-[#0d1612] text-[#9333ea] dark:text-[#d4b56a] hover:bg-[#9333ea] hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-full bg-[#f4ecfa] dark:bg-[#0d1612] text-[#9333ea] dark:text-[#d4b56a] hover:bg-[#9333ea] hover:text-white flex items-center justify-center transition-colors">
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-full bg-[#f4ecfa] dark:bg-[#0d1612] text-[#9333ea] dark:text-[#d4b56a] hover:bg-[#9333ea] hover:text-white flex items-center justify-center transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 2: MEET THE AUTHOR (EXACT DESIGN MATCH)                           */}
        {/* ========================================================================= */}
        <section className="pt-8 sm:pt-12 space-y-8 sm:space-y-10 bg-white dark:bg-transparent">
          {/* Centered Heading */}
          <div className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl dark:text-[#f2eee3] text-[#2c3e50] font-normal tracking-tight">
              Meet The Author
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
            
            {/* Left: Author Profile (Portrait Photo + Name + Circular Social Icons) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                {/* Diagonal striped decorative accent pattern behind top-right of image */}
                <div
                  className="absolute -top-3 -right-4 w-20 h-40 opacity-20 dark:opacity-10 pointer-events-none -z-0"
                  style={{
                    backgroundImage: "repeating-linear-gradient(-45deg, #71717a 0, #71717a 1px, transparent 0, transparent 7px)",
                  }}
                />

                {/* Author Portrait Image */}
                <div className="w-48 sm:w-56 aspect-[4/5] relative z-10 overflow-hidden shadow-md">
                  <img
                    src="/images/testimonial-01.jpg"
                    alt="Hof Nurgin"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Author Name */}
              <h3 className="font-display text-2xl sm:text-3xl font-medium dark:text-[#f2eee3] text-[#2c3e50] mt-5">
                Hof Nurgin
              </h3>

              {/* 5 Circular Social Icons */}
              <div className="flex items-center gap-2.5 mt-4">
                <button
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full border dark:border-white/15 border-gray-300 dark:hover:border-[#d4b56a] hover:border-gray-600 dark:text-[#aaa] text-gray-500 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </button>
                <button
                  aria-label="Twitter"
                  className="w-8 h-8 rounded-full border dark:border-white/15 border-gray-300 dark:hover:border-[#d4b56a] hover:border-gray-600 dark:text-[#aaa] text-gray-500 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </button>
                <button
                  aria-label="Pinterest"
                  className="w-8 h-8 rounded-full border dark:border-white/15 border-gray-300 dark:hover:border-[#d4b56a] hover:border-gray-600 dark:text-[#aaa] text-gray-500 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors font-bold text-xs"
                >
                  P
                </button>
                <button
                  aria-label="Website"
                  className="w-8 h-8 rounded-full border dark:border-white/15 border-gray-300 dark:hover:border-[#d4b56a] hover:border-gray-600 dark:text-[#aaa] text-gray-500 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                </button>
                <button
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full border dark:border-white/15 border-gray-300 dark:hover:border-[#d4b56a] hover:border-gray-600 dark:text-[#aaa] text-gray-500 hover:text-black dark:hover:text-white flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Quote at top + 3 Standalone Large Books */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              {/* Quote */}
              <div className="text-center mb-8 px-2">
                <p className="font-display italic text-base sm:text-lg md:text-xl dark:text-[#d4b56a] text-[#4a5568] max-w-xl mx-auto leading-relaxed">
                  &ldquo;My books are marked down because most of them are marked with a on the edge by publishers.&rdquo;
                </p>
              </div>

              {/* 3 Books Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7 items-start">
                {authorBooks.map((b) => (
                  <div
                    key={b.id}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    {/* Standalone Book Cover (no card background) */}
                    <div className="relative w-full max-w-[210px] aspect-[3/4.4] overflow-hidden rounded-[2px] shadow-[0_12px_28px_rgba(0,0,0,0.18)] dark:shadow-[0_18px_35px_rgba(0,0,0,0.7)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] dark:group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.9)] transform group-hover:-translate-y-2 transition-all duration-300">
                      
                      {/* HOT Ribbon Banner on top-left of book cover */}
                      {b.badge && (
                        <span className="absolute top-0 left-0 z-20 bg-[#e05638] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm">
                          {b.badge}
                        </span>
                      )}

                      {/* Spine Gradient Overlay */}
                      <div className="absolute top-0 left-0 bottom-0 w-[6%] bg-gradient-to-r from-black/35 via-black/10 to-transparent z-10 pointer-events-none" />

                      <img
                        src={b.image}
                        alt={b.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Price on top of Title */}
                    <div className="mt-3.5 space-y-1">
                      <span className="text-xs sm:text-[13px] font-semibold text-[#b89245] dark:text-[#d4b56a] block">
                        {b.price}
                      </span>
                      <h4 className="font-display text-sm sm:text-[15px] dark:text-[#f2eee3] text-[#2c3e50] font-normal leading-snug group-hover:text-[#b89245] dark:group-hover:text-[#d4b56a] transition-colors">
                        {b.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 3: TABS (DESCRIPTION & REVIEWS)                                   */}
        {/* ========================================================================= */}
        <section className="space-y-6 bg-white dark:bg-transparent">
          <div className="flex justify-center items-center gap-8 border-b dark:border-[#f2eee3]/10 border-[#e9e1f5] pb-3">
            <button
              onClick={() => setActiveTab("description")}
              className={`font-display text-base sm:text-lg font-medium transition-colors relative pb-2 ${activeTab === "description" ? "dark:text-[#d4b56a] text-[#9333ea]" : "dark:text-[#777970] text-[#71717a] hover:opacity-80"
                }`}
            >
              Description
              {activeTab === "description" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] dark:bg-[#b89245] bg-[#9333ea]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`font-display text-base sm:text-lg font-medium transition-colors relative pb-2 ${activeTab === "reviews" ? "dark:text-[#d4b56a] text-[#9333ea]" : "dark:text-[#777970] text-[#71717a] hover:opacity-80"
                }`}
            >
              Reviews (128)
              {activeTab === "reviews" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] dark:bg-[#b89245] bg-[#9333ea]" />
              )}
            </button>
          </div>

          <div className="max-w-3xl mx-auto text-xs sm:text-sm dark:text-[#babcb2] text-[#52525b] leading-relaxed text-center space-y-4">
            {activeTab === "description" ? (
              <p>
                A beautiful collection of 365 poems – one for every night of the year. Featuring classic verses and contemporary favourites, this book offers inspiration, comfort, and delight for readers everywhere. Beautifully hardbound with foil embossed lettering and an archival bookmark ribbon.
              </p>
            ) : (
              <div className="space-y-3 text-left dark:bg-[#080d0a] bg-[#faf5ff] p-5 border dark:border-[#f2eee3]/10 border-[#e9e1f5] rounded-[2px]">
                <div className="flex items-center justify-between border-b dark:border-[#f2eee3]/10 border-[#e9e1f5] pb-2">
                  <span className="font-semibold dark:text-[#f2eee3] text-[#18181b]">Sophia Turner</span>
                  <div className="flex dark:text-[#d4b56a] text-[#9333ea]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs dark:text-[#9d9f96] text-[#71717a]">
                  &ldquo;An extraordinary bedside companion. Each poem brings peace and a wonderful end to a busy day.&rdquo;
                </p>
              </div>
            )}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 4: RELATED PRODUCTS                                               */}
        {/* ========================================================================= */}
        <section className="space-y-8 pt-10 border-t dark:border-[#f2eee3]/10 border-[#e9e1f5] bg-white dark:bg-transparent">
          <div className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-medium dark:text-[#d4b56a] text-[#9333ea]">
              Related products
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {relatedBooks.map((b) => (
              <div
                key={b.id}
                className="group dark:bg-[#080d0a] bg-white border dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:hover:border-[#d4b56a]/60 hover:border-[#9333ea] p-3 sm:p-3.5 flex flex-col justify-between rounded-[3px] transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative aspect-[3/4.2] w-full overflow-hidden dark:bg-[#0d1612] bg-[#fbf8fe] rounded-[2px] flex items-center justify-center shadow-inner">
                  {b.badge && (
                    <span
                      className={`absolute top-1.5 left-1.5 z-20 text-white text-[8px] font-extrabold uppercase px-1.5 py-0.5 shadow-sm rounded-[1px] ${b.badgeColor}`}
                    >
                      {b.badge}
                    </span>
                  )}
                  <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                    <BookCoverArt id={b.coverId} title={b.title} />
                  </div>
                </div>
                <div className="mt-3 text-center space-y-1">
                  <h4 className="font-display text-xs sm:text-sm dark:text-[#f2eee3] text-[#18181b] dark:group-hover:text-[#d4b56a] group-hover:text-[#9333ea] transition-colors line-clamp-1 font-medium">
                    {b.title}
                  </h4>
                  <div className="flex items-center justify-center gap-1.5 text-xs">
                    <span className="font-bold dark:text-[#d4b56a] text-[#9333ea]">
                      {b.price}
                    </span>
                    {b.oldPrice && (
                      <span className="dark:text-[#656861] text-[#a1a1aa] line-through text-[11px]">
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
            <span className="w-2 h-2 rounded-full dark:bg-[#d4b56a] bg-[#9333ea]" />
            <span className="w-2 h-2 rounded-full dark:bg-[#d4b56a]/30 bg-[#9333ea]/30" />
            <span className="w-2 h-2 rounded-full dark:bg-[#d4b56a]/30 bg-[#9333ea]/30" />
            <span className="w-2 h-2 rounded-full dark:bg-[#d4b56a]/30 bg-[#9333ea]/30" />
          </div>
        </section>

      </div>
    </div>
  );
}
