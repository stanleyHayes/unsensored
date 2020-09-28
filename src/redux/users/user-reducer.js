import {
    GET_USER_PROFILE_FAILURE,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_REQUEST,
    GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE
} from "./user-action-types";

const INITIAL_STATE = {
    user: null,
    loading: false,
    error: null,
    users: []
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){

        case GET_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload
            }

        case GET_USER_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload
            }

        case GET_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                users: action.payload
            }

        case GET_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;