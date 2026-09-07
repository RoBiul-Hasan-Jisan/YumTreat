import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaHome, FaChartLine, FaPlus, FaList, FaEnvelope, FaChair, FaGlobe, FaSignOutAlt } from 'react-icons/fa';
import { RiMenu2Fill, RiCloseLine } from 'react-icons/ri';
import Navbar from './Dash-components/Navbar';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [orders, setOrders] = useState([
        { id: 1, customer: 'John Doe', items: ['Chicken Burger x2', 'French Fries'], total: 24.98, status: 'pending' },
        { id: 2, customer: 'Jane Smith', items: ['Veg Pizza', 'Garlic Bread'], total: 18.50, status: 'pending' },
        { id: 3, customer: 'Mike Johnson', items: ['Steak Dinner', 'Red Wine'], total: 42.75, status: 'preparing' }
    ]);

    const handleAcceptOrder = (orderId) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: 'preparing' } : order
        ));
    };

    const handleReadyForDelivery = (orderId) => {
        setOrders(orders.filter(order => order.id !== orderId));
    };

    const getTitle = () => {
        const path = location.pathname;
        if (path.includes('add-foods')) return 'Add Food';
        if (path.includes('add-category')) return 'Orders';
        if (path.includes('edit-foods')) return 'Edit Foods';
        if (path.includes('order-info')) return 'Orders';
        if (path.includes('contact-log')) return 'Orders';
        if (path.includes('table-booking')) return 'Orders';
        if (path.includes('messages')) return 'Orders';
        return 'Dashboard';
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:static z-30 w-64 h-full bg-white shadow-md transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out`}
            >
                <div className="p-[11px] border-b">
                    <Link to="/home" className="text-3xl font-bold text-gray-800 flex items-center">
                        <FaUtensils className="text-[#c34c2e] mr-2" /> YumTreat
                    </Link>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link to="/admin-dashboard" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaHome className="mr-3" /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="add-foods" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaPlus className="mr-3" /> Add Food
                            </Link>
                        </li>
                        <li>
                            <Link to="add-category" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaPlus className="mr-3" /> Add Category
                            </Link>
                        </li>
                        <li>
                            <Link to="edit-foods" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaPlus className="mr-3" /> Edit Foods
                            </Link>
                        </li>
                        <li>
                            <Link to="order-info" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaList className="mr-3" /> Order Info
                            </Link>
                        </li>
                        <li>
                            <Link to="contact-logs" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaEnvelope className="mr-3" /> Contact Logs
                            </Link>
                        </li>
                        <li>
                            <Link to="table-bookings" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaChair className="mr-3" /> Table Booking
                            </Link>
                        </li>
                        <li>
                            <Link to="messages" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaEnvelope className="mr-3" /> Messages
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaGlobe className="mr-3" /> My Site
                            </Link>
                        </li>
                        <li>
                            <NavLink
                                to="/sign_out"
                                className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg"
                            >
                                <FaSignOutAlt className="mr-3" />Sign Out
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top navbar */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between p-4">
                        <button
                            className="md:hidden text-gray-600 focus:outline-none"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? <RiCloseLine size={24} /> : <RiMenu2Fill size={24} />}
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
                        <div className="w-8"></div> {/* Spacer for alignment */}
                    </div>
                </header>

                {/* Main content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* <Navbar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        title={getTitle()}
                    /> */}

                    {/* Main content area */}
                    <main className="flex-1 overflow-y-auto p-4">
                        {location.pathname === '/admin-dashboard' && (
                            <>

                            </>
                        )}
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;