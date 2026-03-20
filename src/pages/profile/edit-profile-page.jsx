import React, { useEffect, useState } from "react";
import {
    Avatar, Box, Button, Container, Divider, IconButton,
    Stack, TextField, Typography,
} from "@mui/material";
import {
    CameraAltOutlined, PersonOutline, AlternateEmail, CakeOutlined,
} from "@mui/icons-material";
import Layout from "../../components/layout/layout";
import PageBanner from "../../components/shared/page-banner";
import ButtonLoader from "../../components/shared/button-loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { updateUserProfile } from "../../redux/auth/auth-reducer";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const Section = ({ icon, title, description, children }) => (
    <Box
        sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.paper",
            overflow: "hidden",
            mb: 2,
        }}
    >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ px: 3, py: 2 }}>
            <Box
                sx={{
                    width: 36, height: 36, borderRadius: 1.5,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    bgcolor: (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.1)" : "rgba(26,26,46,0.06)",
                    color: "primary.main", flexShrink: 0,
                }}
            >
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

const EditProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((s) => s.auth.currentUser);
    const loading = useSelector((s) => s.auth.loading);
    const token = useSelector((s) => s.auth.token);

    const [user, setUser] = useState({});
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [error, setError] = useState({});
    const [birthday, setBirthday] = useState(null);

    const { name, email, username, profile } = user;

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
            setAvatarPreview(currentUser.avatar);
            if (currentUser.birthday) setBirthday(moment(currentUser.birthday));
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        if (error[e.target.name]) setError({ ...error, [e.target.name]: null });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) { setAvatarFile(file); setAvatarPreview(URL.createObjectURL(file)); }
    };

    const validate = () => {
        const e = {};
        if (!name?.trim()) e.name = "Required";
        if (!email?.trim()) e.email = "Required";
        else if (!validator.isEmail(email)) e.email = "Invalid email";
        if (!username?.trim()) e.username = "Required";
        setError(e);
        return !Object.keys(e).length;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const fd = new FormData();
        fd.append("name", name);
        fd.append("email", email);
        fd.append("username", username);
        if (avatarFile) fd.append("avatar", avatarFile);
        if (birthday) fd.append("birthday", birthday.toISOString());
        if (profile) fd.append("profile", profile);
        dispatch(updateUserProfile({ user: fd, userId: currentUser._id, token, navigate }));
    };

    return (
        <Layout>
            <PageBanner
                title="Edit Profile"
                description="Manage your personal information."
                gradient="linear-gradient(135deg, #1a1a2e 0%, #2d3561 50%, #1a1a2e 100%)"
            />
            <Container maxWidth="sm" sx={{ pb: 6 }}>

                <Box component="form" onSubmit={handleSubmit}>
                    {/* Photo */}
                    <Section icon={<CameraAltOutlined sx={{ fontSize: 18 }} />} title="Profile photo" description="This will be displayed on your profile">
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Box sx={{ position: "relative" }}>
                                <Avatar src={avatarPreview} sx={{ width: 72, height: 72, bgcolor: "primary.main", fontSize: "1.6rem", fontWeight: 800, border: "3px solid", borderColor: "divider" }}>
                                    {name?.charAt(0)?.toUpperCase()}
                                </Avatar>
                                <IconButton component="label" size="small" sx={{ position: "absolute", bottom: -4, right: -4, bgcolor: "primary.main", color: "white", width: 26, height: 26, "&:hover": { bgcolor: "primary.light" } }}>
                                    <CameraAltOutlined sx={{ fontSize: 13 }} />
                                    <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                                </IconButton>
                            </Box>
                            <Box>
                                <Button component="label" variant="outlined" size="small" sx={{ borderColor: "divider", color: "text.primary", mr: 1, "&:hover": { borderColor: "text.secondary" } }}>
                                    Upload
                                    <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                                </Button>
                                {avatarPreview && <Button size="small" color="error" onClick={() => { setAvatarFile(null); setAvatarPreview(null); }}>Remove</Button>}
                                <Typography variant="caption" color="text.disabled" display="block" sx={{ mt: 0.5 }}>JPG, PNG or GIF. Max 2MB.</Typography>
                            </Box>
                        </Stack>
                    </Section>

                    {/* Info */}
                    <Section icon={<PersonOutline sx={{ fontSize: 18 }} />} title="Personal information" description="Your name and contact details">
                        <Stack spacing={2}>
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <TextField fullWidth size="small" name="name" label="Full Name" value={name || ""} onChange={handleChange} error={!!error.name} helperText={error.name} />
                                <TextField fullWidth size="small" name="username" label="Username" value={username || ""} onChange={handleChange} error={!!error.username} helperText={error.username} />
                            </Stack>
                            <TextField fullWidth size="small" name="email" label="Email" type="email" value={email || ""} onChange={handleChange} error={!!error.email} helperText={error.email} />
                        </Stack>
                    </Section>

                    {/* Bio */}
                    <Section icon={<AlternateEmail sx={{ fontSize: 18 }} />} title="About" description="Tell the world about yourself">
                        <TextField fullWidth size="small" name="profile" placeholder="Write a short bio..." value={profile || ""} onChange={handleChange} multiline rows={3} />
                        <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: "block" }}>{(profile || "").length}/280</Typography>
                    </Section>

                    {/* Birthday */}
                    <Section icon={<CakeOutlined sx={{ fontSize: 18 }} />} title="Birthday" description="This won't be shown publicly">
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker value={birthday} disableFuture onChange={(d) => setBirthday(d)} slotProps={{ textField: { fullWidth: true, size: "small" } }} />
                        </LocalizationProvider>
                    </Section>

                    {/* Actions */}
                    <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ flex: 1, py: 1.2, borderColor: "divider", color: "text.primary", "&:hover": { borderColor: "text.secondary" } }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" disabled={loading} sx={{ flex: 2, py: 1.2, bgcolor: "primary.main", "&:hover": { bgcolor: "primary.light" }, boxShadow: "none" }}>
                            {loading ? <>Saving <ButtonLoader /></> : "Save Changes"}
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Layout>
    );
};

export default EditProfilePage;
