"use client";

import { useState } from "react";
import Header from "@/components/frontpages/Header";
import Footer from "@/components/frontpages/Footer";
import AnnouncementBar from "@/components/frontpages/AnnouncementBar";
import type { FaqItem } from "@/types";

// ─── FAQ data — replace with API fetch in production ───────────────
const faqData: FaqItem[] = [
  // Booking
  {
    id: "faq_how_to_book",
    question: "How do I book a retreat or training?",
    answer:
      "Browse our programs on the homepage, click 'View Details' on any card, and follow the booking flow. You can reserve your spot with a 25% advance payment. For group bookings or custom programs, contact us directly.",
    category: "Booking",
    active: true,
    sortOrder: 1,
  },
  {
    id: "faq_cancellation",
    question: "What is the cancellation policy?",
    answer:
      "Cancellations made 30+ days before the start date receive a full refund minus a ₹500 processing fee. 15-29 days: 50% refund. Less than 15 days: no refund but you can transfer your booking to a future batch. Emergencies are handled case-by-case.",
    category: "Booking",
    active: true,
    sortOrder: 2,
  },
  {
    id: "faq_payment_methods",
    question: "What payment methods are accepted?",
    answer:
      "We accept UPI, net banking, all major credit/debit cards, and international bank transfers. EMI options are available on credit cards for bookings above ₹15,000. All transactions are encrypted and secured.",
    category: "Booking",
    active: true,
    sortOrder: 3,
  },
  {
    id: "faq_group_discount",
    question: "Are there group discounts?",
    answer:
      "Yes! Groups of 3-5 get 10% off. Groups of 6+ get 15% off. Corporate wellness groups (10+) receive a custom quote. Contact our team to arrange group bookings.",
    category: "Booking",
    active: true,
    sortOrder: 4,
  },
  // Retreats
  {
    id: "faq_what_included",
    question: "What's included in retreat pricing?",
    answer:
      "All Yogistaan retreats include accommodation, daily yoga and meditation sessions, all meals (sattvic vegetarian), course materials, and a certificate of completion. Adventure programs additionally include guide fees, permits, and safety equipment. Check individual program pages for specifics.",
    category: "Retreats",
    active: true,
    sortOrder: 5,
  },
  {
    id: "faq_beginner_welcome",
    question: "Am I too much of a beginner to join?",
    answer:
      "Absolutely not. Our Academy programs start from zero experience. The Beginner Bliss 100-Hrs YTTC is specifically designed for complete newcomers. All our teachers are trained to work with all levels, and personal attention is a core part of every program.",
    category: "Retreats",
    active: true,
    sortOrder: 6,
  },
  {
    id: "faq_solo_travel",
    question: "Is it safe to travel solo?",
    answer:
      "We welcome solo travelers — in fact, most participants come alone and leave with lifelong friends. All our venues are vetted for safety, our programs have 24/7 on-site support, and we have a dedicated community platform where you can connect with fellow participants before arrival.",
    category: "Retreats",
    active: true,
    sortOrder: 7,
  },
  {
    id: "faq_diet_requirements",
    question: "Can dietary requirements be accommodated?",
    answer:
      "Yes. All our programs serve sattvic vegetarian food by default. We can accommodate vegan, gluten-free, and most allergy-based requirements with advance notice. Please mention your needs at the time of booking.",
    category: "Retreats",
    active: true,
    sortOrder: 8,
  },
  // Yoga Training
  {
    id: "faq_yttc_certified",
    question: "Are the YTTC programs Yoga Alliance certified?",
    answer:
      "Yes. All our Yoga Teacher Training Courses (YTTC) are accredited by Yoga Alliance International. Upon completion, you receive an RYT certification recognised globally, allowing you to register as a certified teacher and teach worldwide.",
    category: "Yoga Training",
    active: true,
    sortOrder: 9,
  },
  {
    id: "faq_teach_after",
    question: "Can I teach yoga professionally after the training?",
    answer:
      "Upon completing a 200-Hr YTTC, you are eligible to register as an RYT-200 with Yoga Alliance and legally teach yoga anywhere in the world. Our 300-Hr and 500-Hr programs unlock senior teacher status. We also offer alumni support including job placement assistance.",
    category: "Yoga Training",
    active: true,
    sortOrder: 10,
  },
  // Adventure
  {
    id: "faq_fitness_level",
    question: "What fitness level is required for treks?",
    answer:
      "It depends on the program. Kedarkantha is suitable for moderate fitness levels. Gangotri-Kedarnath and Everest Base Camp require good cardiovascular fitness and prior trekking experience. Each program page lists detailed fitness prerequisites. We also offer pre-trek conditioning sessions.",
    category: "Adventure",
    active: true,
    sortOrder: 11,
  },
  {
    id: "faq_trek_safety",
    question: "What safety measures are in place for treks?",
    answer:
      "All treks operate with certified mountain guides, first-aid certified crew, satellite communication devices, emergency evacuation protocols, and travel insurance requirements. Altitude sickness protocols and acclimatisation schedules are strictly followed.",
    category: "Adventure",
    active: true,
    sortOrder: 12,
  },
  // General
  {
    id: "faq_visa",
    question: "Do you assist with visa and travel arrangements?",
    answer:
      "We provide official invitation letters for visa applications where needed. Our travel support team can recommend visa agents and answer general visa queries. However, we don't directly process visas. Airport pickup arrangements can be made for most program locations.",
    category: "General",
    active: true,
    sortOrder: 13,
  },
  {
    id: "faq_age_limit",
    question: "Is there an age limit for programs?",
    answer:
      "Participants must be 18+ for most programs. Some retreat programs welcome participants 16+ with guardian consent. There's no upper age limit — we regularly welcome participants in their 60s and 70s. Programs are designed to be accessible regardless of age.",
    category: "General",
    active: true,
    sortOrder: 14,
  },
];

