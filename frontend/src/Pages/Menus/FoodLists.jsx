import { useContext } from "react";
import { FoodsContext } from "../../Context/FoodsContext";
import { useCategoryContext } from "../../Context/CategoryContext";
import { useNavigate } from "react-router-dom";
import CartButton from "../../components/Cart/CartButton";
import ReviewStar from "../../components/Reviews/ReviewStar";

const FoodLists = () => {
    const navigate = useNavigate();
    const { foods, loading } = useContext(FoodsContext);
    const { selectedCategory } = useCategoryContext();

    const filteredFoods = selectedCategory
        ? foods.filter((food) => food.category.toLowerCase() === selectedCategory.toLowerCase())
        : foods;

    const handleDetails = (foodId) => navigate(`/product/${foodId}`);

    if (loading) {
        return <div className="text-center py-16 text-[var(--color-ink-soft)]">Loading…</div>;
    }

    const available = filteredFoods.filter((food) => food.isAvailable);

    return (
        <section className="container-page pt-14 pb-10" id="popular">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-medium text-[var(--color-ink)]">
                    {selectedCategory ? `${selectedCategory} items` : "All foods"}
                </h2>
                <p className="text-sm text-[var(--color-ink-soft)] mt-1">{available.length} items available</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {available.length > 0 ? (
                    available.map((food) => (
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
                                    onClick={() => handleDetails(food._id)}
                                    className="text-sm font-medium border border-[var(--color-ink)] text-[var(--color-ink)] w-full px-4 py-2 rounded-full hover:bg-[var(--color-ink)] hover:text-white transition-colors"
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-[var(--color-ink-soft)]">No items available.</p>
                )}
            </div>
        </section>
    );
};

export default FoodLists;
