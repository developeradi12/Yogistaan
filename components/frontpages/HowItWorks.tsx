import SectionLabel from "./SectionLabel";

const STEPS = [
  {
    n: "1",
    title: "Discover Your Sacred Destination",
    body: "Browse 500+ certified retreats across Rishikesh, Bali, Kerala, Mysore, the Himalayas and beyond. Filter by style, duration, budget and certification level.",
  },
  {
    n: "2",
    title: "Choose Your Dates & Program",
    body: "Select from flexible monthly batches. 200-hr, 300-hr, 500-hr YTT certifications or retreat-only packages. Check availability in real-time.",
  },
  {
    n: "3",
    title: "Secure Your Spot with a Deposit",
    body: "Reserve with just 20% down. Secure payment, instant booking confirmation, and direct communication with your retreat centre.",
  },
  {
    n: "4",
    title: "Arrive & Transform",
    body: "Your digital welcome kit includes airport transfers, packing lists, preparation guidance, and a dedicated support team available 24/7.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-14">
      <div className="container mx-auto">
        <div className="text-center">
          <SectionLabel center="center">Simple Process</SectionLabel>
          <h2
            className="font-bold text-[#1C3A2F]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(30px,3.5vw,46px)",
            }}
          >
            Your Journey,{" "}
            <em className="not-italic text-[#C4622A]">Effortlessly Planned</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-14 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&auto=format&fit=crop&q=80"
              alt="Yoga destination"
              className="w-full rounded-xl block"
            />
            <div className="absolute top-6 -left-8 bg-white rounded-xl px-4 py-3 shadow-[0_8px_30px_rgba(28,58,47,0.15)] text-center min-w-27.5">
              <span
                className="font-black text-[#C4622A] text-3xl block"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                500+
              </span>
              <span className="text-[11px] text-[#7A7A72] tracking-wide leading-snug">
                Verified Retreats Worldwide
              </span>
            </div>
            <div className="absolute -bottom-6 -right-6 w-55 rounded-lg overflow-hidden shadow-[0_16px_50px_rgba(28,58,47,0.2)] hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=300&auto=format&fit=crop&q=80"
                alt="Yoga teacher"
                className="w-full block"
              />
            </div>
          </div>
          {/* Steps */}
          <div className="flex flex-col gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="relative">
                  <div
                    className="w-11 h-11 rounded-full bg-[#1C3A2F] text-[#C8A96A] flex items-center justify-center font-bold text-[18px] shrink-0"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="absolute top-11 left-1/2 -translate-x-1/2 w-px bg-linear-to-b from-[#B8D4C8] to-transparent"
                      style={{ height: "calc(100% + 32px)" }}
                    />
                  )}
                </div>
                <div>
                  <h3
                    className="font-bold text-[#1C3A2F] mb-1.5"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: "19px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[14.5px] text-[#7A7A72] leading-relaxed font-light">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
