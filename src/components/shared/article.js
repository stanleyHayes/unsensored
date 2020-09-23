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
import {Comment, Share, ThumbUp, Visibility} from "@material-ui/icons";
import createDisplay from 'number-display';

const display = createDisplay({
    length: 8,
    decimal: 0,
});

const Article = ({article}) => {

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
            }
        }
    });

    const classes = useStyles();

    const {title, summary, author, datePublished, banner, text, likes, comments, link, views} = article;
    const {name, avatar} = author;

    return (
        <Card variant="outlined" className={classes.card}>
            <CardHeader
                avatar={avatar ? <Avatar src={avatar} className={classes.avatar}/> : <Avatar>
                    <Typography variant="h5" align="center"> {name[0][0]}</Typography>
                </Avatar>}
                title={name}
                subheader={moment(datePublished).fromNow()}
            />
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
                <Typography gutterBottom={true} variant="h6">{title}</Typography>
                <Typography variant="body2">{summary}</Typography>
            </CardContent>
            <CardActions>
                <Grid container={true} justify="flex-start" alignItems="center">
                    <Grid item={true}>
                        <Button className={classes.info} startIcon={<ThumbUp className={classes.info}/>} size="small" variant="text">
                            {display(likes.length)}
                        </Button>
                    </Grid>
                    <span className={classes.dot}>&#xb7;</span>
                    <Grid item={true}>
                        <Button size="small" className={classes.info} startIcon={<Comment className={classes.info}/>} variant="text">
                            {display(comments.length)}
                        </Button>
                    </Grid>
                    <span className={classes.dot}>&#xb7;</span>
                    <Grid item={true}>
                        <Button className={classes.info} size="small" startIcon={<Visibility className={classes.info}/>} variant="text">
                            {display(views.length)}
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
            <Divider variant="fullWidth"/>
            <CardActions>
                <Grid container={true} justify="space-around" alignItems="center">
                    <Grid item={true}>
                        <Button startIcon={<ThumbUp/>} size="small" variant="text">
                            Like
                        </Button>
                    </Grid>
                    <Grid item={true}>
                        <Button startIcon={<Comment/>} variant="text">
                            Comment
                        </Button>
                    </Grid>
                    <Grid item={true}>
                        <Button size="small" startIcon={<Share/>} variant="text">
                            Share
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default Article;