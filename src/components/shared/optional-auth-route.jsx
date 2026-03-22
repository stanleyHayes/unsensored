import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../../constants/constants";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../../redux/auth/auth-reducer";
import { getMyBookmarkIds } from "../../redux/bookmarks/bookmarks-reducer";
import { getMyLikedArticleIds } from "../../redux/likes/likes-reducer";
import { getMyFollowingIds } from "../../redux/follows/follows-reducer";

const OptionalAuthRoute = ({ children }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            dispatch(getLoggedInUser({ navigate, token }));
            dispatch(getMyBookmarkIds({ token }));
            dispatch(getMyLikedArticleIds({ token }));
            dispatch(getMyFollowingIds({ token }));
        }
    }, [dispatch, navigate, token]);

    return children;
};

export default OptionalAuthRoute;
