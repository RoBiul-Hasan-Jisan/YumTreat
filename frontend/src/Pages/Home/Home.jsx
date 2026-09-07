import React from "react";
import homeImg from "../../assets/image/home-img.png";
import Category from "../../components/Category/Category";
import About from "../../components/About/About";
import Popular from "../../components/Popular/Popular";
import Banner from "../../components/Banner/Banner";
import Order from "../../components/Contact/Order";

const Home = () => {
    return (
        <>
            <section className="container-page flex flex-col-reverse md:flex-row items-center gap-12 pt-10 pb-20 md:pt-16 md:pb-28" id="home">
                <div className="flex-1 text-center md:text-left">
                    <span className="eyebrow text-xl">Welcome, foodies</span>
                    <h1 className="text-4xl md:text-6xl font-medium text-[var(--color-ink)] pt-3 leading-[1.05]">
                        Different spices,<br />different tastes
                    </h1>
                    <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed py-6 max-w-md mx-auto md:mx-0">
                        Honest ingredients, cooked simply, delivered fast. Explore the menu and find something you'll want again.
                    </p>
                    <a
                        href="/menus#order_now"
                        className="bg-[var(--color-ink)] text-white px-7 py-3.5 rounded-full inline-block hover:bg-[var(--color-accent)] transition-colors"
                    >
                        Order now
                    </a>
                </div>

                <div className="flex-1 flex justify-center items-center">
                    <img
                        src={homeImg}
                        alt="Delicious Food"
                        className="w-full max-w-md object-contain drop-shadow-xl"
                    />
                </div>
            </section>
            <Category />
            <About />
            <Popular />
            <Banner />
            <Order />
        </>
    );
};

export default Home;
