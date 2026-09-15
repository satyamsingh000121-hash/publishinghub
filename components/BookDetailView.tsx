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
    <div className="bg-[#03100b] text-[#f2eee3] min-h-screen transition-colors duration-300">

      {/* ========================================================================= */}
      {/* TOP SECTION: BOTANICAL EMERALD BOOK SHOWCASE (MATCHING TARGET REFERENCE) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#03100b] text-[#f3eee1] border-b border-[#294829]/40 py-10 sm:py-14 lg:py-16">

        {/* Background Glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[5%] top-[10%] h-[400px] w-[400px] rounded-full bg-[#173d29]/30 blur-[130px]" />
          <div className="absolute right-[0%] bottom-[5%] h-[500px] w-[500px] rounded-full bg-[#0e3825]/30 blur-[150px]" />
          <div className="absolute left-[40%] top-[30%] h-[350px] w-[350px] rounded-full bg-[#133825]/20 blur-[140px]" />
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
                  className="absolute bottom-[34.5%] sm:bottom-[35%] left-1/2 -translate-x-1/2 w-[165px] sm:w-[190px] h-3.5 bg-black/75 blur-[3.5px] rounded-full pointer-events-none z-10"
                  aria-hidden="true"
                />

                {/* 3D Interactive Animated Book resting on marble podium */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[35%] sm:bottom-[35.5%] z-20">
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
                    border-[#6e985e]
                    bg-[#0c2417]/80
                    px-3.5
                    sm:px-4
                    py-1
                    text-[10.5px]
                    sm:text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-[#b8d6a3]
                    shadow-sm
                  "
                >
                  <span className="text-[#8eb96b]">✦</span>
                  {currentCategory}
                </div>

                <div className="hidden items-center gap-3 text-[10px] sm:text-[10.5px] font-medium uppercase tracking-[0.22em] text-[#d2ae50] xl:flex">
                  <span>GOOD BOOKS</span>
                  <span className="text-[#9c8036]">•</span>
                  <span>BRIGHT FUTURES</span>
                  <span className="ml-2 h-px w-12 bg-[#9d7d35]" />
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
                  text-[#f2eee3]
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

                <span className="text-[13px] sm:text-[13.5px] text-[#e5e1d7]">
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
                  text-[#c9cbc1]
                "
              >
                {currentSummary}
              </p>

              {/* Divider */}
              <div className="my-3.5 sm:my-4 h-px w-full bg-[#506247]/60" />

              {/* Price + Stock */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                <div className="font-serif text-[28px] sm:text-[32px] font-medium text-[#f0d99c]">
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
                      bg-[#2b0c0c]
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
                      border-[#4e8754]
                      bg-[#0b2818]
                      px-3
                      py-1
                      text-[12px]
                      sm:text-[12.5px]
                      text-[#72d16d]
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#65d46a] animate-pulse" />
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
                    border-[#b18b3c]
                    bg-[#06150e]
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
                      text-[#e6d39d]
                      transition
                      hover:bg-[#10261a]
                      disabled:opacity-30
                      cursor-pointer
                    "
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span className="text-[16px] font-serif text-[#f1eadb]">
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
                      text-[#e6d39d]
                      transition
                      hover:bg-[#10261a]
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
                    text-[#dddcd4]
                    transition
                    hover:text-[#d7b45c]
                    cursor-pointer
                  "
                >
                  <span className="text-[18px] text-[#d7b45c]">
                    {isWishlisted ? "♥" : "♡"}
                  </span>
                  <span>{isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}</span>
                </button>

                <span className="h-4 w-px bg-[#5d675d]" />

                <button
                  type="button"
                  onClick={() => setIsCompared(!isCompared)}
                  className="
                    flex
                    items-center
                    gap-2
                    text-[13px]
                    sm:text-[13.5px]
                    text-[#dddcd4]
                    transition
                    hover:text-[#d7b45c]
                    cursor-pointer
                  "
                >
                  <span className="text-[18px] text-[#d7b45c]">
                    ⇄
                  </span>
                  <span>{isCompared ? "Added to Compare" : "Add to Compare"}</span>
                </button>

              </div>

              {/* Share */}
              <div className="mt-4 sm:mt-5 flex items-center gap-3.5">

                <span className="text-[13px] text-[#b8bcb3]">
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
                      border-[#b69a52]
                      text-[12.5px]
                      sm:text-[13px]
                      text-[#eee9dc]
                      transition
                      hover:bg-[#c7a64e]
                      hover:text-[#07120d]
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
                      border-[#b69a52]
                      text-[12.5px]
                      sm:text-[13px]
                      text-[#eee9dc]
                      transition
                      hover:bg-[#c7a64e]
                      hover:text-[#07120d]
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
                      border-[#b69a52]
                      text-[13px]
                      sm:text-[14px]
                      text-[#eee9dc]
                      transition
                      hover:bg-[#c7a64e]
                      hover:text-[#07120d]
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
                      border-[#b69a52]
                      text-[13px]
                      sm:text-[14px]
                      text-[#eee9dc]
                      transition
                      hover:bg-[#c7a64e]
                      hover:text-[#07120d]
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

      {/* Main Container for Lower Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* SECTION 2: MEET THE AUTHOR (MATCHING LIVE REFERENCE SITE)                 */}
        {/* ========================================================================= */}
        {/* SECTION 2: MEET THE AUTHOR (CLEAN LIGHT DAY THEME / GREEN DARK THEME)     */}
        {/* ========================================================================= */}
        <section className="py-4 sm:py-6">
          <div className="max-w-6xl mx-auto rounded-xl sm:rounded-2xl bg-white/95 dark:bg-[#091510] border border-gray-200/80 dark:border-[#2c7650]/40 p-6 sm:p-10 lg:p-12 shadow-sm dark:shadow-xl relative overflow-hidden transition-all duration-300">
            {/* Ambient Glows in Background (Subtle in Day mode, Emerald in Dark mode) */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-50/40 dark:bg-[#2c7650]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-50/30 dark:bg-[#2c7650]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Centered Heading & Quote */}
            <div className="text-center mb-8 sm:mb-12 relative z-10 max-w-3xl mx-auto px-4">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl dark:text-[#f2eee3] text-[#1c1917] font-normal tracking-tight">
                Meet The Author
              </h2>
              <div className="w-16 h-0.5 bg-[#b89245] dark:bg-[#d4b56a] mx-auto mt-3 mb-4 rounded-full opacity-80" />
              {currentAuthorQuote && (
                <p className="font-display italic text-sm sm:text-base md:text-lg text-gray-600 dark:text-[#a3b8ad] max-w-2xl mx-auto leading-relaxed">
                  &ldquo;{currentAuthorQuote}&rdquo;
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center max-w-5xl mx-auto relative z-10">
              {/* Left: Author Profile (Portrait Photo + Centered Name + Centered Circular Social Icons) */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="w-44 sm:w-52 aspect-[3.8/5] overflow-hidden shadow-sm rounded-[3px] bg-white dark:bg-black/40 border border-gray-200/80 dark:border-[#2c7650]/50">
                  <img
                    src={currentAuthorImage}
                    alt={currentAuthorName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {authorsList.length > 1 ? (
                  <div className="mt-4 flex flex-col items-center">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {authorsList.map((auth, idx) => {
                        const isSelected = selectedAuthorIdx === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedAuthorIdx(idx)}
                            className={`font-display text-base sm:text-lg px-3 py-1 rounded-full transition-all duration-200 border cursor-pointer ${isSelected
                                ? "bg-[#b89245]/15 border-[#b89245] text-[#b89245] dark:text-[#d4b56a] font-semibold shadow-sm"
                                : "border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-white/30"
                              }`}
                          >
                            {auth.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <h3 className="font-display text-xl sm:text-2xl font-medium dark:text-[#f2eee3] text-[#1c1917] mt-4 text-center">
                    {currentAuthorName}
                  </h3>
                )}

                {/* Circular Social Icons */}
                <div className="flex items-center justify-center gap-2 mt-3 text-gray-500 dark:text-[#a3b8ad]">
                  <a
                    href={currentAuthorSocials?.facebook || "#facebook"}
                    target={currentAuthorSocials?.facebook && currentAuthorSocials.facebook.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-7 h-7 rounded-full border border-gray-200 dark:border-[#2c7650]/60 hover:border-black hover:text-black dark:hover:border-[#d4b56a] dark:hover:text-[#d4b56a] flex items-center justify-center transition-colors text-xs bg-gray-50/60 dark:bg-black/20"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={currentAuthorSocials?.twitter || "#twitter"}
                    target={currentAuthorSocials?.twitter && currentAuthorSocials.twitter.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="w-7 h-7 rounded-full border border-gray-200 dark:border-[#2c7650]/60 hover:border-black hover:text-black dark:hover:border-[#d4b56a] dark:hover:text-[#d4b56a] flex items-center justify-center transition-colors text-xs bg-gray-50/60 dark:bg-black/20"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={currentAuthorSocials?.linkedin || "#linkedin"}
                    target={currentAuthorSocials?.linkedin && currentAuthorSocials.linkedin.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-7 h-7 rounded-full border border-gray-200 dark:border-[#2c7650]/60 hover:border-black hover:text-black dark:hover:border-[#d4b56a] dark:hover:text-[#d4b56a] flex items-center justify-center transition-colors text-xs bg-gray-50/60 dark:bg-black/20"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={currentAuthorSocials?.instagram || "#instagram"}
                    target={currentAuthorSocials?.instagram && currentAuthorSocials.instagram.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-7 h-7 rounded-full border border-gray-200 dark:border-[#2c7650]/60 hover:border-black hover:text-black dark:hover:border-[#d4b56a] dark:hover:text-[#d4b56a] flex items-center justify-center transition-colors text-xs bg-gray-50/60 dark:bg-black/20"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  {currentAuthorSocials?.youtube && currentAuthorSocials.youtube !== "#youtube" && (
                    <a
                      href={currentAuthorSocials.youtube}
                      target={currentAuthorSocials.youtube.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="w-7 h-7 rounded-full border border-gray-200 dark:border-[#2c7650]/60 hover:border-black hover:text-black dark:hover:border-[#d4b56a] dark:hover:text-[#d4b56a] flex items-center justify-center transition-colors text-xs bg-gray-50/60 dark:bg-black/20"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right: Other Books by Author OR Notice Box (Single-Line Horizontal Row) */}
              <div className="lg:col-span-8 flex flex-col justify-center min-h-[220px] relative w-full overflow-hidden">
                {authorBooksList && authorBooksList.length > 0 ? (
                  <div className="relative group/carousel w-full">
                    {/* Single-line horizontal scrollable container - NEVER wraps to second line */}
                    <div
                      ref={authorBooksScrollRef}
                      className="flex items-start gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 flex-nowrap"
                    >
                      {authorBooksList.map((b) => {
                        const targetSlug = b.slug || getBookSlug(b);
                        return (
                          <Link
                            key={b.id}
                            href={`/product/${targetSlug}`}
                            className="flex-shrink-0 w-[140px] sm:w-[155px] md:w-[170px] flex flex-col items-center text-center group cursor-pointer transition-transform"
                          >
                            <div className="relative w-full aspect-[3/4.4] overflow-hidden rounded-[2px] shadow-sm group-hover:shadow-md transform group-hover:-translate-y-1 transition-all duration-300 border border-gray-200/80 dark:border-[#2c7650]/30 bg-white dark:bg-black/30">
                              <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="mt-3 text-xs font-semibold text-[#b89245] dark:text-[#d4b56a]">{b.price}</div>
                            <h4 className="font-display text-sm mt-1 dark:text-[#f2eee3] text-[#1c1917] group-hover:text-[#b89245] dark:group-hover:text-[#d4b56a] transition-colors line-clamp-2">
                              {b.title}
                            </h4>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Navigation Arrow Controls when books can scroll */}
                    {authorBooksList.length > 3 && (
                      <div className="flex items-center justify-end gap-2 mt-2 pr-1">
                        <button
                          type="button"
                          onClick={() => scrollAuthorBooks("left")}
                          aria-label="Previous book"
                          className="w-7 h-7 rounded-full border border-gray-300 dark:border-[#2c7650]/60 hover:border-[#b89245] dark:hover:border-[#d4b56a] text-gray-600 dark:text-gray-300 hover:text-[#b89245] dark:hover:text-[#d4b56a] flex items-center justify-center transition-colors bg-white/80 dark:bg-black/40 shadow-xs cursor-pointer"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollAuthorBooks("right")}
                          aria-label="Next book"
                          className="w-7 h-7 rounded-full border border-gray-300 dark:border-[#2c7650]/60 hover:border-[#b89245] dark:hover:border-[#d4b56a] text-gray-600 dark:text-gray-300 hover:text-[#b89245] dark:hover:text-[#d4b56a] flex items-center justify-center transition-colors bg-white/80 dark:bg-black/40 shadow-xs cursor-pointer"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Clean Light Notice Box in Day mode, Emerald Green in Dark mode */
                  <div className="flex items-center gap-3.5 px-6 py-5 bg-gray-50/80 dark:bg-[#123324] border border-gray-200 dark:border-[#2c7650] text-[#555] dark:text-[#e2f7eb] rounded-lg shadow-sm max-w-lg my-auto">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-400 dark:border-[#52c38d] bg-white dark:bg-[#1a4a34] flex items-center justify-center text-xs font-bold text-gray-600 dark:text-[#52c38d] flex-shrink-0">
                      i
                    </div>
                    <span className="text-[13.5px] font-medium tracking-wide leading-snug">
                      No products were found matching your selection.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: TABS (DESCRIPTION & REVIEWS)                                   */}
        {/* ========================================================================= */}
        <section className="space-y-8 max-w-4xl mx-auto pt-6 border-t dark:border-[#f2eee3]/10 border-gray-100">
          {/* Tab Selection */}
          <div className="flex items-center justify-center gap-12 border-b dark:border-[#f2eee3]/10 border-gray-200">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-4 text-base font-display transition-all relative ${activeTab === "description"
                  ? "text-[#18181b] dark:text-[#f2eee3] font-bold border-b-2 border-[#d95338]"
                  : "text-[#71717a] dark:text-[#9d9f96] hover:text-[#18181b] dark:hover:text-[#f2eee3]"
                }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 text-base font-display transition-all relative ${activeTab === "reviews"
                  ? "text-[#18181b] dark:text-[#f2eee3] font-bold border-b-2 border-[#d95338]"
                  : "text-[#71717a] dark:text-[#9d9f96] hover:text-[#18181b] dark:hover:text-[#f2eee3]"
                }`}
            >
              Reviews (0)
            </button>
          </div>

          {/* Tab Contents */}
          <div className="py-4">
            {activeTab === "description" ? (
              <div className="space-y-4 max-w-3xl mx-auto text-left">
                {currentDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="text-xs sm:text-[13.5px] leading-relaxed dark:text-[#b0b3a8] text-[#555]">
                    {para}
                  </p>
                ))}
                {(book?.isbn || book?.publisher || book?.pages || book?.format || book?.language) && (
                  <div className="pt-6 border-t border-gray-100 dark:border-[#f2eee3]/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                    {book.isbn && (
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-[#71717a] dark:text-[#9d9f96]">ISBN</span>
                        <span className="text-xs font-medium text-[#18181b] dark:text-[#f2eee3]">{book.isbn}</span>
                      </div>
                    )}
                    {book.publisher && (
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-[#71717a] dark:text-[#9d9f96]">Publisher</span>
                        <span className="text-xs font-medium text-[#18181b] dark:text-[#f2eee3]">{book.publisher}</span>
                      </div>
                    )}
                    {book.pages && (
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-[#71717a] dark:text-[#9d9f96]">Pages</span>
                        <span className="text-xs font-medium text-[#18181b] dark:text-[#f2eee3]">{book.pages} pages</span>
                      </div>
                    )}
                    {book.format && (
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-[#71717a] dark:text-[#9d9f96]">Format</span>
                        <span className="text-xs font-medium text-[#18181b] dark:text-[#f2eee3]">{book.format}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
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
            className={`items-start min-h-[380px] ${relatedBooksList.length <= 2
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
                  className={`cursor-pointer transition-all duration-300 ${relatedSlide === idx
                      ? "w-3 h-3 rounded-full border-2 border-[#d95338] bg-transparent"
                      : "w-2.5 h-2.5 rounded-full bg-[#cbd5e1] dark:bg-[#4a5568] hover:bg-[#94a3b8]"
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
