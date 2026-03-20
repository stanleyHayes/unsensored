import React from "react";
import { Avatar, Box, Chip, Divider, Skeleton, Stack, Typography, keyframes } from "@mui/material";
import { Link } from "react-router-dom";
import { TrendingUpOutlined, FavoriteBorder, ChatBubbleOutline } from "@mui/icons-material";
import moment from "moment";
import readingTime from "reading-time";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateX(8px); }
    to { opacity: 1; transform: translateX(0); }
`;

const SidebarArticle = ({ article, index }) => {
    const stats = readingTime(article.text || "");

    return (
        <Box
            component={Link}
            to={`/articles/${article._id}`}
            sx={{
                display: "flex",
                gap: 1.5,
                textDecoration: "none",
                color: "inherit",
                p: 1.5,
                mx: -1.5,
                borderRadius: 2,
                animation: `${fadeIn} 0.3s ease-out ${index * 0.05}s both`,
                transition: "all 0.15s ease",
                "&:hover": {
                    bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                    "& .sidebar-title": { color: "primary.main" },
                    "& .sidebar-num": { color: "primary.main" },
                },
            }}
        >
            {/* Number */}
            <Typography
                className="sidebar-num"
                sx={{
                    fontWeight: 900,
                    color: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                    fontSize: "1.6rem",
                    lineHeight: 1,
                    minWidth: 28,
                    transition: "color 0.15s ease",
                }}
            >
                {String(index + 1).padStart(2, "0")}
            </Typography>

            {/* Content */}
            <Box sx={{ minWidth: 0, flex: 1 }}>
                {/* Author */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 0.6 }}>
                    <Avatar
                        src={article.author?.avatar}
                        sx={{ width: 16, height: 16, fontSize: "0.5rem", bgcolor: "primary.main", fontWeight: 700 }}
                    >
                        {article.author?.name?.charAt(0)}
                    </Avatar>
                    <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.68rem", lineHeight: 1 }}>
                        {article.author?.name}
                    </Typography>
                </Box>

                {/* Title */}
                <Typography
                    className="sidebar-title"
                    variant="body2"
                    sx={{
                        fontWeight: 700,
                        lineHeight: 1.35,
                        fontSize: "0.8rem",
                        mb: 0.5,
                        transition: "color 0.15s ease",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {article.title}
                </Typography>

                {/* Meta */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.62rem" }}>
                        {moment(article.updatedAt).fromNow()}
                    </Typography>
                    <Box sx={{ width: 2, height: 2, borderRadius: "50%", bgcolor: "text.disabled" }} />
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.62rem" }}>
                        {stats.text}
                    </Typography>
                    {(article.likeCount > 0 || article.commentCount > 0) && (
                        <>
                            <Box sx={{ width: 2, height: 2, borderRadius: "50%", bgcolor: "text.disabled" }} />
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                                <FavoriteBorder sx={{ fontSize: 10, color: "text.disabled" }} />
                                <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.62rem" }}>
                                    {article.likeCount || 0}
                                </Typography>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

const SidebarSkeleton = () => (
    <Stack spacing={1.5}>
        {[1, 2, 3, 4].map((i) => (
            <Box key={i} sx={{ display: "flex", gap: 1.5, p: 1.5 }}>
                <Skeleton width={28} height={24} sx={{ borderRadius: 0.5 }} />
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", gap: 0.5, mb: 0.5 }}>
                        <Skeleton variant="circular" width={16} height={16} />
                        <Skeleton width={70} height={10} />
                    </Box>
                    <Skeleton width="100%" height={13} sx={{ mb: 0.3 }} />
                    <Skeleton width="75%" height={13} sx={{ mb: 0.5 }} />
                    <Skeleton width={90} height={9} />
                </Box>
            </Box>
        ))}
    </Stack>
);

const Sidebar = ({ articles, loading }) => {
    const allTags = [...new Set(articles?.flatMap((a) => a.tags || []) || [])];

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 2 }}>
                <TrendingUpOutlined sx={{ fontSize: 16, color: "primary.main" }} />
                <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: "0.08em", color: "text.secondary", fontSize: "0.68rem", lineHeight: 1 }}>
                    Popular on Uncensored
                </Typography>
            </Box>

            {/* Articles */}
            <Box sx={{ mb: 4 }}>
                {loading ? (
                    <SidebarSkeleton />
                ) : articles?.length ? (
                    articles.slice(0, 5).map((article, i) => (
                        <SidebarArticle key={article._id} article={article} index={i} />
                    ))
                ) : null}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Topics */}
            {allTags.length > 0 && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: "0.08em", color: "text.secondary", fontSize: "0.68rem", mb: 1.5, display: "block" }}>
                        Discover topics
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.6 }}>
                        {allTags.slice(0, 12).map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                clickable
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "0.7rem",
                                    height: 26,
                                    bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                                    "&:hover": {
                                        bgcolor: (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.15)" : "rgba(26,26,46,0.08)",
                                        color: "primary.main",
                                    },
                                    transition: "all 0.15s ease",
                                }}
                            />
                        ))}
                    </Stack>
                </Box>
            )}

            <Divider sx={{ mb: 2 }} />

            {/* Footer */}
            <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.62rem" }}>
                © {new Date().getFullYear()} Uncensored
            </Typography>
        </Box>
    );
};

export default Sidebar;
