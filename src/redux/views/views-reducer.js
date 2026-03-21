import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/constants";

// Async thunks
export const createArticleView = createAsyncThunk(
    'views/createArticleView',
    async ({articleId, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}/views`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {article: articleId}
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getViewsByArticle = createAsyncThunk(
    'views/getViewsByArticle',
    async ({articleId, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/articles/${articleId}/views`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {article: articleId}
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const viewsSlice = createSlice({
    name: 'views',
    initialState: {
        views: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // createArticleView
            .addCase(createArticleView.pending, (state) => {
                // no loading change in original
            })
            .addCase(createArticleView.fulfilled, (state, action) => {
                state.views.push(action.payload);
                state.loading = false;
            })
            .addCase(createArticleView.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // getViewsByArticle
            .addCase(getViewsByArticle.pending, (state) => {
                state.loading = true;
            })
            .addCase(getViewsByArticle.fulfilled, (state, action) => {
                state.views = action.payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(getViewsByArticle.rejected, (state, action) => {
                state.error = action.payload;
                state.views = [];
                state.loading = false;
            });
    }
});

export default viewsSlice.reducer;
