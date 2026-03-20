import React from "react";
import Layout from "../../components/layout/layout";
import { Box, Button, Container, Typography, keyframes } from "@mui/material";
import { HomeOutlined, SearchOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;
const float = keyframes`
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
`;
const float2 = keyframes`
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-8px, 8px); }
`;
const drawPath = keyframes`
    from { stroke-dashoffset: 600; }
    to { stroke-dashoffset: 0; }
`;
const blink = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
`;

const PageNotFound = () => (
    <Layout>
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "70vh",
                    textAlign: "center",
                    position: "relative",
                }}
            >
                {/* Floating doodles */}
                <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                    {/* Large dotted circle */}
                    <Box sx={{ position: "absolute", top: "5%", right: "5%", animation: `${float} 6s ease-in-out infinite`, opacity: 0.5 }}>
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                            <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6"
                                style={{ color: "var(--mui-palette-text-disabled)" }} />
                        </svg>
                    </Box>
                    {/* Squiggle */}
                    <Box sx={{ position: "absolute", bottom: "15%", left: "5%", animation: `${float2} 7s ease-in-out 1s infinite`, opacity: 0.4 }}>
                        <svg width="100" height="24" viewBox="0 0 100 24" fill="none">
                            <path d="M2 12 Q14 2, 26 12 Q38 22, 50 12 Q62 2, 74 12 Q86 22, 98 12"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"
                                strokeDasharray="600" style={{ color: "var(--mui-palette-text-disabled)", animation: `${drawPath} 2s ease forwards` }} />
                        </svg>
                    </Box>
                    {/* Arrow */}
                    <Box sx={{ position: "absolute", top: "30%", left: "8%", animation: `${float} 5s ease-in-out 0.5s infinite`, opacity: 0.35 }}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M8 32 L32 8 M32 8 L22 10 M32 8 L30 18"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                style={{ color: "var(--mui-palette-text-disabled)" }} />
                        </svg>
                    </Box>
                    {/* Cross */}
                    <Box sx={{ position: "absolute", bottom: "30%", right: "10%", animation: `${float2} 8s ease-in-out 2s infinite`, opacity: 0.3 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: "var(--mui-palette-text-disabled)" }} />
                            <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: "var(--mui-palette-text-disabled)" }} />
                        </svg>
                    </Box>
                    {/* Dots */}
                    <Box sx={{ position: "absolute", top: "60%", left: "20%", animation: `${float} 4s ease-in-out infinite`, opacity: 0.25 }}>
                        <svg width="6" height="6"><circle cx="3" cy="3" r="3" fill="currentColor" style={{ color: "var(--mui-palette-text-disabled)" }} /></svg>
                    </Box>
                    <Box sx={{ position: "absolute", top: "15%", left: "40%", animation: `${float2} 5s ease-in-out 1.5s infinite`, opacity: 0.2 }}>
                        <svg width="4" height="4"><circle cx="2" cy="2" r="2" fill="currentColor" style={{ color: "var(--mui-palette-text-disabled)" }} /></svg>
                    </Box>
                </Box>

                {/* 404 number */}
                <Typography
                    sx={{
                        fontWeight: 900,
                        fontSize: { xs: "6rem", sm: "9rem" },
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        background: (theme) => theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #a78bfa, #c4b5fd)"
                            : "linear-gradient(135deg, #1a1a2e, #302b63)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: `${fadeUp} 0.7s ease-out`,
                        mb: 1,
                    }}
                >
                    404
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, animation: `${fadeUp} 0.7s ease-out 0.1s both` }}>
                    Lost in the void
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: 380, mb: 4, animation: `${fadeUp} 0.7s ease-out 0.2s both`, lineHeight: 1.6 }}
                >
                    This page doesn't exist — or maybe it was censored
                    <Box component="span" sx={{ animation: `${blink} 1s step-end infinite` }}>_</Box>
                </Typography>

                <Box sx={{ display: "flex", gap: 1.5, animation: `${fadeUp} 0.7s ease-out 0.3s both` }}>
                    <Button
                        component={Link}
                        to="/"
                        startIcon={<HomeOutlined />}
                        variant="contained"
                        sx={{
                            px: 3,
                            py: 1.2,
                            bgcolor: "primary.main",
                            "&:hover": { bgcolor: "primary.light" },
                        }}
                    >
                        Go home
                    </Button>
                    <Button
                        component={Link}
                        to="/search"
                        startIcon={<SearchOutlined />}
                        variant="outlined"
                        sx={{
                            px: 3,
                            py: 1.2,
                            borderColor: "divider",
                            color: "text.primary",
                            "&:hover": { borderColor: "text.secondary" },
                        }}
                    >
                        Search
                    </Button>
                </Box>
            </Box>
        </Container>
    </Layout>
);

export default PageNotFound;
