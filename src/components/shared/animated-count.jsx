import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, keyframes } from "@mui/material";

const slideUp = keyframes`
    from { transform: translateY(8px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
`;

const slideDown = keyframes`
    from { transform: translateY(-8px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
`;

const AnimatedCount = ({ count, sx = {} }) => {
    const prevRef = useRef(count);
    const [anim, setAnim] = useState(null);

    useEffect(() => {
        if (prevRef.current !== count) {
            setAnim(count > prevRef.current ? slideUp : slideDown);
            prevRef.current = count;
            const t = setTimeout(() => setAnim(null), 300);
            return () => clearTimeout(t);
        }
    }, [count]);

    return (
        <Box sx={{ display: "inline-flex", overflow: "hidden", height: "1.2em", alignItems: "center" }}>
            <Typography
                variant="caption"
                key={count}
                sx={{
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    color: "inherit",
                    lineHeight: 1,
                    animation: anim ? `${anim} 0.3s ease-out` : "none",
                    ...sx,
                }}
            >
                {count}
            </Typography>
        </Box>
    );
};

export default AnimatedCount;
