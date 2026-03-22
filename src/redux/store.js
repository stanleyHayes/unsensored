import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import { showToast } from "./ui/ui-reducer";

const errorToastMiddleware = (store) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const message = typeof action.payload === 'string'
            ? action.payload
            : action.payload?.message || 'Something went wrong. Please try again.';
        store.dispatch(showToast({ message, severity: 'error' }));
    }
    return next(action);
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(errorToastMiddleware),
});

export default store;
