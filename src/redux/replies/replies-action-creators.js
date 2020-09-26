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
    GET_REPLIES_BY_USER_SUCCESS,
    UPDATE_REPLY_FAILURE,
    UPDATE_REPLY_REQUEST,
    UPDATE_REPLY_SUCCESS

} from "./replies-action-types";

import axios from 'axios';
import {DEVELOPMENT_BASE_URL} from "../../constants/constants";

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
            url: `${DEVELOPMENT_BASE_URL}/users/:${userId}/replies`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(getRepliesByUserSuccess(data));
        }).catch(e => {
            const {error} = e.data.error;
            if (error) {
                dispatch(getRepliesByUserFailure(error));
            }
        })
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
            url: `${DEVELOPMENT_BASE_URL}/comments/:${commentId}/replies`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(getRepliesByCommentSuccess(data));
        }).catch(e => {
            const {error} = e.data.error;
            if (error) {
                dispatch(getRepliesByCommentFailure(error));
            }
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
            url: `${DEVELOPMENT_BASE_URL}/replies/${replyId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(deleteReplySuccess(data));
        }).catch(e => {
            const {error} = e.data.error;
            if (error) {
                dispatch(deleteReplyFailure(error));
            }
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
            url: `${DEVELOPMENT_BASE_URL}/replies/:${replyId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: reply
        }).then(response => {
            const {data} = response.data;
            dispatch(updateReplySuccess(data));
        }).catch(e => {
            const {error} = e.data.error;
            if (error) {
                dispatch(updateReplyFailure(error));
            }
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
export const createReply = (comment, token) => {
    return dispatch => {
        dispatch(createReplyRequest());
        axios({
            method: 'post',
            url: `${DEVELOPMENT_BASE_URL}/replies`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: comment
        }).then(response => {
            const {data} = response.data;
            dispatch(createReplySuccess(data));
        }).catch(e => {
            const {error} = e.data.error;
            if (error) {
                dispatch(createReplyFailure(error));
            }
        })
    }
}