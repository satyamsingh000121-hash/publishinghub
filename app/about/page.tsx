"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutFeatures from "@/components/about/AboutFeatures";
import AboutTestimonials from "@/components/about/AboutTestimonials";
import AboutVideoSection from "@/components/about/AboutVideoSection";
import AboutSponsors from "@/components/about/AboutSponsors";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";

export default function AboutPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <main className="min-h-screen dark:bg-[#050807] bg-white dark:text-[#f2eee3] text-[#18181b] flex flex-col font-sans selection:bg-[#b89245] selection:text-[#050807] transition-colors duration-300">
      {/* Top Bar & Navbar with activeTab="ABOUT US" */}
      <Navbar
        activeTab="ABOUT US"
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 1. Hero Banner: A Monthly Book Review Publication */}
      <AboutHero />

      {/* 2. Intro Section: Gold Feather Medallion & Editorial Statement */}
      <AboutIntro />

      {/* 3. 3-Column Features Grid: Trending, Featured, Books */}
      <AboutFeatures />

      {/* 4. Testimonials Section: Read Reviews by My Readers */}
      <AboutTestimonials />

      {/* 5. Video Review Spotlight: How to make a Deal with side labels & player */}
      <AboutVideoSection />

      {/* 6. Sponsors & Affiliates Row: 6 Brand Badges */}
      <AboutSponsors />

      {/* 7. Site Footer */}
      <Footer />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </main>
  );
}
