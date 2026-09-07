import React from "react";
import bannerImage from "../../assets/image/row-banner.png";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <section className="container-page pb-20 md:pb-28">
            <div
                className="relative bg-cover bg-center h-[26rem] rounded-3xl overflow-hidden"
                style={{ backgroundImage: `url(${bannerImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
                <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-md">
                    <span className="eyebrow text-lg text-white/80">Double cheese</span>
                    <h3 className="text-4xl md:text-5xl text-white font-medium mt-2 mb-3">Burger</h3>
                    <p className="text-white/80 mb-6">Served with cola and crisp fries.</p>
                    <Link
                        to="/menus"
                        className="bg-white text-[var(--color-ink)] px-6 py-3 rounded-full inline-block w-fit hover:bg-[var(--color-accent)] hover:text-white transition-colors text-sm font-medium"
                    >
                        Order now
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Banner;
