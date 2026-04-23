import { categories, trips } from "@/dummy_data/data"
import CategorySection from "./trip/CategorySection"

export const Categories = () => {
  return (
    <section
      className="bg-[#94687e] py-12 animate-in fade-in slide-in-from-bottom-2 duration-700"
      style={{ animationDelay: "200ms", animationFillMode: "both" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-10">

          {/* Left */}
          <div className="w-full md:w-1/2 md:pr-6 md:border-r border-white/30">

            <p className="special-text text-xs md:text-sm text-white/50 uppercase tracking-[0.2em]">
              ✦ Explore
            </p>

            <h2 className="text-2xl px-4 md:text-3xl font-medium text-white leading-tight mt-2">
              योग retreats across{" "}
              <span className="block text-right font-bold special-text text-highlight">
                destinations
              </span>
            </h2>

          </div>

          {/* Right (Upgraded UI) */}
          <div className="w-full md:w-1/2 md:pl-6 self-start lg:mt-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-white border border-white/20 shadow-lg space-y-3">

              <h3 className="text-lg font-semibold">
                What you’ll Experience ✨
              </h3>

              <ul className="space-y-2 text-sm md:text-base text-white/90">
                <li>🧘 Daily yoga & meditation</li>
                <li>🌿 Nature-based retreats</li>
                <li>🌊 Beach & mountain escapes</li>
                <li>✨ Mental clarity & healing</li>
              </ul>

            </div>
          </div>

        </div>

        {/* Carousel */}
        <CategorySection
          categories={categories}
          data={trips}
        />

      </div>
    </section>
  )
}
