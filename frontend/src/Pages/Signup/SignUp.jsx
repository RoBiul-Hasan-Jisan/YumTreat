import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import apiF from "../../lib/api.js"; // ✅ Use centralized API helper

const SignUp = () => {
    const { storeTokenInLS } = useAuthContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        cPassword: "",
        role: "user",
    });

    const [error, setError] = useState(""); // For user-friendly error messages
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // if (formData.password !== formData.cPassword) {
        //     setError("Passwords do not match.");
        //     return;
        // }

        try {
            setLoading(true);
            const resData = await apiF.post("/api/auth/sign_up", formData); // ✅ Using apiF

            storeTokenInLS?.(resData.token); // Save token
            setFormData({ email: "", password: "", cPassword: "", role: "user" });
            navigate("/sign_in"); // Redirect after successful signup
        } catch (err) {
            // console.error(err);
            setError(err.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[var(--color-paper-soft)] p-4">
            <div className="w-full max-w-sm p-8 rounded-3xl bg-white border border-[var(--color-line)]">
                <NavLink to="/" className="block text-center font-[var(--font-display)] text-2xl mb-6">
                    Yum<span className="text-[var(--color-accent)]">Treat</span>
                </NavLink>
                <h2 className="text-xl font-medium text-center text-[var(--color-ink)] mb-6">Create an account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[var(--color-ink-soft)] mb-1.5">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInput}
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
                            value={formData.password}
                            onChange={handleInput}
                            required
                            placeholder="Enter your password"
                            className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="cPassword" className="block text-sm font-medium text-[var(--color-ink-soft)] mb-1.5">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="cPassword"
                            name="cPassword"
                            value={formData.cPassword}
                            onChange={handleInput}
                            required
                            placeholder="Confirm your password"
                            className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[var(--color-ink)] text-white py-3 rounded-full font-medium hover:bg-[var(--color-accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing Up…" : "Sign Up"}
                    </button>
                </form>

                <p className="text-sm text-center text-[var(--color-ink-soft)] mt-6">
                    Already have an account?{" "}
                    <NavLink to="/sign_in" className="text-[var(--color-accent)] font-medium hover:underline">
                        Sign in
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default SignUp;