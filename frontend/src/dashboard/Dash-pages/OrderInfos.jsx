import OrderedItem from '../../components/Orders/OrderedItem';
import { useOrderContext } from '../../Context/OrderContext';

const OrderInfos = () => {
    const { aOrders } = useOrderContext();

    if (!aOrders || aOrders.length === 0) {
        return <div className="p-4 text-center">No order data available</div>;
    }

    // Format dates to be more readable
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    // Sort aOrders by updatedAt in descending order
    const sortedOrders = [...aOrders].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">All Orders</h1>

            {sortedOrders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                    {/* Order Header Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>
                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                                <p><span className="font-medium">Order ID:</span> {order._id}</p>
                                <p><span className="font-medium">Placed On:</span> {formatDate(order.createdAt)}</p>
                                <p><span className="font-medium">Completed On:</span> {formatDate(order.updatedAt)}</p>
                                <p><span className="font-medium">Status:</span>
                                    <span className={`ml-1 px-2 py-1 rounded text-xs ${order.isComplete ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-red-800'}`}>
                                        {order.isComplete ? 'Completed' : 'Cancel'}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-700">Payment</h2>
                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                                <p><span className="font-medium">Total:</span> ${order.payed}</p>
                                <p><span className="font-medium">Method:</span> {order.paymentMethod || 'N/A'}</p>
                                <p><span className="font-medium">User ID:</span> {order.userID || 'Guest'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Ordered Items */}
                    <div className="p-3 border-t">
                        {order.products.map((product, index) => (
                            <OrderedItem
                                key={product.product_id + index}
                                productID={product.product_id} quantity={product.quantity}
                            />
                        ))}
                    </div>

                    {/* Customer Info */}
                    <div className="border-t pt-4 mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Customer Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <p><span className="font-medium">Name:</span> {order.fullName}</p>
                                <p><span className="font-medium">Phone:</span> {order.phone || 'N/A'}</p>
                            </div>
                            <div>
                                <p><span className="font-medium">Address:</span> {order.address}</p>
                                <p><span className="font-medium">City:</span> {order.city}, {order.postalCode}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Notes */}
                    {order.note && (
                        <div className="border-t pt-4">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Order Notes</h2>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{order.note}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OrderInfos;