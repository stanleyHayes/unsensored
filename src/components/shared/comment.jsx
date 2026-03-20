import React from "react";
import { Avatar, Box, IconButton, Tooltip, Typography, keyframes } from "@mui/material";
import { FavoriteBorder, Favorite, ChatBubbleOutline } from "@mui/icons-material";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleCommentLike } from "../../redux/comments/comments-reducer";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
`;

const Comment = ({ comment, index = 0 }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((s) => s.auth.currentUser);
    const token = useSelector((s) => s.auth.token);

    const isLiked = comment?.likes?.some((l) => l.author === currentUser?._id);

    return (
        <Box
            sx={{
                display: "flex",
                gap: 1.5,
                animation: `${fadeIn} 0.3s ease-out ${index * 0.04}s both`,
            }}
        >
            {/* Thread line + avatar */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                    src={comment?.author?.avatar}
                    sx={{
                        width: 34,
                        height: 34,
                        bgcolor: "primary.main",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        flexShrink: 0,
                    }}
                    onClick={() => navigate(`/profile/${comment?.author?._id}`)}
                >
                    {comment?.author?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                {/* Vertical thread line */}
                <Box
                    sx={{
                        width: 2,
                        flex: 1,
                        mt: 0.8,
                        mb: 0.5,
                        borderRadius: 1,
                        bgcolor: "divider",
                        minHeight: 16,
                    }}
                />
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, pb: 2.5, minWidth: 0 }}>
                {/* Name + time */}
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8, mb: 0.5 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                        }}
                        onClick={() => navigate(`/profile/${comment?.author?._id}`)}
                    >
                        {comment?.author?.name}
                    </Typography>
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.7rem" }}>
                        {moment(comment?.createdAt).fromNow()}
                    </Typography>
                </Box>

                {/* Text */}
                <Typography
                    variant="body2"
                    sx={{
                        lineHeight: 1.65,
                        fontSize: "0.88rem",
                        mb: 1,
                        cursor: "pointer",
                        "&:hover": { color: "text.primary" },
                    }}
                    color="text.secondary"
                    onClick={() => navigate(`/articles/${comment?.article}/comments/${comment?._id}/replies`)}
                >
                    {comment?.text}
                </Typography>

                {/* Actions */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, ml: -0.5 }}>
                    <Tooltip title={isLiked ? "Unlike" : "Like"} arrow>
                        <IconButton
                            size="small"
                            onClick={() => dispatch(toggleCommentLike({ comment: comment._id, token }))}
                            sx={{ "&:active": { transform: "scale(0.85)" }, transition: "transform 0.1s" }}
                        >
                            {isLiked
                                ? <Favorite sx={{ fontSize: 15, color: "#e53935" }} />
                                : <FavoriteBorder sx={{ fontSize: 15, color: "text.disabled" }} />
                            }
                        </IconButton>
                    </Tooltip>
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.7rem", mr: 1.5, minWidth: 10 }}>
                        {comment?.likeCount || 0}
                    </Typography>

                    <Tooltip title="Replies" arrow>
                        <IconButton
                            size="small"
                            component={Link}
                            to={`/articles/${comment?.article}/comments/${comment?._id}/replies`}
                        >
                            <ChatBubbleOutline sx={{ fontSize: 14, color: "text.disabled" }} />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.7rem", minWidth: 10 }}>
                        {comment?.replyCount || 0}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Comment;
