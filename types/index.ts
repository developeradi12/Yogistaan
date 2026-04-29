
export interface TripItem {
  id: number;
  title: string;
  image: string;
  price: number;
  location: string;
  duration: string;
  places: string[];
  slug?: string;
}

/** Store / product card fields */
export interface StoreItem {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: string | null;
  slug?: string;
}

export type CategoryItem = TripItem

/** One category section shown on homepage */
export type CategoryType = "academy" | "retreat" | "adventure" | "fest" | "tirth";

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  items: CategoryItem[];
  active: boolean;
  slug: string;
  bannerImage?: string;
  description?: string;  
}


// ── Testimonials ───────────────────────────────

export interface Testimonial {
  id: string;             // admin keyword — e.g. "testimonial_sarah"
  stars: 1 | 2 | 3 | 4 | 5;
  quote: string;
  name: string;
  from: string;
  retreat: string;
  img: string;
  active: boolean;
  sortOrder: number;
}


export interface Milestone {
  year: string;
  label: string;
  value: string;
}

// ── FAQ Page ───────────────────────────────────

export interface FaqItem {
  id: string;             // admin keyword — e.g. "faq_booking_process"
  question: string;
  answer: string;
  category: string;
  active: boolean;
  sortOrder: number;
}

// ── Contact Page ───────────────────────────────

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

// ── Announcement Bar ───────────────────────────

export interface Announcement {
  id: string;             // admin keyword
  text: string;
  linkText?: string;
  linkHref?: string;
  active: boolean;
}
