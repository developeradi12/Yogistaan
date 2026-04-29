"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ChevronRight, Filter, X, RotateCcw,
    SlidersHorizontal, Package,
} from "lucide-react";

import AnnouncementBar from "@/components/frontpages/AnnouncementBar";
import Header from "@/components/frontpages/Header";
import Footer from "@/components/frontpages/Footer";
import StoreCard from "@/components/category/StoreCard";
import {
    FilterChip, SidebarContent, SORT_OPTIONS, ALL_CATEGORIES,
    type Filters, type CategoryCounts,
} from "@/lib/FilterSection";
import { StoreProduct } from "@/dummy_data/store";

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────


interface ActiveChip {
    key: string;
    label: string;
    remove: () => void;
}

// ─────────────────────────────────────────
// Filter helpers
// ─────────────────────────────────────────
function makeDefaultFilters(priceMin: number, priceMax: number): Filters {
    return { categories: [], priceMin, priceMax, search: "", sortBy: "default" };
}

function filtersToParams(f: Filters, priceMin: number, priceMax: number): URLSearchParams {
    const p = new URLSearchParams();
    if (f.categories.length) p.set("cat", f.categories.join(","));
    if (f.priceMin !== priceMin) p.set("pmin", String(f.priceMin));
    if (f.priceMax !== priceMax) p.set("pmax", String(f.priceMax));
    if (f.search) p.set("q", f.search);
    if (f.sortBy !== "default") p.set("sort", f.sortBy);
    return p;
}

function paramsToFilters(
    params: URLSearchParams,
    priceMin: number,
    priceMax: number,
): Filters {
    return {
        categories: params.get("cat") ? params.get("cat")!.split(",") : [],
        priceMin: params.get("pmin") ? Number(params.get("pmin")) : priceMin,
        priceMax: params.get("pmax") ? Number(params.get("pmax")) : priceMax,
        search: params.get("q") ?? "",
        sortBy: params.get("sort") ?? "default",
    };
}

// ─────────────────────────────────────────
// Props
// ─────────────────────────────────────────
interface ProductsPageProps {
    products: StoreProduct[];
}

