import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../../constants/constants";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../../redux/auth/auth-reducer";
import { getMyBookmarkIds } from "../../redux/bookmarks/bookmarks-reducer";
import { getMyLikedArticleIds } from "../../redux/likes/likes-reducer";
import { getMyFollowingIds } from "../../redux/follows/follows-reducer";

const ProtectedRoute = ({ children }) => {

    let token = localStorage.getItem(TOKEN_KEY);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            return navigate('/auth/login');
        }
        dispatch(getLoggedInUser({navigate, token}));
        dispatch(getMyBookmarkIds({ token }));
        dispatch(getMyLikedArticleIds({ token }));
        dispatch(getMyFollowingIds({ token }));
    }, [dispatch, navigate, token]);

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
