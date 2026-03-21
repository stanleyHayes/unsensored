import React, { useState } from "react";
import { Avatar, Box, IconButton, TextField, Tooltip, Typography, keyframes } from "@mui/material";
import { FavoriteBorder, Favorite, EditOutlined, Check, Close, DeleteOutline } from "@mui/icons-material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleReplyLike, updateReply, deleteReply } from "../../redux/replies/replies-reducer";
import { playLikeSound, playUnlikeSound, spawnHeartBurst } from "../../utils/like-effects";
import AnimatedCount from "./animated-count";

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
    const isOwner = currentUser?._id === reply?.author?._id;

    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(reply?.text || "");

    const handleSaveEdit = () => {
        if (!editText.trim() || editText.trim() === reply?.text) {
            setEditing(false);
            return;
        }
        dispatch(updateReply({ replyId: reply._id, reply: { text: editText.trim() }, token }));
        setEditing(false);
    };

    const handleDelete = () => {
        dispatch(deleteReply({ replyId: reply._id, token }));
    };

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
                    {isOwner && !editing && (
                        <Box sx={{ display: "flex", ml: "auto", gap: 0.2 }}>
                            <Tooltip title="Edit" arrow>
                                <IconButton size="small" onClick={() => { setEditing(true); setEditText(reply?.text || ""); }}>
                                    <EditOutlined sx={{ fontSize: 13, color: "text.disabled" }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" arrow>
                                <IconButton size="small" onClick={handleDelete}>
                                    <DeleteOutline sx={{ fontSize: 13, color: "text.disabled" }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                </Box>

                {editing ? (
                    <Box sx={{ mb: 0.8 }}>
                        <TextField
                            fullWidth
                            multiline
                            size="small"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            autoFocus
                            sx={{ "& .MuiInputBase-input": { fontSize: "0.84rem" } }}
                        />
                        <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
                            <IconButton size="small" onClick={handleSaveEdit} color="primary">
                                <Check sx={{ fontSize: 15 }} />
                            </IconButton>
                            <IconButton size="small" onClick={() => setEditing(false)}>
                                <Close sx={{ fontSize: 15, color: "text.disabled" }} />
                            </IconButton>
                        </Box>
                    </Box>
                ) : (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6, fontSize: "0.84rem", mb: 0.8 }}
                    >
                        {reply?.text}
                    </Typography>
                )}

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, ml: -0.5 }}>
                    <Tooltip title={isLiked ? "Unlike" : "Like"} arrow>
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                if (!isLiked) { playLikeSound(); spawnHeartBurst(e); } else { playUnlikeSound(); }
                                dispatch(toggleReplyLike({ reply: reply._id, token }));
                            }}
                            sx={{ "&:active": { transform: "scale(0.85)" }, transition: "transform 0.1s" }}
                        >
                            {isLiked
                                ? <Favorite sx={{ fontSize: 14, color: "#e53935" }} />
                                : <FavoriteBorder sx={{ fontSize: 14, color: "text.disabled" }} />
                            }
                        </IconButton>
                    </Tooltip>
                    <Typography variant="caption" sx={{ fontSize: "0.68rem", color: isLiked ? "#e53935" : "text.disabled", fontWeight: isLiked ? 700 : 400, transition: "color 0.2s" }}>
                        <AnimatedCount count={reply?.likeCount || 0} />
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default CommentReply;
