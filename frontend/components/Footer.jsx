import Link from "next/link";
import { FiInstagram, FiFacebook, FiTwitter, FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-white/70">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-display text-2xl font-extrabold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ember-500 text-white">Y</span>
            Yum<span className="text-ember-500">Treat</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Scratch-made comfort food, fired up fast and delivered hot. Order online or book a table for the full experience.
          </p>
          <div className="mt-6 flex gap-3">
            {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-ember-500 hover:text-ember-500"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href="/menu" className="hover:text-ember-500">Full menu</Link></li>
            <li><Link href="/about" className="hover:text-ember-500">Our story</Link></li>
            <li><Link href="/contact" className="hover:text-ember-500">Book a table</Link></li>
            <li><Link href="/account" className="hover:text-ember-500">Track an order</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white">Hours</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex justify-between gap-6"><span>Mon – Fri</span><span>10:00 – 22:00</span></li>
            <li className="flex justify-between gap-6"><span>Saturday</span><span>10:00 – 23:00</span></li>
            <li className="flex justify-between gap-6"><span>Sunday</span><span>11:00 – 21:00</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white">Get in touch</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-start gap-3"><FiMapPin className="mt-0.5 shrink-0 text-ember-500" /> 24 Harbor Lane, Foodie District</li>
            <li className="flex items-start gap-3"><FiPhone className="mt-0.5 shrink-0 text-ember-500" /> +1 (555) 019-2244</li>
            <li className="flex items-start gap-3"><FiMail className="mt-0.5 shrink-0 text-ember-500" /> hello@yumtreat.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-x flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} YumTreat. All rights reserved.</p>
          <p>Built with Next.js &amp; a genuine appetite.</p>
        </div>
      </div>
    </footer>
  );
}
