import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * Logo mark — open book with a diagonal slash (the "uncensored" strike).
 */
const LogoMark = ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 8 L8 14 L8 32 L20 26 L32 32 L32 14 Z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
        <line x1="20" y1="8" x2="20" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="6" x2="28" y2="34" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
        <circle cx="30" cy="10" r="1.8" fill={color} opacity="0.5" />
    </svg>
);

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
                    fontSize: size * 0.45,
                    letterSpacing: "-0.03em",
                    color: "text.primary",
                    lineHeight: 1,
                }}
            >
                Uncensored
            </Typography>
        )}
    </Box>
);

export { LogoMark };
export default Logo;
