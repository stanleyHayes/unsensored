import React, { useEffect, useState } from "react";
import {
    Avatar, Box, Button, Grid, Skeleton, Typography, keyframes,
} from "@mui/material";
import {
    ArticleOutlined, PeopleRounded, East,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FeedSkeleton } from "../../components/shared/loader";
import Layout from "../../components/layout/layout";
import Pagination from "../../components/shared/pagination";
import { useSelector, useDispatch } from "react-redux";
import Article from "../../components/shared/article";
import FeaturedArticle from "../../components/shared/featured-article";
import Sidebar from "../../components/shared/sidebar";
import EmptyState from "../../components/shared/empty-state";
import FollowButton from "../../components/shared/follow-button";
import { getArticles, getFollowingFeed, getForYouFeed, getTrendingArticles } from "../../redux/articles/articles-reducer";
import { getSuggestedUsers } from "../../redux/users/user-reducer";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

// --------------- Feed Toggle ---------------
const FeedToggle = ({ activeTab, onTabChange }) => (
    <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        {["For You", "Following"].map((label) => {
            const isActive = activeTab === label;
            return (
                <Button
                    key={label}
                    onClick={() => onTabChange(label)}
                    disableElevation
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        px: 2.5,
                        py: 0.8,
                        borderRadius: 6,
                        minWidth: 0,
                        transition: "all 0.2s ease",
                        ...(isActive
                            ? {
                                background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                                color: "#fff",
                                "&:hover": {
                                    background: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)",
                                    boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
                                },
                            }
                            : {
                                background: "transparent",
                                color: "text.primary",
                                "&:hover": {
                                    bgcolor: (t) => t.palette.mode === "dark"
                                        ? "rgba(255,255,255,0.06)"
                                        : "rgba(0,0,0,0.04)",
                                },
                            }
                        ),
                    }}
                >
                    {label}
                </Button>
            );
        })}
    </Box>
);

// --------------- Suggested Writer Card (compact horizontal) ---------------
const SuggestedWriterCard = ({ user, index = 0 }) => (
    <Box
        component={Link}
        to={`/profile/${user._id}`}
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            textDecoration: "none",
            color: "inherit",
            p: 1.5,
            mx: { md: -1.5 },
            borderRadius: 2,
            animation: `${fadeIn} 0.3s ease-out ${index * 0.05}s both`,
            transition: "all 0.15s ease",
            "&:hover": {
                bgcolor: (t) => t.palette.mode === "dark"
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.02)",
                "& .writer-name": { color: "primary.main" },
            },
        }}
    >
        <Avatar
            src={user.avatar}
            sx={{
                width: 40,
                height: 40,
                fontSize: "0.9rem",
                fontWeight: 700,
                bgcolor: "primary.main",
                border: "2px solid",
                borderColor: "divider",
                flexShrink: 0,
            }}
        >
            {user.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
                className="writer-name"
                variant="body2"
                sx={{
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    lineHeight: 1.3,
                    transition: "color 0.15s ease",
                }}
                noWrap
            >
                {user.name}
            </Typography>
            <Typography
                variant="caption"
                color="text.disabled"
                sx={{ fontSize: "0.68rem" }}
                noWrap
            >
                @{user.username}
            </Typography>
        </Box>
        <Box sx={{ flexShrink: 0 }} onClick={(e) => e.preventDefault()}>
            <FollowButton userId={user._id} />
        </Box>
    </Box>
);

