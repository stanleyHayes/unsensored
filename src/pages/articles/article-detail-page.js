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
    Divider, Tabs, Tab, Paper
} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import {makeStyles} from "@material-ui/styles";
import moment from 'moment';
import readingTime from 'reading-time';
import {connect, useDispatch} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import {getArticle} from "../../redux/articles/articles-action-creator";
import {TOKEN} from "../../constants/constants";
import {Chat, ThumbUp, Visibility} from "@material-ui/icons";
import createDisplay from 'number-display';
const display = createDisplay({
    length: 8,
    decimal: 0,
});

const ArticleDetailPage = ({articleDetail}) => {

    const {articleId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [index, setIndex] = useState(0);
    const handleSelectedTab = (index) => {
        setIndex(index);
    }

    // useEffect(() => {
    //     dispatch(getArticle(articleId, TOKEN, history));
    // }, [articleId, dispatch, history]);

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
            icon: {}
        }
    });

    const classes = useStyles();

    const {title, summary, author, datePublished, banner, text, likes, comments, link, views, _id, tags} = articleDetail;
    const {name, avatar, username} = author;

    return (
        <Layout>
            <Container maxWidth="md">
                <Grid container={true} justify="center">
                    <Grid item={true}>
                        <Card variant="elevation" elevation={0}>
                            <CardMedia component="img" src={banner}
                                       className={classes.banner}/>
                            <CardContent>
                                <Grid container={true} spacing={2}>
                                    <Grid item={true}>
                                        <Typography
                                            variant="body2">{moment(datePublished).fromNow()}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        &#xb7;
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography
                                            variant="body2">{articleDetail && readingTime(articleDetail.text).text}</Typography>
                                    </Grid>
                                </Grid>

                                <Typography variant="h6" gutterBottom={true}
                                            className={classes.title}>{title}</Typography>
                                <Divider variant="fullWidth"/>
                                <Typography variant="body2" gutterBottom={true}
                                            className={classes.summary}>{summary}</Typography>

                                <Divider variant="fullWidth"/>
                                <Typography variant="body1" gutterBottom={true}
                                            className={classes.text}>{text}</Typography>

                                <Divider variant="fullWidth"/>

                                <Typography variant="overline">Authored By</Typography>
                                <CardHeader
                                    avatar={avatar ? <Avatar src={avatar} className={classes.avatar}/> : <Avatar>
                                        <Typography variant="h5" align="center"> {name[0][0]}</Typography>
                                    </Avatar>} title={name} subheader={username}
                                />

                                <Divider variant="fullWidth"/>

                                <Grid className={classes.grid} container={true} spacing={2}>
                                    {tags.length ? (
                                        tags.map((tag, index) => {
                                            return (
                                                <Grid key={index} item={true}>
                                                    <Chip label={tag} size="medium"/>
                                                </Grid>
                                            )
                                        })
                                    ) : null}
                                </Grid>
                                <Paper className={classes.container} variant="elevation" elevation={0}>
                                    <Tabs value={index} onChange={(event, index) => handleSelectedTab(index)}
                                          variant="fullWidth">
                                        <Tab
                                            value={0}
                                            selected={index === 0}
                                            icon={<Chat className={classes.icon}/>}
                                            label={`${display(views.length)} Comments`}
                                        />

                                        <Tab
                                            value={1}
                                            selected={index === 1}
                                            icon={<ThumbUp className={classes.icon}/>}
                                            label={`${display(likes.length)} Likes`}
                                        />

                                        <Tab
                                            value={2}
                                            selected={index === 2}
                                            icon={<Visibility className={classes.icon}/>}
                                            label={`${display(views.length)} Views`}
                                        />
                                    </Tabs>
                                </Paper>
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