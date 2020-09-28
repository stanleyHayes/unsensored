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


        default:
            return state;
    }
}

export default likesReducer;