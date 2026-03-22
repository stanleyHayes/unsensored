import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/constants";

// Async thunks
export const getCommentsByUser = createAsyncThunk(
    'comments/getCommentsByUser',
    async ({userId, token}, {rejectWithValue}) => {
        try {
            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/users/${userId}/comments`,
                headers,
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getComment = createAsyncThunk(
    'comments/getComment',
    async ({commentId, token}, {rejectWithValue}) => {
        try {
            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/comments/${commentId}`,
                headers,
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getCommentsByArticle = createAsyncThunk(
    'comments/getCommentsByArticle',
    async ({articleId, token, page = 1, limit = 10}, {rejectWithValue}) => {
        try {
            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            const response = await axios.get(`${BASE_URL}/articles/${articleId}/comments`, {
                headers,
                params: { page, limit },
            });
            return { data: response.data.data, pagination: response.data.pagination };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async ({commentId, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'delete',
                url: `${BASE_URL}/comments/${commentId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateComment = createAsyncThunk(
    'comments/updateComment',
    async ({commentId, comment, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'patch',
                url: `${BASE_URL}/comments/${commentId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: comment
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const createComment = createAsyncThunk(
    'comments/createComment',
    async ({comment, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}/comments`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: comment
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const toggleCommentLike = createAsyncThunk(
    'comments/toggleCommentLike',
    async ({comment, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                url: `${BASE_URL}/likes`,
                data: {type: 'COMMENT', comment}
            });
            const {data, action} = response.data;
            return {like: data, action};
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        pagination: null,
        loading: false,
        error: null,
        commentDetail: null
    },
    reducers: {
        socketCommentCreated: (state, action) => {
            const exists = state.comments.some(c => c._id === action.payload._id);
            if (!exists) {
                state.comments.push(action.payload);
            }
        },
        socketCommentUpdated: (state, action) => {
            state.comments = state.comments.map(c =>
                c._id === action.payload._id ? { ...c, ...action.payload } : c
            );
        },
        socketCommentDeleted: (state, action) => {
            state.comments = state.comments.filter(c => c._id !== action.payload._id);
        },
        socketCommentLikeToggled: (state, action) => {
            const { like, action: likeAction } = action.payload;
            if (!like?.comment) return;

            if (likeAction === 'ADD') {
                state.comments = state.comments.map(comment => {
                    if (comment._id === like.comment) {
                        const alreadyLiked = (comment.likes || []).some(l => l._id === like._id);
                        if (alreadyLiked) return comment;
                        return { ...comment, likes: [...(comment.likes || []), like] };
                    }
                    return comment;
                });
            } else if (likeAction === 'REMOVE') {
                state.comments = state.comments.map(comment => {
                    if (comment._id === like.comment) {
                        return { ...comment, likes: (comment.likes || []).filter(l => l._id !== like._id) };
                    }
                    return comment;
                });
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // createComment
            .addCase(createComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.loading = false;
                const exists = state.comments.some(c => c._id === action.payload._id);
                if (!exists) state.comments.push(action.payload);
                state.error = false;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getComment
            .addCase(getComment.pending, (state) => { state.loading = true; })
            .addCase(getComment.fulfilled, (state, action) => {
                state.loading = false;
                state.commentDetail = action.payload;
            })
            .addCase(getComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getCommentsByArticle
            .addCase(getCommentsByArticle.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCommentsByArticle.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload.data;
                state.pagination = action.payload.pagination;
                state.error = null;
            })
            .addCase(getCommentsByArticle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.comments = [];
            })
            // getCommentsByUser
            .addCase(getCommentsByUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCommentsByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
                state.error = false;
            })
            .addCase(getCommentsByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.comments = [];
            })
            // updateComment
            .addCase(updateComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = state.comments.map(comment =>
                    comment._id === action.payload._id ? action.payload : comment
                );
            })
            .addCase(updateComment.rejected, (state) => {
                state.loading = false;
            })
            // deleteComment
            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = state.comments.filter(comment => comment._id !== action.payload._id);
            })
            .addCase(deleteComment.rejected, (state) => {
                state.loading = false;
            })
            // toggleCommentLike
            .addCase(toggleCommentLike.pending, (state) => {
                state.loading = false;
            })
            .addCase(toggleCommentLike.fulfilled, (state, action) => {
                const {like, action: likeAction} = action.payload;
                if (!like) return;
                const delta = likeAction === 'ADD' ? 1 : -1;
                state.comments = state.comments.map(comment => {
                    if (comment._id === like.comment) {
                        return { ...comment, likeCount: Math.max((comment.likeCount || 0) + delta, 0) };
                    }
                    return comment;
                });
                state.loading = false;
            })
            .addCase(toggleCommentLike.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const {
    socketCommentCreated,
    socketCommentUpdated,
    socketCommentDeleted,
    socketCommentLikeToggled,
} = commentsSlice.actions;

export default commentsSlice.reducer;
