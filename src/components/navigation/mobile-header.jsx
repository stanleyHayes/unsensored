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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                        onClick={handleOpen}
                        size="small"
                        sx={{
                            color: "text.primary",
                            border: "1.5px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                            p: 0.6,
                            bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                        }}
                    >
                        <MenuOutlined sx={{ fontSize: 20 }} />
                    </IconButton>
                    <Logo size={36} />
                </Box>

                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <IconButton
                        component={Link}
                        to="/article/new"
                        size="small"
                        sx={{
                            color: "text.primary",
                            border: "1.5px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                            p: 0.6,
                            bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                        }}
                    >
                        <AddOutlined sx={{ fontSize: 20 }} />
                    </IconButton>
                    <NotificationsDropdown />
                    <Avatar
                        component={Link}
                        to={`/profile/${currentUser?._id}`}
                        src={currentUser?.avatar}
                        sx={{ width: 32, height: 32, fontSize: "0.7rem", bgcolor: "primary.main", fontWeight: 700, borderRadius: 1, cursor: "pointer" }}
                    >
                        {currentUser?.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MobileHeader;
