import Link from "next/link";
import { notFound } from "next/navigation";
import CategorySection from "@/components/category/CategorySection";
import categoriesData from "@/dummy_data/categoriesData";

interface Props { params: Promise<{ slug: string }>; }

export default async function CategorySlugPage({ params }: Props) {
  const { slug } =await  params;

  const category = categoriesData.find((c) => c.slug === slug);
  if (!category) notFound();

  // Derived values
  const locations = [...new Set(category.items.map((i) => i.location))];

  const durations = category.items
    .map((i) => parseInt(i.duration))
    .filter((n) => !isNaN(n));

  const minDur = Math.min(...durations);
  const maxDur = Math.max(...durations);

  const words = category.name.split(" ");
  const firstPart = words.slice(0, -1).join(" ");
  const lastWord = words.at(-1);

  const meta = [
    `${category.items.length} Programs Available`,
    locations.slice(0, 3).join(" · ") +
      (locations.length > 3 ? " & more" : ""),
    `${minDur} – ${maxDur} Days`,
  ];

  return (
    <div className="min-h-screen bg-[#F4F8F4]">

      {/* ── HERO ── */}
      <div className="relative h-[520px] overflow-hidden">
        <img
          src={category.bannerImage ?? "/banner/banner1.png"}
          alt={category.name}
          className="w-full h-full object-cover brightness-[0.55]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/75" />

        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-12">

          <span className="inline-flex items-center gap-2 w-fit mb-4 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-xs tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7BAE9E]" />
            {category.name}
          </span>

          <h1 className="text-5xl md:text-6xl font-semibold text-white leading-tight mb-4 font-serif">
            {firstPart}{" "}
            <em className="italic text-[#C8E6D0]">{lastWord}</em>
          </h1>

          {category.description && (
            <p className="text-white/80 text-base max-w-xl mb-6">
              {category.description}
            </p>
          )}

          <div className="flex flex-wrap gap-6 text-white/80 text-sm">
            {meta.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#C8A96A]" />
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BREADCRUMB (BIGGER + CLEANER) ── */}
      <div className="bg-white border-b border-black/5 px-8 md:px-16 py-5 flex items-center gap-3 text-sm md:text-base">
        <Link
          href="/"
          className="text-[#7BAE9E] font-medium hover:underline"
        >
          Home
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-[#1E3D35] font-semibold">
          {category.name}
        </span>
      </div>

      {/* ── CARDS ── */}
      <CategorySection categories={[category]} />

      {/* ── CTA ── */}
      <div className="mx-8 md:mx-16 mb-16 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-sm border border-black/[0.06] rounded-2xl px-8 py-7">
        <div>
          <h3 className="text-2xl font-medium text-[#1E3D35] mb-1 font-serif">
            Not sure which program suits you?
          </h3>
          <p className="text-gray-500 text-sm">
            Talk to our guides — we'll help you find the perfect experience.
          </p>
        </div>

        <Link
          href="/contact"
          className="shrink-0 px-6 py-3 bg-[#1E3D35] text-white text-sm rounded-full hover:bg-[#162e28] transition"
        >
          Get in touch →
        </Link>
      </div>
    </div>
  );
}