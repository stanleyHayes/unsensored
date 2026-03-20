import React from "react";
import { Box, Typography, keyframes } from "@mui/material";
import Logo from "../../components/shared/logo";

// --- Keyframes ---
const gradientShift = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const float = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
`;

const drawLine = keyframes`
    from { stroke-dashoffset: 800; }
    to { stroke-dashoffset: 0; }
`;

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

export { fadeUp };

// --- Brand Panel (left side on desktop) ---
const BrandPanel = ({ tagline }) => (
    <Box
        sx={{
            display: { xs: "none", md: "flex" },
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #1a1a3e)",
            backgroundSize: "400% 400%",
            animation: `${gradientShift} 12s ease infinite`,
            p: 6,
        }}
    >
        {/* Abstract line art */}
        <Box sx={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none" }}>
            <svg width="100%" height="100%" viewBox="0 0 500 600" fill="none" preserveAspectRatio="xMidYMid slice">
                <path
                    d="M50 100 Q150 50 250 150 T450 200 Q400 350 300 400 T100 500 Q50 400 50 300 Z"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                    strokeDasharray="800"
                    fill="none"
                    style={{ animation: `${drawLine} 4s ease forwards` }}
                />
                <circle cx="250" cy="300" r="120" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="800"
                    fill="none" style={{ animation: `${drawLine} 5s ease 0.5s forwards` }} />
                <circle cx="250" cy="300" r="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="800"
                    fill="none" style={{ animation: `${drawLine} 4s ease 1s forwards` }} />
                <path
                    d="M100 500 Q200 400 350 450 T500 350"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                    strokeDasharray="800"
                    fill="none"
                    style={{ animation: `${drawLine} 3s ease 1.5s forwards` }}
                />
            </svg>
        </Box>

        {/* Floating dots */}
        {[
            { top: "15%", left: "20%", size: 6, delay: 0, duration: 4 },
            { top: "30%", right: "25%", size: 4, delay: 1, duration: 5 },
            { top: "65%", left: "30%", size: 5, delay: 2, duration: 3.5 },
            { top: "80%", right: "20%", size: 3, delay: 0.5, duration: 4.5 },
            { top: "45%", left: "15%", size: 4, delay: 1.5, duration: 5.5 },
        ].map((dot, i) => (
            <Box
                key={i}
                sx={{
                    position: "absolute",
                    top: dot.top,
                    left: dot.left,
                    right: dot.right,
                    width: dot.size,
                    height: dot.size,
                    borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,0.3)",
                    animation: `${float} ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
                    pointerEvents: "none",
                }}
            />
        ))}

        {/* Brand content */}
        <Box sx={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 360 }}>
            <Typography
                variant="h2"
                sx={{
                    color: "white",
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                    mb: 2,
                    animation: `${fadeUp} 0.8s ease-out 0.3s both`,
                    lineHeight: 1.1,
                }}
            >
                Uncensored
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 400,
                    animation: `${fadeUp} 0.8s ease-out 0.5s both`,
                    lineHeight: 1.6,
                }}
            >
                {tagline}
            </Typography>

            {/* Decorative line */}
            <Box
                sx={{
                    width: 48,
                    height: 3,
                    bgcolor: "rgba(255,255,255,0.3)",
                    borderRadius: 2,
                    mx: "auto",
                    mt: 3,
                    animation: `${fadeUp} 0.8s ease-out 0.7s both`,
                }}
            />
        </Box>
    </Box>
);

// --- Auth Layout Wrapper ---
const AuthLayout = ({ children, scrollable = false, tagline = "Speak freely. Think boldly. Write without limits." }) => (
    <Box
        sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            bgcolor: "background.default",
            overflow: "hidden",
        }}
    >
        <BrandPanel tagline={tagline} />

        {/* Form side */}
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: { xs: 3, sm: 5 },
                overflowY: "auto",
                height: "100vh",
                position: "relative",
            }}
        >
            {/* Subtle grid pattern */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: (theme) => theme.palette.mode === "dark" ? 0.02 : 0.03,
                    backgroundImage: (theme) => theme.palette.mode === "dark"
                        ? "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)"
                        : "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    pointerEvents: "none",
                }}
            />

            {/* Logo — always pinned top-left */}
            <Box sx={{ position: "absolute", top: 28, left: { xs: 24, sm: 40 }, zIndex: 2 }}>
                <Logo size={28} to={null} />
            </Box>

            <Box sx={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1, my: "auto" }}>
                {children}
            </Box>
        </Box>
    </Box>
);

export default AuthLayout;
