"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCoverArt from "./BookCoverArt";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // 8-second calm pacing with ultra-smooth 1400ms liquid crossfade
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 8000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <section className="relative min-h-[680px] lg:min-h-[740px] flex items-center overflow-hidden border-b border-[#f2eee3]/10 bg-gradient-to-r from-[#050807] via-[#07100c] to-[#0b1711]">
      
      {/* Deep atmospheric ambient lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_80%_45%,rgba(25,75,51,0.32),transparent_55%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_55%,rgba(184,146,69,0.12),transparent_35%)]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#050807]/90 via-[#050807]/40 to-transparent lg:w-3/5 z-10" />

      <div className="container-custom relative z-20 py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* ========================================================= */}
        {/* LEFT CONTENT AREA: Buttery Smooth Crossfade Stack */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[48%] relative min-h-[380px] sm:min-h-[420px] flex flex-col justify-between">
          
          <div className="relative w-full h-[320px] sm:h-[340px]">
            
            {/* SLIDE 1 (Index 0) */}
            <div
              style={{
                transition: "opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1), transform 1400ms cubic-bezier(0.16, 1, 0.3, 1), filter 1400ms cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "opacity, transform, filter",
              }}
              className={`absolute inset-0 space-y-6 ${
                currentSlide === 0
                  ? "opacity-100 translate-y-0 filter-none pointer-events-auto z-10"
                  : "opacity-0 translate-y-4 blur-[3px] pointer-events-none z-0"
              }`}
            >
              <span className="text-[11px] sm:text-xs tracking-[0.3em] text-[#d4b56a] font-bold uppercase block">
                SALE UP TO 20% OFF
              </span>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal leading-[0.93] tracking-[-0.025em] text-[#f2eee3]">
                Meet Your Next <br />
                <span className="italic text-[#d4b56a]">Favorite Book.</span>
              </h1>

              <p className="text-[#aaa9a1] text-base sm:text-lg max-w-[520px] leading-relaxed font-light pt-2">
                Explore our handpicked collection of inspiring literature, exclusive editions, and timeless masterworks.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#bestsellers"
                  className="min-h-[50px] px-10 bg-[#2c7650] hover:bg-[#37865d] text-white text-[12px] font-bold tracking-[0.14em] uppercase inline-flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#123d2b]/40"
                >
                  PURCHASE
                </a>
                <a
                  href="#featured"
                  className="min-h-[50px] px-9 border border-[#f2eee3]/30 hover:border-[#d4b56a] text-[#f2eee3] hover:text-[#d4b56a] text-[12px] font-bold tracking-[0.12em] uppercase inline-flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 bg-black/20"
                >
                  EXPLORE BOOKS
                </a>
              </div>
            </div>

            {/* SLIDE 2 (Index 1) */}
            <div
              style={{
                transition: "opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1), transform 1400ms cubic-bezier(0.16, 1, 0.3, 1), filter 1400ms cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "opacity, transform, filter",
              }}
              className={`absolute inset-0 space-y-6 ${
                currentSlide === 1
                  ? "opacity-100 translate-y-0 filter-none pointer-events-auto z-10"
                  : "opacity-0 translate-y-4 blur-[3px] pointer-events-none z-0"
              }`}
            >
              <span className="text-[11px] sm:text-xs tracking-[0.3em] text-[#d4b56a] font-bold uppercase block">
                SALE UP TO 30% OFF
              </span>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal leading-[0.93] tracking-[-0.025em] text-[#f2eee3]">
                Get -30% Purchase <br />
                <span className="italic text-[#d4b56a]">on Order over £99.00</span>
              </h1>

              <p className="text-[#aaa9a1] text-base sm:text-lg max-w-[520px] leading-relaxed font-light pt-2">
                Discover your next great read from our wide selection of bestselling books and award-winning authors.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#bestsellers"
                  className="min-h-[50px] px-9 bg-[#2c7650] hover:bg-[#37865d] text-white text-[12px] font-bold tracking-[0.12em] uppercase inline-flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#123d2b]/40"
                >
                  SHOP NOW
                </a>
                <a
                  href="#featured"
                  className="min-h-[50px] px-8 border border-[#f2eee3]/30 hover:border-[#d4b56a] text-[#f2eee3] hover:text-[#d4b56a] text-[12px] font-bold tracking-[0.12em] uppercase inline-flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 bg-black/20"
                >
                  VIEW COLLECTION
                </a>
              </div>
            </div>

            {/* SLIDE 3 (Index 2) */}
            <div
              style={{
                transition: "opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1), transform 1400ms cubic-bezier(0.16, 1, 0.3, 1), filter 1400ms cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "opacity, transform, filter",
              }}
              className={`absolute inset-0 space-y-6 ${
                currentSlide === 2
                  ? "opacity-100 translate-y-0 filter-none pointer-events-auto z-10"
                  : "opacity-0 translate-y-4 blur-[3px] pointer-events-none z-0"
              }`}
            >
              <span className="text-[11px] sm:text-xs tracking-[0.3em] text-[#d4b56a] font-bold uppercase block">
                SUMMER SPECIAL
              </span>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal leading-[0.93] tracking-[-0.025em] text-[#f2eee3]">
                Best of the <br />
                <span className="italic text-[#d4b56a]">Publishing World</span>
              </h1>

              <p className="text-[#aaa9a1] text-base sm:text-lg max-w-[520px] leading-relaxed font-light pt-2">
                Handcrafted hardcovers and premium leatherbound volumes designed for true bibliophiles.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#bestsellers"
                  className="min-h-[50px] px-10 bg-[#2c7650] hover:bg-[#37865d] text-white text-[12px] font-bold tracking-[0.14em] uppercase inline-flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#123d2b]/40"
                >
                  DISCOVER NOW
                </a>
                <a
                  href="#arrivals"
                  className="min-h-[50px] px-9 border border-[#f2eee3]/30 hover:border-[#d4b56a] text-[#f2eee3] hover:text-[#d4b56a] text-[12px] font-bold tracking-[0.12em] uppercase inline-flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 bg-black/20"
                >
                  NEW ARRIVALS
                </a>
              </div>
            </div>

          </div>

          {/* Slide Numbers / Indicator */}
          <div className="pt-6 sm:pt-8 flex items-center gap-3 font-display">
            <span className="text-[#f2eee3] text-xl sm:text-2xl font-bold tracking-wider">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            <div className="w-12 sm:w-16 h-[2px] bg-[#d4b56a]/60 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-[#d4b56a] transition-all duration-700"
                style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
              />
            </div>
            <span className="text-[#9a9b94] text-lg sm:text-xl">{String(totalSlides).padStart(2, "0")}</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT 3D VISUAL AREA: Buttery Smooth Crossfade Stack */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[52%] relative flex items-center justify-center min-h-[420px] lg:min-h-[500px]">
          
          <div className="relative w-full max-w-[520px] lg:max-w-[560px] h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center">
            
            {/* Subtle Ambient Halo Glow behind books */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(212,181,106,0.18),rgba(20,70,45,0.22)_42%,transparent_70%)] pointer-events-none blur-2xl" />
            <div className="absolute -bottom-4 w-4/5 h-16 bg-black/90 blur-2xl rounded-full pointer-events-none" />

            {/* SLIDE 1 VISUAL: 3D Yellow Edition from user image */}
            <div
              style={{
                transition: "opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1), transform 1400ms cubic-bezier(0.16, 1, 0.3, 1), filter 1400ms cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "opacity, transform, filter",
              }}
              className={`absolute inset-0 flex items-center justify-center ${
                currentSlide === 0
                  ? "opacity-100 scale-100 filter-none pointer-events-auto z-10"
                  : "opacity-0 scale-98 blur-[2px] pointer-events-none z-0"
              }`}
            >
              <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                <img
                  src="/images/hero_section2.png"
                  alt="Visions to Victory - Hero Books"
                  className="w-full h-full max-h-[420px] sm:max-h-[460px] lg:max-h-[490px] object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] transform scale-100 hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* SLIDE 2 VISUAL: 3D Green Edition from user image */}
            <div
              style={{
                transition: "opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1), transform 1400ms cubic-bezier(0.16, 1, 0.3, 1), filter 1400ms cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "opacity, transform, filter",
              }}
              className={`absolute inset-0 flex items-center justify-center ${
                currentSlide === 1
                  ? "opacity-100 scale-100 filter-none pointer-events-auto z-10"
                  : "opacity-0 scale-98 blur-[2px] pointer-events-none z-0"
              }`}
            >
              <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                <img
                  src="/images/hero4.png"
                  alt="Visions to Victory - Green Edition"
                  className="w-full h-full max-h-[420px] sm:max-h-[460px] lg:max-h-[490px] object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] transform scale-100 hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* SLIDE 3 VISUAL: Collector's Hardcover Volumes from user image */}
            <div
              style={{
                transition: "opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1), transform 1400ms cubic-bezier(0.16, 1, 0.3, 1), filter 1400ms cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "opacity, transform, filter",
              }}
              className={`absolute inset-0 flex items-center justify-center ${
                currentSlide === 2
                  ? "opacity-100 scale-100 filter-none pointer-events-auto z-10"
                  : "opacity-0 scale-98 blur-[2px] pointer-events-none z-0"
              }`}
            >
              <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                <img
                  src="/images/hero5.png"
                  alt="Visions to Victory - Collector's Edition"
                  className="w-full h-full max-h-[420px] sm:max-h-[460px] lg:max-h-[490px] object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] transform scale-100 hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>

          {/* Carousel Next / Prev Controls */}
          <div className="absolute bottom-2 right-0 flex items-center gap-2 z-30">
            <button
              onClick={handlePrev}
              className="w-10 h-10 border border-[#f2eee3]/20 hover:border-[#d4b56a] bg-[#050807]/90 hover:bg-[#0d2a1d] text-[#f2eee3] hover:text-[#d4b56a] flex items-center justify-center transition-all duration-300 shadow-md hover:-translate-x-0.5"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 border border-[#f2eee3]/20 hover:border-[#d4b56a] bg-[#050807]/90 hover:bg-[#0d2a1d] text-[#f2eee3] hover:text-[#d4b56a] flex items-center justify-center transition-all duration-300 shadow-md hover:translate-x-0.5"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
