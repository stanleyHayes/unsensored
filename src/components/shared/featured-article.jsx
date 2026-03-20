import React from "react";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import moment from "moment";
import readingTime from "reading-time";
import { useNavigate } from "react-router-dom";

const FeaturedArticle = ({ article }) => {
    const navigate = useNavigate();
    const { title, summary, author, updatedAt, banner, text, _id, tags } = article;
    const stats = readingTime(text || "");

    return (
        <Box
            onClick={() => navigate(`/articles/${_id}`)}
            sx={{
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                height: { xs: 280, sm: 360 },
                mb: 4,
                "&:hover .featured-overlay": { bgcolor: "rgba(0,0,0,0.55)" },
                "&:hover .featured-title": { textDecoration: "underline" },
            }}
        >
            {/* Background image */}
            {banner && (
                <Box
                    component="img"
                    src={banner}
                    alt={title}
                    referrerPolicy="no-referrer"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            )}

            {/* Gradient overlay */}
            <Box
                className="featured-overlay"
                sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: banner ? "rgba(0,0,0,0.5)" : "primary.main",
                    transition: "background-color 0.2s ease",
                }}
            />

            {/* Content */}
            <Box
                sx={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    p: { xs: 2.5, sm: 4 },
                    zIndex: 1,
                }}
            >
                {tags?.length > 0 && (
                    <Chip
                        label={tags[0]}
                        size="small"
                        sx={{
                            alignSelf: "flex-start",
                            mb: 1.5,
                            bgcolor: "rgba(255,255,255,0.15)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                            backdropFilter: "blur(4px)",
                        }}
                    />
                )}

                <Typography
                    className="featured-title"
                    variant="h4"
                    sx={{
                        color: "white",
                        fontWeight: 800,
                        lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                        mb: 1,
                        fontSize: { xs: "1.4rem", sm: "1.8rem" },
                        textDecorationColor: "white",
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "rgba(255,255,255,0.75)",
                        mb: 2,
                        display: { xs: "none", sm: "-webkit-box" },
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        maxWidth: 500,
                    }}
                >
                    {summary}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                        src={author?.avatar}
                        sx={{ width: 28, height: 28, bgcolor: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}
                    >
                        {author?.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                        {author?.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>·</Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                        {moment(updatedAt).fromNow()}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>·</Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                        {stats.text}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default FeaturedArticle;
