"use client"
import Image from "next/image";
import React from "react";

const HERO_SLIDE = {
  img: "/image2.jpg",
  badge: "Island Sanctuary · Bali",
  title: "Awaken in the",
  titleEm: "Heart of Bali",
  sub: "Sunrise yoga among rice terraces, temple ceremonies, and the healing energy of Ubud's sacred forests await your arrival.",
};

const HeroCarousel = () => {
  const slide = HERO_SLIDE;

  return (
    <section className="relative h-[92vh] min-h-150 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={slide.img}
          alt={slide.badge}
          fill
          priority
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(28,58,47,0.72) 0%, rgba(28,58,47,0.3) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-20"
        style={{
          background: "linear-gradient(to top, #FAF7F2, transparent)",
        }}
      />

      {/* Content */}
      <div className="text-center">
        <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl text-center px-4">          <div className="inline-flex items-center gap-2 bg-[#C8A96A]/20 border border-[#C8A96A]/40 text-[#C8A96A] px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase font-medium mb-5 backdrop-blur-sm">
          ✦ {slide.badge}
        </div>

          <h1
            className="font-black text-white leading-[1.05] tracking-tight mb-5"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(42px, 6vw, 76px)",
            }}
          >
            {slide.title}
            <em className="block not-italic text-[#B8D4C8]">
              {slide.titleEm}
            </em>
          </h1>

          <p className="text-white/80 text-[17px] font-light leading-[1.7] mb-9">
            {slide.sub}
          </p>
        </div>
      </div>

    </section>
  );
};

export default HeroCarousel;