import {
    GET_LIKES_BY_ARTICLE_FAILURE,
    GET_LIKES_BY_ARTICLE_REQUEST,
    GET_LIKES_BY_ARTICLE_SUCCESS,
    GET_LIKES_BY_USER_FAILURE,
    GET_LIKES_BY_USER_REQUEST,
    GET_LIKES_BY_USER_SUCCESS,
    TOGGLE_LIKE_FAILURE,
    TOGGLE_LIKE_REQUEST,
    TOGGLE_LIKE_SUCCESS
} from "./likes-action-types";

import axios from "axios";
import {DEVELOPMENT_BASE_URL, PRODUCTION_BASE_URL} from "../../constants/constants";

const toggleLikeRequest = () => {
    return {
        type: TOGGLE_LIKE_REQUEST
    }
}
const toggleLikeSuccess = like => {
    return {
        type: TOGGLE_LIKE_SUCCESS,
        payload: like
    }
}
const toggleLikeFailure = error => {
    return {
        type: TOGGLE_LIKE_FAILURE,
        payload: error
    }
}
export const toggleLike = (like, token) => {
    return dispatch => {
        dispatch(toggleLikeRequest());
        axios({
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: `${DEVELOPMENT_BASE_URL}/likes`,
            data: like
        }).then(response => {
            const {data} = response.data;
            dispatch(toggleLikeSuccess(data));
        }).catch(error => {
            dispatch(toggleLikeFailure(error.response.data.error));
        });
    }
}

const getLikesByUserRequest = () => {
    return {
        type: GET_LIKES_BY_USER_REQUEST
    }
}
const getLikesByUserSuccess = likes => {
    return {
        type: GET_LIKES_BY_USER_SUCCESS,
        payload: likes
    }
}
const getLikesByUserFailure = error => {
    return {
        type: GET_LIKES_BY_USER_FAILURE,
        payload: error
    }
}
export const getLikesByUser = (userId, token) => {
    console.log('get likes by user')
    return dispatch => {
        dispatch(getLikesByUserRequest());
        axios({
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: `${DEVELOPMENT_BASE_URL}/users/${userId}/likes`
        }).then(response => {
            const {data} = response.data;
            console.log(data)
            dispatch(getLikesByUserSuccess(data));
        }).catch(error => {
            dispatch(getLikesByUserFailure(error.response.data.error));
        });
    }
}

const getLikesByArticleRequest = () => {
    return {
        type: GET_LIKES_BY_ARTICLE_REQUEST
    }
}
const getLikesByArticleSuccess = likes => {
    return {
        type: GET_LIKES_BY_ARTICLE_SUCCESS,
        payload: likes
    }
}
const getLikesByArticleFailure = error => {
    return {
        type: GET_LIKES_BY_ARTICLE_FAILURE,
        payload: error
    }
}
export const getLikesByArticle = (articleId, token) => {
    console.log('create likes by article')
    return dispatch => {
        dispatch(getLikesByArticleRequest());
        axios({
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: `${DEVELOPMENT_BASE_URL}/articles/${articleId}/likes`
        }).then(response => {
            const {data} = response.data;
            dispatch(getLikesByArticleSuccess(data));
        }).catch(error => {
            dispatch(getLikesByArticleFailure(error.response.data.error));
        });
    }
}