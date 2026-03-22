import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        toast: { open: false, message: '', severity: 'error' },
        isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    },
    reducers: {
        showToast: (state, action) => {
            state.toast = {
                open: true,
                message: action.payload.message || 'Something went wrong',
                severity: action.payload.severity || 'error',
            };
        },
        hideToast: (state) => {
            state.toast.open = false;
        },
        setOnlineStatus: (state, action) => {
            state.isOnline = action.payload;
        },
    },
});

export const { showToast, hideToast, setOnlineStatus } = uiSlice.actions;

export default uiSlice.reducer;
