import {
    GET_VIEWS_BY_ARTICLE_FAILURE,
    GET_VIEWS_BY_ARTICLE_SUCCESS,
    GET_VIEWS_BY_ARTICLE_REQUEST,
    CREATE_ARTICLE_VIEW_FAILURE,
    CREATE_ARTICLE_VIEW_SUCCESS,
    CREATE_ARTICLE_VIEW_REQUEST
} from "./views-action-types";

const INITIAL_STATE = {
    views: [],
    loading: false,
    error: null
}

const viewsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CREATE_ARTICLE_VIEW_REQUEST:
            return {
                ...state
            }
        case CREATE_ARTICLE_VIEW_SUCCESS:
            return {
                ...state,
                views: [...state.views, action.payload],
                loading: false
            }
        case CREATE_ARTICLE_VIEW_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case GET_VIEWS_BY_ARTICLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_VIEWS_BY_ARTICLE_SUCCESS:
            return {
                ...state,
                views: action.payload,
                error: null,
                loading: false
            }
        case GET_VIEWS_BY_ARTICLE_FAILURE:
            return {
                ...state,
                error: action.payload,
                views: [],
                loading: false
            }

        default:
            return state;
    }
}

export default viewsReducer;