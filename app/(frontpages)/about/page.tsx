"use client";

import Header from "@/components/frontpages/Header";
import Footer from "@/components/frontpages/Footer";
import AnnouncementBar from "@/components/frontpages/AnnouncementBar";


const values = [
  {
    icon: "🌿",
    title: "Authentic Lineage",
    desc: "Every practice we teach traces back to verified traditional lineages — not diluted, not commercial.",
  },
  {
    icon: "🛡️",
    title: "Safety First",
    desc: "From altitude preparation to emergency protocols, your physical and mental safety is our highest priority.",
  },
  {
    icon: "🌍",
    title: "Conscious Travel",
    desc: "We partner only with eco-conscious accommodations and local communities that share our values.",
  },
  {
    icon: "🤝",
    title: "Lifetime Community",
    desc: "A Yogistaan experience doesn't end at departure. You join a global family of 8,000+ seekers.",
  },
];

// ─── Component ─────────────────────────────────────────────────────

export default function AboutPage() {

  return (
    <>

      {/* ── Hero ── */}
      <section className="relative h-[500px] md:h-[620px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop&q=80"
          alt="About Yogistaan"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(28,58,47,0.6) 0%, rgba(28,58,47,0.85) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-[#C8A96A] text-xs font-medium tracking-[0.2em] uppercase mb-4">
            Our Story
          </span>
          <h1
            className="text-white font-black leading-tight mb-4"
            style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(36px,5vw,72px)" }}
          >
            Born on the Banks of the
            <br />
            <em className="not-italic text-[#B8D4C8]">Sacred Ganga</em>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed">
            Yogistaan began as a humble shala in Rishikesh. Today we're a global platform connecting thousands of seekers with authentic yoga, retreat, and adventure experiences.
          </p>
        </div>
      </section>

      {/* ── Story section ── */}
      <section className="py-20 px-6 md:px-14 container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#C4622A] text-xs font-semibold tracking-[0.15em] uppercase block mb-3">
              How it started
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1C3A2F] mb-6 leading-tight"
            >
              From a Single Shala to a Global Movement
            </h2>
            <p className="text-[#3D3D38] leading-relaxed mb-4 text-[15.5px]">
              In 2019, founder Aryan Mishra turned down a corporate career to teach yoga full-time from a small wooden shala on the Ganga ghats. He had one belief: that yoga, practiced in its authentic form, could transform lives.
            </p>
            <p className="text-[#3D3D38] leading-relaxed mb-4 text-[15.5px]">
              Word spread. Students came from London, Stockholm, Tokyo. The demand for an ethical, authentic booking platform grew. Yogistaan was born — not as a marketplace, but as a community of verified teachers and seekers committed to real transformation.
            </p>
            <p className="text-[#3D3D38] leading-relaxed text-[15.5px]">
              Today we host 200+ retreat programs annually, partner with 50+ certified teachers, and have guided over 8,000 students across India, Nepal, Bali, and Tibet.
            </p>
          </div>
          <div className="relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="rounded-2xl w-full h-80 object-cover shadow-2xl"
            >
              <source src="/video/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-xl px-5 py-4 shadow-xl border border-[#C8A96A]/20">
              <p className="text-[11px] text-[#7A7A72] uppercase tracking-wide mb-1">Yoga Alliance Partner</p>
              <p className="font-bold text-[#1C3A2F] text-lg" style={{ fontFamily: "Playfair Display, serif" }}>
                RYT-500 Verified ✓
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-[#F2EDE3] py-20 px-6 md:px-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#C4622A] text-xs font-semibold tracking-[0.15em] uppercase block mb-3">
              What we stand for
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1C3A2F]"

            >
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-[#C8A96A]/10"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3
                  className="font-bold text-[#1C3A2F] text-lg mb-2"

                >
                  {v.title}
                </h3>
                <p className="text-[#5A5A52] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1C3A2F] py-20 px-6 text-center">
        <h2
          className="text-white font-bold text-3xl md:text-4xl mb-4"
        >
          Ready to Begin Your Journey?
        </h2>
        <p className="text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
          Browse our upcoming retreats, trainings, and adventures — or reach out to our team to design a custom experience.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/"
            className="bg-[#C4622A] text-white px-8 py-3 rounded font-medium hover:bg-[#a84f20] transition-all hover:-translate-y-px"
          >
            Explore Programs
          </a>
          <a
            href="/contact"
            className="border border-white/40 text-white px-8 py-3 rounded font-medium hover:border-white hover:bg-white/10 transition-all"
          >
            Contact Us
          </a>
        </div>
      </section>


    </>
  );
}
