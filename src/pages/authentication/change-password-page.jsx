import React, { useState } from "react";
import {
    Box, TextField, Button, Container, Divider,
    InputAdornment, IconButton, Stack, Alert, Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined, ShieldOutlined } from "@mui/icons-material";
import ButtonLoader from "../../components/shared/button-loader";
import Layout from "../../components/layout/layout";
import PageBanner from "../../components/shared/page-banner";

const Section = ({ icon, title, description, children }) => (
    <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, bgcolor: "background.paper", overflow: "hidden", mb: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ px: 3, py: 2 }}>
            <Box sx={{
                width: 36, height: 36, borderRadius: 1.5, display: "flex", alignItems: "center", justifyContent: "center",
                bgcolor: (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.1)" : "rgba(26,26,46,0.06)", color: "primary.main", flexShrink: 0,
            }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{title}</Typography>
                {description && <Typography variant="caption" color="text.disabled">{description}</Typography>}
            </Box>
        </Stack>
        <Divider />
        <Box sx={{ px: 3, py: 2.5 }}>{children}</Box>
    </Box>
);

const ChangePasswordPage = () => {
    const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const [show, setShow] = useState({ current: false, new: false, confirm: false });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
        if (success) setSuccess(false);
    };

    const toggle = (k) => setShow({ ...show, [k]: !show[k] });

    const validate = () => {
        const e = {};
        if (!form.currentPassword) e.currentPassword = "Required";
        if (!form.newPassword) e.newPassword = "Required";
        else if (form.newPassword.length < 6) e.newPassword = "At least 6 characters";
        if (!form.confirmPassword) e.confirmPassword = "Required";
        else if (form.newPassword !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
        setErrors(e);
        return !Object.keys(e).length;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        // TODO: dispatch change password action
        setLoading(false);
        setSuccess(true);
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };

    const pwField = (name, label, placeholder, visKey) => (
        <TextField
            fullWidth size="small" name={name} label={label}
            type={show[visKey] ? "text" : "password"}
            placeholder={placeholder}
            value={form[name]} onChange={handleChange}
            error={!!errors[name]} helperText={errors[name]}
            autoComplete={name === "currentPassword" ? "current-password" : "new-password"}
            slotProps={{
                input: {
                    startAdornment: <InputAdornment position="start"><LockOutlined fontSize="small" color="action" /></InputAdornment>,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => toggle(visKey)} edge="end" size="small">
                                {show[visKey] ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );

    return (
        <Layout>
            <PageBanner
                title="Change Password"
                description="Keep your account secure with a strong password."
                gradient="linear-gradient(135deg, #24243e 0%, #302b63 50%, #0f0c29 100%)"
            />
            <Container maxWidth="sm" sx={{ pb: 6 }}>
                {success && (
                    <Alert severity="success" variant="outlined" sx={{ mb: 2.5 }}>
                        Password updated successfully
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <Section icon={<LockOutlined sx={{ fontSize: 18 }} />} title="Current password" description="Enter your existing password">
                        {pwField("currentPassword", "Current Password", "Enter current password", "current")}
                    </Section>

                    <Section icon={<ShieldOutlined sx={{ fontSize: 18 }} />} title="New password" description="Choose a strong password with at least 6 characters">
                        <Stack spacing={2}>
                            {pwField("newPassword", "New Password", "Enter new password", "new")}
                            {pwField("confirmPassword", "Confirm Password", "Re-enter new password", "confirm")}
                        </Stack>
                    </Section>

                    <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                        <Button variant="outlined" onClick={() => window.history.back()} sx={{ flex: 1, py: 1.2, borderColor: "divider", color: "text.primary", "&:hover": { borderColor: "text.secondary" } }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" disabled={loading} sx={{ flex: 2, py: 1.2, bgcolor: "primary.main", "&:hover": { bgcolor: "primary.light" }, boxShadow: "none" }}>
                            {loading ? <>Updating <ButtonLoader /></> : "Update Password"}
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Layout>
    );
};

export default ChangePasswordPage;
