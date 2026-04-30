"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { storeData } from "@/dummy_data/store";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const StarRating = ({ rating, large }: { rating: number; large?: boolean }) => {
  const size = large ? 18 : 13;
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
          fill={s <= Math.floor(rating) ? "#C8A96A" : "none"} stroke="#C8A96A" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = storeData.find((p) => p.slug === slug);
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="font-['DM_Sans',sans-serif] bg-[#FAF7F2] min-h-screen flex flex-col">
       
        <div className="flex-1 flex flex-col items-center justify-center py-24 text-center px-6">
          <p className="text-6xl mb-4">🌿</p>
          <h2 className="text-2xl font-bold text-[#1C3A2F] mb-2">Product not found</h2>
          <Link href="/products" className="mt-4 bg-[#C4622A] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#a84f20] transition-all">
            Back to Shop
          </Link>
        </div>
       
      </div>
    );
  }

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const related = storeData.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        slug: product.slug,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="font-['DM_Sans',sans-serif] bg-[#FAF7F2] text-[#1A1A18] overflow-x-hidden">
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-[13px] text-[#7A7A72] flex-wrap">
        <Link href="/" className="hover:text-[#C4622A] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#C4622A] transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-[#1C3A2F] font-medium line-clamp-1">{product.title}</span>
      </div>

      {/* Main Product Section */}
      <section className="container mx-auto px-4 sm:px-6  ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Left: Images */}
          <div>
            <div className="relative overflow-hidden bg-white border border-[#C8A96A]/10 aspect-square mb-3">
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                className="w-full h-full object-cover transition-all duration-500"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#C4622A] text-white text-[12px] font-semibold px-3 py-1 tracking-wide">
                  {product.badge}
                </span>
              )}
              <div className="absolute top-4 right-4 bg-[#1C3A2F] text-[#C8A96A] text-[12px] font-bold px-2.5 py-1">
                -{discount}%
              </div>
            </div>
            <div className="flex gap-2.5">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-1 aspect-square overflow-hidden border-2 transition-all ${
                    activeImage === i ? "border-[#C4622A]" : "border-transparent hover:border-[#C8A96A]/50"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <span className="text-[#C4622A] text-[11px] font-semibold tracking-[0.18em] uppercase mb-2">
              {product.category}
            </span>
            <h1 className="text-[#1A1A18] font-bold leading-tight mb-4"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(24px,3vw,38px)" }}>
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.rating} large />
              <span className="text-[#1C3A2F] font-semibold text-[14px]">{product.rating}</span>
              <span className="text-[#7A7A72] text-[14px]">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-[#1C3A2F] font-bold" style={{ fontSize: "clamp(28px,4vw,36px)" }}>
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-[#9A9A92] text-lg line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="bg-[#F2EDE3] text-[#C4622A] text-[13px] font-semibold px-2.5 py-0.5">
                Save {discount}%
              </span>
            </div>

            <p className="text-[#5A5A52] leading-relaxed text-[15px] mb-6">{product.description}</p>

            {/* Features */}
            <div className="bg-[#F2EDE3] p-4 sm:p-5 mb-6">
              <h3 className="text-[#1C3A2F] font-semibold text-[13px] uppercase tracking-[0.1em] mb-3">
                What's Included
              </h3>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#3D3D38]">
                    <span className="text-[#7FAF98] mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Qty + Add to Cart */}
            {product.inStock ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center border border-[#C8A96A]/40">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-11 h-11 flex items-center justify-center text-xl text-[#1C3A2F] hover:bg-[#F2EDE3] transition-colors">−</button>
                  <span className="w-12 text-center font-semibold text-[#1A1A18]">{qty}</span>
                  <button onClick={() => setQty(qty + 1)}
                    className="w-11 h-11 flex items-center justify-center text-xl text-[#1C3A2F] hover:bg-[#F2EDE3] transition-colors">+</button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-11 font-medium text-[14px] tracking-wide transition-all ${
                    added ? "bg-[#1C3A2F] text-white" : "bg-[#C4622A] text-white hover:bg-[#a84f20] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(196,98,42,0.3)]"
                  }`}
                >
                  {added ? "✓ Added to Cart!" : "Add to Cart"}
                </button>
                <Link href="/cart"
                  className="h-11 px-5 flex items-center justify-center border-[1.5px] border-[#1C3A2F] text-[#1C3A2F] text-[14px] font-medium hover:bg-[#1C3A2F] hover:text-white transition-all">
                  View Cart
                </Link>
              </div>
            ) : (
              <div className="bg-[#F2EDE3] border border-[#C8A96A]/20 p-4 text-center text-[#7A7A72] font-medium">
                Currently Out of Stock — <Link href="/products" className="text-[#C4622A] hover:underline">Browse other products</Link>
              </div>
            )}

            {/* Trust badges */}
            <div className="mt-6 pt-5 border-t border-[#C8A96A]/15 grid grid-cols-3 gap-3">
              {[
                { icon: "🚚", label: "Free Shipping", sub: "Orders above ₹1,999" },
                { icon: "↩️", label: "Easy Returns", sub: "30-day return policy" },
                { icon: "🌿", label: "Eco-Friendly", sub: "Sustainably sourced" },
              ].map((b) => (
                <div key={b.label} className="text-center">
                  <div className="text-2xl mb-1">{b.icon}</div>
                  <p className="text-[12px] font-semibold text-[#1C3A2F]">{b.label}</p>
                  <p className="text-[11px] text-[#7A7A72]">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="bg-[#F2EDE3] py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[#C4622A] text-[11px] font-semibold tracking-[0.18em] uppercase block mb-2">More to Explore</span>
              <h2 className="text-[#1C3A2F] font-bold text-2xl sm:text-3xl" style={{ fontFamily: "Playfair Display, serif" }}>
                You May Also Like
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`}
                  className="group bg-white border border-[#C8A96A]/10 hover:border-[#C8A96A]/30 hover:shadow-md transition-all">
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3 sm:p-4">
                    <p className="text-[11px] text-[#C4622A] font-semibold tracking-wide uppercase mb-1">{p.category}</p>
                    <h4 className="text-[#1A1A18] font-semibold text-[13px] sm:text-[14px] leading-snug mb-2 line-clamp-2">{p.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-[#1C3A2F] font-bold text-base">₹{p.price.toLocaleString()}</span>
                      <span className="text-[#9A9A92] text-[12px] line-through">₹{p.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