// ─────────────────────────────────────────
// Main Page  —  products injected via SSR
// ─────────────────────────────────────────
export default function ProductsPage({ products = [] }: ProductsPageProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Derive price bounds once from SSR data
    const PRICE_MIN = useMemo(
        () => Math.floor(Math.min(...products.map((p) => p.price))),
        [products],
    );
    const PRICE_MAX = useMemo(
        () => Math.ceil(Math.max(...products.map((p) => p.price))),
        [products],
    );

    const [filters, setFilters] = useState<Filters>(() => paramsToFilters(searchParams, PRICE_MIN, PRICE_MAX));
    const [mobileOpen, setMobileOpen] = useState(false);

    const setFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    }, []);

    // Sync filters → URL (shallow, no scroll)
    useEffect(() => {
        const params = filtersToParams(filters, PRICE_MIN, PRICE_MAX);
        const qs = params.toString();
        router.replace(qs ? `?${qs}` : "?", { scroll: false });
    }, [filters, router, PRICE_MIN, PRICE_MAX]);

    const categoryCounts = useMemo<CategoryCounts>(() => {
        const counts: CategoryCounts = {};
        ALL_CATEGORIES.forEach((cat) => {
            counts[cat] = products.filter((p) => p.category === cat).length;
        });
        return counts;
    }, [products]);

    const filtered = useMemo<StoreProduct[]>(() => {
        const q = filters.search.toLowerCase().trim();
        return [...products]
            .filter((p) => {
                if (filters.categories.length && !filters.categories.includes(p.category)) return false;
                if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
                if (q && !p.title.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
                return true;
            })
            .sort((a, b) => {
                switch (filters.sortBy) {
                    case "price-asc": return a.price - b.price;
                    case "price-desc": return b.price - a.price;
                    case "rating": return b.rating - a.rating;
                    case "newest": return b.id - a.id;
                    default: return 0;
                }
            });
    }, [filters, products]);

    const activeChips = useMemo<ActiveChip[]>(() => {
        const chips: ActiveChip[] = [];
        filters.categories.forEach((cat) =>
            chips.push({
                key: `cat-${cat}`, label: cat,
                remove: () => setFilter("categories", filters.categories.filter((c) => c !== cat)),
            }),
        );
        if (filters.priceMin !== PRICE_MIN || filters.priceMax !== PRICE_MAX)
            chips.push({
                key: "price", label: `₹${filters.priceMin} – ₹${filters.priceMax}`,
                remove: () => { setFilter("priceMin", PRICE_MIN); setFilter("priceMax", PRICE_MAX); },
            });
        if (filters.search)
            chips.push({
                key: "q", label: `"${filters.search}"`,
                remove: () => setFilter("search", ""),
            });
        if (filters.sortBy !== "default")
            chips.push({
                key: "sort", label: SORT_OPTIONS.find((o) => o.value === filters.sortBy)?.label ?? "",
                remove: () => setFilter("sortBy", "default"),
            });
        return chips;
    }, [filters, PRICE_MIN, PRICE_MAX, setFilter]);

    const hasFilters = activeChips.length > 0;

    const resetAll = useCallback(
        () => setFilters(makeDefaultFilters(PRICE_MIN, PRICE_MAX)),
        [PRICE_MIN, PRICE_MAX],
    );

    // ───────────────────────────
    return (
        <div className="bg-[#FCFAF7] text-[#1A1A18] min-h-screen selection:bg-[#C8A96A]/30">
          
            {/* Hero */}
            <section className="relative bg-[#1C3A2F] py-20 sm:py-28 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-[#C8A96A] opacity-[0.08] blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-[#C4622A] opacity-[0.08] blur-[120px]" />
                </div>
                <div className="relative max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="h-[1px] w-8 bg-[#C8A96A]" />
                        <span className="text-[#C8A96A] text-[11px] font-bold tracking-[0.3em] uppercase">The Sacred Collection</span>
                        <div className="h-[1px] w-8 bg-[#C8A96A]" />
                    </div>
                    <h1 className="text-white font-serif italic text-4xl md:text-6xl lg:text-7xl mb-6 leading-[1.1]">
                        Elevate Your Practice
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Thoughtfully crafted tools designed for the modern yogi — blending ancient wisdom with sustainable innovation.
                    </p>
                </div>
            </section>

            {/* Sticky Topbar */}
            <nav className="border-b border-[#1C3A2F]/8 bg-white/80 backdrop-blur-md sticky  top-0 z-30">
                <div className="container mx-auto px-6 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#7A7A72] shrink-0">
                        <Link href="/" className="hover:text-[#1C3A2F] transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3 opacity-40" />
                        <span className="text-[#1C3A2F] font-bold">Shop</span>
                    </div>

                    {/* Right - MOBILE ONLY */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="lg:hidden flex items-center gap-2 px-3 py-2 border border-[#1C3A2F]/20 text-[#1C3A2F] text-[12px] font-bold uppercase"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </button>
                </div>
            </nav>

            {/* Active filter chips */}
            {activeChips.length > 0 && (
                <div className="border-b border-[#1C3A2F]/6 bg-white/50">
                    <div className="container mx-auto px-6 py-3 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-[#7A7A72] uppercase tracking-wider mr-1 shrink-0">Active:</span>
                        {activeChips.map((chip) => (
                            <FilterChip key={chip.key} label={chip.label} onRemove={chip.remove} />
                        ))}
                        <button
                            onClick={resetAll}
                            className="flex items-center gap-1 text-[11px] font-bold text-[#C4622A] hover:opacity-70 transition-opacity ml-auto"
                        >
                            <RotateCcw className="w-3 h-3" /> Clear All
                        </button>
                    </div>
                </div>
            )}

            {/* Main content */}
            <main className="container mx-auto px-6 py-10">
                <div className="flex gap-10 items-start">

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:flex flex-col w-60 xl:w-64 shrink-0 sticky top-[61px] max-h-[calc(100vh-80px)] overflow-y-auto pb-10 scrollbar-thin">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-[13px] font-bold text-[#1C3A2F] flex items-center gap-2">
                                <Filter className="w-3.5 h-3.5" /> Filters
                            </h2>
                            {hasFilters && (
                                <button
                                    onClick={resetAll}
                                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#C4622A] hover:opacity-70 transition-opacity"
                                >
                                    <RotateCcw className="w-3 h-3" /> Reset
                                </button>
                            )}
                        </div>
                        <SidebarContent
                            filters={filters}
                            setFilter={setFilter}
                            categoryCounts={categoryCounts}
                            priceMin={PRICE_MIN}
                            priceMax={PRICE_MAX}
                        />
                    </aside>

                    {/* Product grid */}
                    <div className="flex-1 min-w-0">
                        {filtered.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-8">
                                {filtered.map((product) => (
                                    <StoreCard key={product.id} item={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 text-center">
                                <div className="w-20 h-20 bg-[#1C3A2F]/5 rounded-full flex items-center justify-center mb-6">
                                    <Package className="w-8 h-8 text-[#1C3A2F]/20" />
                                </div>
                                <h3 className="text-xl font-serif italic text-[#1C3A2F] mb-2">No matches found</h3>
                                <p className="text-[#7A7A72] max-w-xs text-sm leading-relaxed mb-6">
                                    Try adjusting your filters or broadening your search.
                                </p>
                                <button
                                    onClick={resetAll}
                                    className="flex items-center gap-2 px-5 py-2.5 border border-[#1C3A2F] text-[#1C3A2F] text-[12px] font-bold uppercase tracking-wider hover:bg-[#1C3A2F] hover:text-white transition-all"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" /> Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-[#FCFAF7] flex flex-col shadow-2xl">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1C3A2F]/8 shrink-0">
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4 text-[#1C3A2F]" />
                                <h2 className="text-[14px] font-bold tracking-tight text-[#1C3A2F]">Filters & Sort</h2>
                            </div>
                            <button onClick={() => setMobileOpen(false)} className="p-2 -mr-2 text-[#1C3A2F]/50 hover:text-[#1C3A2F]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-6 pb-4">
                            <SidebarContent
                                filters={filters}
                                setFilter={setFilter}
                                categoryCounts={categoryCounts}
                                priceMin={PRICE_MIN}
                                priceMax={PRICE_MAX}
                            />
                        </div>
                        <div className="px-6 py-4 border-t border-[#1C3A2F]/8 shrink-0 flex gap-3">
                            {hasFilters && (
                                <button
                                    onClick={() => { resetAll(); setMobileOpen(false); }}
                                    className="flex-1 py-3 border border-[#1C3A2F]/25 text-[#1C3A2F] text-[12px] font-bold uppercase tracking-wider hover:bg-[#1C3A2F]/5 transition-colors"
                                >
                                    Reset
                                </button>
                            )}
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="flex-1 bg-[#1C3A2F] text-white py-3 text-[12px] font-bold uppercase tracking-wider active:scale-[.98] transition-transform"
                            >
                                Show {filtered.length} Results
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}