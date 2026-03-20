import React, { useEffect, useState } from "react";
import {
    Avatar, Box, Button, Chip, Container, Divider, Stack, Typography,
} from "@mui/material";
import Layout from "../../components/layout/layout";
import Pagination from "../../components/shared/pagination";
import { ProfileSkeleton, FeedSkeleton } from "../../components/shared/loader";
import ArticleList from "../../components/shared/article-list";
import {
    EditOutlined, CalendarTodayOutlined, LinkOutlined,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../redux/users/user-reducer";
import { getArticlesByUser } from "../../redux/articles/articles-reducer";
import moment from "moment";

const ProfilePage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const currentUser = useSelector((s) => s.auth.currentUser);
    const token = useSelector((s) => s.auth.token);
    const user = useSelector((s) => s.users.user);
    const articles = useSelector((s) => s.articles.articles);
    const articlePagination = useSelector((s) => s.articles.pagination);
    const articleLoading = useSelector((s) => s.articles.loading);
    const userLoading = useSelector((s) => s.users.loading);
    const [articlePage, setArticlePage] = useState(1);

    useEffect(() => {
        dispatch(getUserProfile({ userId, token }));
    }, [dispatch, token, userId]);

    useEffect(() => {
        dispatch(getArticlesByUser({ userId, token, page: articlePage }));
    }, [dispatch, token, userId, articlePage]);

    const handleArticlePageChange = (p) => { setArticlePage(p); };

    const isOwner = !!(user && currentUser && user._id === currentUser._id);

    if (userLoading && !user) {
        return (
            <Layout>
                <Container maxWidth="md">
                    <ProfileSkeleton />
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container maxWidth="md">
                {/* ---- Hero Section ---- */}
                <Box sx={{ mb: 4 }}>
                    {/* Banner */}
                    <Box
                        sx={{
                            height: { xs: 140, sm: 200 },
                            borderRadius: 3,
                            background: "linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 100%)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {/* Doodles */}
                        <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.15 }}>
                            <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid slice">
                                <circle cx="520" cy="40" r="35" stroke="white" strokeWidth="1" strokeDasharray="5 5" fill="none" />
                                <circle cx="80" cy="150" r="20" stroke="white" strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
                                <path d="M200 30 Q220 10, 240 30 Q260 50, 280 30" stroke="white" strokeWidth="1" fill="none" />
                                <line x1="400" y1="140" x2="450" y2="140" stroke="white" strokeWidth="0.8" strokeDasharray="4 6" />
                                <circle cx="350" cy="50" r="3" fill="white" opacity="0.4" />
                                <circle cx="150" cy="80" r="2" fill="white" opacity="0.3" />
                                <circle cx="500" cy="160" r="2.5" fill="white" opacity="0.35" />
                            </svg>
                        </Box>
                        <Box sx={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.03)", top: -60, right: -40 }} />
                        <Box sx={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.04)", bottom: -30, left: "30%" }} />
                    </Box>

                    {/* Profile info below banner */}
                    <Box sx={{ px: { xs: 2, sm: 3 }, mt: -7 }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "center", sm: "flex-end" },
                            gap: { xs: 1.5, sm: 2.5 },
                        }}>
                            <Avatar
                                src={user?.avatar}
                                sx={{
                                    width: 110,
                                    height: 110,
                                    border: "5px solid",
                                    borderColor: "background.default",
                                    bgcolor: "primary.main",
                                    fontSize: "2.5rem",
                                    fontWeight: 800,
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                                }}
                            >
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </Avatar>

                            <Box sx={{
                                flex: 1,
                                textAlign: { xs: "center", sm: "left" },
                                pb: { xs: 0, sm: 1 },
                            }}>
                                <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                                    {user?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    @{user?.username}
                                </Typography>
                            </Box>

                            {isOwner && (
                                <Button
                                    component={Link}
                                    to="/edit-profile"
                                    startIcon={<EditOutlined sx={{ fontSize: 16 }} />}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        textTransform: "none",
                                        borderColor: "#ddd",
                                        color: "text.primary",
                                        fontWeight: 600,
                                        px: 2.5,
                                        mb: { xs: 0, sm: 1 },
                                        "&:hover": { borderColor: "#bbb", bgcolor: "rgba(0,0,0,0.02)" },
                                    }}
                                >
                                    Edit Profile
                                </Button>
                            )}
                        </Box>

                        {/* Bio */}
                        {user?.profile && (
                            <Typography
                                variant="body1"
                                sx={{
                                    mt: 2.5,
                                    maxWidth: 520,
                                    lineHeight: 1.7,
                                    color: "text.primary",
                                    mx: { xs: "auto", sm: 0 },
                                    textAlign: { xs: "center", sm: "left" },
                                }}
                            >
                                {user.profile}
                            </Typography>
                        )}

                        {/* Meta */}
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                mt: 2,
                                justifyContent: { xs: "center", sm: "flex-start" },
                                flexWrap: "wrap",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <CalendarTodayOutlined sx={{ fontSize: 14, color: "text.disabled" }} />
                                <Typography variant="caption" color="text.secondary">
                                    Joined {moment(user?.createdAt).format("MMM YYYY")}
                                </Typography>
                            </Box>
                            {user?.birthday && (
                                <Typography variant="caption" color="text.secondary">
                                    Born {moment(user.birthday).format("MMM D, YYYY")}
                                </Typography>
                            )}
                        </Stack>

                        {/* Stats */}
                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{
                                mt: 2.5,
                                justifyContent: { xs: "center", sm: "flex-start" },
                            }}
                        >
                            {[
                                { value: user?.articleCount || 0, label: "Articles" },
                                { value: user?.commentCount || 0, label: "Comments" },
                                { value: user?.viewCount || 0, label: "Views" },
                                { value: user?.likeCount || 0, label: "Likes" },
                            ].map((stat) => (
                                <Box key={stat.label} sx={{ display: "flex", gap: 0.5, alignItems: "baseline" }}>
                                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {stat.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Box>

                <Divider />

                {/* ---- Articles Section ---- */}
                <Box sx={{ py: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Articles
                        </Typography>
                        {articlePagination && (
                            <Chip
                                label={`${articlePagination.total} published`}
                                size="small"
                                sx={{ bgcolor: "rgba(0,0,0,0.04)", fontWeight: 500, fontSize: "0.75rem" }}
                            />
                        )}
                    </Box>

                    {articleLoading && !articles?.length ? (
                        <FeedSkeleton count={2} />
                    ) : (
                        <>
                            <ArticleList
                                message={isOwner ? "You haven't written any articles yet" : `No articles by @${user?.username}`}
                                articles={articles}
                            />
                            {articlePagination && (
                                <Pagination page={articlePage} totalPages={articlePagination.totalPages} onPageChange={handleArticlePageChange} />
                            )}
                        </>
                    )}
                </Box>
            </Container>
        </Layout>
    );
};

export default ProfilePage;
