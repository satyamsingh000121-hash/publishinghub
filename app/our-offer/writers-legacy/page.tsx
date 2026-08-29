"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import Link from "next/link";
import Image from "next/image";
import {
  PenTool,
  Users,
  BookOpen,
  Share2,
  TrendingUp,
  ArrowRight,
  Phone,
  Mail,
  ChevronRight,
  CheckCircle2,
  Download,
  PlusCircle,
  Clock,
  Check,
  Search,
} from "lucide-react";

export default function WritersLegacyPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bookDetails: "",
    helpCategory: "",
    additionalHelp: "",
    comments: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        bookDetails: "",
        helpCategory: "",
        additionalHelp: "",
        comments: "",
      });
    }, 4000);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#050807] text-[#f2eee3] font-sans selection:bg-[#d4b56a] selection:text-[#050807]">
      {/* 1. TOP NAVBAR */}
      <Navbar
        cartCount={totalCartCount}
        activeTab="Writers Legacy Package"
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 2. BREADCRUMB HEADER */}
      <section className="border-b border-[#1e3b2b]/60 bg-[#060d09] py-8 sm:py-10">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#f2eee3] tracking-tight">
            Writers Legacy Package
          </h1>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#888b83]">
            <Link href="/" className="hover:text-[#d4b56a] transition-colors">
              Home
            </Link>
            <span className="text-[#888b83]/60">/</span>
            <span className="text-[#d4b56a]">Writers Legacy Package</span>
          </nav>
        </div>
      </section>

      {/* 3. HERO BANNER SECTION (FULL WIDTH EDGE-TO-EDGE WITH GAP) */}
      <section className="relative w-full mt-8 sm:mt-12 overflow-hidden border-y border-[#1e3b2b]/80 bg-[#07130c] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Background image overlay */}
        <div className="relative min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center justify-center p-8 sm:p-14 text-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/ChatGPT Image Aug 29, 2026, 01_17_40 PM.png"
              alt="Writers Legacy Book Background"
              fill
              className="object-cover object-center opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-black/45 backdrop-brightness-95" />
          </div>

          <div className="relative z-10 max-w-5xl lg:max-w-6xl mx-auto space-y-4 sm:space-y-6 px-4">
            <span className="inline-block text-sm sm:text-base font-normal font-serif text-white tracking-wide">
              Writer&apos;s Legacy Package
            </span>
            
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium text-white leading-tight drop-shadow-md">
              Craft Your Book at Your Own Pace – Create Your Legacy Today!
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-white/95 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              Write your book with expert guidance and support, one step at a time.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 bg-[#e67e22] hover:bg-[#d35400] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-md shadow-lg border border-white/40 transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Check className="w-4 h-4 text-white stroke-[3]" />
                <span>APPLY NOW</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 bg-[#e67e22] hover:bg-[#d35400] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-md shadow-lg border border-white/40 transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Search className="w-4 h-4 text-white stroke-[2.5]" />
                <span>START YOUR WRITING JOURNEY TODAY</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER FOR CARDS (FULL WIDTH / EXPANDED LENGTH) */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-8 sm:space-y-10">

        {/* 4. READY TO TURN YOUR BOOK DREAM INTO REALITY? CARD */}
        <section className="rounded-2xl border border-[#1e3b2b] bg-[#07130c] p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#f2eee3]">
            Ready to Turn Your Book Dream into Reality?
          </h3>
          <p className="text-xs sm:text-sm text-[#9a9d95] max-w-3xl mx-auto leading-relaxed">
            Discover our tailored publishing packages to bring your story to life, at a pace that suits every step of the way!
          </p>
          <div className="pt-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-7 py-3 border border-[#d4b56a] text-[#d4b56a] hover:bg-[#d4b56a] hover:text-[#050807] text-xs font-bold tracking-widest uppercase rounded-[3px] transition-all duration-300 cursor-pointer"
            >
              <span>REQUEST FOR MORE INFORMATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 5. SPLIT SECTION 1: "Craft Your Book at Your Own Pace!" */}
        <section className="grid md:grid-cols-12 gap-8 items-center rounded-2xl border border-[#1e3b2b] bg-[#07130c] p-8 sm:p-10">
          <div className="md:col-span-6 space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#d4b56a]">
              Craft Your Book at Your Own Pace!
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
              Take the time you need to create a book that truly reflects your vision. With our Writers Legacy Package, you&apos;ll have 12 months of expert guidance, resources, and support to craft your masterpiece.
            </p>
            <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
              Whether you&apos;re starting from scratch or refining your ideas, we&apos;re here to help you every step of the way.
            </p>
            <div className="pt-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#d4b56a] text-[#d4b56a] hover:bg-[#d4b56a] hover:text-[#050807] text-xs font-bold tracking-widest uppercase rounded-[3px] transition-colors cursor-pointer"
              >
                <span>DOWNLOAD THE BROCHURE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="md:col-span-6 h-[260px] sm:h-[320px] rounded-xl overflow-hidden border border-[#1e3b2b] relative bg-black/40">
            <Image
              src="/images/author-01.jpg"
              alt="Consultation meeting"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </section>

        {/* 6. SPLIT SECTION 2: "Let's Bring Your Book to Life at Your Own Pace!" */}
        <section className="grid md:grid-cols-12 gap-8 items-center rounded-2xl border border-[#1e3b2b] bg-[#07130c] p-8 sm:p-10">
          <div className="md:col-span-6 space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#d4b56a]">
              Let&apos;s Bring Your Book to Life at Your Own Pace!
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
              From idea to final draft, our Writers Legacy Package provides the tools, coaching, and resources you need to write, publish, and share your story with the world.
            </p>
            <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
              All at your pace, with the support of a community that believes in your voice.
            </p>
            <div className="pt-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#d4b56a] text-[#d4b56a] hover:bg-[#d4b56a] hover:text-[#050807] text-xs font-bold tracking-widest uppercase rounded-[3px] transition-colors cursor-pointer"
              >
                <span>BOOK A CALL NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="md:col-span-6 space-y-3">
            <div className="h-[220px] sm:h-[260px] rounded-xl overflow-hidden border border-[#1e3b2b] relative bg-[#050b08]">
              <Image
                src="/images/book_section1.png"
                alt="Visions of Victory book"
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="py-3 px-4 border border-[#1e3b2b] bg-[#050b08] hover:border-[#d4b56a] hover:text-[#d4b56a] text-[#dedacf] text-[11px] font-bold tracking-wider uppercase rounded-[3px] text-center transition-colors cursor-pointer"
              >
                REQUEST A CALLBACK
              </button>
              <button
                type="button"
                className="py-3 px-4 border border-[#1e3b2b] bg-[#050b08] hover:border-[#d4b56a] hover:text-[#d4b56a] text-[#dedacf] text-[11px] font-bold tracking-wider uppercase rounded-[3px] text-center transition-colors cursor-pointer"
              >
                BOOK A VIDEO CALL
              </button>
            </div>
          </div>
        </section>

        {/* 7. QUICK ACTION CALLBACK STRIP */}
        <section className="rounded-2xl border border-[#1e3b2b] bg-[#07130c] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 shrink-0 rounded-full border border-[#d4b56a] flex items-center justify-center text-[#d4b56a] bg-[#050b08]">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-lg sm:text-xl font-medium text-[#d4b56a]">
                Start Your Writing Journey with Us!
              </h4>
              <p className="text-xs text-[#9a9d95] mt-1">
                Request a call back to learn how we can help you turn your ideas into a published book at your own pace.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 border border-[#d4b56a] text-[#d4b56a] hover:bg-[#d4b56a] hover:text-[#050807] text-xs font-bold tracking-wider uppercase rounded-[3px] transition-colors cursor-pointer"
          >
            <span>REQUEST A CALLBACK</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>

        {/* 8. INQUIRY FORM SECTION ("Embark on Your Writing Journey Today!") */}
        <section className="grid lg:grid-cols-12 gap-8 rounded-2xl border border-[#1e3b2b] bg-[#07130c] p-8 sm:p-12">
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#d4b56a] leading-tight">
              Embark on Your Writing Journey Today!
            </h3>
            <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
              Submit Your Inquiry to Learn How We Can Help You Write Your Book at Your Own Pace.
            </p>
            <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
              At The Publishing Hub, we&apos;re committed to providing the resources, coaching, and community you need to bring your story to life. Let&apos;s make your book a reality.
            </p>

            <div className="pt-4 border-t border-[#1e3b2b] space-y-2 text-xs text-[#dedacf]">
              <p>
                Call us at:{" "}
                <a href="tel:+4401214967890" className="text-[#d4b56a] hover:underline font-semibold">
                  +44 0121 496 7890
                </a>{" "}
                or email us at:
              </p>
              <p>
                <a href="mailto:hello@thepublishinghub.com" className="text-[#d4b56a] hover:underline font-semibold">
                  hello@thepublishinghub.com
                </a>{" "}
                to get started!
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7 bg-[#050b08] p-6 sm:p-8 rounded-xl border border-[#1e3b2b]">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4b56a] mb-6 text-center sm:text-left">
              INQUIRY FORM - APPLY NOW
            </h4>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#d4b56a] mx-auto animate-pulse" />
                <h5 className="font-display text-xl text-[#f2eee3]">Inquiry Submitted!</h5>
                <p className="text-xs text-[#9a9d95]">
                  Our publishing consultants will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name*"
                    className="w-full px-4 py-3 bg-[#0a1811] border border-[#1e3b2b] rounded text-xs text-white placeholder:text-[#52525b] outline-none focus:border-[#d4b56a] transition-colors"
                  />
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name*"
                    className="w-full px-4 py-3 bg-[#0a1811] border border-[#1e3b2b] rounded text-xs text-white placeholder:text-[#52525b] outline-none focus:border-[#d4b56a] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address*"
                    className="w-full px-4 py-3 bg-[#0a1811] border border-[#1e3b2b] rounded text-xs text-white placeholder:text-[#52525b] outline-none focus:border-[#d4b56a] transition-colors"
                  />
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number*"
                    className="w-full px-4 py-3 bg-[#0a1811] border border-[#1e3b2b] rounded text-xs text-white placeholder:text-[#52525b] outline-none focus:border-[#d4b56a] transition-colors"
                  />
                </div>

                <input
                  type="text"
                  name="bookDetails"
                  value={formData.bookDetails}
                  onChange={handleInputChange}
                  placeholder="Tell us About Your Book*"
                  className="w-full px-4 py-3 bg-[#0a1811] border border-[#1e3b2b] rounded text-xs text-white placeholder:text-[#52525b] outline-none focus:border-[#d4b56a] transition-colors"
                />

                <select
                  name="helpCategory"
                  value={formData.helpCategory}
                  onChange={handleInputChange}
                  aria-label="What Can We Help You With"
                  className="w-full px-4 py-3 bg-[#0a1811] border border-[#1e3b2b] rounded text-xs text-[#9a9d95] outline-none focus:border-[#d4b56a] transition-colors"
                >
                  <option value="">What Can We Help You With?*</option>
                  <option value="ghostwriting">Ghostwriting & Manuscript Creation</option>
                  <option value="editing">Proofreading & Structural Editing</option>
                  <option value="publishing">Full Self-Publishing Package</option>
                  <option value="marketing">Book Launch & Author Marketing</option>
                </select>

                <textarea
                  rows={2}
                  name="additionalHelp"
                  value={formData.additionalHelp}
                  onChange={handleInputChange}
                  placeholder="What's Your Additional Help? (Fill in any additional help)*"
                  className="w-full px-4 py-3 bg-[#0a1811] border border-[#1e3b2b] rounded text-xs text-white placeholder:text-[#52525b] outline-none focus:border-[#d4b56a] transition-colors"
                />

                <textarea
                  rows={3}
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  placeholder="Write any comments here"
                  className="w-full px-4 py-3 bg-[#0a1811] border border-[#1e3b2b] rounded text-xs text-white placeholder:text-[#52525b] outline-none focus:border-[#d4b56a] transition-colors"
                />

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#d4b56a] hover:bg-[#c59e4b] text-[#050807] font-bold text-xs tracking-widest uppercase rounded transition-colors shadow-md cursor-pointer"
                >
                  SUBMIT
                </button>
              </form>
            )}
          </div>
        </section>

        {/* 9. COMPREHENSIVE TRAINING AND SUPPORT FOR ASPIRING AUTHORS */}
        <section className="grid md:grid-cols-12 gap-8 items-center rounded-2xl border border-[#1e3b2b] bg-[#07130c] p-8 sm:p-10">
          <div className="md:col-span-5 h-[260px] sm:h-[300px] rounded-xl overflow-hidden border border-[#1e3b2b] relative bg-black/40">
            <Image
              src="/images/author-03.jpg"
              alt="Comprehensive Training and Support"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#d4b56a]">
              Comprehensive Training and Support for Aspiring Authors
            </h3>
            <h4 className="text-xs sm:text-sm font-medium text-[#dedacf]">
              Empowering You with the Knowledge and Tools to Launch Your Book Successfully.
            </h4>
            <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
              Our training programs and support resources are designed to guide you from idea to publication. From writing techniques to publishing strategies, we ensure you have everything you need to succeed.
            </p>
            <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
              With expert coaches and hands-on assistance, we ensure you have everything you need to succeed.
            </p>
            <div className="pt-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#d4b56a] text-[#d4b56a] hover:bg-[#d4b56a] hover:text-[#050807] text-xs font-bold tracking-widest uppercase rounded-[3px] transition-colors cursor-pointer"
              >
                <span>TRAINING AND SUPPORT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* 10. OPPORTUNITY BANNER */}
        <section className="rounded-2xl border border-[#1e3b2b] bg-[#07130c] p-8 sm:p-10 flex flex-col items-center text-center space-y-4">
          <div className="w-14 h-14 rounded-full border border-[#d4b56a] flex items-center justify-center text-[#d4b56a] bg-[#050b08]">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-normal text-[#d4b56a] max-w-3xl leading-snug">
            An Opportunity That Not Only Provides An Additional Stream Of Income But Also Feeds Another Business.
          </h3>
          <p className="text-xs sm:text-sm text-[#9a9d95] max-w-2xl leading-relaxed">
            Join The Publishing Hub and become a part of our mission to empower authors and entrepreneurs. SMC with our affiliate program is the perfect opportunity to grow your income while helping others turn their ideas into published books.
          </p>
          <div className="pt-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#d4b56a] hover:bg-[#c59e4b] text-[#050807] text-xs font-bold tracking-widest uppercase rounded-[3px] transition-colors cursor-pointer shadow-md"
            >
              <span>SCHEDULE A FACE-TO-FACE FIGHT NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* 11. 4-COLUMN VALUE PROPS GRID ("Everything You Need to Write and Publish at Your Own Pace") */}
        <section className="rounded-2xl border border-[#1e3b2b] bg-[#07130c] p-8 sm:p-12 text-center">
          <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#f2eee3] mb-2">
            Everything You Need to Write and Publish at Your Own Pace
          </h3>
          <p className="text-xs sm:text-sm text-[#9a9d95] mb-10 max-w-2xl mx-auto">
            Comprehensive resources, expert guidance, and a supportive community for your writing journey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                icon: PenTool,
                title: "Flexible Writing Support",
                desc: "12 months of expert guidance to help you write at your own pace.",
              },
              {
                icon: Users,
                title: "Expert Coaching",
                desc: "Access to professional coaches to refine your ideas and manuscript.",
              },
              {
                icon: BookOpen,
                title: "Publishing Resources",
                desc: "Tools, templates, and guides to simplify the publishing process.",
              },
              {
                icon: Share2,
                title: "Community & Support",
                desc: "Join our community of aspiring authors for encouragement and collaboration.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#050b08] border border-[#1e3b2b]/60 space-y-3 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full border border-[#d4b56a] flex items-center justify-center text-[#d4b56a]">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="font-display text-base font-semibold text-[#dedacf]">
                  {item.title}
                </h4>
                <p className="text-xs text-[#888b83] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#d4b56a] hover:bg-[#c59e4b] text-[#050807] text-xs font-bold tracking-widest uppercase rounded-[3px] transition-colors cursor-pointer shadow-md"
            >
              <span>READ MORE</span>
              <PlusCircle className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 12. BOTTOM CTA BANNER ("Got your book idea?") */}
        <section className="grid md:grid-cols-12 rounded-2xl border border-[#1e3b2b] bg-[#07130c] overflow-hidden items-center shadow-sm">
          <div className="md:col-span-4 h-[200px] md:h-full relative min-h-[180px] bg-black/40">
            <Image
              src="/images/author-02.jpg"
              alt="Published author"
              fill
              className="object-cover"
            />
          </div>

          <div className="md:col-span-4 p-6 sm:p-8 space-y-2 border-b md:border-b-0 md:border-r border-[#1e3b2b]">
            <h4 className="font-display text-xl sm:text-2xl font-normal text-[#d4b56a]">
              Got your book idea?
            </h4>
            <p className="text-xs text-[#9a9d95] leading-relaxed">
              Let&apos;s help you bring it to life. Take the first step toward becoming a published author today.
            </p>
          </div>

          <div className="md:col-span-4 p-6 sm:p-8 space-y-4 text-center md:text-left">
            <p className="text-xs font-medium text-[#dedacf]">
              Are you interested in staring a Publishing Your Book 1-2-1 with us?
            </p>
            <button
              type="button"
              className="w-full py-3 px-4 border border-[#d4b56a] text-[#d4b56a] hover:bg-[#d4b56a] hover:text-[#050807] text-[11px] font-bold tracking-wider uppercase rounded-[3px] transition-colors cursor-pointer"
            >
              SCHEDULE A FACE-TO-FACE FIGHT RIGHT NOW
            </button>
          </div>
        </section>

      </div>

       
      {/* DRAWERS & MODALS */}
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
