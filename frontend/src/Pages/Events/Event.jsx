import React from "react";
import TableBook from "./TableBook";


const eventPackages = [
    {
        title: "Birthday Party",
        description: "Celebrate your special day with our customized birthday packages including cake, decorations, and catering.",
        price: "$299.99"
    },
    {
        title: "Corporate Dinner",
        description: "Host your corporate gatherings with our premium dining experience and personalized menu options.",
        price: "$499.99"
    },
    {
        title: "Wedding Reception",
        description: "Make your wedding reception memorable with our exquisite cuisine and elegant setup.",
        price: "$999.99"
    },
    {
        title: "Anniversary Celebration",
        description: "Celebrate your anniversary with a romantic dinner and specially curated dishes.",
        price: "$399.99"
    }
];

const Event = () => {
    return (
        <>
            <TableBook />
            <section className="container-page py-16 md:py-24">
                <div className="text-center mb-12">
                    <span className="eyebrow text-lg">Celebrate with us</span>
                    <h2 className="text-3xl font-medium text-[var(--color-ink)] mt-1">Event packages</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {eventPackages.map((event, index) => (
                        <div key={index} className="p-7 rounded-2xl border border-[var(--color-line)] bg-white hover:border-[var(--color-accent)] transition-colors">
                            <h3 className="text-xl font-medium text-[var(--color-ink)] mb-2">{event.title}</h3>
                            <p className="text-[var(--color-ink-soft)] mb-4 leading-relaxed">{event.description}</p>
                            <span className="text-lg font-semibold text-[var(--color-accent)]">{event.price}</span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Event;
