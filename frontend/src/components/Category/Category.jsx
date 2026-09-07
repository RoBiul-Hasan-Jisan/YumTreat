import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCategoryContext } from "../../Context/CategoryContext";

const Category = () => {
    const { categories, loading, setSelectedCategory } = useCategoryContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        if (location.pathname !== "/menus") {
            navigate(`/menus`);
        }
    };

    if (loading) {
        return <p className="text-center py-20 text-[var(--color-ink-soft)]">Loading categories…</p>;
    }

    return (
        <section className="container-page pb-20 md:pb-28">
            <div className="text-center mb-10">
                <span className="eyebrow text-lg">Browse</span>
                <h2 className="text-3xl font-medium text-[var(--color-ink)] mt-1">Shop by category</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                    <button
                        key={category._id}
                        onClick={() => handleCategoryClick(category.name)}
                        className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-[var(--color-line)] bg-white hover:border-[var(--color-accent)] hover:shadow-[0_8px_24px_-12px_rgba(194,65,12,0.35)] transition-all"
                    >
                        <img
                            src={new URL(`../../assets/image/${category.img}.png`, import.meta.url).href}
                            alt={category.name}
                            className="h-14 md:h-16 object-contain group-hover:scale-105 transition-transform"
                        />
                        <h3 className="text-sm font-medium text-[var(--color-ink)]">{category.name}</h3>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Category;
