import {
    GET_VIEWS_BY_ARTICLE_FAILURE,
    GET_VIEWS_BY_ARTICLE_SUCCESS,
    GET_VIEWS_BY_ARTICLE_REQUEST,
    CREATE_ARTICLE_VIEW_FAILURE,
    CREATE_ARTICLE_VIEW_SUCCESS,
    CREATE_ARTICLE_VIEW_REQUEST
} from "./views-action-types";

const INITIAL_STATE = {
    views: [],
    loading: false,
    error: null
}

const viewsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        default:
            return state;
    }
}

export default viewsReducer;