import {
    CREATE_ARTICLE_FAILURE,
    CREATE_ARTICLE_REQUEST,
    CREATE_ARTICLE_SUCCESS,
    GET_ARTICLE_REQUEST,
    GET_ARTICLE_SUCCESS,
    GET_ARTICLES_FAILURE,
    GET_ARTICLES_REQUEST,
    GET_ARTICLES_SUCCESS,
    GET_ARTICLE_FAILURE,
    DELETE_ARTICLE_FAILURE,
    DELETE_ARTICLE_REQUEST,
    DELETE_ARTICLE_SUCCESS,
    GET_AUTHORED_ARTICLES_FAILURE,
    GET_AUTHORED_ARTICLES_REQUEST,
    GET_AUTHORED_ARTICLES_SUCCESS,
    UPDATE_ARTICLE_FAILURE,
    UPDATE_ARTICLE_REQUEST,
    UPDATE_ARTICLE_SUCCESS
} from './articles-action-types';
import axios from 'axios';
import {DEVELOPMENT_BASE_URL} from "../../constants/constants";

const createArticleRequest = () => {
    return {
        type: CREATE_ARTICLE_REQUEST
    }
}

const createArticleSuccess = article => {
    return {
        type: CREATE_ARTICLE_SUCCESS,
        payload: article
    }
}

const createArticleFailure = error => {
    return {
        type: CREATE_ARTICLE_FAILURE,
        payload: error
    }
}

export const createArticle = (article, token, history) => {
    return dispatch => {
        dispatch(createArticleRequest());
        axios({
            method: 'post',
            url: `${DEVELOPMENT_BASE_URL}/articles`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart-data'
            },
            data: article
        }).then(response => {
            const {data: article} = response.data;
            dispatch(createArticleSuccess(article));
            history.push('/');
        }).catch(error => {
            dispatch(createArticleFailure(error.data.error.error));
        });
    }
}

const getArticleRequest = () => {
    return {
        type: GET_ARTICLE_REQUEST
    }
}

const getArticleSuccess = article => {
    return {
        type: GET_ARTICLE_SUCCESS,
        payload: article
    }
}

const getArticleFailure = error => {
    return {
        type: GET_ARTICLE_FAILURE,
        payload: error
    }
}

export const getArticle = (articleId, token, history) => {
    return dispatch => {
        dispatch(getArticleRequest());
        axios({
            method: 'get',
            url: `${DEVELOPMENT_BASE_URL}/articles/${articleId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data: article} = response.data;
            dispatch(getArticleSuccess(article));
            history.push(`/articles/${articleId}`);
        }).catch(error => {
            dispatch(getArticleFailure(error.data.error.error));
        });
    }
}

const updateArticleRequest = () => {
    return {
        type: UPDATE_ARTICLE_REQUEST
    }
}

const updateArticleSuccess = article => {
    return {
        type: UPDATE_ARTICLE_SUCCESS,
        payload: article
    }
}

const updateArticleFailure = error => {
    return {
        type: UPDATE_ARTICLE_FAILURE,
        payload: error
    }
}

export const updateArticle = (articleId, article, token, history) => {
    return dispatch => {
        dispatch(updateArticleRequest());
        axios({
            method: 'patch',
            url: `${DEVELOPMENT_BASE_URL}/articles/${articleId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: article
        }).then(response => {
            const {data: article} = response.data;
            dispatch(updateArticleSuccess(article));
            history.push(`/articles/${articleId}`);
        }).catch(error => {
            dispatch(updateArticleFailure(error.data.error.error));
        });
    }
}

const deleteArticleRequest = () => {
    return {
        type: DELETE_ARTICLE_REQUEST
    }
}

const deleteArticleSuccess = article => {
    return {
        type: DELETE_ARTICLE_SUCCESS,
        payload: article
    }
}

const deleteArticleFailure = error => {
    return {
        type: DELETE_ARTICLE_FAILURE,
        payload: error
    }
}

export const deleteArticle = (articleId, token, history) => {
    return dispatch => {
        dispatch(deleteArticleRequest());
        axios({
            method: 'delete',
            url: `${DEVELOPMENT_BASE_URL}/articles/${articleId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data: article} = response.data;
            dispatch(deleteArticleSuccess(article));
            history.push(`/articles/${articleId}`);
        }).catch(error => {
            dispatch(deleteArticleFailure(error.data.error.error));
        });
    }
}

const getArticlesRequest = () => {
    return {
        type: GET_ARTICLES_REQUEST
    }
}

const getArticlesSuccess = articles => {
    return {
        type: GET_ARTICLES_SUCCESS,
        payload: articles
    }
}

const getArticlesFailure = error => {
    return {
        type: GET_ARTICLES_FAILURE,
        payload: error
    }
}

export const getArticles = (token, query) => {
    return dispatch => {
        dispatch(getArticlesRequest());
        axios({
            method: 'get',
            url: `${DEVELOPMENT_BASE_URL}/articles?${query}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data: articles} = response.data;
            dispatch(getArticlesSuccess(articles));
        }).catch(error => {
            dispatch(getArticlesFailure(error.data.error.error));
        });
    }
}

const getAuthoredArticlesRequest = () => {
    return {
        type: GET_AUTHORED_ARTICLES_REQUEST
    }
}

const getAuthoredArticlesSuccess = articles => {
    return {
        type: GET_AUTHORED_ARTICLES_SUCCESS,
        payload: articles
    }
}

const getAuthoredArticlesFailure = error => {
    return {
        type: GET_AUTHORED_ARTICLES_FAILURE,
        payload: error
    }
}

export const getAuthoredArticles = (token) => {
    return dispatch => {
        dispatch(getAuthoredArticlesRequest());
        axios({
            method: 'get',
            url: `${DEVELOPMENT_BASE_URL}/articles/me`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data: articles} = response.data;
            dispatch(getAuthoredArticlesSuccess(articles));
        }).catch(error => {
            dispatch(getAuthoredArticlesFailure(error.data.error.error));
        });
    }
}
