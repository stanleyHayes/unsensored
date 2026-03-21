import React from "react";
import {
    Box, Typography, Avatar, Chip, IconButton, Tooltip, keyframes,
} from "@mui/material";
import {
    FavoriteBorder, Favorite, ChatBubbleOutline,
    BookmarkBorderOutlined, Bookmark, East,
} from "@mui/icons-material";
import moment from "moment";
import readingTime from "reading-time";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleArticleLike } from "../../redux/likes/likes-reducer";
import { toggleBookmark } from "../../redux/bookmarks/bookmarks-reducer";
import { playLikeSound, playUnlikeSound, spawnHeartBurst, playBookmarkSound, playUnbookmarkSound, spawnBookmarkBurst } from "../../utils/like-effects";
import AnimatedCount from "./animated-count";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const heartPop = keyframes`
    0% { transform: scale(1); }
    25% { transform: scale(1.35); }
    50% { transform: scale(0.9); }
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

const Article = ({ article, index = 0 }) => {
    const {
        title, summary, author, updatedAt, banner, text,
        likeCount, commentCount, _id, likes, tags,
    } = article;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((s) => s.auth.currentUser);
    const token = useSelector((s) => s.auth.token);
    const bookmarkIds = useSelector((s) => s.bookmarks.bookmarkIds);
    const likedArticleIds = useSelector((s) => s.likes.likedArticleIds);

    const isLiked = likedArticleIds.includes(_id);
    const isSaved = bookmarkIds.includes(_id);
    const stats = readingTime(text || "");

    const handleLike = (e) => {
        e.stopPropagation();
        if (!isLiked) {
            playLikeSound();
            spawnHeartBurst(e);
        } else {
            playUnlikeSound();
        }
        dispatch(toggleArticleLike({ article: _id, token }));
    };

    const handleSave = (e) => {
        e.stopPropagation();
        if (!isSaved) {
            playBookmarkSound();
            spawnBookmarkBurst(e);
        } else {
            playUnbookmarkSound();
        }
        dispatch(toggleBookmark({ article: _id, token }));
    };

    return (
        <Box
            sx={{
                mb: 3,
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                cursor: "pointer",
                animation: `${fadeIn} 0.4s ease-out ${index * 0.06}s both`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (t) => t.palette.mode === "dark"
                        ? "0 20px 40px rgba(0,0,0,0.35)"
                        : "0 20px 40px rgba(0,0,0,0.07)",
                    borderColor: "transparent",
                    "& .article-thumb": { transform: "scale(1.04)" },
                    "& .article-read": { opacity: 1, transform: "translateX(0)" },
                },
            }}
            onClick={() => navigate(`/articles/${_id}`)}
        >
            {/* Banner */}
            {banner && (
                <Box sx={{ height: { xs: 180, sm: 220 }, overflow: "hidden", position: "relative" }}>
                    <Box
                        className="article-thumb"
                        component="img"
                        src={banner}
                        alt={title}
                        referrerPolicy="no-referrer"
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute", top: 12, right: 12,
                            bgcolor: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
                            color: "white", px: 1.2, py: 0.3, borderRadius: 1,
                            fontSize: "0.68rem", fontWeight: 600,
                        }}
                    >
                        {stats.text}
                    </Box>
                </Box>
            )}

            {/* Content */}
            <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                {/* Tags */}
                {tags?.length > 0 && (
                    <Box sx={{ display: "flex", gap: 0.6, mb: 1.5, flexWrap: "wrap" }} onClick={(e) => e.stopPropagation()}>
                        {tags.slice(0, 3).map((tag) => (
                            <Chip
                                key={tag} label={tag} size="small"
                                sx={{
                                    height: 22, fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.02em",
                                    bgcolor: (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.1)" : "rgba(26,26,46,0.05)",
                                    color: "primary.main", border: "none",
                                }}
                            />
                        ))}
                        {!banner && (
                            <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.68rem", ml: "auto", alignSelf: "center" }}>
                                {stats.text}
                            </Typography>
                        )}
                    </Box>
                )}

                {/* Title */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 800, fontSize: { xs: "1.05rem", sm: "1.2rem" },
                        lineHeight: 1.3, mb: 0.8, letterSpacing: "-0.01em",
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}
                >
                    {title}
                </Typography>

                {/* Summary */}
                <Typography
                    variant="body2" color="text.secondary"
                    sx={{
                        mb: 2, lineHeight: 1.6,
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                        fontSize: "0.84rem",
                    }}
                >
                    {summary}
                </Typography>

                {/* Footer */}
                <Box
                    sx={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        pt: 1.5, borderTop: "1px solid", borderColor: "divider",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Author */}
                    <Box
                        sx={{
                            display: "flex", alignItems: "center", gap: 1, cursor: "pointer",
                            "&:hover .author-name": { textDecoration: "underline" },
                        }}
                        onClick={() => navigate(`/profile/${author?._id}`)}
                    >
                        <Avatar src={author?.avatar} sx={{ width: 28, height: 28, fontSize: "0.7rem", bgcolor: "primary.main", fontWeight: 700 }}>
                            {author?.name?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography className="author-name" variant="caption" sx={{ fontWeight: 600, fontSize: "0.75rem", display: "block", lineHeight: 1.2 }}>
                                {author?.name}
                            </Typography>
                            <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.66rem" }}>
                                {moment(updatedAt).fromNow()}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Actions */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
                        <Tooltip title={isLiked ? "Unlike" : "Like"} arrow>
                            <IconButton size="small" onClick={handleLike} sx={{ transition: "transform 0.12s" }}>
                                {isLiked
                                    ? <Favorite sx={{ fontSize: 17, color: "#e53935", animation: `${heartPop} 0.45s ease` }} />
                                    : <FavoriteBorder sx={{ fontSize: 17, color: "text.disabled" }} />
                                }
                            </IconButton>
                        </Tooltip>
                        <Typography variant="caption" sx={{ mr: 0.5, fontSize: "0.7rem", minWidth: 10, color: isLiked ? "#e53935" : "text.disabled", fontWeight: isLiked ? 700 : 400, transition: "color 0.2s" }}><AnimatedCount count={likeCount || 0} /></Typography>

                        <Tooltip title="Comments" arrow>
                            <IconButton size="small" component={Link} to={`/articles/${_id}/comments`}>
                                <ChatBubbleOutline sx={{ fontSize: 15, color: "text.disabled" }} />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="caption" color="text.disabled" sx={{ mr: 0.5, fontSize: "0.7rem", minWidth: 10 }}><AnimatedCount count={commentCount || 0} /></Typography>

                        <Tooltip title={isSaved ? "Unsave" : "Save"} arrow>
                            <IconButton size="small" onClick={handleSave} sx={{ transition: "transform 0.12s" }}>
                                {isSaved
                                    ? <Bookmark sx={{ fontSize: 17, color: "primary.main", animation: `${bookmarkPop} 0.45s ease` }} />
                                    : <BookmarkBorderOutlined sx={{ fontSize: 17, color: "text.disabled" }} />
                                }
                            </IconButton>
                        </Tooltip>

                        <Box className="article-read" sx={{ display: "flex", alignItems: "center", gap: 0.3, ml: 0.5, opacity: 0, transform: "translateX(-4px)", transition: "all 0.2s ease", color: "primary.main" }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.68rem" }}>Read</Typography>
                            <East sx={{ fontSize: 13 }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Article;
