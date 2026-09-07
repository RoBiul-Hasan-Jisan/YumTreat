import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from '../../Context/AuthContext';
import { useOrderContext } from "../../Context/OrderContext";
import Loader from "../../components/Loader/Loader";
import CancelOrders from "../../components/AccountComp/CancelOrders";
import CurrentOrder from "../../components/AccountComp/CurrentOrder";
import OrderHistory from "../../components/AccountComp/OrderHistory";

const Account = () => {
    const { orders, refetchOrders } = useOrderContext();
    const { user } = useAuthContext();
    const [activeTab, setActiveTab] = useState("current");


    const [deliveredOrders, setDeliveredOrders] = useState([]);

    useEffect(() => {
        if (orders.length > 0) {
            setDeliveredOrders(orders.filter(order => order.status === "delivered"));
        }
    }, [orders]);

    if (!user || !orders) return <Loader />;

    return (
        <div className="container-page max-w-3xl py-14">
            <h1 className="text-3xl font-medium text-[var(--color-ink)] text-center mb-8">Your Account</h1>

            <div className="bg-white p-7 rounded-2xl border border-[var(--color-line)]">
                {user ? (
                    <div className="text-[var(--color-ink-soft)] space-y-1 text-sm">
                        <p><span className="text-[var(--color-ink)] font-medium">User ID:</span> {user._id}</p>
                        <p><span className="text-[var(--color-ink)] font-medium">Email:</span> {user.email}</p>
                    </div>
                ) : (
                    <p className="text-[var(--color-ink-soft)]">Loading user info…</p>
                )}
                <NavLink
                    to="/sign_out"
                    className="mt-5 px-4 py-2.5 border border-[var(--color-ink)] text-[var(--color-ink)] rounded-full block text-center text-sm font-medium hover:bg-[var(--color-ink)] hover:text-white transition-colors"
                >
                    Sign Out
                </NavLink>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[var(--color-line)] mt-6">
                <div className="flex gap-2 mb-2">
                    {[
                        { key: "current", label: "Current Orders" },
                        { key: "cancel", label: "Cancel Orders" },
                        { key: "history", label: "Order History" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab.key
                                ? "bg-[var(--color-ink)] text-white"
                                : "bg-[var(--color-paper-soft)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {user ? (
                    <div className="mt-6">
                        {activeTab === "current" && <CurrentOrder />}
                        {activeTab === "cancel" && <CancelOrders />}
                        {activeTab === "history" && <OrderHistory />}
                    </div>
                ) : (
                    <p className="text-[var(--color-ink-soft)]">Loading orders info…</p>
                )}
            </div>
        </div>
    );
};

export default Account;
