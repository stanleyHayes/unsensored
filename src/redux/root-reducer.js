import {combineReducers} from "redux";
import authReducer from "./auth/auth-reducer";
import articlesReducer from "./articles/articles-reducer";
import userReducer from "./users/user-reducer";
import commentsReducer from "./comments/comments-reducer";
import likesReducer from "./likes/likes-reducer";
import viewsReducer from "./views/views-reducer";
import repliesReducer from "./replies/replies-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    articles: articlesReducer,
    users: userReducer,
    comments: commentsReducer,
    likes: likesReducer,
    views: viewsReducer,
    replies: repliesReducer
});

export default rootReducer;