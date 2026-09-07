import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuthContext();

    if (!isLoggedIn) {
        return <Navigate to="/sign_in" replace />;
    }

    return children;
};

export default ProtectedRoute;
