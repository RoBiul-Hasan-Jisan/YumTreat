"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { placeOrder } from "@/lib/api";
import { EmptyState, SectionHeading } from "@/components/UI";

const PAYMENT_METHODS = [
  { id: "cash", label: "Cash on delivery" },
  { id: "card", label: "Card" },
  { id: "bkash", label: "bKash" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, hydrated } = useCart() || {};
  const { isAuthenticated, ready } = useAuth() || {};

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    note: "",
    paymentMethod: "cash",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(null);

  const deliveryFee = items?.length ? 2.99 : 0;
  const total = (subtotal || 0) + deliveryFee;

  if (!hydrated || !ready) return null;

  if (!isAuthenticated) {
    return (
      <section className="section-pad">
        <div className="container-x">
          <EmptyState
            title="Sign in to check out"
            subtitle="Create an account or sign in so we can attach this order to you and track it in your account."
            action={
              <Link href="/signin" className="btn-primary mt-2">
                Sign in
              </Link>
            }
          />
        </div>
      </section>
    );
  }

  if (!items?.length && !placed) {
    return (
      <section className="section-pad">
        <div className="container-x">
          <EmptyState
            title="Your cart is empty"
            subtitle="Add something tasty from the menu before checking out."
            action={
              <Link href="/menu" className="btn-primary mt-2">
                Browse the menu
              </Link>
            }
          />
        </div>
      </section>
    );
  }

  if (placed) {
    return (
      <section className="section-pad">
        <div className="container-x text-center">
          <FiCheckCircle className="mx-auto text-6xl text-ember-500" />
          <h1 className="mt-6 font-display text-3xl font-extrabold text-ink-950">Order placed!</h1>
          <p className="mx-auto mt-3 max-w-md text-ink-900/60">
            Order #{placed._id?.slice(-6).toUpperCase()} is being prepared. You can track its status from your account.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/account" className="btn-primary">Track order</Link>
            <Link href="/menu" className="btn-outline">Order more</Link>
          </div>
        </div>
      </section>
    );
  }

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const order = await placeOrder({
        ...form,
        payed: total.toFixed(2),
        products: items.map((i) => ({ product_id: i._id, quantity: i.quantity })),
      });
      clearCart();
      setPlaced(order);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionHeading eyebrow="Almost there" title="Checkout" />

        <form onSubmit={handleSubmit} className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="card space-y-5 p-7">
            <h3 className="font-display text-lg font-bold text-ink-950">Delivery details</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name">
                <input required value={form.fullName} onChange={update("fullName")} className="input-field" placeholder="Jordan Lee" />
              </Field>
              <Field label="Phone">
                <input required value={form.phone} onChange={update("phone")} className="input-field" placeholder="+1 555 019 2244" />
              </Field>
            </div>
            <Field label="Address">
              <input required value={form.address} onChange={update("address")} className="input-field" placeholder="24 Harbor Lane" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="City">
                <input required value={form.city} onChange={update("city")} className="input-field" placeholder="Foodie District" />
              </Field>
              <Field label="Postal code">
                <input required value={form.postalCode} onChange={update("postalCode")} className="input-field" placeholder="10001" />
              </Field>
            </div>
            <Field label="Delivery note (optional)">
              <textarea value={form.note} onChange={update("note")} rows={3} className="input-field" placeholder="Ring the bell twice…" />
            </Field>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-900/50">Payment method</label>
              <div className="grid gap-3 sm:grid-cols-3">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setForm((f) => ({ ...f, paymentMethod: m.id }))}
                    className={`rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition ${
                      form.paymentMethod === m.id
                        ? "border-ember-500 bg-ember-50 text-ember-700"
                        : "border-ink-900/10 text-ink-900/60 hover:border-ember-300"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-fit card p-7">
            <h3 className="font-display text-lg font-bold text-ink-950">Order summary</h3>
            <div className="mt-5 space-y-3 text-sm">
              {items.map((i) => (
                <div key={i._id} className="flex justify-between text-ink-900/60">
                  <span>{i.quantity} × {i.name}</span>
                  <span>${(i.currentPrice * i.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-dashed border-ink-900/10 pt-3">
                <div className="flex justify-between text-ink-900/60">
                  <span>Delivery fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between font-display text-lg font-extrabold text-ink-950">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            {error && <p className="mt-4 text-xs font-semibold text-ember-700">{error}</p>}
            <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full">
              {submitting ? "Placing order…" : "Place order"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-900/50">{label}</label>
      {children}
    </div>
  );
}
