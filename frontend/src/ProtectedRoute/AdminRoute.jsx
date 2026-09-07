// src/ProtectedRoute/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";

const AdminRoute = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    // console.log("Admin token:", token);

    if (!token) return <Navigate to="/sign_in" />;

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode token
        // console.log(payload.user.userRole);
        if (payload.role === 'admin') {
            return <Dashboard />;
        } else {
            return <Navigate to="/unauthorized" />;
        }
    } catch (err) {
        console.error(err);
        return <Navigate to="/sign_in" />;
    }
};

export default AdminRoute;
