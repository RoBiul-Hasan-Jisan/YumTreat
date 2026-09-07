import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FoodsContext } from "../../Context/FoodsContext";
import CartButton from "../Cart/CartButton";
import ReviewStar from "../Reviews/ReviewStar";

const Popular = () => {
    const { foods, loading } = useContext(FoodsContext);
    const navigate = useNavigate();

    if (loading) {
        return <div className="text-center py-20 text-[var(--color-ink-soft)]">Loading…</div>;
    }

    return (
        <section className="container-page py-20 md:py-28" id="popular">
            <div className="text-center mb-10">
                <span className="eyebrow text-lg">Popular food</span>
                <h2 className="text-3xl font-medium text-[var(--color-ink)] mt-1">Our special dishes</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {foods
                    .filter((food) => food.isAvailable && food.isPopular)
                    .map((food) => (
                        <div
                            key={food._id}
                            className="bg-white rounded-2xl border border-[var(--color-line)] p-6 text-center hover:shadow-[0_12px_30px_-16px_rgba(0,0,0,0.15)] transition-shadow"
                        >
                            <div className="mb-4">
                                <img
                                    src={new URL(`../../assets/foods/${food.imageUrl}.png`, import.meta.url).href}
                                    alt={food.name}
                                    className="h-36 mx-auto object-contain"
                                />
                            </div>

                            <h3 className="text-base font-medium text-[var(--color-ink)] truncate">{food.name}</h3>

                            <div className="flex justify-center items-center gap-1 my-2">
                                <ReviewStar rating={food.rating} />
                                <span className="text-[var(--color-ink-soft)] text-xs">({food.reviews || 0})</span>
                            </div>

                            <div className="text-lg font-semibold text-[var(--color-ink)]">
                                ${food.currentPrice || "0"}{" "}
                                {food.pastPrice ? (
                                    <span className="text-[var(--color-ink-soft)] line-through text-sm font-normal ml-1">
                                        ${food.pastPrice}
                                    </span>
                                ) : null}
                            </div>

                            <div className="mt-3 flex flex-col gap-2">
                                <CartButton food={food} />
                                <button
                                    onClick={() => navigate(`/product/${food._id}`)}
                                    className="text-sm font-medium border border-[var(--color-ink)] text-[var(--color-ink)] w-full px-4 py-2 rounded-full hover:bg-[var(--color-ink)] hover:text-white transition-colors"
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default Popular;
