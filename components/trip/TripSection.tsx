"use client";
import { useState } from "react";
import { Trip, ItineraryDay, Review, RatingBar } from "@/types/trip";
import { SectionHeading, Stars } from "./Shared";

// ── Overview ────────────────────────────────────────────────────
export function Overview({ trip }: { trip: Trip }) {
  const stats = [
    { icon: "🗓", label: "Duration",      value: trip.duration },
    { icon: "👥", label: "Group Size",    value: trip.groupSize    ?? "Max 12 Students" },
    { icon: "🌡", label: "Best Season",   value: trip.bestSeason   ?? "October – March" },
    { icon: "📜", label: "Certification", value: trip.certification ?? "Yoga Alliance RYT-200" },
  ];

  const [para1, para2] = trip.overviewText ?? [
    `Nestled at the foot of the Himalayas where the sacred Ganga descends from the mountains,
     Rishikesh is the world's undisputed yoga capital. This ${trip.title} is a deep immersion
     into the living tradition of yoga — not a workshop, not a holiday, but a genuine transformation.`,
    `You will study Hatha and Ashtanga asana, Pranayama, Vedic philosophy, yogic anatomy,
     teaching methodology, and Ayurvedic nutrition under the guidance of experienced masters.
     You leave certified, confident, and irrevocably changed.`,
  ];

  return (
    <section className="mb-10">
      <SectionHeading icon="📋" title="Overview" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#FAF7F2] border border-[#E4D9C8] rounded-xl p-3.5 flex flex-col gap-1">
            <span className="text-lg">{stat.icon}</span>
            <span className="text-[10.5px] uppercase tracking-[0.1em] text-[#8A8278] font-medium">{stat.label}</span>
            <span className="text-[13.5px] font-semibold text-[#1C3A2F] leading-snug">{stat.value}</span>
          </div>
        ))}
      </div>
      <p className="text-[15px] text-[#4A4540] leading-[1.85] font-light mb-3">{para1}</p>
      <p className="text-[15px] text-[#4A4540] leading-[1.85] font-light">{para2}</p>
    </section>
  );
}

