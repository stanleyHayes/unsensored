import React, { useState } from "react";
import { Box, Button, Container, SwipeableDrawer } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import MobileHeader from "../navigation/mobile-header";
import DesktopHeader from "../navigation/desktop-header";
import BottomNavBar from "../navigation/bottom-navbar";
import DrawerContent from "../navigation/drawer-content";

const Layout = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === "/";

    const BackButton = () =>
        isHome ? null : (
            <Button
                onClick={() => navigate(-1)}
                startIcon={<ArrowBack sx={{ fontSize: 18 }} />}
                size="small"
                sx={{
                    mb: 2,
                    color: "text.secondary",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    "&:hover": { color: "text.primary", bgcolor: "transparent" },
                }}
            >
                Back
            </Button>
        );

    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
            {/* Desktop */}
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
                <DesktopHeader />
                <Container maxWidth="lg" sx={{ pt: "88px", pb: 6 }}>
                    <BackButton />
                    {children}
                </Container>
            </Box>

            {/* Mobile */}
            <Box sx={{ display: { xs: "block", lg: "none" }, position: "fixed", inset: 0, overflow: "hidden" }}>
                <MobileHeader handleOpen={() => setDrawerOpen(true)} />
                <Box sx={{ position: "absolute", top: 56, bottom: 60, left: 0, right: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", px: 1.5, py: 1 }}>
                    <BackButton />
                    {children}
                </Box>
                <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, pb: "env(safe-area-inset-bottom)" }}>
                    <BottomNavBar />
                </Box>
            </Box>

            {/* Drawer */}
            <SwipeableDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onOpen={() => setDrawerOpen(true)}
            >
                <DrawerContent handleClose={() => setDrawerOpen(false)} />
            </SwipeableDrawer>
        </Box>
    );
};

export default Layout;
