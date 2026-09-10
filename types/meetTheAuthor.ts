export interface MeetTheAuthorBookItem {
  id: string; // Product id
  title: string;
  author: string;
  price: string;
  oldPrice?: string;
  image: string;
  slug?: string;
  badge?: string;
  order: number;
}

export interface MeetTheAuthorProfileData {
  id: string;
  authorName: string;
  authorImage: string;
  quote?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  books: MeetTheAuthorBookItem[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateMeetTheAuthorPayload {
  authorName: string;
  authorImage?: string;
  quote?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  bookIds?: string[]; // List of product IDs in display order
}

export interface UpdateMeetTheAuthorPayload {
  id?: string;
  authorName: string;
  authorImage?: string;
  quote?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  bookIds?: string[]; // List of product IDs in display order
}
