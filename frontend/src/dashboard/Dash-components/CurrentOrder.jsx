import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderedItem from '../../components/Orders/OrderedItem';

const CurrentOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/orders/admin");
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/orders/update-status/${orderId}`,
                { status: newStatus }
            );
            fetchOrders();
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update order status.");
        }
    };

    if (loading) return <div className="p-4 text-center text-gray-500">Loading orders...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

    return (
        <div className="p-4 max-w-6xl mx-auto">
            {orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No orders found</div>
            ) : (
                <div className="grid gap-3">
                    {[...orders]
                        .filter(order => !order.isComplete && order.status === "preparing" || order.status === "ready") // Only show incomplete orders
                        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Sort by most recent update
                        .map(order => (
                            <div key={order._id} className="border rounded-lg overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-gray-50">
                                    {/* Order Header */}
                                    <div className="space-y-1">
                                        <p className="text-sm">
                                            <span className="font-medium">Order ID:</span> {order._id.slice(-6).toUpperCase()}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-medium">Customer:</span> {order.user_id.slice(-6)}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Delivery Info */}
                                    <div className="space-y-1">
                                        <p className="text-sm">
                                            <span className="font-medium">Address:</span> {`${order.address.slice(0, 20)}...`}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-medium">City:</span> {order.city}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-medium">Phone:</span> {order.phone}
                                        </p>
                                    </div>

                                    {/* Payment & Status */}
                                    <div className="space-y-1">
                                        <p className="text-sm">
                                            <span className="font-medium">Payment:</span> {order.paymentMethod}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-medium">Status:</span>
                                            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'cancel' ? 'bg-red-100 text-red-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-medium">Bill:</span> ${order.payed}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <p className="text-sm">
                                        <span className="font-medium">Note:</span> {order.note || "None"}
                                    </p>
                                </div>

                                {/* Ordered Items */}
                                <div className="p-3 border-t">
                                    {order.products.map((product, index) => (
                                        <OrderedItem
                                            key={product.product_id + index}
                                            productID={product.product_id}
                                            quantity={product.quantity}
                                        />
                                    ))}
                                </div>

                                {/* Status Actions */}
                                <div className="p-3 bg-gray-50 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                    <div className="flex flex-wrap gap-2">
                                        {["preparing", "ready", "delivered", "cancel"].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusChange(order._id, status)}
                                                className={`px-2 py-1 text-xs rounded-md ${order.isComplete
                                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                    : order.status === status
                                                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                                    }`}
                                                disabled={order.isComplete || order.status === status || order.status === "cancel"}
                                            >
                                                Mark as {status}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="text-sm mt-2 md:mt-0 font-medium">
                                        <span className="mr-1">Order Complete:</span>
                                        <span className={order.isComplete ? "text-green-600" : "text-gray-500"}>
                                            {order.isComplete ? (
                                                <>
                                                    {order.status === "cancel" ? (
                                                        <span>Canceled</span>
                                                    ) : (
                                                        <span>✅ Yes</span>
                                                    )}
                                                    <p className="pt-1 text-sm">
                                                        {new Date(order.updatedAt).toLocaleString('en-US', {
                                                            weekday: 'short',
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </>
                                            ) : (
                                                "No"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default CurrentOrder;