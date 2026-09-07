import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../lib/api";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");

    // 🔹 Fetch reviews by userID
    const fetchReviewsByUser = async (userID) => {
        setLoading(true);
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        try {
            const res = await axios.get(`${API_BASE_URL}/api/reviews/user/${userID}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReviews(res.data);
        } catch (error) {
            console.error("Error fetching user reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Fetch reviews by productID
    const fetchReviewsByProduct = async (productID) => {
        setLoading(true);
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        try {
            const res = await axios.get(`${API_BASE_URL}/api/reviews/product/${productID}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReviews(res.data);
        } catch (error) {
            console.error("Error fetching product reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Fetch all reviews (admin use)
    const fetchAllReviews = async () => {
        setLoading(true);
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        try {
            const res = await axios.get(`${API_BASE_URL}/api/reviews/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReviews(res.data);
        } catch (error) {
            console.error("Error fetching all reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Add a new review
    const addReview = async (reviewData) => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        try {
            const res = await axios.post(`${API_BASE_URL}/api/reviews/`, reviewData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReviews((prev) => [res.data, ...prev]);
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    return (
        <ReviewContext.Provider
            value={{
                reviews,
                loading,
                fetchReviewsByUser,
                fetchReviewsByProduct,
                fetchAllReviews,
                addReview,
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
};

export const useReviewContext = () => useContext(ReviewContext);