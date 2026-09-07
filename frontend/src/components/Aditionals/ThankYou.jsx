import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ThankYou = () => {
    return (
        <section className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4">
            <FaCheckCircle className="text-[var(--color-accent)] text-5xl mb-6" />
            <h1 className="text-3xl md:text-4xl font-medium text-[var(--color-ink)] mb-3">Thank you for your order</h1>
            <p className="text-[var(--color-ink-soft)] max-w-md">
                We've received your order and are preparing it with care. You'll get a confirmation email shortly.
            </p>
            <Link
                to="/"
                className="mt-8 inline-block bg-[var(--color-ink)] text-white px-7 py-3 rounded-full hover:bg-[var(--color-accent)] transition-colors text-sm font-medium"
            >
                Back to Home
            </Link>
        </section>
    );
};

export default ThankYou;
