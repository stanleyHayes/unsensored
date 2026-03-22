import React, { useEffect, useState } from "react";
import {
    Avatar, Box, Button, Chip, Container, Divider,
    IconButton, Skeleton, Snackbar, Stack, Tooltip, Typography, keyframes,
} from "@mui/material";
import Layout from "../../components/layout/layout";
import moment from "moment";
import readingTime from "reading-time";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteArticle, getArticle } from "../../redux/articles/articles-reducer";
import {
    ChatBubbleOutline, DeleteOutline, Edit,
    FavoriteBorder, Favorite, Share, VisibilityOutlined,
    BookmarkBorderOutlined, Bookmark, East,
} from "@mui/icons-material";
import { createArticleView } from "../../redux/views/views-reducer";
import { toggleArticleLike } from "../../redux/likes/likes-reducer";
import { toggleBookmark } from "../../redux/bookmarks/bookmarks-reducer";
import { playLikeSound, playUnlikeSound, spawnHeartBurst, playBookmarkSound, playUnbookmarkSound, spawnBookmarkBurst } from "../../utils/like-effects";
import AnimatedCount, { formatCount } from "../../components/shared/animated-count";
import MarkdownPreview from "../../components/shared/markdown-preview";
import { BASE_URL } from "../../constants/constants";
import { useArticleRoom } from "../../socket/socket-context";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
`;

const heartPop = keyframes`
    0% { transform: scale(1); }
    25% { transform: scale(1.4); }
    50% { transform: scale(0.85); }
    75% { transform: scale(1.15); }
    100% { transform: scale(1); }
`;

const bookmarkPop = keyframes`
    0% { transform: scale(1) translateY(0); }
    20% { transform: scale(1.3) translateY(-2px); }
    50% { transform: scale(0.85) translateY(0); }
    75% { transform: scale(1.1) translateY(-1px); }
    100% { transform: scale(1) translateY(0); }
