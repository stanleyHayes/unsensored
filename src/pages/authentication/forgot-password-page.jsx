import React, { useState } from "react";
import {
    Box, TextField, Button, Typography, Stack, Alert, InputAdornment,
} from "@mui/material";
import { West, East, MarkEmailRead, EmailOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import validator from "validator";
import AuthLayout, { fadeUp } from "./auth-layout";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        if (!email.trim()) { setError("Email is required"); return false; }
        if (!validator.isEmail(email)) { setError("Enter a valid email"); return false; }
        setError("");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) setSubmitted(true);
    };

    return (
        <AuthLayout tagline="Forgot your password? It happens to the best of us.">
            <Box sx={{ animation: `${fadeUp} 0.6s ease-out` }}>
                {submitted ? (
                    <>
                        <Box sx={{
                            width: 56, height: 56, borderRadius: 2, mb: 2.5,
                            bgcolor: "#e8f5e9", display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <MarkEmailRead sx={{ color: "#2e7d32", fontSize: 28 }} />
                        </Box>
                        <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, letterSpacing: "-0.02em" }}>
                            Check your inbox
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            We've sent reset instructions to <strong>{email}</strong>
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, letterSpacing: "-0.02em" }}>
                            Reset password
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Enter your email and we'll send you a reset link
                        </Typography>
                    </>
                )}
            </Box>

            {submitted ? (
                <Stack spacing={2} sx={{ animation: `${fadeUp} 0.5s ease-out 0.1s both` }}>
                    <Alert severity="success" variant="outlined">
                        If this email is registered, you'll receive a link shortly. Check your spam folder too.
                    </Alert>
                    <Button
                        component={Link} to="/auth/login" fullWidth variant="contained"
                        startIcon={<West />}
                        sx={{
                            py: 1.4, textTransform: "none", fontSize: "0.95rem", fontWeight: 600,
                            borderRadius: 3,
                            boxShadow: "none",
                            background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                            "&:hover": {
                                background: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)",
                                boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
                            },
                            transition: "all 0.2s ease",
                        }}
                    >
                        Back to sign in
                    </Button>
                    <Button
                        onClick={() => { setSubmitted(false); setEmail(""); }}
                        fullWidth
                        sx={{ textTransform: "none", color: "text.secondary" }}
                    >
                        Try a different email
                    </Button>
                </Stack>
            ) : (
                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2.5}>
                        <TextField
                            fullWidth type="email" label="Email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                            error={!!error} helperText={error}
                            autoComplete="email" autoFocus
                            sx={{
                                animation: `${fadeUp} 0.5s ease-out 0.1s both`,
                                "& .MuiOutlinedInput-root": {
                                    bgcolor: "background.paper",
                                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlined fontSize="small" color="action" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <Box sx={{ animation: `${fadeUp} 0.5s ease-out 0.15s both` }}>
                            <Button
                                type="submit" fullWidth variant="contained" endIcon={<East />}
                                sx={{
                                    py: 1.4, textTransform: "none", fontSize: "0.95rem", fontWeight: 600,
                                    borderRadius: 3,
                                    boxShadow: "none",
                                    background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)",
                                        boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
                                    },
                                    "&:active": { transform: "scale(0.98)" },
                                    transition: "all 0.2s ease",
                                }}
                            >
                                Send reset link
                            </Button>
                        </Box>

                        <Box sx={{ animation: `${fadeUp} 0.5s ease-out 0.2s both` }}>
                            <Button
                                component={Link} to="/auth/login" fullWidth startIcon={<West />}
                                sx={{ textTransform: "none", color: "text.secondary", fontWeight: 500 }}
                            >
                                Back to sign in
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            )}
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
