import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export const toggleBookmark = createAsyncThunk(
    'bookmarks/toggleBookmark',
    async ({ article, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/bookmarks`, { article }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return { data: response.data.data, action: response.data.action };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const getMyBookmarks = createAsyncThunk(
    'bookmarks/getMyBookmarks',
    async ({ token, page = 1, limit = 6 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/bookmarks/me`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, limit },
            });
            return { data: response.data.data, pagination: response.data.pagination };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const getMyBookmarkIds = createAsyncThunk(
    'bookmarks/getMyBookmarkIds',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/bookmarks/me/ids`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const getBookmarksByArticle = createAsyncThunk(
    'bookmarks/getBookmarksByArticle',
    async ({ articleId, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/bookmarks/article/${articleId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState: {
        bookmarks: [],
        bookmarkIds: [],
        articleBookmarks: [],
        pagination: null,
        loading: false,
        error: null,
    },
    reducers: {
        socketBookmarkToggled: (state, action) => {
            const { bookmark, action: bookmarkAction } = action.payload;
            if (bookmarkAction === 'ADD') {
                if (!state.bookmarkIds.includes(bookmark.article)) {
                    state.bookmarkIds.push(bookmark.article);
                }
            } else {
                state.bookmarkIds = state.bookmarkIds.filter(id => id !== bookmark.article);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // toggleBookmark
            .addCase(toggleBookmark.fulfilled, (state, action) => {
                const { data, action: bookmarkAction } = action.payload;
                if (bookmarkAction === 'ADD') {
                    state.bookmarkIds.push(data.article);
                } else {
                    state.bookmarkIds = state.bookmarkIds.filter((id) => id !== data.article);
                }
            })
            // getMyBookmarks
            .addCase(getMyBookmarks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyBookmarks.fulfilled, (state, action) => {
                state.loading = false;
                state.bookmarks = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getMyBookmarks.rejected, (state) => {
                state.loading = false;
            })
            // getMyBookmarkIds
            .addCase(getMyBookmarkIds.fulfilled, (state, action) => {
                state.bookmarkIds = action.payload;
            })
            // getBookmarksByArticle
            .addCase(getBookmarksByArticle.fulfilled, (state, action) => {
                state.articleBookmarks = action.payload;
            });
    },
});

export const { socketBookmarkToggled } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
