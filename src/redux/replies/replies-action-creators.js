import {
    CREATE_REPLY_FAILURE,
    CREATE_REPLY_REQUEST,
    CREATE_REPLY_SUCCESS,
    DELETE_REPLY_FAILURE,
    DELETE_REPLY_REQUEST,
    DELETE_REPLY_SUCCESS,
    GET_REPLIES_BY_COMMENT_FAILURE,
    GET_REPLIES_BY_COMMENT_REQUEST,
    GET_REPLIES_BY_COMMENT_SUCCESS,
    GET_REPLIES_BY_USER_FAILURE,
    GET_REPLIES_BY_USER_REQUEST,
    GET_REPLIES_BY_USER_SUCCESS, TOGGLE_REPLY_LIKE_FAILURE, TOGGLE_REPLY_LIKE_REQUEST, TOGGLE_REPLY_LIKE_SUCCESS,
    UPDATE_REPLY_FAILURE,
    UPDATE_REPLY_REQUEST,
    UPDATE_REPLY_SUCCESS

} from "./replies-action-types";

import axios from 'axios';
import {DEVELOPMENT_BASE_URL, PRODUCTION_BASE_URL} from "../../constants/constants";

const getRepliesByUserRequest = () => {
    return {
        type: GET_REPLIES_BY_USER_REQUEST
    }
}
const getRepliesByUserSuccess = replies => {
    return {
        type: GET_REPLIES_BY_USER_SUCCESS,
        payload: replies
    }
}
const getRepliesByUserFailure = error => {
    return {
        type: GET_REPLIES_BY_USER_FAILURE,
        payload: error
    }
}
export const getRepliesByUser = (userId, token) => {
    return dispatch => {
        dispatch(getRepliesByUserRequest());
        axios({
            method: 'get',
            url: `${PRODUCTION_BASE_URL}/users/${userId}/replies`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(getRepliesByUserSuccess(data));
        }).catch(error => {
            dispatch(getRepliesByUserFailure(error.response.data.error));
        });
    }
}


const getRepliesByCommentRequest = () => {
    return {
        type: GET_REPLIES_BY_COMMENT_REQUEST
    }
}
const getRepliesByCommentSuccess = replies => {
    return {
        type: GET_REPLIES_BY_COMMENT_SUCCESS,
        payload: replies
    }
}
const getRepliesByCommentFailure = error => {
    return {
        type: GET_REPLIES_BY_COMMENT_FAILURE,
        payload: error
    }
}
export const getRepliesByComment = (commentId, token) => {
    return dispatch => {
        dispatch(getRepliesByCommentRequest());
        axios({
            method: 'get',
            url: `${PRODUCTION_BASE_URL}/comments/${commentId}/replies`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(getRepliesByCommentSuccess(data));
        }).catch(error => {
            dispatch(getRepliesByCommentFailure(error.response.data.error));
        })
    }
}


const deleteReplyRequest = () => {
    return {
        type: DELETE_REPLY_REQUEST
    }
}
const deleteReplySuccess = reply => {
    return {
        type: DELETE_REPLY_SUCCESS,
        payload: reply
    }
}
const deleteReplyFailure = error => {
    return {
        type: DELETE_REPLY_FAILURE,
        payload: error
    }
}
export const deleteReply = (replyId, token) => {
    return dispatch => {
        dispatch(deleteReplyRequest());
        axios({
            method: 'delete',
            url: `${PRODUCTION_BASE_URL}/replies/${replyId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(deleteReplySuccess(data));
        }).catch(error => {
            dispatch(deleteReplyFailure(error.response.data.error));
        })
    }
}


const updateReplyRequest = () => {
    return {
        type: UPDATE_REPLY_REQUEST
    }
}
const updateReplySuccess = reply => {
    return {
        type: UPDATE_REPLY_SUCCESS,
        payload: reply
    }
}
const updateReplyFailure = error => {
    return {
        type: UPDATE_REPLY_FAILURE,
        payload: error
    }
}
export const updateReply = (replyId, reply, token) => {
    return dispatch => {
        dispatch(updateReplyRequest());
        axios({
            method: 'patch',
            url: `${PRODUCTION_BASE_URL}/replies/${replyId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: reply
        }).then(response => {
            const {data} = response.data;
            dispatch(updateReplySuccess(data));
        }).catch(error => {
            dispatch(updateReplyFailure(error.response.data.error));
        })
    }
}


const createReplyRequest = () => {
    return {
        type: CREATE_REPLY_REQUEST
    }
}
const createReplySuccess = comment => {
    return {
        type: CREATE_REPLY_SUCCESS,
        payload: comment
    }
}
const createReplyFailure = error => {
    return {
        type: CREATE_REPLY_FAILURE,
        payload: error
    }
}
export const createReply = (reply, token) => {
    return dispatch => {
        dispatch(createReplyRequest());
        axios({
            method: 'post',
            url: `${PRODUCTION_BASE_URL}/replies`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: reply
        }).then(response => {
            const {data} = response.data;
            dispatch(createReplySuccess(data));
        }).catch(error => {
            dispatch(createReplyFailure(error.response.data.error));
        });
    }
}

const toggleReplyLikeRequest = () => {
    return {
        type: TOGGLE_REPLY_LIKE_REQUEST
    }
}
const toggleReplyLikeSuccess = (like, action) => {
    return {
        type: TOGGLE_REPLY_LIKE_SUCCESS,
        payload: {like, action}
    }
}
const toggleReplyLikeFailure = error => {
    return {
        type: TOGGLE_REPLY_LIKE_FAILURE,
        payload: error
    }
}
export const toggleReplyLike = (reply, token) => {
    return dispatch => {
        dispatch(toggleReplyLikeRequest());
        axios({
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: `${PRODUCTION_BASE_URL}/likes`,
            data: {type: 'REPLY', reply}
        }).then(response => {
            const {data, action} = response.data;
            dispatch(toggleReplyLikeSuccess(data, action));
        }).catch(error => {
            dispatch(toggleReplyLikeFailure(error.response.data.error));
        });
    }
}
