"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-300 pt-12 pb-6 mt-10 border-t border-stone-800">

            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <span className="text-xl font-bold tracking-tight">
                        <span className="text-accent">Yogi</span>
                        <span className="text-var(--accent)">staan</span>
                    </span>
                    <p className="text-sm text-stone-400 mt-3 leading-relaxed">
                        Discover peaceful yoga retreats, spiritual journeys, and mindful
                        travel experiences across India and beyond.
                    </p>
                </div>

                {/* Explore */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Explore</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#">Yoga Retreats</Link></li>
                        <li><Link href="#">Meditation Camps</Link></li>
                        <li><Link href="#">Wellness Tours</Link></li>
                        <li><Link href="#">Destinations</Link></li>
                    </ul>
                </div>

                {/* Popular Locations */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Top Destinations</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Rishikesh</li>
                        <li>Goa</li>
                        <li>Kerala</li>
                        <li>Himalayas</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Email: support@yogistaan.com</li>
                        <li>Phone: +91 98765 43210</li>
                        <li>India</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-stone-800 mt-10 pt-4 text-center text-xs text-stone-500">
                © {new Date().getFullYear()} Yogistaan. All rights reserved.
            </div>

        </footer>
    );
}