import { useOrderContext } from '../../Context/OrderContext';

const InfoCards = () => {
    const { totalOrders, totalSales, totalCompleted, totalCanceled, currentOrders } = useOrderContext();

    const stats = [
        {
            title: 'Total Orders',
            value: totalOrders ?? 0,
            color: 'bg-blue-100 text-blue-800'
        },
        {
            title: 'Total Sales',
            value: `$${(totalSales ?? 0).toFixed(2)}`,
            color: 'bg-green-100 text-green-800'
        },
        {
            title: 'Current Orders',
            value: currentOrders ?? 0,
            color: 'bg-purple-100 text-purple-800'
        },
        {
            title: 'Total Cancel(s)',
            value: totalCanceled ?? 0,
            color: 'bg-red-100 text-red-800'
        },
        {
            title: 'Total Complete(s)',
            value: totalCompleted ?? 0,
            color: 'bg-purple-100 text-purple-800'
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`p-6 rounded-lg shadow ${stat.color || 'bg-gray-100 text-gray-800'}`}
                >
                    <h3 className="text-lg font-medium">{stat.title}</h3>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
            ))}
        </div>
    );
};

export default InfoCards;