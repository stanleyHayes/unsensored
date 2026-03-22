import React, { useEffect, useState } from "react";
import { Box, Typography, keyframes } from "@mui/material";
import { LogoMark } from "./logo";

const fadeIn = keyframes`
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
`;

const pulse = keyframes`
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
`;

const slideUp = keyframes`
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
`;

const progress = keyframes`
    from { width: 0%; }
    to { width: 100%; }
`;

const fadeOut = keyframes`
    from { opacity: 1; }
    to { opacity: 0; pointer-events: none; }
`;

const float = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
`;

const float2 = keyframes`
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-8px, 8px); }
`;

const drawLine = keyframes`
    from { stroke-dashoffset: 800; }
    to { stroke-dashoffset: 0; }
`;

const SplashScreen = ({ onFinish }) => {
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setExiting(true), 1800);
        const done = setTimeout(() => onFinish(), 2300);
        return () => { clearTimeout(timer); clearTimeout(done); };
    }, [onFinish]);

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#0f0c29",
                animation: exiting ? `${fadeOut} 0.5s ease-out forwards` : "none",
            }}
        >
            {/* Background glow */}
            <Box
                sx={{
                    position: "absolute",
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
                    animation: `${pulse} 3s ease-in-out infinite`,
                }}
            />

            {/* Doodles */}
            <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                {/* Line art path */}
                <Box sx={{ position: "absolute", inset: 0, opacity: 0.12 }}>
                    <svg width="100%" height="100%" viewBox="0 0 500 600" fill="none" preserveAspectRatio="xMidYMid slice">
                        <path d="M50 100 Q150 50 250 150 T450 200 Q400 350 300 400 T100 500 Q50 400 50 300 Z"
                            stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="800" fill="none"
                            style={{ animation: `${drawLine} 4s ease forwards` }} />
                        <circle cx="250" cy="300" r="120" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"
                            strokeDasharray="800" fill="none" style={{ animation: `${drawLine} 5s ease 0.5s forwards` }} />
                        <circle cx="250" cy="300" r="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"
                            strokeDasharray="800" fill="none" style={{ animation: `${drawLine} 4s ease 1s forwards` }} />
                    </svg>
                </Box>

                {/* Dotted circle */}
                <Box sx={{ position: "absolute", top: "10%", right: "12%", animation: `${float} 6s ease-in-out infinite`, opacity: 0.3 }}>
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                        <circle cx="35" cy="35" r="30" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="5 5" fill="none" />
                    </svg>
                </Box>

                {/* Small dotted circle */}
                <Box sx={{ position: "absolute", bottom: "18%", left: "10%", animation: `${float2} 7s ease-in-out 1s infinite`, opacity: 0.25 }}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
                    </svg>
                </Box>

                {/* Squiggle */}
                <Box sx={{ position: "absolute", bottom: "25%", right: "8%", animation: `${float} 5s ease-in-out 0.5s infinite`, opacity: 0.2 }}>
                    <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
                        <path d="M2 10 Q12 2, 22 10 Q32 18, 42 10 Q52 2, 62 10 Q72 18, 78 10"
                            stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    </svg>
                </Box>

                {/* Floating dots */}
                {[
                    { top: "15%", left: "20%", size: 5, delay: 0, duration: 4 },
                    { top: "30%", right: "25%", size: 4, delay: 1, duration: 5 },
                    { top: "70%", left: "30%", size: 4, delay: 2, duration: 3.5 },
                    { top: "80%", right: "20%", size: 3, delay: 0.5, duration: 4.5 },
                    { top: "45%", left: "12%", size: 3, delay: 1.5, duration: 5.5 },
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
                            bgcolor: "rgba(255,255,255,0.25)",
                            animation: `${float} ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
                        }}
                    />
                ))}

                {/* Decorative circles */}
                <Box sx={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.02)", top: -60, right: -40 }} />
                <Box sx={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.03)", bottom: -30, left: "30%" }} />
            </Box>

            {/* Logo */}
            <Box sx={{ animation: `${fadeIn} 0.6s ease-out`, mb: 2, position: "relative" }}>
                <LogoMark size={72} color="#a78bfa" />
            </Box>

            {/* Title */}
            <Typography
                sx={{
                    fontWeight: 900,
                    fontSize: "1.6rem",
                    letterSpacing: "-0.03em",
                    color: "white",
                    animation: `${slideUp} 0.6s ease-out 0.2s both`,
                    mb: 0.5,
                }}
            >
                Uncensored
            </Typography>

            {/* Tagline */}
            <Typography
                sx={{
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 400,
                    animation: `${slideUp} 0.6s ease-out 0.4s both`,
                    mb: 4,
                }}
            >
                Speak freely. Think boldly.
            </Typography>

            {/* Progress bar */}
            <Box
                sx={{
                    width: 120,
                    height: 3,
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.08)",
                    overflow: "hidden",
                    animation: `${slideUp} 0.6s ease-out 0.6s both`,
                }}
            >
                <Box
                    sx={{
                        height: "100%",
                        borderRadius: 2,
                        background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                        animation: `${progress} 1.6s ease-out 0.6s both`,
                    }}
                />
            </Box>
        </Box>
    );
};

export default SplashScreen;
