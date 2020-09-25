import {GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_REQUEST} from "./user-action-types";

const INITIAL_STATE = {
    user: null,
    loading: false,
    error: null
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
        default:
            return state;
    }
}

export default userReducer;