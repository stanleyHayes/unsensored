import React from "react";
import {
    AppBar, Toolbar, Typography, IconButton, Box, Avatar,
} from "@mui/material";
import { MenuOutlined, AddOutlined } from "@mui/icons-material";
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
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(15,15,20,0.9)' : 'rgba(255,255,255,0.9)',
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            <Toolbar sx={{ height: 56, justifyContent: "space-between" }}>
                <IconButton onClick={handleOpen} edge="start" sx={{ color: "text.primary" }}>
                    <MenuOutlined />
                </IconButton>

                <Box sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                    <Logo size={24} />
                </Box>

                <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                    <IconButton component={Link} to="/article/new" size="small" sx={{ color: "text.primary" }}>
                        <AddOutlined />
                    </IconButton>
                    <NotificationsDropdown />
                    <IconButton component={Link} to={`/profile/${currentUser?._id}`} size="small">
                        <Avatar
                            src={currentUser?.avatar}
                            sx={{ width: 28, height: 28, fontSize: "0.75rem", bgcolor: "#1a1a2e" }}
                        >
                            {currentUser?.name?.charAt(0)?.toUpperCase()}
                        </Avatar>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MobileHeader;
