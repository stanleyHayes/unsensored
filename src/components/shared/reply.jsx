import React from "react";
import { Avatar, Box, IconButton, Tooltip, Typography, keyframes } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleReplyLike } from "../../redux/replies/replies-reducer";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
`;

const CommentReply = ({ reply, index = 0, isLast = false }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((s) => s.auth.currentUser);
    const token = useSelector((s) => s.auth.token);

    const isLiked = reply?.likes?.some((l) => l.author === currentUser?._id);

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
                    src={reply?.author?.avatar}
                    sx={{
                        width: 28,
                        height: 28,
                        bgcolor: "primary.main",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        flexShrink: 0,
                    }}
                    onClick={() => navigate(`/profile/${reply?.author?._id}`)}
                >
                    {reply?.author?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                {!isLast && (
                    <Box
                        sx={{
                            width: 2,
                            flex: 1,
                            mt: 0.8,
                            mb: 0.5,
                            borderRadius: 1,
                            bgcolor: "divider",
                            minHeight: 12,
                        }}
                    />
                )}
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, pb: 2, minWidth: 0 }}>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8, mb: 0.3 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 700,
                            fontSize: "0.78rem",
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                        }}
                        onClick={() => navigate(`/profile/${reply?.author?._id}`)}
                    >
                        {reply?.author?.name}
                    </Typography>
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.68rem" }}>
                        {moment(reply?.createdAt).fromNow()}
                    </Typography>
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6, fontSize: "0.84rem", mb: 0.8 }}
                >
                    {reply?.text}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, ml: -0.5 }}>
                    <Tooltip title={isLiked ? "Unlike" : "Like"} arrow>
                        <IconButton
                            size="small"
                            onClick={() => dispatch(toggleReplyLike({ reply: reply._id, token }))}
                            sx={{ "&:active": { transform: "scale(0.85)" }, transition: "transform 0.1s" }}
                        >
                            {isLiked
                                ? <Favorite sx={{ fontSize: 14, color: "#e53935" }} />
                                : <FavoriteBorder sx={{ fontSize: 14, color: "text.disabled" }} />
                            }
                        </IconButton>
                    </Tooltip>
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.68rem" }}>
                        {reply?.likeCount || 0}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default CommentReply;
