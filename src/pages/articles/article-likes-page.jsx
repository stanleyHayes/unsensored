import React, { useEffect, useState } from "react";
import {
    Avatar, Box, Container, Chip, Skeleton, Stack, Tab, Tabs, Typography,
} from "@mui/material";
import {
    FavoriteBorder, Favorite, BookmarkBorderOutlined, Bookmark,
} from "@mui/icons-material";
import Layout from "../../components/layout/layout";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLikesByArticle } from "../../redux/likes/likes-reducer";
import { getBookmarksByArticle } from "../../redux/bookmarks/bookmarks-reducer";
import { getArticle } from "../../redux/articles/articles-reducer";
import moment from "moment";
import EmptyState from "../../components/shared/empty-state";
import { useArticleRoom } from "../../socket/socket-context";

const UserRow = ({ user, timestamp, icon }) => (
    <Box
        component={Link}
        to={`/profile/${user?._id}`}
        sx={{
            display: "flex", alignItems: "center", gap: 1.5, py: 1.5,
            textDecoration: "none", color: "inherit",
            borderBottom: "1px solid", borderColor: "divider",
            transition: "background 0.15s",
            px: 1.5, mx: -1.5, borderRadius: 1.5,
            "&:hover": { bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" },
        }}
    >
        <Avatar src={user?.avatar} sx={{ width: 40, height: 40, bgcolor: "primary.main", fontWeight: 700, fontSize: "0.85rem" }}>
            {user?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.85rem" }}>
                {user?.name}
            </Typography>
            <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.72rem" }}>
                @{user?.username}
            </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {icon}
            <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.68rem" }}>
                {moment(timestamp).fromNow()}
            </Typography>
        </Box>
    </Box>
);

const ListSkeleton = () => (
    <Stack spacing={1.5} sx={{ mt: 1 }}>
        {[1, 2, 3, 4].map((i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.5 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                    <Skeleton width={120} height={16} sx={{ mb: 0.3 }} />
                    <Skeleton width={80} height={12} />
                </Box>
                <Skeleton width={60} height={12} />
            </Box>
        ))}
    </Stack>
);

const ArticleLikesPage = () => {
    const { articleId } = useParams();
    const dispatch = useDispatch();
    useArticleRoom(articleId);

    const token = useSelector((s) => s.auth.token);
    const articleDetail = useSelector((s) => s.articles.articleDetail);
    const likes = useSelector((s) => s.likes.likes);
    const likesLoading = useSelector((s) => s.likes.loading);
    const articleBookmarks = useSelector((s) => s.bookmarks.articleBookmarks);

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        dispatch(getArticle({ articleId, token }));
        dispatch(getLikesByArticle({ articleId, token }));
        dispatch(getBookmarksByArticle({ articleId, token }));
    }, [dispatch, articleId, token]);

    return (
        <Layout>
            <Container maxWidth="sm">
                {/* Article context */}
                {articleDetail && (
                    <Box
                        component={Link}
                        to={`/articles/${articleId}`}
                        sx={{
                            display: "flex", gap: 2, p: 2, mb: 3,
                            border: "1px solid", borderColor: "divider",
                            borderRadius: 2, textDecoration: "none", color: "inherit",
                            transition: "border-color 0.15s",
                            "&:hover": { borderColor: "text.secondary" },
                        }}
                    >
                        {articleDetail.banner && (
                            <Box sx={{ width: 80, height: 56, borderRadius: 1.5, overflow: "hidden", flexShrink: 0 }}>
                                <Box component="img" src={articleDetail.banner} alt="" referrerPolicy="no-referrer"
                                    sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </Box>
                        )}
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography variant="body2" sx={{
                                fontWeight: 700, fontSize: "0.85rem", lineHeight: 1.3, mb: 0.3,
                                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                            }}>
                                {articleDetail.title}
                            </Typography>
                            <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.7rem" }}>
                                by {articleDetail.author?.name}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {/* Tabs */}
                <Tabs
                    value={tabIndex}
                    onChange={(_, v) => setTabIndex(v)}
                    variant="fullWidth"
                    sx={{
                        borderBottom: "1px solid", borderColor: "divider", mb: 2,
                        "& .MuiTab-root": { textTransform: "none", fontWeight: 600, fontSize: "0.85rem" },
                    }}
                >
                    <Tab label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                            <Favorite sx={{ fontSize: 16, color: "#e53935" }} />
                            Likes
                            <Chip label={likes?.length || 0} size="small" sx={{ height: 20, fontSize: "0.68rem", fontWeight: 700 }} />
                        </Box>
                    } />
                    <Tab label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                            <Bookmark sx={{ fontSize: 16, color: "primary.main" }} />
                            Saves
                            <Chip label={articleBookmarks?.length || 0} size="small" sx={{ height: 20, fontSize: "0.68rem", fontWeight: 700 }} />
                        </Box>
                    } />
                </Tabs>

                {/* Tab content */}
                <Box sx={{ pb: 6, minHeight: "40vh" }}>
                    {tabIndex === 0 && (
                        likesLoading ? <ListSkeleton /> : (
                            likes?.length ? (
                                <Stack spacing={0}>
                                    {likes.map((like) => (
                                        <UserRow
                                            key={like._id}
                                            user={like.author}
                                            timestamp={like.createdAt}
                                            icon={<Favorite sx={{ fontSize: 14, color: "#e53935" }} />}
                                        />
                                    ))}
                                </Stack>
                            ) : (
                                <EmptyState
                                    icon={<FavoriteBorder />}
                                    title="No likes yet"
                                    description="Be the first to like this article."
                                    doodles={false}
                                />
                            )
                        )
                    )}

                    {tabIndex === 1 && (
                        articleBookmarks?.length ? (
                            <Stack spacing={0}>
                                {articleBookmarks.map((bm) => (
                                    <UserRow
                                        key={bm._id}
                                        user={bm.author}
                                        timestamp={bm.createdAt}
                                        icon={<Bookmark sx={{ fontSize: 14, color: "primary.main" }} />}
                                    />
                                ))}
                            </Stack>
                        ) : (
                            <EmptyState
                                icon={<BookmarkBorderOutlined />}
                                title="No saves yet"
                                description="No one has saved this article yet."
                                doodles={false}
                            />
                        )
                    )}
                </Box>
            </Container>
        </Layout>
    );
};

export default ArticleLikesPage;
