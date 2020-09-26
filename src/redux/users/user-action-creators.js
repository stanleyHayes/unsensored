import axios from "axios";
import {DEVELOPMENT_BASE_URL, PRODUCTION_BASE_URL} from "../../constants/constants";
import {GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS} from "./user-action-types";

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
            url: `${DEVELOPMENT_BASE_URL}/users/${userId}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(getUserProfileSuccess(data));
        }).catch(error => {
            // dispatch(getUserProfileFailure(error.data.error.error));
        })
    }
}