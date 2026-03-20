import React from "react";
import { Box, Typography, keyframes } from "@mui/material";

const float1 = keyframes`
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(6px, -8px); }
`;
const float2 = keyframes`
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-8px, 6px); }
`;
const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
`;

const PageBanner = ({ title, description, gradient = "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)", children }) => (
    <Box
        sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            background: gradient,
            px: { xs: 3, sm: 5 },
            py: { xs: 4, sm: 5 },
            mb: 4,
        }}
    >
        {/* Doodles */}
        <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            {/* Dotted circle */}
            <Box sx={{ position: "absolute", top: "10%", right: "8%", animation: `${float1} 7s ease-in-out infinite`, opacity: 0.2 }}>
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                    <circle cx="35" cy="35" r="30" stroke="white" strokeWidth="1" strokeDasharray="5 5" />
                </svg>
            </Box>
            {/* Cross */}
            <Box sx={{ position: "absolute", bottom: "15%", right: "20%", animation: `${float2} 5s ease-in-out 1s infinite`, opacity: 0.15 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <line x1="4" y1="12" x2="20" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="12" y1="4" x2="12" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </Box>
            {/* Squiggle */}
            <Box sx={{ position: "absolute", top: "50%", left: "60%", animation: `${float1} 8s ease-in-out 2s infinite`, opacity: 0.12 }}>
                <svg width="80" height="16" viewBox="0 0 80 16" fill="none">
                    <path d="M2 8 Q12 2, 22 8 Q32 14, 42 8 Q52 2, 62 8 Q72 14, 78 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
            </Box>
            {/* Dots */}
            <Box sx={{ position: "absolute", top: "20%", left: "75%", animation: `${float2} 6s ease-in-out infinite`, opacity: 0.2 }}>
                <svg width="5" height="5"><circle cx="2.5" cy="2.5" r="2.5" fill="white" /></svg>
            </Box>
            <Box sx={{ position: "absolute", bottom: "30%", left: "10%", animation: `${float1} 5s ease-in-out 1.5s infinite`, opacity: 0.15 }}>
                <svg width="4" height="4"><circle cx="2" cy="2" r="2" fill="white" /></svg>
            </Box>
            {/* Large faded circle */}
            <Box sx={{
                position: "absolute", width: 200, height: 200, borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.03)", top: -60, right: -40,
            }} />
            <Box sx={{
                position: "absolute", width: 120, height: 120, borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.02)", bottom: -30, left: "25%",
            }} />
        </Box>

        {/* Content */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
                variant="h4"
                sx={{
                    color: "white",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    mb: 0.5,
                    animation: `${fadeUp} 0.5s ease-out`,
                    fontSize: { xs: "1.5rem", sm: "2rem" },
                }}
            >
                {title}
            </Typography>
            {description && (
                <Typography
                    variant="body1"
                    sx={{
                        color: "rgba(255,255,255,0.6)",
                        animation: `${fadeUp} 0.5s ease-out 0.1s both`,
                        fontSize: { xs: "0.85rem", sm: "0.95rem" },
                        maxWidth: 480,
                    }}
                >
                    {description}
                </Typography>
            )}
            {children && (
                <Box sx={{ mt: 2.5, animation: `${fadeUp} 0.5s ease-out 0.2s both` }}>
                    {children}
                </Box>
            )}
        </Box>
    </Box>
);

export default PageBanner;
