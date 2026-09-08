import { SidebarPromoData } from "@/types/promo";

/**
 * ============================================================================
 * Admin Promotional Banners Configuration
 * ============================================================================
 */
export const defaultAdminPromoData: SidebarPromoData = {
  title: "Summer Sale",
  offer: "UP TO 45% OFF",
  description: "ON SELECTED BOOKS",
  buttonText: "View Offers",
  buttonUrl: "/shop",
  isActive: true,
  badge: "SPECIAL OFFER",
  imageUrl: "/images/book_section1.png",

  // Top Announcement Banner (Navbar)
  topBannerText: "SUMMER SALE IS LIVE — GET UP TO 45% OFF ON SELECTED BOOKS!",
  topBannerButtonText: "SHOP NOW",
  topBannerButtonUrl: "/shop",
  topBannerActive: true,

  // New Arrivals Special Offer Card (Home Page)
  newArrivalSubtitle: "Get Extra",
  newArrivalTitle: "Sale",
  newArrivalDiscount: "-25%",
  newArrivalDescription: "ON ORDER OVER £100",
  newArrivalButtonText: "VIEW MORE",
  newArrivalButtonUrl: "/shop",
  newArrivalImage: "/images/Gemini_Generated_Image_n0hwhvn0hwhvn0hw-Photoroom.png",
};
