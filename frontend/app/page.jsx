"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FoodCard from "@/components/FoodCard";
import { StatsBar, CtaBanner } from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import { SectionHeading } from "@/components/UI";
import { getFoods, categoryImage, getCategories } from "@/lib/api";

export default function HomePage() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let alive = true;
    Promise.all([getFoods(), getCategories()])
      .then(([foodData, catData]) => {
        if (!alive) return;
        setFoods(foodData);
        setCategories(catData);
        setStatus("ready");
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, []);

  const popular = foods.filter((f) => f.isPopular).slice(0, 8);

  return (
    <>
      <Hero />
      <StatsBar />
      <Features />

      {/* Categories */}
      {categories.length > 0 && (
        <section className="section-pad">
          <div className="container-x">
            <SectionHeading
              eyebrow="What are you craving?"
              title="Browse by category"
              subtitle="From wood-fired pizza to slow-simmered curry — every category is stacked with fan favorites."
            />
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/menu?category=${encodeURIComponent(cat.name)}`}
                  className="group flex flex-col items-center gap-3 rounded-3xl bg-white p-5 text-center shadow-soft ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-glow"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ember-50 transition group-hover:bg-ember-100">
                    <Image src={categoryImage(cat.img)} alt={cat.name} width={40} height={40} className="object-contain" />
                  </span>
                  <span className="text-sm font-bold text-ink-950">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular dishes */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Fan favorites"
              title="Our most-loved dishes"
              subtitle="Ranked by real orders, not guesswork. These are the plates people keep coming back for."
            />
            <Link href="/menu" className="btn-outline shrink-0">
              View full menu <FiArrowRight />
            </Link>
          </div>

          {status === "loading" && (
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse rounded-3xl bg-ink-900/5" />
              ))}
            </div>
          )}

          {status === "error" && (
            <p className="mt-10 text-sm text-ember-700">
              Couldn&apos;t reach the menu API. Make sure the backend server is running and{" "}
              <code className="rounded bg-ink-900/5 px-1.5 py-0.5">NEXT_PUBLIC_API_URL</code> points to it.
            </p>
          )}

          {status === "ready" && (
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {(popular.length ? popular : foods.slice(0, 8)).map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
      <Testimonials />
    </>
  );
}
