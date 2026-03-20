import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/constants";

// Async thunks
export const createArticle = createAsyncThunk(
    'articles/createArticle',
    async ({article, token, navigate}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}/articles`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart-data'
                },
                data: article
            });
            const {data} = response.data;
            navigate('/');
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const getArticle = createAsyncThunk(
    'articles/getArticle',
    async ({articleId, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/articles/${articleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const updateArticle = createAsyncThunk(
    'articles/updateArticle',
    async ({articleId, article, token, navigate}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'patch',
                url: `${BASE_URL}/articles/${articleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: article
            });
            const {data} = response.data;
            navigate(`/articles/${articleId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const deleteArticle = createAsyncThunk(
    'articles/deleteArticle',
    async ({articleId, token, navigate}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'delete',
                url: `${BASE_URL}/articles/${articleId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {data: article} = response.data;
            navigate(`/articles/${articleId}`);
            return article;
        } catch (error) {
            return rejectWithValue(error.data.error.error);
        }
    }
);

export const getArticles = createAsyncThunk(
    'articles/getArticles',
    async ({token, page = 1, limit = 6, search}, {rejectWithValue}) => {
        try {
            const params = { page, limit };
            if (search) params.search = search;
            const response = await axios.get(`${BASE_URL}/articles`, {
                headers: { Authorization: `Bearer ${token}` },
                params,
            });
            return { data: response.data.data, pagination: response.data.pagination };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getAuthoredArticles = createAsyncThunk(
    'articles/getAuthoredArticles',
    async ({token, page = 1, limit = 6}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASE_URL}/articles/me`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, limit },
            });
            return { data: response.data.data, pagination: response.data.pagination };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getArticlesByUser = createAsyncThunk(
    'articles/getArticlesByUser',
    async ({userId, token, page = 1, limit = 6}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${userId}/articles`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, limit },
            });
            return { data: response.data.data, pagination: response.data.pagination };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const toggleArticleLike = createAsyncThunk(
    'articles/toggleArticleLike',
    async ({article, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                url: `${BASE_URL}/likes`,
                data: {type: 'ARTICLE', article}
            });
            const {data, action} = response.data;
            return {like: data, action};
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        articles: [],
        articleDetail: null,
        pagination: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // createArticle
            .addCase(createArticle.pending, (state) => {
                state.loading = true;
            })
            .addCase(createArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.articles.push(action.payload);
                state.error = null;
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getArticle
            .addCase(getArticle.pending, (state) => {
                state.loading = true;
            })
            .addCase(getArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.articleDetail = action.payload;
                state.error = null;
            })
            .addCase(getArticle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // updateArticle
            .addCase(updateArticle.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = state.articles.map(article =>
                    article._id === action.payload._id ? {...action.payload} : article
                );
            })
            .addCase(updateArticle.rejected, (state) => {
                state.loading = false;
            })
            // deleteArticle
            .addCase(deleteArticle.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = state.articles.filter(article => article._id !== action.payload._id);
            })
            .addCase(deleteArticle.rejected, (state) => {
                state.loading = false;
            })
            // getArticles
            .addCase(getArticles.pending, (state) => {
                state.loading = true;
            })
            .addCase(getArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.articles = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getAuthoredArticles
            .addCase(getAuthoredArticles.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAuthoredArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.articles = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getAuthoredArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getArticlesByUser
            .addCase(getArticlesByUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getArticlesByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.articles = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getArticlesByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // toggleArticleLike
            .addCase(toggleArticleLike.pending, (state) => {
                state.loading = false;
            })
            .addCase(toggleArticleLike.fulfilled, (state, action) => {
                const {like, action: likeAction} = action.payload;
                if (likeAction === 'ADD') {
                    state.articles = state.articles.map(article => {
                        if (article._id === like.article) {
                            return {...article, likes: [...article.likes, like]};
                        }
                        return article;
                    });
                } else if (likeAction === 'REMOVE') {
                    state.articles = state.articles.map(article => {
                        if (article._id === like.article) {
                            console.log(article._id, like.article);
                            return {...article, likes: article.likes.filter(l => l._id !== like._id)};
                        }
                        return article;
                    });
                }
                state.loading = false;
            })
            .addCase(toggleArticleLike.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default articlesSlice.reducer;
