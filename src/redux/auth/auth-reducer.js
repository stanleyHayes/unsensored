import {
    GET_LOGGED_IN_USER_FAILURE,
    GET_LOGGED_IN_USER_REQUEST, GET_LOGGED_IN_USER_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS
} from "./auth-action-types";

const INITIAL_STATE = {
    currentUser: null,
    loading: false,
    error: null,
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){

        case SIGN_UP_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload.user,
                token: action.payload.token,
                error: null
            }

        case SIGN_UP_FAILURE:
            return {
                ...state,
                loading: false,
                currentUser: null,
                token: null,
                error: action.payload.error
            }

        case SIGN_IN_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload.user,
                token: action.payload.token,
                error: null
            }

        case SIGN_IN_FAILURE:
            return {
                ...state,
                loading: false,
                currentUser: null,
                token: null,
                error: action.payload.error
            }

        case GET_LOGGED_IN_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_LOGGED_IN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload.user,
                token: action.payload.token,
                error: null
            }

        case GET_LOGGED_IN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                currentUser: null,
                token: null,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default authReducer;