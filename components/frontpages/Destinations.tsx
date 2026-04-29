"use client";

import DestinationCard from "./DestCard";
import SectionLabel from "./SectionLabel";

const DESTINATIONS = [
  {
    country: "India · Uttarakhand",
    name: "Rishikesh",
    tag: "Yoga Capital of World",
    count: "124 retreats",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&auto=format&fit=crop&q=80",
    hero: true,
  },
  {
    country: "Indonesia · Bali",
    name: "Ubud, Bali",
    tag: "Island Sanctuary",
    count: "89 retreats",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80",
  },
  {
    country: "India · Karnataka",
    name: "Mysore",
    tag: "Ashtanga Birthplace",
    count: "56 retreats",
    img: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=600&auto=format&fit=crop&q=80",
  },
  {
    country: "Nepal · Himalayas",
    name: "Kathmandu",
    tag: "Mountain Retreat",
    count: "41 retreats",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=80",
  },
  {
    country: "India · Kerala",
    name: "Kerala",
    tag: "Ayurveda & Yoga",
    count: "63 retreats",
    img: "/category/kerela.jpg",
  },
  {
    country: "India · Goa",
    name: "Goa",
    tag: "Ayurveda & Yoga",
    count: "63 retreats",
    img: "/category/goa.jpg",
  },
];

const Destinations = () => {
  return (
    <section className="py-12 sm:py-14 lg:py-16 px-4 sm:px-8 lg:px-14">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 lg:mb-11 gap-6">
          <div>
            <SectionLabel center="">Top Destinations</SectionLabel>

            <h2
              className="font-bold text-[#1C3A2F] leading-tight mt-2"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(26px,4vw,46px)",
              }}
            >
              Sacred Places to
              <br />
              <em className="not-italic text-[#C4622A]">
                Practice & Transform
              </em>
            </h2>

            <p className="text-[#7A7A72] text-sm sm:text-base font-light leading-relaxed mt-3 max-w-xl">
              Handpicked spiritual hubs where ancient yoga lineages are alive
              and breathing, waiting for you.
            </p>
          </div>

          <a
            href="#"
            className="text-sm font-medium text-[#1C3A2F] border-b border-[#1C3A2F] pb-0.5 hover:text-[#C4622A] hover:border-[#C4622A] transition-colors whitespace-nowrap"
          >
            View all destinations →
          </a>
        </div>

        {/* Responsive Grid */}
        <div
          className="
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            auto-rows-[220px]
            sm:auto-rows-[250px]
            lg:auto-rows-[300px]
          "
        >
          {DESTINATIONS.map((d, i) => (
            <div
              key={i}
              className={d.hero ? "lg:col-span-2 lg:row-span-2" : ""}
            >
              <DestinationCard
                hero={d.hero || false}
                img={d.img}
                name={d.name}
                country={d.country}
                tag={d.tag}
                count={d.count}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;