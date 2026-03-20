import React, { useEffect, useState, useCallback } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import { FeedSkeleton } from "../../components/shared/loader";
import Layout from "../../components/layout/layout";
import PageBanner from "../../components/shared/page-banner";
import Pagination from "../../components/shared/pagination";
import { useSelector, useDispatch } from "react-redux";
import ArticleList from "../../components/shared/article-list";
import { getArticles } from "../../redux/articles/articles-reducer";

const SearchArticlesPage = () => {
    const dispatch = useDispatch();
    const loading = useSelector((s) => s.articles.loading);
    const articles = useSelector((s) => s.articles.articles);
    const pagination = useSelector((s) => s.articles.pagination);
    const token = useSelector((s) => s.auth.token);
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(query);
            setPage(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        dispatch(getArticles({ token, page, search: search || undefined }));
    }, [dispatch, token, page, search]);

    const handlePageChange = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

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
                {loading && !articles?.length ? <FeedSkeleton /> : (
                    <>
                        <ArticleList articles={articles} message={search ? `No results for "${search}"` : "No articles yet"} />
                        {pagination && <Pagination page={page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />}
                    </>
                )}
            </Box>
        </Layout>
    );
};

export default SearchArticlesPage;
