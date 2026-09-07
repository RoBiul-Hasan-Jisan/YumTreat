import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import CartButton from "../../components/Cart/CartButton";
import ReviewStar from "../../components/Reviews/ReviewStar";
import { useReviewContext } from "../../Context/ReviewContext";
import { useAuthContext } from "../../Context/AuthContext";
import ProductReviewCard from "../../components/Reviews/ProductReviewCard";

const Product = () => {
    const { id } = useParams();
    const { reviews, loading, fetchReviewsByProduct } = useReviewContext();
    const { user } = useAuthContext();

    const [foodData, setFoodData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        rating: 0,
        numberOfReviews: 0,
        currentPrice: 0,
        pastPrice: 0,
        category: '',
        tags: [],
        customOrder: false,
        isAvailable: true
    });

    // Fetch food details
    useEffect(() => {
        const fetchFood = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/foods/${id}`);
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                const data = await res.json();
                setFoodData(data);
                fetchReviewsByProduct(data._id);
            } catch (error) {
                console.error('Error fetching food:', error);
            }
        };
        fetchFood();
    }, [id]);

    if (!foodData || !foodData.name) {
        return <div className="text-center text-[var(--color-ink-soft)] text-xl py-20">Product not found.</div>;
    }

    // Function to generate star rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else if (i - 0.5 === rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-400" />);
            }
        }
        return stars;
    };

    // console.log(reviews);

    return (
        <div className="container-page py-14">
            <div className="grid md:grid-cols-2 gap-14">
                <div className="bg-[var(--color-paper-soft)] rounded-3xl flex items-center justify-center p-10">
                    <img
                        src={new URL(`../../assets/foods/${foodData.imageUrl}.png`, import.meta.url).href}
                        alt={foodData.name}
                        className="w-full max-w-sm object-contain"
                    />
                </div>

                <div className="space-y-5">
                    <h1 className="text-3xl md:text-4xl font-medium text-[var(--color-ink)]">{foodData.name}</h1>
                    <div className="flex items-center gap-1"><ReviewStar rating={foodData.rating} /></div>
                    {foodData.tags?.length > 0 && (
                        <p className="text-sm text-[var(--color-ink-soft)]">{foodData.tags.join(" · ")}</p>
                    )}
                    <p className="text-[var(--color-ink-soft)] leading-relaxed">{foodData.description}</p>
                    <p className="text-2xl font-semibold text-[var(--color-accent)]">
                        ${foodData.currentPrice || "0"}{" "}
                        {foodData.pastPrice ? (
                            <span className="text-[var(--color-ink-soft)] line-through text-base font-normal ml-2">
                                ${foodData.pastPrice}
                            </span>
                        ) : null}
                    </p>
                    <div className="flex flex-col gap-3 max-w-xs pt-2">
                        <CartButton food={foodData} />
                        <Link
                            to="/checkout"
                            className="w-full text-center border border-[var(--color-ink)] text-[var(--color-ink)] px-4 py-2.5 rounded-full font-medium hover:bg-[var(--color-ink)] hover:text-white transition-colors"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>

            <ProductReviewCard reviews={reviews} />
        </div>
    );
};

export default Product;
