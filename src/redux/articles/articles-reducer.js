import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/constants";
import { toggleArticleLike } from "../likes/likes-reducer";

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
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getArticle = createAsyncThunk(
    'articles/getArticle',
    async ({articleId, token}, {rejectWithValue}) => {
        try {
            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/articles/${articleId}`,
                headers,
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
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
            return rejectWithValue(error.response?.data?.message || error.message);
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
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getArticles = createAsyncThunk(
    'articles/getArticles',
    async ({token, page = 1, limit = 6, search}, {rejectWithValue}) => {
        try {
            const params = { page, limit };
            if (search) params.search = search;
            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            const response = await axios.get(`${BASE_URL}/articles`, {
                headers,
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
            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            const response = await axios.get(`${BASE_URL}/users/${userId}/articles`, {
                headers,
                params: { page, limit },
            });
            return { data: response.data.data, pagination: response.data.pagination };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getTrendingArticles = createAsyncThunk(
    'articles/getTrendingArticles',
    async ({token, page = 1, limit = 6}, {rejectWithValue}) => {
        try {
            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            const response = await axios.get(`${BASE_URL}/articles/trending`, {
                headers,
                params: { page, limit },
            });
            return { data: response.data.data, pagination: response.data.pagination };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getTags = createAsyncThunk(
    'articles/getTags',
    async ({token, limit = 20} = {}, {rejectWithValue}) => {
        try {
            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            const response = await axios.get(`${BASE_URL}/articles/tags`, {
                headers,
                params: { limit },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
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
        trendingArticles: [],
        trendingPagination: null,
        trendingLoading: false,
        tags: [],
        tagsLoading: false,
    },
    reducers: {
        socketArticleCreated: (state, action) => {
            const exists = state.articles.some(a => a._id === action.payload._id);
            if (!exists) {
                state.articles.unshift(action.payload);
            }
        },
        socketArticleUpdated: (state, action) => {
            state.articles = state.articles.map(a =>
                a._id === action.payload._id ? { ...a, ...action.payload } : a
            );
            if (state.articleDetail?._id === action.payload._id) {
                state.articleDetail = { ...state.articleDetail, ...action.payload };
            }
        },
        socketArticleDeleted: (state, action) => {
            state.articles = state.articles.filter(a => a._id !== action.payload._id);
            if (state.articleDetail?._id === action.payload._id) {
                state.articleDetail = null;
            }
        },
    },
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
            // getTrendingArticles
            .addCase(getTrendingArticles.pending, (state) => {
                state.trendingLoading = true;
            })
            .addCase(getTrendingArticles.fulfilled, (state, action) => {
                state.trendingLoading = false;
                state.trendingArticles = action.payload.data;
                state.trendingPagination = action.payload.pagination;
            })
            .addCase(getTrendingArticles.rejected, (state) => {
                state.trendingLoading = false;
            })
            // getTags
            .addCase(getTags.pending, (state) => {
                state.tagsLoading = true;
            })
            .addCase(getTags.fulfilled, (state, action) => {
                state.tagsLoading = false;
                state.tags = action.payload;
            })
            .addCase(getTags.rejected, (state) => {
                state.tagsLoading = false;
            })
            // toggleArticleLike — update likeCount on articles
            .addCase(toggleArticleLike.fulfilled, (state, action) => {
                const { data, action: likeAction } = action.payload;
                if (!data) return;
                const articleId = typeof data.article === 'object' ? data.article._id || data.article : data.article;
                const delta = likeAction === 'ADD' ? 1 : -1;
                state.articles = state.articles.map(a => {
                    if (a._id === articleId) {
                        return { ...a, likeCount: Math.max((a.likeCount || 0) + delta, 0) };
                    }
                    return a;
                });
                if (state.articleDetail?._id === articleId) {
                    state.articleDetail = {
                        ...state.articleDetail,
                        likeCount: Math.max((state.articleDetail.likeCount || 0) + delta, 0),
                    };
                }
            });
    }
});

export const {
    socketArticleCreated,
    socketArticleUpdated,
    socketArticleDeleted,
} = articlesSlice.actions;

export default articlesSlice.reducer;
