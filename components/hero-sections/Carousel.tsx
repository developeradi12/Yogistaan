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
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    eyebrow: "Morning Yoga",
    title: "Begin your day\nwith inner peace",
    sub: "Sunrise yoga sessions to energize your mind and body",
  },
  {
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    eyebrow: "Meditation Retreats",
    title: "Find calm in\nevery breath",
    sub: "Guided meditation retreats for deep relaxation and clarity",
  },
  {
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    eyebrow: "Yoga by Nature",
    title: "Flow with the\nrhythm of nature",
    sub: "Practice yoga in serene forests, beaches, and mountains",
  },
  {
    img: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7",
    eyebrow: "Wellness & Healing",
    title: "Restore balance\nin your life",
    sub: "Holistic wellness programs combining yoga and Ayurveda",
  },
  {
    img: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3",
    eyebrow: "Spiritual Journey",
    title: "Reconnect with\nyour inner self",
    sub: "Transformative yoga journeys for mind, body, and soul",
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
                  className="object-cover transition-transform duration-[5000ms] scale-105 hover:scale-100"
                  priority={idx === 0}
                />

                {/* Layered gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Slide content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

                    <p className="special-text mb-3">
                      ✦ {slide.eyebrow}
                    </p>

                    <h2 className="text-white leading-[1.1] max-w-xl mb-4">
                      {(() => {
                        const parts = slide.title.split("\n")

                        return (
                          <>
                            <span className="block text-lg md:text-2xl lg:text-3xl font-normal opacity-80">
                              {parts[0]}
                            </span>

                            {parts[1] && (
                              <span className="block text-3xl md:text-5xl lg:text-5xl font-bold">
                                {parts[1]}
                              </span>
                            )}
                          </>
                        )
                      })()}
                    </h2>

                    <p className="text-white/80 text-sm md:text-lg max-w-md mb-7 leading-relaxed">
                      {slide.sub}
                    </p>

                    <Button className="bg-accent text-white font-semibold px-6 py-5 rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm">
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
            className={`transition-all duration-300 rounded-full ${i === current
              ? "w-6 h-2 bg-amber-400"
              : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </div>
  )
}