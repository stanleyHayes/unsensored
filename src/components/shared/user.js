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
    Divider,
    Button
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

import {Comment, Info, Note, Reply, Share, ThumbUp, Visibility} from "@material-ui/icons";
import createDisplay from 'number-display';
import {Link, useHistory} from 'react-router-dom';
import moment from "moment";

const display = createDisplay({
    length: 8,
    decimal: 0,
});

const User = ({user}) => {

    const useStyles = makeStyles(theme => {
        return {
            card: {
                borderRadius: 24,
                borderWidth: 2
            },
            banner: {
                height: 300,
                objectFit: 'cover'
            },
            noImage: {
                height: 150,
                objectFit: 'contain'
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
                cursor: "pointer"
            },
            imageContainer: {
                justifyContent: "center",
                height: 300,
                display: "flex",
                alignItems: "center"
            },
            divider: {
                marginTop: 8,
                marginBottom: 8
            }
        }
    });

    const classes = useStyles();
    const {
        name,
        articleCount,
        replyCount,
        username,
        avatar,
        commentCount,
        link,
        viewCount,
        _id,
        likeCount,
        profile,
        createdAt
    } = user;
    const history = useHistory();

    const handleNameClick = () => {
        history.push(`/profile/${_id}`);
    }


    const handleShareClicked = () => {
        document.execCommand("copy", true, link);
    }

    return (
        <Card variant="elevation" elevation={1} className={classes.card}>
            <CardHeader
                avatar={avatar ? <Avatar src={avatar} className={classes.avatar}/> :
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
                subheader={username}
            />

            <Divider variant="fullWidth"/>
            {avatar ?
                <CardMedia component="img" src={avatar} className={classes.banner}/>
                :
                <div className={classes.imageContainer}>
                    <img
                        className={classes.noImage}
                        alt="default logo"
                        src={`${process.env.PUBLIC_URL}/images/user.svg`}
                    />
                </div>
            }
            <Divider variant="fullWidth"/>
            <CardContent>
                <Typography variant="body1">Joined {moment(createdAt).fromNow()}</Typography>
                <Divider variant="middle" className={classes.divider} />
                {profile ?
                    <Typography gutterBottom={true} variant="body1">{profile}</Typography> :
                    <Typography gutterBottom={true} variant="body1">Has nothing nice to say about himself</Typography>
                }
            </CardContent>
            <Divider variant="fullWidth"/>
            <CardActions>
                <Grid container={true} justify="flex-start" alignItems="center">
                    <Grid item={true}>
                        <Button
                            className={classes.info}
                            startIcon={<Note className={classes.info}/>}
                            size="small"
                            variant="text">
                            {display(articleCount)}
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
                        <Button
                            size="small"
                            className={classes.info}
                            startIcon={<ThumbUp className={classes.info}/>}
                            variant="text">
                            {display(likeCount)}
                        </Button>
                    </Grid>
                    <span className={classes.dot}>&#xb7;</span>
                    <Grid item={true}>
                        <Button className={classes.info} size="small" startIcon={<Reply className={classes.info}/>}
                                variant="text">
                            {display(replyCount)}
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
                        <Link className={classes.link} to={`/profile/${_id}`}>
                            <Button size="small" startIcon={<Info/>} variant="text">
                                Profile
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

export default User;