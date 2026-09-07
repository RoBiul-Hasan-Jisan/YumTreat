import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/api";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/categories`);
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, loading, selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = () => useContext(CategoryContext);