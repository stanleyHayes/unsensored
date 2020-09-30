import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import Article from "./article";
import Comment from "./comment";
import CommentReply from "./reply";
import {makeStyles} from "@material-ui/styles";

const LikeList = ({likes, message}) => {

    const getItemByType = (item) => {
        switch (item.type) {
            case 'ARTICLE':
                return <Article article={item.article}/>;
            case 'COMMENT':
                return <Comment comment={item.comment}/>;
            case 'REPLY':
                return <CommentReply reply={item.reply}/>;
            default:
                return <Article article={item.article}/>;
        }
    }

    const useStyles = makeStyles(theme => {
        return {
            noArticlesContainer: {
                height: '80vh'
            },
            image: {
                width: '40%',
                height: '40%'
            },
            imageContainer: {
                textAlign: 'center',
                marginTop: 32
            },
            container: {
                marginTop: 32
            }
        }
    });

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container={true} className={classes.container} spacing={2}>
                {
                    likes.length ? (
                        likes.map((like, index) => {
                            return (
                                <Grid key={index} item={true} xs={12}>
                                    {getItemByType(like)}
                                </Grid>
                            )
                        })
                    ) : (
                        <Grid
                            className={classes.noCommentsContainer}
                            alignItems="center"
                            container={true}
                            item={true}
                            xs={12}
                            justify="center">
                            <Grid item={true}>
                                <Typography
                                    className={classes.text}
                                    variant="h6"
                                    align="center">
                                    {message}
                                </Typography>
                                <Box className={classes.imageContainer}>
                                    <img
                                        className={classes.image}
                                        alt="no comments logo"
                                        src={`${process.env.PUBLIC_URL}/images/404.svg`}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
        </div>
    )
}

export default LikeList;