"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Category, CategoryItem } from "@/types";
import Image from "next/image";

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const activeCategories = categories.filter((c) => c.active);

  // Collect all unique filter tags across every category's items
  const allFilters = useMemo(() => {
    const tags = activeCategories.flatMap((c) => c.items.flatMap((i) => i.places));
    return ["All", ...Array.from(new Set(tags))];
  }, [activeCategories]);

  return (
    <div>
      {activeCategories.map((category) => {
        const filteredItems =
          activeFilter === "All"
            ? category.items
            : category.items.filter((i) => i.places.includes(activeFilter));

        return (
          <div key={category.id}>

            {/* ── FILTER BAR ── */}
            <div className="bg-white border-b border-black/5 px-8 md:px-16 py-4 flex flex-wrap items-center gap-2">
              {allFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] border transition-all ${activeFilter === f
                      ? "bg-[#1E3D35] text-white border-[#1E3D35]"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                    }`}
                >
                  {f}
                  {f === "All" && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeFilter === f ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {category.items.length}
                    </span>
                  )}
                </button>
              ))}

              {/* sort — right side */}
              <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
                Sort by
                <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Duration</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>

            {/* ── GRID ── */}
            <section className="px-8 md:px-16 pt-10 pb-4" id={`section-${category.id}`}>
              <p className="text-[11px] tracking-[0.18em] uppercase text-[#7BAE9E] mb-1">
                Browse Programs
              </p>
              <h2
                className="text-3xl font-medium text-[#1A1A18] mb-7"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Choose your path
              </h2>

              {filteredItems.length === 0 ? (
                <p className="text-gray-400 text-sm py-10 text-center">
                  No programs match this filter.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="group bg-white rounded-2xl border border-black/[0.06] overflow-hidden flex flex-col h-full hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                      >
                        {/* IMAGE (fixed height for all) */}
                        <div className="relative h-52 w-full overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* PRICE */}
                          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                            ₹{item.price.toLocaleString("en-IN")}
                          </div>

                          {/* TAGS */}
                          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                            {item.places.slice(0, 2).map((p) => (
                              <span
                                key={p}
                                className="text-[10px] bg-white/90 text-[#1E3D35] px-2.5 py-1 rounded-full"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CONTENT */}
                        <div className="flex flex-col flex-1 p-5">
                          <div className="flex items-center gap-1.5 mb-2 text-xs uppercase text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" />
                            {item.location}
                          </div>

                          <h3 className="text-lg font-medium text-[#1A1A18] mb-3 leading-snug">
                            {item.title}
                          </h3>

                          {/* push bottom */}
                          <div className="mt-auto flex items-center justify-between pt-3 border-t border-black/[0.06]">
                            <span className="text-sm text-gray-500">
                              <strong className="text-gray-800">{item.duration}</strong> · Certified
                            </span>

                            <Link
                              href={`/tripDetail/${item.slug ?? item.id}`}
                              className="text-sm text-[#7BAE9E] font-medium hover:text-[#1E3D35]"
                            >
                              View Details →
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

          </div>
        );
      })}
    </div>
  );
}