// --------------- Suggested Voices Skeleton ---------------
const SuggestedWritersSkeleton = ({ count = 5, horizontal = false }) => (
    <Box sx={horizontal ? {
        display: "flex", gap: 2, overflowX: "auto", pb: 1,
        scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" },
    } : {}}>
        {Array.from({ length: count }).map((_, i) =>
            horizontal ? (
                <Box key={i} sx={{
                    display: "flex", alignItems: "center", gap: 1.5,
                    minWidth: 220, p: 1.5, borderRadius: 2,
                    border: "1px solid", borderColor: "divider",
                }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box sx={{ flex: 1 }}>
                        <Skeleton width={80} height={14} sx={{ mb: 0.3 }} />
                        <Skeleton width={60} height={10} />
                    </Box>
                    <Skeleton variant="rounded" width={64} height={30} sx={{ borderRadius: 3 }} />
                </Box>
            ) : (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box sx={{ flex: 1 }}>
                        <Skeleton width={80} height={14} sx={{ mb: 0.3 }} />
                        <Skeleton width={60} height={10} />
                    </Box>
                    <Skeleton variant="rounded" width={64} height={30} sx={{ borderRadius: 3 }} />
                </Box>
            )
        )}
    </Box>
);

// --------------- Mobile Suggested Voices (horizontal scroll) ---------------
const MobileSuggestedWriters = ({ users, loading }) => (
    <Box sx={{ mb: 4, display: { xs: "block", md: "none" } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 2 }}>
            <PeopleRounded sx={{ fontSize: 16, color: "primary.main" }} />
            <Typography
                variant="overline"
                sx={{
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "text.secondary",
                    fontSize: "0.68rem",
                    lineHeight: 1,
                }}
            >
                Suggested Voices
            </Typography>
        </Box>
        {loading ? (
            <SuggestedWritersSkeleton count={4} horizontal />
        ) : users?.length > 0 ? (
            <Box sx={{
                display: "flex", gap: 2, overflowX: "auto", pb: 1,
                scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" },
            }}>
                {users.map((user, i) => (
                    <Box
                        key={user._id}
                        component={Link}
                        to={`/profile/${user._id}`}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            minWidth: 240,
                            p: 1.5,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            bgcolor: "background.paper",
                            textDecoration: "none",
                            color: "inherit",
                            animation: `${fadeIn} 0.3s ease-out ${i * 0.05}s both`,
                            transition: "all 0.2s ease",
                            flexShrink: 0,
                            "&:hover": {
                                borderColor: "primary.main",
                                transform: "translateY(-2px)",
                                boxShadow: (t) => t.palette.mode === "dark"
                                    ? "0 4px 12px rgba(0,0,0,0.3)"
                                    : "0 4px 12px rgba(0,0,0,0.06)",
                            },
                        }}
                    >
                        <Avatar
                            src={user.avatar}
                            sx={{
                                width: 40, height: 40, fontSize: "0.9rem",
                                fontWeight: 700, bgcolor: "primary.main",
                                border: "2px solid", borderColor: "divider",
                                flexShrink: 0,
                            }}
                        >
                            {user.name?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.8rem", lineHeight: 1.3 }} noWrap>
                                {user.name}
                            </Typography>
                            <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.68rem" }} noWrap>
                                @{user.username}
                            </Typography>
                        </Box>
                        <Box sx={{ flexShrink: 0 }} onClick={(e) => e.preventDefault()}>
                            <FollowButton userId={user._id} />
                        </Box>
                    </Box>
                ))}
            </Box>
        ) : null}
    </Box>
);

