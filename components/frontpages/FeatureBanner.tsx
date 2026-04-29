const FeatureBanner = () => {
  return (
    <div className="mx-14 mb-20 rounded-2xl overflow-hidden relative">
      <div className="relative h-150">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop&q=80"
          alt="Himalayan retreat"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(28,58,47,0.88) 0%, rgba(28,58,47,0.5) 55%, rgba(28,58,47,0.2) 100%)",
          }}
        />
      </div>
      {/* Body */}
      <div className="absolute top-1/2 left-14 -translate-y-1/2 max-w-135">
        <span className="text-[12px] font-medium tracking-[0.18em] uppercase text-[#C8A96A] mb-4 block">
          ✦ Signature Experience · 2025
        </span>
        <h2
          className="font-black text-white leading-[1.1] tracking-tight mb-4"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(32px,4vw,52px)",
          }}
        >
          The Ultimate
          <br />
          <em className="not-italic text-[#B8D4C8]">Himalayan Moksha</em>
          <br />
          Retreat
        </h2>
        <p className="text-[16px] font-light text-white/80 leading-[1.75] mb-7">
          21 days of deep immersion at 10,000 feet. Sacred Ganga sunrise
          rituals, lineage Hatha yoga, Vedic philosophy, silence days, and
          Himalayan trekking — the transformation of a lifetime.
        </p>
        <div className="flex flex-wrap gap-4 mb-7">
          {[
            "Yoga Alliance RYT-200 Certified",
            "All meals & accommodation included",
            "Airport transfers provided",
            "Small group — max 12 students",
          ].map((p) => (
            <span
              key={p}
              className="flex items-center gap-2 text-white/90 text-[14px]"
            >
              <span className="w-5 h-5 rounded-full bg-[#C8A96A]/30 border border-[#C8A96A] flex items-center justify-center text-[10px] text-[#C8A96A] shrink-0">
                ✓
              </span>
              {p}
            </span>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap">
          <a
            href="#"
            className="bg-white text-[#1C3A2F] px-7 py-3 text-[14px] font-medium rounded hover:bg-[#FAF7F2] hover:-translate-y-px hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all"
          >
            Book This Retreat →
          </a>
          <a
            href="#"
            className="border-[1.5px] border-white/50 text-white px-7 py-3 text-[14px] font-medium rounded hover:border-white hover:bg-white/10 transition-all"
          >
            Download Itinerary
          </a>
        </div>
      </div>
      {/* Floater */}
      <div className="absolute bottom-7 right-10 bg-white rounded-xl px-5 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.15)] hidden lg:block">
        <p className="text-[11px] text-[#7A7A72] tracking-wide uppercase mb-1">
          Next Batch Starting
        </p>
        <p
          className="font-bold text-[#1C3A2F] text-[26px]"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          June 15{" "}
          <span className="text-[14px] font-normal text-[#7A7A72]">2025</span>
        </p>
        <p className="text-[12px] text-[#4A7C6A] mt-1">🟢 4 spots remaining</p>
      </div>
    </div>
  );
};

export default FeatureBanner;
