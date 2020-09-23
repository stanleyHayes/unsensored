import {CREATE_ARTICLE_FAILURE, CREATE_ARTICLE_REQUEST, CREATE_ARTICLE_SUCCESS} from './articles-action-types';
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