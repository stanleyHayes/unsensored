import {combineReducers} from "redux";
import authReducer from "./auth/auth-reducer";
import articlesReducer from "./articles/articles-reducer";
import userReducer from "./users/user-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    articles: articlesReducer,
    users: userReducer
});

export default rootReducer;