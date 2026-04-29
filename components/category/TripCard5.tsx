"use client";

import Image from "next/image";
import Link from "next/link";

// Pilgrimage / Tirth card — sacred earthy palette: terracotta, saffron, cream, warm
export default function TripCardTirth({ item }:{item:any}) {
  return (
    <div className="group bg-[#FDF6EE] rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 border border-[#D4956A]/25 flex flex-col">

      {/* Saffron top stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#C4622A] via-[#E8A23A] to-[#C4622A]" />

      {/* Image */}
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          width={600}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
        />


        {/* Sacred symbol watermark */}
        <div className="absolute top-3 right-3 text-4xl opacity-60 drop-shadow select-none">ॐ</div>

        {/* Duration */}
        <div className="absolute bottom-3 left-3 text-white text-xs font-semibold bg-[#C4622A]/80 px-3 py-1 rounded-full backdrop-blur">
          {item.duration}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4 flex flex-col flex-1">

        {/* Divider ornament */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-px bg-[#D4956A]/30" />
          <span className="text-[#C4622A] text-xs">✦</span>
          <div className="flex-1 h-px bg-[#D4956A]/30" />
        </div>

        <h3 className="font-bold text-[#4A2010] text-base leading-snug line-clamp-2 " style={{ fontFamily: "Playfair Display, serif" }}>
          {item.title}
        </h3>

        <p className="text-[#8B5E3C] text-xs  mt-1.5">📍 {item.location}</p>

        {/* Tags */}
        <div className="flex flex-wrap  gap-1.5 mt-3">
          {item.places?.map((p:string, i:number) => (
            <span key={i} className="bg-[#C4622A]/10 border border-[#C4622A]/25 text-[#7A3010] text-[10px] px-2.5 py-0.5 rounded-full font-medium">
              {p}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#D4956A]/20 mt-4">
          <div>
            <p className="text-[#B8895A] text-[10px] uppercase tracking-widest">Sacred Journey</p>
            <p className="text-[#4A2010] font-bold text-lg">₹{item.price.toLocaleString()}</p>
          </div>
         <Link href={`/tripDetail/${item.slug}`}>
            <button className="bg-gradient-to-r from-[#C4622A] to-[#E8A23A] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow hover:shadow-md hover:opacity-90 transition-all">
              Begin Yatra
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
