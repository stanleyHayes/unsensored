import {
    CREATE_ARTICLE_FAILURE,
    CREATE_ARTICLE_REQUEST,
    CREATE_ARTICLE_SUCCESS,
    GET_ARTICLE_FAILURE,
    GET_ARTICLE_REQUEST,
    GET_ARTICLE_SUCCESS,
    GET_ARTICLES_FAILURE,
    GET_ARTICLES_REQUEST,
    GET_ARTICLES_SUCCESS,
    GET_AUTHORED_ARTICLES_FAILURE,
    GET_AUTHORED_ARTICLES_REQUEST,
    GET_AUTHORED_ARTICLES_SUCCESS,
    UPDATE_ARTICLE_FAILURE,
    UPDATE_ARTICLE_SUCCESS,
    UPDATE_ARTICLE_REQUEST,
    DELETE_ARTICLE_FAILURE,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_REQUEST,
    GET_ARTICLES_BY_USER_REQUEST,
    GET_ARTICLES_BY_USER_SUCCESS,
    GET_ARTICLES_BY_USER_FAILURE,
    TOGGLE_ARTICLE_LIKE_FAILURE,
    TOGGLE_ARTICLE_LIKE_SUCCESS,
    TOGGLE_ARTICLE_LIKE_REQUEST

} from "./articles-action-types";

const INITIAL_STATE = {
    articles: [],
    articleDetail: null,
    loading: false,
    error: null,
}

const articlesReducer = (state = INITIAL_STATE, action) => {
    let updatedArticles = [];

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
                error: action.payload
            }

        case GET_AUTHORED_ARTICLES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_AUTHORED_ARTICLES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                articles: action.payload
            }
        case GET_AUTHORED_ARTICLES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case UPDATE_ARTICLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_ARTICLE_SUCCESS:
            updatedArticles = state.articles.map(article => {
                if (article._id === action.payload._id) {
                    return {...action.payload};
                }
                return article;
            });

            return {
                ...state,
                loading: false,
                articles: [...updatedArticles]
            }
        case UPDATE_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false
            }

        case DELETE_ARTICLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_ARTICLE_SUCCESS:
            updatedArticles = state.articles.filter(article => article._id !== action.payload._id);
            return {
                ...state,
                loading: false,
                articles: [...updatedArticles]
            }
        case DELETE_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false
            }

        case GET_ARTICLES_BY_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_ARTICLES_BY_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                articles: action.payload
            }
        case GET_ARTICLES_BY_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }


        case TOGGLE_ARTICLE_LIKE_REQUEST:
            return {
                ...state,
                loading: false
            }
        case TOGGLE_ARTICLE_LIKE_SUCCESS:

            switch (action.payload.action) {
                case 'ADD':
                    updatedArticles = state.articles.map(article => {
                        if (article._id === action.payload.like.article) {
                            article.likes = [...article.likes, action.payload.like];
                            return {...article};
                        }
                        return article;
                    });
                    break;
                case 'REMOVE':
                    updatedArticles = state.articles.map(article => {
                        if (article._id === action.payload.like.article) {
                            console.log(article._id, action.payload.like.article)
                            article.likes = article.likes.filter(like => like._id !== action.payload.like._id);
                            return {...article};
                        }
                        return article;
                    });
                    break;
                default:
                    return;
            }
            return {
                ...state,
                loading: false,
                articles: [...updatedArticles]
            }

        case TOGGLE_ARTICLE_LIKE_FAILURE:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}

export default articlesReducer;