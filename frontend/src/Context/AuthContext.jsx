import { createContext, useContext, useEffect, useReducer, useState } from "react";
import authReducer from "../Reducer/AuthReducer";
import { API_BASE_URL } from "../lib/api"

// Create context
const AuthContext = createContext();

// Get token from either localStorage or sessionStorage
const initialState = {
    token: localStorage.getItem("token") || sessionStorage.getItem("token"),
};

// AuthProvider Component
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [user, setUser] = useState(null); // 🧠 Store user info here

    // Store token based on "Remember Me"
    const storeTokenInLS = (serverToken, rememberMe) => {
        //This function saves the JWT/token in localStorage when the user logs in. This use this to persist login state across sessions.
        if (rememberMe) {
            localStorage.setItem("token", serverToken); // Save for 30 days
        } else {
            sessionStorage.setItem("token", serverToken); // Session only
        }

        // Update token in state
        dispatch({
            type: "SET_TOKEN",
            payload: serverToken
        });
    };

    // Logout: remove token from both storages
    const logOutUser = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        localStorage.removeItem("cart"); // 🔥 Clear cart on logout

        window.dispatchEvent(new Event("userLoggedOut")); // 📢 Notify other components (e.g., Cart.jsx)

        dispatch({
            type: "REMOVE_TOKEN"
        });
    };

    // Fetch user info
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) return;

            const res = await fetch(`${API_BASE_URL}/api/auth/account`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (res.ok && data.profileDetails) {
                setUser(data.profileDetails); // Set user info to context
            }
        } catch (err) {
            console.error("Failed to fetch user info", err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [state.token]); // Fetch when token changes

    // Boolean flag for login status
    const isLoggedIn = !!state.token;

    // Auth context value
    const value = {
        storeTokenInLS,
        logOutUser,
        isLoggedIn,
        user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access context
const useAuthContext = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };