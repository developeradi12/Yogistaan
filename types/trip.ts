export type Batch = { value: string; label: string; spots: number };
export type QuickFact = { label: string; value: string };
export type Activity = { icon: string; label: string };
export type ItineraryDay = {
  day: number;
  title: string;
  desc: string;
  activities: string[];
  meals: string;
};
export type Review = {
  name: string;
  from: string;
  date?: string;
  rating: number;
  text: string;
  img?: string;
  retreat?: string;
};
export type RatingBar = { label: string; pct: number };

export type Trip = {
  id: number;
  title: string;
  image: string;
  price: number;
  location: string;
  duration: string;
  places: string[];
  slug: string;
  galleryImages?: string[];
  highlights?: string[];
  activities?: Activity[];
  itinerary?: ItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  reviews?: Review[];
  ratingBars?: RatingBar[];
  batches?: Batch[];
  quickFacts?: QuickFact[];
  groupSize?: string;
  bestSeason?: string;
  certification?: string;
  overviewText?: string[];
};