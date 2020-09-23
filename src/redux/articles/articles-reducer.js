import {
    CREATE_ARTICLE_FAILURE,
    CREATE_ARTICLE_REQUEST, CREATE_ARTICLE_SUCCESS

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

        case CREATE_ARTICLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                authoredArticles: [...state.authoredArticles, action.payload],
                articles: [...state.articles, action.payload],
                error: null
            }
        case CREATE_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default articlesReducer;