import React from 'react';

const fieldClass = "w-full p-3 rounded-xl border border-[var(--color-line)] focus:outline-none focus:border-[var(--color-accent)] transition-colors";

const ContactForm = () => {
    return (
        <form className="max-w-lg mx-auto p-8 bg-white border border-[var(--color-line)] rounded-3xl text-left">
            <div className="flex flex-wrap gap-4 mb-4">
                <input type="text" placeholder="Name" className={fieldClass} />
                <input type="email" placeholder="Email" className={fieldClass} />
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
                <input type="number" placeholder="Number" className={fieldClass} />
                <input type="text" placeholder="Food Name" className={fieldClass} />
            </div>
            <textarea
                placeholder="Address"
                className={`${fieldClass} resize-none h-32 mb-4`}
            ></textarea>
            <button type="submit" className="w-full bg-[var(--color-ink)] text-white p-3 rounded-full font-medium hover:bg-[var(--color-accent)] transition-colors">
                Order Now
            </button>
        </form>
    );
};

export default ContactForm;