// ── Highlights ──────────────────────────────────────────────────
export function Highlights({ data }: { data?: string[] }) {
  if (!data?.length) return null;
  return (
    <section className="mb-10">
      <SectionHeading icon="✨" title="Highlights" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {data.map((text, i) => (
          <div key={i} className="flex items-start gap-3 bg-[#FAF7F2] border border-[#E4D9C8] rounded-xl p-3.5 transition-all duration-200 hover:border-[#B8943A] hover:translate-x-0.5">
            <div className="w-[22px] h-[22px] rounded-full bg-[#1C3A2F] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#B8943A" strokeWidth="2.5" strokeLinecap="round">
                <path d="M2 6.5l3 3 5-5" />
              </svg>
            </div>
            <span className="text-[13.5px] text-[#4A4540] leading-snug">{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Activities ──────────────────────────────────────────────────
export function Activities({ data }: { data?: { icon: string; label: string }[] }) {
  if (!data?.length) return null;
  return (
    <section className="mb-10">
      <SectionHeading icon="🏃" title="Activities Included" />
      <div className="flex flex-wrap gap-2.5">
        {data.map((act) => (
          <div key={act.label} className="flex items-center gap-2 border-[1.5px] border-[#E4D9C8] bg-[#FAF7F2] px-4 py-2.5 rounded-full transition-all duration-200 hover:border-[#B8943A] hover:bg-[#F0EAE0] hover:-translate-y-0.5 cursor-default">
            <span className="text-base">{act.icon}</span>
            <span className="text-[13px] font-medium text-[#1C3A2F]">{act.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Itinerary ───────────────────────────────────────────────────
function DayItem({ day, isOpen, onToggle }: { day: ItineraryDay; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`border rounded-xl overflow-hidden mb-2.5 transition-all duration-200 ${isOpen ? "border-[#1C3A2F]/30 shadow-[0_6px_30px_rgba(28,58,47,0.10)]" : "border-[#E4D9C8]"}`}>
      <button
        className={`w-full flex items-center gap-3.5 px-5 py-4 text-left transition-colors duration-200 ${isOpen ? "bg-[#1C3A2F]" : "bg-white hover:bg-[#F0EAE0]"}`}
        onClick={onToggle}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-[18px] font-bold flex-shrink-0 transition-all duration-200 ${isOpen ? "bg-[#B8943A] text-[#1C3A2F]" : "bg-[#1C3A2F] text-[#E8D5A3]"}`}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {day.day}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-[10.5px] font-medium tracking-[0.1em] uppercase mb-0.5 ${isOpen ? "text-[#B8943A]/70" : "text-[#C4622A]"}`}>
            Day {day.day}
          </p>
          <p className={`text-[18px] font-bold leading-snug truncate ${isOpen ? "text-white" : "text-[#1C3A2F]"}`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {day.title}
          </p>
        </div>
        <div className={`flex items-center gap-3 flex-shrink-0 ${isOpen ? "text-white/60" : "text-[#8A8278]"}`}>
          <span className="text-[11px] hidden sm:block">🍽 {day.meals.split(",")[0]}</span>
          <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#B8943A]" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ease-in-out bg-white ${isOpen ? "max-h-[500px]" : "max-h-0"}`}>
        <div className="px-5 pb-5 pt-4">
          <p className="text-[14.5px] text-[#4A4540] leading-[1.8] font-light mb-3.5">{day.desc}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {day.activities.map((act) => (
              <span key={act} className="text-[12px] bg-[#F0EAE0] border border-[#E4D9C8] text-[#1C3A2F] px-3 py-1 rounded-full font-medium">
                {act}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[12.5px] text-[#8A8278]">
            <span>🍽</span>
            <span>Meals: <strong className="text-[#1A1714] font-medium">{day.meals}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Itinerary({ data }: { data?: ItineraryDay[] }) {
  const [openDay, setOpenDay] = useState(0);
  if (!data?.length) return null;
  return (
    <section className="mb-10">
      <SectionHeading icon="🗺" title="Day-wise Itinerary" />
      {data.map((day, i) => (
        <DayItem key={i} day={day} isOpen={openDay === i} onToggle={() => setOpenDay(openDay === i ? -1 : i)} />
      ))}
    </section>
  );
}

// ── Inclusions & Exclusions ─────────────────────────────────────
export function InclusionsExclusions({ inclusions, exclusions }: { inclusions?: string[]; exclusions?: string[] }) {
  if (!inclusions?.length && !exclusions?.length) return null;
  return (
    <section className="mb-10">
      <SectionHeading icon="📦" title="What's Included" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {inclusions?.length ? (
          <div className="bg-[#EFF6F0] border border-[#1C3A2F]/15 rounded-xl p-5">
            <h4 className="text-[13px] font-semibold text-[#1C3A2F] mb-3 flex items-center gap-2">
              <span className="w-[18px] h-[18px] rounded-full bg-[#1C3A2F] flex items-center justify-center text-[10px] text-[#B8943A]">✓</span>
              Included
            </h4>
            <ul className="space-y-2">
              {inclusions.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] text-[#4A4540]">
                  <span className="text-[#2D7A4A] mt-0.5 flex-shrink-0 font-bold text-[12px]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {exclusions?.length ? (
          <div className="bg-[#FEF3EE] border border-[#C4622A]/15 rounded-xl p-5">
            <h4 className="text-[13px] font-semibold text-[#C4622A] mb-3 flex items-center gap-2">
              <span className="w-[18px] h-[18px] rounded-full bg-[#C4622A] flex items-center justify-center text-[10px] text-white">✕</span>
              Not Included
            </h4>
            <ul className="space-y-2">
              {exclusions.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] text-[#4A4540]">
                  <span className="text-[#C4622A] mt-0.5 flex-shrink-0 font-bold text-[12px]">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

// ── Reviews ─────────────────────────────────────────────────────
const FALLBACK_IMG = "https://ui-avatars.com/api/?background=1C3A2F&color=E8D5A3&size=80&name=";

export function Reviews({ data, ratingBars }: { data?: Review[]; ratingBars?: RatingBar[] }) {
  if (!data?.length) return null;

  const avgRating = (data.reduce((s, r) => s + r.rating, 0) / data.length).toFixed(1);
  const maxStars  = Math.round(parseFloat(avgRating));

  return (
    <section className="mb-10">
      <SectionHeading icon="💬" title="Student Reviews" />

      <div className="bg-[#1C3A2F] rounded-2xl p-5 flex flex-col sm:flex-row gap-6 mb-5">
        <div className="text-center flex-shrink-0">
          <p className="text-5xl font-bold text-[#E8D5A3] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {avgRating}
          </p>
          <Stars count={maxStars} size="text-[14px]" />
          <p className="text-[12px] text-white/45 mt-1">{data.length} reviews</p>
        </div>

        {ratingBars?.length ? (
          <div className="flex-1 flex flex-col gap-2">
            {ratingBars.map((bar) => (
              <div key={bar.label} className="flex items-center gap-2.5">
                <span className="text-[12px] text-white/65 w-36 flex-shrink-0">{bar.label}</span>
                <div className="flex-1 bg-white/10 rounded-full h-[5px]">
                  <div className="bg-[#B8943A] h-[5px] rounded-full transition-all duration-700" style={{ width: `${bar.pct}%` }} />
                </div>
                <span className="text-[11px] text-white/45 w-8 text-right">{bar.pct}%</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-3.5">
        {data.map((review, i) => (
          <div key={i} className="border border-[#E4D9C8] rounded-xl p-5 bg-white hover:shadow-[0_4px_20px_rgba(28,58,47,0.07)] transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={review.img ?? `${FALLBACK_IMG}${encodeURIComponent(review.name)}`}
                  alt={review.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#B8943A]/30"
                />
                <div>
                  <p className="text-[14px] font-semibold text-[#1A1714]">{review.name}</p>
                  <p className="text-[12px] text-[#8A8278] mt-0.5">
                    {review.from}{review.date ? ` · ${review.date}` : ""}
                  </p>
                  {review.retreat && (
                    <p className="text-[11.5px] text-[#C4622A] mt-0.5 italic">{review.retreat}</p>
                  )}
                </div>
              </div>
              <Stars count={review.rating} size="text-[13px]" />
            </div>
            <p className="text-[16px] text-[#4A4540] leading-[1.75] font-light italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              "{review.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}