import {
    GET_LOGGED_IN_USER_FAILURE,
    GET_LOGGED_IN_USER_REQUEST, GET_LOGGED_IN_USER_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS
} from "./auth-action-types";

import axios from "axios";
import {DEVELOPMENT_BASE_URL, PRODUCTION_BASE_URL, TOKEN_KEY} from "../../constants/constants";

export const signUpRequest = () => {
    return {
        type: SIGN_UP_REQUEST
    }
}
export const signUpSuccess = (user, token) => {
    return {
        type: SIGN_UP_SUCCESS,
        payload: {user, token}
    }
}
export const signUpError = (error) => {
    return {
        type: SIGN_UP_FAILURE,
        payload: {error}
    }
}
export const signUp = (history, user) => {
    return dispatch => {
        dispatch(signUpRequest());
        axios({
            method: 'post',
            url: `${PRODUCTION_BASE_URL}/auth/register`,
            data: {...user}
        }).then(response => {
            const {data, token} = response.data;
            dispatch(signUpSuccess(data, token));
            localStorage.setItem(TOKEN_KEY, token);
            history.push('/')
        }).catch(error => {
            dispatch(signUpError(error.response.data.error));
        });
    }
}

export const signInRequest = () => {
    return {
        type: SIGN_IN_REQUEST
    }
}
export const signInSuccess = (user, token) => {
    return {
        type: SIGN_IN_SUCCESS,
        payload: {user, token}
    }
}
export const signInError = (error) => {
    return {
        type: SIGN_IN_FAILURE,
        payload: {error}
    }
}
export const signIn = (history, user) => {
    return dispatch => {
        dispatch(signInRequest());
        axios({
            method: 'post',
            url: `${PRODUCTION_BASE_URL}/auth/login`,
            data: {...user}
        }).then(response => {
            const {data, token} = response.data;
            console.log(user, token);
            dispatch(signInSuccess(data, token));
            localStorage.setItem(TOKEN_KEY, token);
            history.push('/');
        }).catch(error => {
            dispatch(signInError(error.response.data.error));
        });
    }
}

export const getLoggedInUserRequest = () => {
    return {
        type: GET_LOGGED_IN_USER_REQUEST
    }
}
export const getLoggedInUserSuccess = (user, token) => {
    return {
        type: GET_LOGGED_IN_USER_SUCCESS,
        payload: {user, token}
    }
}
export const getLoggedInUserError = (error) => {
    return {
        type: GET_LOGGED_IN_USER_FAILURE,
        payload: {error}
    }
}
export const getLoggedInUser = (history, token) => {
    return dispatch => {
        dispatch(getLoggedInUserRequest());
        axios({
            method: 'get',
            url: `${PRODUCTION_BASE_URL}/auth/me`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data, token} = response.data;
            dispatch(getLoggedInUserSuccess(data, token));
            localStorage.setItem(TOKEN_KEY, token);
            history.push('/');
        }).catch(error => {
            dispatch(getLoggedInUserError(error.response.data.error));
            history.push('/auth/login');
        });
    }
}

const updateUserProfileRequest = () => {
    return {
        type: UPDATE_PROFILE_REQUEST
    }
}
const updateUserProfileSuccess = user => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload: user
    }
}
const updateUserProfileFailure = error => {
    return {
        type: UPDATE_PROFILE_REQUEST,
        payload: error
    }
}
export const updateUserProfile = (user, userId, token, history) => {
    return dispatch => {
        dispatch(updateUserProfileRequest());
        axios({
            url: `${PRODUCTION_BASE_URL}/auth/me`,
            method: 'patch',
            headers: {
                'Content-Type': 'multipart/data',
                Authorization: `Bearer ${token}`
            },
            data: user
        }).then(response => {
            const {data} = response.data;
            dispatch(updateUserProfileSuccess(data));
            history.push(`/profile/${userId}`)
        }).catch(error => {
            // dispatch(updateUserProfileFailure(error.data.error.error));
        })
    }
}