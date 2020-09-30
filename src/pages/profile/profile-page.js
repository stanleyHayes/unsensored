import React, {useEffect} from "react";
import {
    Container,
    Grid,
    Typography,
    Card,
    Avatar,
    CardHeader,
    Divider, IconButton, Button, LinearProgress
} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import {makeStyles} from "@material-ui/styles";
import ArticleList from "../../components/shared/article-list";
import {Edit, KeyboardArrowRight} from "@material-ui/icons";
import {Link, useParams} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {getUserProfile} from "../../redux/users/user-action-creators";
import {getArticlesByUser} from "../../redux/articles/articles-action-creator";
import {grey} from "@material-ui/core/colors";
import {Skeleton} from "@material-ui/lab";

const ProfilePage = ({currentUser, token, user, articles, loading, articleLoading, userLoading}) => {

    const useStyles = makeStyles(theme => {
        return {
            card: {
                borderRadius: 16,
                borderWidth: 2
            },
            icon: {
                color: '#aaaaaa'
            },
            link: {
                textDecoration: "none"
            },
            textButton: {
                color: grey["600"]
            }
        }
    });

    const classes = useStyles();

    const {userId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfile(userId, token));
    }, [dispatch, token, userId]);

    useEffect(() => {
        dispatch(getArticlesByUser(userId, token));
    }, [dispatch, token, userId]);

    const isLoggedInUser = !!(user && currentUser && user._id === currentUser._id);


    return (
        <Layout>
            <Container maxWidth="md">
                <Grid container={true}>
                    <Grid item={true}>
                        <Card className={classes.card} elevation={1}>
                            <CardHeader
                                avatar={
                                    userLoading ? <Skeleton variant="circle" animation="wave" /> :
                                    user && user.avatar ?
                                        <Avatar src={user.avatar} className={classes.avatar}/>
                                        :
                                        <Avatar>
                                            <Typography
                                                variant="h5"
                                                align="center">
                                                {user && user.name[0][0]}
                                            </Typography>
                                        </Avatar>
                                }
                                title={<Typography variant="h6"
                                                   className={classes.name}>{user && user.name}</Typography>}
                                subheader={user && user.username}
                                action={
                                    isLoggedInUser ?
                                        <Link className={classes.link} to={`/edit-profile`}>
                                            <IconButton>
                                                <Edit className={classes.icon}/>
                                            </IconButton>
                                        </Link>
                                        :
                                        null
                                }
                            />
                            <Divider variant="fullWidth"/>
                            <Link className={classes.link} to={`/users/${userId}/activities`}>
                                <Button
                                    endIcon={<KeyboardArrowRight className={classes.icon}/>}
                                    className={classes.textButton}
                                    size="small"
                                    fullWidth={true}>
                                    comments, likes, views & replies by {user && user.username}
                                </Button>
                            </Link>
                            <Divider variant="fullWidth"/>
                        </Card>
                    </Grid>

                    <Divider variant="fullWidth"/>

                    <Grid item={true}>
                        {articleLoading && <LinearProgress variant="query" />}
                        <ArticleList message={`No articles by ${user && user.username}`} articles={articles}/>
                    </Grid>
                </Grid>
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
        replies: state.replies.replies,
        articleLoading: state.articles.loading,
        userLoading: state.users.loading
    }
}
export default connect(mapStateToProps)(ProfilePage);