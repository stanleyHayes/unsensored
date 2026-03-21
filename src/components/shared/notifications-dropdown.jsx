import React, { useEffect, useRef, useState } from "react";
import {
    Badge, Box, Button, ClickAwayListener, Divider, IconButton,
    Paper, Popper, Tooltip, Typography, Avatar, keyframes,
} from "@mui/material";
import { NotificationsOutlined, DoneAllOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchNotifications,
    markNotificationRead,
    markAllNotificationsRead,
} from "../../redux/notifications/notifications-reducer";
import moment from "moment";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
`;

const NOTIFICATION_TEXT = {
    LIKE_ARTICLE: "liked your article",
    LIKE_COMMENT: "liked your comment",
    LIKE_REPLY: "liked your reply",
    COMMENT_ARTICLE: "commented on your article",
    REPLY_COMMENT: "replied to your comment",
};

const NotificationsDropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const token = useSelector((s) => s.auth.token);
    const { notifications, unreadCount, loading } = useSelector((s) => s.notifications);

    useEffect(() => {
        if (token) dispatch(fetchNotifications({ token }));
    }, [dispatch, token]);

    const handleClick = (notification) => {
        if (!notification.read) {
            dispatch(markNotificationRead({ id: notification._id, token }));
        }
        setOpen(false);
        if (notification.article) {
            const articleId = typeof notification.article === "object" ? notification.article._id : notification.article;
            navigate(`/articles/${articleId}`);
        }
    };

    const handleMarkAll = () => {
        dispatch(markAllNotificationsRead({ token }));
    };

    return (
        <>
            <Tooltip title="Notifications" arrow>
                <IconButton
                    ref={anchorRef}
                    size="small"
                    onClick={() => setOpen(!open)}
                    sx={{
                        color: open ? "primary.main" : "text.primary",
                        border: "1.5px solid",
                        borderColor: open ? "primary.main" : "divider",
                        borderRadius: 1,
                        p: 0.6,
                        bgcolor: open
                            ? (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.1)" : "rgba(26,26,46,0.06)"
                            : (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                        "&:hover": { color: "primary.main", borderColor: "primary.main" },
                    }}
                >
                    <Badge
                        badgeContent={unreadCount}
                        color="error"
                        max={99}
                        sx={{
                            "& .MuiBadge-badge": {
                                fontSize: "0.6rem",
                                height: 16,
                                minWidth: 16,
                                fontWeight: 700,
                            },
                        }}
                    >
                        <NotificationsOutlined sx={{ fontSize: 19 }} />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                sx={{ zIndex: 1300, width: 360, mt: 0.5 }}
            >
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <Paper
                        elevation={0}
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            overflow: "hidden",
                            animation: `${fadeIn} 0.15s ease-out`,
                            boxShadow: (t) => t.palette.mode === "dark"
                                ? "0 16px 48px rgba(0,0,0,0.5)"
                                : "0 16px 48px rgba(0,0,0,0.1)",
                        }}
                    >
                        {/* Header */}
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.85rem" }}>
                                Notifications
                            </Typography>
                            {unreadCount > 0 && (
                                <Button
                                    size="small"
                                    startIcon={<DoneAllOutlined sx={{ fontSize: 14 }} />}
                                    onClick={handleMarkAll}
                                    sx={{ fontSize: "0.7rem", textTransform: "none", fontWeight: 600 }}
                                >
                                    Mark all read
                                </Button>
                            )}
                        </Box>

                        {/* List */}
                        <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                            {notifications.length === 0 ? (
                                <Box sx={{ py: 5, textAlign: "center" }}>
                                    <NotificationsOutlined sx={{ fontSize: 32, color: "text.disabled", mb: 1 }} />
                                    <Typography variant="body2" color="text.disabled" sx={{ fontSize: "0.82rem" }}>
                                        No notifications yet
                                    </Typography>
                                </Box>
                            ) : (
                                notifications.map((n) => (
                                    <Box
                                        key={n._id}
                                        onClick={() => handleClick(n)}
                                        sx={{
                                            display: "flex",
                                            gap: 1.5,
                                            px: 2,
                                            py: 1.5,
                                            cursor: "pointer",
                                            bgcolor: n.read ? "transparent" : (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.04)" : "rgba(26,26,46,0.02)",
                                            borderLeft: n.read ? "3px solid transparent" : "3px solid",
                                            borderColor: n.read ? "transparent" : "primary.main",
                                            transition: "background 0.15s",
                                            "&:hover": {
                                                bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                                            },
                                        }}
                                    >
                                        <Avatar
                                            src={n.sender?.avatar}
                                            sx={{ width: 34, height: 34, fontSize: "0.75rem", fontWeight: 700, bgcolor: "primary.main", flexShrink: 0 }}
                                        >
                                            {n.sender?.name?.charAt(0)?.toUpperCase()}
                                        </Avatar>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography variant="body2" sx={{ fontSize: "0.8rem", lineHeight: 1.4 }}>
                                                <Box component="span" sx={{ fontWeight: 700 }}>{n.sender?.name}</Box>
                                                {" "}{NOTIFICATION_TEXT[n.type] || "interacted with your content"}
                                                {n.article?.title && (
                                                    <Box component="span" sx={{ fontWeight: 600, fontStyle: "italic" }}>
                                                        {" "}"{n.article.title.length > 40 ? n.article.title.slice(0, 40) + "..." : n.article.title}"
                                                    </Box>
                                                )}
                                            </Typography>
                                            <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.68rem" }}>
                                                {moment(n.createdAt).fromNow()}
                                            </Typography>
                                        </Box>
                                        {!n.read && (
                                            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main", flexShrink: 0, mt: 0.8 }} />
                                        )}
                                    </Box>
                                ))
                            )}
                        </Box>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    );
};

export default NotificationsDropdown;
