"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OfferHeader from "@/components/offers/OfferHeader";
import OfferCard, { PackageOffer } from "@/components/offers/OfferCard";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import SmokyText from "@/components/SmokyText";
import { Check, X } from "lucide-react";

const PACKAGES: PackageOffer[] = [
  {
    id: "writers-legacy",
    title: "Writers Legacy Package",
    subtitle:
      "YOUR PATH TO PUBLISHING BEGINS HERE- NURTURE YOUR BOOK IDEA AT YOUR OWN PACE!",
    price: "£ 3,000",
    points: [
      {
        text: "Write your book at a relaxed pace with full support over 12 months.",
      },
      {
        text: "This package is perfect for entrepreneurs who want to craft their book with guidance, but without rushing.",
      },
      {
        subHeading: "Includes access to:",
        subPoints: [
          "A complete course",
          "Group coaching",
          "Templates",
          "An author community",
        ],
      },
      {
        text: "Provides everything you need to successfully publish your book at a steady, comfortable pace.",
      },
      {
        text: "Ideal for those seeking a well-rounded approach to self-publishing while balancing other commitments.",
      },
    ],
  },
  {
    id: "authors-accelerator",
    title: "Authors Accelerator Package",
    subtitle:
      "LAUNCH YOUR BOOK IN 6 MONTHS— FAST-TRACK YOUR DREAMS WITH OUR EXPERT GUIDANCE!",
    price: "£ 5,000",
    points: [
      {
        text: "Launch your book in 6 months with extensive support and self-driven control.",
      },
      {
        text: "The Accelerator Package is designed for driven entrepreneurs seeking a faster path to publishing.",
      },
      {
        subHeading: "This 6-month intensive program includes:",
        subPoints: [
          "Access to a detailed course",
          "Group coaching",
          "Hands-on tools",
        ],
      },
      {
        text: "Allows you to bring your book to life quickly while staying in control of the process.",
      },
      {
        text: "Includes continued post-launch support for an additional 6 months to ensure the book's success.",
      },
      {
        text: "Perfect for those who want to maintain control but desire the momentum to efficiently publish their book.",
      },
    ],
  },
  {
    id: "collaborative-launch",
    title: "The Collaborative Launch Packages",
    subtitle:
      "GET YOUR BOOK OUT IN JUST 3 MONTHS—COLLABORATE WITH OUR EXPERTS FOR SUCCESS!",
    price: "£ 10,000",
    points: [
      {
        text: "Get your book launched in just 3 months with tailored guidance and support.",
      },
      {
        text: "The Collaborative Launch Package is ideal for ambitious entrepreneurs.",
      },
      {
        text: "This package combines personalized coaching and expert assistance to fast-track your book's release.",
      },
      {
        subHeading:
          "A dedicated team will help you navigate the following processes in just 3 months:",
        subPoints: ["Writing", "Editing", "Marketing"],
      },
      {
        text: "Includes in-depth manuscript feedback and a customized marketing strategy.",
      },
      {
        text: "Offers invaluable insights from industry professionals.",
      },
      {
        text: "Perfect for those who want hands-on support while ensuring their unique voice shines through in their book.",
      },
    ],
  },
  {
    id: "vip-experience",
    title: "Thoughts Leaders VIP Experience Package",
    subtitle:
      "EXPERIENCE EFFORTLESS PUBLISHING – LET US TURN VISION INTO A BESTSELLER!",
    price: "£ 18,000",
    points: [
      {
        text: "Let us handle everything for you in just 3 months for a seamless publishing journey.",
      },
      {
        text: "The VIP Experience Package is the ultimate solution for entrepreneurs seeking a hassle-free path to publishing their book.",
      },
      {
        subHeading:
          "Our expert team will manage every aspect of your book's creation, including:",
        subPoints: [
          "Ghostwriting and editing",
          "Cover design",
          "Marketing",
        ],
      },
      {
        text: "Enjoy personalized support, professional-quality production, and a comprehensive book launch campaign.",
      },
      {
        text: "Everything is tailored to position you as an authority in your industry.",
      },
      {
        text: "Ideal for entrepreneurs who want to focus on their business while we bring their vision to life effortlessly.",
      },
    ],
  },
];

export default function OurOfferPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PackageOffer | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectPlan = (plan: PackageOffer) => {
    setSelectedPlan(plan);
  };

  const handleConfirmPlan = () => {
    if (selectedPlan) {
      setCartItems((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          title: selectedPlan.title,
          price: selectedPlan.price,
          quantity: 1,
        },
      ]);
      setToastMessage(`"${selectedPlan.title}" selected successfully!`);
      setSelectedPlan(null);
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#050807] text-[#f2eee3] flex flex-col font-sans selection:bg-[#b89245] selection:text-[#050807]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d2a1d] border border-[#d4b56a] text-[#f2eee3] px-4 py-3 rounded shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <Check className="w-4 h-4 text-[#d4b56a]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar with activeTab="OUR OFFER" */}
      <Navbar
        cartCount={totalCartCount}
        activeTab="OUR OFFER"
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Page Title & Breadcrumbs */}
      <OfferHeader />

      {/* Main Content Section */}
      <section className="py-16 sm:py-24 bg-[#050807] flex-1 relative overflow-hidden">
        {/* Background glow ambiance */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#185238]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative z-10">

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 px-4 flex justify-center">
            <SmokyText
              as="h2"
              text={"Unlock Exceptional Value with Our Exclusive\nPackage Offers!"}
              color="#f2eee3"
              intensity={9}
              appearTrigger="default"
              animationMode="singleLine"
              position="bottomLeft"
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-normal text-[#f2eee3] leading-snug tracking-tight text-center"
              appearTransition={{ type: "tween", ease: "easeOut", duration: 1.8, delay: 0.1 }}
            />
          </div>

          {/* 4 Packages Grid matching reference layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 xl:gap-8 items-stretch">
            {PACKAGES.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onSelectPlan={handleSelectPlan}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Site Footer */}
      <Footer />

      {/* Plan Selection Confirmation Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#09120d] border border-[#d4b56a]/50 rounded-lg p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-[#f2eee3]/10 pb-4">
              <div>
                <span className="text-[10px] tracking-[0.24em] text-[#d4b56a] font-bold uppercase block">
                  SELECTED PUBLISHING PLAN
                </span>
                <h3 className="font-display text-2xl text-[#f2eee3] font-medium mt-1">
                  {selectedPlan.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="text-[#888b83] hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-[#9a9d95]">
                {selectedPlan.subtitle}
              </p>
              <div className="p-4 bg-[#050a07] border border-[#f2eee3]/10 rounded-sm flex items-center justify-between">
                <span className="text-xs text-[#dedacf] font-semibold">Total Package Investment</span>
                <span className="font-display text-2xl text-[#d4b56a] font-bold">{selectedPlan.price}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedPlan(null)}
                className="px-5 py-2.5 border border-[#f2eee3]/20 hover:border-[#888b83] text-xs font-semibold text-[#dedacf] rounded-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPlan}
                className="px-6 py-2.5 bg-[#2c7650] hover:bg-[#37865d] text-white text-xs font-bold tracking-wider uppercase rounded-sm transition-colors shadow-lg"
              >
                Confirm Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawers and Search Modal */}
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
