"use client";

import React, { useState, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Globe,
  Youtube,
  Search,
  Info,
} from "lucide-react";
import BookCoverArt from "./BookCoverArt";
import BookOpenCard from "./BookOpenCard";
import bookStyles from "./BookOpenCard.module.css";
import { getBookSlug } from "@/lib/books";
import type { BookDetailData, AuthorBook, RelatedBook } from "@/lib/books";

export type { BookDetailData, AuthorBook, RelatedBook };

export interface BookDetailViewProps {
  book?: BookDetailData;
  onAddToCart?: (title: string, price?: string, quantity?: number, id?: string, image?: string) => void;
  onBack?: () => void;
}

export default function BookDetailView({ book, onAddToCart, onBack }: BookDetailViewProps) {
  const isOutOfStock = (book?.stock !== undefined && book?.stock <= 0) || book?.availability === "out-of-stock";
  const maxStock = book?.stock && book.stock > 0 ? book.stock : 99;

  const [quantity, setQuantity] = useState<number>(isOutOfStock ? 0 : 1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isCompared, setIsCompared] = useState<boolean>(false);
  const [addedAlert, setAddedAlert] = useState<boolean>(false);
  const [relatedSlide, setRelatedSlide] = useState<number>(0);
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);

  // Related products (Matching exact reference image)
  const relatedBooks: RelatedBook[] = [
    {
      id: "rel-1",
      image: "/images/shop8.jpg",
      title: "Peter and the Wolf",
      author: "By Sergei Prokofiev",
      price: "£15.00",
      badge: "SALE",
      badgeType: "sale",
      slug: "peter-and-the-wolf",
    },
    {
      id: "rel-2",
      image: "/images/shop2.jpg",
      title: "The Summer of Impossible Things",
      author: "By Rowan Coleman",
      price: "£18.00",
      slug: "the-summer-of-impossible-things",
    },
    {
      id: "rel-3",
      image: "/images/book_section3.webp",
      title: "The Night Ocean",
      author: "By Paul La Farge",
      price: "£22.00",
      badge: "SALE",
      badgeType: "sale",
      slug: "the-night-ocean",
    },
    {
      id: "rel-4",
      image: "/images/book_section4.webp",
      title: "The Assault",
      author: "By Harry Mulisch",
      price: "£19.00",
      slug: "the-assault",
    },
  ];

  const currentTitle = book?.title || "The Journey of a Young Entrepreneur";
  const currentCategory = book?.category || "Biography";
  const currentPrice = book?.price || "£18.00";
  const currentImage = book?.image || "/images/book_section1.png";
  const currentSummary =
    book?.summary ||
    "An inspiring, real-world roadmap detailing how relentless determination and creative leadership build monumental success.";
  const currentDescription =
    book?.description ||
    "Unlock Your Entrepreneurial Journey with \"Visions to Victory\"\n\nEmbarking on the journey of entrepreneurship can feel both exciting and overwhelming. As you face the challenges and opportunities ahead, having a trustworthy guide can make all the difference. That's where \"Visions to Victory\" steps in - it's a comprehensive handbook crafted to empower entrepreneurs like yourself to turn your dreams into reality and achieve lasting success in the competitive world of business.\n\nThe book starts by stressing the importance of defining your vision clearly and setting goals that are ambitious yet achievable. Through practical advice and real-life examples, it helps you shape a vision that acts as a guiding star, keeping you motivated, focused, and resilient in the face of obstacles.\n\n\"Visions to Victory\" serves as a strategic roadmap for crafting success from the very beginning to achieving significant milestones like stock exchange glory and reaching nine to twelve-figure revenues. It provides blueprints and successful models for clarifying your vision and goals, developing strategic plans, optimising business models, implementing efficient systems and processes, fostering a culture of continuous improvement, and driving innovation and value creation.\n\nIn summary, \"Visions to Victory\" fulfills its purpose by empowering entrepreneurs with the knowledge, tools, and resources needed to navigate the complexities of business ownership, overcome challenges, and achieve their vision of success. Whether you're launching a new venture or expanding an existing business, this book equips you with the skills and mindset required to thrive in today's dynamic business landscape.";
  const [selectedAuthorIdx, setSelectedAuthorIdx] = useState(0);

  const authorsList =
    book?.authorsList && book.authorsList.length > 0
      ? book.authorsList
      : [
        {
          name: book?.authorName || (book?.author ? book.author.replace(/^By\s+/i, "") : "Author"),
          image: book?.authorImage || "/images/author-01.jpg",
          quote: book?.authorQuote || "",
          facebook: book?.authorSocials?.facebook || "#facebook",
          twitter: book?.authorSocials?.twitter || "#twitter",
          instagram: book?.authorSocials?.instagram || "#instagram",
          pinterest: book?.authorSocials?.pinterest || "#pinterest",
          linkedin: book?.authorSocials?.linkedin || "#linkedin",
          youtube: book?.authorSocials?.youtube || "#youtube",
          books: book?.authorBooks || [],
        },
      ];

  const activeAuthor = authorsList[selectedAuthorIdx] || authorsList[0];
  const currentAuthorName = activeAuthor.name;
  const currentAuthorImage = activeAuthor.image || "/images/author-01.jpg";
  const currentAuthorQuote =
    activeAuthor.quote ||
    activeAuthor.tagline ||
    activeAuthor.bio ||
    book?.authorQuote ||
    "";
  const currentAuthorSocials = {
    facebook: activeAuthor.facebook || book?.authorSocials?.facebook || "#facebook",
    twitter: activeAuthor.twitter || book?.authorSocials?.twitter || "#twitter",
    instagram: activeAuthor.instagram || book?.authorSocials?.instagram || "#instagram",
    pinterest: activeAuthor.pinterest || book?.authorSocials?.pinterest || "#pinterest",
    linkedin: activeAuthor.linkedin || book?.authorSocials?.linkedin || "#linkedin",
    youtube: activeAuthor.youtube || book?.authorSocials?.youtube || "#youtube",
  };
  const authorBooksList = activeAuthor.books || [];
  const relatedBooksList = book?.relatedBooks || relatedBooks;

  const authorBooksScrollRef = useRef<HTMLDivElement>(null);
  const scrollAuthorBooks = (direction: "left" | "right") => {
    if (authorBooksScrollRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      authorBooksScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    if (onAddToCart) {
      onAddToCart(currentTitle, currentPrice, quantity, book?.id, currentImage);
    }
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-[#03100b] text-[#18181b] dark:text-[#f2eee3] min-h-screen transition-colors duration-300">

      {/* ========================================================================= */}
      {/* TOP SECTION: BOTANICAL EMERALD BOOK SHOWCASE (MATCHING TARGET REFERENCE) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-transparent dark:bg-[#03100b] text-[#18181b] dark:text-[#f3eee1] border-b border-gray-200/80 dark:border-[#294829]/40 py-10 sm:py-14 lg:py-16">

        {/* Background Glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[5%] top-[10%] h-[400px] w-[400px] rounded-full dark:bg-[#173d29]/30 bg-emerald-100/30 blur-[130px]" />
          <div className="absolute right-[0%] bottom-[5%] h-[500px] w-[500px] rounded-full dark:bg-[#0e3825]/30 bg-emerald-100/25 blur-[150px]" />
          <div className="absolute left-[40%] top-[30%] h-[350px] w-[350px] rounded-full dark:bg-[#133825]/20 bg-emerald-50/20 blur-[140px]" />
        </div>

        {/* Decorative Real Botanical Foliage on Far Borders (from green_marble_podium.jpg) */}
        <div
          className="pointer-events-none absolute -left-12 -bottom-10 w-[360px] h-[360px] bg-no-repeat opacity-70 hidden sm:block"
          style={{
            backgroundImage: "url('/images/green_marble_podium.jpg')",
            backgroundPosition: "left 85%",
            backgroundSize: "260%",
            maskImage: "radial-gradient(ellipse at bottom left, black 55%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at bottom left, black 55%, transparent 75%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-12 -bottom-10 w-[380px] h-[380px] bg-no-repeat opacity-65 hidden sm:block"
          style={{
            backgroundImage: "url('/images/green_marble_podium.jpg')",
            backgroundPosition: "right 85%",
            backgroundSize: "260%",
            maskImage: "radial-gradient(ellipse at bottom right, black 55%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at bottom right, black 55%, transparent 75%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-8 -top-8 w-[280px] h-[280px] bg-no-repeat opacity-45 hidden md:block"
          style={{
            backgroundImage: "url('/images/green_marble_podium.jpg')",
            backgroundPosition: "right top",
            backgroundSize: "280%",
            maskImage: "radial-gradient(ellipse at top right, black 50%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at top right, black 50%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Decorative Botanical Leaf SVGs (from target reference) */}
        <div className="pointer-events-none absolute right-0 top-0 opacity-60">
          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M177 5C135 10 108 35 106 70C105 94 119 113 141 124"
              stroke="#708c49"
              strokeWidth="2"
            />
            <path
              d="M145 25C122 26 107 37 101 57C120 62 138 48 145 25Z"
              fill="#304d28"
            />
            <path
              d="M166 54C141 52 125 64 120 85C142 91 159 76 166 54Z"
              fill="#405f31"
            />
            <path
              d="M177 88C153 82 137 95 135 116C155 122 172 107 177 88Z"
              fill="#304d28"
            />
          </svg>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 opacity-50">
          <svg
            width="220"
            height="240"
            viewBox="0 0 220 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M220 240C191 192 169 144 173 91C176 50 192 22 215 2"
              stroke="#506d3b"
              strokeWidth="2"
            />
            <path
              d="M188 164C159 156 140 168 135 194C160 199 181 187 188 164Z"
              fill="#294829"
            />
            <path
              d="M180 123C153 113 133 125 128 149C151 154 173 143 180 123Z"
              fill="#3c5b32"
            />
            <path
              d="M183 80C157 71 140 82 135 105C158 110 177 99 183 80Z"
              fill="#304d29"
            />
          </svg>
        </div>

        {/* Main Container */}
        <div className="relative z-10 mx-auto max-w-[1450px] px-6 lg:px-10">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.15fr] lg:gap-14">

            {/* =========================
                LEFT - PRODUCT IMAGE & 3D PODIUM
            ========================== */}
            <div className="relative flex justify-center w-full">
              <div
                className="
                  relative
                  w-full
                  max-w-[550px]
                  sm:max-w-[580px]
                  lg:max-w-[600px]
                  h-[520px]
                  sm:h-[580px]
                  lg:h-[620px]
                  rounded-[24px]
                  overflow-hidden
                  bg-transparent
                  shadow-[0_25px_80px_rgba(0,0,0,0.65)]
                  select-none
                  group
                  isolate
                  [transform:translateZ(0)]
                "
              >
                {/* User's custom podium showcase image (scaled slightly to crop out the baked-in gold border line) */}
                <img
                  src="/images/shop_section.png"
                  alt="Book 3D Showcase Podium"
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none scale-[1.065] transition-transform duration-700 group-hover:scale-[1.08]"
                />

                {/* Soft Contact Shadow on Marble Pedestal */}
                <div
                  className="absolute bottom-[27.5%] sm:bottom-[28%] left-1/2 -translate-x-1/2 w-[195px] sm:w-[225px] h-3.5 bg-black/75 blur-[4px] rounded-full pointer-events-none z-10"
                  aria-hidden="true"
                />

                {/* 3D Interactive Animated Book resting on marble podium */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[28%] sm:bottom-[28.5%] z-20 origin-bottom scale-[1.12] sm:scale-[1.15]">
                  <div
                    className={`${bookStyles.stage} ${isBookOpen ? bookStyles.isOpen : ""}`}
                    tabIndex={0}
                    role="region"
                    aria-label={`3D Animated book for ${currentTitle}`}
                    onClick={() => setIsBookOpen((prev) => !prev)}
                  >
                    {/* Soft Radial Contact Shadow */}
                    <div className={bookStyles.contactShadow} aria-hidden="true" />

                    {/* 3D Book Assembly */}
                    <div className={bookStyles.book}>
                      {/* Back Cover & Realistic Gilded Page Edges */}
                      <div className={bookStyles.bookBody}>
                        <div className={bookStyles.pagesLayer}>
                          {/* Inner Page Preview when book opens */}
                          <div className={bookStyles.pageContent}>
                            <div className="space-y-0.5">
                              <span className="text-[7.5px] tracking-[0.2em] uppercase font-bold text-[#b89245] block">
                                {currentCategory}
                              </span>
                              <p className="font-serif text-[10px] font-semibold text-[#2c3e50] line-clamp-2 leading-tight">
                                {currentTitle}
                              </p>
                            </div>
                            <p className="text-[7px] text-[#555] italic leading-tight line-clamp-5">
                              {currentSummary}
                            </p>
                            <div className="text-[7px] font-serif text-[#888] pt-0.5 border-t border-[#e2d8c3] text-right">
                              Page 1
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3D Hinged Rotating Cover Assembly */}
                      <div className={bookStyles.cover}>
                        <div className={bookStyles.frontFace}>
                          <div className={bookStyles.spineHighlight} aria-hidden="true" />

                          {/* Ribbon Badges on main book cover */}
                          {book?.badge && (
                            <div className="absolute top-1.5 left-1.5 z-30 flex flex-col gap-1 pointer-events-none">
                              {(book.badge === "SALE" || book.badge === "SALE_AND_HOT" || book.badge === "SALE_AND_NEW") && (
                                <span
                                  className="bg-[#56ab84] text-white text-[8.5px] font-bold px-2 pt-0.5 pb-0.5 uppercase tracking-wider shadow-sm flex items-center justify-center"
                                  style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                                >
                                  SALE
                                </span>
                              )}
                              {(book.badge === "HOT" || book.badge === "SALE_AND_HOT") && (
                                <span
                                  className="bg-[#e05638] text-white text-[8.5px] font-bold px-2 pt-0.5 pb-0.5 uppercase tracking-wider shadow-sm flex items-center justify-center"
                                  style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                                >
                                  HOT
                                </span>
                              )}
                            </div>
                          )}

                          <img
                            src={currentImage}
                            alt={currentTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className={bookStyles.backFace}>
                          <div className={bookStyles.innerPagePattern}>
                            <span className="text-[8px] tracking-widest text-[#a9822e] uppercase font-semibold">
                              Publishing Hub
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transparent Interactive Button Overlay matching the button inside shop_section.png */}
                <button
                  type="button"
                  onClick={() => setIsBookOpen((prev) => !prev)}
                  className="
                    absolute
                    bottom-[4.5%]
                    sm:bottom-[5%]
                    left-1/2
                    z-30
                    -translate-x-1/2
                    w-[78%]
                    max-w-[340px]
                    h-[46px]
                    rounded-full
                    cursor-pointer
                    transition-all
                    hover:bg-white/10
                    active:scale-[0.98]
                    focus:outline-none
                  "
                  aria-label="Hover or click book to open 3D preview"
                  title="Hover or click book to open 3D preview"
                />
              </div>
            </div>

            {/* =========================
                RIGHT - PRODUCT DETAILS
            ========================== */}
            <div className="relative">

              {/* Top Label Row */}
              <div className="mb-3.5 sm:mb-4 flex items-center justify-between gap-6">

                <div
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-emerald-600/40
                    dark:border-[#6e985e]
                    bg-emerald-50/80
                    dark:bg-[#0c2417]/80
                    px-3.5
                    sm:px-4
                    py-1
                    text-[10.5px]
                    sm:text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-emerald-800
                    dark:text-[#b8d6a3]
                    shadow-sm
                  "
                >
                  <span className="text-[#3b7d34] dark:text-[#8eb96b]">✦</span>
                  {currentCategory}
                </div>

                <div className="hidden items-center gap-3 text-[10px] sm:text-[10.5px] font-medium uppercase tracking-[0.22em] text-[#9a7322] dark:text-[#d2ae50] xl:flex">
                  <span>GOOD BOOKS</span>
                  <span className="text-[#9a7322] dark:text-[#9c8036]">•</span>
                  <span>BRIGHT FUTURES</span>
                  <span className="ml-2 h-px w-12 bg-[#b89245]/40 dark:bg-[#9d7d35]" />
                </div>

              </div>

              {/* Product Title */}
              <h1
                className="
                  font-serif
                  text-[32px]
                  sm:text-[38px]
                  lg:text-[42px]
                  xl:text-[46px]
                  font-normal
                  leading-[1.08]
                  tracking-[-0.02em]
                  text-[#18181b]
                  dark:text-[#f2eee3]
                "
              >
                {currentTitle}
              </h1>

              {/* Rating */}
              <div className="mt-3.5 sm:mt-4 flex items-center gap-3">
                <div className="flex gap-1 text-[16px] sm:text-[17px] text-[#d9ae4c]">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>

                <span className="text-[13px] sm:text-[13.5px] text-gray-600 dark:text-[#e5e1d7]">
                  ( {book?.reviewCount ?? 0} reviews )
                </span>
              </div>

              {/* Description */}
              <p
                className="
                  mt-3.5
                  sm:mt-4
                  max-w-[650px]
                  text-[13.5px]
                  sm:text-[14px]
                  leading-[1.65]
                  text-gray-700
                  dark:text-[#c9cbc1]
                "
              >
                {currentSummary}
              </p>

              {/* Divider */}
              <div className="my-3.5 sm:my-4 h-px w-full bg-gray-200 dark:bg-[#506247]/60" />

              {/* Price + Stock */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                <div className="font-serif text-[28px] sm:text-[32px] font-medium text-[#9a7322] dark:text-[#f0d99c]">
                  {currentPrice}
                </div>

                {isOutOfStock ? (
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-[#ef4444]/40
                      bg-red-50
                      dark:bg-[#2b0c0c]
                      px-3
                      py-1
                      text-[12px]
                      sm:text-[12.5px]
                      text-[#ef4444]
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
                    Out of Stock
                  </div>
                ) : (
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-emerald-600/30
                      dark:border-[#4e8754]
                      bg-emerald-50
                      dark:bg-[#0b2818]
                      px-3
                      py-1
                      text-[12px]
                      sm:text-[12.5px]
                      text-emerald-800
                      dark:text-[#72d16d]
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-[#65d46a] animate-pulse" />
                    In Stock ({book?.stock && book.stock > 0 ? `${book.stock} units` : "100 units"})
                  </div>
                )}
              </div>

              {/* Quantity + Add Cart */}
              <div className="mt-4 sm:mt-5 flex flex-col gap-3 sm:flex-row">

                {/* Quantity Stepper */}
                <div
                  className="
                    flex
                    h-[46px]
                    sm:h-[48px]
                    w-full
                    items-center
                    justify-between
                    rounded-lg
                    border
                    border-[#b89245]/60
                    dark:border-[#b18b3c]
                    bg-[#fbf9f4]
                    dark:bg-[#06150e]
                    sm:w-[155px]
                  "
                >
                  <button
                    type="button"
                    disabled={isOutOfStock || quantity <= 1}
                    onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                    className="
                      flex
                      h-full
                      w-10
                      items-center
                      justify-center
                      text-[18px]
                      text-[#8a6b28]
                      dark:text-[#e6d39d]
                      transition
                      hover:bg-[#b89245]/15
                      dark:hover:bg-[#10261a]
                      disabled:opacity-30
                      cursor-pointer
                    "
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span className="text-[16px] font-serif text-[#18181b] dark:text-[#f1eadb]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    disabled={isOutOfStock || quantity >= maxStock}
                    onClick={() => setQuantity((prev) => Math.min(maxStock, prev + 1))}
                    className="
                      flex
                      h-full
                      w-10
                      items-center
                      justify-center
                      text-[18px]
                      text-[#8a6b28]
                      dark:text-[#e6d39d]
                      transition
                      hover:bg-[#b89245]/15
                      dark:hover:bg-[#10261a]
                      disabled:opacity-30
                      cursor-pointer
                    "
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add To Cart Button - Warm Gold Gradient */}
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className="
                    flex
                    h-[46px]
                    sm:h-[48px]
                    flex-1
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    border
                    border-[#d9b55d]
                    bg-gradient-to-r
                    from-[#e2c67c]
                    to-[#cda952]
                    px-5
                    text-[13px]
                    sm:text-[13.5px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-[#07120d]
                    shadow-[0_10px_30px_rgba(194,153,62,0.16)]
                    transition
                    duration-300
                    hover:scale-[1.01]
                    hover:from-[#eed38d]
                    hover:to-[#d9b961]
                    active:scale-[0.99]
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    cursor-pointer
                  "
                >
                  <ShoppingCart className="w-4 h-4 text-[#07120d]" />

                  <span>{addedAlert ? "ADDED TO CART" : "ADD TO CART"}</span>

                  <span className="text-[16px] font-normal text-[#07120d]">
                    →
                  </span>
                </button>

              </div>

              {/* Wishlist / Compare */}
              <div className="mt-4 flex flex-wrap items-center gap-5">

                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="
                    flex
                    items-center
                    gap-2
                    text-[13px]
                    sm:text-[13.5px]
                    text-gray-600
                    hover:text-[#9a7322]
                    dark:text-[#dddcd4]
                    dark:hover:text-[#d7b45c]
                    transition
                    cursor-pointer
                  "
                >
                  <span className="text-[18px] text-[#9a7322] dark:text-[#d7b45c]">
                    {isWishlisted ? "♥" : "♡"}
                  </span>
                  <span>{isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}</span>
                </button>

                <span className="h-4 w-px bg-gray-300 dark:bg-[#5d675d]" />

                <button
                  type="button"
                  onClick={() => setIsCompared(!isCompared)}
                  className="
                    flex
                    items-center
                    gap-2
                    text-[13px]
                    sm:text-[13.5px]
                    text-gray-600
                    hover:text-[#9a7322]
                    dark:text-[#dddcd4]
                    dark:hover:text-[#d7b45c]
                    transition
                    cursor-pointer
                  "
                >
                  <span className="text-[18px] text-[#9a7322] dark:text-[#d7b45c]">
                    ⇄
                  </span>
                  <span>{isCompared ? "Added to Compare" : "Add to Compare"}</span>
                </button>

              </div>

              {/* Share */}
              <div className="mt-4 sm:mt-5 flex items-center gap-3.5">

                <span className="text-[13px] text-gray-500 dark:text-[#b8bcb3]">
                  Share:
                </span>

                <div className="flex gap-2.5">

                  <button
                    type="button"
                    className="
                      flex
                      h-8
                      w-8
                      sm:h-8.5
                      sm:w-8.5
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#b89245]/60
                      dark:border-[#b69a52]
                      text-[12.5px]
                      sm:text-[13px]
                      text-[#8a6b28]
                      dark:text-[#eee9dc]
                      bg-white
                      dark:bg-transparent
                      transition
                      hover:bg-[#b89245]
                      hover:text-white
                      dark:hover:bg-[#c7a64e]
                      dark:hover:text-[#07120d]
                      cursor-pointer
                    "
                    aria-label="Share on Facebook"
                  >
                    f
                  </button>

                  <button
                    type="button"
                    className="
                      flex
                      h-8
                      w-8
                      sm:h-8.5
                      sm:w-8.5
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#b89245]/60
                      dark:border-[#b69a52]
                      text-[12.5px]
                      sm:text-[13px]
                      text-[#8a6b28]
                      dark:text-[#eee9dc]
                      bg-white
                      dark:bg-transparent
                      transition
                      hover:bg-[#b89245]
                      hover:text-white
                      dark:hover:bg-[#c7a64e]
                      dark:hover:text-[#07120d]
                      cursor-pointer
                    "
                    aria-label="Share on X"
                  >
                    𝕏
                  </button>

                  <button
                    type="button"
                    className="
                      flex
                      h-8
                      w-8
                      sm:h-8.5
                      sm:w-8.5
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#b89245]/60
                      dark:border-[#b69a52]
                      text-[13px]
                      sm:text-[14px]
                      text-[#8a6b28]
                      dark:text-[#eee9dc]
                      bg-white
                      dark:bg-transparent
                      transition
                      hover:bg-[#b89245]
                      hover:text-white
                      dark:hover:bg-[#c7a64e]
                      dark:hover:text-[#07120d]
                      cursor-pointer
                    "
                    aria-label="Share link"
                  >
                    ⤴
                  </button>

                  <button
                    type="button"
                    className="
                      flex
                      h-8
                      w-8
                      sm:h-8.5
                      sm:w-8.5
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#b89245]/60
                      dark:border-[#b69a52]
                      text-[13px]
                      sm:text-[14px]
                      text-[#8a6b28]
                      dark:text-[#eee9dc]
                      bg-white
                      dark:bg-transparent
                      transition
                      hover:bg-[#b89245]
                      hover:text-white
                      dark:hover:bg-[#c7a64e]
                      dark:hover:text-[#07120d]
                      cursor-pointer
                    "
                    aria-label="Share via email"
                  >
                    ✉
                  </button>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: MEET THE AUTHOR (LAVENDER THEME MATCHING REFERENCE SITE)       */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#f8f5fc] dark:bg-[#020b08] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-[#ede5f4] dark:border-[#1a3828]/40 relative overflow-visible">
        {/* Soft Lavender / Violet Glow in Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1000px] h-[450px] dark:bg-[#0c3522]/30 bg-purple-200/25 rounded-full blur-[140px]" />
          <div className="absolute -top-10 left-1/4 w-[400px] h-[350px] dark:bg-[#14422c]/20 bg-purple-100/40 rounded-full blur-[120px]" />
          <div className="absolute -bottom-10 right-1/4 w-[450px] h-[350px] dark:bg-[#0e3a24]/20 bg-purple-100/40 rounded-full blur-[130px]" />
        </div>

        {/* Main Card with Soft Cream Background & Rounded Shoulders */}
        <div
          className="max-w-6xl mx-auto rounded-[28px] sm:rounded-[36px] border border-[#eadbec] dark:border-[#1d3d2c] p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(139,92,246,0.04)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] relative z-10 transition-all duration-300 bg-[#fdfbf7] dark:bg-[radial-gradient(ellipse_90%_80%_at_50%_30%,_#09281b_0%,_#061911_55%,_#030f0a_100%)]"
        >
          {/* Top Center Botanical Leaf Emblem */}
          <div
            className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 px-4 py-1 z-20 flex items-center justify-center rounded-full bg-[#fdfbf7] dark:bg-[#082419] border border-[#eadbec] dark:border-[#1d3d2c] shadow-xs"
          >
            <svg
              viewBox="0 0 38 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-5 sm:w-9 sm:h-5.5 text-[#9a7e3a] dark:text-[#C9A646]"
              aria-hidden="true"
            >
              <path d="M19 22V13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path
                d="M19 13C19 9.5 20.5 3 22 2C20.5 3 17 6.5 17 11C17 12 18 13 19 13Z"
                fill="currentColor"
                fillOpacity="0.18"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path
                d="M19 13.5C20.5 13.5 24 13 28 8C29.5 6 29 4.5 27 5C23 6 19.5 11 19 13.5Z"
                fill="currentColor"
                fillOpacity="0.18"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path
                d="M19 13.5C17.5 13.5 14 13 10 8C8.5 6 9 4.5 11 5C15 6 18.5 11 19 13.5Z"
                fill="currentColor"
                fillOpacity="0.18"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Ornamental Centered Heading & Quote */}
          <div className="text-center mb-8 sm:mb-11 relative z-10 max-w-3xl mx-auto px-2">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              {/* Left decorative line with circular purple dot */}
              <div className="flex items-center gap-2.5">
                <div className="w-10 sm:w-16 md:w-24 lg:w-32 h-[1px] bg-gradient-to-r from-transparent via-[#d6b777]/60 to-[#cbb279] dark:via-[#C9A646]/70 dark:to-[#C9A646]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] inline-block shadow-[0_0_6px_rgba(139,92,246,0.4)]" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] text-[#1c1917] dark:text-[#F3EFE4] font-normal tracking-tight">
                Meet The Authors
              </h2>

              {/* Right decorative line with circular purple dot */}
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] inline-block shadow-[0_0_6px_rgba(139,92,246,0.4)]" />
                <div className="w-10 sm:w-16 md:w-24 lg:w-32 h-[1px] bg-gradient-to-l from-transparent via-[#d6b777]/60 to-[#cbb279] dark:via-[#C9A646]/70 dark:to-[#C9A646]" />
              </div>
            </div>

            {/* Author Quote with cleaned quotes */}
            {currentAuthorQuote && (
              <p className="mt-3.5 sm:mt-4 font-serif italic text-sm sm:text-base md:text-[16.5px] text-[#555060] dark:text-[#e3ded2] max-w-2xl mx-auto leading-relaxed">
                &ldquo;{currentAuthorQuote.replace(/^["“'\s]+|["”'\s]+$/g, "").trim()}&rdquo;
              </p>
            )}
          </div>

          {/* Content Area: Author Profile (Left) & Books (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-5xl mx-auto relative z-10">
            {/* Left Column: Author Profile */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              {/* Author Portrait Image with Smooth Rounded Corners */}
              <div className="w-44 sm:w-52 aspect-[3.8/4.8] overflow-hidden rounded-2xl bg-white shadow-md border border-[#eadbec] dark:border-[#2c533e]/50 dark:bg-black/40">
                <img
                  src={currentAuthorImage}
                  alt={currentAuthorName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Author Selection Pills */}
              {authorsList.length > 1 ? (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                  {authorsList.map((auth, idx) => {
                    const isSelected = selectedAuthorIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedAuthorIdx(idx)}
                        className={`font-serif text-sm sm:text-[15px] px-4 sm:px-5 py-1.5 rounded-full transition-all duration-200 border cursor-pointer ${isSelected
                            ? "border-[#8b5cf6] text-[#6d28d9] bg-[#8b5cf6]/10 shadow-[0_0_10px_rgba(139,92,246,0.15)] dark:border-[#C9A646] dark:text-[#F3EFE4] dark:bg-[#C9A646]/10 font-medium"
                            : "border-[#eadbec] bg-white text-gray-700 hover:border-[#8b5cf6] hover:text-[#6d28d9] dark:border-[#1b3d2b] dark:bg-[#071911]/60 dark:text-[#8ea99b] dark:hover:border-[#2b6348] dark:hover:text-[#F3EFE4]"
                          }`}
                      >
                        {auth.name}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4 font-serif text-sm sm:text-[15px] px-5 py-1.5 rounded-full border border-[#8b5cf6]/40 text-[#6d28d9] bg-[#8b5cf6]/10 shadow-xs dark:border-[#C9A646] dark:text-[#F3EFE4] dark:bg-[#C9A646]/10 font-medium">
                  {currentAuthorName}
                </div>
              )}

              {/* Clean Circular Social Icons */}
              <div className="flex items-center justify-center gap-2.5 mt-3.5 text-[#7c3aed] dark:text-[#C9A646]">
                <a
                  href={currentAuthorSocials?.facebook || "#facebook"}
                  target={currentAuthorSocials?.facebook && currentAuthorSocials.facebook.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-7 h-7 rounded-full border border-[#eadbec] bg-white text-[#7c3aed] hover:border-[#8b5cf6] hover:bg-purple-50 dark:border-[#1b3d2b] dark:bg-[#05140e] dark:text-[#C9A646] dark:hover:border-[#C9A646] dark:hover:text-[#F3EFE4] dark:hover:bg-[#0b2b1d] flex items-center justify-center transition-all text-xs shadow-xs"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href={currentAuthorSocials?.twitter || "#twitter"}
                  target={currentAuthorSocials?.twitter && currentAuthorSocials.twitter.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-7 h-7 rounded-full border border-[#eadbec] bg-white text-[#7c3aed] hover:border-[#8b5cf6] hover:bg-purple-50 dark:border-[#1b3d2b] dark:bg-[#05140e] dark:text-[#C9A646] dark:hover:border-[#C9A646] dark:hover:text-[#F3EFE4] dark:hover:bg-[#0b2b1d] flex items-center justify-center transition-all text-xs shadow-xs"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href={currentAuthorSocials?.linkedin || "#linkedin"}
                  target={currentAuthorSocials?.linkedin && currentAuthorSocials.linkedin.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-7 h-7 rounded-full border border-[#eadbec] bg-white text-[#7c3aed] hover:border-[#8b5cf6] hover:bg-purple-50 dark:border-[#1b3d2b] dark:bg-[#05140e] dark:text-[#C9A646] dark:hover:border-[#C9A646] dark:hover:text-[#F3EFE4] dark:hover:bg-[#0b2b1d] flex items-center justify-center transition-all text-xs shadow-xs"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href={currentAuthorSocials?.instagram || "#instagram"}
                  target={currentAuthorSocials?.instagram && currentAuthorSocials.instagram.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-7 h-7 rounded-full border border-[#eadbec] bg-white text-[#7c3aed] hover:border-[#8b5cf6] hover:bg-purple-50 dark:border-[#1b3d2b] dark:bg-[#05140e] dark:text-[#C9A646] dark:hover:border-[#C9A646] dark:hover:text-[#F3EFE4] dark:hover:bg-[#0b2b1d] flex items-center justify-center transition-all text-xs shadow-xs"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                {currentAuthorSocials?.youtube && currentAuthorSocials.youtube !== "#youtube" && (
                  <a
                    href={currentAuthorSocials.youtube}
                    target={currentAuthorSocials.youtube.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-7 h-7 rounded-full border border-[#eadbec] bg-white text-[#7c3aed] hover:border-[#8b5cf6] hover:bg-purple-50 dark:border-[#1b3d2b] dark:bg-[#05140e] dark:text-[#C9A646] dark:hover:border-[#C9A646] dark:hover:text-[#F3EFE4] dark:hover:bg-[#0b2b1d] flex items-center justify-center transition-all text-xs shadow-xs"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Author's Books (Clean Horizontal Row Matching Reference) */}
            <div className="lg:col-span-8 flex flex-col justify-center min-h-[240px] relative w-full overflow-hidden">
              {authorBooksList && authorBooksList.length > 0 ? (
                <div className="relative group/carousel w-full">
                  {/* Horizontal scrollable container for books */}
                  <div
                    ref={authorBooksScrollRef}
                    className="flex items-start justify-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 flex-nowrap"
                  >
                    {authorBooksList.map((b) => {
                      const targetSlug = b.slug || getBookSlug(b);
                      return (
                        <Link
                          key={b.id}
                          href={`/product/${targetSlug}`}
                          className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[195px] flex flex-col items-center text-center group cursor-pointer transition-transform"
                        >
                          {/* Realistic Book Cover with subtle shadow */}
                          <div className="relative w-full aspect-[3/4.4] overflow-hidden rounded-r-[3px] rounded-l-[1px] shadow-md group-hover:shadow-xl dark:shadow-[0_12px_28px_rgba(0,0,0,0.65)] dark:group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.9)] transform group-hover:-translate-y-1.5 transition-all duration-300 border border-[#eadbec] dark:border-white/10 group-hover:border-[#8b5cf6]/60 dark:group-hover:border-[#C9A646]/50 bg-gray-100 dark:bg-black/40">
                            <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                          </div>

                          {/* Book Price in Gold */}
                          <div className="mt-3.5 text-xs sm:text-sm font-medium text-[#8a6b28] dark:text-[#C9A646] tracking-wide">
                            {b.price}
                          </div>

                          {/* Thin Accent Line underneath Price */}
                          <div className="w-6 h-[1.5px] bg-[#cbb279] dark:bg-[#C9A646] mx-auto my-1.5 opacity-80 group-hover:w-8 group-hover:bg-[#8b5cf6] dark:group-hover:bg-[#dfba56] transition-all" />

                          {/* Book Title */}
                          <h4 className="font-serif text-sm sm:text-[15px] text-[#1c1917] group-hover:text-[#6d28d9] dark:text-[#F3EFE4] dark:group-hover:text-[#C9A646] transition-colors line-clamp-2 leading-snug">
                            {b.title}
                          </h4>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Navigation Arrow Controls when books can scroll */}
                  {authorBooksList.length > 3 && (
                    <div className="flex items-center justify-end gap-2 mt-3 pr-1">
                      <button
                        type="button"
                        onClick={() => scrollAuthorBooks("left")}
                        aria-label="Previous book"
                        className="w-7 h-7 rounded-full border border-[#eadbec] bg-white text-gray-700 hover:border-[#8b5cf6] hover:text-[#6d28d9] dark:border-[#1b3d2b] dark:bg-[#071911] dark:hover:border-[#C9A646] dark:text-[#C9A646] dark:hover:text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollAuthorBooks("right")}
                        aria-label="Next book"
                        className="w-7 h-7 rounded-full border border-[#eadbec] bg-white text-gray-700 hover:border-[#8b5cf6] hover:text-[#6d28d9] dark:border-[#1b3d2b] dark:bg-[#071911] dark:hover:border-[#C9A646] dark:text-[#C9A646] dark:hover:text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Clean Notice Box when no books are found */
                <div className="flex items-center gap-3.5 px-6 py-5 bg-purple-50/50 border border-purple-100 text-purple-950 dark:bg-[#0a2318] dark:border-[#1b3d2b] dark:text-[#e2f7eb] rounded-xl shadow-xs max-w-lg mx-auto my-auto">
                  <div className="w-6 h-6 rounded-full border-2 border-purple-400 bg-purple-100 dark:border-[#52c38d] dark:bg-[#14422e] flex items-center justify-center text-xs font-bold text-purple-800 dark:text-[#52c38d] flex-shrink-0">
                    i
                  </div>
                  <span className="text-[13.5px] font-medium tracking-wide leading-snug font-serif text-purple-900 dark:text-[#d6ded9]">
                    No products were found matching your selection.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container for Lower Sections (Tabs, Related, Upsell) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">

        {/* ========================================================================= */}
        {/* SECTION 3: TABS (DESCRIPTION & REVIEWS - LUXURY PUBLISHING THEME)          */}
        {/* ========================================================================= */}
        <section className="max-w-4xl mx-auto pt-8 pb-4 relative z-10">
          <div className="rounded-2xl border border-gray-200/80 bg-[#fcfaf6] p-6 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:border-[#18422e] dark:bg-[#061710] dark:shadow-[0_16px_36px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* Subtle Inner Ambient Glow */}
            <div className="absolute top-0 right-1/4 w-72 h-72 dark:bg-[#0c3522]/20 bg-emerald-100/25 rounded-full blur-3xl pointer-events-none" />

            {/* Tab Selection */}
            <div className="flex items-center justify-center gap-10 sm:gap-14 border-b border-gray-200 dark:border-[#18422e] pb-0 relative z-10">
              <button
                type="button"
                onClick={() => setActiveTab("description")}
                className={`pb-3.5 text-base sm:text-lg font-serif tracking-wide transition-all duration-200 relative cursor-pointer ${activeTab === "description"
                    ? "text-[#1c1917] font-medium border-b-2 border-[#b89245] -mb-[1px] dark:text-[#F2EEE3] dark:border-[#C9A646]"
                    : "text-gray-500 hover:text-[#1c1917] border-b-2 border-transparent hover:border-gray-300 -mb-[1px] dark:text-[#9A9D95] dark:hover:text-[#F2EEE3] dark:hover:border-[#18422e]"
                  }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={`pb-3.5 text-base sm:text-lg font-serif tracking-wide transition-all duration-200 relative cursor-pointer ${activeTab === "reviews"
                    ? "text-[#1c1917] font-medium border-b-2 border-[#b89245] -mb-[1px] dark:text-[#F2EEE3] dark:border-[#C9A646]"
                    : "text-gray-500 hover:text-[#1c1917] border-b-2 border-transparent hover:border-gray-300 -mb-[1px] dark:text-[#9A9D95] dark:hover:text-[#F2EEE3] dark:hover:border-[#18422e]"
                  }`}
              >
                Reviews (0)
              </button>
            </div>

            {/* Tab Contents */}
            <div className="pt-6 relative z-10">
              {activeTab === "description" ? (
                <div className="space-y-4 max-w-3xl mx-auto text-left">
                  {currentDescription.split("\n\n").map((para, i) => (
                    <p key={i} className="text-xs sm:text-[14px] leading-relaxed text-gray-700 dark:text-[#dcded8]">
                      {para}
                    </p>
                  ))}
                  {(book?.isbn || book?.publisher || book?.pages || book?.format || book?.language) && (
                    <div className="pt-6 mt-6 border-t border-gray-200 dark:border-[#18422e] grid grid-cols-2 sm:grid-cols-4 gap-5 text-left">
                      {book.isbn && (
                        <div>
                          <span className="block text-[10.5px] uppercase tracking-wider font-semibold text-[#8a6b28] dark:text-[#C9A646] mb-1">
                            ISBN
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-[#1c1917] dark:text-[#F2EEE3]">
                            {book.isbn}
                          </span>
                        </div>
                      )}
                      {book.publisher && (
                        <div>
                          <span className="block text-[10.5px] uppercase tracking-wider font-semibold text-[#8a6b28] dark:text-[#C9A646] mb-1">
                            Publisher
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-[#1c1917] dark:text-[#F2EEE3]">
                            {book.publisher}
                          </span>
                        </div>
                      )}
                      {book.pages && (
                        <div>
                          <span className="block text-[10.5px] uppercase tracking-wider font-semibold text-[#8a6b28] dark:text-[#C9A646] mb-1">
                            Pages
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-[#1c1917] dark:text-[#F2EEE3]">
                            {book.pages} pages
                          </span>
                        </div>
                      )}
                      {book.format && (
                        <div>
                          <span className="block text-[10.5px] uppercase tracking-wider font-semibold text-[#8a6b28] dark:text-[#C9A646] mb-1">
                            Format
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-[#1c1917] dark:text-[#F2EEE3]">
                            {book.format}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-xs sm:text-sm text-gray-500 dark:text-[#9A9D95] font-serif italic">
                  There are no reviews yet for this book.
                </div>
              )}
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 4: RELATED PRODUCTS (LUXURY PUBLISHING STYLE MATCHING REFERENCE)   */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 relative border-t border-gray-200 dark:border-[#18422e]/60">
          {/* Subtle Ambient Emerald Glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] dark:bg-[#0c3522]/20 bg-emerald-100/20 rounded-full blur-[140px]" />
          </div>

          {/* Centered Heading with Botanical Motif and Ornamental Lines */}
          <div className="text-center mb-10 sm:mb-14 relative z-10 max-w-3xl mx-auto px-4">
            {/* Top Center Botanical Leaf Emblem */}
            <div className="flex items-center justify-center mb-3">
              <svg
                viewBox="0 0 38 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-5 text-[#8a6b28] dark:text-[#C9A646]"
                aria-hidden="true"
              >
                <path d="M19 22V13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <path
                  d="M19 13C19 9.5 20.5 3 22 2C20.5 3 17 6.5 17 11C17 12 18 13 19 13Z"
                  fill="currentColor"
                  fillOpacity="0.18"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 13.5C20.5 13.5 24 13 28 8C29.5 6 29 4.5 27 5C23 6 19.5 11 19 13.5Z"
                  fill="currentColor"
                  fillOpacity="0.18"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 13.5C17.5 13.5 14 13 10 8C8.5 6 9 4.5 11 5C15 6 18.5 11 19 13.5Z"
                  fill="currentColor"
                  fillOpacity="0.18"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Heading with Left & Right Gold Ornamental Lines */}
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              <div className="hidden sm:flex items-center gap-2.5 text-[#8a6b28] dark:text-[#C9A646]">
                <div className="w-12 sm:w-16 md:w-24 lg:w-32 h-[1px] bg-gradient-to-r from-transparent via-[#b89245]/70 to-[#b89245] dark:via-[#C9A646]/70 dark:to-[#C9A646]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#b89245] dark:bg-[#C9A646] inline-block shadow-[0_0_6px_rgba(201,166,70,0.6)]" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] text-[#1c1917] dark:text-[#F2EEE3] font-normal tracking-tight">
                Related products
              </h2>

              <div className="hidden sm:flex items-center gap-2.5 text-[#8a6b28] dark:text-[#C9A646]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b89245] dark:bg-[#C9A646] inline-block shadow-[0_0_6px_rgba(201,166,70,0.6)]" />
                <div className="w-12 sm:w-16 md:w-24 lg:w-32 h-[1px] bg-gradient-to-l from-transparent via-[#b89245]/70 to-[#b89245] dark:via-[#C9A646]/70 dark:to-[#C9A646]" />
              </div>
            </div>

            {/* Small Gold Underline */}
            <div className="w-12 sm:w-16 h-[1.5px] bg-[#b89245] dark:bg-[#C9A646] mx-auto mt-3.5 opacity-85 rounded-full" />
          </div>

          {/* 4-Column Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto relative z-10">
            {relatedBooksList.slice(relatedSlide * 4, (relatedSlide + 1) * 4).map((b) => {
              const targetSlug = b.slug || getBookSlug(b);
              return (
                <Link
                  key={b.id}
                  href={`/product/${targetSlug}`}
                  className="rounded-2xl border border-gray-200/80 bg-[#fcfaf6] p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 hover:border-[#b89245]/60 hover:-translate-y-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:border-[#18422e] dark:bg-[#061710] dark:hover:border-[#C9A646]/60 dark:shadow-[0_12px_28px_rgba(0,0,0,0.55)] dark:hover:shadow-[0_18px_40px_rgba(0,0,0,0.8)] group cursor-pointer"
                >
                  {/* Book Cover Container */}
                  <div className="relative w-full aspect-[3/4.2] overflow-hidden rounded-[3px] shadow-md group-hover:shadow-lg dark:shadow-[0_10px_22px_rgba(0,0,0,0.55)] border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-black/40">
                    {/* Top Ribbon Badges */}
                    {b.badge && (
                      <div className="absolute top-0 left-0 z-20 flex flex-col gap-1 pointer-events-none">
                        {(b.badge === "SALE" || b.badge === "SALE_AND_HOT" || (b.badgeType === "sale" && b.badge !== "HOT")) && (
                          <span
                            className="bg-[#3f8f68] text-white text-[9px] font-bold px-2.5 pt-0.5 pb-1 uppercase tracking-wider shadow-sm flex items-center justify-center font-sans"
                            style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                          >
                            SALE
                          </span>
                        )}
                        {(b.badge === "HOT" || b.badge === "SALE_AND_HOT" || (b.badgeType === "hot" && b.badge !== "SALE")) && (
                          <span
                            className="bg-[#c8482a] text-white text-[9px] font-bold px-2.5 pt-0.5 pb-1 uppercase tracking-wider shadow-sm flex items-center justify-center font-sans"
                            style={{ clipPath: "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)" }}
                          >
                            HOT
                          </span>
                        )}
                      </div>
                    )}

                    {/* Spine Shadow Gradient Overlay */}
                    <div className="absolute top-0 left-0 bottom-0 w-[6%] bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none" />

                    {/* Book Image */}
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />

                    {/* Hover Floating Action Buttons (Cart & Search) */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
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
                        className="w-10 h-10 rounded-full bg-white/95 border border-[#b89245]/70 text-[#8a6b28] hover:bg-[#b89245] hover:text-white dark:bg-[#082318] dark:border-[#C9A646]/70 dark:hover:bg-[#C9A646] dark:text-[#C9A646] dark:hover:text-[#05100B] shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      <span
                        className="w-10 h-10 rounded-full bg-white/95 border border-[#b89245]/70 text-[#8a6b28] hover:bg-[#b89245] hover:text-white dark:bg-[#082318] dark:border-[#C9A646]/70 dark:hover:bg-[#C9A646] dark:text-[#C9A646] dark:hover:text-[#05100B] shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                        aria-label="View book"
                        title="View book"
                      >
                        <Search className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Information Block Below Book Cover */}
                  <div className="mt-4 flex flex-col items-center w-full">
                    {/* Price in Gold */}
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#8a6b28] dark:text-[#C9A646] tracking-wide">
                      {b.oldPrice && (
                        <span className="text-gray-400 dark:text-[#9A9D95]/60 line-through font-normal text-xs">
                          {b.oldPrice}
                        </span>
                      )}
                      <span>{b.price}</span>
                    </div>

                    {/* Title in Serif */}
                    <h4 className="font-serif text-sm sm:text-[15px] text-[#1c1917] group-hover:text-[#8a6b28] dark:text-[#F2EEE3] dark:group-hover:text-[#C9A646] transition-colors leading-snug line-clamp-2 mt-1.5 px-1">
                      {b.title}
                    </h4>

                    {/* Author in Muted Gray */}
                    {b.author && (
                      <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-500 dark:text-[#9A9D95] font-medium mt-1.5 line-clamp-1">
                        {b.author}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Carousel Pagination Dots */}
          {Math.ceil(relatedBooksList.length / 4) > 1 && (
            <div className="flex justify-center items-center gap-2.5 pt-6 relative z-10">
              {Array.from({ length: Math.ceil(relatedBooksList.length / 4) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setRelatedSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`cursor-pointer transition-all duration-300 ${relatedSlide === idx
                      ? "w-3 h-3 rounded-full border-2 border-[#b89245] dark:border-[#C9A646] bg-transparent"
                      : "w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-[#1b4330] hover:bg-[#b89245]/60 dark:hover:bg-[#C9A646]/60"
                    }`}
                />
              ))}
            </div>
          )}
        </section>

      </div>

      {/* =========================
          ADD TO CART MESSAGE TOAST
      ========================== */}
      {addedAlert && (
        <div
          className="
            fixed
            bottom-7
            right-7
            z-50
            rounded-xl
            border
            border-[#b69a52]
            bg-[#092117]
            px-6
            py-4
            text-sm
            text-[#e8dfca]
            shadow-2xl
            flex
            items-center
            gap-3
            animate-in
            fade-in
            slide-in-from-bottom-3
          "
        >
          <span className="text-[#65d46a] font-bold text-base">✓</span>
          <span>{currentTitle} added to your cart</span>
        </div>
      )}
    </div>
  );
}
