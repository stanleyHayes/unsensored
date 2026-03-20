import React, { useState, useRef, useEffect } from "react";
import {
    AppBar, Toolbar, Button, Container, IconButton, Box, Avatar,
    Tooltip, Divider, Typography, TextField, InputAdornment,
    Popper, Paper, ClickAwayListener, Stack, Badge, keyframes,
} from "@mui/material";
import {
    AddOutlined, TrendingUpOutlined, SearchOutlined,
    LogoutOutlined, PersonOutline, DarkModeOutlined, LightModeOutlined,
    NotificationsOutlined, KeyboardArrowDown, ArticleOutlined,
    EditOutlined, LockOutlined, CloseOutlined, East,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useThemeMode } from "../../theme/theme-context";
import Logo from "../shared/logo";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
`;

const navItems = [
    { label: "Feed", path: "/" },
    { label: "Trending", path: "/trending", icon: <TrendingUpOutlined sx={{ fontSize: 16 }} /> },
    { label: "Explore", path: "/search", icon: <SearchOutlined sx={{ fontSize: 16 }} /> },
    { label: "Writers", path: "/users" },
];

const DesktopHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentUser = useSelector((s) => s.auth.currentUser);
    const { mode, toggleTheme } = useThemeMode();

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileRef = useRef(null);
    const searchRef = useRef(null);

    const isActive = (path) => location.pathname === path;

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate("/search");
            setSearchOpen(false);
            setSearchQuery("");
        }
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") { setSearchOpen(false); setProfileMenuOpen(false); }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    bgcolor: (t) => t.palette.mode === "dark" ? "rgba(15,15,20,0.85)" : "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    zIndex: 1200,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ height: 60, gap: 0.5 }}>
                        {/* Logo */}
                        <Box sx={{ mr: 3 }}>
                            <Logo size={26} />
                        </Box>

                        {/* Nav */}
                        <Box sx={{ display: "flex", gap: 0.3, flex: 1 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.path}
                                    component={Link}
                                    to={item.path}
                                    startIcon={item.icon}
                                    size="small"
                                    sx={{
                                        fontWeight: isActive(item.path) ? 700 : 500,
                                        fontSize: "0.8rem",
                                        color: isActive(item.path) ? "text.primary" : "text.secondary",
                                        position: "relative",
                                        px: 1.5,
                                        py: 0.6,
                                        borderRadius: 1.5,
                                        "&::after": isActive(item.path) ? {
                                            content: '""',
                                            position: "absolute",
                                            bottom: 0,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            width: 18,
                                            height: 2,
                                            borderRadius: 1,
                                            bgcolor: "primary.main",
                                        } : {},
                                        "&:hover": {
                                            bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                                            color: "text.primary",
                                        },
                                        transition: "all 0.15s ease",
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>

                        {/* Right side */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                            {/* Search toggle */}
                            <Tooltip title="Search (⌘K)" arrow>
                                <IconButton
                                    ref={searchRef}
                                    size="small"
                                    onClick={() => setSearchOpen(!searchOpen)}
                                    sx={{
                                        color: searchOpen ? "primary.main" : "text.disabled",
                                        bgcolor: searchOpen
                                            ? (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.1)" : "rgba(26,26,46,0.06)"
                                            : "transparent",
                                        "&:hover": { color: "text.primary" },
                                    }}
                                >
                                    <SearchOutlined sx={{ fontSize: 19 }} />
                                </IconButton>
                            </Tooltip>

                            {/* Notifications */}
                            <Tooltip title="Notifications" arrow>
                                <IconButton size="small" sx={{ color: "text.disabled", "&:hover": { color: "text.primary" } }}>
                                    <Badge variant="dot" color="error" invisible>
                                        <NotificationsOutlined sx={{ fontSize: 19 }} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            {/* Write */}
                            <Button
                                component={Link}
                                to="/article/new"
                                variant="contained"
                                startIcon={<AddOutlined sx={{ fontSize: 16 }} />}
                                size="small"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: "0.8rem",
                                    bgcolor: "primary.main",
                                    color: (t) => t.palette.mode === "dark" ? "#0f0f14" : "#fff",
                                    borderRadius: 6,
                                    px: 2,
                                    py: 0.6,
                                    ml: 0.5,
                                    boxShadow: "none",
                                    "&:hover": {
                                        bgcolor: "primary.light",
                                        boxShadow: (t) => t.palette.mode === "dark"
                                            ? "0 4px 14px rgba(167,139,250,0.25)"
                                            : "0 4px 14px rgba(26,26,46,0.15)",
                                    },
                                    transition: "all 0.2s ease",
                                }}
                            >
                                Write
                            </Button>

                            <Divider orientation="vertical" flexItem sx={{ mx: 0.8, my: 1.5 }} />

                            {/* Theme toggle */}
                            <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"} arrow>
                                <IconButton
                                    onClick={toggleTheme}
                                    size="small"
                                    sx={{ color: "text.disabled", "&:hover": { color: "text.primary" } }}
                                >
                                    {mode === "dark"
                                        ? <LightModeOutlined sx={{ fontSize: 18 }} />
                                        : <DarkModeOutlined sx={{ fontSize: 18 }} />
                                    }
                                </IconButton>
                            </Tooltip>

                            {/* Profile dropdown */}
                            <Box ref={profileRef}>
                                <Button
                                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    size="small"
                                    sx={{
                                        p: 0.4,
                                        pl: 0.5,
                                        pr: 0.8,
                                        borderRadius: 6,
                                        minWidth: 0,
                                        border: "1px solid",
                                        borderColor: profileMenuOpen ? "primary.main" : "divider",
                                        "&:hover": { borderColor: "primary.main" },
                                        transition: "border-color 0.15s ease",
                                    }}
                                >
                                    <Avatar
                                        src={currentUser?.avatar}
                                        sx={{
                                            width: 28, height: 28,
                                            fontSize: "0.75rem", fontWeight: 700,
                                            bgcolor: "primary.main",
                                        }}
                                    >
                                        {currentUser?.name?.charAt(0)?.toUpperCase()}
                                    </Avatar>
                                    <KeyboardArrowDown
                                        sx={{
                                            fontSize: 16,
                                            color: "text.disabled",
                                            ml: 0.3,
                                            transition: "transform 0.2s ease",
                                            transform: profileMenuOpen ? "rotate(180deg)" : "rotate(0)",
                                        }}
                                    />
                                </Button>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Search dropdown */}
            <Popper
                open={searchOpen}
                anchorEl={searchRef.current}
                placement="bottom-end"
                sx={{ zIndex: 1300, width: 380, mt: 0.5 }}
            >
                <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
                    <Paper
                        elevation={0}
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            p: 2,
                            animation: `${fadeIn} 0.15s ease-out`,
                            boxShadow: (t) => t.palette.mode === "dark"
                                ? "0 16px 48px rgba(0,0,0,0.5)"
                                : "0 16px 48px rgba(0,0,0,0.1)",
                        }}
                    >
                        <form onSubmit={handleSearchSubmit}>
                            <TextField
                                fullWidth
                                autoFocus
                                size="small"
                                placeholder="Search articles, tags, writers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start"><SearchOutlined sx={{ fontSize: 18, color: "text.disabled" }} /></InputAdornment>,
                                        endAdornment: searchQuery && (
                                            <InputAdornment position="end">
                                                <IconButton size="small" onClick={() => setSearchQuery("")}>
                                                    <CloseOutlined sx={{ fontSize: 14 }} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </form>
                        <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: "block" }}>
                            Press Enter to search · Esc to close
                        </Typography>
                    </Paper>
                </ClickAwayListener>
            </Popper>

            {/* Profile dropdown */}
            <Popper
                open={profileMenuOpen}
                anchorEl={profileRef.current}
                placement="bottom-end"
                sx={{ zIndex: 1300, width: 260, mt: 0.5 }}
            >
                <ClickAwayListener onClickAway={() => setProfileMenuOpen(false)}>
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
                        {/* User info */}
                        <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                {currentUser?.name}
                            </Typography>
                            <Typography variant="caption" color="text.disabled">
                                @{currentUser?.username}
                            </Typography>
                        </Box>

                        {/* Menu items */}
                        <Box sx={{ py: 0.5 }}>
                            {[
                                { icon: <PersonOutline sx={{ fontSize: 17 }} />, label: "Profile", to: `/profile/${currentUser?._id}` },
                                { icon: <ArticleOutlined sx={{ fontSize: 17 }} />, label: "My Articles", to: "/articles/me" },
                                { icon: <EditOutlined sx={{ fontSize: 17 }} />, label: "Edit Profile", to: "/edit-profile" },
                                { icon: <LockOutlined sx={{ fontSize: 17 }} />, label: "Change Password", to: "/auth/change-password" },
                            ].map((item) => (
                                <Box
                                    key={item.label}
                                    component={Link}
                                    to={item.to}
                                    onClick={() => setProfileMenuOpen(false)}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        px: 2.5,
                                        py: 1,
                                        textDecoration: "none",
                                        color: "text.primary",
                                        cursor: "pointer",
                                        transition: "background-color 0.1s ease",
                                        "&:hover": {
                                            bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                                        },
                                    }}
                                >
                                    <Box sx={{ color: "text.secondary", display: "flex" }}>{item.icon}</Box>
                                    <Typography variant="body2" sx={{ fontSize: "0.82rem" }}>{item.label}</Typography>
                                </Box>
                            ))}
                        </Box>

                        <Divider />

                        {/* Sign out */}
                        <Box
                            onClick={() => { localStorage.clear(); navigate("/auth/login"); }}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                px: 2.5,
                                py: 1.2,
                                cursor: "pointer",
                                color: "text.secondary",
                                transition: "all 0.1s ease",
                                "&:hover": { bgcolor: "error.main", color: "white", "& .logout-icon": { color: "white" } },
                            }}
                        >
                            <LogoutOutlined className="logout-icon" sx={{ fontSize: 17, color: "text.secondary", transition: "color 0.1s ease" }} />
                            <Typography variant="body2" sx={{ fontSize: "0.82rem" }}>Sign out</Typography>
                        </Box>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    );
};

export default DesktopHeader;
