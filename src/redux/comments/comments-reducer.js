import {
    GET_COMMENTS_BY_ARTICLE_SUCCESS,
    GET_COMMENTS_BY_ARTICLE_FAILURE,
    GET_COMMENTS_BY_ARTICLE_REQUEST,
    DELETE_COMMENT_FAILURE,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_REQUEST,
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAILURE,
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
    GET_COMMENTS_BY_USER_FAILURE,
    GET_COMMENTS_BY_USER_SUCCESS,
    GET_COMMENTS_BY_USER_REQUEST
} from "./comments-action-types";

const INITIAL_STATE = {
    comments: [],
    loading: false,
    error: null,
    commentDetail: null
}

const commentsReducer = (state = INITIAL_STATE, action) => {
    let updatedComments = [];
    switch (action.type) {

        case CREATE_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, action.payload],
                error: false
            }
        case CREATE_COMMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_COMMENTS_BY_ARTICLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_COMMENTS_BY_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: action.payload,
                error: false
            }
        case GET_COMMENTS_BY_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                comments: []
            }

        case GET_COMMENTS_BY_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_COMMENTS_BY_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: action.payload,
                error: false
            }
        case GET_COMMENTS_BY_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                comments: []
            }

        case UPDATE_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_COMMENT_SUCCESS:
            updatedComments = state.comments.map(comment => {
                if(comment._id === action.payload._id){
                    return action.payload;
                }
                return comment;
            });

            return {
                ...state,
                loading: false,
                comments: [...updatedComments]
            }
        case UPDATE_COMMENT_FAILURE:
            return {
                ...state,
                loading: false
            }

        case DELETE_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_COMMENT_SUCCESS:
            updatedComments = state.comments.filter(comment => comment._id !== action.payload._id);
            return {
                ...state,
                loading: false,
                comments: [...updatedComments]
            }
        case DELETE_COMMENT_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default commentsReducer;