"use client";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/dummy_data/categoriesData";
import SectionLabel from "./frontpages/SectionLabel";

export const CatSection02 = () => {
    return (
        <section className="bg-blue-50/50 py-16 px-6">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-14">
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
                        Growth &amp; Inner Peace
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

            {/* Cards */}
            <div className="max-w-7xl mx-auto flex flex-col">
                {CATEGORIES.map((cat, i) => {
                    const isEven = i % 2 === 0;

                    return (
                        <div key={cat.slug}>
                            {/* Shadcn Separator between cards */}
                            {i > 0 && (
                                <div className="flex items-center gap-4 my-10">
                                    <Separator className="flex-1" />
                                    <span className="text-[#C4622A] text-base">🪷</span>
                                    <Separator className="flex-1" />
                                </div>
                            )}

                            {/* Card */}
                            <div className="flex rounded-3xl overflow-hidden shadow-lg bg-white min-h-[380px] group">
                                {/* Image Side */}
                                <div
                                    className={`w-1/2 relative overflow-hidden flex-shrink-0 ${isEven ? "order-1" : "order-2"
                                        }`}
                                >
                                    <Image
                                        src={cat.img}
                                        alt={cat.title}
                                        fill
                                        priority={i === 0}
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-black/10" />
                                </div>

                                {/* Text Side */}
                                <div
                                    className={`w-1/2 flex flex-col justify-center px-12 py-10 ${isEven ? "order-2" : "order-1"
                                        }`}
                                >
                                    <span className="font-mono text-xs tracking-widest text-gray-400 mb-3">
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
                                    <Link
                                        href={`/category/${cat.slug}`}
                                        className="group/btn flex items-center gap-2 text-sm font-semibold text-gray-900 w-fit hover:text-[#C4622A] transition-colors"
                                    >
                                        Explore
                                        <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">
                                            →
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};