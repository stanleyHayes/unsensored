import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export const toggleArticleLike = createAsyncThunk(
    'likes/toggleArticleLike',
    async ({ article, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/likes`, { type: 'ARTICLE', article }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return { data: response.data.data, action: response.data.action };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getMyLikedArticleIds = createAsyncThunk(
    'likes/getMyLikedArticleIds',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/likes/me/ids`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getLikesByUser = createAsyncThunk(
    'likes/getLikesByUser',
    async ({ userId, token }, { rejectWithValue }) => {
        try {
            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            const response = await axios.get(`${BASE_URL}/users/${userId}/likes`, {
                headers,
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getLikesByArticle = createAsyncThunk(
    'likes/getLikesByArticle',
    async ({ articleId, token }, { rejectWithValue }) => {
        try {
            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            const response = await axios.get(`${BASE_URL}/articles/${articleId}/likes`, {
                headers,
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const likesSlice = createSlice({
    name: 'likes',
    initialState: {
        likes: [],
        likedArticleIds: [],
        loading: false,
        error: null,
    },
    reducers: {
        socketArticleLikeToggled: (state, action) => {
            const { like, action: likeAction } = action.payload;
            if (!like?.article) return;
            if (likeAction === 'ADD') {
                if (!state.likedArticleIds.includes(like.article)) {
                    state.likedArticleIds.push(like.article);
                }
            } else {
                state.likedArticleIds = state.likedArticleIds.filter(id => id !== like.article);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // toggleArticleLike — exact same shape as toggleBookmark
            .addCase(toggleArticleLike.fulfilled, (state, action) => {
                const { data, action: likeAction } = action.payload;
                if (!data) return;
                if (likeAction === 'ADD') {
                    state.likedArticleIds.push(data.article);
                } else {
                    state.likedArticleIds = state.likedArticleIds.filter((id) => id !== data.article);
                }
            })
            // getMyLikedArticleIds — exact same shape as getMyBookmarkIds
            .addCase(getMyLikedArticleIds.fulfilled, (state, action) => {
                state.likedArticleIds = action.payload;
            })
            // getLikesByArticle
            .addCase(getLikesByArticle.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLikesByArticle.fulfilled, (state, action) => {
                state.likes = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getLikesByArticle.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.likes = [];
            })
            // getLikesByUser
            .addCase(getLikesByUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLikesByUser.fulfilled, (state, action) => {
                state.likes = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getLikesByUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.likes = [];
            });
    },
});

export const { socketArticleLikeToggled } = likesSlice.actions;

export default likesSlice.reducer;
