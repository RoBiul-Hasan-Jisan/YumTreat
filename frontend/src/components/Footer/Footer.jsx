import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaPinterest } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[var(--color-ink)] text-white/70">
            <div className="container-page py-16">
                {/* Newsletter */}
                <div className="max-w-xl mb-16">
                    <h3 className="text-3xl text-white mb-2">Stay in the loop</h3>
                    <p className="text-white/50 mb-6">Occasional news on new dishes and offers — nothing else.</p>
                    <form className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-transparent border border-white/20 rounded-full px-5 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-accent)]"
                        />
                        <button className="bg-[var(--color-accent)] text-white px-6 py-3 rounded-full hover:bg-[var(--color-accent-dark)] transition-colors whitespace-nowrap">
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-14 border-b border-white/10">
                    <div>
                        <h4 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">Menu</h4>
                        <nav className="flex flex-col gap-3 text-sm">
                            <Link to="/menus" className="hover:text-white transition-colors">Pizza</Link>
                            <Link to="/menus" className="hover:text-white transition-colors">Burger</Link>
                            <Link to="/menus" className="hover:text-white transition-colors">Chicken</Link>
                            <Link to="/menus" className="hover:text-white transition-colors">Combo</Link>
                            <Link to="/menus" className="hover:text-white transition-colors">Coffee</Link>
                        </nav>
                    </div>

                    <div>
                        <h4 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">Explore</h4>
                        <nav className="flex flex-col gap-3 text-sm">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <Link to="/about_us" className="hover:text-white transition-colors">About</Link>
                            <Link to="/menus" className="hover:text-white transition-colors">Menu</Link>
                            <Link to="/events" className="hover:text-white transition-colors">Events</Link>
                            <Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link>
                        </nav>
                    </div>

                    <div>
                        <h4 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">Account</h4>
                        <nav className="flex flex-col gap-3 text-sm">
                            <Link to="/account" className="hover:text-white transition-colors">My Orders</Link>
                            <Link to="/account" className="hover:text-white transition-colors">My Account</Link>
                            <Link to="/contact_us" className="hover:text-white transition-colors">Terms of Use</Link>
                            <Link to="/contact_us" className="hover:text-white transition-colors">Privacy Policy</Link>
                        </nav>
                    </div>

                    <div>
                        <h4 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">Hours</h4>
                        <p className="text-sm">Mon – Fri</p>
                        <p className="text-sm text-white/40 mb-3">7:00 AM – 10:00 PM</p>
                        <p className="text-sm">Sat – Sun</p>
                        <p className="text-sm text-white/40">Closed</p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-sm text-white/40">
                        Designed by <span className="text-white/70">Team Trinolit</span> — All rights reserved.
                    </p>
                    <div className="flex gap-3">
                        {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaPinterest].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                            >
                                <Icon className="text-sm" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
