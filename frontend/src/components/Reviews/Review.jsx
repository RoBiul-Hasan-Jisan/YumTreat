import React, { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import UserReviewCard from '../Reviews/UserReviewCard';
import { useReviewContext } from "../../Context/ReviewContext";

const Review = ({ orderID, userID, productID, orderCompleteDate, isComplete }) => {
    const [showForm, setShowForm] = useState(false);
    const { reviews, loading, fetchAllReviews } = useReviewContext();

    useEffect(() => {
        fetchAllReviews();
    }, []);

    // if (loading) return <p>Loading reviews...</p>;

    // Check if a review exists for the given orderID
    const existingReview = reviews.find(
        (review) => review.orderID === orderID && review.productID === productID
    );

    return (
        <div className="mt-4">
            {existingReview ? (
                // If review exists, show the review card
                <UserReviewCard userID={userID} productID={productID} orderID={orderID} />
            ) : (
                <>
                    {!showForm ? (
                        <button
                            className="bg-[var(--color-ink)] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--color-accent)] transition-colors"
                            onClick={() => setShowForm(true)}
                        >
                            Post Review
                        </button>
                    ) : (
                        <ReviewForm
                            orderID={orderID}
                            userID={userID}
                            productID={productID}
                            orderCompleteDate={orderCompleteDate}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Review;
