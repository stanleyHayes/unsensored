import {
    GET_REPLIES_BY_USER_FAILURE,
    GET_REPLIES_BY_USER_SUCCESS,
    GET_REPLIES_BY_USER_REQUEST,
    DELETE_REPLY_FAILURE,
    DELETE_REPLY_SUCCESS,
    DELETE_REPLY_REQUEST,
    UPDATE_REPLY_FAILURE,
    UPDATE_REPLY_SUCCESS,
    UPDATE_REPLY_REQUEST,
    CREATE_REPLY_REQUEST,
    CREATE_REPLY_SUCCESS,
    CREATE_REPLY_FAILURE,
    GET_REPLIES_BY_COMMENT_FAILURE,
    GET_REPLIES_BY_COMMENT_REQUEST,
    GET_REPLIES_BY_COMMENT_SUCCESS
} from "./replies-action-types";

const INITIAL_STATE = {
    replies: [],
    loading: false,
    error: null
}

const repliesReducer = (state = INITIAL_STATE, action) => {
    let updatedReplies = [];
    switch (action.type) {

        case CREATE_REPLY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_REPLY_SUCCESS:
            return {
                ...state,
                loading: false,
                replies: [...state.replies, action.payload],
                error: false
            }
        case CREATE_REPLY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_REPLIES_BY_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_REPLIES_BY_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                replies: action.payload,
                error: false
            }
        case GET_REPLIES_BY_COMMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                replies: []
            }

        case GET_REPLIES_BY_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_REPLIES_BY_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                replies: action.payload,
                error: false
            }
        case GET_REPLIES_BY_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                replies: []
            }

        case UPDATE_REPLY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_REPLY_SUCCESS:
            updatedReplies = state.replies.map(reply => {
                if(reply._id === action.payload._id){
                    return action.payload;
                }
                return reply;
            });

            return {
                ...state,
                loading: false,
                replies: [...updatedReplies]
            }
        case UPDATE_REPLY_FAILURE:
            return {
                ...state,
                loading: false
            }

        case DELETE_REPLY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_REPLY_SUCCESS:
            updatedReplies = state.replies.filter(reply => reply._id !== action.payload._id);
            return {
                ...state,
                loading: false,
                replies: [...updatedReplies]
            }
        case DELETE_REPLY_FAILURE:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}

export default repliesReducer;