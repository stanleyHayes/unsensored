import React, { useState, useEffect, useRef } from "react";
import { Box, keyframes } from "@mui/material";
import { useLocation } from "react-router-dom";

const enterAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateY(12px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const exitAnimation = keyframes`
    from {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    to {
        opacity: 0;
        transform: translateY(-8px) scale(0.995);
    }
`;

const PageTransition = ({ children }) => {
    const location = useLocation();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [phase, setPhase] = useState("enter"); // "enter" | "exit"
    const prevPathRef = useRef(location.pathname);

    useEffect(() => {
        if (location.pathname !== prevPathRef.current) {
            // Route changed — start exit
            setPhase("exit");

            const timer = setTimeout(() => {
                // After exit animation, swap content and enter
                setDisplayChildren(children);
                setPhase("enter");
                window.scrollTo(0, 0);
                prevPathRef.current = location.pathname;
            }, 150);

            return () => clearTimeout(timer);
        } else {
            // Same route, just update children
            setDisplayChildren(children);
        }
    }, [location.pathname, children]);

    return (
        <Box
            sx={{
                animation: phase === "enter"
                    ? `${enterAnimation} 0.3s cubic-bezier(0.16, 1, 0.3, 1)`
                    : `${exitAnimation} 0.15s ease-in forwards`,
                willChange: "opacity, transform",
            }}
        >
            {displayChildren}
        </Box>
    );
};

export default PageTransition;
