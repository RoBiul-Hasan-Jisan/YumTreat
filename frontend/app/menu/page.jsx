"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import CategoryStrip from "@/components/CategoryStrip";
import FoodCard from "@/components/FoodCard";
import { Loader, ErrorState, EmptyState, SectionHeading } from "@/components/UI";
import { getFoods, getCategories } from "@/lib/api";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading");
  const [activeCategory, setActiveCategory] = useState(initialCategory || null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");

  useEffect(() => {
    let alive = true;
    Promise.all([getFoods(), getCategories()])
      .then(([f, c]) => {
        if (!alive) return;
        setFoods(f);
        setCategories(c);
        setStatus("ready");
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = [...foods];
    if (activeCategory) list = list.filter((f) => f.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (f) => f.name.toLowerCase().includes(q) || f.description?.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case "price-desc":
        list.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case "rating":
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        list.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }
    return list;
  }, [foods, activeCategory, query, sort]);

  return (
    <>
      <section className="bg-ink-950 py-16">
        <div className="container-x">
          <SectionHeading
            eyebrow="The full spread"
            title="Our menu"
            subtitle="Every dish, every category, all in one place. Filter, search, and add straight to your cart."
          />
        </div>
      </section>

      <section className="section-pad !pt-12">
        <div className="container-x">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {status === "ready" && (
              <CategoryStrip categories={categories} active={activeCategory} onSelect={setActiveCategory} />
            )}
            <div className="flex shrink-0 gap-3">
              <div className="relative">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-900/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search dishes…"
                  className="input-field !pl-10 !py-2.5 w-48 sm:w-56"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="input-field !py-2.5 !w-auto"
              >
                <option value="popular">Popular</option>
                <option value="rating">Top rated</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>

          <div className="mt-10">
            {status === "loading" && <Loader label="Loading the menu…" />}
            {status === "error" && (
              <ErrorState message="Couldn't load the menu — check that the backend API is running." />
            )}
            {status === "ready" && filtered.length === 0 && (
              <EmptyState title="No dishes match your search" subtitle="Try a different category or clear your search." />
            )}
            {status === "ready" && filtered.length > 0 && (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((food) => (
                  <FoodCard key={food._id} food={food} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<Loader />}>
      <MenuContent />
    </Suspense>
  );
}
