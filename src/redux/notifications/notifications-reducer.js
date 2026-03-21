import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async ({ token, page = 1, limit = 20 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/notifications`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, limit },
            });
            return {
                data: response.data.data,
                unreadCount: response.data.unreadCount,
                pagination: response.data.pagination,
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const markNotificationRead = createAsyncThunk(
    'notifications/markNotificationRead',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            await axios.patch(`${BASE_URL}/notifications/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const markAllNotificationsRead = createAsyncThunk(
    'notifications/markAllNotificationsRead',
    async ({ token }, { rejectWithValue }) => {
        try {
            await axios.patch(`${BASE_URL}/notifications/read-all`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return true;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
        unreadCount: 0,
        pagination: null,
        loading: false,
    },
    reducers: {
        socketNotificationReceived: (state, action) => {
            state.notifications.unshift(action.payload);
            state.unreadCount += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload.data;
                state.unreadCount = action.payload.unreadCount;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchNotifications.rejected, (state) => {
                state.loading = false;
            })
            .addCase(markNotificationRead.fulfilled, (state, action) => {
                const n = state.notifications.find(n => n._id === action.payload);
                if (n && !n.read) {
                    n.read = true;
                    state.unreadCount = Math.max(state.unreadCount - 1, 0);
                }
            })
            .addCase(markAllNotificationsRead.fulfilled, (state) => {
                state.notifications.forEach(n => { n.read = true; });
                state.unreadCount = 0;
            });
    },
});

export const { socketNotificationReceived } = notificationsSlice.actions;

export default notificationsSlice.reducer;
