import React, {useEffect} from "react";
import {
    CardContent,
    Container,
    Grid,
    Card,
    CardMedia,
    Typography,
    CardHeader,
    Avatar,
    Chip,
    Divider, Button ,LinearProgress
} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import {makeStyles} from "@material-ui/styles";
import moment from 'moment';
import readingTime from 'reading-time';
import {connect, useDispatch} from 'react-redux';
import {useParams, useHistory, Link} from 'react-router-dom';
import {getArticle} from "../../redux/articles/articles-action-creator";
import {TOKEN} from "../../constants/constants";
import {Chat, Comment, DeleteForever, Edit, Share, ThumbUp, ThumbUpAltOutlined, Visibility} from "@material-ui/icons";
import createDisplay from 'number-display';
import {grey, red} from "@material-ui/core/colors";
import {createArticleView} from "../../redux/views/views-action-creators";

const display = createDisplay({
    length: 8,
    decimal: 0,
});

const ArticleDetailPage = ({articleDetail, currentUser, token, loading}) => {

    const {articleId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getArticle(articleId, TOKEN, history));
    }, [articleId, dispatch, history]);

    const useStyles = makeStyles(theme => {
        return {
            banner: {},
            title: {
                marginTop: 16,
                marginBottom: 16
            },
            summary: {
                marginTop: 16,
                marginBottom: 16
            },
            text: {
                marginTop: 16,
                marginBottom: 16
            },
            grid: {
                marginTop: 16,
                marginBottom: 16
            },
            icon: {},
            name: {
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#555555'
            },
            dot: {
                color: '#777777'
            },
            link: {
                textDecoration: 'none'
            },
            deleteButton: {
                borderRadius: 0,
                borderWidth: 2,
                borderColor: red["600"],
                backgroundColor: red["900"],
                color: "white",
                paddingTop: 8,
                paddingBottom: 8,
                '&:hover': {
                    backgroundColor: red["700"],
                },
                '&:active': {
                    backgroundColor: red["700"],
                }
            },
            editButton: {
                borderRadius: 0,
                borderWidth: 2,
                borderColor: grey["600"],
                backgroundColor: grey["900"],
                color: "white",
                paddingTop: 8,
                paddingBottom: 8,
                '&:hover': {
                    backgroundColor: grey["700"],
                    color: "black"
                },
                '&:active': {
                    backgroundColor: grey["700"],
                    color: "black"
                }
            },
            actionContainer: {
                marginBottom: 16
            }
        }
    });

    const classes = useStyles();

    const handleAuthorClicked = () => {
        history.push(`/profile/${articleDetail && articleDetail.author._id}`);
    }

    const handleShareClicked = () => {
        document.execCommand("copy", true, articleDetail && articleDetail.link);
    }

    const handleArticleDelete = () => {

    }

    useEffect(() => {
        dispatch(createArticleView(articleId, token));
    }, [articleId, dispatch, token])

    const isLoggedInUser = !!(articleDetail && currentUser && articleDetail.author._id === currentUser._id);

    return (
        <Layout>
            <Container maxWidth="md">
                {loading && <LinearProgress variant="query" /> }
                <Grid container={true} justify="center">
                    <Grid item={true}>
                        <Card square={true} variant="elevation" elevation={0}>
                            <CardMedia component="img" src={articleDetail && articleDetail.banner}
                                       className={classes.banner}/>

                            <Divider variant="fullWidth"/>

                            <CardContent>
                                <Grid container={true} spacing={2} className={classes.grid}>
                                    <Grid item={true}>
                                        <Typography
                                            variant="body2">{articleDetail && moment(articleDetail.updatedAt).fromNow()}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        &#xb7;
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography
                                            variant="body2">{articleDetail && readingTime(articleDetail.text).text}</Typography>
                                    </Grid>
                                </Grid>

                                <Divider variant="fullWidth"/>

                                <Typography variant="h6" gutterBottom={true}
                                            className={classes.title}>{articleDetail && articleDetail.title}</Typography>
                                <Divider variant="fullWidth"/>
                                <Typography variant="body2" gutterBottom={true}
                                            className={classes.summary}>{articleDetail && articleDetail.summary}</Typography>

                                <Divider variant="fullWidth"/>
                                <Typography variant="body1" gutterBottom={true}
                                            className={classes.text}>{articleDetail && articleDetail.text}</Typography>

                                <Divider variant="fullWidth"/>

                                <Typography variant="overline">Authored By</Typography>
                                <CardHeader
                                    avatar={
                                        articleDetail && articleDetail.author && articleDetail.author.avatar ?
                                            <Avatar src={articleDetail && articleDetail.avatar}
                                                    className={classes.avatar}/> :
                                            <Avatar>
                                                <Typography variant="h5"
                                                            align="center"> {articleDetail && articleDetail.author && articleDetail.author.name[0][0]}</Typography>
                                            </Avatar>
                                    }
                                    title={<Typography onClick={handleAuthorClicked} className={classes.name}
                                                       variant="body1">{articleDetail && articleDetail.author.name}</Typography>}
                                    subheader={articleDetail && articleDetail.author.username}
                                />

                                <Divider variant="fullWidth"/>

                                <Grid className={classes.grid} container={true} spacing={2}>
                                    {articleDetail && articleDetail.tags.length ? (
                                        articleDetail && articleDetail.tags.map((tag, index) => {
                                            return (
                                                <Grid key={index} item={true}>
                                                    <Chip label={tag} size="medium"/>
                                                </Grid>
                                            )
                                        })
                                    ) : null}
                                </Grid>

                                {isLoggedInUser ? (
                                    <Grid container={true} spacing={2} className={classes.actionContainer}>
                                        <Grid item={true} xs={12}>
                                            <Divider variant="fullWidth"/>
                                        </Grid>
                                        <Grid item={true}>
                                            <Link className={classes.link} to={`/articles/${articleDetail && articleDetail._id}/update`}>
                                                <Button
                                                    variant="outlined"
                                                    size="medium"
                                                    className={classes.editButton}
                                                    startIcon={<Edit/>}>
                                                    Edit
                                                </Button>
                                            </Link>
                                        </Grid>
                                        <Grid item={true}>
                                            <Button
                                                onClick={handleArticleDelete}
                                                variant="outlined"
                                                size="medium"
                                                className={classes.deleteButton}
                                                startIcon={<DeleteForever/>}>
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                ) : null}

                                <Divider variant="fullWidth"/>

                                <Grid container={true} justify="flex-start" alignItems="center"
                                      className={classes.grid}>
                                    <Grid item={true}>
                                        <Link className={classes.link}
                                              to={`/articles/${articleDetail && articleDetail._id}/likes`}>
                                            <Button className={classes.info}
                                                    startIcon={<ThumbUp className={classes.info}/>}
                                                    size="small" variant="text">
                                                {articleDetail && display(articleDetail.likeCount)}
                                            </Button>
                                        </Link>
                                    </Grid>
                                    <span className={classes.dot}>&#xb7;</span>
                                    <Grid item={true}>
                                        <Link className={classes.link}
                                              to={`/articles/${articleDetail && articleDetail._id}/comments`}>
                                            <Button size="small" className={classes.info}
                                                    startIcon={<Comment className={classes.info}/>} variant="text">
                                                {articleDetail && display(articleDetail.commentCount)}
                                            </Button>
                                        </Link>
                                    </Grid>
                                    <span className={classes.dot}>&#xb7;</span>
                                    <Grid item={true}>
                                        <Link className={classes.link}
                                              to={`/articles/${articleDetail && articleDetail._id}/views`}>
                                            <Button className={classes.info} size="small"
                                                    startIcon={<Visibility className={classes.info}/>} variant="text">
                                                {articleDetail && display(articleDetail.viewCount)}
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid>

                                <Divider variant="fullWidth"/>

                                <Grid container={true} justify="space-around" alignItems="center"
                                      className={classes.grid}>
                                    <Grid item={true}>
                                        <Button startIcon={<ThumbUpAltOutlined/>} size="small" variant="text">
                                            Like
                                        </Button>
                                    </Grid>
                                    <Grid item={true}>
                                        <Link className={classes.link}
                                              to={`/articles/${articleDetail && articleDetail._id}/comments`}>
                                            <Button startIcon={<Chat/>} size="small" variant="text">
                                                Comment
                                            </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item={true}>
                                        <Button onClick={handleShareClicked} size="small" startIcon={<Share/>}
                                                variant="text">
                                            Share
                                        </Button>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        articleDetail: state.articles.articleDetail,
        loading: state.articles.loading,
        currentUser: state.auth.currentUser,
        token: state.auth.token
    }
}


export default connect(mapStateToProps)(ArticleDetailPage);