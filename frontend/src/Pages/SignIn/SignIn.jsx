import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import Loader from "../../components/Loader/Loader";
import apiF from "../../lib/api.js";

const SignIn = () => {
    const { storeTokenInLS } = useAuthContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [userlogIn, setUserLogIn] = useState({ email: "", password: "" });

    // 🔹 Handle input changes
    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUserLogIn((prev) => ({ ...prev, [name]: value }));
    };

    // 🔹 Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const resData = await apiF.post("/api/auth/sign_in", userlogIn);

            storeTokenInLS(resData.token, rememberMe);
            alert("✅ Log in successful!");

            // 🧭 Redirect based on role
            const role = resData?.user?.userRole;
            navigate(role === "admin" ? "/admin-dashboard" : "/");

        } catch (err) {
            console.error("Login failed:", err.message);
            alert(`❌ ${err.message || "Login failed!"}`);
        } finally {
            setLoading(false);
            setUserLogIn({ email: "", password: "" });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[var(--color-paper-soft)] px-4">
            {loading ? (
                <Loader />
            ) : (
                <div className="w-full max-w-sm p-8 rounded-3xl bg-white border border-[var(--color-line)]">
                    <NavLink to="/" className="block text-center font-[var(--font-display)] text-2xl mb-6">
                        Yum<span className="text-[var(--color-accent)]">Treat</span>
                    </NavLink>
                    <h2 className="text-xl font-medium text-center text-[var(--color-ink)] mb-6">Sign in to your account</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[var(--color-ink-soft)] mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userlogIn.email}
                                onChange={handleInputs}
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[var(--color-ink-soft)] mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={userlogIn.password}
                                onChange={handleInputs}
                                required
                                placeholder="Enter your password"
                                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-[var(--color-ink-soft)]">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="w-4 h-4 accent-[var(--color-accent)]"
                                />
                                Remember me
                            </label>
                            <NavLink to="/forgot-password" className="text-[var(--color-accent)] hover:underline">
                                Forgot password?
                            </NavLink>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[var(--color-ink)] text-white py-3 rounded-full font-medium hover:bg-[var(--color-accent)] transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-sm text-center text-[var(--color-ink-soft)] mt-6">
                        Don't have an account?{" "}
                        <NavLink to="/sign_up" className="text-[var(--color-accent)] font-medium hover:underline">
                            Create one
                        </NavLink>
                    </p>
                </div>
            )}
        </div>
    );
};

export default SignIn;