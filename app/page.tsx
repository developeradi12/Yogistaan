import { CarouselPlugin } from "@/components/hero-sections/Carousel"
import Navbar from "@/components/hero-sections/Navbar"
import { MapPin, Star, Users, Shield } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Footer from "@/components/hero-sections/Footer"
import Image from "next/image"
import { Categories } from "@/components/hero-sections/Categories"

const stats = [
  { icon: MapPin, value: "200+", label: "Destinations" },
  { icon: Star, value: "4.9★", label: "Avg. Rating" },
  { icon: Users, value: "12k+", label: "Happy Travellers" },
  { icon: Shield, value: "100%", label: "Safe Bookings" },
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
        <section className="bg-primary py-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-px">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div key={i} className="flex flex-col items-center gap-1 py-3">

                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-white/80" />
                  <span className="text-xl font-bold text-white">{value}</span>
                </div>

                <span className="text-white/70 text-xs tracking-wide uppercase">
                  {label}
                </span>

              </div>
            ))}
          </div>
        </section>

        {/*  Yoga /yoga/Photo ── */}
        <section
          className="max-w-7xl mx-auto px-4 md:px-8 py-14 animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{ animationDelay: "350ms", animationFillMode: "both" }}
        >
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-10">

            {/* Left */}
            <div className="w-full md:w-1/2 md:pr-6 md:border-r border-accent">

              <p className="special-text text-xs md:text-sm text-accent uppercase tracking-[0.2em]">
                ✦ Discover
              </p>

              <h2 className="text-2xl md:text-3xl font-medium text-text-main leading-tight mt-2">
                Deepen your yoga{" "}
                <span className="font-bold special-text text-accent">
                  journey
                </span>
              </h2>

            </div>

            {/* Right */}
            <div className="w-full md:w-1/2 md:pl-6 self-start lg:mt-8">
              <p className="text-base md:text-lg max-w-lg leading-relaxed text-gray-600">
                Explore curated yoga retreats, meditation escapes, and wellness experiences
                designed to restore balance, clarity, and inner peace.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-20">

            {["/yoga/photo1.jpeg", "/yoga/photo2.jpeg", "/yoga/photo3.jpeg", "/yoga/photo6.jpeg", "/yoga/photo5.jpeg"].map((src, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden group"
              >
                <Image
                  src={src}
                  alt={`Yoga ${i}`}
                  width={300}
                  height={300}
                  className="w-full h-[180px] md:h-[280px] object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* optional overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
              </div>
            ))}

          </div>
          <Separator className="mb-10 bg-border" />


        </section>

        {/* ── Trip Categories & Carousel ── */}
        <Categories/>

      </main>
      <Footer />
    </div>
  )
}