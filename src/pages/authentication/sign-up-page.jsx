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

    const fields = [
        { name: "name", label: "Full Name", placeholder: "John Doe", type: "text", ac: "name", icon: <PersonOutline fontSize="small" color="action" /> },
        { name: "email", label: "Email", placeholder: "you@example.com", type: "email", ac: "email", icon: <EmailOutlined fontSize="small" color="action" /> },
        { name: "username", label: "Username", placeholder: "johndoe", type: "text", ac: "username", icon: <AlternateEmail fontSize="small" color="action" /> },
    ];

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            bgcolor: "background.paper",
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
        },
    };

    return (
        <AuthLayout scrollable tagline="Your voice matters. Join a community that believes in unrestricted thought.">
            <Box sx={{ animation: `${fadeUp} 0.6s ease-out` }}>
                <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5, letterSpacing: "-0.02em" }}>
                    Create account
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Start your journey with Uncensored
                </Typography>
            </Box>

            {authError && (
                <Alert severity="error" variant="outlined" sx={{ mb: 2 }}>{authError}</Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={1.5}>
                    {fields.map((f, i) => (
                        <TextField
                            key={f.name}
                            fullWidth name={f.name} type={f.type}
                            label={f.label} placeholder={f.placeholder} value={form[f.name]}
                            onChange={handleChange} error={!!errors[f.name]}
                            helperText={errors[f.name]} autoComplete={f.ac}
                            autoFocus={i === 0} sx={{ ...inputSx, animation: `${fadeUp} 0.5s ease-out ${0.05 + i * 0.05}s both` }}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start">{f.icon}</InputAdornment>,
                                },
                            }}
                        />
                    ))}

                    <TextField
                        fullWidth name="password" label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 6 characters"
                        value={form.password} onChange={handleChange}
                        error={!!errors.password} helperText={errors.password}
                        autoComplete="new-password"
                        sx={{ ...inputSx, animation: `${fadeUp} 0.5s ease-out 0.2s both` }}
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start"><LockOutlined fontSize="small" color="action" /></InputAdornment>,
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

                    <TextField
                        fullWidth name="confirmPassword" label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        value={form.confirmPassword} onChange={handleChange}
                        error={!!errors.confirmPassword} helperText={errors.confirmPassword}
                        autoComplete="new-password"
                        sx={{ ...inputSx, animation: `${fadeUp} 0.5s ease-out 0.25s both` }}
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start"><LockOutlined fontSize="small" color="action" /></InputAdornment>,
                            },
                        }}
                    />

                    <Box sx={{ animation: `${fadeUp} 0.5s ease-out 0.3s both` }}>
                        <Button
                            type="submit" fullWidth variant="contained"
                            disabled={loading} endIcon={!loading && <East />}
                            sx={{
                                py: 1.4, textTransform: "none", fontSize: "0.95rem", fontWeight: 600,
                                bgcolor: "primary.main", "&:hover": { bgcolor: "primary.light" },
                                "&:active": { transform: "scale(0.98)" },
                                transition: "all 0.15s ease",
                            }}
                        >
                            {loading ? <>Creating account <ButtonLoader /></> : "Create account"}
                        </Button>
                    </Box>
                </Stack>
            </Box>

            <Divider sx={{ my: 3, animation: `${fadeUp} 0.5s ease-out 0.35s both` }}>
                <Typography variant="caption" color="text.disabled" sx={{ px: 1 }}>
                    ALREADY HAVE AN ACCOUNT?
                </Typography>
            </Divider>

            <Box sx={{ animation: `${fadeUp} 0.5s ease-out 0.4s both` }}>
                <Button
                    component={Link} to="/auth/login" fullWidth variant="outlined"
                    sx={{
                        py: 1.4, textTransform: "none", fontSize: "0.95rem", fontWeight: 600,
                        borderColor: "#e0e0e0", color: "text.primary",
                        "&:hover": { borderColor: "#bbb", bgcolor: "rgba(0,0,0,0.02)" },
                    }}
                >
                    Sign in instead
                </Button>
            </Box>
        </AuthLayout>
    );
};

export default SignUpPage;
