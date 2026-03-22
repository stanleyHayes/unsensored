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
    InfoOutlined, GavelOutlined, PrivacyTipOutlined,
    LoginOutlined, PersonAddOutlined,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/auth-reducer";
import { useThemeMode } from "../../theme/theme-context";
import Logo from "../shared/logo";
import NotificationsDropdown from "../shared/notifications-dropdown";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
`;

const navItems = [
    { label: "Pulse", path: "/" },
    { label: "Buzzing", path: "/trending" },
    { label: "Rabbit Hole", path: "/search" },
    { label: "Voices", path: "/users" },
];

const DesktopHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((s) => s.auth.currentUser);
    const { mode, toggleTheme } = useThemeMode();

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileRef = useRef(null);
    const searchRef = useRef(null);
    const navContainerRef = useRef(null);
    const navRefs = useRef({});
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

    const isActive = (path) => location.pathname === path;

    // Animate pill indicator to the active nav item
    useEffect(() => {
        const activeItem = navItems.find((item) => item.path === location.pathname);
        if (!activeItem || !navContainerRef.current) {
            setPillStyle((prev) => ({ ...prev, opacity: 0 }));
            return;
        }
        const el = navRefs.current[activeItem.path];
        const container = navContainerRef.current;
        if (el && container) {
            const elRect = el.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            setPillStyle({
                left: elRect.left - containerRect.left,
                width: elRect.width,
                opacity: 1,
            });
        }
    }, [location.pathname]);

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
                            <Logo size={30} />
                        </Box>

                        {/* Nav */}
                        <Box sx={{ flex: 1 }}>
                        <Box
                            ref={navContainerRef}
                            sx={{
                                display: "inline-flex",
                                gap: 0.3,
                                position: "relative",
                                bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                                borderRadius: 8,
                                p: 0.5,
                                border: "1px solid",
                                borderColor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                            }}
                        >
                            {/* Sliding pill indicator */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 4,
                                    left: pillStyle.left,
                                    width: pillStyle.width,
                                    height: "calc(100% - 8px)",
                                    borderRadius: 7,
                                    bgcolor: "primary.main",
                                    opacity: pillStyle.opacity,
                                    transition: "left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease",
                                    zIndex: 0,
                                    boxShadow: (t) => pillStyle.opacity
                                        ? t.palette.mode === "dark"
                                            ? "0 2px 12px rgba(124,58,237,0.4)"
                                            : "0 2px 12px rgba(124,58,237,0.25)"
                                        : "none",
                                }}
                            />
                            {navItems.map((item) => (
                                <Button
                                    key={item.path}
                                    ref={(el) => { navRefs.current[item.path] = el; }}
                                    component={Link}
                                    to={item.path}
                                    size="small"
                                    sx={{
                                        fontWeight: isActive(item.path) ? 700 : 500,
                                        fontSize: "0.8rem",
                                        color: isActive(item.path) ? "white" : "text.secondary",
                                        px: 2,
                                        py: 0.6,
                                        borderRadius: 7,
                                        bgcolor: "transparent",
                                        position: "relative",
                                        zIndex: 1,
                                        "&:hover": {
                                            bgcolor: isActive(item.path)
                                                ? "transparent"
                                                : (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
                                            color: isActive(item.path) ? "white" : "text.primary",
                                        },
                                        transition: "color 0.2s ease, font-weight 0.2s ease",
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                        </Box>

                        {/* Right side */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            {/* Search toggle */}
                            <Tooltip title="Search" arrow>
                                <IconButton
                                    ref={searchRef}
                                    size="small"
                                    onClick={() => setSearchOpen(!searchOpen)}
                                    sx={{
                                        color: searchOpen ? "primary.main" : "text.secondary",
                                        bgcolor: searchOpen
                                            ? (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.1)" : "rgba(26,26,46,0.06)"
                                            : "transparent",
                                        "&:hover": { color: "primary.main", bgcolor: (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.08)" : "rgba(26,26,46,0.04)" },
                                        transition: "all 0.15s ease",
                                    }}
                                >
                                    <SearchOutlined sx={{ fontSize: 20 }} />
                                </IconButton>
                            </Tooltip>

                            {/* Notifications (auth only) */}
                            {currentUser && <NotificationsDropdown />}

                            {/* Write (auth only) */}
                            {currentUser && (
                                <Tooltip title="Write" arrow>
                                    <IconButton
                                        component={Link}
                                        to="/article/new"
                                        size="small"
                                        sx={{
                                            color: isActive("/article/new") ? "primary.main" : "text.secondary",
                                            bgcolor: isActive("/article/new")
                                                ? (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.1)" : "rgba(26,26,46,0.06)"
                                                : "transparent",
                                            "&:hover": { color: "primary.main", bgcolor: (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.08)" : "rgba(26,26,46,0.04)" },
                                            transition: "all 0.15s ease",
                                        }}
                                    >
                                        <EditOutlined sx={{ fontSize: 20 }} />
                                    </IconButton>
                                </Tooltip>
                            )}

                            <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 1.5 }} />

                            {/* Theme toggle */}
                            <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"} arrow>
                                <IconButton
                                    onClick={toggleTheme}
                                    size="small"
                                    sx={{
                                        color: "text.secondary",
                                        "&:hover": { color: "primary.main", bgcolor: (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.08)" : "rgba(26,26,46,0.04)" },
                                        transition: "all 0.15s ease",
                                    }}
                                >
                                    {mode === "dark"
                                        ? <LightModeOutlined sx={{ fontSize: 20 }} />
                                        : <DarkModeOutlined sx={{ fontSize: 20 }} />
                                    }
                                </IconButton>
                            </Tooltip>

                            {/* Profile dropdown */}
                            <Box ref={profileRef}>
                                {currentUser ? (
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
                                                color: "white",
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
                                ) : (
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Button
                                            component={Link}
                                            to="/auth/login"
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                borderColor: "divider",
                                                color: "text.primary",
                                                fontSize: "0.78rem",
                                                fontWeight: 600,
                                                px: 2,
                                                borderRadius: 2,
                                                "&:hover": { borderColor: "primary.main", color: "primary.main" },
                                                transition: "all 0.15s ease",
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                        <Button
                                            component={Link}
                                            to="/auth/register"
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                boxShadow: "none",
                                                fontSize: "0.78rem",
                                                fontWeight: 600,
                                                px: 2,
                                                borderRadius: 2,
                                                background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                                                "&:hover": {
                                                    background: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)",
                                                    boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
                                                },
                                                transition: "all 0.2s ease",
                                            }}
                                        >
                                            Get Started
                                        </Button>
                                    </Stack>
                                )}
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

            {/* Profile dropdown (auth only) */}
            <Popper
                open={!!currentUser && profileMenuOpen}
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
                                { icon: <InfoOutlined sx={{ fontSize: 17 }} />, label: "About Unsensored", to: "/about" },
                                { icon: <GavelOutlined sx={{ fontSize: 17 }} />, label: "Terms of Service", to: "/terms" },
                                { icon: <PrivacyTipOutlined sx={{ fontSize: 17 }} />, label: "Privacy Policy", to: "/privacy" },
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
                            onClick={() => { dispatch(logout()); setProfileAnchor(null); }}
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
