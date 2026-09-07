import { RiMenu2Fill, RiCloseLine } from 'react-icons/ri';

const Navbar = ({ sidebarOpen, setSidebarOpen, title }) => {
    return (
        <header className="bg-white shadow-sm z-10">
            {/* <div className="flex items-center justify-between p-4"> */}
            <button
                className="md:hidden text-gray-600 focus:outline-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? <RiCloseLine size={24} /> : <RiMenu2Fill size={24} />}
            </button>
            {/* <div className="w-8"></div> */}
            {/* </div> */}
        </header>
    );
};

export default Navbar;