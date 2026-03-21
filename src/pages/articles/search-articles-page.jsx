import React, { useEffect, useState, useCallback } from "react";
import {
    Box, TextField, InputAdornment, Typography, Chip, Avatar,
    Skeleton, Grid, keyframes,
} from "@mui/material";
import {
    SearchRounded, TrendingUpRounded, LocalOfferRounded,
    PeopleRounded, East,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { FeedSkeleton } from "../../components/shared/loader";
import Layout from "../../components/layout/layout";
import PageBanner from "../../components/shared/page-banner";
import Pagination from "../../components/shared/pagination";
import { useSelector, useDispatch } from "react-redux";
import ArticleList from "../../components/shared/article-list";
import Article from "../../components/shared/article";
import { getArticles, getTrendingArticles, getTags } from "../../redux/articles/articles-reducer";
import { getUsers } from "../../redux/users/user-reducer";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

// --------------- Section Header ---------------
const SectionHeader = ({ icon, title, index = 0 }) => (
    <Box sx={{
        display: "flex", alignItems: "center", gap: 1, mb: 2, mt: 1,
        animation: `${fadeIn} 0.4s ease-out ${index * 0.1}s both`,
    }}>
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "1.05rem", sm: "1.15rem" }, letterSpacing: "-0.01em" }}>
            {title}
        </Typography>
    </Box>
);

// --------------- Trending Card (compact grid) ---------------
const TrendingCard = ({ article, index = 0 }) => {
    const navigate = useNavigate();
    return (
        <Box
            onClick={() => navigate(`/articles/${article._id}`)}
            sx={{
                borderRadius: 3, overflow: "hidden", cursor: "pointer",
                border: "1px solid", borderColor: "divider", bgcolor: "background.paper",
                animation: `${fadeIn} 0.4s ease-out ${index * 0.08}s both`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (t) => t.palette.mode === "dark"
                        ? "0 16px 32px rgba(0,0,0,0.35)"
                        : "0 16px 32px rgba(0,0,0,0.07)",
                    borderColor: "transparent",
                    "& .trending-thumb": { transform: "scale(1.05)" },
                },
            }}
        >
            {article.banner && (
                <Box sx={{ height: 140, overflow: "hidden" }}>
                    <Box
                        className="trending-thumb"
                        component="img" src={article.banner} alt={article.title}
                        referrerPolicy="no-referrer"
                        sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
                    />
                </Box>
            )}
            <Box sx={{ p: 2 }}>
                {article.tags?.length > 0 && (
                    <Box sx={{ display: "flex", gap: 0.5, mb: 1, flexWrap: "wrap" }}>
                        {article.tags.slice(0, 2).map((tag) => (
                            <Chip key={tag} label={tag} size="small" sx={{
                                height: 20, fontSize: "0.62rem", fontWeight: 600,
                                bgcolor: (t) => t.palette.mode === "dark" ? "rgba(167,139,250,0.1)" : "rgba(26,26,46,0.05)",
                                color: "primary.main", border: "none",
                            }} />
                        ))}
                    </Box>
                )}
                <Typography variant="subtitle2" sx={{
                    fontWeight: 700, fontSize: "0.88rem", lineHeight: 1.3,
                    display: "-webkit-box", WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                    mb: 1,
                }}>
                    {article.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <Avatar src={article.author?.avatar} sx={{ width: 22, height: 22, fontSize: "0.6rem", bgcolor: "primary.main", fontWeight: 700 }}>
                        {article.author?.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem", fontWeight: 500 }}>
                        {article.author?.name}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

// --------------- Writer Card ---------------
const WriterCard = ({ user, index = 0 }) => {
    const navigate = useNavigate();
    return (
        <Box
            onClick={() => navigate(`/profile/${user._id}`)}
            sx={{
                display: "flex", flexDirection: "column", alignItems: "center",
                minWidth: 100, cursor: "pointer", p: 2, borderRadius: 3,
                border: "1px solid", borderColor: "divider", bgcolor: "background.paper",
                animation: `${fadeIn} 0.4s ease-out ${index * 0.06}s both`,
                transition: "all 0.25s ease",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: (t) => t.palette.mode === "dark"
                        ? "0 8px 24px rgba(0,0,0,0.3)"
                        : "0 8px 24px rgba(0,0,0,0.06)",
                    borderColor: "primary.main",
                },
            }}
        >
            <Avatar
                src={user.avatar}
                sx={{
                    width: 52, height: 52, mb: 1, fontSize: "1rem",
                    bgcolor: "primary.main", fontWeight: 700,
                    border: "2px solid", borderColor: "divider",
                }}
            >
                {user.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Typography variant="caption" sx={{
                fontWeight: 600, fontSize: "0.74rem", textAlign: "center",
                maxWidth: 90, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
                {user.name}
            </Typography>
            {user.username && (
                <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.64rem" }}>
                    @{user.username}
                </Typography>
            )}
        </Box>
    );
};

// --------------- Skeleton Helpers ---------------
const TagsSkeleton = () => (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" width={70 + Math.random() * 40} height={30} sx={{ borderRadius: 2 }} />
        ))}
    </Box>
);

const WritersSkeleton = () => (
    <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
        {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 100, p: 2 }}>
                <Skeleton variant="circular" width={52} height={52} sx={{ mb: 1 }} />
                <Skeleton variant="text" width={60} />
            </Box>
        ))}
    </Box>
);

const TrendingSkeleton = () => (
    <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Skeleton variant="rounded" height={220} sx={{ borderRadius: 3 }} />
            </Grid>
        ))}
    </Grid>
);

