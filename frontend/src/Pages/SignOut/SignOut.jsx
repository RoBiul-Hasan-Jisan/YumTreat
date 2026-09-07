import { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import { Navigate } from "react-router-dom";
import Loader from '../../components/Loader/Loader';

const SignOut = () => {
    const { logOutUser } = useAuthContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        logOutUser(); // Logs the user out
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []); // 👈 Only run once on mount

    if (loading) {
        return <Loader />;
    }

    return <Navigate to="/sign_in" />;
};

export default SignOut;
