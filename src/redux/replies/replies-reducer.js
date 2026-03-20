import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/constants";

// Async thunks
export const getRepliesByUser = createAsyncThunk(
    'replies/getRepliesByUser',
    async ({userId, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/users/${userId}/replies`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const getRepliesByComment = createAsyncThunk(
    'replies/getRepliesByComment',
    async ({commentId, token, page = 1, limit = 10}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASE_URL}/comments/${commentId}/replies`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, limit },
            });
            return { data: response.data.data, pagination: response.data.pagination };
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const deleteReply = createAsyncThunk(
    'replies/deleteReply',
    async ({replyId, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'delete',
                url: `${BASE_URL}/replies/${replyId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const updateReply = createAsyncThunk(
    'replies/updateReply',
    async ({replyId, reply, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'patch',
                url: `${BASE_URL}/replies/${replyId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: reply
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const createReply = createAsyncThunk(
    'replies/createReply',
    async ({reply, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}/replies`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: reply
            });
            const {data} = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const toggleReplyLike = createAsyncThunk(
    'replies/toggleReplyLike',
    async ({reply, token}, {rejectWithValue}) => {
        try {
            const response = await axios({
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                url: `${BASE_URL}/likes`,
                data: {type: 'REPLY', reply}
            });
            const {data, action} = response.data;
            return {like: data, action};
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

const repliesSlice = createSlice({
    name: 'replies',
    initialState: {
        replies: [],
        pagination: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // createReply
            .addCase(createReply.pending, (state) => {
                state.loading = true;
            })
            .addCase(createReply.fulfilled, (state, action) => {
                state.loading = false;
                state.replies.push(action.payload);
                state.error = false;
            })
            .addCase(createReply.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getRepliesByComment
            .addCase(getRepliesByComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRepliesByComment.fulfilled, (state, action) => {
                state.loading = false;
                state.replies = action.payload.data;
                state.pagination = action.payload.pagination;
                state.error = null;
            })
            .addCase(getRepliesByComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.replies = [];
            })
            // getRepliesByUser
            .addCase(getRepliesByUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRepliesByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.replies = action.payload;
                state.error = false;
            })
            .addCase(getRepliesByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.replies = [];
            })
            // updateReply
            .addCase(updateReply.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateReply.fulfilled, (state, action) => {
                state.loading = false;
                state.replies = state.replies.map(reply =>
                    reply._id === action.payload._id ? {...action.payload} : reply
                );
            })
            .addCase(updateReply.rejected, (state) => {
                state.loading = false;
            })
            // deleteReply
            .addCase(deleteReply.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteReply.fulfilled, (state, action) => {
                state.loading = false;
                state.replies = state.replies.filter(reply => reply._id !== action.payload._id);
            })
            .addCase(deleteReply.rejected, (state) => {
                state.loading = false;
            })
            // toggleReplyLike
            .addCase(toggleReplyLike.pending, (state) => {
                state.loading = false;
            })
            .addCase(toggleReplyLike.fulfilled, (state, action) => {
                const {like, action: likeAction} = action.payload;
                if (likeAction === 'ADD') {
                    state.replies = state.replies.map(reply => {
                        if (reply._id === like.reply) {
                            return {...reply, likes: [...reply.likes, like]};
                        }
                        return reply;
                    });
                } else if (likeAction === 'REMOVE') {
                    state.replies = state.replies.map(reply => {
                        if (reply._id === like.reply) {
                            return {...reply, likes: reply.likes.filter(l => l._id !== like._id)};
                        }
                        return reply;
                    });
                }
                state.loading = false;
            })
            .addCase(toggleReplyLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default repliesSlice.reducer;
