import React from "react";
import {
    AppBar, Toolbar, IconButton, Box, Avatar,
} from "@mui/material";
import { MenuOutlined, EditOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../shared/logo";
import NotificationsDropdown from "../shared/notifications-dropdown";

const MobileHeader = ({ handleOpen }) => {
    const currentUser = useSelector((s) => s.auth.currentUser);

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                bgcolor: (t) => t.palette.mode === "dark" ? "rgba(15,15,20,0.92)" : "rgba(255,255,255,0.92)",
                backdropFilter: "blur(20px) saturate(180%)",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            <Toolbar sx={{ height: 56, justifyContent: "space-between", px: 1.5 }}>
                {/* Left — menu + logo */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                        onClick={handleOpen}
                        size="small"
                        sx={{
                            color: "text.secondary",
                            "&:hover": { color: "text.primary" },
                            transition: "color 0.15s ease",
                        }}
                    >
                        <MenuOutlined sx={{ fontSize: 22 }} />
                    </IconButton>
                    <Logo size={26} />
                </Box>

                {/* Right — actions */}
                <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                    {currentUser && (
                        <>
                            <IconButton
                                component={Link}
                                to="/article/new"
                                size="small"
                                sx={{
                                    color: "text.secondary",
                                    "&:hover": { color: "primary.main" },
                                    transition: "color 0.15s ease",
                                }}
                            >
                                <EditOutlined sx={{ fontSize: 20 }} />
                            </IconButton>
                            <NotificationsDropdown />
                        </>
                    )}
                    {currentUser ? (
                        <Avatar
                            component={Link}
                            to={`/profile/${currentUser?._id}`}
                            src={currentUser?.avatar}
                            sx={{
                                width: 30, height: 30,
                                fontSize: "0.72rem",
                                bgcolor: "primary.main",
                                color: "white",
                                fontWeight: 700,
                                cursor: "pointer",
                                border: "2px solid",
                                borderColor: "divider",
                                ml: 0.3,
                            }}
                        >
                            {currentUser?.name?.charAt(0)?.toUpperCase()}
                        </Avatar>
                    ) : (
                        <IconButton
                            component={Link}
                            to="/auth/login"
                            size="small"
                            sx={{
                                color: "primary.main",
                                bgcolor: (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.1)" : "rgba(124,58,237,0.08)",
                                "&:hover": { bgcolor: (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.18)" : "rgba(124,58,237,0.14)" },
                                borderRadius: 2,
                                px: 1.5,
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                transition: "all 0.15s ease",
                            }}
                        >
                            Sign In
                        </IconButton>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MobileHeader;