// --------------- Related Article Card ---------------
const RelatedArticleCard = ({ article, index = 0 }) => (
    <Box
        component={Link}
        to={`/articles/${article._id}`}
        sx={{
            display: "flex",
            gap: 1.5,
            textDecoration: "none",
            color: "inherit",
            p: 1.5,
            mx: -1.5,
            borderRadius: 2,
            animation: `${fadeIn} 0.3s ease-out ${index * 0.05}s both`,
            transition: "all 0.15s ease",
            "&:hover": {
                bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                "& .related-title": { color: "primary.main" },
            },
        }}
    >
        {article.banner && (
            <Box
                component="img"
                src={article.banner}
                alt=""
                sx={{ width: 56, height: 56, borderRadius: 2, objectFit: "cover", flexShrink: 0 }}
            />
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
                className="related-title"
                variant="body2"
                sx={{
                    fontWeight: 700, fontSize: "0.78rem", lineHeight: 1.35,
                    transition: "color 0.15s ease",
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}
            >
                {article.title}
            </Typography>
            <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.65rem" }}>
                {article.author?.name || "Unknown"}
            </Typography>
        </Box>
    </Box>
);

// --------------- Desktop Sidebar ---------------
const FeedSidebar = ({ users, usersLoading, trendingArticles, trendingLoading }) => (
    <Box>
        {/* Suggested Voices */}
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 2 }}>
                <PeopleRounded sx={{ fontSize: 16, color: "primary.main" }} />
                <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: "0.08em", color: "text.secondary", fontSize: "0.68rem", lineHeight: 1 }}>
                    Suggested Voices
                </Typography>
            </Box>
            {usersLoading ? (
                <SuggestedWritersSkeleton count={5} />
            ) : users?.length > 0 ? (
                users.slice(0, 5).map((user, i) => (
                    <SuggestedWriterCard key={user._id} user={user} index={i} />
                ))
            ) : (
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                    No suggestions yet. Start exploring to discover voices.
                </Typography>
            )}
        </Box>

        {/* Trending Articles */}
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 2 }}>
                <ArticleOutlined sx={{ fontSize: 16, color: "primary.main" }} />
                <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: "0.08em", color: "text.secondary", fontSize: "0.68rem", lineHeight: 1 }}>
                    Trending Articles
                </Typography>
            </Box>
            {trendingLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 1.5, p: 1.5 }}>
                        <Skeleton variant="rounded" width={56} height={56} sx={{ borderRadius: 2, flexShrink: 0 }} />
                        <Box sx={{ flex: 1 }}>
                            <Skeleton width="90%" height={14} sx={{ mb: 0.5 }} />
                            <Skeleton width="60%" height={14} sx={{ mb: 0.5 }} />
                            <Skeleton width={60} height={10} />
                        </Box>
                    </Box>
                ))
            ) : trendingArticles?.length > 0 ? (
                trendingArticles.slice(0, 5).map((article, i) => (
                    <RelatedArticleCard key={article._id} article={article} index={i} />
                ))
            ) : (
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                    No trending articles yet.
                </Typography>
            )}
        </Box>
    </Box>
);

