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
    Play,
} from "lucide-react";

export default function WritersLegacyPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        businessName: "",
        franchiseType: "",
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
                businessName: "",
                franchiseType: "",
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

                {/* 5. SPLIT SECTION 1: "Craft Your Book at Your Own Pace!" (INCREASED HEIGHT) */}
                <section className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center rounded-2xl border border-[#1e3b2b] bg-[#07130c] p-8 sm:p-12 lg:p-16 min-h-[460px] md:min-h-[520px]">
                    <div className="md:col-span-6 space-y-6">
                        <h3 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#d4b56a] leading-tight">
                            Craft Your Book at Your Own Pace!
                        </h3>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                            The Writer’s Legacy Package is designed for aspiring authors who want to write their book on their own schedule, with full support along the way. Over 12 months, you’ll gain access to a step-by-step course, group coaching sessions, ready-to-use templates, and a supportive author community.
                        </p>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                            Whether you’re refining an idea or starting from scratch, this package provides the flexibility and resources to ensure your book is written and published successfully—at a relaxed pace that fits your lifestyle.
                        </p>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                            Perfect for entrepreneurs, professionals, and storytellers seeking to leave their mark.
                        </p>
                        <div className="pt-4">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#d4b56a] text-[#d4b56a] hover:bg-[#d4b56a] hover:text-[#050807] text-xs font-bold tracking-widest uppercase rounded-[3px] transition-all duration-300 cursor-pointer shadow-md"
                            >
                                <span>DOWNLOAD THE BROCHURE</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-6 h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px] rounded-xl overflow-hidden border border-[#1e3b2b] relative bg-black/40">
                        <Image
                            src="/images\ChatGPT Image Aug 29, 2026, 01_26_43 PM.png"
                            alt="Consultation meeting"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </section>

                {/* 6. SPLIT SECTION 2: "Let's Bring Your Book to Life at Your Own Pace!" (INCREASED HEIGHT) */}
                <section className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center rounded-2xl border border-[#1e3b2b] bg-[#07130c] p-8 sm:p-12 lg:p-16 min-h-[460px] md:min-h-[520px]">
                    <div className="md:col-span-6 space-y-6">
                        <h3 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#d4b56a] leading-tight">
                            Let&apos;s Bring Your Book to Life at Your Own Pace!
                        </h3>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                            Ready to take the first step in crafting your book? The Writer’s Legacy Package offers you a flexible and supportive 12-month journey to turn your ideas into a published masterpiece.
                        </p>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                            Book a free call with one of our experts today to discuss how this program can help you bring your vision to life.
                        </p>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                            Learn more about the resources, coaching, and community you’ll receive as you embark on this fulfilling writing journey.
                        </p>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                            Whether you’re just starting out or have a clear vision for your book, we’re here to guide you every step of the way.
                        </p>
                        <div className="pt-4">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#d4b56a] text-[#d4b56a] hover:bg-[#d4b56a] hover:text-[#050807] text-xs font-bold tracking-widest uppercase rounded-[3px] transition-all duration-300 cursor-pointer shadow-md"
                            >
                                <span>BOOK A CALL NOW</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-6 space-y-4">
                        <div className="relative h-[340px] sm:h-[400px] md:h-[460px] lg:h-[480px] w-full rounded-2xl overflow-hidden border border-[#1e3b2b] bg-black shadow-2xl group">
                            {isVideoPlaying ? (
                                <iframe
                                    className="w-full h-full absolute inset-0"
                                    src="https://www.youtube-nocookie.com/embed/NRYbLvlPFZE?autoplay=1&rel=0&modestbranding=1"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            ) : (
                                <div
                                    className="relative w-full h-full cursor-pointer flex items-center justify-center"
                                    onClick={() => setIsVideoPlaying(true)}
                                >
                                    <Image
                                        src="/images/video_img.png"
                                        alt="Watch Video"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />

                                    {/* Play Button Overlay matching screenshot exactly (White circular outline with white play triangle) */}
                                    <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[3.5px] border-white/90 bg-black/20 backdrop-blur-[2px] flex items-center justify-center shadow-[0_0_35px_rgba(255,255,255,0.4)] group-hover:scale-110 group-hover:border-white group-hover:bg-black/35 transition-all duration-300">
                                        <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1.5 drop-shadow-md" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="py-3.5 px-4 border border-[#1e3b2b] bg-[#050b08] hover:border-[#d4b56a] hover:text-[#d4b56a] text-[#dedacf] text-xs font-bold tracking-wider uppercase rounded-[3px] text-center transition-colors cursor-pointer"
                            >
                                REQUEST A CALLBACK
                            </button>
                            <button
                                type="button"
                                className="py-3.5 px-4 border border-[#1e3b2b] bg-[#050b08] hover:border-[#d4b56a] hover:text-[#d4b56a] text-[#dedacf] text-xs font-bold tracking-wider uppercase rounded-[3px] text-center transition-colors cursor-pointer"
                            >
                                BOOK A VIDEO CALL
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* 7. QUICK ACTION CALLBACK BANNER (100% FULL WIDTH END-TO-END) */}
            <section className="w-full relative overflow-hidden border-y border-[#1e3b2b]/90 bg-[#0b1c14] py-12 sm:py-16 shadow-[0_20px_50px_rgba(0,0,0,0.8)] my-4">
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-5">
                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight drop-shadow-sm">
                        Start Your Writing Journey with Us!
                    </h3>
                    <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
                        Request a call back to learn how we can help you turn your ideas into a published book at your own pace.
                    </p>
                    <div className="pt-2 flex justify-center">
                        <button
                            type="button"
                            className="inline-flex items-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 bg-[#e67e22] hover:bg-[#d35400] text-white text-sm sm:text-base font-bold rounded-full border border-white/40 shadow-xl transition-all duration-200 cursor-pointer active:scale-95 group"
                        >
                            <span>Request A Call Back</span>
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#e67e22] group-hover:translate-x-0.5 transition-transform">
                                <ChevronRight className="w-4 h-4 stroke-[3]" />
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* CONTAINER FOR REMAINING SECTIONS */}
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-8 sm:space-y-10">

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
                            Are you ready to turn your ideas into a published book while enjoying the flexibility to work at your own pace? The Writer’s Legacy Package offers you a 12-month program tailored to help you bring your vision to life.
                        </p>
                        <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
                            With access to an in-depth course, group coaching, ready-made templates, and a supportive author community, this package is ideal for individuals seeking a structured yet relaxed writing journey.
                        </p>
                        <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
                            Whether you’re just starting or need guidance to refine your ideas, we’re here to provide expert support every step of the way.
                        </p>
                        <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
                            Submit your inquiry today, and our team will provide all the information you need to get started. Together, we can turn your dream of becoming an author into reality!
                        </p>

                        <div className="pt-4 border-t border-[#1e3b2b] space-y-2 text-xs text-[#dedacf]">
                            <p>
                                Call us on:{" "}
                                <a href="tel:+4401214967890" className="text-[#d4b56a] hover:underline font-semibold">
                                    +02380 970305
                                </a>{" "}
                                (we are open 9AM-5PM, Monday-Friday)
                            </p>
                            <p>
                                <a href="mailto:hello@thepublishinghub.com" className="text-[#d4b56a] hover:underline font-semibold">
                                    hello@thepublishinghub.com
                                </a>{" "}
                                to get started!
                            </p>
                        </div>
                    </div>

                    {/* Right: Form (EXPANDED HEIGHT & SPACIOUS GAPS) */}
                    <div className="lg:col-span-7 bg-[#050b08] p-8 sm:p-10 lg:p-12 rounded-2xl border border-[#1e3b2b] shadow-2xl">
                        <h4 className="text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-[#d4b56a] mb-8 text-center drop-shadow-sm">
                            ENQUIRY FORM - APPLY NOW
                        </h4>

                        {formSubmitted ? (
                            <div className="py-16 text-center space-y-4">
                                <CheckCircle2 className="w-14 h-14 text-[#d4b56a] mx-auto animate-pulse" />
                                <h5 className="font-display text-2xl text-[#f2eee3]">Inquiry Submitted!</h5>
                                <p className="text-sm text-[#9a9d95]">
                                    Our publishing consultants will contact you within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-5 sm:space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <input
                                        type="text"
                                        required
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="First Name*"
                                        className="w-full px-5 py-3.5 sm:py-4 bg-[#0a1811] border border-[#1e3b2b] rounded-md text-xs sm:text-sm text-white placeholder:text-[#52525b] outline-none focus:border-[#d4b56a] transition-colors"
                                    />
                                    <input
                                        type="text"
                                        required
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Last Name*"
                                        className="w-full px-5 py-3.5 sm:py-4 bg-[#0a1811] border border-[#1e3b2b] rounded-md text-xs sm:text-sm text-white placeholder:text-[#52525b] outline-none focus:border-[#d4b56a] transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <input
                                        type="tel"
                                        required
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Mobile Number*"
                                        className="w-full px-5 py-3.5 sm:py-4 bg-[#0a1811] border border-[#1e3b2b] rounded-md text-xs sm:text-sm text-white placeholder:text-[#52525b] outline-none focus:border-[#d4b56a] transition-colors"
                                    />
                                    <input
                                        type="text"
                                        required
                                        name="businessName"
                                        value={formData.businessName}
                                        onChange={handleInputChange}
                                        placeholder="Business Name*"
                                        className="w-full px-5 py-3.5 sm:py-4 bg-[#0a1811] border border-[#1e3b2b] rounded-md text-xs sm:text-sm text-white placeholder:text-[#52525b] outline-none focus:border-[#d4b56a] transition-colors"
                                    />
                                </div>

                                <input
                                    type="email"
                                    required
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email Address*"
                                    className="w-full px-5 py-3.5 sm:py-4 bg-[#0a1811] border border-[#1e3b2b] rounded-md text-xs sm:text-sm text-white placeholder:text-[#52525b] outline-none focus:border-[#d4b56a] transition-colors"
                                />

                                <div className="space-y-2">
                                    <label className="block text-xs sm:text-sm font-semibold text-[#dedacf]">
                                        Franchise Type*
                                    </label>
                                    <select
                                        required
                                        name="franchiseType"
                                        value={formData.franchiseType}
                                        onChange={handleInputChange}
                                        aria-label="Franchise Type"
                                        className="w-full px-5 py-3.5 sm:py-4 bg-[#0a1811] border border-[#1e3b2b] rounded-md text-xs sm:text-sm text-white outline-none focus:border-[#d4b56a] transition-colors cursor-pointer"
                                    >
                                        <option value="">—Please choose an option—</option>
                                        <option value="Associate Franchise">Associate Franchise</option>
                                        <option value="Partner Franchise">Partner Franchise</option>
                                        <option value="Business Owner Franchise">Business Owner Franchise</option>
                                        <option value="Regional Franchise">Regional Franchise</option>
                                    </select>
                                </div>

                                <textarea
                                    rows={4}
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleInputChange}
                                    placeholder="Write any comments here"
                                    className="w-full px-5 py-3.5 sm:py-4 bg-[#0a1811] border border-[#1e3b2b] rounded-md text-xs sm:text-sm text-white placeholder:text-[#52525b] outline-none focus:border-[#d4b56a] transition-colors"
                                />

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full py-4 sm:py-4.5 bg-[#e67e22] hover:bg-[#d35400] text-white font-bold text-sm tracking-widest uppercase rounded-md transition-all duration-200 shadow-xl cursor-pointer active:scale-95"
                                    >
                                        SUBMIT
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </section>

                {/* 9. COMPREHENSIVE TRAINING AND SUPPORT FOR ASPIRING AUTHORS (INCREASED HEIGHT) */}
                <section className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center rounded-2xl border border-[#1e3b2b] bg-[#07130c] p-8 sm:p-12 lg:p-16 min-h-[460px] md:min-h-[500px]">
                    <div className="md:col-span-5 h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px] rounded-xl overflow-hidden border border-[#1e3b2b] relative bg-black/40">
                        <Image
                            src="/images/author-03.jpg"
                            alt="Comprehensive Training and Support"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="md:col-span-7 space-y-6">
                        <h3 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#d4b56a] leading-tight">
                            Comprehensive Training and Support for Aspiring Authors
                        </h3>
                        <h4 className="text-sm sm:text-base font-semibold text-[#dedacf]">
                            Empowering You with the Knowledge and Tools to Launch Your Book Successfully.
                        </h4>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                            Our training programs and support resources are designed to guide you from idea to publication. From writing techniques to publishing strategies, we ensure you have everything you need to succeed.
                        </p>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                            With expert coaches and hands-on assistance, we ensure you have everything you need to succeed.
                        </p>
                        <div className="pt-3">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#d4b56a] text-[#d4b56a] hover:bg-[#d4b56a] hover:text-[#050807] text-xs font-bold tracking-widest uppercase rounded-[3px] transition-all duration-300 cursor-pointer shadow-md"
                            >
                                <span>TRAINING AND SUPPORT</span>
                                <ArrowRight className="w-4 h-4" />
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
