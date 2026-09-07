import React from "react";
import { Link } from "react-router-dom";
import ContactInfoCard from "./ContactInfoCard";

const Order = () => {
    return (
        <section id="order" className="container-page py-20 md:py-28 text-center">
            <div className="mb-10">
                <span className="eyebrow text-lg">Order now</span>
                <h2 className="text-3xl font-medium text-[var(--color-ink)] mt-1">Fastest home delivery</h2>
            </div>

            <ContactInfoCard />

            <Link
                to="/contact_us"
                className="bg-[var(--color-ink)] text-white px-7 py-3.5 rounded-full inline-block hover:bg-[var(--color-accent)] transition-colors text-sm font-medium"
            >
                Contact Us
            </Link>
        </section>
    );
};

export default Order;
