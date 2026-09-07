import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Cart = ({ cartOpen, setCartOpen }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart and initialize quantities
    const loadCart = () => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const filteredCart = storedCart
            .filter(item => item.isAvailable !== false)
            .map(item => ({
                ...item,
                quantity: item.quantity || 1 // default to 1 if undefined
            }));
        setCartItems(filteredCart);
    };

    useEffect(() => {
        loadCart();

        const handleLogout = () => setCartItems([]);
        const handleCartUpdate = () => loadCart();

        window.addEventListener("userLoggedOut", handleLogout);
        window.addEventListener("cartUpdated", handleCartUpdate);

        return () => {
            window.removeEventListener("userLoggedOut", handleLogout);
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, []);

    const updateQuantity = (id, newQuantity) => {
        const updatedCart = cartItems.map(item =>
            item._id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item._id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    if (!cartOpen) return null;

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const vatRate = 0.02;
    const withVat = total * (1 + vatRate);
    const includeVAT = withVat - total;

    return (
        <section className="fixed top-[4.5rem] left-0 right-0 bg-white border-t border-[var(--color-line)] p-6 shadow-xl z-40 overflow-auto max-h-[80vh]">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-line)]">
                <h3 className="text-xl font-medium text-[var(--color-ink)]">Your Cart</h3>
                <button onClick={() => setCartOpen(false)} className="text-[var(--color-ink-soft)] hover:text-[var(--color-accent)]">
                    <FaTimes />
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
                {cartItems.length > 0 ? cartItems.map((item) => (
                    <div key={item._id} className="flex items-center bg-[var(--color-paper-soft)] p-4 rounded-2xl relative">
                        <FaTimes
                            className="absolute top-3 right-3 text-sm cursor-pointer text-[var(--color-ink-soft)] hover:text-[var(--color-accent)]"
                            onClick={() => removeItem(item._id)}
                        />
                        <img src={new URL(`../../assets/foods/${item.image}.png`, import.meta.url).href} alt={item.name} className="h-16 w-16 object-contain" />
                        <div className="ml-4 w-full">
                            <h3 className="text-base font-medium text-[var(--color-ink)]">{item.name}</h3>
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-[var(--color-accent)] font-semibold">${item.price}</p>
                                <div className="flex items-center rounded-full border border-[var(--color-line)] overflow-hidden">
                                    <button
                                        className="px-2.5 py-1 bg-white hover:bg-[var(--color-line)] transition-colors"
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                    >-</button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                                        className="w-10 text-center bg-white text-sm"
                                    />
                                    <button
                                        className="px-2.5 py-1 bg-white hover:bg-[var(--color-line)] transition-colors"
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                    >+</button>
                                </div>
                            </div>
                            <p className="text-xs mt-1 text-[var(--color-ink-soft)]">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                )) : <p className="text-center text-[var(--color-ink-soft)] col-span-full py-6">Your cart is empty</p>}
            </div>
            <div className="text-center py-5 border-t border-[var(--color-line)]">
                <h3 className="text-lg font-medium text-[var(--color-ink)]">
                    Total + VAT 2%: <span className="text-[var(--color-accent)] font-semibold">
                        ${total.toFixed(2)} + ${includeVAT.toFixed(2)}
                    </span> = ${withVat.toFixed(2)}
                </h3>
                <NavLink
                    to="/checkout"
                    className="bg-[var(--color-ink)] text-white px-7 py-3 rounded-full inline-block mt-4 hover:bg-[var(--color-accent)] transition-colors text-sm font-medium"
                    onClick={() => setCartOpen(false)}
                >
                    Proceed to Checkout
                </NavLink>
            </div>
        </section>
    );
};

export default Cart;