import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
    HomeOutlined, Home,
    TrendingUpOutlined, TrendingUp,
    SearchOutlined, Search,
    PeopleOutline, People,
} from "@mui/icons-material";

const tabs = [
    { label: "Feed", path: "/", icon: HomeOutlined, activeIcon: Home },
    { label: "Trending", path: "/trending", icon: TrendingUpOutlined, activeIcon: TrendingUp },
    { label: "Search", path: "/search", icon: SearchOutlined, activeIcon: Search },
    { label: "Writers", path: "/users", icon: PeopleOutline, activeIcon: People },
];

const BottomNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                height: 60,
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(15,15,20,0.95)' : 'rgba(255,255,255,0.95)',
                backdropFilter: "blur(12px)",
                borderTop: "1px solid",
                borderColor: "divider",
            }}
        >
            {tabs.map((tab) => {
                const active = location.pathname === tab.path;
                const Icon = active ? tab.activeIcon : tab.icon;
                return (
                    <Box
                        key={tab.path}
                        onClick={() => navigate(tab.path)}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 0.3,
                            cursor: "pointer",
                            flex: 1,
                            py: 0.8,
                            transition: "all 0.15s ease",
                        }}
                    >
                        <Icon
                            sx={{
                                fontSize: 22,
                                color: active ? "primary.main" : "text.disabled",
                                transition: "color 0.15s ease",
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: "0.65rem",
                                fontWeight: active ? 700 : 500,
                                color: active ? "primary.main" : "text.disabled",
                                lineHeight: 1,
                            }}
                        >
                            {tab.label}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};

export default BottomNavBar;
