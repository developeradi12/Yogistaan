import { CarouselPlugin } from "@/components/hero-sections/Carousel"
import Navbar from "@/components/hero-sections/Navbar"
import CategorySection from "@/components/hero-sections/trip/CategorySection"
import { categories, trips } from "@/dummy_data/data"
import { MapPin, Star, Users, Shield } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const stats = [
  { icon: MapPin,  value: "200+", label: "Destinations" },
  { icon: Star,    value: "4.9★", label: "Avg. Rating" },
  { icon: Users,   value: "12k+", label: "Happy Travellers" },
  { icon: Shield,  value: "100%", label: "Safe Bookings" },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Navbar />

      <main className="flex-1">

        {/* ── Hero Carousel ── */}
        <section>
          <CarouselPlugin />
        </section>

        {/* ── Trust / Stats Bar ── */}
        <section
          className="bg-stone-900 py-5 animate-in fade-in slide-in-from-bottom-2 duration-700"
          style={{ animationDelay: "200ms", animationFillMode: "both" }}
        >
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-px">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div key={i} className="flex flex-col items-center gap-1 py-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span className="font-serif text-xl font-bold text-white">{value}</span>
                </div>
                <span className="text-stone-400 text-xs tracking-wide uppercase">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Category / Trips Section ── */}
        <section
          className="max-w-7xl mx-auto px-4 md:px-8 py-14 animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{ animationDelay: "350ms", animationFillMode: "both" }}
        >
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <p className="text-amber-600 text-xs font-semibold uppercase tracking-[0.18em] mb-1">
                ✦ Explore
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 leading-tight">
                Find your next adventure
              </h2>
            </div>
            <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
              Handpicked trips across India — mountains, coasts, forests and beyond.
            </p>
          </div>

          <Separator className="mb-10 bg-stone-200" />

          <CategorySection
            categories={categories}
            data={trips}
          />
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-stone-900 border-t border-stone-800 py-8 mt-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-serif text-lg font-bold text-white">
            Yogi<span className="text-amber-400">staan</span>
          </span>
          <p className="text-stone-500 text-xs">
            © {new Date().getFullYear()} Yogistaan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}