import React from "react";
import aboutImg from "../../assets/image/about-img.png";
import serv1Img from "../../assets/image/serv-1.png";
import serv2Img from "../../assets/image/serv-2.png";
import serv3Img from "../../assets/image/serv-3.png";
import serv4Img from "../../assets/image/serv-4.png";
import { Link } from "react-router-dom";

const SERVICES = [
    { img: serv1Img, label: "Fast Delivery" },
    { img: serv2Img, label: "Fresh Food" },
    { img: serv3Img, label: "Best Quality" },
    { img: serv4Img, label: "24/7 Support" },
];

const About = () => {
    return (
        <section className="bg-[var(--color-paper-soft)] py-20 md:py-28" id="about">
            <div className="container-page flex flex-col md:flex-row items-center gap-14">
                <div className="flex-1">
                    <img src={aboutImg} alt="About Us" className="w-full max-w-md mx-auto" />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <span className="eyebrow text-lg">Why choose us</span>
                    <h2 className="text-3xl font-medium text-[var(--color-ink)] pt-2">
                        What makes our food delicious
                    </h2>
                    <p className="text-[var(--color-ink-soft)] leading-relaxed py-4 max-w-md mx-auto md:mx-0">
                        We keep it simple — quality ingredients, careful cooking, and a kitchen that respects your time.
                    </p>
                    <Link
                        to="/about_us#ourStory"
                        className="inline-block mt-2 text-sm font-medium border-b border-[var(--color-ink)] pb-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                    >
                        Read our story →
                    </Link>

                    <div className="grid grid-cols-2 gap-4 mt-10">
                        {SERVICES.map((s) => (
                            <div key={s.label} className="flex items-center gap-3 bg-white p-5 rounded-xl border border-[var(--color-line)]">
                                <img src={s.img} alt={s.label} className="h-9 w-9 object-contain" />
                                <h3 className="text-sm font-medium text-[var(--color-ink)]">{s.label}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
