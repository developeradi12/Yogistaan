"use client";
import { useState } from "react";
import CategoryTabs from "./CategoryTabs";
import TripCard from "./TripCard";

export default function CategorySection({ categories, data }) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? data
      : data.filter((item) => item.category === active);

  return (
    <section className="w-full px-4 md:px-10 py-6">
      {/* Categories */}
      <CategoryTabs
        categories={["All", ...categories]}
        selected={active}
        onSelect={setActive}
      />

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02]"
          >
            <TripCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}