// --------------- Main Page ---------------
const SearchArticlesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((s) => s.articles.loading);
    const articles = useSelector((s) => s.articles.articles);
    const pagination = useSelector((s) => s.articles.pagination);
    const trendingArticles = useSelector((s) => s.articles.trendingArticles);
    const trendingLoading = useSelector((s) => s.articles.trendingLoading);
    const tags = useSelector((s) => s.articles.tags);
    const tagsLoading = useSelector((s) => s.articles.tagsLoading);
    const writers = useSelector((s) => s.users.users);
    const writersLoading = useSelector((s) => s.users.loading);
    const token = useSelector((s) => s.auth.token);
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const isSearching = search.length > 0;

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(query);
            setPage(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [query]);

    // Fetch search results when searching
    useEffect(() => {
        if (isSearching) {
            dispatch(getArticles({ token, page, search }));
        }
    }, [dispatch, token, page, search, isSearching]);

    // Fetch explore data on mount (tags, trending, writers)
    useEffect(() => {
        dispatch(getTrendingArticles({ token, limit: 4 }));
        dispatch(getTags({ token, limit: 20 }));
        dispatch(getUsers({ token, limit: 8, sortBy: "createdAt:asc" }));
    }, [dispatch, token]);

    const handlePageChange = (p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleTagClick = (tag) => {
        setQuery(tag);
    };

    return (
        <Layout>
            <PageBanner
                title="Explore"
                description="Discover new ideas, perspectives, and voices."
                gradient="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
            >
                <TextField
                    fullWidth
                    placeholder="Search by title, topic, or tag..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    size="small"
                    sx={{
                        maxWidth: 480,
                        "& .MuiOutlinedInput-root": {
                            bgcolor: "rgba(255,255,255,0.1)", color: "white", borderRadius: 2,
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.15)" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.4)" },
                        },
                        "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.4)" },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRounded sx={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </PageBanner>

            <Box sx={{ pb: 6 }}>
                {isSearching ? (
                    /* ---------- Search Results ---------- */
                    <>
                        {loading && !articles?.length ? <FeedSkeleton /> : (
                            <>
                                <ArticleList articles={articles} message={`No results for "${search}"`} />
                                {pagination && (
                                    <Pagination page={page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
                                )}
                            </>
                        )}
                    </>
                ) : (
                    /* ---------- Explore Sections ---------- */
                    <>
                        {/* Popular Tags */}
                        <Box sx={{ mb: 4 }}>
                            <SectionHeader
                                icon={<LocalOfferRounded sx={{ fontSize: 20, color: "primary.main" }} />}
                                title="Popular Tags"
                                index={0}
                            />
                            {tagsLoading ? <TagsSkeleton /> : (
                                <Box sx={{
                                    display: "flex", gap: 1, flexWrap: "wrap",
                                    animation: `${fadeIn} 0.4s ease-out 0.1s both`,
                                }}>
                                    {tags.map(({ tag, count }, i) => (
                                        <Chip
                                            key={tag}
                                            label={`${tag} (${count})`}
                                            onClick={() => handleTagClick(tag)}
                                            sx={{
                                                fontWeight: 600, fontSize: "0.76rem",
                                                borderRadius: 2, cursor: "pointer",
                                                bgcolor: (t) => t.palette.mode === "dark"
                                                    ? "rgba(167,139,250,0.08)"
                                                    : "rgba(26,26,46,0.04)",
                                                color: "text.primary",
                                                border: "1px solid",
                                                borderColor: "divider",
                                                transition: "all 0.2s ease",
                                                animation: `${fadeIn} 0.3s ease-out ${i * 0.03}s both`,
                                                "&:hover": {
                                                    bgcolor: "primary.main",
                                                    color: "white",
                                                    borderColor: "primary.main",
                                                },
                                            }}
                                        />
                                    ))}
                                    {!tagsLoading && tags.length === 0 && (
                                        <Typography variant="body2" color="text.secondary">No tags found yet.</Typography>
                                    )}
                                </Box>
                            )}
                        </Box>

                        {/* Featured Writers */}
                        <Box sx={{ mb: 4 }}>
                            <SectionHeader
                                icon={<PeopleRounded sx={{ fontSize: 20, color: "primary.main" }} />}
                                title="Featured Writers"
                                index={1}
                            />
                            {writersLoading ? <WritersSkeleton /> : (
                                <Box sx={{
                                    display: "flex", gap: 2, overflowX: "auto", pb: 1,
                                    scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" },
                                }}>
                                    {writers.map((user, i) => (
                                        <WriterCard key={user._id} user={user} index={i} />
                                    ))}
                                    {!writersLoading && writers.length === 0 && (
                                        <Typography variant="body2" color="text.secondary">No writers to feature yet.</Typography>
                                    )}
                                </Box>
                            )}
                        </Box>

                        {/* Trending Now */}
                        <Box sx={{ mb: 4 }}>
                            <SectionHeader
                                icon={<TrendingUpRounded sx={{ fontSize: 20, color: "primary.main" }} />}
                                title="Trending Now"
                                index={2}
                            />
                            {trendingLoading ? <TrendingSkeleton /> : (
                                trendingArticles.length > 0 ? (
                                    <Grid container spacing={2}>
                                        {trendingArticles.map((article, i) => (
                                            <Grid size={{ xs: 12, sm: 6 }} key={article._id}>
                                                <TrendingCard article={article} index={i} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography variant="body2" color="text.secondary" sx={{ animation: `${fadeIn} 0.4s ease-out both` }}>
                                        No trending articles yet.
                                    </Typography>
                                )
                            )}
                        </Box>
                    </>
                )}
            </Box>
        </Layout>
    );
};

export default SearchArticlesPage;
