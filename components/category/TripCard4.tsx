"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const festEmojis = ["🎪", "🌕", "🎆", "🎉", "🕉️"];

export default function TripCardFest(
  { item, itemIndex = 0 }: { item: any; itemIndex?: number }
) {
  const emoji = festEmojis[itemIndex % festEmojis.length];

  return (
    <div className="relative h-[420px] rounded-3xl overflow-hidden border border-[#C8A96A]/20 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">

      {/* Image */}
      <div className="relative h-full w-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Top left badge (duration + emoji) */}
      <div className="absolute top-4 left-4 bg-[#C4622A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow flex items-center gap-1">
        {emoji} {item.duration}
      </div>

      {/* Top right price */}
      <Badge className="absolute top-4 right-4 bg-white/90 text-[#1C3A2F] font-bold text-sm px-3 py-1 shadow">
        {item.price === 0 ? "FREE 🎉" : `₹${item.price.toLocaleString()}`}
      </Badge>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl flex flex-col h-[180px]">

          {/* Title */}
          <h3 className="font-bold text-sm text-[#1C3A2F] leading-snug line-clamp-2">
            {item.title}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <span>📍 {item.location}</span>
            <span>·</span>
            <span>🕒 {item.duration}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2 overflow-hidden max-h-[42px]">
            {
              item.places?.slice(0, 3).map((p: any, i: number) => (
                <span
                  key={i}
                  className="bg-[#1C3A2F]/8 text-[#1C3A2F] text-[10px] px-2 py-0.5 rounded-full border border-[#1C3A2F]/15"
                >
                  {p}
                </span>
              ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA */}
          <Link href={`/tripDetail/${item.slug}`}>
            <Button className="w-full rounded-full bg-[#1C3A2F] hover:bg-[#C4622A] text-white text-xs font-semibold h-8">
              Join Now →
            </Button>
          </Link>

        </div>
      </div>
    </div>
  );
}