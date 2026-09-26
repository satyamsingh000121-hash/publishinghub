"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Check, Loader2, AlertCircle } from "lucide-react";

export interface ReviewItem {
  id: string;
  book_id: string;
  name: string;
  rating: number;
  review: string;
  created_at: string;
}

interface BookReviewsProps {
  bookId: string;
  bookSlug?: string;
  initialCount?: number;
  onReviewCountChange?: (count: number) => void;
}

const STORAGE_KEY_NAME = "publishinghub_reviewer_name";
const STORAGE_KEY_EMAIL = "publishinghub_reviewer_email";
const STORAGE_KEY_REMEMBER = "publishinghub_reviewer_remember";

export default function BookReviews({
  bookId,
  bookSlug,
  initialCount = 0,
  onReviewCountChange,
}: BookReviewsProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(true);
  const [reviewCount, setReviewCount] = useState<number>(initialCount);

  // Form states
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [saveInfo, setSaveInfo] = useState<boolean>(false);

  // Status & Validation states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    rating?: string;
    review?: string;
    name?: string;
    email?: string;
    general?: string;
  }>({});

  // 1. Preload saved user information from localStorage if previously chosen
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const remembered = localStorage.getItem(STORAGE_KEY_REMEMBER) === "true";
        if (remembered) {
          setSaveInfo(true);
          const savedName = localStorage.getItem(STORAGE_KEY_NAME);
          const savedEmail = localStorage.getItem(STORAGE_KEY_EMAIL);
          if (savedName) setName(savedName);
          if (savedEmail) setEmail(savedEmail);
        }
      } catch (e) {
        // LocalStorage access restricted or unavailable
      }
    }
  }, []);

  // 2. Fetch existing reviews for this specific book
  const fetchReviews = useCallback(async () => {
    if (!bookId && !bookSlug) return;
    setIsLoadingReviews(true);

    try {
      const params = new URLSearchParams();
      if (bookId) params.append("bookId", bookId);
      if (bookSlug) params.append("slug", bookSlug);

      const res = await fetch(`/api/reviews?${params.toString()}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setReviews(json.data);
          const total = json.data.length;
          setReviewCount(total);
          if (onReviewCountChange) {
            onReviewCountChange(total);
          }
        }
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setIsLoadingReviews(false);
    }
  }, [bookId, bookSlug, onReviewCountChange]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Client-side validation helper
  const validateForm = () => {
    const errors: {
      rating?: string;
      review?: string;
      name?: string;
      email?: string;
    } = {};

    if (!rating || rating < 1 || rating > 5) {
      errors.rating = "Please select a rating between 1 and 5 stars.";
    }

    if (!reviewText.trim()) {
      errors.review = "Please write your review.";
    } else if (reviewText.trim().length < 3) {
      errors.review = "Your review must be at least 3 characters.";
    }

    if (!name.trim()) {
      errors.name = "Please enter your name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        book_id: bookId || bookSlug || "default-book",
        book_slug: bookSlug,
        rating,
        review: reviewText.trim(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
      };

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Save preference in localStorage
        if (typeof window !== "undefined") {
          try {
            if (saveInfo) {
              localStorage.setItem(STORAGE_KEY_REMEMBER, "true");
              localStorage.setItem(STORAGE_KEY_NAME, name.trim());
              localStorage.setItem(STORAGE_KEY_EMAIL, email.trim());
            } else {
              localStorage.removeItem(STORAGE_KEY_REMEMBER);
              localStorage.removeItem(STORAGE_KEY_NAME);
              localStorage.removeItem(STORAGE_KEY_EMAIL);
            }
          } catch (e) {
            // Ignore storage errors
          }
        }

        // Add newly submitted review to the list immediately
        const newReviewItem: ReviewItem = data.data || {
          id: `rev_${Date.now()}`,
          book_id: bookId,
          name: name.trim(),
          rating,
          review: reviewText.trim(),
          created_at: new Date().toISOString(),
        };

        setReviews((prev) => [newReviewItem, ...prev]);
        const updatedTotal = reviews.length + 1;
        setReviewCount(updatedTotal);
        if (onReviewCountChange) {
          onReviewCountChange(updatedTotal);
        }

        // Clear review fields (preserve name and email if saved)
        setRating(0);
        setHoverRating(0);
        setReviewText("");
        if (!saveInfo) {
          setName("");
          setEmail("");
        }
        setFormErrors({});

        // Show success confirmation
        setSuccessMessage("Your review has been submitted successfully.");

        // Clear success message after 7 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 7000);
      } else {
        setFormErrors({
          general: data.error || "Failed to submit review. Please try again.",
          ...(data.errors || {}),
        });
      }
    } catch (err: any) {
      setFormErrors({
        general: "A network error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeRatingValue = hoverRating || rating;

  return (
    <div className="w-full max-w-4xl mx-auto text-left transition-colors duration-300">
      {/* ========================================================================= */}
      {/* 1. EXISTING REVIEWS LIST                                                  */}
      {/* ========================================================================= */}
      <div className="mb-10 sm:mb-12">
        {isLoadingReviews ? (
          <div className="py-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#71717a] dark:text-[#9A9D95] font-serif">
            <Loader2 className="w-4 h-4 animate-spin text-[#9333ea] dark:text-[#C9A646]" />
            <span>Loading reviews...</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-6 sm:py-8 text-center text-xs sm:text-sm text-[#71717a] dark:text-[#9A9D95] font-serif italic border-b border-[#e9e1f5] dark:border-[#18422e]/60 pb-8">
            There are no reviews yet for this book.
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-base sm:text-lg font-serif font-semibold text-[#18181b] dark:text-[#F2EEE3]">
              Customer Reviews ({reviews.length})
            </h3>

            <div className="divide-y divide-[#e9e1f5] dark:divide-[#18422e]/60">
              {reviews.map((rev) => {
                const formattedDate = rev.created_at
                  ? new Date(rev.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Recently";

                return (
                  <div key={rev.id} className="py-5 sm:py-6 first:pt-0 last:pb-0 space-y-2.5">
                    {/* Header: Stars + Customer Name */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <div
                        className="flex items-center gap-0.5 text-base sm:text-lg tracking-wider text-[#d9ae4c] dark:text-[#C9A646]"
                        aria-label={`Rating: ${rev.rating} out of 5 stars`}
                      >
                        {[1, 2, 3, 4, 5].map((starIndex) => (
                          <span key={starIndex}>
                            {starIndex <= rev.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>

                      <span className="font-serif font-semibold text-sm sm:text-base text-[#18181b] dark:text-[#F2EEE3]">
                        {rev.name}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="text-[11px] sm:text-xs text-[#71717a] dark:text-[#9A9D95]">
                      {formattedDate}
                    </div>

                    {/* Review Body */}
                    <p className="text-xs sm:text-[14px] leading-relaxed text-[#3f3f46] dark:text-[#dcded8] pt-1 whitespace-pre-line">
                      {rev.review}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="border-b border-[#e9e1f5] dark:border-[#18422e]/80 pt-2" />
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. SUCCESS FEEDBACK ALERT                                                 */}
      {/* ========================================================================= */}
      {successMessage && (
        <div
          role="status"
          className="mb-8 p-4 rounded-xl bg-emerald-50 dark:bg-[#072416] border border-emerald-300 dark:border-emerald-600/40 text-emerald-800 dark:text-emerald-200 flex items-center gap-3 text-xs sm:text-sm font-medium shadow-sm transition-all"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span>{successMessage}</span>
        </div>
      )}

      {/* General Submission Error Alert */}
      {formErrors.general && (
        <div
          role="alert"
          className="mb-8 p-4 rounded-xl bg-red-50 dark:bg-[#2b0f0f] border border-red-300 dark:border-red-800/60 text-red-800 dark:text-red-200 flex items-center gap-3 text-xs sm:text-sm font-medium shadow-sm"
        >
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
          <span>{formErrors.general}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ADD A REVIEW FORM                                                      */}
      {/* ========================================================================= */}
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7" noValidate>
        <div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#18181b] dark:text-[#F2EEE3] tracking-wide">
            Add a review
          </h3>
          <p className="text-[12px] sm:text-[13px] text-[#71717a] dark:text-[#9A9D95] mt-1">
            Your email address will not be published. Required fields are marked *
          </p>
        </div>

        {/* YOUR RATING * */}
        <div>
          <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#3f3f46] dark:text-[#dcded8] mb-2">
            YOUR RATING <span className="text-[#9333ea] dark:text-[#C9A646]">*</span>
          </label>

          <div
            className="flex items-center gap-1.5"
            onMouseLeave={() => setHoverRating(0)}
            role="radiogroup"
            aria-label="Star rating from 1 to 5"
          >
            {[1, 2, 3, 4, 5].map((starValue) => {
              const isFilled = starValue <= activeRatingValue;

              return (
                <button
                  key={starValue}
                  type="button"
                  onClick={() => {
                    setRating(starValue);
                    if (formErrors.rating) {
                      setFormErrors((prev) => ({ ...prev, rating: undefined }));
                    }
                  }}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onFocus={() => setHoverRating(starValue)}
                  onBlur={() => setHoverRating(0)}
                  className="p-1 sm:p-1.5 text-2xl sm:text-3xl leading-none transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#9333ea]/30 dark:focus:ring-[#C9A646]/30 rounded cursor-pointer"
                  aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
                  role="radio"
                  aria-checked={rating === starValue}
                >
                  <span
                    className={
                      isFilled
                        ? "text-[#d9ae4c] dark:text-[#C9A646] transition-colors"
                        : "text-[#d1d5db] dark:text-[#4b5563] hover:text-[#e2c67c] transition-colors"
                    }
                  >
                    {isFilled ? "★" : "☆"}
                  </span>
                </button>
              );
            })}

            {rating > 0 && (
              <span className="ml-2 text-xs font-medium text-[#71717a] dark:text-[#9A9D95]">
                ({rating} of 5 stars)
              </span>
            )}
          </div>

          {formErrors.rating && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 inline-block" />
              {formErrors.rating}
            </p>
          )}
        </div>

        {/* YOUR REVIEW * */}
        <div>
          <label
            htmlFor="review-textarea"
            className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#3f3f46] dark:text-[#dcded8] mb-2"
          >
            YOUR REVIEW <span className="text-[#9333ea] dark:text-[#C9A646]">*</span>
          </label>

          <textarea
            id="review-textarea"
            rows={5}
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
              if (formErrors.review) {
                setFormErrors((prev) => ({ ...prev, review: undefined }));
              }
            }}
            placeholder="Write your review here..."
            className={`w-full rounded-xl border px-4 py-3 text-xs sm:text-sm bg-white dark:bg-[#071710] text-[#18181b] dark:text-[#F2EEE3] placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all focus:outline-none focus:ring-2 resize-y ${
              formErrors.review
                ? "border-red-400 focus:border-red-500 focus:ring-red-200 dark:border-red-600 dark:focus:ring-red-950/40"
                : "border-[#e9e1f5] dark:border-[#18422e] focus:border-[#9333ea] dark:focus:border-[#C9A646] focus:ring-[#9333ea]/15 dark:focus:ring-[#C9A646]/20"
            }`}
            required
            aria-required="true"
          />

          {formErrors.review && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 inline-block" />
              {formErrors.review}
            </p>
          )}
        </div>

        {/* NAME AND EMAIL (Responsive 2-column or stacked on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {/* NAME * */}
          <div>
            <label
              htmlFor="review-name"
              className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#3f3f46] dark:text-[#dcded8] mb-2"
            >
              NAME <span className="text-[#9333ea] dark:text-[#C9A646]">*</span>
            </label>

            <input
              id="review-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (formErrors.name) {
                  setFormErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
              placeholder="Your full name"
              autoComplete="name"
              className={`w-full rounded-xl border px-4 py-3 text-xs sm:text-sm bg-white dark:bg-[#071710] text-[#18181b] dark:text-[#F2EEE3] placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all focus:outline-none focus:ring-2 ${
                formErrors.name
                  ? "border-red-400 focus:border-red-500 focus:ring-red-200 dark:border-red-600 dark:focus:ring-red-950/40"
                  : "border-[#e9e1f5] dark:border-[#18422e] focus:border-[#9333ea] dark:focus:border-[#C9A646] focus:ring-[#9333ea]/15 dark:focus:ring-[#C9A646]/20"
              }`}
              required
              aria-required="true"
            />

            {formErrors.name && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 inline-block" />
                {formErrors.name}
              </p>
            )}
          </div>

          {/* EMAIL * */}
          <div>
            <label
              htmlFor="review-email"
              className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#3f3f46] dark:text-[#dcded8] mb-2"
            >
              EMAIL <span className="text-[#9333ea] dark:text-[#C9A646]">*</span>
            </label>

            <input
              id="review-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (formErrors.email) {
                  setFormErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              placeholder="your.email@example.com"
              autoComplete="email"
              className={`w-full rounded-xl border px-4 py-3 text-xs sm:text-sm bg-white dark:bg-[#071710] text-[#18181b] dark:text-[#F2EEE3] placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all focus:outline-none focus:ring-2 ${
                formErrors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-red-200 dark:border-red-600 dark:focus:ring-red-950/40"
                  : "border-[#e9e1f5] dark:border-[#18422e] focus:border-[#9333ea] dark:focus:border-[#C9A646] focus:ring-[#9333ea]/15 dark:focus:ring-[#C9A646]/20"
              }`}
              required
              aria-required="true"
            />

            {formErrors.email && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 inline-block" />
                {formErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* OPTIONAL SAVE INFORMATION */}
        <div className="flex items-start gap-3 pt-1">
          <input
            id="save-reviewer-info"
            type="checkbox"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[#9333ea] dark:text-[#C9A646] focus:ring-[#9333ea] dark:focus:ring-[#C9A646] cursor-pointer"
          />
          <label
            htmlFor="save-reviewer-info"
            className="text-xs sm:text-[13px] text-[#52525b] dark:text-[#a1a1aa] leading-normal cursor-pointer select-none"
          >
            Save my name, email, and website in this browser for the next time I comment.
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-bold uppercase tracking-[0.14em] text-xs sm:text-[13px] bg-[#18181b] hover:bg-[#27272a] text-white dark:bg-[#c9a646] dark:hover:bg-[#d9b55d] dark:text-[#07120d] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>SUBMITTING...</span>
              </>
            ) : (
              <span>SUBMIT</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
