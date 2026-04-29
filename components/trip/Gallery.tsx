"use client";
import { useState, useEffect, useCallback } from "react";

// ── Lightbox ─────────────────────────────────────────────────────
function LightboxModal({
  idx,
  images,
  onClose,
  onMove,
}: {
  idx: number;
  images: string[];
  onClose: () => void;
  onMove: (dir: number) => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   onMove(-1);
      if (e.key === "ArrowRight")  onMove(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onMove]);

  return (
    <div
      className="fixed inset-0 bg-black/92 z-[999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-5 text-white/70 hover:text-white text-4xl leading-none transition-colors"
        aria-label="Close"
      >
        ×
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onMove(-1); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl transition-colors"
        aria-label="Previous"
      >
        ‹
      </button>

      {/* Image */}
      <img
        src={images[idx]}
        alt={`Gallery image ${idx + 1}`}
        className="max-h-[88vh] max-w-[88vw] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onMove(1); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl transition-colors"
        aria-label="Next"
      >
        ›
      </button>

      {/* Counter */}
      <span className="absolute bottom-5 text-white/60 text-sm tracking-wide">
        {idx + 1} / {images.length}
      </span>
    </div>
  );
}

// ── Grid cell layout config ───────────────────────────────────────
const GRID_CELLS: { className: string }[] = [
  { className: "col-span-2 row-span-2" }, // hero
  { className: "col-span-1 row-span-1" },
  { className: "col-span-1 row-span-1" },
  { className: "col-span-1 row-span-1" },
  { className: "col-span-1 row-span-1" }, // "view all" overlay
];

// ── Gallery ──────────────────────────────────────────────────────
export default function Gallery({ images }: { images?: string[] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const moveLightbox  = useCallback(
    (dir: number) =>
      setLightboxIdx((prev) =>
        prev !== null ? (prev + dir + images!.length) % images!.length : 0
      ),
    [images]
  );

  if (!images?.length) return null;

  // Pad or slice to exactly 5 slots so the grid always renders cleanly
  const slots = Array.from({ length: 5 }, (_, i) => images[i % images.length]);
  const hasMore = images.length > 5;

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden mb-8 h-[360px]">
        {GRID_CELLS.map(({ className }, i) => {
          const isOverlay = i === 4;
          return (
            <div
              key={i}
              className={`${className} relative cursor-pointer overflow-hidden group`}
              onClick={() => setLightboxIdx(i < images.length ? i : 0)}
            >
              <img
                src={slots[i]}
                alt={`Trip photo ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover tint on all cells */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

              {/* "View all" overlay on last cell */}
              {isOverlay && hasMore && (
                <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-white gap-1">
                  <span className="text-2xl">⊞</span>
                  <span className="text-[13px] font-medium tracking-wide">
                    +{images.length - 4} photos
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {lightboxIdx !== null && (
        <LightboxModal
          idx={lightboxIdx}
          images={images}
          onClose={closeLightbox}
          onMove={moveLightbox}
        />
      )}
    </>
  );
}