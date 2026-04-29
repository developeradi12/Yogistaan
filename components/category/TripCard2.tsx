"use client";

import Image from "next/image";
import Link from "next/link";

export default function TripCardRetreat({ item }: { item: any }) {
  return (
    <div className="group h-full flex flex-col bg-[#F0F5F0] rounded-[28px] overflow-hidden border border-[#B8D4B8]/40 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* Image */}
      <div className="p-3 pb-0">
        <div className="relative rounded-[20px] overflow-hidden h-[220px]">
          <Image
            src={item.image}
            alt={item.title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#1C3A2F]/30 to-transparent" />

          {/* Location */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/85 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-[#2D5A3D] shadow-sm">
            🌿 {item.location}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">

        {/* Duration */}
        <span className="text-[10px] uppercase tracking-[0.18em] text-[#5A8A6A] font-semibold mb-2">
          ✦ {item.duration} Retreat
        </span>

        {/* Title (FIXED HEIGHT) */}
        <h3 className="font-semibold text-[#1C3A2F] text-base leading-snug line-clamp-2 min-h-[44px]">
          {item.title}
        </h3>

        {/* Tags (FIXED HEIGHT AREA) */}
        <div className="flex flex-wrap gap-1.5 mt-3  overflow-hidden">
         {item.places?.slice(0, 3).map((p: any, i: number) => (
            <span
              key={i}
              className="bg-white border border-[#B8D4B8] text-[#3D7A52] text-xs px-2.5  rounded-full"
            >
              {p}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">
              Starting from
            </p>
            <p className="text-lg font-bold text-[#1C3A2F]">
              ₹{item.price.toLocaleString()}
            </p>
          </div>

        <Link href={`/tripDetail/${item.slug}`}>
            <button className="bg-[#2D5A3D] hover:bg-[#C4622A] active:scale-95 transition-all duration-200 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm">
              Book
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}