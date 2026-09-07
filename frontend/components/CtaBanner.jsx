import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export function StatsBar() {
  const stats = [
    { value: "12+", label: "Years of flavor" },
    { value: "60k+", label: "Orders delivered" },
    { value: "4.8", label: "Average rating" },
    { value: "35", label: "Signature dishes" },
  ];
  return (
    <section className="border-y border-black/5 bg-white">
      <div className="container-x grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-3xl font-extrabold text-ember-600 sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-900/50">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-950 px-8 py-16 sm:px-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-ember-600/30 blur-[100px]" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                Hungry already? Your table (or your couch) is waiting.
              </h2>
              <p className="mt-4 max-w-lg text-white/60">
                Order online for pickup or delivery, or reserve a table and let our kitchen do the rest.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/menu" className="btn-primary">
                  Browse the menu <FiArrowRight />
                </Link>
                <Link href="/contact" className="btn-ghost-light">
                  Reserve a table
                </Link>
              </div>
            </div>
            <div className="relative mx-auto hidden aspect-square w-56 lg:block">
              <Image src="/images/foods/pizza-2.png" alt="Pepperoni pizza" fill className="object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
