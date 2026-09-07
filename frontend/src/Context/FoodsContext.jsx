import React, { createContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../lib/api';

export const FoodsContext = createContext();

const FoodsProvider = ({ children }) => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/foods`);
                const data = await res.json();
                setFoods(data);
            } catch (error) {
                console.error('Error fetching foods:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    return (
        <FoodsContext.Provider value={{ foods, setFoods, loading }}>
            {children}
        </FoodsContext.Provider>
    );
};

export default FoodsProvider;
