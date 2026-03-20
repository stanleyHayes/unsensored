import React from "react";
import { Avatar, Box, Typography, keyframes } from "@mui/material";
import { East } from "@mui/icons-material";
import { Link } from "react-router-dom";

const shimmer = keyframes`
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
`;

const User = ({ user }) => {
    const { name, articleCount, username, avatar, _id, profile } = user;

    return (
        <Box
            component={Link}
            to={`/profile/${_id}`}
            sx={{
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                color: "inherit",
                height: "100%",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: (t) => t.palette.mode === "dark"
                        ? "0 16px 40px rgba(0,0,0,0.4)"
                        : "0 16px 40px rgba(0,0,0,0.08)",
                    borderColor: "transparent",
                    "& .writer-banner": { opacity: 1 },
                    "& .writer-arrow": { opacity: 1, transform: "translateX(0)" },
                    "& .writer-avatar": {
                        boxShadow: (t) => t.palette.mode === "dark"
                            ? "0 0 0 3px rgba(167,139,250,0.3)"
                            : "0 0 0 3px rgba(48,43,99,0.15)",
                    },
                },
            }}
        >
            {/* Top decorative banner */}
            <Box
                sx={{
                    height: 56,
                    background: (t) => t.palette.mode === "dark"
                        ? "linear-gradient(135deg, #302b63 0%, #24243e 100%)"
                        : "linear-gradient(135deg, #1a1a2e 0%, #302b63 100%)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Doodle pattern inside banner */}
                <Box sx={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none" }}>
                    <svg width="100%" height="100%" viewBox="0 0 200 56" preserveAspectRatio="xMidYMid slice">
                        <circle cx="30" cy="15" r="12" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" fill="none" />
                        <circle cx="170" cy="40" r="8" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />
                        <line x1="80" y1="10" x2="120" y2="10" stroke="white" strokeWidth="0.5" strokeDasharray="4 6" />
                        <path d="M140 25 Q150 15, 160 25 Q170 35, 180 25" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="60" cy="42" r="2" fill="white" opacity="0.4" />
                        <circle cx="150" cy="12" r="1.5" fill="white" opacity="0.3" />
                    </svg>
                </Box>

                {/* Animated shimmer on hover */}
                <Box
                    className="writer-banner"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
                        backgroundSize: "200% 100%",
                        animation: `${shimmer} 2s ease-in-out infinite`,
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                    }}
                />
            </Box>

            {/* Avatar — overlapping banner */}
            <Box sx={{ px: 2.5, mt: -3.5 }}>
                <Avatar
                    className="writer-avatar"
                    src={avatar}
                    sx={{
                        width: 52,
                        height: 52,
                        bgcolor: "primary.main",
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        border: "3px solid",
                        borderColor: "background.paper",
                        transition: "box-shadow 0.25s ease",
                    }}
                >
                    {name?.charAt(0)?.toUpperCase()}
                </Avatar>
            </Box>

            {/* Content */}
            <Box sx={{ px: 2.5, pt: 1.5, pb: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 0.2 }} noWrap>
                    {name}
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ mb: 1.5, fontSize: "0.72rem" }}>
                    @{username}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: "0.8rem",
                        lineHeight: 1.55,
                        flex: 1,
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {profile || "This writer hasn't added a bio yet."}
                </Typography>

                {/* Footer */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.7rem" }}>
                        {articleCount || 0} article{articleCount !== 1 ? "s" : ""}
                    </Typography>
                    <Box
                        className="writer-arrow"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.3,
                            opacity: 0,
                            transform: "translateX(-4px)",
                            transition: "all 0.2s ease",
                            color: "primary.main",
                        }}
                    >
                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.7rem" }}>
                            View
                        </Typography>
                        <East sx={{ fontSize: 12 }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default User;
