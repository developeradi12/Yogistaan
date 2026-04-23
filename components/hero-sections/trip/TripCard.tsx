"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TripCard({ item }) {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group">

      {/* Big Image */}
      <Image
        src={item.image}
        alt={item.title}
        width={800}
        height={800}
        className="w-full h-[320px] md:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Price badge */}
      <Badge className="absolute top-4 right-4 bg-white/90 text-black shadow-sm">
        ₹{item.price}
      </Badge>

      {/* Floating Content Card */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-4 rounded-2xl">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl max-w-[95%] mx-auto min-h-[220px] flex flex-col">

          {/* Title */}
          <h3 className="font-semibold text-lg text-gray-900">
            {item.title}
          </h3>

          {/* Meta */}
          <div className="text-sm text-gray-500 mt-1 space-y-1">
            <p>📍 {item.location}</p>
            <p>🕒 {item.duration}</p>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mt-3">
            {item.places?.slice(0, 2).map((h, i) => (
              <Badge key={i} className="bg-gray-100 text-gray-700">
                {h}
              </Badge>
            ))}
          </div>

          {/* Push button to bottom */}
          <div className="mt-auto">
            <Link href={`/trip/${item.id}`}>
              <Button className="w-full mt-4 rounded-full bg-primary text-white hover:bg-primary/90">
                View Details
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}