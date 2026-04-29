"use client";

import { useState } from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/frontpages/AnnouncementBar";
import Header from "@/components/frontpages/Header";
import Footer from "@/components/frontpages/Footer";
import { useCart } from "@/context/CartContext";

type Step = "info" | "payment" | "confirmed";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>("info");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
    paymentMethod: "card",
    cardNumber: "", cardExpiry: "", cardCvv: "", cardName: "",
    upiId: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = total >= 1999 ? 0 : 149;
  const grandTotal = total + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateInfo = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) errs.phone = "Valid 10-digit number required";
    if (!form.address.trim()) errs.address = "Required";
    if (!form.city.trim()) errs.city = "Required";
    if (!form.state.trim()) errs.state = "Required";
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) errs.pincode = "Valid 6-digit PIN required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = () => {
    clearCart();
    setStep("confirmed");
  };

  const InputField = ({ name, label, placeholder, type = "text", half = false }: {
    name: string; label: string; placeholder?: string; type?: string; half?: boolean;
  }) => (
    <div className={half ? "col-span-1" : "col-span-2 sm:col-span-2"}>
      <label className="block text-[12.5px] font-semibold text-[#3D3D38] uppercase tracking-[0.08em] mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={(form as any)[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full border px-3.5 py-2.5 text-[14px] outline-none transition-colors bg-transparent placeholder:text-[#C0BDB5] ${
          errors[name]
            ? "border-red-400 focus:border-red-500"
            : "border-[#C8A96A]/30 focus:border-[#1C3A2F]"
        }`}
      />
      {errors[name] && <p className="text-red-500 text-[11.5px] mt-1">{errors[name]}</p>}
    </div>
  );

  if (step === "confirmed") {
    return (
      <div className=" bg-[#FAF7F2] text-[#1A1A18] min-h-screen flex flex-col">
      
        <div className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-[#1C3A2F] flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-[#C4622A] text-[11px] font-semibold tracking-[0.2em] uppercase block mb-3">Order Confirmed!</span>
            <h1 className="text-[#1C3A2F] font-bold mb-4" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px,4vw,40px)" }}>
              Thank You, {form.firstName}! 🙏
            </h1>
            <p className="text-[#5A5A52] leading-relaxed mb-2">
              Your order has been placed successfully. A confirmation email has been sent to <strong className="text-[#1C3A2F]">{form.email}</strong>.
            </p>
            <p className="text-[#7A7A72] text-[14px] mb-8">Expected delivery: 3–5 business days</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/products" className="bg-[#C4622A] text-white px-7 py-3 font-medium text-[14px] hover:bg-[#a84f20] transition-all">
                Continue Shopping
              </Link>
              <Link href="/" className="border border-[#1C3A2F] text-[#1C3A2F] px-7 py-3 font-medium text-[14px] hover:bg-[#1C3A2F] hover:text-white transition-all">
                Go Home
              </Link>
            </div>
          </div>
        </div>
     
      </div>
    );
  }

  if (cart.length === 0 ) {
    return (
      <div className=" bg-[#FAF7F2] min-h-screen flex flex-col">
       
        <div className="flex-1 flex flex-col items-center justify-center py-24 text-center px-6">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="text-2xl font-bold text-[#1C3A2F] mb-2">Your cart is empty</h2>
          <Link href="/products" className="mt-4 bg-[#C4622A] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#a84f20] transition-all">
            Browse Shop
          </Link>
        </div>
     
      </div>
    );
  }

  return (
    <div className=" bg-[#FAF7F2] text-[#1A1A18] overflow-x-hidden flex flex-col min-h-screen">
    

      {/* Page Header */}
      <div className="bg-[#F2EDE3] border-b border-[#C8A96A]/15 py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-[13px] text-[#7A7A72] mb-3 flex-wrap">
            <Link href="/" className="hover:text-[#C4622A] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-[#C4622A] transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-[#1C3A2F] font-medium">Checkout</span>
          </div>
          <h1 className="text-[#1C3A2F] font-bold" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px,4vw,42px)" }}>
            Checkout
          </h1>
          {/* Steps */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            {(["info", "payment"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                {i > 0 && <div className="w-8 sm:w-12 h-px bg-[#C8A96A]/30" />}
                <div className={`flex items-center gap-2 text-[13px] font-medium ${step === s ? "text-[#C4622A]" : step === "payment" && s === "info" ? "text-[#7FAF98]" : "text-[#9A9A92]"}`}>
                  <span className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center font-bold ${step === s ? "bg-[#C4622A] text-white" : step === "payment" && s === "info" ? "bg-[#1C3A2F] text-white" : "bg-[#E8E3DA] text-[#9A9A92]"}`}>
                    {step === "payment" && s === "info" ? "✓" : i + 1}
                  </span>
                  <span className="hidden sm:inline">{s === "info" ? "Delivery Info" : "Payment"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === "info" && (
              <div className="bg-white border border-[#C8A96A]/10 p-5 sm:p-8">
                <h2 className="text-[#1C3A2F] font-bold text-xl mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
                  Delivery Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <InputField name="firstName" label="First Name" placeholder="Aryan" half />
                  <InputField name="lastName" label="Last Name" placeholder="Mishra" half />
                  <div className="col-span-2">
                    <InputField name="email" label="Email Address" placeholder="aryan@example.com" type="email" />
                  </div>
                  <div className="col-span-2">
                    <InputField name="phone" label="Phone Number" placeholder="9876543210" type="tel" />
                  </div>
                  <div className="col-span-2">
                    <InputField name="address" label="Street Address" placeholder="123, Shanti Nagar, MG Road" />
                  </div>
                  <InputField name="city" label="City" placeholder="Rishikesh" half />
                  <InputField name="state" label="State" placeholder="Uttarakhand" half />
                  <InputField name="pincode" label="PIN Code" placeholder="249201" half />
                </div>
                <button
                  onClick={() => { if (validateInfo()) setStep("payment"); }}
                  className="mt-6 w-full sm:w-auto bg-[#C4622A] text-white px-10 py-3.5 font-semibold text-[14px] tracking-wide hover:bg-[#a84f20] transition-all"
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === "payment" && (
              <div className="bg-white border border-[#C8A96A]/10 p-5 sm:p-8">
                <h2 className="text-[#1C3A2F] font-bold text-xl mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
                  Payment Method
                </h2>

                {/* Payment options */}
                <div className="space-y-3 mb-6">
                  {[
                    { value: "card", label: "Credit / Debit Card", icon: "💳" },
                    { value: "upi", label: "UPI", icon: "📱" },
                    { value: "cod", label: "Cash on Delivery", icon: "💵" },
                  ].map((opt) => (
                    <label key={opt.value} className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${form.paymentMethod === opt.value ? "border-[#1C3A2F] bg-[#F2EDE3]" : "border-[#C8A96A]/20 hover:border-[#C8A96A]/40"}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.value}
                        checked={form.paymentMethod === opt.value}
                        onChange={handleChange}
                        className="accent-[#1C3A2F]"
                      />
                      <span className="text-xl">{opt.icon}</span>
                      <span className="font-medium text-[#1A1A18] text-[14px]">{opt.label}</span>
                    </label>
                  ))}
                </div>

                {form.paymentMethod === "card" && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="col-span-2">
                      <label className="block text-[12.5px] font-semibold text-[#3D3D38] uppercase tracking-[0.08em] mb-1.5">Card Number</label>
                      <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength={19}
                        className="w-full border border-[#C8A96A]/30 focus:border-[#1C3A2F] px-3.5 py-2.5 text-[14px] outline-none transition-colors bg-transparent placeholder:text-[#C0BDB5]" />
                    </div>
                    <div>
                      <label className="block text-[12.5px] font-semibold text-[#3D3D38] uppercase tracking-[0.08em] mb-1.5">Expiry</label>
                      <input type="text" name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="MM/YY" maxLength={5}
                        className="w-full border border-[#C8A96A]/30 focus:border-[#1C3A2F] px-3.5 py-2.5 text-[14px] outline-none transition-colors bg-transparent placeholder:text-[#C0BDB5]" />
                    </div>
                    <div>
                      <label className="block text-[12.5px] font-semibold text-[#3D3D38] uppercase tracking-[0.08em] mb-1.5">CVV</label>
                      <input type="password" name="cardCvv" value={form.cardCvv} onChange={handleChange} placeholder="•••" maxLength={4}
                        className="w-full border border-[#C8A96A]/30 focus:border-[#1C3A2F] px-3.5 py-2.5 text-[14px] outline-none transition-colors bg-transparent placeholder:text-[#C0BDB5]" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[12.5px] font-semibold text-[#3D3D38] uppercase tracking-[0.08em] mb-1.5">Name on Card</label>
                      <input type="text" name="cardName" value={form.cardName} onChange={handleChange} placeholder="ARYAN MISHRA"
                        className="w-full border border-[#C8A96A]/30 focus:border-[#1C3A2F] px-3.5 py-2.5 text-[14px] outline-none transition-colors bg-transparent placeholder:text-[#C0BDB5]" />
                    </div>
                  </div>
                )}

                {form.paymentMethod === "upi" && (
                  <div className="mb-6">
                    <label className="block text-[12.5px] font-semibold text-[#3D3D38] uppercase tracking-[0.08em] mb-1.5">UPI ID</label>
                    <input type="text" name="upiId" value={form.upiId} onChange={handleChange} placeholder="yourname@upi"
                      className="w-full border border-[#C8A96A]/30 focus:border-[#1C3A2F] px-3.5 py-2.5 text-[14px] outline-none transition-colors bg-transparent placeholder:text-[#C0BDB5]" />
                  </div>
                )}

                {form.paymentMethod === "cod" && (
                  <div className="mb-6 bg-[#F2EDE3] border border-[#C8A96A]/20 p-4 text-[14px] text-[#5A5A52]">
                    💵 Pay in cash when your order arrives. An additional ₹40 COD fee applies.
                  </div>
                )}

                <div className="flex gap-3 flex-wrap">
                  <button onClick={() => setStep("info")} className="border border-[#1C3A2F] text-[#1C3A2F] px-6 py-3 text-[14px] font-medium hover:bg-[#1C3A2F] hover:text-white transition-all">
                    ← Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 sm:flex-none bg-[#C4622A] text-white px-8 py-3 font-semibold text-[14px] tracking-wide hover:bg-[#a84f20] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(196,98,42,0.3)] transition-all"
                  >
                    Place Order — ₹{(grandTotal + (form.paymentMethod === "cod" ? 40 : 0)).toLocaleString()}
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-4 text-[12px] text-[#9A9A92]">
                  <span>🔒</span>
                  <span>Your payment info is secure & encrypted via SSL</span>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#C8A96A]/15 p-5 sm:p-6 sticky top-24">
              <h2 className="text-[#1C3A2F] font-bold text-[17px] mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
                Order Summary
              </h2>
              <div className="space-y-3 mb-4 max-h-52 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-12 h-12 object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 bg-[#1C3A2F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[#1A1A18] line-clamp-1 leading-snug">{item.title}</p>
                      <p className="text-[12px] text-[#7A7A72]">₹{item.price.toLocaleString()} × {item.quantity}</p>
                    </div>
                    <span className="text-[13px] font-semibold text-[#1C3A2F] flex-shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#C8A96A]/15 pt-4 space-y-2.5 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-[#5A5A52]">Subtotal</span>
                  <span className="font-semibold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A5A52]">Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? "text-[#1C3A2F]" : ""}`}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                {form.paymentMethod === "cod" && (
                  <div className="flex justify-between text-[#7A7A72]">
                    <span>COD Fee</span>
                    <span>₹40</span>
                  </div>
                )}
                <div className="border-t border-[#C8A96A]/10 pt-3 flex justify-between font-bold text-[#1C3A2F]">
                  <span>Total</span>
                  <span className="text-lg">₹{(grandTotal + (form.paymentMethod === "cod" ? 40 : 0)).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

   
    </div>
  );
}
