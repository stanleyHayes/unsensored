import React, { useState } from "react";
import {
    Box, Button, Chip, Stack, TextField, Typography,
    IconButton,
} from "@mui/material";
import {
    CloseOutlined, ImageOutlined, PublishOutlined,
    SaveOutlined,
} from "@mui/icons-material";
import Layout from "../../components/layout/layout";
import ButtonLoader from "../../components/shared/button-loader";
import { InlineLoader } from "../../components/shared/loader";
import MarkdownEditor from "../../components/shared/markdown-editor";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "../../redux/articles/articles-reducer";
import { useNavigate } from "react-router-dom";

const CreateArticlePage = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [text, setText] = useState("");
    const [banner, setBanner] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [tagInput, setTagInput] = useState("");
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((s) => s.articles.loading);
    const token = useSelector((s) => s.auth.token);

    const handleBannerChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setBanner(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const removeBanner = () => {
        setBanner(null);
        setBannerPreview(null);
    };

    const parseTags = () => tagInput.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);

    const validate = () => {
        const e = {};
        if (!title.trim()) e.title = "Title is required";
        if (!summary.trim()) e.summary = "Summary is required";
        if (!text.trim()) e.text = "Article content is required";
        if (!banner) e.banner = "Cover image is required";
        setErrors(e);
        return !Object.keys(e).length;
    };

    const handlePublish = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        formData.append("banner", banner);
        formData.append("title", title);
        formData.append("summary", summary);
        formData.append("text", text);
        formData.append("tags", JSON.stringify(parseTags()));
        formData.append("published", true);
        formData.append("publishedDate", Date.now());

        dispatch(createArticle({ article: formData, token, navigate }));
    };

    return (
        <Layout>
            <Box sx={{ pb: 8 }}>
                {loading && <InlineLoader />}

                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                            New Article
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Write in markdown — preview as you go
                        </Typography>
                    </Box>
                    {/* Desktop buttons */}
                    <Stack direction="row" spacing={1.5} sx={{ display: { xs: "none", md: "flex" } }}>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<SaveOutlined sx={{ fontSize: "1rem !important" }} />}
                            disabled={loading}
                            sx={{
                                fontSize: "0.78rem",
                                fontWeight: 600,
                                px: 2,
                                borderRadius: 3,
                                borderColor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                                color: "text.primary",
                                "&:hover": {
                                    borderColor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                                    bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                                },
                                transition: "all 0.2s ease",
                            }}
                        >
                            Draft
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={!loading && <PublishOutlined sx={{ fontSize: "1rem !important" }} />}
                            onClick={handlePublish}
                            disabled={loading}
                            sx={{
                                fontSize: "0.78rem",
                                fontWeight: 600,
                                px: 2,
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
                            {loading ? <>Publishing <ButtonLoader /></> : "Publish"}
                        </Button>
                    </Stack>
                </Box>

                {/* Mobile fixed bottom bar */}
                <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{
                        display: { xs: "flex", md: "none" },
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1200,
                        px: 2,
                        py: 1.5,
                        bgcolor: "background.paper",
                        borderTop: 1,
                        borderColor: "divider",
                    }}
                >
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<SaveOutlined sx={{ fontSize: "1rem !important" }} />}
                        disabled={loading}
                        sx={{
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            py: 1,
                            borderRadius: 3,
                            borderColor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                            color: "text.primary",
                            "&:hover": {
                                borderColor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                            },
                            transition: "all 0.2s ease",
                        }}
                    >
                        Draft
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={!loading && <PublishOutlined sx={{ fontSize: "1rem !important" }} />}
                        onClick={handlePublish}
                        disabled={loading}
                        sx={{
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            py: 1,
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
                        {loading ? <>Publishing <ButtonLoader /></> : "Publish"}
                    </Button>
                </Stack>

                {/* Cover image */}
                {bannerPreview ? (
                    <Box sx={{ position: "relative", mb: 3 }}>
                        <Box
                            component="img"
                            src={bannerPreview}
                            alt="Cover"
                            sx={{
                                width: "100%",
                                height: { xs: 200, sm: 300 },
                                objectFit: "cover",
                                borderRadius: 3,
                            }}
                        />
                        <IconButton
                            onClick={removeBanner}
                            size="small"
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                bgcolor: "rgba(0,0,0,0.6)",
                                color: "white",
                                "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                            }}
                        >
                            <CloseOutlined fontSize="small" />
                        </IconButton>
                    </Box>
                ) : (
                    <Box
                        component="label"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            height: 160,
                            border: "2px dashed",
                            borderColor: errors.banner ? "error.main" : "divider",
                            borderRadius: 3,
                            cursor: "pointer",
                            mb: 3,
                            transition: "all 0.15s ease",
                            "&:hover": { borderColor: "primary.main", bgcolor: "rgba(0,0,0,0.01)" },
                        }}
                    >
                        <ImageOutlined sx={{ fontSize: 32, color: "text.disabled" }} />
                        <Typography variant="body2" color="text.secondary">
                            Click to add a cover image
                        </Typography>
                        {errors.banner && (
                            <Typography variant="caption" color="error">{errors.banner}</Typography>
                        )}
                        <input type="file" hidden accept="image/*" onChange={handleBannerChange} />
                    </Box>
                )}

                <Stack spacing={2.5}>
                    {/* Title */}
                    <TextField
                        fullWidth
                        placeholder="Article title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); if (errors.title) setErrors({ ...errors, title: null }); }}
                        error={!!errors.title}
                        helperText={errors.title}
                        variant="standard"
                        slotProps={{
                            input: {
                                disableUnderline: true,
                                sx: {
                                    fontSize: { xs: "1.5rem", sm: "2rem" },
                                    fontWeight: 800,
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1.3,
                                },
                            },
                        }}
                    />

                    {/* Summary */}
                    <TextField
                        fullWidth
                        placeholder="Write a brief summary..."
                        value={summary}
                        onChange={(e) => { setSummary(e.target.value); if (errors.summary) setErrors({ ...errors, summary: null }); }}
                        error={!!errors.summary}
                        helperText={errors.summary}
                        multiline
                        rows={2}
                        variant="standard"
                        slotProps={{
                            input: {
                                disableUnderline: true,
                                sx: {
                                    fontSize: "1.05rem",
                                    color: "text.secondary",
                                    lineHeight: 1.7,
                                },
                            },
                        }}
                    />

                    {/* Markdown editor */}
                    <Box>
                        <MarkdownEditor
                            value={text}
                            onChange={(v) => { setText(v); if (errors.text) setErrors({ ...errors, text: null }); }}
                            placeholder="Write your article content in markdown..."
                        />
                        {errors.text && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
                                {errors.text}
                            </Typography>
                        )}
                    </Box>

                    {/* Tags */}
                    <Box>
                        <TextField
                            fullWidth
                            size="small"
                            label="Tags"
                            placeholder="javascript, react, web-dev, tutorial"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            helperText="Separate tags with commas"
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "background.paper" } }}
                        />
                        {tagInput && (
                            <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.5, mt: 1 }}>
                                {parseTags().map((t) => (
                                    <Chip key={t} label={t} size="small" sx={{ fontWeight: 500, fontSize: "0.72rem" }} />
                                ))}
                            </Stack>
                        )}
                    </Box>
                </Stack>
            </Box>
        </Layout>
    );
};

export default CreateArticlePage;
