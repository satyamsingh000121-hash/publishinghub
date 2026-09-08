export interface SidebarPromoData {
  title: string;
  offer: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  isActive: boolean;
  badge?: string;
  imageUrl?: string;

  // Top Announcement Bar fields
  topBannerText?: string;
  topBannerButtonText?: string;
  topBannerButtonUrl?: string;
  topBannerActive?: boolean;

  // New Arrivals Special Offer Card fields (Home Page)
  newArrivalSubtitle?: string;
  newArrivalTitle?: string;
  newArrivalDiscount?: string;
  newArrivalDescription?: string;
  newArrivalButtonText?: string;
  newArrivalButtonUrl?: string;
  newArrivalImage?: string;
}
