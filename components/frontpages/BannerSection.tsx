"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  BannerPlacement,
  HomepageBanner,
  placementToPreset,
} from "@/types/banner";

interface Props {
  banners: HomepageBanner[];
  placement: BannerPlacement;
}

export default function BannerSection({
  banners = [],
  placement,
}: Props) {
  if (!banners.length) return null;

  const preset = placementToPreset[placement];
  const DELAY_MAP = {
    hero: 5000,
    section: 4000,
    compact: 3000,
  } as const;

  const delay = DELAY_MAP[preset];

  const ASPECT_MAP = {
    hero: "aspect-[1980/500]",
    section: "aspect-[1920/400]",
    compact: "aspect-[1920/300]",
  } as const;

  const aspectRatio = ASPECT_MAP[preset];
  const autoplay = useRef(
    Autoplay({
      delay,
    })
  );

  return (
    <div className="mx-4 md:mx-10 rounded-2xl overflow-hidden ">
      <Carousel
        plugins={[autoplay.current]}
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className={`relative w-full ${aspectRatio}`}>
                <Image
                  src={banner.image}
                  alt={banner.keyword}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}