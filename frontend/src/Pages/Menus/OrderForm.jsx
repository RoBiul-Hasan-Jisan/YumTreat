import React from "react";

const fieldClass =
    "w-full p-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] focus:outline-none focus:border-[var(--color-accent)] transition-colors";
const labelClass = "block text-sm font-medium text-[var(--color-ink-soft)] mb-1.5";

const OrderForm = () => {
    return (
        <section className="bg-[var(--color-paper-soft)] py-20" id="order_now">
            <div className="container-page">
                <div className="text-center mb-10">
                    <span className="eyebrow text-lg">Order now</span>
                    <h3 className="text-3xl font-medium text-[var(--color-ink)] mt-1">Fast home delivery</h3>
                </div>
                <form className="bg-white p-8 max-w-4xl mx-auto rounded-3xl border border-[var(--color-line)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Full Name</label>
                                <input type="text" placeholder="Enter your name" className={fieldClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Food Name</label>
                                <input type="text" placeholder="Food you want" className={fieldClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Order Details</label>
                                <input type="text" placeholder="Specifics with food" className={fieldClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Your Address</label>
                                <textarea placeholder="Enter your address" className={fieldClass} rows="4"></textarea>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Number</label>
                                <input type="number" placeholder="Enter your number" className={fieldClass} />
                            </div>
                            <div>
                                <label className={labelClass}>How Much</label>
                                <input type="number" placeholder="How many you want" className={fieldClass} />
                            </div>
                            <div>
                                <label className={labelClass}>When You Want</label>
                                <input type="datetime-local" className={fieldClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Our Address</label>
                                <iframe
                                    className="w-full h-40 rounded-xl border border-[var(--color-line)]"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60307.59083109428!2d72.840725!3d19.141651!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aceef0c69%3A0x2aa80cf2287dfa3b!2sJogeshwari%20West%2C%20Mumbai%2C%20Maharashtra%20400047!5e0!3m2!1sen!2sin!4v1642222128240!5m2!1sen!2sin"
                                    loading="lazy"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-6 bg-[var(--color-ink)] text-white py-3.5 rounded-full font-medium hover:bg-[var(--color-accent)] transition-colors"
                    >
                        Order Now
                    </button>
                </form>
            </div>
        </section>
    );
};

export default OrderForm;
