import {
    TOGGLE_LIKE_FAILURE,
    TOGGLE_LIKE_SUCCESS,
    TOGGLE_LIKE_REQUEST,
    GET_LIKES_BY_USER_SUCCESS,
    GET_LIKES_BY_USER_REQUEST,
    GET_LIKES_BY_USER_FAILURE,
    GET_LIKES_BY_ARTICLE_SUCCESS,
    GET_LIKES_BY_ARTICLE_REQUEST,
    GET_LIKES_BY_ARTICLE_FAILURE
} from "./likes-action-types";

const INITIAL_STATE = {
    likes: [],
    loading: false,
    error: null
}

const likesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case TOGGLE_LIKE_REQUEST:
            return {
                ...state
            }
        case TOGGLE_LIKE_SUCCESS:
            return {
                ...state,
                likes: [...state.likes, action.payload]
            }
        case TOGGLE_LIKE_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        case GET_LIKES_BY_ARTICLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_LIKES_BY_ARTICLE_SUCCESS:
            return {
                ...state,
                likes: action.payload,
                error: null
            }
        case GET_LIKES_BY_ARTICLE_FAILURE:
            return {
                ...state,
                error: action.payload,
                likes: []
            }

        case GET_LIKES_BY_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_LIKES_BY_USER_SUCCESS:
            return {
                ...state,
                likes: action.payload,
                error: null
            }
        case GET_LIKES_BY_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                likes: []
            }
        default:
            return state;
    }
}

export default likesReducer;