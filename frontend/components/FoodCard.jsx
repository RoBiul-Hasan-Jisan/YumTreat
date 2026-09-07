"use client";

import Image from "next/image";
import Link from "next/link";
import { FiStar, FiPlus } from "react-icons/fi";
import { foodImage } from "@/lib/api";
import { useCart } from "@/context/CartContext";

export default function FoodCard({ food }) {
  const { addItem } = useCart() || {};
  const hasDiscount = food.pastPrice && food.pastPrice > food.currentPrice;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/menu/${food._id}`} className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-ember-50 to-ember-100/70 p-6">
        {(food.isPopular || food.isSpecial || hasDiscount) && (
          <span className="absolute left-4 top-4 z-10 badge">
            {hasDiscount ? "Sale" : food.isSpecial ? "Chef's pick" : "Popular"}
          </span>
        )}
        <Image
          src={foodImage(food.imageUrl)}
          alt={food.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1 text-xs font-semibold text-saffron">
          <FiStar className="fill-saffron" />
          <span className="text-ink-900/70">
            {(food.rating || 0).toFixed(1)} · {food.numberOfReviews || 0} reviews
          </span>
        </div>

        <Link href={`/menu/${food._id}`}>
          <h3 className="mt-2 font-display text-lg font-bold text-ink-950 hover:text-ember-600">
            {food.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-ink-900/60">{food.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-extrabold text-ember-600">
              ${food.currentPrice?.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-ink-900/40 line-through">${food.pastPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addItem?.(food, 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 text-white transition hover:bg-ember-600"
            aria-label={`Add ${food.name} to cart`}
          >
            <FiPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
