"use client";
import Destinations from "@/components/frontpages/Destinations";
import HeroCarousel from "@/components/frontpages/HeroCarousel";
import HowItWorks from "@/components/frontpages/HowItWorks";
import Testimonials from "@/components/frontpages/Testimonials";
import testimonialsData from "@/dummy_data/testimonialsData";
import StoreCarousel from "@/components/frontpages/StoreCarousel";
import { storeData } from "@/dummy_data/store";
import { CatSection } from "@/components/frontpages/CatSection";



export default function Home() {

  return (
  <div className="bg-[#FAF7F2] text-[#1A1A18] overflow-x-clip">
      <HeroCarousel />
      <CatSection />
      <StoreCarousel items={storeData} />
      <Destinations />
      <HowItWorks />
      <Testimonials testimonials={testimonialsData} />
    </div>
  );
}
