import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Root = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-[4.5rem]">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Root;
