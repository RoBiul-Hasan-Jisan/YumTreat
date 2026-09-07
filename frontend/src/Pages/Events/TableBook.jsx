import React from 'react';

const TableBook = () => {
    return (
        <section className="container-page py-16 md:py-24">
            <div className="text-center mb-10">
                <span className="eyebrow text-lg">Reserve ahead</span>
                <h1 className="text-3xl font-medium text-[var(--color-ink)] mt-1">Book a table</h1>
            </div>
            <div className="flex flex-wrap gap-8 justify-center items-center">
                <div className="w-full md:w-1/2">
                    <img
                        src={new URL(`../../assets/image/book-table.jpg`, import.meta.url).href}
                        alt="Table Booking"
                        className="w-full rounded-3xl object-cover max-h-[26rem]"
                    />
                </div>
                <form className="w-full md:w-1/3 bg-white p-7 rounded-3xl border border-[var(--color-line)]">
                    <h3 className="text-xl font-medium text-center text-[var(--color-ink)] mb-5">Reserve your spot</h3>
                    <input type="text" name="name" required placeholder="Enter your name" className="w-full p-3 mb-4 rounded-xl border border-[var(--color-line)] focus:outline-none focus:border-[var(--color-accent)] transition-colors" />
                    <input type="number" name="number" required placeholder="Enter your number" maxLength="10" className="w-full p-3 mb-4 rounded-xl border border-[var(--color-line)] focus:outline-none focus:border-[var(--color-accent)] transition-colors" />
                    <input type="number" name="guests" required placeholder="How many guests?" maxLength="2" className="w-full p-3 mb-4 rounded-xl border border-[var(--color-line)] focus:outline-none focus:border-[var(--color-accent)] transition-colors" />
                    <button type="submit" className="w-full bg-[var(--color-ink)] text-white py-3 rounded-full font-medium hover:bg-[var(--color-accent)] transition-colors">Book Now</button>
                </form>
            </div>
        </section>
    );
};

export default TableBook;
