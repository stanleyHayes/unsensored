import React, { useEffect, useState } from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";
import ArticleList from "../../components/shared/article-list";
import LikeList from "../../components/shared/like-list";
import CommentList from "../../components/shared/comment-list";
import ReplyList from "../../components/shared/reply-list";
import Pagination from "../../components/shared/pagination";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/users/user-reducer";
import { getLikesByUser } from "../../redux/likes/likes-reducer";
import { getArticlesByUser } from "../../redux/articles/articles-reducer";
import { getCommentsByUser } from "../../redux/comments/comments-reducer";
import { getRepliesByUser } from "../../redux/replies/replies-reducer";
import Layout from "../../components/layout/layout";
import FollowButton from "../../components/shared/follow-button";

const UserDetailPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const token = useSelector((s) => s.auth.token);
    const user = useSelector((s) => s.users.user);
    const articles = useSelector((s) => s.articles.articles);
    const articlePagination = useSelector((s) => s.articles.pagination);
    const likes = useSelector((s) => s.likes.likes);
    const comments = useSelector((s) => s.comments.comments);
    const replies = useSelector((s) => s.replies.replies);

    const [tabIndex, setTabIndex] = useState(0);
    const [articlePage, setArticlePage] = useState(1);

    useEffect(() => {
        dispatch(getUserProfile({ userId, token }));
        dispatch(getLikesByUser({ userId, token }));
        dispatch(getCommentsByUser({ userId, token }));
        dispatch(getRepliesByUser({ userId, token }));
    }, [dispatch, token, userId]);

    useEffect(() => {
        dispatch(getArticlesByUser({ userId, token, page: articlePage }));
    }, [dispatch, token, userId, articlePage]);

    const handleTabChange = (_, newValue) => {
        setTabIndex(newValue);
        setArticlePage(1);
    };

    const renderTab = () => {
        switch (tabIndex) {
            case 0:
                return (
                    <>
                        <ArticleList message={`No articles by @${user?.username}`} articles={articles} />
                        {articlePagination && (
                            <Pagination page={articlePage} totalPages={articlePagination.totalPages} onPageChange={(p) => setArticlePage(p)} />
                        )}
                    </>
                );
            case 1:
                return <LikeList message={`No items liked by @${user?.username}`} likes={likes} />;
            case 2:
                return <CommentList message={`No comments by @${user?.username}`} comments={comments} />;
            case 3:
                return <ReplyList message={`No replies by @${user?.username}`} replies={replies} />;
            default:
                return null;
        }
    };

    return (
        <Layout>
            <Container maxWidth="md">
                <Box sx={{ pt: 2, pb: 6, minHeight: "80vh" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mb: 2 }}>
                        <FollowButton userId={userId} />
                    </Box>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            mb: 3,
                            "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
                        }}
                    >
                        <Tab label="Articles" />
                        <Tab label="Likes" />
                        <Tab label="Comments" />
                        <Tab label="Replies" />
                    </Tabs>
                    {renderTab()}
                </Box>
            </Container>
        </Layout>
    );
};

export default UserDetailPage;
