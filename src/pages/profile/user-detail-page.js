import React, {useEffect, useState} from "react";
import {Container, Paper, Tab, Tabs} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import ArticleList from "../../components/shared/article-list";
import LikeList from "../../components/shared/like-list";
import CommentList from "../../components/shared/comment-list";
import ReplyList from "../../components/shared/reply-list";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getUserProfile} from "../../redux/users/user-action-creators";
import {getLikesByUser} from "../../redux/likes/likes-action-creators";
import {getArticlesByUser} from "../../redux/articles/articles-action-creator";
import {getCommentsByUser} from "../../redux/comments/comments-action-creators";
import {getRepliesByUser} from "../../redux/replies/replies-action-creators";
import {connect} from "react-redux";
import Layout from "../../components/layout/layout";

const UserDetailPage = ({token, articles, likes, comments, replies, user}) => {

    const useStyles = makeStyles(theme => {
        return {
            card: {
                borderRadius: 8,
                borderWidth: 2
            },
            icon: {
                color: '#aaaaaa'
            },
            link: {
                textDecoration: "none"
            }
        }
    });

    const {userId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfile(userId, token));
        dispatch(getLikesByUser(userId, token));
        dispatch(getArticlesByUser(userId, token));
        dispatch(getCommentsByUser(userId, token));
        dispatch(getRepliesByUser(userId, token));
    }, [dispatch, token, userId]);


    const classes = useStyles();

    const [index, setSelectedIndex] = useState(0);

    const handleSelectedTab = index => {
        setSelectedIndex(index);
    }

    const getTabDetail = index => {
        switch (index) {
            case 0:
                return <ArticleList message={`No articles by ${user && user.username}`} articles={articles}/>
            case 1:
                return <LikeList message={`No items liked by ${user && user.username}`} likes={likes}/>
            case 2:
                return <CommentList message={`No comments by ${user && user.username}`} comments={comments}/>
            case 3:
                return <ReplyList message={`No replies by ${user && user.username}`} replies={replies}/>
            default:
                return <ArticleList message={`No articles by ${user && user.username}`} articles={articles}/>
        }
    }

    return (
        <Layout>
            <Container>
                <Paper className={classes.container} variant="elevation" elevation={0}>
                    <Tabs scrollButtons="on" value={index}
                          onChange={(event, index) => handleSelectedTab(index)}
                          variant="fullWidth">
                        <Tab
                            value={0}
                            selected={index === 0}
                            label="Articles"
                        />

                        <Tab
                            value={1}
                            selected={index === 1}
                            label="Likes"
                        />

                        <Tab
                            value={2}
                            selected={index === 2}
                            label="Comments"
                        />

                        <Tab
                            value={3}
                            selected={index === 3}
                            label="Replies"
                        />
                    </Tabs>
                </Paper>
                <div>
                    {getTabDetail(index)}
                </div>
            </Container>
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        user: state.users.user,
        comments: state.comments.comments,
        articles: state.articles.articles,
        likes: state.likes.likes,
        replies: state.replies.replies
    }
}

export default connect(mapStateToProps)(UserDetailPage)