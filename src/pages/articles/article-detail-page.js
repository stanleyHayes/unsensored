import React, {useEffect, useState} from "react";
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
    Divider, Button
} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import {makeStyles} from "@material-ui/styles";
import moment from 'moment';
import readingTime from 'reading-time';
import {connect, useDispatch} from 'react-redux';
import {useParams, useHistory, Link} from 'react-router-dom';
import {getArticle} from "../../redux/articles/articles-action-creator";
import {TOKEN} from "../../constants/constants";
import {Chat, Comment, Share, ThumbUp, ThumbUpAltOutlined, Visibility} from "@material-ui/icons";
import createDisplay from 'number-display';

const display = createDisplay({
    length: 8,
    decimal: 0,
});

const ArticleDetailPage = ({articleDetail}) => {

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
            }
        }
    });

    const classes = useStyles();

    const handleAuthorClicked = () => {
        history.push(`/profile/${articleDetail && articleDetail.author.username}`);
    }

    const handleShareClicked = () => {
        document.execCommand("copy", true, articleDetail && articleDetail.link);
    }

    console.log(articleDetail)
    return (
        <Layout>
            <Container maxWidth="md">
                <Grid container={true} justify="center">
                    <Grid item={true}>
                        <Card variant="elevation" elevation={0}>
                            <CardMedia component="img" src={articleDetail && articleDetail.banner}
                                       className={classes.banner}/>

                            <Divider variant="fullWidth"/>

                            <CardContent>

                                <Grid container={true} spacing={2} className={classes.grid}>
                                    <Grid item={true}>
                                        <Typography
                                            variant="body2">{articleDetail && moment(articleDetail.datePublished).fromNow()}</Typography>
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
        loading: state.articles.loading
    }
}


export default connect(mapStateToProps)(ArticleDetailPage);