import axios from "axios";
import {DEVELOPMENT_BASE_URL, PRODUCTION_BASE_URL} from "../../constants/constants";
import {
    GET_USER_PROFILE_FAILURE,
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_REQUEST,
    GET_USES_SUCCESS
} from "./user-action-types";

const getUserProfileRequest = () => {
    return {
        type: GET_USER_PROFILE_REQUEST
    }
}
const getUserProfileSuccess = user => {
    return {
        type: GET_USER_PROFILE_SUCCESS,
        payload: user
    }
}
const getUserProfileFailure = error => {
    return {
        type: GET_USER_PROFILE_FAILURE,
        payload: error
    }
}
export const getUserProfile = (userId, token) => {
    return dispatch => {
        dispatch(getUserProfileRequest());
        axios({
            url: `${PRODUCTION_BASE_URL}/users/${userId}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(getUserProfileSuccess(data));
        }).catch(error => {
            dispatch(getUserProfileFailure(error.response.data.error));
        })
    }
}

const getUsersRequest = () => {
    return {
        type: GET_USERS_REQUEST
    }
}
const getUsersSuccess = users => {
    return {
        type: GET_USES_SUCCESS,
        payload: users
    }
}
const getUsersFailure = error => {
    return {
        type: GET_USERS_FAILURE,
        payload: error
    }
}
export const getUsers = ( token) => {
    return dispatch => {
        dispatch(getUsersRequest());
        axios({
            url: `${PRODUCTION_BASE_URL}/users`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(getUsersSuccess(data));
        }).catch(error => {
            dispatch(getUsersFailure(error.response.data.error));
        })
    }
}