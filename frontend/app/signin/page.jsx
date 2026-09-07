"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth() || {};
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
      router.push("/account");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid min-h-[calc(100vh-80px)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16 sm:px-12">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-extrabold text-ink-950">Welcome back</h1>
          <p className="mt-2 text-sm text-ink-900/60">Sign in to track orders and leave reviews.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-900/50">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="input-field"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-900/50">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="input-field"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-xs font-semibold text-ember-700">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-ink-900/60">
            New here?{" "}
            <Link href="/signup" className="font-semibold text-ember-600 hover:underline">
              Create an account
            </Link>
          </p>

          <div className="mt-8 rounded-2xl bg-ember-50 p-4 text-xs text-ember-800">
            Demo accounts (after running the backend seed script):
            <br />admin@yumtreat.com / Admin@123
            <br />customer@yumtreat.com / Customer@123
          </div>
        </div>
      </div>

      <div className="relative hidden bg-ink-950 lg:block">
        <Image src="/images/misc/banner-1.png" alt="" fill className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      </div>
    </section>
  );
}
