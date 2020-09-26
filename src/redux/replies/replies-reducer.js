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
    switch (action.type) {


        default:
            return state;
    }
}

export default repliesReducer;