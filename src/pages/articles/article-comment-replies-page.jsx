import React, { useEffect, useState } from "react";
import {
    Avatar, Box, Button, Container, Skeleton,
    Stack, TextField, Typography,
} from "@mui/material";
import { ReplyOutlined } from "@mui/icons-material";
import Layout from "../../components/layout/layout";
import Pagination from "../../components/shared/pagination";
import { useSelector, useDispatch } from "react-redux";
import ReplyList from "../../components/shared/reply-list";
import ButtonLoader from "../../components/shared/button-loader";
import { useParams, Link } from "react-router-dom";
import { createReply, getRepliesByComment } from "../../redux/replies/replies-reducer";
import { getComment } from "../../redux/comments/comments-reducer";
import moment from "moment";
import { useArticleRoom } from "../../socket/socket-context";

const ArticleCommentRepliesPage = () => {
    const dispatch = useDispatch();
    const replies = useSelector((s) => s.replies.replies);
    const replyPagination = useSelector((s) => s.replies.pagination);
    const loading = useSelector((s) => s.replies.loading);
    const token = useSelector((s) => s.auth.token);
    const currentUser = useSelector((s) => s.auth.currentUser);
    const commentDetail = useSelector((s) => s.comments.commentDetail);
    const [text, setText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [page, setPage] = useState(1);
    const { commentId, articleId } = useParams();
    useArticleRoom(articleId);

    useEffect(() => {
        dispatch(getRepliesByComment({ commentId, token, page }));
        dispatch(getComment({ commentId, token }));
    }, [commentId, dispatch, token, page]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        setSubmitting(true);
        await dispatch(createReply({ reply: { comment: commentId, article: articleId, text }, token }));
        setText("");
        setSubmitting(false);
    };

    return (
        <Layout>
            <Container maxWidth="sm" sx={{ pb: 6 }}>
                {/* Parent comment context */}
                {!commentDetail ? (
                    <Box sx={{ display: "flex", gap: 1.5, mb: 3, p: 2.5, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
                        <Skeleton variant="circular" width={34} height={34} />
                        <Box sx={{ flex: 1 }}>
                            <Skeleton width={100} height={14} sx={{ mb: 0.5 }} />
                            <Skeleton width="90%" height={14} sx={{ mb: 0.3 }} />
                            <Skeleton width="60%" height={14} />
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.5,
                            mb: 3,
                            p: 2.5,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            bgcolor: "background.paper",
                        }}
                    >
                        <Avatar
                            src={commentDetail.author?.avatar}
                            sx={{ width: 34, height: 34, bgcolor: "primary.main", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}
                        >
                            {commentDetail.author?.name?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <Box>
                            <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8, mb: 0.5 }}>
                                <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.82rem" }}>
                                    {commentDetail.author?.name}
                                </Typography>
                                <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.7rem" }}>
                                    {moment(commentDetail.createdAt).fromNow()}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: "0.88rem" }}>
                                {commentDetail.text}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {/* Replies header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                    <ReplyOutlined sx={{ fontSize: 20, color: "text.secondary" }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                        Replies
                    </Typography>
                    {replies?.length > 0 && (
                        <Typography variant="caption" color="text.disabled" sx={{ ml: 0.5 }}>
                            ({replies.length})
                        </Typography>
                    )}
                </Box>

                {/* Composer */}
                {currentUser ? (
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.5,
                            mb: 4,
                            pb: 3,
                            borderBottom: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Avatar
                            src={currentUser?.avatar}
                            sx={{ width: 28, height: 28, bgcolor: "primary.main", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}
                        >
                            {currentUser?.name?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1 }}>
                            <TextField
                                fullWidth multiline minRows={1} maxRows={4}
                                placeholder="Write a reply..."
                                value={text} onChange={(e) => setText(e.target.value)}
                                variant="outlined" size="small"
                                sx={{
                                    mb: 1.5,
                                    "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "background.paper", fontSize: "0.85rem" },
                                }}
                            />
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    type="submit" variant="contained" size="small"
                                    disabled={!text.trim() || submitting}
                                    sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.light" }, px: 3, boxShadow: "none" }}
                                >
                                    {submitting ? <>Posting <ButtonLoader /></> : "Reply"}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            mb: 4,
                            pb: 3,
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                            Sign in to reply.
                        </Typography>
                        <Button
                            component={Link}
                            to="/auth/login"
                            variant="contained"
                            size="small"
                            sx={{ px: 3, boxShadow: "none" }}
                        >
                            Sign In
                        </Button>
                    </Box>
                )}

                {/* Thread */}
                <ReplyList replies={replies} loading={loading} />
                {replyPagination && (
                    <Pagination page={page} totalPages={replyPagination.totalPages} onPageChange={(p) => setPage(p)} />
                )}
            </Container>
        </Layout>
    );
};

export default ArticleCommentRepliesPage;
