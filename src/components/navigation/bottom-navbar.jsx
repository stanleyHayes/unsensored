import React from "react";
import { Box, Fab, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
    HomeOutlined, Home,
    TrendingUpOutlined, TrendingUp,
    ExploreOutlined, Explore,
    AddOutlined,
    MenuOutlined, Menu,
} from "@mui/icons-material";

const tabs = [
    { label: "Feed", path: "/", icon: HomeOutlined, activeIcon: Home },
    { label: "Trending", path: "/trending", icon: TrendingUpOutlined, activeIcon: TrendingUp },
    { label: "Write", path: "/article/new", fab: true },
    { label: "Explore", path: "/search", icon: ExploreOutlined, activeIcon: Explore },
    { label: "More", path: "/more", icon: MenuOutlined, activeIcon: Menu },
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

                if (tab.fab) {
                    return (
                        <Box key={tab.label} sx={{ flex: 1, display: "flex", justifyContent: "center", mt: -2.5 }}>
                            <Fab
                                size="small"
                                color="primary"
                                onClick={() => navigate(tab.path)}
                                sx={{
                                    boxShadow: (t) => t.palette.mode === "dark"
                                        ? "0 4px 14px rgba(167,139,250,0.3)"
                                        : "0 4px 14px rgba(26,26,46,0.2)",
                                }}
                            >
                                <AddOutlined />
                            </Fab>
                        </Box>
                    );
                }

                const Icon = active ? tab.activeIcon : tab.icon;
                return (
                    <Box
                        key={tab.label}
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
