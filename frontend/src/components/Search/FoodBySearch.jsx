import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FoodsContext } from '../../Context/FoodsContext';
import ReviewStar from '../Reviews/ReviewStar';
import CartButton from '../Cart/CartButton';

const FoodBySearch = () => {
    const navigate = useNavigate();
    const { productName } = useParams();
    const { foods } = useContext(FoodsContext);

    const matchedFoods = foods.filter(food => {
        const nameMatch = food.name.toLowerCase() === productName.toLowerCase();
        const tagMatch = Array.isArray(food.tags) && food.tags.some(tag =>
            tag.toLowerCase().includes(productName.toLowerCase())
        );
        return nameMatch || tagMatch;
    });

    const handleDetails = (foodId) => {
        navigate(`/product/${foodId}`);
    };

    return (
        <div className="container-page py-14">
            <h2 className="text-2xl font-medium text-[var(--color-ink)] mb-8">
                Showing results for: <span className="text-[var(--color-accent)]">"{productName}"</span>
            </h2>

            {matchedFoods.length === 0 ? (
                <p className="text-[var(--color-ink-soft)]">No food items matched your search.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {matchedFoods.map(food => (
                        <div key={food._id} className="bg-white rounded-2xl border border-[var(--color-line)] p-6 text-center hover:shadow-[0_12px_30px_-16px_rgba(0,0,0,0.15)] transition-shadow">
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
                                ${food.currentPrice || '0'}{' '}
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default FoodBySearch;
