import React, { useEffect } from "react";
import { useReviewContext } from "../../Context/ReviewContext";
import ReviewStar from "./ReviewStar";

const UserReviewCard = ({ userID, productID, orderID }) => {
    const { reviews, loading, fetchReviewsByUser } = useReviewContext();

    useEffect(() => {
        if (userID) {
            fetchReviewsByUser(userID);
        }
    }, [userID]);

    if (loading) return <p>Loading reviews...</p>;
    if (!reviews.length) return <p>No reviews yet.</p>;

    return (
        <div className="p-5 bg-white rounded-2xl border border-[var(--color-line)] mt-3 mx-auto">
            <h3 className="text-[var(--color-accent)] font-medium mb-3">Your Reviews</h3>
            <div className="space-y-3">
                {reviews
                    .filter((review) => review.productID === productID && review.orderID===orderID)
                    .map((review, index) => (
                        <div key={index} className="p-3 bg-[var(--color-paper-soft)] rounded-xl">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <ReviewStar rating={review.rating} />
                                <p className="text-[var(--color-ink-soft)] mt-1 text-sm italic">
                                    "{review.feedback}"
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default UserReviewCard;