// ─── Category list derived from data ──────────────────────────────
function getCategories(items: FaqItem[]): string[] {
  return ["All", ...Array.from(new Set(items.map((f) => f.category)))];
}

// ─── Accordion item ────────────────────────────────────────────────
function AccordionItem({ item, isOpen, onToggle }: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${isOpen ? "border-[#1C3A2F]/30 shadow-md" : "border-[#C8A96A]/20"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-[#FAF7F2] transition-colors"
      >
        <span
          className="font-semibold text-[#1C3A2F] text-[15px] leading-snug"
        >
          {item.question}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all ${isOpen ? "bg-[#1C3A2F] text-white rotate-45" : "bg-[#1C3A2F]/10 text-[#1C3A2F]"
            }`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="bg-[#FAF7F2] px-5 pb-5 pt-0">
          <div className="h-px bg-[#C8A96A]/20 mb-4" />
          <p className="text-[#3D3D38] text-[14.5px] leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const activeFaqs = faqData
    .filter((f) => f.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const categories = getCategories(activeFaqs);

  const filtered = activeFaqs.filter((f) => {
    const matchCat = activeCategory === "All" || f.category === activeCategory;
    const matchSearch =
      !search ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className=" bg-[#FAF7F2] text-[#1A1A18] overflow-x-hidden">
    

      {/* ── Hero ── */}
      <section className="relative py-20 md:py-28 px-6 text-center overflow-hidden bg-[#1C3A2F]">

        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/photo1.jpeg')", //  replace with your image
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Content */}
        <div className="relative z-10">

          <span className="text-[#C4622A] text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
            Support Center
          </span>

          <h1
            className="text-white font-black mb-4"
            style={{
              fontSize: "clamp(32px,4vw,60px)",
            }}
          >
            Frequently Asked{" "}
            <em className="not-italic text-[#C4622A]">Questions</em>
          </h1>

          <p className="text-gray-200 text-base max-w-xl mx-auto leading-relaxed mb-8">
            Can't find what you're looking for? Reach out to our team — we respond within 24 hours.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black">🔍</span>
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#C8A96A]/30 bg-white/80 backdrop-blur text-sm outline-none focus:border-[#1C3A2F] focus:ring-2 focus:ring-[#1C3A2F]/10 transition-all"
            />
          </div>

        </div>
      </section>

      {/* ── Categories + FAQs ── */}
      <section className="py-16 px-6 md:px-14 container mx-auto">

        {/* FAQ Heading */}
        <div className="text-start mb-10">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1C3A2F]"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-[#3D3D38]/70 mt-3 text-sm md:text-base">
            Find answers to the most common questions about our programs, retreats, and services.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenId(null); }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${activeCategory === cat
                  ? "bg-[#1C3A2F] text-white border-[#1C3A2F]"
                  : "bg-white text-[#3D3D38] border-[#C8A96A]/30 hover:border-[#1C3A2F]/40"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium text-[#1C3A2F]">No questions found</p>
            <p className="text-sm mt-2">Try a different search or category</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        )}

        {/* Still have questions CTA */}
        <div className="mt-14 bg-[#1C3A2F] rounded-2xl p-8 text-center">
          <p className="text-white font-bold text-xl mb-2">
            Still have questions?
          </p>
          <p className="text-white/60 text-sm mb-5">
            Our team is available Mon-Sat, 9 AM – 7 PM IST. We typically respond within a few hours.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="/contact"
              className="bg-[#C4622A] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#a84f20] transition-colors"
            >
              Contact Us
            </a>
            <a
              href="tel:+919876543210"
              className="border border-white/30 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:border-white hover:bg-white/10 transition-all"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

    
    </div>
  );
}
