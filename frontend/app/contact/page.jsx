"use client";

import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from "react-icons/fi";
import { SectionHeading } from "@/components/UI";

const INFO = [
  { icon: FiMapPin, title: "Visit us", detail: "24 Harbor Lane, Foodie District" },
  { icon: FiPhone, title: "Call us", detail: "+1 (555) 019-2244" },
  { icon: FiMail, title: "Email us", detail: "hello@yumtreat.com" },
  { icon: FiClock, title: "Open hours", detail: "Mon–Sun, 10:00 – 23:00" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", guests: "2", date: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // No dedicated backend endpoint for contact/table-booking in the current API —
    // this composes a pre-filled email to the restaurant instead.
    const subject = encodeURIComponent(`Table booking request — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nGuests: ${form.guests}\nPreferred date: ${form.date}\n\n${form.message}`
    );
    window.location.href = `mailto:hello@yumtreat.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <section className="bg-ink-950 py-16">
        <div className="container-x">
          <SectionHeading
            eyebrow="We'd love to hear from you"
            title="Contact & reservations"
            subtitle="Questions, feedback, or booking a table for a group — reach out and we'll get right back to you."
          />
        </div>
      </section>

      <section className="section-pad !pt-12">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-5 self-start">
            {INFO.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ember-500/10 text-ember-600">
                  <Icon size={18} />
                </span>
                <p className="mt-4 font-display font-bold text-ink-950">{title}</p>
                <p className="mt-1 text-sm text-ink-900/55">{detail}</p>
              </div>
            ))}
          </div>

          <div className="card p-8">
            <h3 className="font-display text-xl font-bold text-ink-950">Book a table</h3>
            {sent ? (
              <p className="mt-6 rounded-2xl bg-ember-50 p-4 text-sm font-medium text-ember-800">
                Thanks! Your email app should have opened with the details ready to send.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Full name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="input-field" />
                  <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="input-field" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input type="number" min="1" placeholder="Guests" value={form.guests} onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))} className="input-field" />
                  <input required type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="input-field" />
                </div>
                <textarea placeholder="Anything we should know?" rows={4} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="input-field" />
                <button type="submit" className="btn-primary w-full">
                  Send request <FiSend />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
