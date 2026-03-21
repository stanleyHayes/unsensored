import React, { useEffect, useState } from "react";
import {
    Avatar, Box, Button, Chip, Container, Divider,
    Skeleton, Stack, TextField, Typography,
} from "@mui/material";
import { ChatBubbleOutline, East } from "@mui/icons-material";
import Layout from "../../components/layout/layout";
import Pagination from "../../components/shared/pagination";
import { useSelector, useDispatch } from "react-redux";
import CommentList from "../../components/shared/comment-list";
import ButtonLoader from "../../components/shared/button-loader";
import { createComment, getCommentsByArticle } from "../../redux/comments/comments-reducer";
import { getArticle } from "../../redux/articles/articles-reducer";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import readingTime from "reading-time";
import { useArticleRoom } from "../../socket/socket-context";

const ArticleCommentsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const comments = useSelector((s) => s.comments.comments);
    const commentPagination = useSelector((s) => s.comments.pagination);
    const loading = useSelector((s) => s.comments.loading);
    const token = useSelector((s) => s.auth.token);
    const currentUser = useSelector((s) => s.auth.currentUser);
    const articleDetail = useSelector((s) => s.articles.articleDetail);
    const articleLoading = useSelector((s) => s.articles.loading);
    const [text, setText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [page, setPage] = useState(1);
    const { articleId } = useParams();
    useArticleRoom(articleId);

    useEffect(() => {
        dispatch(getCommentsByArticle({ articleId, token, page }));
        dispatch(getArticle({ articleId, token }));
    }, [articleId, dispatch, token, page]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        setSubmitting(true);
        await dispatch(createComment({ comment: { article: articleId, text }, token }));
        setText("");
        setSubmitting(false);
    };

    const stats = articleDetail ? readingTime(articleDetail.text || "") : null;

    return (
        <Layout>
            <Container maxWidth="sm" sx={{ pb: 6 }}>
                {/* Article context card */}
                {articleLoading && !articleDetail ? (
                    <Box sx={{ mb: 3, p: 2.5, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
                        <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                            <Skeleton variant="circular" width={28} height={28} />
                            <Box>
                                <Skeleton width={100} height={14} sx={{ mb: 0.3 }} />
                                <Skeleton width={60} height={10} />
                            </Box>
                        </Box>
                        <Skeleton width="85%" height={20} sx={{ mb: 0.5 }} />
                        <Skeleton width="60%" height={14} />
                    </Box>
                ) : articleDetail && (
                    <Box
                        onClick={() => navigate(`/articles/${articleId}`)}
                        sx={{
                            mb: 3,
                            p: 2.5,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            bgcolor: "background.paper",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            "&:hover": { borderColor: "primary.main", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" },
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                            <Avatar
                                src={articleDetail.author?.avatar}
                                sx={{ width: 28, height: 28, bgcolor: "primary.main", fontSize: "0.7rem", fontWeight: 700 }}
                            >
                                {articleDetail.author?.name?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.75rem" }}>
                                {articleDetail.author?.name}
                            </Typography>
                            <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "text.disabled" }} />
                            <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.7rem" }}>
                                {moment(articleDetail.updatedAt).fromNow()}
                            </Typography>
                            {stats && (
                                <>
                                    <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "text.disabled" }} />
                                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.7rem" }}>
                                        {stats.text}
                                    </Typography>
                                </>
                            )}
                        </Box>

                        <Typography variant="body1" sx={{ fontWeight: 800, lineHeight: 1.3, mb: 0.5, letterSpacing: "-0.01em" }}>
                            {articleDetail.title}
                        </Typography>

                        <Typography
                            variant="body2" color="text.secondary"
                            sx={{
                                fontSize: "0.82rem", lineHeight: 1.5, mb: 1.5,
                                display: "-webkit-box", WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical", overflow: "hidden",
                            }}
                        >
                            {articleDetail.summary}
                        </Typography>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            {articleDetail.tags?.slice(0, 2).map((tag) => (
                                <Chip
                                    key={tag} label={tag} size="small"
                                    sx={{
                                        height: 20, fontSize: "0.62rem", fontWeight: 600,
                                        bgcolor: (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.1)" : "rgba(26,26,46,0.05)",
                                        color: "primary.main",
                                    }}
                                />
                            ))}
                            <Box sx={{ flex: 1 }} />
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, color: "primary.main" }}>
                                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.68rem" }}>Read article</Typography>
                                <East sx={{ fontSize: 12 }} />
                            </Box>
                        </Stack>
                    </Box>
                )}

                {/* Discussion header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                    <ChatBubbleOutline sx={{ fontSize: 20, color: "text.secondary" }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                        Discussion
                    </Typography>
                    {comments?.length > 0 && (
                        <Typography variant="caption" color="text.disabled" sx={{ ml: 0.5 }}>
                            ({comments.length})
                        </Typography>
                    )}
                </Box>

                {/* Composer */}
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
                        sx={{ width: 34, height: 34, bgcolor: "primary.main", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}
                    >
                        {currentUser?.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1 }}>
                        <TextField
                            fullWidth multiline minRows={2} maxRows={6}
                            placeholder="Add to the discussion..."
                            value={text} onChange={(e) => setText(e.target.value)}
                            variant="outlined" size="small"
                            sx={{
                                mb: 1.5,
                                "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "background.paper", fontSize: "0.88rem" },
                            }}
                        />
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button
                                type="submit" variant="contained" size="small"
                                disabled={!text.trim() || submitting}
                                sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.light" }, px: 3, boxShadow: "none" }}
                            >
                                {submitting ? <>Posting <ButtonLoader /></> : "Comment"}
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Thread */}
                <CommentList comments={comments} loading={loading} />
                {commentPagination && (
                    <Pagination page={page} totalPages={commentPagination.totalPages} onPageChange={(p) => setPage(p)} />
                )}
            </Container>
        </Layout>
    );
};

export default ArticleCommentsPage;
