"use client";
import { useState } from "react";
import { Trip } from "@/types/trip";
import { Stars } from "./Shared";

const PRIVATE_UPGRADE = 15_000;

export default function BookingSidebar({ trip }: { trip: Trip }) {
  const [batch, setBatch]       = useState("");
  const [roomType, setRoomType] = useState<"shared" | "private">("shared");
  const [guests, setGuests]     = useState(1);
  const [batchError, setBatchError] = useState(false);

  const pricePerPerson = trip.price + (roomType === "private" ? PRIVATE_UPGRADE : 0);
  const total   = pricePerPerson * guests;
  const deposit = Math.round(total * 0.2);
  const fmt     = (n: number) => "₹" + n.toLocaleString("en-IN");

  const avgRating = trip.reviews?.length
    ? Math.round(trip.reviews.reduce((s, r) => s + r.rating, 0) / trip.reviews.length)
    : 5;

  const handleBook = () => {
    if (!batch) { setBatchError(true); setTimeout(() => setBatchError(false), 2000); return; }
    alert(`Booking Confirmed!\n${trip.title}\n${guests} guest(s)\nTotal: ${fmt(total)}`);
  };

  return (
    <div className="sticky top-[76px] space-y-4">

      {/* Booking card */}
      <div className="bg-white border border-[#E4D9C8] rounded-2xl shadow-[0_4px_24px_rgba(28,58,47,0.08)] p-5">

        {/* Price */}
        <div className="mb-4">
          <p className="text-xs text-[#8A8278]">Starting from</p>
          <h2 className="text-3xl font-bold text-[#1C3A2F]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {fmt(trip.price)}
          </h2>
          <span className="text-sm text-[#8A8278]">/ person</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <Stars count={avgRating} />
          <span className="text-sm text-[#8A8278]">({trip.reviews?.length ?? 0} reviews)</span>
        </div>

        {/* Batch */}
        <div className="mb-4">
          <label className="text-xs block mb-1 text-[#8A8278]">Select Batch</label>
          <select
            value={batch}
            onChange={(e) => { setBatch(e.target.value); setBatchError(false); }}
            className={`w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C3A2F]/30 ${batchError ? "border-red-400" : "border-[#E4D9C8]"}`}
          >
            <option value="">— Select a batch —</option>
            {trip.batches?.map((b) => (
              <option key={b.value} value={b.value}>{b.label} ({b.spots} spots left)</option>
            ))}
          </select>
          {batchError && <p className="text-red-500 text-xs mt-1">Please select a batch first</p>}
        </div>

        {/* Room type */}
        <div className="mb-4">
          <label className="text-xs block mb-1 text-[#8A8278]">Room Type</label>
          <div className="flex gap-2">
            {(["shared", "private"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setRoomType(type)}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  roomType === type
                    ? "bg-[#1C3A2F] text-[#E8D5A3] border-[#1C3A2F]"
                    : "bg-white text-[#4A4540] border-[#E4D9C8] hover:border-[#1C3A2F]/40"
                }`}
              >
                {type === "shared" ? "Shared" : `Private (+₹15k)`}
              </button>
            ))}
          </div>
        </div>

        {/* Guests */}
        <div className="mb-4">
          <label className="text-xs block mb-1 text-[#8A8278]">Guests</label>
          <div className="flex items-center border border-[#E4D9C8] rounded-lg overflow-hidden">
            <button onClick={() => setGuests(Math.max(1, guests - 1))} className="px-4 py-2 text-lg text-[#1C3A2F] hover:bg-[#F0EAE0] transition-colors">−</button>
            <span className="flex-1 text-center font-medium text-[#1A1714]">{guests}</span>
            <button onClick={() => setGuests(Math.min(12, guests + 1))} className="px-4 py-2 text-lg text-[#1C3A2F] hover:bg-[#F0EAE0] transition-colors">+</button>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="bg-[#FAF7F2] border border-[#E4D9C8] rounded-xl p-3.5 mb-4 text-sm">
          <div className="flex justify-between text-[#4A4540]">
            <span>{fmt(pricePerPerson)} × {guests}</span>
            <span>{fmt(total)}</span>
          </div>
          <div className="flex justify-between font-bold text-[#1C3A2F] mt-2 pt-2 border-t border-[#E4D9C8]">
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>
          <p className="text-xs text-[#8A8278] text-center mt-1.5">
            Reserve with just {fmt(deposit)} (20% deposit)
          </p>
        </div>

        {/* CTA */}
        <button onClick={handleBook} className="w-full bg-[#C4622A] text-white py-3 rounded-xl font-bold text-[15px] hover:bg-[#a84f20] active:scale-[0.98] transition-all">
          Book Now
        </button>
        <p className="text-[11px] text-[#8A8278] text-center mt-2">Free cancellation · 48-hour hold</p>
      </div>

      {/* Quick facts */}
      {trip.quickFacts?.length ? (
        <div className="bg-white border border-[#E4D9C8] rounded-xl p-4">
          <h3 className="text-[13px] font-semibold text-[#1C3A2F] mb-3">Quick Facts</h3>
          <div className="space-y-2">
            {trip.quickFacts.map((fact) => (
              <div key={fact.label} className="flex justify-between text-sm">
                <span className="text-[#8A8278]">{fact.label}</span>
                <span className="font-medium text-[#1A1714]">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}