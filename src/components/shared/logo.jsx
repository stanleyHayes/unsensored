import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

let logoCounter = 0;

/**
 * Logo mark — open eye, "nothing hidden".
 * Clean, minimal, recognizable at small sizes.
 */
const LogoMark = ({ size = 32 }) => {
    const idRef = useRef(`logo-grad-${++logoCounter}`);
    const gradId = idRef.current;
    return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="50%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
            </defs>
            {/* Eye shape */}
            <path
                d="M3 18C3 18 9.5 9 18 9C26.5 9 33 18 33 18C33 18 26.5 27 18 27C9.5 27 3 18 3 18Z"
                stroke={`url(#${gradId})`}
                strokeWidth="2.2"
                strokeLinejoin="round"
            />
            {/* Iris */}
            <circle cx="18" cy="18" r="5" stroke={`url(#${gradId})`} strokeWidth="2" />
            {/* Pupil */}
            <circle cx="18" cy="18" r="2" fill={`url(#${gradId})`} />
        </svg>
    );
};

/**
 * Full logo with mark + wordmark.
 */
const Logo = ({ size = 28, showText = true, to = "/" }) => (
    <Box
        component={to ? Link : "div"}
        to={to || undefined}
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            textDecoration: "none",
            color: "text.primary",
        }}
    >
        <Box sx={{ color: "primary.main", display: "flex" }}>
            <LogoMark size={size} />
        </Box>
        {showText && (
            <Typography
                variant="body2"
                sx={{
                    fontWeight: 800,
                    fontSize: size * 0.58,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #a78bfa, #7c3aed, #c084fc)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Uncensored
            </Typography>
        )}
    </Box>
);

export { LogoMark };
export default Logo;
