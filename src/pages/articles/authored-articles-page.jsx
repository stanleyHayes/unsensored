import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { FeedSkeleton } from "../../components/shared/loader";
import Layout from "../../components/layout/layout";
import PageBanner from "../../components/shared/page-banner";
import Pagination from "../../components/shared/pagination";
import { useSelector, useDispatch } from "react-redux";
import ArticleList from "../../components/shared/article-list";
import { getAuthoredArticles } from "../../redux/articles/articles-reducer";

const AuthoredArticlesPage = () => {
    const dispatch = useDispatch();
    const loading = useSelector((s) => s.articles.loading);
    const articles = useSelector((s) => s.articles.articles);
    const pagination = useSelector((s) => s.articles.pagination);
    const token = useSelector((s) => s.auth.token);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getAuthoredArticles({ token, page }));
    }, [dispatch, token, page]);

    const handlePageChange = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

    return (
        <Layout>
            <PageBanner title="My Articles" description="Everything you've written, all in one place." gradient="linear-gradient(135deg, #24243e 0%, #302b63 50%, #0f0c29 100%)" />
            <Box sx={{ pb: 6 }}>
                {loading && !articles?.length ? <FeedSkeleton /> : (
                    <>
                        <ArticleList articles={articles} message="You haven't written any articles yet" emptyAction={{ label: "Write your first article", to: "/article/new" }} />
                        {pagination && <Pagination page={page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />}
                    </>
                )}
            </Box>
        </Layout>
    );
};

export default AuthoredArticlesPage;
