import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { FeedSkeleton } from "../../components/shared/loader";
import Layout from "../../components/layout/layout";
import Pagination from "../../components/shared/pagination";
import { useSelector, useDispatch } from "react-redux";
import Article from "../../components/shared/article";
import FeaturedArticle from "../../components/shared/featured-article";
import Sidebar from "../../components/shared/sidebar";
import EmptyState from "../../components/shared/empty-state";
import { ArticleOutlined } from "@mui/icons-material";
import { getArticles } from "../../redux/articles/articles-reducer";

const TimelineArticlesPage = () => {
    const dispatch = useDispatch();
    const loading = useSelector((s) => s.articles.loading);
    const articles = useSelector((s) => s.articles.articles);
    const pagination = useSelector((s) => s.articles.pagination);
    const token = useSelector((s) => s.auth.token);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getArticles({ token, page }));
    }, [dispatch, token, page]);

    const handlePageChange = (p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const featured = page === 1 ? articles?.[0] : null;
    const rest = page === 1 ? articles?.slice(1) || [] : articles || [];

    if (loading && !articles?.length) {
        return <Layout><FeedSkeleton count={4} /></Layout>;
    }

    if (!articles?.length && !loading) {
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
                    <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: "0.08em", color: "text.secondary", fontSize: "0.68rem", mb: 1 }}>
                        {page === 1 ? "Latest articles" : `Page ${page}`}
                    </Typography>
                    {rest.map((article, i) => (
                        <Article key={article._id} article={article} index={i} />
                    ))}
                    {pagination && (
                        <Pagination page={page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: "none", md: "block" } }}>
                    <Box sx={{ position: "sticky", top: 88 }}>
                        <Sidebar articles={articles} loading={loading} />
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default TimelineArticlesPage;
