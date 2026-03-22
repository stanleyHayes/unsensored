import React, { useState } from "react";
import {
    Box, TextField, Button, Typography,
    InputAdornment, IconButton, Stack, Alert, Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, East, PersonOutline, EmailOutlined, AlternateEmail, LockOutlined } from "@mui/icons-material";
import ButtonLoader from "../../components/shared/button-loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/auth/auth-reducer";
import validator from "validator";
import AuthLayout, { fadeUp } from "./auth-layout";

const SignUpPage = () => {
    const [form, setForm] = useState({ name: "", email: "", username: "", password: "", confirmPassword: "" });
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
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!validator.isEmail(form.email)) e.email = "Invalid email";
        if (!form.username.trim()) e.username = "Username is required";
        if (!form.password) e.password = "Password is required";
        else if (form.password.length < 6) e.password = "At least 6 characters";
        if (!form.confirmPassword) e.confirmPassword = "Confirm your password";
        else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
        setErrors(e);
        return !Object.keys(e).length;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) dispatch(signUp({ navigate, user: form }));
    };

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            bgcolor: "background.paper",
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
        },
    };

    return (
        <AuthLayout scrollable tagline="Your voice matters. Join a community that believes in unrestricted thought.">
            <Box sx={{ animation: `${fadeUp} 0.6s ease-out`, textAlign: "center" }}>
                <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, letterSpacing: "-0.02em" }}>
                    Join the conversation
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    No filters. No limits. Just your thoughts.
                </Typography>
            </Box>

            {authError && (
                <Alert severity="error" variant="outlined" sx={{ mb: 2, borderRadius: 3 }}>{authError}</Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    {/* Name & Username side by side */}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ animation: `${fadeUp} 0.5s ease-out 0.05s both` }}>
                        <TextField
                            fullWidth name="name" type="text"
                            label="Full Name" placeholder="John Doe" value={form.name}
                            onChange={handleChange} error={!!errors.name}
                            helperText={errors.name} autoComplete="name" autoFocus
                            sx={inputSx}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start"><PersonOutline fontSize="small" color="action" /></InputAdornment>,
                                },
                            }}
                        />
                        <TextField
                            fullWidth name="username" type="text"
                            label="Username" placeholder="johndoe" value={form.username}
                            onChange={handleChange} error={!!errors.username}
                            helperText={errors.username} autoComplete="username"
                            sx={inputSx}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start"><AlternateEmail fontSize="small" color="action" /></InputAdornment>,
                                },
                            }}
                        />
                    </Stack>

                    {/* Email full width */}
                    <TextField
                        fullWidth name="email" type="email"
                        label="Email" placeholder="you@example.com" value={form.email}
                        onChange={handleChange} error={!!errors.email}
                        helperText={errors.email} autoComplete="email"
                        sx={{ ...inputSx, animation: `${fadeUp} 0.5s ease-out 0.1s both` }}
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start"><EmailOutlined fontSize="small" color="action" /></InputAdornment>,
                            },
                        }}
                    />

                    {/* Password & Confirm side by side */}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ animation: `${fadeUp} 0.5s ease-out 0.15s both` }}>
                        <TextField
                            fullWidth name="password" label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Min. 6 characters"
                            value={form.password} onChange={handleChange}
                            error={!!errors.password} helperText={errors.password}
                            autoComplete="new-password"
                            sx={inputSx}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start"><LockOutlined fontSize="small" color="action" /></InputAdornment>,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        <TextField
                            fullWidth name="confirmPassword" label="Confirm Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Re-enter password"
                            value={form.confirmPassword} onChange={handleChange}
                            error={!!errors.confirmPassword} helperText={errors.confirmPassword}
                            autoComplete="new-password"
                            sx={inputSx}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start"><LockOutlined fontSize="small" color="action" /></InputAdornment>,
                                },
                            }}
                        />
                    </Stack>

                    <Box sx={{ animation: `${fadeUp} 0.5s ease-out 0.2s both`, pt: 0.5 }}>
                        <Button
                            type="submit" fullWidth variant="contained"
                            disabled={loading} endIcon={!loading && <East />}
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
                            {loading ? <>Creating account <ButtonLoader /></> : "Create account"}
                        </Button>
                    </Box>
                </Stack>
            </Box>

            <Divider sx={{ my: 3, animation: `${fadeUp} 0.5s ease-out 0.25s both` }}>
                <Typography variant="caption" color="text.disabled" sx={{ px: 1 }}>
                    ALREADY HAVE AN ACCOUNT?
                </Typography>
            </Divider>

            <Box sx={{ animation: `${fadeUp} 0.5s ease-out 0.3s both` }}>
                <Button
                    component={Link} to="/auth/login" fullWidth variant="outlined"
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
                    Sign in instead
                </Button>
            </Box>

            <Box sx={{ textAlign: "center", mt: 2, animation: `${fadeUp} 0.5s ease-out 0.35s both` }}>
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

export default SignUpPage;
