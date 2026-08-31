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

export default function CollaborativeLaunchPage() {
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
                activeTab="The Collaborative Launch Packages"
                onOpenCart={() => setIsCartOpen(true)}
                onOpenSearch={() => setIsSearchOpen(true)}
            />

            {/* 2. BREADCRUMB HEADER */}
            <section className="border-b border-[#1e3b2b]/60 bg-[#060d09] py-8 sm:py-10">
                <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#f2eee3] tracking-tight">
                       Thought Leaders VIP Experience Package
                    </h1>
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#888b83]">
                        <Link href="/" className="hover:text-[#d4b56a] transition-colors">
                            Home
                        </Link>
                        <span className="text-[#888b83]/60">/</span>
                        <span className="text-[#d4b56a]">Thought Leaders VIP Experience Package</span>
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
                            alt="Authors Accelerator Book Background"
                            fill
                            className="object-cover object-center opacity-90"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/45 backdrop-brightness-95" />
                    </div>

                    <div className="relative z-10 max-w-5xl lg:max-w-6xl mx-auto space-y-4 sm:space-y-6 px-4">
                        <span className="inline-block text-sm sm:text-base font-normal font-serif text-white tracking-wide">
                          Thought Leaders VIP Experience Package
                    </span>

                        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium text-white leading-tight drop-shadow-md">
                           Effortless Publishing for Visionaries – Let Us Build Your Bestseller
                        </h2>

                        <p className="text-xs sm:text-sm md:text-base text-white/95 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
                           From concept to bestseller—let us handle everything so you can focus on your vision.
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
                                <span>Let’s Create Your Bestseller!</span>
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
                        Discover how our tailored publishing packages can bring your vision to life. Let us guide you every step of the way!
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
                         Effortless Publishing for Visionaries.
                        </h3>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                            Let us bring your vision to life with the Thought Leaders VIP Experience Package.
                        </p>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                           This premium offering is designed for entrepreneurs who want to publish their book with zero hassle. Our team takes care of everything—from ghostwriting and editing to cover design, marketing, and launch strategy. 
                        </p>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                           In just three months, your book will be professionally crafted, published, and positioned as a bestseller. With a focus on quality and customization, this package ensures your book reflects your expertise and elevates your brand. Perfect for busy thought leaders ready to make an impact without sacrificing their time.
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
                            src="/images/ChatGPT Image Aug 29, 2026, 01_26_43 PM.png"
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
                           Effortless Publishing, Fully Managed for You.
                        </h3>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                           Want to publish your book without lifting a finger? The Thought Leaders VIP Experience Package is a premium, all-inclusive service that takes care of every aspect of your book’s creation, from ghostwriting to marketing. 
                        </p>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                          Book a video call with our team to discuss your vision and discover how we can create a professionally crafted, bestseller-worthy book for you.
                        </p>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                           On this call, we’ll outline the process, answer your questions, and ensure this package is the perfect fit for your needs. Focus on your business while we handle the rest.
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
                                Request A Call Back
                            </button>
                            <button
                                type="button"
                                className="py-3.5 px-4 border border-[#1e3b2b] bg-[#050b08] hover:border-[#d4b56a] hover:text-[#d4b56a] text-[#dedacf] text-xs font-bold tracking-wider uppercase rounded-[3px] text-center transition-colors cursor-pointer"
                            >
                                Book A Video Call
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* 7. QUICK ACTION CALLBACK BANNER (100% FULL WIDTH END-TO-END) */}
            <section className="w-full relative overflow-hidden border-y border-[#1e3b2b]/90 bg-[#0b1c14] py-12 sm:py-16 shadow-[0_20px_50px_rgba(0,0,0,0.8)] my-4">
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-5">
                    <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight drop-shadow-sm">
                       Effortless Publishing for Visionaries!

                    </h3>
                    <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
                       Request a call back to discuss how we can handle everything and deliver a bestseller-worthy book for you.
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
                           Effortless Publishing for Visionaries!
                        </h3>
                        <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
                            Submit Your Inquiry to Learn How We Can Create Your Bestseller for You.
                        </p>
                        <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
                           For busy professionals and entrepreneurs, the Thought Leaders VIP Experience Package offers a seamless, hands-off publishing solution.
                        </p>
                        <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
                           In just three months, our team will manage every aspect of your book’s creation, including ghostwriting, editing, cover design, and marketing. Tailored to your unique vision, this package ensures that your book is not only professionally crafted but also strategically positioned to elevate your brand and authority.
                        </p>
                        <p className="text-xs sm:text-sm text-[#9a9d95] leading-relaxed">
                            Submit your inquiry today to discuss how we can handle every detail of your publishing journey. Focus on your business while we turn your ideas into a high-quality, bestseller-worthy book!
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
                            src="/images/ChatGPT Image Aug 29, 2026, 03_06_26 PM.png"
                            alt="Comprehensive Training and Support"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="md:col-span-7 space-y-6">
                        <h3 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#d4b56a] leading-tight">
                           Effortless Training and End-to-End Support for Visionary Leaders
                        </h3>
                        <h4 className="text-sm sm:text-base font-semibold text-[#dedacf]">
                            Allowing You to Focus on Your Vision While We Handle Every Detail of Your Book Launch.
                        </h4>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                           The Thought Leaders VIP Experience Package is designed for busy professionals who want to publish a book without the hassle of managing the details.
                        </p>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                           With this premium package, our team takes care of everything—ghostwriting, editing, cover design, and marketing—while also providing you with insights and guidance to ensure your book aligns perfectly with your vision.
                        </p>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                           We’ll walk you through the process, offering tailored support where needed, and equip you with the knowledge to leverage your book as a powerful tool for personal and professional growth.
                        </p>
                        <p className="text-sm sm:text-base text-[#9a9d95] leading-relaxed">
                           This package ensures that every element of your book is handled with precision and expertise, positioning it for maximum impact. From initial concept to bestseller status, our team delivers a seamless experience that saves you time while amplifying your authority.
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
            </div>

            {/* 10. OPPORTUNITY BANNER (100% FULL WIDTH END-TO-END) */}
            <section className="w-full relative overflow-hidden border-y border-[#1e3b2b]/90 bg-[#0b1c14] py-14 sm:py-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] my-4">
                <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6">
                    {/* Animated Golden Icon with Glow Ring */}
                    <div className="relative group">
                        <div className="absolute -inset-2 rounded-full bg-[#d4b56a]/25 blur-lg animate-pulse" />
                        <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-[#d4b56a] flex items-center justify-center text-[#d4b56a] bg-[#050b08] shadow-[0_0_30px_rgba(212,181,106,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:border-[#f5e2b3]">
                            <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce stroke-[2.5]" style={{ animationDuration: "2.2s" }} />
                        </div>
                    </div>

                    {/* Enhanced Headline with Premium Typography (EXACTLY 2 LINES) */}
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium leading-snug max-w-5xl mx-auto tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#fae8be] via-[#d4b56a] to-[#c59e4b] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                        An Opportunity That Not Only Provides An Additional Stream Of Income <br className="hidden sm:inline" />But Also Feeds Another Business.
                    </h3>
                    <p className="text-sm sm:text-base text-[#9a9d95] max-w-2xl mx-auto leading-relaxed">
                        As the “go-to” people, Regional Directors play a prominent role. Besides increasing your income, The publishing hub will also allow you to promote and sell your products and services more effectively because it will connect you with more local and national businesses.
                    </p>
                    <div className="pt-2">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#d4b56a] hover:bg-[#c59e4b] text-[#050807] text-xs sm:text-sm font-bold tracking-widest uppercase rounded-[3px] transition-all duration-200 cursor-pointer shadow-xl active:scale-95"
                        >
                            <span>
                                SCHEDULE A FACE-TO-FACE RIGHT NOW</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* CONTAINER FOR SECTIONS 11 & 12 */}
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-8 sm:space-y-10">

                {/* 11. 2-COLUMN FEATURE SECTION (MATCHING REFERENCE IMAGE 1) */}
                <section className="relative rounded-2xl border border-[#1e3b2b] bg-[#07130c] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-2xl">
                    {/* Subtle Background Image Overlay */}
                    <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
                        <Image
                            src="/images/author-01.jpg"
                            alt="Background decoration"
                            fill
                            className="object-cover object-center filter grayscale brightness-125"
                        />
                        <div className="absolute inset-0 bg-[#07130c]/85" />
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                        {/* Header */}
                        <div className="text-center space-y-3">
                            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-normal text-white tracking-tight leading-tight">
                                Bring Your Book to Life in Just 3 Months <br className="hidden sm:inline" />with Expert Help
                            </h3>
                            <p className="text-xs sm:text-sm md:text-base text-[#9a9d95] max-w-2xl mx-auto">
                                Professional guidance and collaboration to ensure a polished, successful book.
                            </p>
                        </div>

                        {/* 2-Column Content List */}
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 pt-4 text-xs sm:text-sm text-[#dedacf] leading-relaxed">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <p className="text-[#f2eee3] font-medium">
                                    The Collaborative Launch Package is tailored for ambitious individuals who want to publish their book quickly while benefiting from expert support. Here’s what’s included:
                                </p>
                                <p>
                                    <strong className="text-white font-semibold">Personalized Coaching:</strong>Work closely with professionals to refine your book and prepare it for publishing.
                                </p>
                                <p>
                                    <strong className="text-white font-semibold">Manuscript Feedback:</strong> In-depth critique and editing to ensure a high-quality final product.
                                </p>
                                <p>
                                    <strong className="text-white font-semibold">Custom Marketing Strategy:</strong>Guidance on positioning your book for success in the market.
                                </p>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <p>
                                    <strong className="text-white font-semibold">Hands-On Assistance:</strong>Support for writing, editing, and navigating the publishing process.
                                </p>
                                <p>
                                    <strong className="text-white font-semibold">Accelerated Timeline: </strong>Publish a polished and professional book in just three months.
                                </p>
                                <p className="pt-2 text-[#9a9d95]">
                                   This package is ideal for entrepreneurs and visionaries seeking rapid results without compromising on quality.
                                </p>
                            </div>
                        </div>

                        {/* Centered Action Button */}
                        <div className="pt-4 flex justify-center">
                            <button
                                type="button"
                                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#e67e22] hover:bg-[#d35400] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-full border border-white/40 shadow-xl transition-all duration-200 cursor-pointer active:scale-95 group"
                            >
                                <span>READ MORE</span>
                                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#e67e22] group-hover:translate-x-0.5 transition-transform">
                                    <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* 12. BOTTOM CTA FULL-WIDTH BANNER (GREEN CARD ON BOTTOM LINE) */}
            <section className="relative w-full min-h-[400px] sm:min-h-[480px] lg:min-h-[520px] flex items-end justify-center mt-6 sm:mt-8 mb-44 sm:mb-56 md:mb-64">
                {/* Full-bleed Background Image with Bottom Line */}
                <div className="absolute inset-0 z-0 overflow-hidden border-y border-[#1e3b2b]/90 bg-[#07130c]">
                    <Image
                        src="/images/2222.png"
                        alt="Smiling Author Background"
                        fill
                        className="object-cover object-top brightness-95 contrast-105"
                    />
                    <div className="absolute inset-0 bg-black/20 backdrop-brightness-95" />
                </div>

                {/* Floating Centered Dark Card Positioned Exactly on the Bottom Line */}
                <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 translate-y-1/2">
                    <div className="relative rounded-xl border border-[#1e3b2b]/90 bg-[#0b1c14] backdrop-blur-md p-6 sm:p-8 md:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
                        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                            {/* Left Column */}
                            <div className="space-y-2.5 text-left md:pr-4">
                                <h4 className="text-sm sm:text-base font-semibold text-white">
                                    Got your voucher code?
                                </h4>
                                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                                    Let&apos;s bring your story to Life. Take the next step and book your discovery call today!
                                </p>
                                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                                    Let&apos;s explore how we can help you achieve your goals.
                                </p>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col items-center justify-center text-center space-y-3 md:pl-4">
                                <p className="text-xs sm:text-sm font-medium text-white/95 leading-snug">
                                    Are you interested in starting a Publishing Your Book ?
                                </p>
                                <p className="text-xs sm:text-sm font-semibold text-white">
                                    Let&apos;s talk!
                                </p>
                                <div className="pt-1 w-full flex justify-center">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-[#e67e22] hover:bg-[#d35400] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-full border border-white/40 shadow-xl transition-all duration-200 cursor-pointer active:scale-95 group"
                                    >
                                        <span>SCHEDULE A FACE-TO-FACE RIGHT NOW</span>
                                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#e67e22] group-hover:translate-x-0.5 transition-transform shrink-0">
                                            <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Perfectly Centered Vertical Divider Line */}
                        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[70%] bg-white/20" />
                    </div>
                </div>
            </section>

            {/* 13. FOOTER */}
            <Footer />

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
