import React from "react";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography} from "@material-ui/core";
import moment from "moment";
import {CheckCircle, Reply, Share, ThumbUp, ThumbUpAltOutlined} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import createDisplay from 'number-display';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';


const display = createDisplay({
    length: 8,
    decimal: 0,
});

const Comment = ({comment, currentUser}) => {

    const useStyles = makeStyles(theme => {
        return {
            card: {
                borderRadius: 8,
                borderWidth: 2
            },
            banner: {
                height: 250,
                objectFit: 'cover'
            },
            grid: {
                marginBottom: 8
            },
            dot: {
                fontWeight: 900,
                borderRadius: '50%'
            },
            info: {
                color: "#777777"
            },
            name: {
                cursor: "pointer",
                fontWeight: 500
            },
            title: {
                cursor: "pointer",
                fontWeight: 400,
                textTransform: 'uppercase'
            },
            author: {
                color: theme.palette.primary.light,
                fontSize: 16
            },
            text: {
                pointer: "cursor"
            },
            link: {
                textDecoration: "none"
            }
        }
    });

    const classes = useStyles();

    const history = useHistory();

    const handleNameClick = () => {
        history.push(`/profile/${comment && comment.author && comment.author._id}`);
    }

    const handleTextClicked = () => {
        history.push(`/articles/${comment && comment.article}/comments/${comment && comment._id}/replies`);
    }

    const handleShareClicked = () => {
        document.execCommand("copy", true, comment && comment.link);
    }

    const handleLikeClicked = event => {

    }

    return (
        <Card variant="outlined" className={classes.card} square={true} elevation={1}>
            <CardHeader
                avatar={comment && comment.author && comment.author.avatar ?
                    <Avatar src={comment && comment.author.avatar} className={classes.avatar}/> :
                    <Avatar>
                        <Typography
                            variant="h5"
                            align="center">
                            {comment && comment.author && comment.author.name[0][0]}
                        </Typography>
                    </Avatar>}
                title={
                    <Typography
                        onClick={handleNameClick}
                        variant="body1"
                        className={classes.name}>
                        {comment && comment.author && comment.author.name}
                    </Typography>
                }
                subheader={comment && moment(comment.createdAt).fromNow()}
                action={currentUser && comment && comment.author && comment._id === currentUser._id ?
                    <CheckCircle className={classes.author}/> : null}
            />
            <Divider variant="fullWidth"/>
            <CardContent>
                <Typography
                    onClick={handleTextClicked}
                    gutterBottom={true}
                    variant="body1"
                    className={classes.text}>
                    {comment && comment.text}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container={true} justify="flex-start" alignItems="center">
                    <Grid item={true}>
                        <Button className={classes.info} startIcon={<ThumbUp className={classes.info}/>} size="small"
                                variant="text">
                            {comment && display(comment.likeCount)}
                        </Button>
                    </Grid>
                    <span className={classes.dot}>&#xb7;</span>
                    <Grid item={true}>
                        <Button size="small" className={classes.info} startIcon={<Reply className={classes.info}/>}
                                variant="text">
                            {comment && display(comment.replyCount)}
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
            <Divider variant="fullWidth"/>
            <CardActions>
                <Grid container={true} justify="space-around" alignItems="center">
                    <Grid item={true}>
                        <Button
                            onClick={handleLikeClicked}
                            startIcon={
                                currentUser && comment && currentUser.likes.includes(comment && comment._id) ?
                                    <ThumbUp/>
                                    :
                                    <ThumbUpAltOutlined/>
                            }
                            size="small"
                            variant="text">
                            Like
                        </Button>
                    </Grid>
                    <Grid item={true}>
                        <Link className={classes.link} to={`/articles/${comment && comment.article}/comments/${comment && comment._id}/replies`}>
                            <Button size="small" startIcon={<Reply/>} variant="text">
                                Reply
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item={true}>
                        <Button onClick={handleShareClicked} size="small" startIcon={<Share/>} variant="text">
                            Share
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(Comment);