export const categories = ["Yoga", "Meditation", "Adventure"];

export const trips = [
  {
    id: 1,
    title: "Rishikesh Yoga Retreat",
    category: "Yoga",
    location: "Rishikesh",
    price: 5999,
    duration: "5 Days / 4 Nights",
    rating: 4.8,
    reviews: 120,
      places: ["Ganga Aarti", "Laxman Jhula", "Parmarth Niketan"],
    image: "https://picsum.photos/400/300?random=3",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Check-in",
        detail:
          "Arrival at Rishikesh. Hotel check-in followed by leisure time. In the evening, attend the Ganga Aarti at Triveni Ghat.",
      },
      {
        day: 2,
        title: "Yoga & Meditation",
        detail:
          "Early morning yoga session followed by guided meditation. Breakfast at hotel. Evening free for local exploration.",
      },
      {
        day: 3,
        title: "Sightseeing",
        detail:
          "Visit Laxman Jhula, Ram Jhula, and nearby ashrams. Enjoy local markets and cafes.",
      },
      {
        day: 4,
        title: "Nature & Relaxation",
        detail:
          "Nature walk near Ganga river. Optional spa or wellness therapy session. Free evening.",
      },
      {
        day: 5,
        title: "Departure",
        detail:
          "Breakfast and checkout. Departure with peaceful memories.",
      },
    ],
    description:
      "Experience a peaceful yoga retreat in the spiritual town of Rishikesh with guided sessions, nature walks, and cultural exploration.",
  },
  {
    id: 2,
    title: "Himalayan Meditation Camp",
    category: "Meditation",
    location: "Himachal",
    price: 7999,
    duration: "7 Days / 6 Nights",
    rating: 4.7,
    reviews: 95,
    image: "https://picsum.photos/400/300?random=1",
    places: ["Silent Retreat", "Mountain Stay", "Guided Meditation"],
  },
  {
    id: 3,
    title: "Goa Adventure Trip",
    category: "Adventure",
    location: "Goa",
    price: 4999,
    duration: "4 Days / 3 Nights",
    rating: 4.5,
    reviews: 200,
    image: "https://picsum.photos/400/300?random=2",
    places: ["Water Sports", "Beach Party", "Sightseeing"],
  },
];