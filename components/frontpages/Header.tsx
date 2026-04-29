"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingCart, User, X, Menu, Phone } from "lucide-react";

const navItems = [
    { label: "Home",    href: "/" },
    { label: "Shop",    href: "/products" },
    { label: "About",   href: "/about" },
    { label: "FAQ",     href: "/faq" },
    { label: "Contact", href: "/contact" },
];

const Header = () => {
    const [scrolled,    setScrolled]    = useState(false);
    const [mobileOpen,  setMobileOpen]  = useState(false);
    const pathname  = usePathname();
    const { count } = useCart();

    // Scroll shadow
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    // Close menu on route change
    useEffect(() => { setMobileOpen(false); }, [pathname]);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <>
            {/* ── Main header bar ──────────────────────────────── */}
            <header
                className={`
                    sticky top-0 z-50 h-[70px]
                    bg-[#FAF7F2]/95 backdrop-blur-md
                    border-b border-[#C8A96A]/20
                    transition-shadow duration-300
                    ${scrolled ? "shadow-[0_4px_24px_rgba(28,58,47,0.12)]" : ""}
                `}
            >
                <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center">
                        <Image
                            src="/logo.png"
                            alt="Yogistaan"
                            width={110}
                            height={40}
                            className="object-contain h-20 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    relative text-sm tracking-wide transition-colors duration-200 group
                                    ${isActive(item.href)
                                        ? "text-[#1C3A2F] font-semibold"
                                        : "text-[#3D3D38] hover:text-[#1C3A2F]"}
                                `}
                            >
                                {item.label}
                                <span className={`
                                    absolute -bottom-1 left-0 h-[1.5px] bg-[#C4622A]
                                    transition-all duration-200
                                    ${isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"}
                                `} />
                            </Link>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Cart */}
                        <Link
                            href="/cart"
                            aria-label="Cart"
                            className="relative p-2 rounded-lg text-[#1C3A2F] hover:text-[#C4622A] hover:bg-[#C4622A]/8 transition-all"
                        >
                            <ShoppingCart size={20} strokeWidth={1.8} />
                            {count > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#C4622A] text-white text-[10px] font-bold leading-none">
                                    {count > 9 ? "9+" : count}
                                </span>
                            )}
                        </Link>

                        {/* Wishlist — hidden on smallest screens */}
                        <Link
                            href="/wishlist"
                            aria-label="Wishlist"
                            className="hidden sm:flex p-2 rounded-lg text-[#1C3A2F] hover:text-[#C4622A] hover:bg-[#C4622A]/8 transition-all"
                        >
                            <Heart size={20} strokeWidth={1.8} />
                        </Link>

                        {/* User — hidden on mobile */}
                        <Link
                            href="/login"
                            aria-label="Account"
                            className="hidden sm:flex p-2 rounded-lg text-[#1C3A2F] hover:text-[#C4622A] hover:bg-[#C4622A]/8 transition-all"
                        >
                            <User size={20} strokeWidth={1.8} />
                        </Link>

                        {/* Book Now CTA */}
                        <Link
                            href="/products"
                            className="hidden md:inline-flex items-center gap-1.5 ml-1
                                bg-[#C4622A] hover:bg-[#a84f20]
                                text-white text-[13px] font-semibold tracking-wide
                                px-4 py-2 rounded-full
                                transition-all duration-200
                                hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(196,98,42,0.35)]"
                        >
                            Book Now
                        </Link>

                        {/* Hamburger */}
                        <button
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={mobileOpen}
                            className="md:hidden ml-1 p-2 rounded-lg text-[#1C3A2F] hover:bg-[#1C3A2F]/8 transition-all"
                        >
                            <Menu size={22} strokeWidth={1.8} />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile full-screen overlay ────────────────────── */}
            {/* Backdrop */}
            <div
                onClick={() => setMobileOpen(false)}
                className={`
                    fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm
                    transition-opacity duration-300 md:hidden
                    ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
                aria-hidden="true"
            />

            {/* Drawer panel — slides in from the right */}
            <div
                className={`
                    fixed top-0 right-0 z-[70] h-full w-[min(320px,90vw)]
                    bg-[#FAF7F2] shadow-2xl
                    flex flex-col
                    transition-transform duration-300 ease-[cubic-bezier(.32,.72,0,1)]
                    md:hidden
                    ${mobileOpen ? "translate-x-0" : "translate-x-full"}
                `}
            >
                {/* Drawer header */}
                <div className="flex items-center justify-between h-[70px] px-5 border-b border-[#C8A96A]/20 flex-shrink-0">
                    <Image
                        src="/logo.png"
                        alt="Yogistaan"
                        width={90}
                        height={34}
                        className="object-contain h-8 w-auto"
                    />
                    <button
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                        className="p-2 rounded-lg text-[#1C3A2F] hover:bg-[#1C3A2F]/8 transition-all"
                    >
                        <X size={22} strokeWidth={1.8} />
                    </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
                    {navItems.map((item, idx) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            style={{ transitionDelay: mobileOpen ? `${idx * 40}ms` : "0ms" }}
                            className={`
                                flex items-center justify-between
                                px-4 py-3.5 rounded-xl
                                text-[15px] font-medium tracking-wide
                                transition-all duration-200
                                ${isActive(item.href)
                                    ? "bg-[#1C3A2F] text-white"
                                    : "text-[#1C3A2F] hover:bg-[#1C3A2F]/8"}
                            `}
                        >
                            {item.label}
                            <svg className="w-4 h-4 opacity-40" viewBox="0 0 16 16" fill="none">
                                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    ))}
                </nav>

                {/* Drawer footer */}
                <div className="px-5 pb-8 pt-4 border-t border-[#C8A96A]/20 space-y-3 flex-shrink-0">
                    <Link
                        href="/products"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center gap-2 w-full
                            bg-[#C4622A] hover:bg-[#a84f20]
                            text-white text-[14px] font-semibold tracking-wide
                            px-4 py-3.5 rounded-xl
                            transition-all duration-200 hover:shadow-lg"
                    >
                        Book Now
                    </Link>

                    <div className="flex items-center justify-center gap-6 pt-1">
                        <Link href="/wishlist" onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-1.5 text-[13px] text-[#3D3D38] hover:text-[#C4622A] transition-colors">
                            <Heart size={16} strokeWidth={1.8} />
                            Wishlist
                        </Link>
                        <Link href="/login" onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-1.5 text-[13px] text-[#3D3D38] hover:text-[#C4622A] transition-colors">
                            <User size={16} strokeWidth={1.8} />
                            Account
                        </Link>
                        <Link href="/contact" onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-1.5 text-[13px] text-[#3D3D38] hover:text-[#C4622A] transition-colors">
                            <Phone size={16} strokeWidth={1.8} />
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;