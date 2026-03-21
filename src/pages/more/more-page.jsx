import React from "react";
import {
    Avatar, Box, Divider, IconButton, List, ListItemButton, ListItemIcon,
    ListItemText, Typography, keyframes,
} from "@mui/material";
import {
    PersonOutline, EditOutlined, ArticleOutlined, BookmarkBorderOutlined,
    LockOutlined, InfoOutlined, GavelOutlined, PrivacyTipOutlined,
    LogoutOutlined, DarkModeOutlined, LightModeOutlined, PeopleOutlined,
    East, GitHub, LinkedIn, Email, Language,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useThemeMode } from "../../theme/theme-context";
import Layout from "../../components/layout/layout";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
`;

const MorePage = () => {
    const navigate = useNavigate();
    const currentUser = useSelector((s) => s.auth.currentUser);
    const { mode, toggleTheme } = useThemeMode();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/auth/login");
    };

    const menuItems = [
        { label: "My Profile", icon: <PersonOutline />, to: `/profile/${currentUser?._id}` },
        { label: "My Articles", icon: <ArticleOutlined />, to: "/articles/me" },
        { label: "Bookmarks", icon: <BookmarkBorderOutlined />, to: `/profile/${currentUser?._id}` },
        { label: "Writers", icon: <PeopleOutlined />, to: "/users" },
        { label: "Edit Profile", icon: <EditOutlined />, to: "/edit-profile" },
        { label: "Change Password", icon: <LockOutlined />, to: "/auth/change-password" },
    ];

    const legalItems = [
        { label: "About Unsensored", icon: <InfoOutlined />, to: "/about" },
        { label: "Terms of Service", icon: <GavelOutlined />, to: "/terms" },
        { label: "Privacy Policy", icon: <PrivacyTipOutlined />, to: "/privacy" },
    ];

    return (
        <Layout>
            <Box sx={{ animation: `${fadeIn} 0.3s ease-out` }}>
                {/* Profile hero — matches profile page style */}
                <Box sx={{ mb: 3 }}>
                    {/* Banner */}
                    <Box
                        sx={{
                            height: { xs: 120, sm: 160 },
                            borderRadius: 3,
                            background: "linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 100%)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.15 }}>
                            <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid slice">
                                <circle cx="520" cy="40" r="35" stroke="white" strokeWidth="1" strokeDasharray="5 5" fill="none" />
                                <circle cx="80" cy="150" r="20" stroke="white" strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
                                <path d="M200 30 Q220 10, 240 30 Q260 50, 280 30" stroke="white" strokeWidth="1" fill="none" />
                                <line x1="400" y1="140" x2="450" y2="140" stroke="white" strokeWidth="0.8" strokeDasharray="4 6" />
                                <circle cx="350" cy="50" r="3" fill="white" opacity="0.4" />
                                <circle cx="150" cy="80" r="2" fill="white" opacity="0.3" />
                                <circle cx="500" cy="160" r="2.5" fill="white" opacity="0.35" />
                            </svg>
                        </Box>
                        <Box sx={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.03)", top: -60, right: -40 }} />
                        <Box sx={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.04)", bottom: -30, left: "30%" }} />
                    </Box>

                    {/* Avatar + info */}
                    <Box
                        sx={{ px: 2, mt: -5, pt: 0, cursor: "pointer" }}
                        onClick={() => navigate(`/profile/${currentUser?._id}`)}
                    >
                        <Avatar
                            src={currentUser?.avatar}
                            sx={{
                                width: 80,
                                height: 80,
                                border: "4px solid",
                                borderColor: "background.default",
                                bgcolor: "primary.main",
                                fontSize: "1.8rem",
                                fontWeight: 800,
                                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                            }}
                        >
                            {currentUser?.name?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                                    {currentUser?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.82rem" }}>
                                    @{currentUser?.username}
                                </Typography>
                            </Box>
                            <East sx={{ fontSize: 18, color: "text.disabled" }} />
                        </Box>
                    </Box>
                </Box>

                {/* Main links */}
                <Box sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", overflow: "hidden", mb: 2 }}>
                    <List disablePadding>
                        {menuItems.map((item, i) => (
                            <React.Fragment key={item.label}>
                                <ListItemButton component={Link} to={item.to} sx={{ py: 1.5, px: 2.5 }}>
                                    <ListItemIcon sx={{ minWidth: 38, color: "text.secondary" }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{ fontSize: "0.88rem", fontWeight: 500 }}
                                    />
                                </ListItemButton>
                                {i < menuItems.length - 1 && <Divider sx={{ mx: 2.5 }} />}
                            </React.Fragment>
                        ))}
                    </List>
                </Box>

                {/* Theme toggle */}
                <Box sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", overflow: "hidden", mb: 2 }}>
                    <ListItemButton onClick={toggleTheme} sx={{ py: 1.5, px: 2.5 }}>
                        <ListItemIcon sx={{ minWidth: 38, color: "text.secondary" }}>
                            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
                        </ListItemIcon>
                        <ListItemText
                            primary={mode === "dark" ? "Light mode" : "Dark mode"}
                            primaryTypographyProps={{ fontSize: "0.88rem", fontWeight: 500 }}
                        />
                    </ListItemButton>
                </Box>

                {/* Legal links */}
                <Box sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", overflow: "hidden", mb: 2 }}>
                    <List disablePadding>
                        {legalItems.map((item, i) => (
                            <React.Fragment key={item.label}>
                                <ListItemButton component={Link} to={item.to} sx={{ py: 1.5, px: 2.5 }}>
                                    <ListItemIcon sx={{ minWidth: 38, color: "text.disabled" }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{ fontSize: "0.85rem", fontWeight: 500, color: "text.secondary" }}
                                    />
                                </ListItemButton>
                                {i < legalItems.length - 1 && <Divider sx={{ mx: 2.5 }} />}
                            </React.Fragment>
                        ))}
                    </List>
                </Box>

                {/* Sign out */}
                <Box sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", overflow: "hidden", mb: 2 }}>
                    <ListItemButton onClick={handleLogout} sx={{ py: 1.5, px: 2.5 }}>
                        <ListItemIcon sx={{ minWidth: 38, color: "error.main" }}>
                            <LogoutOutlined />
                        </ListItemIcon>
                        <ListItemText
                            primary="Sign out"
                            primaryTypographyProps={{ fontSize: "0.88rem", fontWeight: 500, color: "error.main" }}
                        />
                    </ListItemButton>
                </Box>

                {/* Developer */}
                <Box sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", overflow: "hidden", mb: 2, p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <Avatar
                            src="/assets/stanley.jpg"
                            sx={{ width: 56, height: 56, bgcolor: "#302b63", fontSize: "1.3rem", fontWeight: 700 }}
                        >
                            SH
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.3 }}>
                                Stanley Hayford
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                                Full-Stack Software Engineer
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.82rem", lineHeight: 1.7, mb: 2 }}>
                        Driven by curiosity, ambition, and a constant need to build things that matter.
                        Enjoys thinking deeply about problems, challenging norms, and pushing limits — whether
                        in technology, business, or life.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                        <IconButton size="small" component="a" href="https://github.com/stanleyHayes" target="_blank" sx={{ color: "text.disabled", "&:hover": { color: "text.primary" } }}>
                            <GitHub sx={{ fontSize: 18 }} />
                        </IconButton>
                        <IconButton size="small" component="a" href="https://www.linkedin.com/in/stanley-asoku-hayford" target="_blank" sx={{ color: "text.disabled", "&:hover": { color: "#0A66C2" } }}>
                            <LinkedIn sx={{ fontSize: 18 }} />
                        </IconButton>
                        <IconButton size="small" component="a" href="https://x.com/sa_hayford" target="_blank" sx={{ color: "text.disabled", "&:hover": { color: "text.primary" } }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </IconButton>
                        <IconButton size="small" component="a" href="https://instagram.com/hayford.stanley" target="_blank" sx={{ color: "text.disabled", "&:hover": { color: "#E4405F" } }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </IconButton>
                        <IconButton size="small" component="a" href="mailto:hayfordstanley@gmail.com" sx={{ color: "text.disabled", "&:hover": { color: "text.primary" } }}>
                            <Email sx={{ fontSize: 18 }} />
                        </IconButton>
                        <IconButton size="small" component="a" href="https://hayfordstanley.vercel.app" target="_blank" sx={{ color: "text.disabled", "&:hover": { color: "primary.main" } }}>
                            <Language sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Box>
                </Box>

                <Typography variant="caption" color="text.disabled" sx={{ display: "block", textAlign: "center", mt: 3, mb: 2, fontSize: "0.72rem" }}>
                    Unsensored v1.0 · Built by Stanley Hayford
                </Typography>
            </Box>
        </Layout>
    );
};

export default MorePage;
