import {
    CREATE_ARTICLE_VIEW_FAILURE,
    CREATE_ARTICLE_VIEW_REQUEST,
    CREATE_ARTICLE_VIEW_SUCCESS,
    GET_VIEWS_BY_ARTICLE_FAILURE,
    GET_VIEWS_BY_ARTICLE_REQUEST,
    GET_VIEWS_BY_ARTICLE_SUCCESS
} from "./views-action-types";

import axios from "axios";
import {DEVELOPMENT_BASE_URL, PRODUCTION_BASE_URL} from "../../constants/constants";

const createArticleViewRequest = () => {
    return {
        type: CREATE_ARTICLE_VIEW_REQUEST
    }
}
const createArticleViewSuccess = view => {
    return {
        type: CREATE_ARTICLE_VIEW_SUCCESS,
        payload: view
    }
}
const createArticleViewFailure = error => {
    return {
        type: CREATE_ARTICLE_VIEW_FAILURE,
        payload: error
    }
}
export const createArticleView = (articleId, token) => {
    return dispatch => {
        dispatch(createArticleViewRequest());
        axios({
            method: 'post',
            url: `${PRODUCTION_BASE_URL}/views`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {article: articleId}
        }).then(response => {
            const {data} = response.data;
            dispatch(createArticleViewSuccess(data));
        }).catch(error => {
            dispatch(createArticleViewFailure(error.response.data.error));
        });
    }
}

const getViewsByArticleRequest = () => {
    return {
        type: GET_VIEWS_BY_ARTICLE_REQUEST
    }
}
const getViewsByArticleSuccess = views => {
    return {
        type: GET_VIEWS_BY_ARTICLE_SUCCESS,
        payload: views
    }
}
const getViewsByArticleFailure = error => {
    return {
        type: GET_VIEWS_BY_ARTICLE_FAILURE,
        payload: error
    }
}
export const getViewsByArticle = (articleId, token) => {
    return dispatch => {
        dispatch(getViewsByArticleRequest());
        axios({
            method: 'get',
            url: `${PRODUCTION_BASE_URL}/articles/${articleId}/views`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {article: articleId}
        }).then(response => {
            const {data} = response.data;
            dispatch(getViewsByArticleSuccess(data));
        }).catch(error => {
            dispatch(getViewsByArticleFailure(error.response.data.error));
        });
    }
}