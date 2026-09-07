import React, { useState } from "react";

const ReviewForm = ({ orderID, userID, productID, orderCompleteDate }) => {
    const [review, setReview] = useState({ rating: 0, feedback: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            orderID,
            userID,
            productID,
            rating: review.rating,
            feedback: review.feedback,
            orderCompleteDate: orderCompleteDate
        };

        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) return;
            const res = await fetch("http://localhost:5000/api/reviews/add-review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newReview)
            });

            const data = await res.json();

            if (res.ok) {
                alert("✅ Review submitted!");
                setReview({ rating: 0, feedback: "" });
            } else {
                alert("❌ Failed to submit review: " + data.error);
            }
        } catch (err) {
            console.error("Error submitting review:", err);
            alert("An error occurred while submitting your review.");
        }
        // console.log(newReview);
    };
    // console.log(review);

    return (
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-[var(--color-line)] mt-3">
            <input
                type="number"
                className="w-full p-2.5 rounded-xl border border-[var(--color-line)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                placeholder="Rating (1-5)"
                value={review.rating}
                onChange={(e) => setReview({ ...review, rating: e.target.value })}
                min="1"
                max="5"
                required
            />
            <textarea
                className="w-full p-2.5 rounded-xl border border-[var(--color-line)] mt-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                placeholder="Short feedback"
                value={review.feedback}
                onChange={(e) => setReview({ ...review, feedback: e.target.value })}
                required
            />
            <button className="mt-4 px-4 py-2 bg-[var(--color-ink)] text-white rounded-full text-sm font-medium hover:bg-[var(--color-accent)] transition-colors" type="submit">
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;