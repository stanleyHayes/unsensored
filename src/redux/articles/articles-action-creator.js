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
    UPDATE_ARTICLE_SUCCESS,
    GET_ARTICLES_BY_USER_REQUEST,
    GET_ARTICLES_BY_USER_SUCCESS,
    GET_ARTICLES_BY_USER_FAILURE, TOGGLE_ARTICLE_LIKE_FAILURE, TOGGLE_ARTICLE_LIKE_REQUEST, TOGGLE_ARTICLE_LIKE_SUCCESS
} from './articles-action-types';
import axios from 'axios';
import {DEVELOPMENT_BASE_URL, PRODUCTION_BASE_URL} from "../../constants/constants";

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
            url: `${PRODUCTION_BASE_URL}/articles`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart-data'
            },
            data: article
        }).then(response => {
            const {data} = response.data;
            dispatch(createArticleSuccess(data));
            history.push('/');
        }).catch(error => {
            dispatch(createArticleFailure(error.response.data.error));
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
            url: `${PRODUCTION_BASE_URL}/articles/${articleId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(getArticleSuccess(data));
            history.push(`/articles/${articleId}`);
        }).catch(error => {
            dispatch(getArticleFailure(error.response.data.error));
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
            url: `${PRODUCTION_BASE_URL}/articles/${articleId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: article
        }).then(response => {
            const {data} = response.data;
            dispatch(updateArticleSuccess(data));
            history.push(`/articles/${articleId}`);
        }).catch(error => {
            dispatch(updateArticleFailure(error.response.data.error));
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
            url: `${PRODUCTION_BASE_URL}/articles/${articleId}`,
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
            url: `${PRODUCTION_BASE_URL}/articles`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(getArticlesSuccess(data));
        }).catch(error => {
            console.log(error.response.data.error)
            dispatch(getArticlesFailure(error.response.data.error));
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
            url: `${PRODUCTION_BASE_URL}/articles/me`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(getAuthoredArticlesSuccess(data));
        }).catch(error => {
            dispatch(getAuthoredArticlesFailure(error.response.data.error));
        });
    }
}

const getArticlesByUserRequest = () => {
    return {
        type: GET_ARTICLES_BY_USER_REQUEST
    }
}

const getArticlesByUserSuccess = articles => {
    return {
        type: GET_ARTICLES_BY_USER_SUCCESS,
        payload: articles
    }
}

const getArticlesByUserFailure = error => {
    return {
        type: GET_ARTICLES_BY_USER_FAILURE,
        payload: error
    }
}

export const getArticlesByUser = (userId, token) => {
    return dispatch => {
        dispatch(getArticlesByUserRequest());
        axios({
            method: 'get',
            url: `${PRODUCTION_BASE_URL}/users/${userId}/articles`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const {data} = response.data;
            dispatch(getArticlesByUserSuccess(data));
        }).catch(error => {
            dispatch(getArticlesByUserFailure(error.response.data.error));
        });
    }
}



const toggleArticleLikeRequest = () => {
    return {
        type: TOGGLE_ARTICLE_LIKE_REQUEST
    }
}
const toggleArticleLikeSuccess = (like, action) => {
    return {
        type: TOGGLE_ARTICLE_LIKE_SUCCESS,
        payload: {like, action}
    }
}
const toggleArticleLikeFailure = error => {
    return {
        type: TOGGLE_ARTICLE_LIKE_FAILURE,
        payload: error
    }
}
export const toggleArticleLike = (article, token) => {
    return dispatch => {
        dispatch(toggleArticleLikeRequest());
        axios({
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`
            },
            url: `${DEVELOPMENT_BASE_URL}/likes`,
            data: {type: 'ARTICLE', article}
        }).then(response => {
            const {data, action} = response.data;
            dispatch(toggleArticleLikeSuccess(data, action));
        }).catch(error => {
            dispatch(toggleArticleLikeFailure(error.response.data.error));
        });
    }
}
