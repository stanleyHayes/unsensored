import React from "react";
import {
    Box, Typography, Avatar, Divider, List, ListItemButton,
    ListItemIcon, ListItemText, IconButton,
} from "@mui/material";
import {
    HomeOutlined, PersonOutline, ArticleOutlined, EditOutlined,
    LockOutlined, LogoutOutlined, CloseOutlined, DeleteOutline,
    DarkModeOutlined, LightModeOutlined, TrendingUpOutlined,
    ExploreOutlined, PeopleOutlined, ChatBubbleOutline, FavoriteBorder,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useThemeMode } from "../../theme/theme-context";

const DrawerContent = ({ handleClose }) => {
    const currentUser = useSelector((s) => s.auth.currentUser);
    const navigate = useNavigate();
    const { mode, toggleTheme } = useThemeMode();

    const handleLogout = () => {
        localStorage.clear();
        handleClose();
        navigate("/auth/login");
    };

    const menuItems = [
        { label: "Home", icon: <HomeOutlined />, to: "/" },
        { label: "Trending", icon: <TrendingUpOutlined />, to: "/trending" },
        { label: "Explore", icon: <ExploreOutlined />, to: "/search" },
        { label: "Writers", icon: <PeopleOutlined />, to: "/users" },
        { label: "Profile", icon: <PersonOutline />, to: `/profile/${currentUser?._id}` },
        { label: "My Articles", icon: <ArticleOutlined />, to: "/articles/me" },
        { label: "Edit Profile", icon: <EditOutlined />, to: "/edit-profile" },
        { label: "Change Password", icon: <LockOutlined />, to: "/auth/change-password" },
    ];

    return (
        <Box sx={{ width: 300, height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={handleClose} size="small">
                    <CloseOutlined fontSize="small" />
                </IconButton>
            </Box>

            {/* User info */}
            <Box sx={{ px: 3, pb: 3, textAlign: "center" }}>
                <Avatar
                    src={currentUser?.avatar}
                    sx={{
                        width: 72,
                        height: 72,
                        mx: "auto",
                        mb: 1.5,
                        bgcolor: "#1a1a2e",
                        fontSize: "1.5rem",
                    }}
                >
                    {currentUser?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography variant="subtitle1" fontWeight={700}>
                    {currentUser?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    @{currentUser?.username}
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
                    {[
                        { value: currentUser?.articleCount || 0, label: "Articles", icon: <ArticleOutlined sx={{ fontSize: 16 }} /> },
                        { value: currentUser?.commentCount || 0, label: "Comments", icon: <ChatBubbleOutline sx={{ fontSize: 16 }} /> },
                        { value: currentUser?.likeCount || 0, label: "Likes", icon: <FavoriteBorder sx={{ fontSize: 16 }} /> },
                    ].map((stat) => (
                        <Box
                            key={stat.label}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 0.3,
                                py: 1,
                                borderRadius: 1.5,
                                border: "1px solid",
                                borderColor: "divider",
                                bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
                            }}
                        >
                            <Box sx={{ color: "text.disabled" }}>{stat.icon}</Box>
                            <Typography variant="body2" sx={{ fontWeight: 800, fontSize: "0.9rem", lineHeight: 1 }}>
                                {stat.value >= 1_000_000 ? (stat.value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
                                    : stat.value >= 1_000 ? (stat.value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
                                    : stat.value}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.62rem", fontWeight: 500 }}>
                                {stat.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Divider />

            {/* Menu */}
            <List sx={{ flex: 1, px: 1, py: 1.5 }}>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.label}
                        component={Link}
                        to={item.to}
                        onClick={handleClose}
                        sx={{
                            borderRadius: 2,
                            mb: 0.3,
                            py: 1.2,
                            "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                                fontSize: "0.9rem",
                                fontWeight: 500,
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>

            <Divider />

            {/* Bottom actions */}
            <List sx={{ px: 1, py: 1 }}>
                <ListItemButton
                    onClick={toggleTheme}
                    sx={{ borderRadius: 2, py: 1.2 }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>
                        {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
                    </ListItemIcon>
                    <ListItemText
                        primary={mode === "dark" ? "Light mode" : "Dark mode"}
                        primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
                    />
                </ListItemButton>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{ borderRadius: 2, py: 1.2 }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>
                        <LogoutOutlined />
                    </ListItemIcon>
                    <ListItemText
                        primary="Sign out"
                        primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
                    />
                </ListItemButton>
                <ListItemButton
                    sx={{ borderRadius: 2, py: 1.2, color: "error.main" }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: "error.main" }}>
                        <DeleteOutline />
                    </ListItemIcon>
                    <ListItemText
                        primary="Delete Account"
                        primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
                    />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default DrawerContent;
