"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const slides = [
  {
    img: "https://picsum.photos/seed/mountains/1400/700",
    eyebrow: "Himalayan Escapes",
    title: "Where the peaks\ntouch the clouds",
    sub: "Curated treks and stays across the Himalayas",
  },
  {
    img: "https://picsum.photos/seed/beach/1400/700",
    eyebrow: "Coastal Retreats",
    title: "Sun, sea, and\nunforgettable shores",
    sub: "Handpicked beach destinations across India",
  },
  {
    img: "https://picsum.photos/seed/forest/1400/700",
    eyebrow: "Wildlife & Forests",
    title: "Lose yourself in\nthe wilderness",
    sub: "Safari stays and forest lodges off the beaten path",
  },
  {
    img: "https://picsum.photos/seed/heritage/1400/700",
    eyebrow: "Heritage Journeys",
    title: "Stories carved\nin stone and time",
    sub: "Immersive cultural trips through ancient India",
  },
  {
    img: "https://picsum.photos/seed/valley/1400/700",
    eyebrow: "Valley Hideaways",
    title: "Silence so deep\nyou can hear yourself",
    sub: "Remote valleys and offbeat escapes for the soul",
  },
]

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {slides.map((slide, idx) => (
            <CarouselItem key={idx}>
              <div className="relative w-full aspect-[16/7] min-h-[400px] overflow-hidden">
                {/* Image */}
                <Image
                  src={slide.img}
                  alt={slide.eyebrow}
                  fill
                  className="object-cover transition-transform duration-[6000ms] scale-105 hover:scale-100"
                  priority={idx === 0}
                />

                {/* Layered gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Slide content */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
                  <p
                    className="text-amber-400 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-3 animate-in fade-in slide-in-from-bottom-3 duration-700"
                    style={{ animationFillMode: "both" }}
                  >
                    ✦ {slide.eyebrow}
                  </p>
                  <h2
                    className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] max-w-xl mb-4 whitespace-pre-line animate-in fade-in slide-in-from-bottom-4 duration-700"
                    style={{ animationDelay: "100ms", animationFillMode: "both" }}
                  >
                    {slide.title}
                  </h2>
                  <p
                    className="text-stone-300 text-sm md:text-base max-w-sm mb-7 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700"
                    style={{ animationDelay: "200ms", animationFillMode: "both" }}
                  >
                    {slide.sub}
                  </p>
                  <div
                    className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                    style={{ animationDelay: "300ms", animationFillMode: "both" }}
                  >
                    <Button className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-5 rounded-xl shadow-lg shadow-amber-900/30 hover:-translate-y-0.5 transition-all duration-200 text-sm">
                      Explore Trips
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom arrows */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25 hover:border-white/30 transition-all duration-200">
          <ChevronLeft className="h-5 w-5" />
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25 hover:border-white/30 transition-all duration-200">
          <ChevronRight className="h-5 w-5" />
        </CarouselNext>
      </Carousel>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 h-2 bg-amber-400"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  )
}