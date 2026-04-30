"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { CATEGORIES } from "@/dummy_data/categoriesData";
import SectionLabel from "./SectionLabel";
import Link from "next/link";

export const CatSection = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(".card");

            gsap.set(cards.slice(1), { y: 600, scale: 0.95 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${CATEGORIES.length * 700}`,
                    scrub: 1,
                    pin: true,
                },
            });

            cards.forEach((card, i) => {
                if (i === 0) return;
                tl.fromTo(
                    card,
                    { y: 600, scale: 0.95, opacity: 1 },
                    { y: 0, scale: 1, ease: "none" },
                    (i - 1)
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen bg-blue-50/50 overflow-hidden flex flex-col items-center justify-center" style={{ minHeight: "100vh" }}>
            {/* Heading — top mein fixed space */}
            <div className="flex-shrink-0 flex flex-col items-center text-center pt-10 pb-6 px-6">
                <SectionLabel center="center">
                    Explore Meaningful Experiences
                </SectionLabel>

                <h2
                    className="font-bold text-[#1C3A2F] mt-2 mb-3"
                    style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "clamp(24px, 3vw, 42px)",
                        lineHeight: 1.2,
                    }}
                >
                    Find Your Path to{" "}
                    <em className="not-italic text-[#C4622A]">
                        Growth & Inner Peace
                    </em>
                </h2>

                <p
                    className="text-gray-500 max-w-2xl leading-relaxed"
                    style={{ fontSize: "clamp(12px, 1.1vw, 15px)" }}
                >
                    Dive into curated experiences ranging from yoga teacher training and
                    rejuvenating retreats to spiritual adventures, vibrant festivals, and
                    sacred pilgrimages
                </p>
            </div>

            {/* Cards — remaining space fill karega */}
            <div className="relative w-full max-w-7xl mx-auto px-6 rounded-3xl overflow-hidden" style={{ height: "420px" }}>                {CATEGORIES.map((cat, i) => {
                const isEven = i % 2 === 0;

                return (
                    <div
                        key={cat.slug}
                        className="card absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-white flex"
                        style={{ zIndex: i + 1 }}
                    >
                        {/* Image Side */}
                        <div
                            className={`w-1/2 relative overflow-hidden flex-shrink-0 ${isEven ? "order-1" : "order-2"
                                }`}
                        >
                            <Image
                                src={cat.img}
                                alt={cat.title}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                        </div>

                        {/* Text Side */}
                        <div
                            className={`w-1/2 flex flex-col justify-center px-10 py-10 ${isEven ? "order-2" : "order-1"
                                }`}
                        >
                            <span className="text-xs font-mono tracking-widest text-gray-400 mb-3">
                                {String(i + 1).padStart(2, "0")} /{" "}
                                {String(CATEGORIES.length).padStart(2, "0")}
                            </span>
                            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit mb-3">
                                {cat.slug}
                            </span>
                            <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
                                {cat.title}
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                {cat.description}
                            </p>
                            <button className="group flex items-center gap-2 text-sm font-semibold text-gray-900 w-fit" >
                                <Link href={`category/${cat.slug}`}>
                                    Explore
                                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>
                            </button>
                        </div>
                    </div>
                );
            })}
            </div>
        </section>
    );
};