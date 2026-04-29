"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function StoreCard({ item }: { item: any }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
      originalPrice: item.originalPrice,
      slug: item.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = item.originalPrice
    ? Math.round(
      ((item.originalPrice - item.price) / item.originalPrice) * 100
    )
    : null;

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full">

      {/* Image */}
      <div className="relative bg-[#F8F6F2] overflow-hidden aspect-[4/3] sm:aspect-[4/3]">
        <Link href={`/products/${item.slug}`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        >
          <Heart
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            fill={wishlisted ? "#EF4444" : "none"}
            stroke={wishlisted ? "#EF4444" : "#888"}
            strokeWidth={2}
          />
        </button>

        {/* Discount */}
        {discount && (
          <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#C4622A] text-white text-[10px] font-bold px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="px-3 sm:px-4 pt-3 pb-4 flex flex-col flex-1">

        {/* Rating */}
        {item.rating && (
          <div className="flex items-center gap-1 mb-1 min-h-[16px]">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-3 h-3"
                  fill={
                    s <= Math.round(item.rating)
                      ? "#F59E0B"
                      : "#E5E7EB"
                  }
                  stroke="none"
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium">
              {item.rating} ({item.reviews})
            </span>
          </div>
        )}

        {/* Title */}
        <Link href={`/products/${item.slug}`}>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 leading-snug min-h-[36px] sm:min-h-[40px] hover:text-[#C4622A] transition-colors">
            {item.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1.5 sm:mt-2 min-h-[22px]">
          <span className="text-[#1C3A2F] font-bold text-base sm:text-lg">
            ₹{item.price.toLocaleString()}
          </span>
          {item.originalPrice && (
            <span className="text-gray-400 text-xs sm:text-sm line-through">
              ₹{item.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-auto pt-3 sm:pt-4 flex gap-2">
          <button
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-full text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-2 sm:py-2.5 transition-all shadow-sm ${added
                ? "bg-green-600 text-white"
                : "bg-[#1C3A2F] hover:bg-[#C4622A] text-white"
              }`}
          >
            <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {added ? "Added ✓" : "Add"}
          </button>

          <Link
            href={`/products/${item.slug}`}
            className="flex-1 flex items-center justify-center rounded-full border border-[#1C3A2F] text-[#1C3A2F] text-[11px] sm:text-xs font-bold px-2 sm:px-3 py-2 sm:py-2.5 hover:bg-[#1C3A2F] hover:text-white transition-all"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}