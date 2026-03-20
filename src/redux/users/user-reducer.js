import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/constants";

export const getUserProfile = createAsyncThunk(
    'users/getUserProfile',
    async ({userId, token}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async ({token, page = 1, limit = 9, search, sortBy}, {rejectWithValue}) => {
        try {
            const params = { page, limit };
            if (search) params.search = search;
            if (sortBy) params.sortBy = sortBy;
            const response = await axios.get(`${BASE_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` },
                params,
            });
            return { data: response.data.data, pagination: response.data.pagination };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        loading: false,
        error: null,
        users: [],
        pagination: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => { state.loading = true; })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(getUsers.pending, (state) => { state.loading = true; })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.users = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.users = [];
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;
