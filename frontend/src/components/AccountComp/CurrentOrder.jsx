import React, { useState, useEffect } from "react";
import { useAuthContext } from '../../Context/AuthContext';
import { useOrderContext } from "../../Context/OrderContext";
import OrderedItem from "../../components/Orders/OrderedItem";
import OrderBillTime from "../../components/Orders/OrderBillTime";
import Loader from "../../components/Loader/Loader";
import apiF from "../../lib/api";

const CurrentOrder = () => {
    const { orders, refetchOrders } = useOrderContext();
    const { user } = useAuthContext();

    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [confirmedOrders, setConfirmedOrders] = useState([]);

    useEffect(() => {
        if (orders.length > 0) {
            setDeliveredOrders(orders.filter(order => order.status === "delivered"));
        }
    }, [orders]);

    // Order Cancel - Using apiF.patch
    const cancelOrder = async (orderId) => {
        try {
            const data = await apiF.patch(`/api/orders/cancel/${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
                }
            });

            alert('Order cancelled successfully!');
            refetchOrders(); // Refresh orders after cancellation
        } catch (err) {
            // console.error(err);
            alert('Error cancelling order');
        }
    };

    // Mark as Complete - Using apiF.patch
    const markAsComplete = async (orderId) => {
        try {
            const data = await apiF.patch(`/api/orders/complete/${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
                }
            });

            refetchOrders(); // Refetch orders to update the state
            setConfirmedOrders((prev) => [...prev, orderId]); // Add the completed order to confirmedOrders
        } catch (err) {
            console.error("Error:", err);
            alert(err.message || "Something went wrong while marking the order as complete.");
        }
    };

    if (!user || !orders) return <Loader />;

    return (
        <ul className="space-y-4">
            {[...orders]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .filter((order) => !order.isComplete && (order.status === "preparing" || order.status === "ready" || order.status === "delivered"))
                .map(order => (
                    <li key={order._id} className="p-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper-soft)]">
                        <div>
                            <OrderBillTime
                                orderTime={order.createdAt}
                                payed={order.payed}
                                orderID={order._id}
                            />
                        </div>
                        {user && order.products.map((product, index) => (
                            <React.Fragment key={product.product_id + index}>
                                <OrderedItem
                                    productID={product.product_id}
                                    quantity={product.quantity}
                                />
                            </React.Fragment>
                        ))}

                        <div className="flex items-center justify-between gap-4 text-sm text-[var(--color-ink-soft)] mt-2">
                            <h3>Status: <span className="text-[var(--color-ink)] font-medium">{order.status}</span></h3>
                            <p>Note: {order.note}</p>
                        </div>

                        {order.status === "delivered" && !order.isComplete && (
                            <div className="mt-3 text-center">
                                <p className="mb-2 text-sm text-[var(--color-ink-soft)]">Have you received this order?</p>
                                <button
                                    onClick={() => markAsComplete(order._id)}
                                    className="bg-[var(--color-ink)] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--color-accent)] transition-colors"
                                >
                                    Yes, I received it
                                </button>
                            </div>
                        )}
                        {(order.status === 'preparing' || order.status === 'pending') && !order.isComplete && (
                            <button
                                onClick={() => cancelOrder(order._id)}
                                className="px-4 py-2 border border-red-400 text-red-500 rounded-full text-sm font-medium hover:bg-red-500 hover:text-white transition-colors mt-2"
                            >
                                Cancel Order
                            </button>
                        )}

                        {order.isComplete && order.status !== "cancel" && (
                            <div className="text-green-700 font-medium text-center mt-3 text-sm">
                                <div className="flex items-center justify-evenly">
                                    <p>✅ Order marked as complete</p>
                                    <p className="pt-1 text-xs text-[var(--color-ink-soft)]">
                                        {new Date(order.updatedAt).toLocaleString('en-US', {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
        </ul>
    )
}

export default CurrentOrder;