import type { Testimonial } from "../types/index";

// ─────────────────────────────────────────────
// TESTIMONIALS — Admin Panel Configuration
// Toggle active: false to hide from homepage.
// sortOrder controls display order.
// ─────────────────────────────────────────────

const testimonialsData: Testimonial[] = [
  {
    id: "testimonial_sarah",         // ← ADMIN KEYWORD
    stars: 5,
    quote:
      "I came as a stressed banker and left as a yoga teacher. The Rishikesh YTT literally rewired my nervous system. Nothing short of miraculous.",
    name: "Sarah Mitchell",
    from: "London, UK",
    retreat: "200-Hr YTT · Rishikesh",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=80&h=80&auto=format&fit=crop&q=80",
    active: true,
    sortOrder: 1,
  },
  {
    id: "testimonial_marcus",        // ← ADMIN KEYWORD
    stars: 5,
    quote:
      "The Kerala Ayurveda retreat was flawless from booking to departure. The seamless experience, sacred teachers, and stunning backwaters — I'm going back next year.",
    name: "Marcus Henriksen",
    from: "Stockholm, Sweden",
    retreat: "Ayurveda Retreat · Kerala",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&auto=format&fit=crop&q=80",
    active: true,
    sortOrder: 2,
  },
  {
    id: "testimonial_priya",         // ← ADMIN KEYWORD
    stars: 5,
    quote:
      "Booking through Yogistaan was effortless — instant confirmation, detailed prep materials, and a guide who met me at Denpasar airport. Bali exceeded every expectation.",
    name: "Priya Nair",
    from: "Mumbai, India",
    retreat: "10-Day Retreat · Ubud, Bali",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&auto=format&fit=crop&q=80",
    active: true,
    sortOrder: 3,
  },
  {
    id: "testimonial_arjun",         // ← ADMIN KEYWORD
    stars: 5,
    quote:
      "The Everest Base Camp trek with daily yoga was unlike anything I've experienced. Reaching 5,364 metres while maintaining my practice — pure magic.",
    name: "Arjun Sharma",
    from: "Delhi, India",
    retreat: "EBC Trek · Nepal",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&auto=format&fit=crop&q=80",
    active: true,
    sortOrder: 4,
  },
  {
    id: "testimonial_elena",         // ← ADMIN KEYWORD
    stars: 5,
    quote:
      "Kailash Mansarovar Yatra changed my life forever. The guides, the logistics, the spiritual preparation — everything was handled with extraordinary care.",
    name: "Elena Voronova",
    from: "Moscow, Russia",
    retreat: "Kailash Yatra · Tibet",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&auto=format&fit=crop&q=80",
    active: true,
    sortOrder: 5,
  },
  {
    id: "testimonial_james",         // ← ADMIN KEYWORD
    stars: 5,
    quote:
      "The D Fest experience at Rishikesh connected me with a global community of seekers. Five days of transformation, music, and deep inner work.",
    name: "James O'Brien",
    from: "Dublin, Ireland",
    retreat: "D Fest · Rishikesh",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&auto=format&fit=crop&q=80",
    active: true,
    sortOrder: 6,
  },
];

export default testimonialsData;
