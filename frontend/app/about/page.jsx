import Image from "next/image";
import { FiAward, FiUsers, FiHeart } from "react-icons/fi";
import { SectionHeading } from "@/components/UI";
import { StatsBar, CtaBanner } from "@/components/CtaBanner";

const TEAM = [
  { name: "Marcus Bell", role: "Executive Chef", photo: "/images/misc/our-team-1.jpg" },
  { name: "Sofia Han", role: "Head of Kitchen", photo: "/images/misc/our-team-2.jpg" },
  { name: "Diego Alvarez", role: "Pastry Chef", photo: "/images/misc/our-team-3.jpg" },
  { name: "Naomi Price", role: "Operations Lead", photo: "/images/misc/our-team-4.jpg" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="badge !bg-white/10 !text-ember-300">Our story</span>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">
              Cooking with intention since day one.
            </h1>
            <p className="mt-6 max-w-lg text-white/60">
              YumTreat started as a single kitchen with one rule: never cut corners. Twelve years later that rule
              still runs everything we plate — from the produce we source to the way an order reaches your door.
            </p>
          </div>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[2rem]">
            <Image src="/images/misc/about-img.png" alt="Chef preparing a dish" fill className="object-cover" />
          </div>
        </div>
      </section>

      <StatsBar />

      <section className="section-pad">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          {[
            { icon: FiAward, title: "Award-winning kitchen", desc: "Recognized three years running for best casual dining experience in the district." },
            { icon: FiUsers, title: "A team that cares", desc: "Every dish is checked by hand before it leaves the pass — no exceptions." },
            { icon: FiHeart, title: "Community first", desc: "We source from local farms and give back through our weekly community plates program." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ember-500/10 text-ember-600">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/60">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Meet the team" title="The people behind every plate" align="center" />
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[180px] overflow-hidden rounded-3xl">
                  <Image src={member.photo} alt={member.name} fill className="object-cover" />
                </div>
                <p className="mt-4 font-display font-bold text-ink-950">{member.name}</p>
                <p className="text-sm text-ink-900/50">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
