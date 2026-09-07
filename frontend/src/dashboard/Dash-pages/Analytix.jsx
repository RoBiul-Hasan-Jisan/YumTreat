import { useOrderContext } from '../../Context/OrderContext'; // Adjust the import path as needed
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import CurrentOrder from '../Dash-components/CurrentOrder';

const Analytix = () => {
    const { totalOrders, totalSales, totalCompleted, totalCanceled, currentOrders } = useOrderContext();

    // Data for bar chart
    const barChartData = [
        { name: 'Total', value: totalOrders },
        { name: 'Completed', value: totalCompleted },
        { name: 'Canceled', value: totalCanceled },
        { name: 'Current', value: currentOrders },
    ];

    // Data for pie chart
    const pieChartData = [
        { name: 'Completed', value: totalCompleted },
        { name: 'Canceled', value: totalCanceled },
        { name: 'Pending', value: currentOrders },
    ];

    const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];

    // Summary cards data
    const summaryCards = [
        { title: 'Total Orders', value: totalOrders, color: 'bg-blue-100 text-blue-800' },
        { title: 'Total Sales', value: `$${totalSales.toLocaleString()}`, color: 'bg-green-100 text-green-800' },
        { title: 'Completed', value: totalCompleted, color: 'bg-purple-100 text-purple-800' },
        { title: 'Canceled', value: totalCanceled, color: 'bg-red-100 text-red-800' },
        { title: 'Pending', value: currentOrders, color: 'bg-yellow-100 text-yellow-800' },
        { title: 'Completion Rate', value: `${Math.round((totalCompleted / totalOrders) * 100)}%`, color: 'bg-teal-100 text-teal-800' },
    ];

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Order Analytics</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {summaryCards.map((card, index) => (
                    <div key={index} className={`p-4 rounded-lg shadow-sm ${card.color}`}>
                        <h3 className="text-sm font-medium">{card.title}</h3>
                        <p className="text-2xl font-bold">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Order Overview</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Order Distribution</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
                <h2 className="text-lg font-semibold mb-4">Current Pending Orders</h2>
                <CurrentOrder />
            </div>
        </div>
    );
};

export default Analytix;