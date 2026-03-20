import React from "react";
import { Box, Button, Typography, keyframes } from "@mui/material";
import { Link } from "react-router-dom";

const float1 = keyframes`
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(8px, -12px) rotate(3deg); }
`;
const float2 = keyframes`
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-10px, 10px) rotate(-4deg); }
`;
const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
`;
const drawCircle = keyframes`
    from { stroke-dashoffset: 300; }
    to { stroke-dashoffset: 0; }
`;

const Doodle = ({ top, left, right, bottom, delay = 0, duration = 6, animation = float1, children }) => (
    <Box
        sx={{
            position: "absolute", top, left, right, bottom,
            animation: `${animation} ${duration}s ease-in-out ${delay}s infinite`,
            pointerEvents: "none", opacity: 0.5,
        }}
    >
        {children}
    </Box>
);

const DoodleLayer = () => (
    <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {/* Dotted circle */}
        <Doodle top="10%" left="8%" delay={0} duration={7}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
                    style={{ color: "var(--doodle-color, rgba(0,0,0,0.08))" }} />
            </svg>
        </Doodle>

        {/* Cross */}
        <Doodle top="20%" right="12%" delay={1} duration={5} animation={float2}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <line x1="6" y1="15" x2="24" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    style={{ color: "var(--doodle-color, rgba(0,0,0,0.06))" }} />
                <line x1="15" y1="6" x2="15" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    style={{ color: "var(--doodle-color, rgba(0,0,0,0.06))" }} />
            </svg>
        </Doodle>

        {/* Squiggle */}
        <Doodle bottom="18%" left="15%" delay={2} duration={8}>
            <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
                <path d="M2 10 Q12 2, 22 10 Q32 18, 42 10 Q52 2, 62 10 Q72 18, 78 10"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"
                    style={{ color: "var(--doodle-color, rgba(0,0,0,0.06))" }} />
            </svg>
        </Doodle>

        {/* Triangle */}
        <Doodle bottom="25%" right="10%" delay={0.5} duration={9} animation={float2}>
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
                <polygon points="17.5,3 33,32 2,32" stroke="currentColor" strokeWidth="1" fill="none"
                    style={{ color: "var(--doodle-color, rgba(0,0,0,0.06))" }} />
            </svg>
        </Doodle>

        {/* Small dots */}
        <Doodle top="40%" left="5%" delay={1.5} duration={6} animation={float2}>
            <svg width="5" height="5"><circle cx="2.5" cy="2.5" r="2.5" fill="currentColor"
                style={{ color: "var(--doodle-color, rgba(0,0,0,0.1))" }} /></svg>
        </Doodle>
        <Doodle top="55%" right="8%" delay={3} duration={7}>
            <svg width="4" height="4"><circle cx="2" cy="2" r="2" fill="currentColor"
                style={{ color: "var(--doodle-color, rgba(0,0,0,0.08))" }} /></svg>
        </Doodle>

        {/* Animated circle */}
        <Doodle top="60%" left="75%" delay={0} duration={10}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1"
                    strokeDasharray="300" fill="none"
                    style={{
                        color: "var(--doodle-color, rgba(0,0,0,0.05))",
                        animation: `${drawCircle} 3s ease forwards`,
                    }} />
            </svg>
        </Doodle>
    </Box>
);

const EmptyState = ({ icon, title, description, actionLabel, actionTo, doodles = true }) => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: { xs: 8, sm: 12 },
            px: 3,
            textAlign: "center",
            position: "relative",
            "--doodle-color": (theme) =>
                theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        }}
    >
        {doodles && <DoodleLayer />}

        {icon && (
            <Box
                sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    animation: `${fadeUp} 0.6s ease-out`,
                }}
            >
                {React.cloneElement(icon, {
                    sx: { fontSize: 36, color: "text.disabled", ...icon.props?.sx },
                })}
            </Box>
        )}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, animation: `${fadeUp} 0.6s ease-out 0.1s both` }}>
            {title}
        </Typography>
        {description && (
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 360, mb: actionLabel ? 3 : 0, animation: `${fadeUp} 0.6s ease-out 0.2s both` }}
            >
                {description}
            </Typography>
        )}
        {actionLabel && actionTo && (
            <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.3s both` }}>
                <Button
                    component={Link}
                    to={actionTo}
                    variant="outlined"
                    size="small"
                    sx={{ borderColor: "divider", color: "text.primary", "&:hover": { borderColor: "text.secondary" } }}
                >
                    {actionLabel}
                </Button>
            </Box>
        )}
    </Box>
);

export default EmptyState;
