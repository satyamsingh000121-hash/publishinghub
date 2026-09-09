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
}

export interface UpdateMeetTheAuthorPayload {
  authorName: string;
  authorImage: string;
  quote?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  bookIds: string[]; // List of product IDs in order
}
