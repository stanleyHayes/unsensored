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
            <Box sx={{ animation: `${fadeUp} 0.6s ease-out` }}>
                <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, letterSpacing: "-0.02em" }}>
                    Sign in
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Welcome back — enter your details below
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
                            bgcolor: "primary.main", "&:hover": { bgcolor: "primary.light" },
                            "&:active": { transform: "scale(0.98)" },
                            transition: "all 0.15s ease",
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
                        borderColor: "#e0e0e0", color: "text.primary",
                        "&:hover": { borderColor: "#bbb", bgcolor: "rgba(0,0,0,0.02)" },
                    }}
                >
                    Create account
                </Button>
            </Box>
        </AuthLayout>
    );
};

export default SignInPage;
