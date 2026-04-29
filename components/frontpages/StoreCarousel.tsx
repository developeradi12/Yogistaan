"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StoreCard from "../category/StoreCard";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function StoreCarousel({ items }:{items:any}) {
  if (!items?.length) return null;
  const autoplay = useRef(
    Autoplay({
      delay: 3000,              // 3 seconds
      stopOnInteraction: true,  // stops when user swipes
    })
  );
  return (
    <section className="container mx-auto py-8 sm:py-10 px-4 sm:px-6 md:px-8">

      {/* Heading */}
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1C3A2F]">
          Yoga Store
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative">
        <Carousel
          plugins={[autoplay.current]}
          opts={{
            loop: true,
            dragFree: true, // smoother mobile swipe
          }}
          className="w-full"
        >
          <CarouselContent >
            {items.map((item:any) => (
              <CarouselItem
                key={item.id}
                className="
                  pl-3
                  basis-[75%]
                  sm:basis-[48%]
                  md:basis-[32%]
                  lg:basis-[24%]
                  xl:basis-[20%]
                "
              >
                <StoreCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation (hidden on mobile) */}
          <CarouselPrevious className="mx-3 top-1/2  h-10 w-10 rounded-full bg-white/90 backdrop-blur border shadow-md hover:shadow-lg">
            <ChevronLeft className="h-5 w-5" />
          </CarouselPrevious>
          <CarouselNext className=" mx-3 top-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur border shadow-md hover:shadow-lg">
            <ChevronRight className="h-5 w-5" />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
}