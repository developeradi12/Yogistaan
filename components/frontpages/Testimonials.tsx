"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import type { Testimonial } from "../../types/index";
import SectionLabel from "./SectionLabel";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
    })
  );

  const active = [...testimonials]
    .filter((t) => t.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="py-20 px-4 md:px-14 bg-stone-200/60 relative overflow-hidden">
      
      {/* Background effect */}
      <div
        className="absolute -top-25 -right-25 w-100 h-100 rounded-full  pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,106,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Heading */}
      <div className="text-center mb-12 text-black">
        <SectionLabel center="center">Student Stories</SectionLabel>

        <h2
          className="font-bold"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(30px,3.5vw,46px)",
          }}
        >
          Life-Changing{" "}
          <em className="not-italic text-[#65ac8d]">Experiences</em>
        </h2>
      </div>

      {/*  Carousel starts here */}
      <div className="container mx-auto relative">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          <CarouselContent>
            {active.map((t) => (
              <CarouselItem
                key={t.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 p-3"
              >
                <div className="bg-white/6 border border-gray-800/10 rounded-xl p-7 hover:bg-white/9 transition-colors h-full">
                  
                  <p className="text-[#C8A96A] text-[13px] tracking-[2px] mb-4">
                    {"★".repeat(t.stars)}
                  </p>

                  <p
                    className="font-serif italic text-black/85 text-[16.5px] leading-[1.75] mb-6"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#C8A96A]/40"
                    />
                    <div>
                      <p className="text-black text-[14px] font-medium">
                        {t.name}
                      </p>
                      <p className="text-black/45 text-[12px] mt-0.5">
                        {t.from}
                      </p>
                      <p className="text-[#C8A96A] text-[11.5px] mt-0.5 italic">
                        {t.retreat}
                      </p>
                    </div>
                  </div>

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation buttons */}
          <CarouselPrevious className=" top-1/2 -" />
          <CarouselNext className=" top-1/2 " />
        </Carousel>
      </div>
    </section>
  );
}