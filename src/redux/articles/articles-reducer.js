import {

} from "./articles-action-types";
import {ARTICLES, AUTHORED_ARTICLES, SUBSCRIBED_ARTICLES, TRENDING_ARTICLES} from "./articles-data";

const INITIAL_STATE = {
    articles: ARTICLES,
    trending: TRENDING_ARTICLES,
    authoredArticles: AUTHORED_ARTICLES,
    subscribedArticles: SUBSCRIBED_ARTICLES,
    articleDetail: null,
    loading: false,
    error: null,
}

const articlesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){


        default:
            return state;
    }
}

export default articlesReducer;