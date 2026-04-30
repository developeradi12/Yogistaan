"use client";
import Destinations from "@/components/frontpages/Destinations";
import HeroCarousel from "@/components/frontpages/HeroCarousel";
import HowItWorks from "@/components/frontpages/HowItWorks";
import Testimonials from "@/components/frontpages/Testimonials";
import testimonialsData from "@/dummy_data/testimonialsData";
import StoreCarousel from "@/components/frontpages/StoreCarousel";
import { storeData } from "@/dummy_data/store";
import { VideoSection } from "@/components/frontpages/VideoSection";
import { CatSection02 } from "@/components/CatSection02";



export default function Home2() {

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A18] overflow-x-clip">
      <HeroCarousel />
      <div className="py-4">
        <CatSection02/>
      </div>
      <div className="pt-6">
        <VideoSection />
      </div>
      <StoreCarousel items={storeData} />
      <Destinations />
      <HowItWorks />
      <Testimonials testimonials={testimonialsData} />
    </div>
  );
}
