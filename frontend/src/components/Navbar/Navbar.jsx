import { useState, useEffect } from "react";
import { FaBars, FaSearch, FaShoppingCart, FaUser, FaTimes } from "react-icons/fa";
import Cart from "../Cart/Cart";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import SearchBar from "../Search/SearchBar";

const NAV_LINKS = [
    { to: "/", label: "Home" },
    { to: "/menus", label: "Menus" },
    { to: "/events", label: "Events" },
    { to: "/blogs", label: "Blogs" },
    { to: "/about_us", label: "About" },
    { to: "/contact_us", label: "Contact" },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { isLoggedIn } = useAuthContext();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const linkClass = ({ isActive }) =>
        `relative py-1 transition-colors ${isActive ? "text-[var(--color-ink)]" : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
        } after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:bg-[var(--color-accent)] after:transition-all ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
        }`;

    return (
        <div className="relative w-full">
            <header
                className={`fixed top-0 left-0 right-0 z-50 bg-[var(--color-paper)]/90 backdrop-blur-md transition-shadow ${scrolled ? "shadow-[0_1px_0_var(--color-line)]" : ""
                    }`}
            >
                <div className="container-page flex items-center justify-between h-18 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-lg text-[var(--color-ink)]"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                        <Link to="/" className="font-[var(--font-display)] text-2xl tracking-tight text-[var(--color-ink)]">
                            Yum<span className="text-[var(--color-accent)]">Treat</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
                        {NAV_LINKS.map((l) => (
                            <NavLink key={l.to} to={l.to} className={linkClass}>
                                {l.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-5 text-lg text-[var(--color-ink)]">
                        <button aria-label="Search" onClick={() => setSearchOpen(!searchOpen)} className="hover:text-[var(--color-accent)] transition-colors">
                            <FaSearch />
                        </button>
                        <button aria-label="Cart" onClick={() => setCartOpen(!cartOpen)} className="hover:text-[var(--color-accent)] transition-colors">
                            <FaShoppingCart />
                        </button>
                        {isLoggedIn ? (
                            <NavLink to="/account" className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--color-line)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">
                                <FaUser className="text-sm" />
                            </NavLink>
                        ) : (
                            <NavLink
                                to="/sign_in"
                                className="text-sm font-medium px-4 py-2 rounded-full border border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white transition-colors"
                            >
                                Sign In
                            </NavLink>
                        )}
                    </div>
                </div>

                {/* Mobile nav */}
                {menuOpen && (
                    <nav className="md:hidden flex flex-col gap-1 px-5 pb-5 text-[var(--color-ink-soft)] border-t border-[var(--color-line)] bg-[var(--color-paper)]">
                        {NAV_LINKS.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                onClick={() => setMenuOpen(false)}
                                className="py-3 border-b border-[var(--color-line)] last:border-none hover:text-[var(--color-accent)]"
                            >
                                {l.label}
                            </NavLink>
                        ))}
                    </nav>
                )}
            </header>

            {searchOpen && <SearchBar />}
            <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
        </div>
    );
};

export default Navbar;
