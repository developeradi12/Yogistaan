"use client";

import Image from "next/image";

type DestinationCardProps = {
  hero: boolean;
  img: string;
  name: string;
  country: string;
  tag: string;
  count: string;
};

const DestinationCard = ({
  hero,
  img,
  name,
  country,
  tag,
  count,
}: DestinationCardProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl cursor-pointer group">
      {/* Image */}
      <Image
        src={img}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw,
               (max-width: 1024px) 50vw,
               33vw"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(28,58,47,0.75) 0%, rgba(28,58,47,0.1) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase text-[#C8A96A] mb-1">
          {country}
        </p>

        <p
          className="font-bold text-white mb-2 leading-tight"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: hero
              ? "clamp(20px, 2.5vw, 30px)"
              : "clamp(16px, 2vw, 22px)",
          }}
        >
          {name}
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] sm:text-[11.5px] px-2 py-0.5 rounded">
            {tag}
          </span>
          <span className="text-white/70 text-[11px] sm:text-[12px]">
            {count}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;