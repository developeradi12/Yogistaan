const Footer = () => {
  return (
    <footer className="bg-[#1A1A18] text-white/70 pt-16 px-14 relative">
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background:
            "linear-gradient(90deg, transparent, #C8A96A, #C4622A, #C8A96A, transparent)",
        }}
      />
      <div className="max-w-325 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/8">
        {/* Brand */}
        <div>
          <span
            className="font-bold text-2xl text-white block mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Yogi<span className="text-[#C4622A]">Staan</span>
          </span>
          <p className="text-[14.5px] leading-relaxed font-light max-w-70 mb-6">
            The world's most trusted platform for sacred yoga retreats and
            teacher trainings. Connecting seekers to authentic lineage teachers
            since 2019.
          </p>
          <div className="flex gap-3 flex-wrap">
            {[
              "Yoga Alliance Partner",
              "500+ Verified Retreats",
              "RYT Certified Programs",
            ].map((b) => (
              <span
                key={b}
                className="bg-white/6 border border-white/10 rounded text-[11.5px] text-white/60 px-3 py-1.5 flex items-center gap-1.5"
              >
                <span className="text-[#7FAF98]">✓</span> {b}
              </span>
            ))}
          </div>
        </div>
        {/* Links */}
        {[
          {
            heading: "Explore",
            links: [
              "Yoga Retreats",
              "200-Hr YTT",
              "300-Hr Advanced",
              "Meditation Retreats",
              "Ayurveda Programs",
              "Weekend Getaways",
            ],
          },
          {
            heading: "Destinations",
            links: [
              "Rishikesh, India",
              "Ubud, Bali",
              "Mysore, India",
              "Kerala, India",
              "Kathmandu, Nepal",
              "View All →",
            ],
          },
        ].map((col) => (
          <div key={col.heading}>
            <h4 className="text-[13px] font-medium text-white tracking-[0.08em] uppercase mb-5">
              {col.heading}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[14px] text-white/50 hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* Newsletter */}
        <div>
          <h4 className="text-[13px] font-medium text-white tracking-[0.08em] uppercase mb-5">
            Stay Inspired
          </h4>
          <p className="text-[14px] text-white/60 leading-relaxed mb-3">
            Get sacred retreat offers, travel guides, and yoga wisdom in your
            inbox.
          </p>
          <div className="flex mb-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/8 border border-white/12 px-3.5 py-2.5 text-white text-[13.5px] placeholder:text-white/30 outline-none focus:border-[#C8A96A]/40 transition-colors"
            />
            <button className="bg-[#C4622A] text-white px-4 text-[13px] font-medium hover:bg-[#a84f20] transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-[11.5px] text-white/30">
            No spam. Unsubscribe anytime. 🌿
          </p>
        </div>
      </div>
      <div className="max-w-325 mx-auto py-5 flex flex-wrap gap-3 justify-between items-center">
        <p className="text-[13px] text-white/30">
          © 2025 SoulPath Retreats — Made with 🙏 for seekers everywhere
        </p>
        <div className="flex gap-5">
          {[
            "Privacy Policy",
            "Terms of Service",
            "Cancellation Policy",
            "Contact",
          ].map((l) => (
            <a
              key={l}
              href="#"
              className="text-[12.5px] text-white/30 hover:text-white/70 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
