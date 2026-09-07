"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiArrowRight } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { EmptyState, SectionHeading } from "@/components/UI";
import { foodImage } from "@/lib/api";

export default function CartPage() {
  const { items, setQuantity, removeItem, subtotal, hydrated } = useCart() || {};

  if (!hydrated) return null;

  const deliveryFee = items?.length ? 2.99 : 0;
  const total = (subtotal || 0) + deliveryFee;

  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionHeading eyebrow="Your order" title="Cart" />

        {!items?.length ? (
          <div className="mt-10">
            <EmptyState
              title="Your cart is empty"
              subtitle="Add a few favorites from the menu to get started."
              action={
                <Link href="/menu" className="btn-primary mt-2">
                  Browse the menu
                </Link>
              }
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-soft ring-1 ring-black/5 sm:gap-6 sm:p-5">
                  <div className="relative h-20 w-20 shrink-0 rounded-2xl bg-ember-50 sm:h-24 sm:w-24">
                    <Image src={foodImage(item.imageUrl)} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-display text-base font-bold text-ink-950 sm:text-lg">{item.name}</h3>
                    <p className="mt-1 font-semibold text-ember-600">${item.currentPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-full border border-ink-900/10 px-3 py-1.5">
                    <button onClick={() => setQuantity(item._id, item.quantity - 1)} className="text-ink-900/50 hover:text-ember-600">
                      <FiMinus size={14} />
                    </button>
                    <span className="w-5 text-center text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => setQuantity(item._id, item.quantity + 1)} className="text-ink-900/50 hover:text-ember-600">
                      <FiPlus size={14} />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item._id)} className="text-ink-900/30 hover:text-ember-700" aria-label="Remove item">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            <div className="h-fit card p-7">
              <h3 className="font-display text-lg font-bold text-ink-950">Order summary</h3>
              <div className="mt-5 space-y-3 text-sm">
                <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                <Row label="Delivery fee" value={`$${deliveryFee.toFixed(2)}`} />
                <div className="border-t border-dashed border-ink-900/10 pt-3">
                  <Row label="Total" value={`$${total.toFixed(2)}`} bold />
                </div>
              </div>
              <Link href="/checkout" className="btn-primary mt-6 w-full">
                Checkout <FiArrowRight />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "font-display text-lg font-extrabold text-ink-950" : "text-ink-900/60"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
