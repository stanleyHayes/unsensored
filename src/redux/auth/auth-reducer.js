import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, TOKEN_KEY} from "../../constants/constants";

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({navigate, user}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, user);
            const {data, token} = response.data;
            localStorage.setItem(TOKEN_KEY, token);
            navigate('/');
            return {user: data, token};
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({navigate, user}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, user);
            const {data, token} = response.data;
            localStorage.setItem(TOKEN_KEY, token);
            navigate('/');
            return {user: data, token};
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getLoggedInUser = createAsyncThunk(
    'auth/getLoggedInUser',
    async ({navigate, token}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASE_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const {data, token: newToken} = response.data;
            localStorage.setItem(TOKEN_KEY, newToken);
            return {user: data, token: newToken};
        } catch (error) {
            navigate('/auth/login');
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async ({user, userId, token, navigate}, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`${BASE_URL}/auth/me`, user, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            const {data} = response.data;
            navigate(`/profile/${userId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.token = null;
            state.error = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signIn.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getLoggedInUser.pending, (state) => { state.loading = true; })
            .addCase(getLoggedInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(getLoggedInUser.rejected, (state, action) => {
                state.loading = false;
                state.currentUser = null;
                state.token = null;
                state.error = action.payload;
            })
            .addCase(updateUserProfile.pending, (state) => { state.loading = true; })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
