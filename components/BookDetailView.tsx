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
  Search,
} from "lucide-react";
import BookCoverArt from "./BookCoverArt";
import BookOpenCard from "./BookOpenCard";
import bookStyles from "./BookOpenCard.module.css";
import { getBookSlug } from "@/lib/books";
import type { BookDetailData, AuthorBook, RelatedBook } from "@/lib/books";

export type { BookDetailData, AuthorBook, RelatedBook };

export interface BookDetailViewProps {
  book?: BookDetailData;
  onAddToCart?: (title: string, price?: string, quantity?: number) => void;
  onBack?: () => void;
}

export default function BookDetailView({ book, onAddToCart, onBack }: BookDetailViewProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [addedAlert, setAddedAlert] = useState<boolean>(false);
  const [authorSlide, setAuthorSlide] = useState<number>(0);
  const [relatedSlide, setRelatedSlide] = useState<number>(0);

  // Author's other books (Matching exact reference image 2)
  const authorBooks: AuthorBook[] = [
    {
      id: "auth-1",
      image: "/images/book_section1.png",
      title: "Sam & Dave dig a Hole",
      author: "By MAC BARNETT",
      price: "£14.00",
      oldPrice: "£18.00",
      badge: "SALE",
      slug: "sam-and-dave-dig-a-hole",
    },
    {
      id: "auth-2",
      image: "/images/book_section4.webp",
      title: "The Assault",
      author: "By Harry Mulisch",
      price: "£19.00",
      slug: "the-assault",
    },
  ];

  // Related products (Matching exact reference image)
  const relatedBooks: RelatedBook[] = [
    {
      id: "rel-1",
      image: "/images/Newest1.webp",
      title: "Henry & The Good Dog",
      author: "By MESHO BUVAHR, SAVANNA WALKER",
      price: "£22.00",
      oldPrice: "£25.00",
      originalPrice: "£25.00",
      badge: "SALE",
      badgeType: "sale",
      slug: "henry-and-the-good-dog",
    },
    {
      id: "rel-2",
      image: "/images/shop2.jpg",
      title: "All this has nothing to do with Me",
      author: "By BHUZUN NAHLAM, HOF NURGIN",
      price: "£20.00",
      badge: "HOT",
      badgeType: "hot",
      slug: "all-this-has-nothing-to-do-with-me",
    },
    {
      id: "rel-3",
      image: "/images/book_section3.webp",
      title: "The Night Ocean",
      author: "By SERO GLAN, SI MODARSK",
      price: "£22.00",
      oldPrice: "£25.00",
      originalPrice: "£25.00",
      badge: "SALE",
      badgeType: "sale",
      slug: "the-night-ocean",
    },
    {
      id: "rel-4",
      image: "/images/shop4.jpg",
      title: "Dear Brain",
      author: "By MESHO BUVAHR, TE SORKAZ",
      price: "£18.00",
      oldPrice: "£21.00",
      originalPrice: "£21.00",
      badge: "SALE",
      badgeType: "sale",
      slug: "dear-brain",
    },
  ];

  const currentTitle = book?.title || "The Night Ocean";
  const currentCategory = book?.category || "CHILDREN'S";
  const currentPrice = book?.price || "£16.00";
  const currentImage = book?.image || "/images/book_section3.webp";
  const currentSummary =
    book?.summary ||
    "The classic musical fairy tale brought alive with rich, dramatic artwork and enchanting prose.";
  const currentDescription =
    book?.description ||
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.";
  const currentAuthorName = book?.authorName || "Si Modarsk";
  const currentAuthorImage = book?.authorImage || "/images/author-02.jpg";
  const currentAuthorQuote =
    book?.authorQuote ||
    "“My books are marked down because most of them are marked with a on the edge by publishers.”";
  const authorBooksList = book?.authorBooks || authorBooks;
  const relatedBooksList = book?.relatedBooks || relatedBooks;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(currentTitle, currentPrice, quantity);
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
                          {currentCategory}
                        </span>
                        <h3 className="font-display text-xs font-semibold text-[#18181b] leading-tight">
                          {currentTitle}
                        </h3>
                      </div>
                      <p className="font-display italic text-[8.5px] text-[#555] leading-relaxed line-clamp-6">
                        &ldquo;{currentSummary}&rdquo;
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
                    {/* Ribbon Badges on main book cover */}
                    {book?.badge && (
                      <div className="absolute top-0 left-0 z-30 flex flex-col gap-1 pointer-events-none">
                        {(book.badge === "SALE" || book.badge === "SALE_AND_HOT" || book.badge === "SALE_AND_NEW") && (
                          <span
                            className="bg-[#56ab84] text-white text-[9.5px] font-bold px-2.5 pt-0.5 pb-1 uppercase tracking-wider shadow-sm flex items-center justify-center"
                            style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                          >
                            SALE
                          </span>
                        )}
                        {(book.badge === "HOT" || book.badge === "SALE_AND_HOT") && (
                          <span
                            className="bg-[#e05638] text-white text-[9.5px] font-bold px-2.5 pt-0.5 pb-1 uppercase tracking-wider shadow-sm flex items-center justify-center"
                            style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                          >
                            HOT
                          </span>
                        )}
                      </div>
                    )}
                    <div className={bookStyles.spineHighlight} aria-hidden="true" />
                    <img
                      src={currentImage}
                      alt={currentTitle}
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
              {currentCategory}
            </span>

            {/* Book Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#18181b] dark:text-[#f2eee3] leading-tight">
              {currentTitle}
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
              {currentSummary}
            </p>

            {/* Price & In Stock status */}
            <div className="flex items-center gap-4 pt-1">
              {book?.originalPrice && (
                <span className="font-display text-lg sm:text-xl text-[#999] line-through font-normal">
                  {book.originalPrice}
                </span>
              )}
              <span className="font-display text-2xl sm:text-3xl font-semibold text-[#18181b] dark:text-[#f2eee3]">
                {currentPrice}
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
        <section className="bg-[#faf8f5] dark:bg-[#080e0b] border border-[#eee7db] dark:border-[#16241c] py-10 sm:py-14 px-6 sm:px-10 rounded-[2px] space-y-8 sm:space-y-10">
          {/* Centered Heading */}
          <div className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl dark:text-[#f2eee3] text-[#1c1917] font-normal tracking-tight">
              Meet The Author
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
            
            {/* Left: Author Profile (Portrait Photo + Name + Circular Social Icons) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                {/* Diagonal striped decorative accent pattern behind top-right of image */}
                <div
                  className="absolute -top-3 -right-3 w-16 h-36 opacity-30 dark:opacity-20 pointer-events-none -z-0"
                  style={{
                    backgroundImage: "repeating-linear-gradient(-45deg, #71717a 0, #71717a 1.5px, transparent 0, transparent 6px)",
                  }}
                />

                {/* Author Portrait Image */}
                <div className="w-44 sm:w-52 aspect-[3.8/5] relative z-10 overflow-hidden shadow-md rounded-[1px]">
                  <img
                    src={currentAuthorImage}
                    alt={currentAuthorName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Author Name */}
              <h3 className="font-display text-2xl sm:text-3xl font-medium dark:text-[#f2eee3] text-[#1c1917] mt-5">
                {currentAuthorName}
              </h3>

              {/* 5 Circular Social Icons */}
              <div className="flex items-center gap-2 mt-4 text-gray-500 dark:text-[#a1a1aa]">
                <button
                  aria-label="Facebook"
                  className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white hover:text-black dark:hover:text-white flex items-center justify-center transition-colors text-xs"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </button>
                <button
                  aria-label="Twitter"
                  className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white hover:text-black dark:hover:text-white flex items-center justify-center transition-colors text-xs"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </button>
                <button
                  aria-label="Pinterest"
                  className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white hover:text-black dark:hover:text-white flex items-center justify-center transition-colors font-bold text-[11px]"
                >
                  P
                </button>
                <button
                  aria-label="Instagram"
                  className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white hover:text-black dark:hover:text-white flex items-center justify-center transition-colors text-xs"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </button>
                <button
                  aria-label="LinkedIn"
                  className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white hover:text-black dark:hover:text-white flex items-center justify-center transition-colors text-xs"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Quote at top + Standalone Large Books */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              {/* Quote */}
              <div className="text-center mb-8 px-2">
                <p className="font-display italic text-sm sm:text-base md:text-lg dark:text-[#d4d1c9] text-[#4b5563] max-w-xl mx-auto leading-relaxed">
                  &ldquo;{currentAuthorQuote}&rdquo;
                </p>
              </div>

              <div
                className={`items-start min-h-[340px] ${
                  authorBooksList.length <= 2
                    ? "flex justify-center gap-8 sm:gap-12 flex-wrap"
                    : "grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7"
                }`}
              >
                {authorBooksList.slice(authorSlide * 3, (authorSlide + 1) * 3).map((b) => {
                  const targetSlug = b.slug || getBookSlug(b);
                  return (
                    <Link
                      key={b.id}
                      href={`/product/${targetSlug}`}
                      className="flex flex-col items-center text-center group cursor-pointer animate-in fade-in duration-300"
                    >
                      {/* Standalone Book Cover (no card background) */}
                      <div className="relative w-full max-w-[200px] aspect-[3/4.4] overflow-hidden rounded-[2px] shadow-[0_8px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_30px_rgba(0,0,0,0.6)] group-hover:shadow-[0_16px_32px_rgba(0,0,0,0.22)] dark:group-hover:shadow-[0_22px_45px_rgba(0,0,0,0.85)] transform group-hover:-translate-y-1.5 transition-all duration-300">
                        
                        {/* Ribbon Badges on top-left of book cover */}
                        {b.badge && (
                          <div className="absolute top-0 left-0 z-20 flex flex-col gap-1 pointer-events-none">
                            {(b.badge === "SALE" || b.badge === "SALE_AND_HOT") && (
                              <span
                                className="bg-[#56ab84] text-white text-[9px] font-bold px-2 pt-0.5 pb-0.5 uppercase tracking-wider shadow-sm flex items-center justify-center"
                                style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                              >
                                SALE
                              </span>
                            )}
                            {(b.badge === "HOT" || b.badge === "SALE_AND_HOT") && (
                              <span
                                className="bg-[#e05638] text-white text-[9px] font-bold px-2 pt-0.5 pb-0.5 uppercase tracking-wider shadow-sm flex items-center justify-center"
                                style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                              >
                                HOT
                              </span>
                            )}
                          </div>
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
                        <div className="flex items-center justify-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#b89245] dark:text-[#d4b56a]">
                          {b.oldPrice && (
                            <span className="text-[#a1a1aa] dark:text-[#71717a] line-through font-normal text-xs">
                              {b.oldPrice}
                            </span>
                          )}
                          <span>{b.price}</span>
                        </div>
                        <h4 className="font-display text-sm sm:text-[15px] dark:text-[#f2eee3] text-[#1c1917] font-normal leading-snug group-hover:text-[#b89245] dark:group-hover:text-[#d4b56a] transition-colors">
                          {b.title}
                        </h4>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Author Carousel Arrows / Pagination */}
              {authorBooksList.length <= 2 ? (
                <div className="flex justify-center items-center gap-2 pt-6">
                  <button
                    aria-label="Previous"
                    className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                  >
                    &lt;
                  </button>
                  <button
                    aria-label="Next"
                    className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                  >
                    &gt;
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 pt-6">
                  <div className="flex justify-center items-center gap-2">
                    {Array.from({ length: Math.ceil(authorBooksList.length / 3) }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAuthorSlide(idx)}
                        aria-label={`Author Slide ${idx + 1}`}
                        className={`cursor-pointer transition-all duration-300 ${
                          authorSlide === idx
                            ? "w-2.5 h-2.5 rounded-full border-2 border-[#d95338] bg-transparent"
                            : "w-2 h-2 rounded-full bg-[#cbd5e1] dark:bg-[#4a5568] hover:bg-[#94a3b8]"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => setAuthorSlide((prev) => (prev > 0 ? prev - 1 : 0))}
                      aria-label="Previous"
                      className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={() => setAuthorSlide((prev) => (prev + 1 < Math.ceil(authorBooksList.length / 3) ? prev + 1 : prev))}
                      aria-label="Next"
                      className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 3: TABS (DESCRIPTION & REVIEWS)                                   */}
        {/* ========================================================================= */}
        <section className="space-y-8 max-w-4xl mx-auto pt-6">
          {/* Tab Selection */}
          <div className="flex items-center justify-center gap-12 border-b dark:border-[#f2eee3]/10 border-gray-200">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-4 text-base font-display transition-all relative ${
                activeTab === "description"
                  ? "text-[#18181b] dark:text-[#f2eee3] font-bold border-b-2 border-[#d95338]"
                  : "text-[#71717a] dark:text-[#9d9f96] hover:text-[#18181b] dark:hover:text-[#f2eee3]"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 text-base font-display transition-all relative ${
                activeTab === "reviews"
                  ? "text-[#18181b] dark:text-[#f2eee3] font-bold border-b-2 border-[#d95338]"
                  : "text-[#71717a] dark:text-[#9d9f96] hover:text-[#18181b] dark:hover:text-[#f2eee3]"
              }`}
            >
              Reviews (0)
            </button>
          </div>

          {/* Tab Contents */}
          <div className="py-4 text-center">
            {activeTab === "description" ? (
              <p className="text-xs sm:text-[13px] leading-relaxed dark:text-[#9d9f96] text-[#71717a] max-w-3xl mx-auto">
                {currentDescription}
              </p>
            ) : (
              <div className="py-6 text-center text-xs text-gray-500 dark:text-gray-400">
                There are no reviews yet for this book.
              </div>
            )}
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 4: RELATED PRODUCTS (MATCHING REFERENCE CAROUSEL)                 */}
        {/* ========================================================================= */}
        <section className="space-y-10 sm:space-y-14 pt-10 pb-8 sm:pt-16 sm:pb-14 border-t dark:border-[#f2eee3]/10 border-[#e9e1f5]">
          {/* Centered Section Heading */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal dark:text-[#f2eee3] text-[#1c1917] tracking-tight">
              Related products
            </h2>
          </div>

          {/* Book Grid Showcase per Slide */}
          <div
            className={`items-start min-h-[380px] ${
              relatedBooksList.length <= 2
                ? "flex justify-center gap-8 sm:gap-12 flex-wrap max-w-3xl mx-auto"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 max-w-6xl mx-auto"
            }`}
          >
            {relatedBooksList.slice(relatedSlide * 4, (relatedSlide + 1) * 4).map((b) => {
              const targetSlug = b.slug || getBookSlug(b);
              return (
                <Link
                  key={b.id}
                  href={`/product/${targetSlug}`}
                  className="group flex flex-col items-center text-center cursor-pointer animate-in fade-in duration-300"
                >
                  {/* Standalone Book Cover (No Card Box) */}
                  <div className="relative w-full max-w-[240px] aspect-[3/4.3] overflow-hidden rounded-[2px] shadow-[0_10px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_16px_35px_rgba(0,0,0,0.7)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] dark:group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.9)] transform group-hover:-translate-y-2 transition-all duration-300">
                    
                    {/* Top Ribbon Badges */}
                    {b.badge && (
                      <div className="absolute top-0 left-0 z-20 flex flex-col gap-1 pointer-events-none">
                        {(b.badge === "SALE" || b.badge === "SALE_AND_HOT" || (b.badgeType === "sale" && b.badge !== "HOT")) && (
                          <span
                            className="bg-[#56ab84] text-white text-[9px] font-bold px-2.5 pt-0.5 pb-1 uppercase tracking-wider shadow-sm flex items-center justify-center"
                            style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                          >
                            SALE
                          </span>
                        )}
                        {(b.badge === "HOT" || b.badge === "SALE_AND_HOT" || (b.badgeType === "hot" && b.badge !== "SALE")) && (
                          <span
                            className="bg-[#e05638] text-white text-[9px] font-bold px-2.5 pt-0.5 pb-1 uppercase tracking-wider shadow-sm flex items-center justify-center"
                            style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                          >
                            HOT
                          </span>
                        )}
                      </div>
                    )}

                    {/* Spine Shadow Gradient Overlay */}
                    <div className="absolute top-0 left-0 bottom-0 w-[6%] bg-gradient-to-r from-black/35 via-black/10 to-transparent z-10 pointer-events-none" />

                    {/* Book Image */}
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Hover Floating Action Buttons (Cart & Search) */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (onAddToCart) onAddToCart(b.title, b.price, 1);
                          setAddedAlert(true);
                          setTimeout(() => setAddedAlert(false), 3000);
                        }}
                        aria-label="Add to cart"
                        title="Add to cart"
                        className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      <span
                        className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                        aria-label="View book"
                        title="View book"
                      >
                        <Search className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Information Block Below Book Cover */}
                  <div className="mt-4 space-y-1">
                    {/* Price on Top */}
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px]">
                      {b.oldPrice && (
                        <span className="text-[#a1a1aa] dark:text-[#71717a] line-through font-normal">
                          {b.oldPrice}
                        </span>
                      )}
                      <span className="font-semibold text-[#b89245] dark:text-[#d4b56a]">
                        {b.price}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-display text-base sm:text-[17px] dark:text-[#f2eee3] text-[#2c3e50] font-normal leading-snug group-hover:text-[#b89245] dark:group-hover:text-[#d4b56a] transition-colors">
                      {b.title}
                    </h4>

                    {/* Author */}
                    <p className="text-[10.5px] uppercase tracking-wider text-[#71717a] dark:text-[#9d9f96] font-medium">
                      {b.author}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Carousel Pagination Dots */}
          {Math.ceil(relatedBooksList.length / 4) > 1 && (
            <div className="flex justify-center items-center gap-2.5 pt-4">
              {Array.from({ length: Math.ceil(relatedBooksList.length / 4) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setRelatedSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`cursor-pointer transition-all duration-300 ${
                    relatedSlide === idx
                      ? "w-3 h-3 rounded-full border-2 border-[#d95338] bg-transparent"
                      : "w-2.5 h-2.5 rounded-full bg-[#cbd5e1] dark:bg-[#4a5568] hover:bg-[#94a3b8]"
                  }`}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
