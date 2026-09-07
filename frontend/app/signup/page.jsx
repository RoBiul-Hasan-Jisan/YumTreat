"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function SignUpPage() {
  const router = useRouter();
  const { register } = useAuth() || {};
  const [form, setForm] = useState({ email: "", password: "", cPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(form.email, form.password, form.cPassword);
      router.push("/account");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid min-h-[calc(100vh-80px)] lg:grid-cols-2">
      <div className="relative hidden bg-ink-950 lg:block">
        <Image src="/images/misc/book-table.jpg" alt="" fill className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      </div>

      <div className="flex items-center justify-center px-6 py-16 sm:px-12">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-extrabold text-ink-950">Create your account</h1>
          <p className="mt-2 text-sm text-ink-900/60">Save addresses, track orders, and leave reviews.</p>

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
                minLength={6}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="input-field"
                placeholder="At least 6 characters"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-900/50">Confirm password</label>
              <input
                type="password"
                required
                value={form.cPassword}
                onChange={(e) => setForm((f) => ({ ...f, cPassword: e.target.value }))}
                className="input-field"
                placeholder="Re-enter password"
              />
            </div>
            {error && <p className="text-xs font-semibold text-ember-700">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-ink-900/60">
            Already have an account?{" "}
            <Link href="/signin" className="font-semibold text-ember-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
