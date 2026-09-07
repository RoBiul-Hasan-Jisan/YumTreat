import { FiTruck, FiThumbsUp, FiShield, FiHeart } from "react-icons/fi";

const FEATURES = [
  { icon: FiTruck, title: "Lightning delivery", desc: "Hot food at your door in 25 minutes or less, guaranteed." },
  { icon: FiThumbsUp, title: "Quality first", desc: "Locally sourced ingredients, prepped fresh every single morning." },
  { icon: FiShield, title: "Secure ordering", desc: "Encrypted checkout and live order tracking, start to finish." },
  { icon: FiHeart, title: "Made with care", desc: "Recipes perfected over 12 years by our in-house chefs." },
];

export default function Features() {
  return (
    <section className="section-pad">
      <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card p-7 transition hover:shadow-glow">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ember-500/10 text-ember-600">
              <Icon size={22} />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-ink-950">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-900/60">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
