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
            }
        }
    });

    const classes = useStyles();

    const {title, summary, author, datePublished, banner, text, likes, comments, link} = article;
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
            <Divider variant="fullWidth" />
            <CardMedia component="img" src={banner} className={classes.banner}/>
            <Divider variant="fullWidth" />
            <CardContent>
                <Grid className={classes.grid} container={true} justify="flex-start" spacing={2}>
                    <Grid item={true}>
                        <Typography variant="body2">{readingTime(text).text}</Typography>
                    </Grid>
                    <Grid item={true}>
                        <Typography variant="body2">{readingTime(text).words} words</Typography>
                    </Grid>
                </Grid>
                <Typography gutterBottom={true} variant="h6">{title}</Typography>
                <Typography variant="body2">{summary}</Typography>
            </CardContent>
            <Divider variant="fullWidth"/>
            <CardActions>
                <Grid container={true} justify="space-around" alignItems="center">
                    <Grid item={true}>
                        <Typography variant="overline">
                            {likes.length} Likes
                        </Typography>
                    </Grid>
                    <Grid item={true}>
                        <Typography variant="overline">
                            {comments.length} Comments
                        </Typography>
                    </Grid>
                    <Grid item={true}>
                        <Typography variant="overline">
                            Share
                        </Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default Article;