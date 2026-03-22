import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        toast: { open: false, message: '', severity: 'error' },
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
    },
});

export const { showToast, hideToast } = uiSlice.actions;

export default uiSlice.reducer;
