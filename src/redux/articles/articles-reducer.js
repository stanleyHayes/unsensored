import {
    CREATE_ARTICLE_FAILURE,
    CREATE_ARTICLE_REQUEST,
    CREATE_ARTICLE_SUCCESS,
    GET_ARTICLE_DETAIL,
    GET_ARTICLE_FAILURE,
    GET_ARTICLE_REQUEST,
    GET_ARTICLE_SUCCESS, GET_ARTICLES_FAILURE, GET_ARTICLES_REQUEST, GET_ARTICLES_SUCCESS

} from "./articles-action-types";
import {ARTICLES, AUTHORED_ARTICLES, SUBSCRIBED_ARTICLES, TRENDING_ARTICLES} from "./articles-data";

const INITIAL_STATE = {
    articles: [],
    trending: [],
    authoredArticles: [],
    subscribedArticles: [],
    articleDetail: null,
    loading: false,
    error: null,
}

const articlesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

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

        case GET_ARTICLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                articleDetail: action.payload,
                error: null
            }
        case GET_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_ARTICLES_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_ARTICLES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                articles: action.payload
            }

        case GET_ARTICLES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                articles: []
            }
        default:
            return state;
    }
}

export default articlesReducer;