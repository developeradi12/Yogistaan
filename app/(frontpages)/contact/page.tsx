"use client";

import { useState } from "react";
import Header from "@/components/frontpages/Header";
import Footer from "@/components/frontpages/Footer";
import AnnouncementBar from "@/components/frontpages/AnnouncementBar";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
} from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa";

// ─── Contact info ─────────────────────────
const contactInfoItems = [
  {
    icon: MapPin,
    label: "Head Office",
    value: "Rishikesh, Uttarakhand, India — 249137",
    href: "https://maps.google.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@yogistaan.com",
    href: "mailto:hello@yogistaan.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Sat: 9 AM – 7 PM IST",
  },
];

// ─── Social links ─────────────────────────
const socialLinks = [
  { name: "Instagram", handle: "@yogistaan", icon: FaInstagram },
  { name: "YouTube", handle: "Yogistaan TV", icon: FaYoutube },
  { name: "WhatsApp", handle: "Join Group", icon: MessageCircle },
];

// ─── Inquiry types ────────────────────────
const inquiryTypes = [
  "Retreat Booking",
  "Yoga Teacher Training",
  "Adventure Programs",
  "Tirth Yatra",
  "Festival / Events",
  "Store / Products",
  "Corporate Wellness",
  "Other",
];

// ─── Form state ───────────────────────────
interface FormState {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  inquiryType: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A18]">
    

      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-[#1C3A2F]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative text-center container mx-auto">
          <span className="text-[#C8A96A] text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
            Get in Touch
          </span>
          <h1
            className="text-white font-black leading-tight mb-4"
            style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(32px,4vw,60px)" }}
          >
            We&apos;d Love to
            <br />
            <em className="not-italic text-[#B8D4C8]">Hear From You</em>
          </h1>
          <p className="text-white/65 text-base leading-relaxed">
            Whether you&apos;re planning your first retreat or your tenth, our team is here to guide you every step of the way.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-20 px-6 container mx-auto grid md:grid-cols-5 gap-12">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-[#1C3A2F]">Contact Details</h2>

          {contactInfoItems.map((info) => {
            const Icon = info.icon;

            return (
              <div
                key={info.label}
                className="flex items-start gap-4 bg-white p-4 rounded-xl border"
              >
                <Icon className="w-5 h-5 text-[#1C3A2F] mt-1" />

                <div>
                  <p className="text-xs text-[#C4622A] font-semibold uppercase">
                    {info.label}
                  </p>

                  {info.href ? (
                    <a href={info.href} className="text-sm hover:text-[#C4622A]">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm">{info.value}</p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Social */}
          <div className="bg-[#1C3A2F] text-white p-6 rounded-xl">
            <p className="mb-3 font-semibold">Follow Us</p>

            {socialLinks.map((s) => {
              const Icon = s.icon;

              return (
                <div key={s.name} className="flex items-center gap-3 py-2">
                  <Icon className="w-4 h-4" />
                  <div>
                    <p className="text-sm">{s.name}</p>
                    <p className="text-xs text-white/60">{s.handle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="md:col-span-3">
          {submitted ? (
            <div className="bg-[#1C3A2F] text-white p-10 text-center rounded-xl">
              <h3 className="text-xl mb-3">Message Sent 🙏</h3>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm(initialForm);
                }}
                className="bg-[#C4622A] px-5 py-2 rounded"
              >
                Send Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2
                className="text-2xl font-bold text-[#1C3A2F] mb-6"

              >
                Send Us a Message
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#3D3D38] uppercase tracking-wide block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#3D3D38] uppercase tracking-wide block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#3D3D38] uppercase tracking-wide block mb-1.5">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 ..."
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#3D3D38] uppercase tracking-wide block mb-1.5">
                    Inquiry Type *
                  </label>
                  <select
                    name="inquiryType"
                    value={form.inquiryType}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    required
                  >
                    <option value="">Select Type</option>
                    {inquiryTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3D3D38] uppercase tracking-wide block mb-1.5">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border p-3 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1C3A2F] text-white py-3 rounded"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          )}
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className="px-6 md:px-14 mb-20 container mx-auto">

        <div className="rounded-2xl overflow-hidden shadow-lg border border-[#1C3A2F]/10">

          <iframe
            src="https://www.google.com/maps?q=30.0869,78.2676&z=13&output=embed"
            className="w-full h-[300px] md:h-[400px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

        </div>

      </section>
  
    </div>
  );
}