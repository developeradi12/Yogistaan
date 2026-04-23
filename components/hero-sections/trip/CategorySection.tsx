"use client";

import { useState, useRef } from "react";
import CategoryTabs from "./CategoryTabs";
import TripCard from "./TripCard";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategorySection({ categories, data }) {
  const [active, setActive] = useState("All");

  //  AUTOPLAY PLUGIN
  const autoplay = useRef(
    Autoplay({
      delay: 1500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  const filtered =
    active === "All"
      ? data
      : data.filter((item) => item.category === active);

  return (
    <section className="w-full px-4 md:px-10">

      {/* Categories */}
      <CategoryTabs
        categories={["All", ...categories]}
        selected={active}
        onSelect={setActive}
      />

      {/* Carousel */}
      <div className="mt-6 px-2">

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          <CarouselContent>

            {filtered.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-full  sm:basis-1/2 lg:basis-1/3 p-3 " 
              >
                  <TripCard item={item} /> 
              </CarouselItem>
            ))}

          </CarouselContent>

          <CarouselPrevious className="  top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-gray-500 backdrop-blur-sm border border-gray-500/20 text-white hover:bg-gray/25 hover:border-gray/30 transition-all duration-200">
            <ChevronLeft className="h-5 w-5" />
          </CarouselPrevious>
          <CarouselNext className="-translate-y-1/2 z-10 h-10 w-10 rounded-full bg-gray-500 backdrop-blur-sm border border-gray-500/20 text-white hover:bg-gray/25 hover:border-gray/30 transition-all duration-200">
            <ChevronRight className="h-5 w-5" />
          </CarouselNext>

        </Carousel>
      </div>
    </section>
  );
}