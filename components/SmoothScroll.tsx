"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
 * Why Lenis + GSAP ticker (not requestAnimationFrame directly):
 *
 * GSAP's ScrollTrigger calculates scroll positions on its own RAF loop.
 * If Lenis runs on a separate RAF loop, the two get out of sync —
 * ScrollTrigger reads the native scrollY while Lenis is mid-interpolation,
 * causing jitter and wrong trigger start/end points.
 *
 * Driving Lenis through gsap.ticker syncs both to the same frame,
 * so ScrollTrigger always sees Lenis's virtual scroll position.
 *
 * lagSmoothing(0) disables GSAP's built-in lag compensation — Lenis
 * handles its own smoothing, so GSAP's would double-smooth and feel sluggish.
 */
gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            // How many seconds one "scroll unit" takes to settle.
            // 1.2 = natural, slightly weighty feel. Reduce to 0.8 for snappier.
            duration: 1.2,
            // Expo easing — fast start, slow settle. Classic smooth-scroll curve.
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            // Keep touch devices using native scroll — native momentum
            // on iOS already feels great, Lenis on touch can cause lag.
            touchMultiplier: 0,
        });

        // Every time Lenis scrolls, tell ScrollTrigger to re-check positions
        lenis.on("scroll", ScrollTrigger.update);

        // Drive Lenis through GSAP's ticker — critical for sync
        const onTick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(onTick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(onTick);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}