`;

const DetailSkeleton = () => (
    <Box sx={{ pt: 4, pb: 6 }}>
        <Skeleton variant="rounded" height={320} sx={{ borderRadius: 3, mb: 4 }} />
        <Skeleton width="90%" height={38} sx={{ mb: 0.8 }} />
        <Skeleton width="60%" height={38} sx={{ mb: 3 }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <Skeleton variant="circular" width={44} height={44} />
            <Box>
                <Skeleton width={120} height={16} sx={{ mb: 0.5 }} />
                <Skeleton width={180} height={12} />
            </Box>
        </Box>
        <Skeleton height={1} sx={{ mb: 3 }} />
        {[1, 0.9, 0.95, 0.7, 1, 0.85, 0.6, 1, 0.92, 0.78].map((w, i) => (
            <Skeleton key={i} width={`${w * 100}%`} height={18} sx={{ mb: 0.8 }} />
        ))}
    </Box>
);

const SidebarArticle = ({ article }) => {
    const stats = readingTime(article.text || "");
    return (
        <Box
            component={Link}
            to={`/articles/${article._id}`}
            sx={{
                display: "flex", gap: 1.5, textDecoration: "none", color: "inherit",
                p: 1.5, mx: -1.5, borderRadius: 2, transition: "all 0.15s ease",
                "&:hover": {
                    bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                    "& .side-title": { color: "primary.main" },
                },
            }}
        >
            {article.banner && (
                <Box sx={{ width: 64, height: 48, borderRadius: 1, overflow: "hidden", flexShrink: 0 }}>
                    <Box component="img" src={article.banner} alt="" referrerPolicy="no-referrer"
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
            )}
            <Box sx={{ minWidth: 0 }}>
                <Typography className="side-title" variant="body2"
                    sx={{ fontWeight: 700, fontSize: "0.78rem", lineHeight: 1.3, mb: 0.3, transition: "color 0.15s",
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {article.title}
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.65rem" }}>
                    {stats.text}
                </Typography>
            </Box>
        </Box>
    );
};

const ArticleDetailPage = () => {
    const { articleId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useArticleRoom(articleId);

    const articleDetail = useSelector((s) => s.articles.articleDetail);
    const currentUser = useSelector((s) => s.auth.currentUser);
    const token = useSelector((s) => s.auth.token);
    const loading = useSelector((s) => s.articles.loading);
    const bookmarkIds = useSelector((s) => s.bookmarks.bookmarkIds);
    const likedArticleIds = useSelector((s) => s.likes.likedArticleIds);

    const [authorArticles, setAuthorArticles] = useState([]);
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    };

    useEffect(() => { dispatch(getArticle({ articleId, token })); }, [articleId, dispatch, token]);
    useEffect(() => { dispatch(createArticleView({ articleId, token })); }, [articleId, dispatch, token]);

    // Fetch author's other articles
    useEffect(() => {
        if (articleDetail?.author?._id) {
            const headers = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            axios.get(`${BASE_URL}/users/${articleDetail.author._id}/articles`, {
                headers,
                params: { limit: 5 },
            }).then((res) => {
                const others = (res.data.data || []).filter((a) => a._id !== articleId);
                setAuthorArticles(others.slice(0, 4));
            }).catch(() => {});
        }
    }, [articleDetail?.author?._id, articleId, token]);

    if (loading && !articleDetail) return <Layout><DetailSkeleton /></Layout>;
    if (!articleDetail) return <Layout />;

    const isOwner = currentUser && articleDetail.author?._id === currentUser._id;
    const isLiked = likedArticleIds.includes(articleDetail._id);
    const isSaved = bookmarkIds.includes(articleDetail._id);
    const stats = readingTime(articleDetail.text || "");

    const isLoggedIn = !!currentUser && !!token;

    const handleLike = (e) => {
        if (!isLoggedIn) return navigate('/auth/login');
        if (!isLiked) {
            playLikeSound();
            spawnHeartBurst(e);
        } else {
            playUnlikeSound();
        }
        dispatch(toggleArticleLike({ article: articleId, token }));
    };

    const handleBookmark = (e) => {
        if (!isLoggedIn) return navigate('/auth/login');
        if (!isSaved) {
            playBookmarkSound();
            spawnBookmarkBurst(e);
        } else {
            playUnbookmarkSound();
        }
        dispatch(toggleBookmark({ article: articleId, token }));
    };

    return (
        <Layout>
            {/* Hero banner */}
            {articleDetail.banner && (
                <Box sx={{ borderRadius: 3, overflow: "hidden", mb: 5, position: "relative", animation: `${fadeIn} 0.5s ease-out` }}>
                    <Box component="img" src={articleDetail.banner} alt={articleDetail.title} referrerPolicy="no-referrer"
                        sx={{ width: "100%", height: { xs: 240, sm: 360, md: 440 }, objectFit: "cover", display: "block" }} />
                    <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)", pointerEvents: "none" }} />
                    <Box sx={{ position: "absolute", top: 16, right: 16, bgcolor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "white", px: 1.5, py: 0.4, borderRadius: 1, fontSize: "0.72rem", fontWeight: 600 }}>
                        {stats.text}
                    </Box>
                    {articleDetail.tags?.length > 0 && (
                        <Box sx={{ position: "absolute", bottom: 16, left: 16, display: "flex", gap: 0.6 }}>
                            {articleDetail.tags.slice(0, 3).map((tag, i) => (
                                <Chip key={i} label={tag} size="small"
                                    sx={{ bgcolor: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", color: "white", fontWeight: 600, fontSize: "0.68rem", height: 24 }} />
                            ))}
                        </Box>
                    )}
                </Box>
            )}

            {/* Main content + sidebar */}
            <Box sx={{ display: "flex", gap: { xs: 0, md: 6 }, flexDirection: { xs: "column", md: "row" } }}>
                {/* Article content */}
                <Box sx={{ flex: 1, minWidth: 0, pb: 8 }}>
                    <Typography sx={{ fontWeight: 900, lineHeight: 1.12, letterSpacing: "-0.03em", mb: 3, fontSize: { xs: "2rem", sm: "2.8rem" }, animation: `${fadeIn} 0.5s ease-out 0.1s both` }}>
                        {articleDetail.title}
                    </Typography>

                    {/* Author bar */}
                    <Box sx={{ mb: 4, animation: `${fadeIn} 0.5s ease-out 0.15s both` }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar src={articleDetail.author?.avatar} sx={{ width: { xs: 36, sm: 44 }, height: { xs: 36, sm: 44 }, bgcolor: "primary.main", cursor: "pointer", fontWeight: 700, border: "2px solid", borderColor: "divider", flexShrink: 0 }}
                                onClick={() => navigate(`/profile/${articleDetail.author?._id}`)}>
                                {articleDetail.author?.name?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="body2" sx={{ fontWeight: 700, cursor: "pointer", fontSize: { xs: "0.82rem", sm: "0.875rem" }, "&:hover": { textDecoration: "underline" } }}
                                    onClick={() => navigate(`/profile/${articleDetail.author?._id}`)}>
                                    {articleDetail.author?.name}
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: { xs: "0.7rem", sm: "0.72rem" } }}>
                                        {moment(articleDetail.updatedAt).fromNow()}
                                    </Typography>
                                    <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "text.secondary", flexShrink: 0 }} />
                                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: { xs: "0.7rem", sm: "0.72rem" } }}>
                                        {stats.text}
                                    </Typography>
                                    <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "text.secondary", flexShrink: 0 }} />
                                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: { xs: "0.7rem", sm: "0.72rem" } }}>
                                        {formatCount(articleDetail.viewCount || 0)} views
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Stack direction="row" spacing={0.3} sx={{ mt: 1.5, ml: { xs: 0, sm: "calc(44px + 12px)" } }}>
                            <Tooltip title={isLiked ? "Unlike" : "Like"} arrow>
                                <IconButton size="small" onClick={handleLike} sx={{ transition: "transform 0.1s" }}>
                                    {isLiked ? <Favorite sx={{ fontSize: 19, color: "#e53935", animation: `${heartPop} 0.45s ease` }} /> : <FavoriteBorder sx={{ fontSize: 19, color: "text.disabled" }} />}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Comments" arrow>
                                <Box component={Link} to={`/articles/${articleDetail._id}/comments`} sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
                                    <IconButton size="small" component="span">
                                        <ChatBubbleOutline sx={{ fontSize: 18, color: "text.disabled" }} />
                                    </IconButton>
                                </Box>
                            </Tooltip>
                            <Tooltip title={isSaved ? "Unsave" : "Save"} arrow>
                                <IconButton size="small" onClick={handleBookmark}>
                                    {isSaved ? <Bookmark sx={{ fontSize: 19, color: "primary.main", animation: `${bookmarkPop} 0.45s ease` }} /> : <BookmarkBorderOutlined sx={{ fontSize: 19, color: "text.disabled" }} />}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Share" arrow>
                                <IconButton size="small" onClick={handleShare}>
                                    <Share sx={{ fontSize: 18, color: "text.disabled" }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    {articleDetail.summary && (
                        <Box sx={{ mb: 4, pl: 3, borderLeft: "3px solid", borderColor: "primary.main", animation: `${fadeIn} 0.5s ease-out 0.2s both` }}>
                            <Typography variant="h6" color="text.secondary" sx={{ fontStyle: "italic", lineHeight: 1.6, fontWeight: 400, fontSize: "1.1rem" }}>
                                {articleDetail.summary}
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ animation: `${fadeIn} 0.5s ease-out 0.25s both`, mb: 5 }}>
                        <MarkdownPreview content={articleDetail.text} />
                    </Box>

                    {!articleDetail.banner && articleDetail.tags?.length > 0 && (
                        <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.8, mb: 4 }}>
                            {articleDetail.tags.map((tag, i) => (
                                <Chip key={i} label={tag} size="small" sx={{ fontWeight: 500, bgcolor: (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.1)" : "rgba(26,26,46,0.05)", color: "primary.main" }} />
                            ))}
                        </Stack>
                    )}

                    {/* Engagement bar */}
                    <Box sx={{ display: "flex", alignItems: "center", py: 1.5, px: 2, borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", mb: 3 }}>
                        <Tooltip title={isLiked ? "Unlike" : "Like"} arrow>
                            <IconButton size="small" onClick={handleLike}>
                                {isLiked ? <Favorite sx={{ fontSize: 20, color: "#e53935", animation: `${heartPop} 0.45s ease` }} /> : <FavoriteBorder sx={{ fontSize: 20, color: "text.disabled" }} />}
                            </IconButton>
                        </Tooltip>
                        <Typography variant="body2" sx={{ mr: 2.5, fontSize: "0.82rem", color: isLiked ? "#e53935" : "text.secondary", fontWeight: isLiked ? 700 : 400, transition: "color 0.2s" }}><AnimatedCount count={articleDetail.likeCount || 0} /> likes</Typography>
                        <Box component={Link} to={`/articles/${articleDetail._id}/comments`} sx={{ display: "flex", alignItems: "center", gap: 0.3, textDecoration: "none", color: "inherit", mr: 2.5 }}>
                            <IconButton size="small" component="span">
                                <ChatBubbleOutline sx={{ fontSize: 19, color: "text.disabled" }} />
                            </IconButton>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.82rem" }}><AnimatedCount count={articleDetail.commentCount || 0} /> comments</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                            <VisibilityOutlined sx={{ fontSize: 18, color: "text.disabled" }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.82rem" }}>{formatCount(articleDetail.viewCount || 0)} views</Typography>
                        </Box>
                        <Box sx={{ flex: 1 }} />
                        <Tooltip title="Share" arrow><IconButton size="small" onClick={handleShare}><Share sx={{ fontSize: 19, color: "text.disabled" }} /></IconButton></Tooltip>
                        <Tooltip title={isSaved ? "Unsave" : "Save"} arrow>
                            <IconButton size="small" onClick={handleBookmark}>
                                {isSaved ? <Bookmark sx={{ fontSize: 19, color: "primary.main", animation: `${bookmarkPop} 0.45s ease` }} /> : <BookmarkBorderOutlined sx={{ fontSize: 19, color: "text.disabled" }} />}
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {isOwner && (
                        <Stack direction="row" spacing={1.5}>
                            <Button component={Link} to={`/articles/${articleDetail._id}/update`} startIcon={<Edit />} variant="outlined" size="small" sx={{ borderColor: "divider", "&:hover": { borderColor: "text.secondary" } }}>Edit</Button>
                            <Button onClick={() => dispatch(deleteArticle({ articleId, token, navigate }))} startIcon={<DeleteOutline />} variant="outlined" size="small" color="error">Delete</Button>
                        </Stack>
                    )}
                </Box>

                {/* Sidebar — author's other articles */}
                <Box sx={{ display: { xs: "none", md: "block" }, width: 280, flexShrink: 0, position: "sticky", top: 88, alignSelf: "flex-start" }}>
                    {/* Author card */}
                    <Box sx={{ mb: 3, p: 2.5, border: "1px solid", borderColor: "divider", borderRadius: 2, bgcolor: "background.paper" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                            <Avatar src={articleDetail.author?.avatar} sx={{ width: 40, height: 40, bgcolor: "primary.main", fontWeight: 700, cursor: "pointer" }}
                                onClick={() => navigate(`/profile/${articleDetail.author?._id}`)}>
                                {articleDetail.author?.name?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                                    onClick={() => navigate(`/profile/${articleDetail.author?._id}`)}>
                                    {articleDetail.author?.name}
                                </Typography>
                                <Typography variant="caption" color="text.disabled">@{articleDetail.author?.username}</Typography>
                            </Box>
                        </Box>
                        <Button component={Link} to={`/profile/${articleDetail.author?._id}`} fullWidth variant="outlined" size="small"
                            sx={{ borderColor: "divider", color: "text.primary", "&:hover": { borderColor: "text.secondary" } }}>
                            View Profile
                        </Button>
                    </Box>

                    {/* More from author */}
                    {authorArticles.length > 0 && (
                        <Box>
                            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: "0.08em", color: "text.secondary", fontSize: "0.68rem", mb: 1.5, display: "block" }}>
                                More from {articleDetail.author?.name?.split(" ")[0]}
                            </Typography>
                            {authorArticles.map((a) => (
                                <SidebarArticle key={a._id} article={a} />
                            ))}
                            <Button component={Link} to={`/profile/${articleDetail.author?._id}`} fullWidth size="small" endIcon={<East sx={{ fontSize: 14 }} />}
                                sx={{ mt: 1, color: "text.secondary", fontSize: "0.75rem", "&:hover": { color: "text.primary" } }}>
                                See all articles
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
            <Snackbar
                open={copied}
                autoHideDuration={2000}
                onClose={() => setCopied(false)}
                message="Link copied to clipboard"
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </Layout>
    );
};

export default ArticleDetailPage;
