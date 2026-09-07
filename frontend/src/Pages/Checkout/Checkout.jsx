import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        note: "",
        payed: "",
        paymentMethod: "card",
    });

    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuthContext();


    const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    const vat = subtotal * 0.02;
    const total = subtotal + vat;

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
        if (storedCart.length === 0) navigate("/"); // redirect if cart is empty
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) {
            console.error("Token not found in localStorage or sessionStorage");
            return;
        }

        const products = cartItems.map(item => ({
            product_id: item._id,
            quantity: item.quantity || 1
        }));

        try {
            const response = await fetch("http://localhost:5000/api/orders/place", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    payed: total.toFixed(2),
                    user_id: user._id,
                    products
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Failed to place order", data.message);
            } else {
                localStorage.removeItem("cart");
                window.dispatchEvent(new Event("cartUpdated"));
                navigate("/thank-you");
            }

        } catch (error) {
            console.error("Order submission error:", error);
        }
    };

    // Optionally, redirect if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);
    // console.log(formData);

    const fieldClass =
        "w-full rounded-xl border border-[var(--color-line)] px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors";

    return (
        <div className="container-page py-14 grid md:grid-cols-2 gap-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-medium text-[var(--color-ink)] mb-2">Shipping Information</h2>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={fieldClass}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className={fieldClass}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className={fieldClass}
                />
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={fieldClass}
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={fieldClass}
                />
                <textarea
                    name="note"
                    placeholder="Any query or information or note"
                    value={formData.note}
                    onChange={handleInputChange}
                    className={fieldClass}
                ></textarea>
                <h2 className="text-lg font-medium text-[var(--color-ink)] mt-6">Payment Method</h2>
                <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className={fieldClass}
                >
                    <option value="card">Credit/Debit Card</option>
                    <option value="cash">Cash on Delivery</option>
                    <option value="bkash">Bkash</option>
                </select>
                <button
                    type="submit"
                    className="w-full bg-[var(--color-ink)] text-white py-3.5 rounded-full mt-4 font-medium hover:bg-[var(--color-accent)] transition-colors"
                >
                    Place Order
                </button>
            </form>

            <div className="bg-[var(--color-paper-soft)] p-8 rounded-3xl h-fit">
                <h2 className="text-2xl font-medium text-[var(--color-ink)] mb-4">Order Summary</h2>
                {cartItems.map(item => (
                    <div key={item._id} className="flex justify-between border-b border-[var(--color-line)] py-3 text-sm">
                        <span>{item.name} x {item.quantity || 1}</span>
                        <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                ))}
                <div className="mt-4 space-y-1.5 text-sm">
                    <div className="flex justify-between font-medium text-[var(--color-ink)]">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[var(--color-ink-soft)]">
                        <span>VAT (2%)</span>
                        <span>${vat.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-[var(--color-ink)] mt-3 pt-3 border-t border-[var(--color-line)]">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
