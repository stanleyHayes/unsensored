import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const ThemeContext = createContext();

const STORAGE_KEY = "UNCENSORED_THEME_MODE";

const getDesignTokens = (mode) => ({
    typography: {
        fontFamily: "'TTSquares', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        h1: { fontWeight: 800, letterSpacing: "-0.03em" },
        h2: { fontWeight: 800, letterSpacing: "-0.02em" },
        h3: { fontWeight: 700, letterSpacing: "-0.02em" },
        h4: { fontWeight: 700, letterSpacing: "-0.02em" },
        h5: { fontWeight: 700, letterSpacing: "-0.01em" },
        h6: { fontWeight: 700 },
        button: { fontWeight: 600 },
    },
    palette: {
        mode,
        ...(mode === "light"
            ? {
                primary: { main: "#1a1a2e", light: "#302b63" },
                background: { default: "#fafafa", paper: "#ffffff" },
            }
            : {
                primary: { main: "#a78bfa", light: "#c4b5fd" },
                background: { default: "#0f0f14", paper: "#1a1a24" },
                text: {
                    primary: "#e4e4e7",
                    secondary: "#a1a1aa",
                    disabled: "#52525b",
                },
                divider: "rgba(255,255,255,0.08)",
            }),
    },
    shape: { borderRadius: 8 },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { textTransform: "none", borderRadius: 8 },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: { borderRadius: 12 },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": { borderRadius: 8 },
                },
            },
        },
    },
});

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, mode);
    }, [mode]);

    const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeMode = () => useContext(ThemeContext);
