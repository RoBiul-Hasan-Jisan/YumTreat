import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiClock, FiStar } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-40 [background-size:22px_22px]" />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-ember-600/30 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-saffron/20 blur-[100px]" />

      <div className="container-x relative grid items-center gap-16 py-20 sm:py-28 lg:grid-cols-2 lg:py-32">
        <div className="relative z-10">
          <span className="badge !bg-white/10 !text-ember-300">🔥 Fresh off the grill, daily</span>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-6xl">
            Big flavor,
            <br />
            delivered <span className="text-ember-500">fast</span>.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
            YumTreat plates up scratch-made burgers, wood-fired pizza, and comfort classics — ordered online, on the table (or your doorstep) in minutes.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/menu" className="btn-primary">
              Order now <FiArrowRight />
            </Link>
            <Link href="/contact" className="btn-ghost-light">
              Book a table
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-8 text-white/70">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-ember-400">
                <FiClock />
              </span>
              <div className="text-sm">
                <p className="font-bold text-white">25 min avg</p>
                <p className="text-white/50">delivery time</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-saffron">
                <FiStar className="fill-saffron" />
              </span>
              <div className="text-sm">
                <p className="font-bold text-white">4.8 / 5</p>
                <p className="text-white/50">from 3,200+ orders</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-lg">
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-ember-500/30 to-saffron/20 blur-3xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur">
            <Image
              src="/images/foods/burger-2.png"
              alt="Signature double smash burger"
              width={480}
              height={480}
              priority
              className="w-[85%] drop-shadow-[0_35px_45px_rgba(0,0,0,0.55)]"
            />
          </div>
          <FloatingChip
            className="left-0 top-8 sm:-left-6"
            image="/images/foods/pizza-1.png"
            label="Classic Margherita"
            price="9.99"
          />
          <FloatingChip
            className="bottom-6 right-0 sm:-right-8"
            image="/images/foods/coffee-2.png"
            label="Cappuccino"
            price="3.99"
          />
        </div>
      </div>
    </section>
  );
}

function FloatingChip({ image, label, price, className = "" }) {
  return (
    <div
      className={`absolute z-10 hidden animate-[float_6s_ease-in-out_infinite] items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-soft backdrop-blur sm:flex ${className}`}
    >
      <Image src={image} alt={label} width={48} height={48} className="h-12 w-12 object-contain" />
      <div>
        <p className="text-xs font-bold text-ink-950">{label}</p>
        <p className="text-xs font-semibold text-ember-600">${price}</p>
      </div>
    </div>
  );
}
