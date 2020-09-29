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
    Typography,
    Paper,
    Popper,
    MenuList,
    ClickAwayListener,
    MenuItem
} from "@material-ui/core";
import moment from "moment";
import {MoreHoriz, Share, ThumbUp, ThumbUpAltOutlined} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import createDisplay from 'number-display';
import {useHistory} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {toggleLike} from "../../redux/likes/likes-action-creators";
import {blue} from "@material-ui/core/colors";


const display = createDisplay({
    length: 8,
    decimal: 0,
});

const CommentReply = ({reply, currentUser, token}) => {

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

    const handleNameClick = () => {
        history.push(`/profile/${reply && reply.author && reply.author._id}`);
    }

    const handleShareClicked = () => {
        document.execCommand("copy", true, reply && reply.link);
    }

    const handleLikeClicked = () => {
        dispatch(toggleLike({reply: reply._id, type: 'REPLY'}, token));
    }


    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorElement, setAnchorElement] = useState(null);

    const handleMenuClicked = event => {
        setAnchorElement(event.currentTarget);
        setMenuOpen(true);
    }

    const handleMenuClosed = () => {
        setMenuOpen(false);
    }

    const handleEditClicked = () => {

    }

    const handleDeleteClicked = () => {

    }

    const liked = reply => {
        let hasLiked = false;
        reply.likes.forEach(like => {
            if(like.author === currentUser._id){
                hasLiked = true;
            }
        });
        return hasLiked;
    }

    return (
        <Card variant="elevation" className={classes.card}>
            <CardHeader
                avatar={reply && reply.author && reply.author.avatar ?
                    <Avatar src={reply && reply.author.avatar} className={classes.avatar}/> :
                    <Avatar>
                        <Typography
                            variant="h5"
                            align="center">
                            {reply && reply.author && reply.author.name[0][0]}
                        </Typography>
                    </Avatar>}
                title={
                    <Typography
                        onClick={handleNameClick}
                        variant="body1"
                        display="initial"
                        className={classes.name}>
                        {reply && reply.author && reply.author.name}
                    </Typography>
                }
                subheader={reply && moment(reply.createdAt).fromNow()}
                action={currentUser && reply && reply.author && reply.author._id === currentUser._id ?
                    <MoreHoriz onClick={handleMenuClicked} className={classes.more}/> : null}
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
                    gutterBottom={true}
                    variant="body1"
                    className={classes.text}>
                    {reply && reply.text}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container={true} justify="flex-start" alignItems="center">
                    <Grid item={true}>
                        <Button className={classes.info} startIcon={<ThumbUp className={classes.info}/>} size="small"
                                variant="text">
                            {reply && display(reply.likeCount)}
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
                                reply && liked(reply) ?
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

export default connect(mapStateToProps)(CommentReply);