"use client";
import { useRef } from "react";
import Header from "../frontpages/Header";
import Gallery from "./Gallery";
import {
  Overview,
  Highlights,
  Activities,
  Itinerary,
  InclusionsExclusions,
  Reviews,
} from "./TripSection";
import BookingSidebar from "./BookingSidebar";
import { TripHeader } from "./Shared";
import { Trip } from "@/types/trip";
import Footer from "../frontpages/Footer";

// ── Mobile Sticky Footer ─────────────────────────────────────────
function MobileBookBar({ trip }: { trip: Trip }) {
  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#FAF7F2]/97 backdrop-blur-xl border-t border-[#E4D9C8] px-5 py-3 flex items-center justify-between z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div>
        <span className="text-[11px] text-[#8A8278] block">Starting from</span>
        <span
          className="font-bold text-[26px] text-[#1C3A2F] leading-none"
        >
          {fmt(trip.price)}
        </span>
        <span className="text-[12px] text-[#8A8278] ml-1">/ person</span>
      </div>
      <button
        onClick={() => document.getElementById("booking-sidebar")?.scrollIntoView({ behavior: "smooth" })}
        className="bg-[#C4622A] text-white px-8 py-3 rounded-xl font-bold text-[15px] hover:bg-[#a84f20] active:scale-[0.98] transition-all"
      >
        Book Now
      </button>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────
export default function TripDetails({ trip }: { trip: Trip }) {
  const sidebarRef = useRef<HTMLElement>(null);

  return (
    <>
      <div className=" bg-[#F7F3EE] text-[#1A1714] min-h-screen overflow-x-hidden">
      
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7 container mx-auto px-8  py-7 pb-24 lg:pb-10 items-start">

          {/* ── LEFT: content ── */}
          <main className="min-w-0">
            <TripHeader trip={trip} />
            <Gallery images={trip.galleryImages} />
            <Overview trip={trip} />
            <Highlights data={trip.highlights} />
            <Activities data={trip.activities} />
            <Itinerary data={trip.itinerary} />
            <InclusionsExclusions
              inclusions={trip.inclusions}
              exclusions={trip.exclusions}
            />
            <Reviews data={trip.reviews} ratingBars={trip.ratingBars} />
          </main>

          {/* ── RIGHT: sidebar ── */}
          <aside
            id="booking-sidebar"
            ref={sidebarRef}
            className="hidden lg:block"
          >
            <BookingSidebar trip={trip} />  {/* ← fixed: was <BookingSidebar /> */}
          </aside>
        </div>

        <MobileBookBar trip={trip} />
      </div>
      
    </>
  );
}