// --------------- Main Page ---------------
const TimelineArticlesPage = () => {
    const dispatch = useDispatch();
    const token = useSelector((s) => s.auth.token);
    const currentUser = useSelector((s) => s.auth.currentUser);
    const isAuthenticated = Boolean(token && currentUser);

    // Unauthenticated state (existing articles)
    const articles = useSelector((s) => s.articles.articles);
    const pagination = useSelector((s) => s.articles.pagination);
    const loading = useSelector((s) => s.articles.loading);

    // Authenticated feed state
    const feedArticles = useSelector((s) => s.articles.feedArticles);
    const feedPagination = useSelector((s) => s.articles.feedPagination);
    const feedLoading = useSelector((s) => s.articles.feedLoading);

    // Suggested users
    const suggestedUsers = useSelector((s) => s.users.suggestedUsers);
    const suggestedLoading = useSelector((s) => s.users.suggestedLoading);

    // Trending articles
    const trendingArticles = useSelector((s) => s.articles.trendingArticles);
    const trendingLoading = useSelector((s) => s.articles.trendingLoading);

    const [activeTab, setActiveTab] = useState("For You");
    const [page, setPage] = useState(1);

    // Fetch feed data
    useEffect(() => {
        if (isAuthenticated) {
            if (activeTab === "For You") {
                dispatch(getForYouFeed({ token, page }));
            } else {
                dispatch(getFollowingFeed({ token, page }));
            }
        } else {
            dispatch(getArticles({ token, page }));
        }
    }, [dispatch, token, isAuthenticated, activeTab, page]);

    // Fetch suggested users + trending on mount (authenticated only)
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getSuggestedUsers({ token }));
            dispatch(getTrendingArticles({ token, limit: 5 }));
        }
    }, [dispatch, token, isAuthenticated]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPage(1);
    };

    const handlePageChange = (p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Determine which data to show
    const displayArticles = isAuthenticated ? feedArticles : articles;
    const displayPagination = isAuthenticated ? feedPagination : pagination;
    const displayLoading = isAuthenticated ? feedLoading : loading;

    const featured = !isAuthenticated && page === 1 ? displayArticles?.[0] : null;
    const rest = !isAuthenticated && page === 1
        ? displayArticles?.slice(1) || []
        : displayArticles || [];

    // --------------- Unauthenticated Layout (existing behavior) ---------------
    if (!isAuthenticated) {
        if (displayLoading && !displayArticles?.length) {
            return <Layout><FeedSkeleton count={4} /></Layout>;
        }

        if (!displayArticles?.length && !displayLoading) {
            return (
                <Layout>
                    <EmptyState
                        icon={<ArticleOutlined />}
                        title="Your feed is empty"
                        description="Follow writers or explore trending articles to fill your feed."
                        actionLabel="Explore articles"
                        actionTo="/search"
                    />
                </Layout>
            );
        }

        return (
            <Layout>
                {featured && <FeaturedArticle article={featured} />}
                <Grid container spacing={{ xs: 0, md: 4 }}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography
                            variant="overline"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                color: "text.secondary",
                                fontSize: "0.68rem",
                                mb: 1,
                            }}
                        >
                            {page === 1 ? "Latest articles" : `Page ${page}`}
                        </Typography>
                        {rest.map((article, i) => (
                            <Article key={article._id} article={article} index={i} />
                        ))}
                        {displayPagination && (
                            <Pagination
                                page={page}
                                totalPages={displayPagination.totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: "none", md: "block" } }}>
                        <Box sx={{ position: "sticky", top: 88 }}>
                            <Sidebar articles={displayArticles} loading={displayLoading} />
                        </Box>
                    </Grid>
                </Grid>
            </Layout>
        );
    }

    // --------------- Authenticated Layout (personalized feed) ---------------
    const emptyMessage = activeTab === "For You"
        ? "Nothing here yet. Start exploring and engaging with articles to build your personalized feed."
        : "Your feed is empty. Follow writers you enjoy to see their articles here.";

    const emptyAction = activeTab === "Following"
        ? { label: "Explore writers", to: "/search" }
        : { label: "Explore articles", to: "/search" };

    // Featured article: top trending article as the daily featured
    const featuredArticle = trendingArticles?.[0] || null;

    return (
        <Layout>
            {/* Featured Article */}
            {featuredArticle && page === 1 && (
                <Box sx={{ mb: 3 }}>
                    <FeaturedArticle article={featuredArticle} />
                </Box>
            )}

            <FeedToggle activeTab={activeTab} onTabChange={handleTabChange} />

            <Grid container spacing={{ xs: 0, md: 4 }}>
                {/* Main Feed Column */}
                <Grid size={{ xs: 12, md: 8 }}>
                    {displayLoading && !displayArticles?.length ? (
                        <FeedSkeleton count={4} />
                    ) : !displayArticles?.length && !displayLoading ? (
                        <EmptyState
                            icon={<ArticleOutlined />}
                            title="No articles"
                            description={emptyMessage}
                            actionLabel={emptyAction.label}
                            actionTo={emptyAction.to}
                        />
                    ) : (
                        <>
                            {displayArticles.map((article, i) => (
                                <Article key={article._id} article={article} index={i} />
                            ))}
                            {displayPagination && (
                                <Pagination
                                    page={page}
                                    totalPages={displayPagination.totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </>
                    )}

                    {/* Mobile: suggested writers below feed */}
                    <MobileSuggestedWriters
                        users={suggestedUsers}
                        loading={suggestedLoading}
                    />
                </Grid>

                {/* Desktop Sidebar */}
                <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: "none", md: "block" } }}>
                    <Box sx={{ position: "sticky", top: 88 }}>
                        <FeedSidebar
                            users={suggestedUsers}
                            usersLoading={suggestedLoading}
                            trendingArticles={trendingArticles}
                            trendingLoading={trendingLoading}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default TimelineArticlesPage;
