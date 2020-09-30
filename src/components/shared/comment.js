import React, {useState} from "react";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    MenuList,
    Popper,
    ClickAwayListener,
    Typography,
    MenuItem,
    Paper
} from "@material-ui/core";
import moment from "moment";
import {MoreVert, Reply, Share, ThumbUp, ThumbUpAltOutlined} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import createDisplay from 'number-display';
import {Link, useHistory} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {blue} from "@material-ui/core/colors";
import {toggleCommentLike} from "../../redux/comments/comments-action-creators";


const display = createDisplay({
    length: 8,
    decimal: 0,
});

const Comment = ({comment, currentUser, token}) => {

    const useStyles = makeStyles(theme => {
        return {
            card: {
                borderRadius: 24,
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
            },
            more: {
                cursor: "pointer"
            },
            liked: {
                color: blue["700"]
            }
        }
    });

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorElement, setAnchorElement] = useState(null);

    const handleNameClick = () => {
        history.push(`/profile/${comment && comment.author && comment.author._id}`);
    }

    const handleTextClicked = () => {
        history.push(`/articles/${comment && comment.article}/comments/${comment && comment._id}/replies`);
    }

    const handleShareClicked = () => {
        document.execCommand("copy", true, comment && comment.link);
    }

    const handleLikeClicked = () => {
        dispatch(toggleCommentLike(comment._id, token));
    }

    const handleMenuClicked = event => {
        setAnchorElement(event.currentTarget);
        setMenuOpen(true);
    }

    const handleMenuClosed = () => {
        setAnchorElement(null);
        setMenuOpen(false);
    }

    const handleEditClicked = () => {
        setAnchorElement(null);
        setMenuOpen(false);
    }

    const handleDeleteClicked = () => {
        setAnchorElement(null);
        setMenuOpen(false);
    }

    const liked = () => {
        let hasLiked = false;
        comment && comment.likes.forEach(like => {
            if (like.author === currentUser._id) {
                hasLiked = true;
            }
        });
        return hasLiked;
    }

    return (
        <Card variant="elevation" className={classes.card} elevation={1}>
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
                action={currentUser && comment && comment.author && comment.author._id === currentUser._id ?
                    <MoreVert onClick={handleMenuClicked} className={classes.more}/> : null}
            />
            <Popper open={menuOpen} anchorEl={anchorElement}>
                <Paper>
                    <ClickAwayListener onClickAway={handleMenuClosed}>
                        <MenuList>
                            <MenuItem onClick={handleEditClicked}>Edit</MenuItem>
                            <MenuItem onClick={handleDeleteClicked}>Delete</MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
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
                            {display(comment && comment.replyCount)}
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
            <Divider variant="fullWidth"/>
            <CardActions>
                <Grid container={true} justify="space-around" alignItems="center">
                    <Grid item={true}>
                        <Button
                            className={liked() ? classes.liked : null}
                            onClick={handleLikeClicked}
                            startIcon={
                                liked() ?
                                    <ThumbUp className={classes.liked}/>
                                    :
                                    <ThumbUpAltOutlined/>
                            }
                            size="small"
                            variant="text">
                            Like
                        </Button>
                    </Grid>
                    <Grid item={true}>
                        <Link className={classes.link}
                              to={`/articles/${comment && comment.article}/comments/${comment && comment._id}/replies`}>
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
        currentUser: state.auth.currentUser,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Comment);