import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../../constants/constants";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../../redux/auth/auth-reducer";

const ProtectedRoute = ({ children }) => {

    let token = localStorage.getItem(TOKEN_KEY);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            return navigate('/auth/login');
        }
        dispatch(getLoggedInUser({navigate, token}));
    }, [dispatch, navigate, token]);

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
