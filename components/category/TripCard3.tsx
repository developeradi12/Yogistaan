"use client";

import Image from "next/image";
import Link from "next/link";

// Adventure card — dark, bold, rugged. Left accent stripe + terrain badge.
export default function TripCardAdventure({ item }:{item:any}) {

  return (
    <div className="group relative bg-[#0F1C14] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10 flex flex-col h-full">

      {/* Accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C4622A] z-10" />

      {/* Image */}
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          width={600}
          height={400}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
        />

        {/* FIXED overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Duration */}
        <div className="absolute bottom-3 left-4 text-[#E8A23A] text-xs font-medium">
          {item.duration}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4 flex flex-col flex-1 pl-6">

        <h3 className="text-[#F5F5F5] font-bold text-sm leading-snug line-clamp-2 group-hover:text-[#C4622A] transition-colors"
        >
          {item.title}
        </h3>

        <div className="flex items-center gap-2 mt-2 text-[#9CA3AF] text-xs">
          <span>📍</span>
          <span>{item.location}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.places?.slice(0, 3).map((h: any, i: number) => (
            <span
              key={i}
              className="border border-white/10 text-white/70 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide bg-white/5"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <p className="text-white/50 text-[10px] uppercase tracking-widest">Price</p>
            <p className="text-[#F5F5F5] font-bold text-base">
              ₹{item.price.toLocaleString()}
            </p>
          </div>

          <Link href={`/tripDetail/${item.slug}`}>
            <button className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-[#C4622A] text-[#C4622A] transition-all duration-200 hover:bg-[#C4622A] hover:text-white">
              Explore
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
