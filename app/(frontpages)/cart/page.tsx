"use client";

import Link from "next/link";
import AnnouncementBar from "@/components/frontpages/AnnouncementBar";
import Header from "@/components/frontpages/Header";
import Footer from "@/components/frontpages/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total, count } = useCart();

  const shipping = total >= 1999 ? 0 : 149;
  const grandTotal = total + shipping;

  return (
    <div className=" bg-[#FAF7F2] text-[#1A1A18] overflow-x-hidden min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      {/* Page Header */}
      <div className="bg-[#F2EDE3] border-b border-[#C8A96A]/15 py-8 sm:py-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-[13px] text-[#7A7A72] mb-3 flex-wrap">
            <Link href="/" className="hover:text-[#C4622A] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#C4622A] transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-[#1C3A2F] font-medium">Cart</span>
          </div>
          <h1 className="text-[#1C3A2F] font-bold" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px,4vw,42px)" }}>
            Your Cart {count > 0 && <span className="text-[#C4622A] text-2xl">({count} {count === 1 ? "item" : "items"})</span>}
          </h1>
        </div>
      </div>

      <div className="flex-1 container mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        {cart.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 sm:py-24">
            <div className="text-6xl sm:text-7xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-[#1C3A2F] mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
              Your cart is empty
            </h2>
            <p className="text-[#7A7A72] mb-8 max-w-sm mx-auto leading-relaxed">
              Discover our curated collection of yoga and wellness products.
            </p>
            <Link
              href="/products"
              className="inline-block bg-[#C4622A] text-white px-8 py-3 font-medium text-[14px] tracking-wide hover:bg-[#a84f20] hover:-translate-y-px transition-all"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">

              {cart.map((item) => {
                const discount = Math.round((1 - item.price / item.originalPrice) * 100);
                return (
                  <div key={item.id} className="bg-white border border-[#C8A96A]/10 p-4 sm:p-5 flex gap-4 sm:gap-5 hover:border-[#C8A96A]/25 transition-colors">
                    <Link href={`/products/${item.slug}`} className="flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-20 h-20 sm:w-24 sm:h-24 object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <Link href={`/products/${item.slug}`} className="hover:text-[#C4622A] transition-colors">
                          <h3 className="font-semibold text-[#1A1A18] text-[14px] sm:text-[15px] leading-snug line-clamp-2">{item.title}</h3>
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex-shrink-0 text-[#C8C8C0] hover:text-[#C4622A] transition-colors text-lg leading-none"
                          aria-label="Remove item"
                        >
                          ×
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#1C3A2F] font-bold text-[15px]">₹{item.price.toLocaleString()}</span>
                        <span className="text-[#9A9A92] text-[13px] line-through">₹{item.originalPrice.toLocaleString()}</span>
                        <span className="text-[11px] text-[#C4622A] font-semibold bg-[#FEF0E8] px-1.5 py-0.5">-{discount}%</span>
                      </div>
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center border border-[#C8A96A]/30">
                          <button onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-lg text-[#1C3A2F] hover:bg-[#F2EDE3] transition-colors">−</button>
                          <span className="w-10 text-center text-[14px] font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-lg text-[#1C3A2F] hover:bg-[#F2EDE3] transition-colors">+</button>
                        </div>
                        <span className="text-[#1C3A2F] font-bold text-[15px]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/products" className="inline-flex items-center gap-2 text-[#1C3A2F] text-[13.5px] font-medium hover:text-[#C4622A] transition-colors">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-[#C8A96A]/15 p-5 sm:p-6 sticky top-24">
                <h2 className="text-[#1C3A2F] font-bold text-lg mb-5" style={{ fontFamily: "Playfair Display, serif" }}>
                  Order Summary
                </h2>
                <div className="space-y-3 mb-4 text-[14px]">
                  <div className="flex justify-between">
                    <span className="text-[#5A5A52]">Subtotal ({count} items)</span>
                    <span className="font-semibold text-[#1A1A18]">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A5A52]">Shipping</span>
                    <span className={`font-semibold ${shipping === 0 ? "text-[#1C3A2F]" : "text-[#1A1A18]"}`}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[12.5px] text-[#9A9A92]">
                    <span>You save</span>
                    <span className="text-[#C4622A] font-semibold">₹{cart.reduce((s, c) => s + (c.originalPrice - c.price) * c.quantity, 0).toLocaleString()}</span>
                  </div>
                </div>
                <div className="border-t border-[#C8A96A]/15 pt-4 mb-5 flex justify-between">
                  <span className="font-bold text-[#1C3A2F] text-[15px]">Total</span>
                  <span className="font-bold text-[#1C3A2F] text-xl">₹{grandTotal.toLocaleString()}</span>
                </div>

                {/* Promo code */}
                <div className="mb-5">
                  <label className="text-[12px] text-[#7A7A72] font-medium uppercase tracking-wide block mb-2">Promo Code</label>
                  <div className="flex">
                    <input type="text" placeholder="Enter code" className="flex-1 border border-[#C8A96A]/30 px-3 py-2 text-[13.5px] outline-none focus:border-[#1C3A2F] bg-transparent" />
                    <button className="bg-[#1C3A2F] text-white px-4 text-[13px] font-medium hover:bg-[#15302A] transition-colors">Apply</button>
                  </div>
                </div>

                <Link href="/checkout"
                  className="block w-full text-center bg-[#C4622A] text-white py-3.5 font-semibold text-[14px] tracking-wide hover:bg-[#a84f20] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(196,98,42,0.3)] transition-all">
                  Proceed to Checkout →
                </Link>

                <div className="mt-4 flex items-center justify-center gap-4 text-[11.5px] text-[#9A9A92]">
                  <span>🔒 Secure Checkout</span>
                  <span>•</span>
                  <span>SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
