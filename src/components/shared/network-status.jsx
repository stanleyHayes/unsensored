import { useEffect, useState } from "react";
import { Box, Typography, keyframes } from "@mui/material";
import { WifiOff, Wifi } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineStatus } from "../../redux/ui/ui-reducer";

const slideDown = keyframes`
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
`;

const slideUp = keyframes`
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-100%); opacity: 0; }
`;

const NetworkStatus = () => {
    const dispatch = useDispatch();
    const isOnline = useSelector((s) => s.ui.isOnline);
    const [showReconnected, setShowReconnected] = useState(false);
    const [wasOffline, setWasOffline] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            dispatch(setOnlineStatus(true));
            if (wasOffline) {
                setShowReconnected(true);
                setTimeout(() => setShowReconnected(false), 3000);
            }
        };
        const handleOffline = () => {
            dispatch(setOnlineStatus(false));
            setWasOffline(true);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [dispatch, wasOffline]);

    if (isOnline && !showReconnected) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                py: 0.8,
                px: 2,
                bgcolor: isOnline ? "#43a047" : "#e53935",
                color: "white",
                animation: `${isOnline && showReconnected ? slideUp : slideDown} 0.3s ease forwards`,
                animationDelay: isOnline && showReconnected ? "2.5s" : "0s",
                animationFillMode: "forwards",
            }}
        >
            {isOnline ? (
                <Wifi sx={{ fontSize: 18 }} />
            ) : (
                <WifiOff sx={{ fontSize: 18 }} />
            )}
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
                {isOnline
                    ? "Back online"
                    : "No internet connection. Waiting to reconnect\u2026"}
            </Typography>
        </Box>
    );
};

export default NetworkStatus;
