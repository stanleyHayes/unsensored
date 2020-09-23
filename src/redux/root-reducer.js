import {combineReducers} from "redux";
import authReducer from "./auth/auth-reducer";
import articlesReducer from "./articles/articles-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    articles: articlesReducer
});

export default rootReducer;