import React from "react";
import { Box, keyframes } from "@mui/material";

const bounce = keyframes`
    0%, 100% { transform: translateY(0); opacity: 0.4; }
    50% { transform: translateY(-4px); opacity: 1; }
`;

const ButtonLoader = ({ size = 5, color = "currentColor" }) => (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: "3px", ml: 1 }}>
        {[0, 1, 2].map((i) => (
            <Box
                key={i}
                sx={{
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    bgcolor: color,
                    animation: `${bounce} 0.8s ease-in-out ${i * 0.1}s infinite`,
                }}
            />
        ))}
    </Box>
);

export default ButtonLoader;
