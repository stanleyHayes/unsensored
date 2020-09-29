import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import Comment from "./comment";
import {makeStyles} from "@material-ui/styles";

const CommentList = ({comments, message}) => {

    const useStyles = makeStyles(theme => {
        return {
            noCommentsContainer: {
                minHeight: '86vh'
            },
            imageContainer: {
                textAlign: "center",
                marginTop: 32
            },
            image: {
                width: '20%',
                height: '20%'
            },
            text: {
                color: '#333333'
            },
            root: {},
            container: {}
        }
    });

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container={true} className={classes.container} spacing={2}>
                {
                    comments.length ? (
                        comments.map(comment => {
                            return (
                                <Grid key={comment._id} item={true} xs={12}>
                                    <Comment comment={comment}/>
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
                                    {message || "Be the first to comment"}
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

export default CommentList;