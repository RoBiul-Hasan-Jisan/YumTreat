import React, { useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";

const CartButton = ({ food }) => {
    const { isLoggedIn } = useAuthContext();
    const [showNotification, setShowNotification] = useState(false);

    const handleAddToCart = () => {
        if (!isLoggedIn || !food || !food._id) return;

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const alreadyExists = cart.some((item) => item._id === food._id);
        if (alreadyExists) return;

        const newItem = {
            _id: food._id,
            name: food.name,
            price: food.currentPrice,
            image: food.imageUrl,
            isAva: food.isAvailable,
            isCus: food.customOrder,
        };

        const updatedCart = [...cart, newItem];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));

        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    return (
        <div className="relative">
            <button
                onClick={handleAddToCart}
                disabled={!isLoggedIn}
                className={`px-4 py-2 rounded-full w-full text-sm font-medium text-white transition-colors ${isLoggedIn
                        ? "bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)]"
                        : "bg-[var(--color-ink-soft)]/40 cursor-not-allowed"
                    }`}
            >
                Add to Cart
            </button>

            {showNotification && (
                <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[var(--color-ink)] text-white text-xs rounded-full shadow-lg whitespace-nowrap">
                    Item added
                </div>
            )}
        </div>
    );
};

export default CartButton;
