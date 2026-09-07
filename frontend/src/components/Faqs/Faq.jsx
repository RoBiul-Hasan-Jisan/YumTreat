import { useState } from "react";

const faqs = [
    { question: "How does it work?", answer: "We provide high-quality food services..." },
    { question: "How long does it take for delivery?", answer: "Delivery typically takes 30-45 minutes..." },
    { question: "Can I order for huge parties?", answer: "Yes, we offer bulk ordering options..." },
    { question: "How much protein does it contain?", answer: "Each meal contains a balanced amount of protein..." },
    { question: "Is it cooked with oil?", answer: "We use minimal healthy oils in our cooking..." }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="container-page max-w-3xl py-16 md:py-24">
            <div className="text-center mb-10">
                <span className="eyebrow text-lg">Questions</span>
                <h2 className="text-3xl font-medium text-[var(--color-ink)] mt-1">Frequently asked</h2>
            </div>
            <div className="space-y-3">
                {faqs.map((faq, index) => {
                    const open = activeIndex === index;
                    return (
                        <div
                            key={index}
                            className={`rounded-2xl border overflow-hidden transition-colors ${open ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]" : "border-[var(--color-line)] bg-white"
                                }`}
                        >
                            <button
                                className="w-full flex justify-between items-center gap-4 p-5 text-left font-medium text-[var(--color-ink)] focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                            >
                                {faq.question}
                                <span className={`text-[var(--color-accent)] transition-transform ${open ? "rotate-180" : "rotate-0"}`}>
                                    ▾
                                </span>
                            </button>
                            <div className={`transition-all duration-300 overflow-hidden ${open ? "px-5 pb-5" : "h-0"}`}>
                                <p className="text-[var(--color-ink-soft)]">{faq.answer}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
