import React, { useState } from "react";
import {
    Box, TextField, Button, Typography,
    InputAdornment, IconButton, Stack, Alert, Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, East, PersonOutline, LockOutlined } from "@mui/icons-material";
import ButtonLoader from "../../components/shared/button-loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/auth/auth-reducer";
import AuthLayout, { fadeUp } from "./auth-layout";

const inputSx = {
    "& .MuiOutlinedInput-root": {
        bgcolor: "background.paper",
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
    },
};

const SignInPage = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error: authError } = useSelector((s) => s.auth);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
    };

    const validate = () => {
        const e = {};
        if (!form.username.trim()) e.username = "Username is required";
        if (!form.password) e.password = "Password is required";
        setErrors(e);
        return !Object.keys(e).length;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) dispatch(signIn({ navigate, user: form }));
    };

    return (
        <AuthLayout tagline="Speak freely. Think boldly. Write without limits.">
            <Box sx={{ animation: `${fadeUp} 0.6s ease-out`, textAlign: "center" }}>
                <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, letterSpacing: "-0.02em" }}>
                    Sign in
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Pick up where you left off. Your voice matters.
                </Typography>
            </Box>

            {authError && (
                <Alert severity="error" variant="outlined" sx={{ mb: 2 }}>{authError}</Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={1.5}>
                    <TextField
                        fullWidth name="username" label="Username"
                        placeholder="Enter your username"
                        value={form.username} onChange={handleChange}
                        error={!!errors.username} helperText={errors.username}
                        autoComplete="username" autoFocus
                        sx={{ ...inputSx, animation: `${fadeUp} 0.6s ease-out 0.1s both` }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutline fontSize="small" color="action" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <TextField
                        fullWidth name="password" label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={form.password} onChange={handleChange}
                        error={!!errors.password} helperText={errors.password}
                        autoComplete="current-password"
                        sx={{ ...inputSx, animation: `${fadeUp} 0.6s ease-out 0.15s both` }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined fontSize="small" color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Box sx={{ textAlign: "right", animation: `${fadeUp} 0.6s ease-out 0.2s both` }}>
                        <Button component={Link} to="/auth/forgot-password"
                            sx={{ textTransform: "none", fontWeight: 500, fontSize: "0.8rem" }}>
                            Forgot password?
                        </Button>
                    </Box>

                    <Button
                        type="submit" fullWidth variant="contained"
                        disabled={loading}
                        endIcon={!loading && <East />}
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
                            animation: `${fadeUp} 0.6s ease-out 0.25s both`,
                        }}
                    >
                        {loading ? <>Signing in <ButtonLoader /></> : "Continue"}
                    </Button>
                </Stack>
            </Box>

            <Divider sx={{ my: 3, animation: `${fadeUp} 0.6s ease-out 0.3s both` }}>
                <Typography variant="caption" color="text.disabled" sx={{ px: 1 }}>
                    DON'T HAVE AN ACCOUNT?
                </Typography>
            </Divider>

            <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.35s both` }}>
                <Button
                    component={Link} to="/auth/register" fullWidth variant="outlined"
                    sx={{
                        py: 1.4, textTransform: "none", fontSize: "0.95rem", fontWeight: 600,
                        borderRadius: 3,
                        borderColor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
                        color: "text.primary",
                        "&:hover": {
                            borderColor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)",
                            bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                        },
                        transition: "all 0.2s ease",
                    }}
                >
                    Create account
                </Button>
            </Box>

            <Box sx={{ textAlign: "center", mt: 3, animation: `${fadeUp} 0.6s ease-out 0.4s both` }}>
                <Button
                    component={Link} to="/" fullWidth
                    endIcon={<East sx={{ fontSize: "1.1rem !important", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }} />}
                    sx={{
                        textTransform: "none", fontSize: "0.92rem", fontWeight: 600,
                        background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        "&:hover": {
                            background: "linear-gradient(135deg, #6d28d9, #8b5cf6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        },
                        transition: "all 0.2s ease",
                    }}
                >
                    Just here to read? Skip ahead
                </Button>
            </Box>
        </AuthLayout>
    );
};

export default SignInPage;
