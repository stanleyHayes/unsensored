import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/constants";

// Async thunks
export const toggleLike = createAsyncThunk(
    'likes/toggleLike',
    async ({like, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                url: `${BASE_URL}/likes`,
                data: like
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const getLikesByUser = createAsyncThunk(
    'likes/getLikesByUser',
    async ({userId, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                url: `${BASE_URL}/users/${userId}/likes`
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const getLikesByArticle = createAsyncThunk(
    'likes/getLikesByArticle',
    async ({articleId, token}, {rejectWithValue}) => {
        console.log('create likes by article');
        try {
            const response = await axios({
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                url: `${BASE_URL}/articles/${articleId}/likes`
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

const likesSlice = createSlice({
    name: 'likes',
    initialState: {
        likes: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // toggleLike
            .addCase(toggleLike.pending, (state) => {
                // no loading change in original
            })
            .addCase(toggleLike.fulfilled, (state, action) => {
                state.likes.push(action.payload);
            })
            .addCase(toggleLike.rejected, (state, action) => {
                state.error = action.payload;
            })
            // getLikesByArticle
            .addCase(getLikesByArticle.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLikesByArticle.fulfilled, (state, action) => {
                state.likes = action.payload;
                state.error = null;
            })
            .addCase(getLikesByArticle.rejected, (state, action) => {
                state.error = action.payload;
                state.likes = [];
            })
            // getLikesByUser
            .addCase(getLikesByUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLikesByUser.fulfilled, (state, action) => {
                state.likes = action.payload;
                state.error = null;
            })
            .addCase(getLikesByUser.rejected, (state, action) => {
                state.error = action.payload;
                state.likes = [];
            });
    }
});

export default likesSlice.reducer;
