"use client";
import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CATEGORIES } from "@/dummy_data/categoriesData";

/*
 * Register ONCE at module level — outside the component.
 * This is the correct Next.js pattern. Registering inside the
 * component or inside useEffect causes double-registration in
 * React StrictMode (which Next.js enables by default) and leads
 * to ScrollTrigger behaving erratically.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP);

export const CatSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    /*
     * useGSAP — the official @gsap/react hook.
     *
     * WHY not useLayoutEffect:
     *   - Next.js SSR throws "useLayoutEffect does nothing on server" warning.
     *   - React StrictMode double-invokes useLayoutEffect in dev, which
     *     mounts the ScrollTrigger twice and creates scroll offset bugs.
     *   - Manual ctx.revert() in cleanup often misses edge cases during
     *     fast route switches in Next.js App Router.
     *
     * WHY useGSAP fixes all of this:
     *   - Uses useIsomorphicLayoutEffect internally (safe on server).
     *   - Handles StrictMode double-invoke correctly.
     *   - Auto-reverts ALL gsap context (tweens, ScrollTriggers, matchMedia)
     *     on unmount — no manual cleanup needed.
     *   - scope: containerRef scopes selector strings to this component only,
     *     so ".cat-panel" won't accidentally match panels in other components.
     */
    useGSAP(
        () => {
            const panels = gsap.utils.toArray<HTMLElement>(".cat-panel");
            if (!panels.length) return;

            // Cache refs before scroll fires — never query DOM in onUpdate
            const dots        = gsap.utils.toArray<HTMLElement>(".cat-dot");
            const progressBar = containerRef.current!
                .querySelector<HTMLElement>(".cat-progress-bar");

            const mm = gsap.matchMedia();

            mm.add(
                {
                    isMobile:  "(max-width: 767px)",
                    isDesktop: "(min-width: 768px)",
                },
                (ctx) => {
                    const { isMobile } = ctx.conditions as {
                        isMobile:  boolean;
                        isDesktop: boolean;
                    };

                    const stackStep = isMobile ? 14 : 18;
                    const stackBase = isMobile ? -36 : -52;

                    // Stack all panels centred — pure 2D only
                    gsap.set(panels, {
                        xPercent:        -50,
                        yPercent:        -50,
                        transformOrigin: "center center",
                        force3D:         true,
                    });

                    // Non-first panels start below viewport, clipped by overflow:hidden
                    panels.forEach((panel, i) => {
                        if (i !== 0) {
                            gsap.set(panel, {
                                y:       isMobile ? "80vh" : "110vh",
                                scale:   0.96,
                                force3D: true,
                            });
                        }
                    });

                    // Single pinned timeline drives everything
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger:    containerRef.current,
                            start:      "top top",
                            end:        `+=${(panels.length - 1) * 700}`,
                            scrub:      1,
                            pin:        true,
                            pinSpacing: true,
                            snap: {
                                snapTo:   1 / (panels.length - 1),
                                duration: { min: 0.2, max: 0.5 },
                                ease:     "power1.inOut",
                            },
                            onUpdate: (self) => {
                                const progress    = self.progress;
                                const activeIndex = Math.round(
                                    progress * (panels.length - 1)
                                );
                                // Direct style writes — never gsap.to() inside onUpdate
                                if (progressBar) {
                                    progressBar.style.width = `${progress * 100}%`;
                                }
                                dots.forEach((dot, idx) => {
                                    const active      = idx === activeIndex;
                                    dot.style.opacity   = active ? "1"          : "0.35";
                                    dot.style.transform = active ? "scale(1.5)" : "scale(1)";
                                });
                            },
                        },
                    });

                    // Animate each panel in sequence
                    panels.forEach((panel, i) => {
                        if (i === 0) return;

                        const prevCards = panels.slice(0, i);

                        // Fan previous cards upward into a stack
                        tl.to(
                            prevCards,
                            {
                                y: (index: number) =>
                                    stackBase - (prevCards.length - index) * stackStep,
                                scale: (index: number) =>
                                    0.95 - (prevCards.length - index) * 0.025,
                                duration: 1.8,
                                ease:     "power2.out",
                                force3D:  true,
                            },
                            i === 1 ? 0 : ">-0.2"
                        );

                        // Slide incoming card up from below
                        tl.to(
                            panel,
                            {
                                y:        0,
                                scale:    1,
                                duration: 2.0,
                                ease:     "power4.out",
                                force3D:  true,
                            },
                            "<0.1"
                        );
                    });
                }
            );
        },
        /*
         * scope: containerRef — all selector strings (".cat-panel" etc.)
         * are scoped to this container. Essential in Next.js where multiple
         * page components can be mounted simultaneously during transitions.
         */
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative h-svh md:h-screen overflow-hidden bg-[#f4f1ec]"
        >
            {/* Progress bar — transition:none stops CSS fighting GSAP */}
            <div className="absolute top-0 left-0 right-0 z-50 h-[3px] bg-black/10 pointer-events-none">
                <div
                    className="cat-progress-bar h-full bg-[#1C3A2F]"
                    style={{ width: "0%", transition: "none" }}
                />
            </div>

            {/* Dot pagination */}
            <div className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 md:gap-3 pointer-events-none">
                {CATEGORIES.map((_, i) => (
                    <span
                        key={i}
                        className="cat-dot block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1C3A2F]"
                        style={{
                            opacity:    i === 0 ? 1          : 0.35,
                            transform:  i === 0 ? "scale(1.5)" : "scale(1)",
                            transition: "opacity 0.25s, transform 0.25s",
                        }}
                    />
                ))}
            </div>

            {/* Cards — no perspective, no preserve-3d, no backfaceVisibility */}
            <div className="relative w-full h-full">
                {CATEGORIES.map((item, i) => (
                    <div
                        key={item.slug}
                        className="cat-panel absolute top-1/2 left-1/2 w-[95vw] sm:w-[92vw] max-w-8xl"
                        style={{ zIndex: i + 1, willChange: "transform" }}
                    >
                        <div className="group flex min-h-[72vh] md:min-h-[78vh] flex-col md:flex-row items-stretch bg-white rounded-2xl md:rounded-[28px] shadow-[0_8px_48px_rgba(0,0,0,0.10)] overflow-hidden transition-shadow duration-500 hover:shadow-[0_20px_64px_rgba(0,0,0,0.15)]">
                            {i % 2 === 0 ? (
                                <>
                                    <CardImage item={item} gradient="to right" />
                                    <CardContent item={item} index={i} align="left" />
                                </>
                            ) : (
                                <>
                                    <CardImage item={item} gradient="to left" className="md:hidden" />
                                    <CardContent item={item} index={i} align="right" />
                                    <CardImage item={item} gradient="to left" className="hidden md:flex" />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

/* ─── Image pane ─────────────────────────────────────────────── */
function CardImage({
    item,
    gradient,
    className = "",
}: {
    item: (typeof CATEGORIES)[number];
    gradient: string;
    className?: string;
}) {
    return (
        <div className={`relative flex-1 w-full overflow-hidden ${className}`}>
            <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="w-full h-[28vh] md:h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-[1.04]"
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(${gradient}, transparent, rgba(255,255,255,0.08))`,
                }}
            />
        </div>
    );
}

/* ─── Card text content ──────────────────────────────────────── */
function CardContent({
    item,
    index,
    align,
}: {
    item: (typeof CATEGORIES)[number];
    index: number;
    align: "left" | "right";
}) {
    return (
        <div
            className={[
                "flex-1 flex flex-col justify-center gap-4 md:gap-5",
                "px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12",
                align === "right" ? "md:pr-14 lg:pr-16" : "md:pl-14 lg:pl-16",
            ].join(" ")}
        >
            <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 font-mono text-[10px] md:text-[11px] tracking-widest text-black/50 uppercase">
                {String(index + 1).padStart(2, "0")}&nbsp;/&nbsp;
                {String(CATEGORIES.length).padStart(2, "0")}
            </span>

            <h2
                className="text-3xl sm:text-4xl md:text-[3.25rem] font-bold leading-[1.1] tracking-tight text-[#111]"
                style={{ fontFamily: "'Georgia', serif" }}
            >
                {item.title}
            </h2>

            <p className="text-sm sm:text-base md:text-[1.05rem] leading-relaxed text-gray-500 max-w-xs md:max-w-sm">
                {item.description}
            </p>

            <div className="flex items-center gap-3 md:gap-4 mt-1 md:mt-2">
                <Link
                    href={`/category/${item.slug}`}
                    className="group/btn inline-flex items-center gap-2 rounded-full bg-[#1C3A2F] px-5 py-3 md:px-7 md:py-3.5 text-xs md:text-sm font-semibold text-white transition-all duration-300 hover:bg-[#122619] hover:gap-3.5 hover:shadow-lg"
                >
                    View details
                    <svg
                        className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
                <span className="h-px flex-1 bg-black/10 max-w-[60px]" />
            </div>
        </div>
    );
}