import { Trip } from "@/types/trip";

// ── Stars ────────────────────────────────────────────────────────
export function Stars({ count = 5, size = "text-sm" }: { count?: number; size?: string }) {
  const clamped = Math.min(5, Math.max(0, Math.round(count)));
  return (
    <span className={`text-[#B8943A] tracking-widest ${size}`}>
      {"★".repeat(clamped)}{"☆".repeat(5 - clamped)}
    </span>
  );
}

// ── Section Heading ──────────────────────────────────────────────
export function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 pb-3.5 border-b-2 border-[#E4D9C8]">
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1C3A2F] to-[#2D5446] flex items-center justify-center text-base flex-shrink-0">
        {icon}
      </div>
      <h2 className="text-[22px] font-bold text-[#1C3A2F]">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-[#B8943A]/25 to-transparent" />
    </div>
  );
}

// ── Trip Header ──────────────────────────────────────────────────
export function TripHeader({ trip }: { trip: Trip }) {
  const reviewCount = trip.reviews?.length ?? 0;
  const avgRating = reviewCount
    ? (trip.reviews!.reduce((s, r) => s + r.rating, 0) / reviewCount).toFixed(1)
    : null;

  return (
    <div className="mb-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3.5">
        {trip.places?.map((tag) => (
          <span
            key={tag}
            className="text-[10.5px] font-medium tracking-[0.09em] uppercase px-3 py-1 rounded-[3px] bg-[#1C3A2F] text-[#E8D5A3]"
          >
            {tag}
          </span>
        ))}

        {trip.certification && (
          <span className="text-[10.5px] font-medium tracking-[0.09em] uppercase px-3 py-1 rounded-[3px] bg-[#C4622A]/10 text-[#C4622A] border border-[#C4622A]/25">
            {trip.certification}
          </span>
        )}

        {avgRating && (
          <div className="flex items-center gap-1.5 ml-1">
            <Stars count={Math.round(parseFloat(avgRating))} size="text-[13px]" />
            <span className="text-[13px] font-medium text-[#1A1714]">{avgRating}</span>
            <span className="text-[12px] text-[#8A8278]">({reviewCount} reviews)</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h1
        className="font-bold text-[#1C3A2F] leading-[1.12] tracking-[-0.01em] mb-3"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 3.5vw, 40px)" }}
      >
        {trip.title} —{" "}
        <em className="not-italic text-[#C4622A]">{trip.location}</em>
      </h1>

      {/* Meta chips */}
      <div className="flex flex-wrap gap-4 text-[13px] text-[#8A8278]">
        <span className="flex items-center gap-1.5">
          📍 <strong className="text-[#1A1714]">{trip.location}</strong>
        </span>
        <span className="flex items-center gap-1.5">
          🗓 <strong className="text-[#1A1714]">{trip.duration}</strong>
        </span>
        {trip.groupSize && (
          <span className="flex items-center gap-1.5">
            👥 <strong className="text-[#1A1714]">{trip.groupSize}</strong>
          </span>
        )}
        <span className="flex items-center gap-1.5">
          🌐 <strong className="text-[#1A1714]">English & Hindi</strong>
        </span>
      </div>
    </div>
  );
}