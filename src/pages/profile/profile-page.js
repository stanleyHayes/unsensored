import React, {useEffect} from "react";
import {
    Container,
    Grid,
    Typography,
    Card,
    Avatar,
    CardHeader,
    Divider, IconButton, Button, LinearProgress, CardContent
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
import moment from "moment";

const ProfilePage = ({currentUser, token, user, articles, loading, articleLoading, userLoading}) => {

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
            },
            textButton: {
                color: grey["600"],
                marginTop: 8
            },
            divider: {
                marginTop: 8,
                marginBottom: 8
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
                    <Grid item={true} xs={12}>
                        <Card className={classes.card} elevation={1}>
                            <CardHeader
                                avatar={
                                    userLoading ? <Skeleton variant="circle" animation="wave"/> :
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
                            <CardContent>

                                {
                                    userLoading ? <Skeleton variant="text" animation="wave"/> : user && user.profile ?
                                        <div>
                                            <Typography gutterBottom={true} variant="body2">Profile</Typography>
                                            <Typography gutterBottom={true} variant="h6">{user.profile}</Typography>
                                        </div>
                                        :
                                        <div>
                                            <Typography gutterBottom={true} variant="body2">Profile</Typography>
                                            <Typography gutterBottom={true} variant="h6">
                                                Has nothing nice to say about himself
                                            </Typography>
                                        </div>
                                }
                                <Divider className={classes.divider} variant="fullWidth"/>
                                {
                                    userLoading ? <Skeleton variant="text" animation="wave"/> :
                                        user && user.birthday ?
                                            <div>
                                                <Typography gutterBottom={true} variant="body2">Birthday</Typography>
                                                <Typography
                                                    gutterBottom={true}
                                                    variant="h6">
                                                    {new Date(user.birthday).toDateString()}
                                                </Typography>
                                            </div>
                                            :
                                            <div>
                                                <Typography gutterBottom={true} variant="body2">Birthday</Typography>
                                                <Typography
                                                    gutterBottom={true}
                                                    variant="h6">
                                                    Probably wasn't born
                                                </Typography>
                                            </div>

                                }

                                <Divider variant="fullWidth" className={classes.divider}/>

                                {
                                    userLoading ? <Skeleton variant="text" animation="wave"/> :
                                        <div>
                                            <Typography gutterBottom={true} variant="body2">Joined</Typography>
                                            <Typography
                                                gutterBottom={true}
                                                variant="h6">
                                                {user && moment(user.createdAt).fromNow()}
                                            </Typography>
                                        </div>

                                }

                                <Divider variant="fullWidth" className={classes.divider}/>
                                <Link className={classes.link} to={`/users/${userId}/activities`}>
                                    <Button
                                        endIcon={<KeyboardArrowRight className={classes.icon}/>}
                                        className={classes.textButton}
                                        size="medium"
                                        fullWidth={true}>
                                        comments, likes, views & replies by {user && user.username}
                                    </Button>
                                </Link>
                            </CardContent>
                            <Divider variant="fullWidth"/>
                        </Card>
                    </Grid>

                    <Divider variant="fullWidth"/>

                    <Grid item={true} xs={12}>
                        {articleLoading && <LinearProgress variant="query"/>}
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