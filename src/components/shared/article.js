import React, {useState} from "react";
import {
    CardContent,
    Card,
    CardMedia,
    CardHeader,
    Avatar,
    Typography,
    Grid,
    CardActions,
    Divider,
    Button,
    ClickAwayListener,
    MenuItem,
    Popper,
    Paper,
    MenuList
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import moment from "moment";
import readingTime from 'reading-time';
import {Chat, Comment, MoreHoriz, MoreVert, Share, ThumbUp, ThumbUpAltOutlined, Visibility} from "@material-ui/icons";
import createDisplay from 'number-display';
import {Link, useHistory} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {toggleLike} from "../../redux/likes/likes-action-creators";
import {blue, grey} from "@material-ui/core/colors";
import {toggleArticleLike} from "../../redux/articles/articles-action-creator";


const display = createDisplay({
    length: 8,
    decimal: 0,
});

const Article = ({article, currentUser, token}) => {

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
            link: {
                textDecoration: "none"
            },
            more: {
                cursor: "pointer",
                color: grey["600"]
            },
            liked: {
                color: blue["700"]
            }
        }
    });

    const classes = useStyles();
    const {title, summary, author, updatedAt, banner, text, likeCount, commentCount, link, viewCount, _id, likes} = article;
    const [anchorElement, setAnchorElement] = useState(null);
    const [openMenu, setMenuOpen] = useState(false);
    const {name, _id: authorId} = author;
    const history = useHistory();
    const dispatch = useDispatch();

    const handleNameClick = () => {
        history.push(`/profile/${authorId}`);
    }

    const handleTitleClicked = () => {
        history.push(`/articles/${_id}`);
    }

    const handleShareClicked = () => {
        document.execCommand("copy", true, link);
    }

    const handleLikeClicked = () => {
        dispatch(toggleArticleLike(_id, token));
    }

    const handleMenuClose = () => {
        setAnchorElement(null);
        setMenuOpen(false);
    }

    const handleMenuOpen = event => {
        setAnchorElement(event.currentTarget);
        setMenuOpen(true);
    }

    const handleDeleteClicked = event => {
        setAnchorElement(null);
        setMenuOpen(false);
    }

    const handleEditClicked = event => {
        setAnchorElement(null);
        setMenuOpen(false);
    }

    const liked = () => {
        let hasLiked = false;
        likes.forEach(like => {
            if(like.author === currentUser._id){
                hasLiked = true;
            }
        });
        return hasLiked;
    }
    return (
        <Card variant="elevation" elevation={1} className={classes.card}>
            <CardHeader
                avatar={author && author.avatar ? <Avatar src={author.avatar} className={classes.avatar}/> :
                    <Avatar>
                        <Typography variant="h5" align="center"> {name[0][0]}</Typography>
                    </Avatar>}
                title={
                    <Typography
                        onClick={handleNameClick}
                        variant="body1"
                        className={classes.name}>
                        {name}
                    </Typography>}
                subheader={moment(updatedAt).fromNow()}
                action={currentUser && authorId === currentUser._id ?
                    <MoreHoriz className={classes.more} onClick={handleMenuOpen}/>
                    : null}
            />
            <Popper open={openMenu} anchorEl={anchorElement}>
                <Paper>
                    <ClickAwayListener onClickAway={handleMenuClose}>
                        <MenuList>
                            <MenuItem onClick={handleEditClicked}>Edit</MenuItem>
                            <MenuItem onClick={handleDeleteClicked}>Delete</MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>

            <Divider variant="fullWidth"/>
            <CardMedia component="img" src={banner} className={classes.banner}/>
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
                        <Button
                            className={classes.info}
                            startIcon={<ThumbUp className={classes.info}/>}
                            size="small"
                            variant="text">
                            {display(likeCount)}
                        </Button>
                    </Grid>
                    <span className={classes.dot}>&#xb7;</span>
                    <Grid item={true}>
                        <Button
                            size="small"
                            className={classes.info}
                            startIcon={<Comment className={classes.info}/>}
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
                            className={liked() ? classes.liked: null}
                            onClick={handleLikeClicked}
                            startIcon={liked() ? <ThumbUp className={classes.liked}/> : <ThumbUpAltOutlined/>}
                            size="small"
                            variant="text">
                            Like
                        </Button>
                    </Grid>
                    <Grid item={true}>
                        <Link className={classes.link} to={`/articles/${article && article._id}/comments`}>
                            <Button size="small" startIcon={<Chat/>} variant="text">
                                Comment
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

export default connect(mapStateToProps)(Article);