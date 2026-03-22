import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export const toggleFollow = createAsyncThunk(
    'follows/toggleFollow',
    async ({ following, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/follows`, { following }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return { data: response.data.data, action: response.data.action };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const getMyFollowingIds = createAsyncThunk(
    'follows/getMyFollowingIds',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/follows/me/ids`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const getFollowers = createAsyncThunk(
    'follows/getFollowers',
    async ({ userId, token, page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            const response = await axios.get(`${BASE_URL}/follows/${userId}/followers`, {
                headers,
                params: { page, limit },
            });
            return { data: response.data.data, pagination: response.data.pagination };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

export const getFollowing = createAsyncThunk(
    'follows/getFollowing',
    async ({ userId, token, page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            const response = await axios.get(`${BASE_URL}/follows/${userId}/following`, {
                headers,
                params: { page, limit },
            });
            return { data: response.data.data, pagination: response.data.pagination };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

const followsSlice = createSlice({
    name: 'follows',
    initialState: {
        followingIds: [],
        followers: [],
        following: [],
        followerPagination: null,
        followingPagination: null,
        loading: false,
        error: null,
    },
    reducers: {
        socketFollowToggled: (state, action) => {
            const { follow, action: followAction } = action.payload;
            if (followAction === 'ADD') {
                if (!state.followingIds.includes(follow.following)) {
                    state.followingIds.push(follow.following);
                }
            } else {
                state.followingIds = state.followingIds.filter(id => id !== follow.following);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // toggleFollow
            .addCase(toggleFollow.fulfilled, (state, action) => {
                const { data, action: followAction } = action.payload;
                if (followAction === 'ADD') {
                    state.followingIds.push(data.following);
                } else {
                    state.followingIds = state.followingIds.filter((id) => id !== data.following);
                }
            })
            // getMyFollowingIds
            .addCase(getMyFollowingIds.fulfilled, (state, action) => {
                state.followingIds = action.payload;
            })
            // getFollowers
            .addCase(getFollowers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFollowers.fulfilled, (state, action) => {
                state.loading = false;
                state.followers = action.payload.data;
                state.followerPagination = action.payload.pagination;
            })
            .addCase(getFollowers.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.followers = [];
            })
            // getFollowing
            .addCase(getFollowing.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFollowing.fulfilled, (state, action) => {
                state.loading = false;
                state.following = action.payload.data;
                state.followingPagination = action.payload.pagination;
            })
            .addCase(getFollowing.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.following = [];
            });
    },
});

export const { socketFollowToggled } = followsSlice.actions;

export default followsSlice.reducer;
