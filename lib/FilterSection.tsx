"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────
export interface Filters {
  categories: string[];
  priceMin:   number;
  priceMax:   number;
  search:     string;
  sortBy:     string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface CategoryCounts {
  [category: string]: number;
}

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────
export const SORT_OPTIONS: SortOption[] = [
  { value: "default",    label: "Featured"          },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating",     label: "Top Rated"         },
  { value: "newest",     label: "Newest First"      },
];

export const ALL_CATEGORIES: string[] = [
  "Mats", "Accessories", "Meditation", "Wellness", "Apparel",
];

// ─────────────────────────────────────────
// FilterSection
// ─────────────────────────────────────────
interface FilterSectionProps {
  title:        string;
  children:     React.ReactNode;
  defaultOpen?: boolean;
}

export function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#1C3A2F]/8 py-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-[11px] font-bold tracking-[0.22em] uppercase text-[#1C3A2F] hover:opacity-70 transition-opacity"
      >
        {title}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────
// PriceRangeSlider
// ─────────────────────────────────────────
interface PriceRangeSliderProps {
  min:      number;
  max:      number;
  value:    [number, number];
  onChange: (range: [number, number]) => void;
}

export function PriceRangeSlider({ min, max, value, onChange }: PriceRangeSliderProps) {
  const [localMin, setLocalMin] = useState(value[0]);
  const [localMax, setLocalMax] = useState(value[1]);

  useEffect(() => { setLocalMin(value[0]); setLocalMax(value[1]); }, [value]);

  const commit = useCallback((nMin: number, nMax: number) => {
    const safeMin = Math.min(nMin, nMax - 1);
    const safeMax = Math.max(nMax, nMin + 1);
    onChange([
      Math.max(min, Math.min(safeMin, max)),
      Math.min(max, Math.max(safeMax, min)),
    ]);
  }, [min, max, onChange]);

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div>
      <div className="relative h-1 bg-[#1C3A2F]/10 rounded-full my-5 mx-2">
        <div
          className="absolute h-full bg-[#1C3A2F] rounded-full"
          style={{ left: `${pct(localMin)}%`, right: `${100 - pct(localMax)}%` }}
        />
        <input
          type="range" min={min} max={max} value={localMin}
          onChange={(e) => { const v = Number(e.target.value); setLocalMin(v); if (v <= localMax) commit(v, localMax); }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: localMin > max - 10 ? 5 : 3 }}
        />
        <input
          type="range" min={min} max={max} value={localMax}
          onChange={(e) => { const v = Number(e.target.value); setLocalMax(v); if (v >= localMin) commit(localMin, v); }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 4 }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#1C3A2F] shadow-md pointer-events-none"
          style={{ left: `calc(${pct(localMin)}% - 8px)` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#1C3A2F] shadow-md pointer-events-none"
          style={{ left: `calc(${pct(localMax)}% - 8px)` }}
        />
      </div>

      <div className="flex items-center gap-2 mt-2">
        {(
          [
            { label: "Min", val: localMin, set: setLocalMin, side: "min" },
            { label: "Max", val: localMax, set: setLocalMax, side: "max" },
          ] as const
        ).map(({ label, val, set, side }) => (
          <div key={side} className="flex-1">
            <label className="text-[10px] text-[#7A7A72] uppercase tracking-wider block mb-1">{label}</label>
            <div className="flex items-center border border-[#1C3A2F]/15 px-2 py-1.5 bg-white">
              <span className="text-[11px] text-[#7A7A72] mr-1">₹</span>
              <input
                type="number" value={val} min={min} max={max}
                onChange={(e) => set(Number(e.target.value))}
                onBlur={() => commit(localMin, localMax)}
                className="w-full text-[12px] text-[#1C3A2F] font-medium bg-transparent outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// FilterChip
// ─────────────────────────────────────────
interface FilterChipProps {
  label:    string;
  onRemove: () => void;
}

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold bg-[#1C3A2F] text-white tracking-wide">
      {label}
      <button onClick={onRemove} className="hover:opacity-60 transition-opacity">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

// ─────────────────────────────────────────
// SidebarContent
// ─────────────────────────────────────────
interface SidebarContentProps {
  filters:        Filters;
  setFilter:      <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  categoryCounts: CategoryCounts;
  priceMin:       number;
  priceMax:       number;
}

export function SidebarContent({
  filters, setFilter, categoryCounts, priceMin, priceMax,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col gap-0">

      <FilterSection title="Search">
        <div className="flex items-center gap-2 border border-[#1C3A2F]/15 px-3 py-2 bg-white focus-within:border-[#1C3A2F] transition-colors">
          <Search className="w-3.5 h-3.5 text-[#7A7A72] shrink-0" />
          <input
            type="text"
            placeholder="Search products…"
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
            className="flex-1 text-[13px] bg-transparent outline-none placeholder:text-[#AFAFAA] text-[#1A1A18]"
          />
          {filters.search && (
            <button onClick={() => setFilter("search", "")}>
              <X className="w-3.5 h-3.5 text-[#7A7A72] hover:text-[#1C3A2F]" />
            </button>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Collections">
        <div className="space-y-0.5">
          {ALL_CATEGORIES.map((cat) => {
            const checked = filters.categories.includes(cat);
            const count   = categoryCounts[cat] ?? 0;
            return (
              <label
                key={cat}
                className={`flex items-center justify-between px-2 py-2 cursor-pointer group transition-colors ${
                  checked ? "bg-[#1C3A2F]/5" : "hover:bg-[#1C3A2F]/[0.03]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 border flex items-center justify-center transition-all shrink-0 ${
                    checked ? "bg-[#1C3A2F] border-[#1C3A2F]" : "border-[#1C3A2F]/25 group-hover:border-[#1C3A2F]/50"
                  }`}>
                    {checked && (
                      <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 fill-white">
                        <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox" className="sr-only" checked={checked}
                    onChange={() => {
                      const next = checked
                        ? filters.categories.filter((c) => c !== cat)
                        : [...filters.categories, cat];
                      setFilter("categories", next);
                    }}
                  />
                  <span className={`text-[13px] transition-colors ${checked ? "text-[#1C3A2F] font-semibold" : "text-[#5A5A52]"}`}>
                    {cat}
                  </span>
                </div>
                <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-sm ${
                  checked ? "bg-[#1C3A2F] text-white" : "bg-[#1C3A2F]/8 text-[#7A7A72]"
                }`}>
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <PriceRangeSlider
          min={priceMin}
          max={priceMax}
          value={[filters.priceMin, filters.priceMax]}
          onChange={([pMin, pMax]) => {
            setFilter("priceMin", pMin);
            setFilter("priceMax", pMax);
          }}
        />
      </FilterSection>

      <FilterSection title="Sort By" defaultOpen={false}>
        <div className="space-y-0.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter("sortBy", opt.value)}
              className={`w-full text-left px-2 py-2 text-[13px] flex items-center justify-between transition-colors ${
                filters.sortBy === opt.value
                  ? "text-[#1C3A2F] font-semibold bg-[#1C3A2F]/5"
                  : "text-[#5A5A52] hover:text-[#1C3A2F] hover:bg-[#1C3A2F]/[0.03]"
              }`}
            >
              {opt.label}
              {filters.sortBy === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-[#C4622A]" />}
            </button>
          ))}
        </div>
      </FilterSection>

    </div>
  );
}