import {
    CREATE_COMMENT_FAILURE,
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    GET_COMMENTS_BY_ARTICLE_FAILURE,
    GET_COMMENTS_BY_ARTICLE_REQUEST,
    GET_COMMENTS_BY_ARTICLE_SUCCESS,
    GET_COMMENTS_BY_USER_FAILURE,
    GET_COMMENTS_BY_USER_REQUEST,
    GET_COMMENTS_BY_USER_SUCCESS,
    UPDATE_COMMENT_FAILURE,
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS
} from "./comments-action-types";

import axios from 'axios';
import {DEVELOPMENT_BASE_URL, PRODUCTION_BASE_URL} from "../../constants/constants";

const getCommentsByUserRequest = () => {
    return {
        type: GET_COMMENTS_BY_USER_REQUEST
    }
}
const getCommentsByUserSuccess = comments => {
    return {
        type: GET_COMMENTS_BY_USER_SUCCESS,
        payload: comments
    }
}
const getCommentsByUserFailure = error => {
    return {
        type: GET_COMMENTS_BY_USER_FAILURE,
        payload: error
    }
}
export const getCommentsByUser = (userId, token) => {
    return dispatch => {
        dispatch(getCommentsByUserRequest());
        axios({
            method: 'get',
            url: `${PRODUCTION_BASE_URL}/users/${userId}/comments`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(getCommentsByUserSuccess(data));
        }).catch(error => {
            dispatch(getCommentsByUserFailure(error.response.data.error));
        })
    }
}


const getCommentsByArticleRequest = () => {
    return {
        type: GET_COMMENTS_BY_ARTICLE_REQUEST
    }
}
const getCommentsByArticleSuccess = comments => {
    return {
        type: GET_COMMENTS_BY_ARTICLE_SUCCESS,
        payload: comments
    }
}
const getCommentsByArticleFailure = error => {
    return {
        type: GET_COMMENTS_BY_ARTICLE_FAILURE,
        payload: error
    }
}
export const getCommentsByArticle = (articleId, token) => {
    return dispatch => {
        dispatch(getCommentsByArticleRequest());
        axios({
            method: 'get',
            url: `${PRODUCTION_BASE_URL}/articles/${articleId}/comments`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(getCommentsByArticleSuccess(data));
        }).catch(error => {
            dispatch(getCommentsByArticleFailure(error.response.data.error));
        })
    }
}


const deleteCommentRequest = () => {
    return {
        type: DELETE_COMMENT_REQUEST
    }
}
const deleteCommentSuccess = comments => {
    return {
        type: DELETE_COMMENT_SUCCESS,
        payload: comments
    }
}
const deleteCommentFailure = error => {
    return {
        type: DELETE_COMMENT_FAILURE,
        payload: error
    }
}
export const deleteComment = (commentId, token) => {
    return dispatch => {
        dispatch(deleteCommentRequest());
        axios({
            method: 'delete',
            url: `${PRODUCTION_BASE_URL}/comments/${commentId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(deleteCommentSuccess(data));
        }).catch(error => {
            dispatch(deleteCommentFailure(error.response.data.error));
        })
    }
}


const updateCommentRequest = () => {
    return {
        type: UPDATE_COMMENT_REQUEST
    }
}
const updateCommentSuccess = comment => {
    return {
        type: UPDATE_COMMENT_SUCCESS,
        payload: comment
    }
}
const updateCommentFailure = error => {
    return {
        type: UPDATE_COMMENT_FAILURE,
        payload: error
    }
}
export const updateComment = (commentId, comment, token) => {
    return dispatch => {
        dispatch(updateCommentRequest());
        axios({
            method: 'patch',
            url: `${PRODUCTION_BASE_URL}/comments/${commentId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: comment
        }).then(response => {
            const {data} = response.data;
            dispatch(updateCommentSuccess(data));
        }).catch(error => {
            dispatch(updateCommentFailure(error.response.data.error));
        })
    }
}


const createCommentRequest = () => {
    return {
        type: CREATE_COMMENT_REQUEST
    }
}
const createCommentSuccess = comment => {
    return {
        type: CREATE_COMMENT_SUCCESS,
        payload: comment
    }
}
const createCommentFailure = error => {
    return {
        type: CREATE_COMMENT_FAILURE,
        payload: error
    }
}
export const createComment = (comment, token) => {
    return dispatch => {
        dispatch(createCommentRequest());
        axios({
            method: 'post',
            url: `${PRODUCTION_BASE_URL}/comments`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: comment
        }).then(response => {
            const {data} = response.data;
            dispatch(createCommentSuccess(data));
        }).catch(error => {
            console.log(error)
            dispatch(createCommentFailure(error.response.data.error));
        })
    }
}