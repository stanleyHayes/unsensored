import React from "react";
import {
    CardContent,
    Card,
    CardMedia,
    CardHeader,
    Avatar,
    Typography,
    Grid,
    CardActions,
    Divider, Button
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import moment from "moment";
import readingTime from 'reading-time';
import {Chat, Comment, Share, ThumbUp, ThumbUpAltOutlined, VerifiedUser, Visibility} from "@material-ui/icons";
import createDisplay from 'number-display';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';


const display = createDisplay({
    length: 8,
    decimal: 0,
});

const Article = ({article, currentUser}) => {

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
            }
        }
    });

    const classes = useStyles();
    const {title, summary, author, datePublished, banner, text, likeCount, commentCount, link, viewCount, _id} = article;
    const {name, avatar, username, _id: authorId} = author;
    const history = useHistory();

    const handleNameClick = () => {
        history.push(`/profile/${username}`);
    }

    const handleTitleClicked = () => {
        history.push(`/articles/${_id}`);
    }

    const handleShareClicked = () => {
        document.execCommand("copy", true, link);
    }

    // const image = `data:image/png;charset=utf-8;base64${banner.data.toString('base64')}`

    const handleLikeClicked = event => {

    }

    return (
        <Card variant="outlined" className={classes.card}>
            <CardHeader
                avatar={avatar ? <Avatar src={avatar} className={classes.avatar}/> : <Avatar>
                    <Typography variant="h5" align="center"> {name[0][0]}</Typography>
                </Avatar>}
                title={<Typography onClick={handleNameClick} variant="body1"
                                   className={classes.name}>{name}</Typography>}
                subheader={moment(datePublished).fromNow()}
                action={currentUser && authorId === currentUser._id ? <VerifiedUser className={classes.author}/> : null}
            />
            <Divider variant="fullWidth"/>
            <CardMedia component="img" src={`${process.env.PUBLIC_URL}/images/image-1.jpg`} className={classes.banner}/>
            <Divider variant="fullWidth"/>
            <CardContent>
                <Grid className={classes.grid} container={true} justify="flex-start" alignItems="center" spacing={1}>
                    <Grid item={true}>
                        <Typography variant="body2">{readingTime(text).text}</Typography>
                    </Grid>
                    <span className={classes.dot}>&#xb7;</span>
                    <Grid item={true}>
                        <Typography variant="body2">{readingTime(text).words} words</Typography>
                    </Grid>
                </Grid>
                <Typography onClick={handleTitleClicked} gutterBottom={true} variant="h6"
                            className={classes.title}>{title}</Typography>
                <Typography variant="body2">{summary}</Typography>
            </CardContent>
            <CardActions>
                <Grid container={true} justify="flex-start" alignItems="center">
                    <Grid item={true}>
                        <Button className={classes.info} startIcon={<ThumbUp className={classes.info}/>} size="small"
                                variant="text">
                            {display(likeCount)}
                        </Button>
                    </Grid>
                    <span className={classes.dot}>&#xb7;</span>
                    <Grid item={true}>
                        <Button size="small" className={classes.info} startIcon={<Comment className={classes.info}/>}
                                variant="text">
                            {display(commentCount)}
                        </Button>
                    </Grid>
                    <span className={classes.dot}>&#xb7;</span>
                    <Grid item={true}>
                        <Button className={classes.info} size="small" startIcon={<Visibility className={classes.info}/>}
                                variant="text">
                            {display(viewCount)}
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
                                currentUser && currentUser.likes.includes(_id) ?
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
                        <Button size="small" startIcon={<Chat/>} variant="text">
                            Comment
                        </Button>
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
        currentUser: state.auth.currentUser,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Article);