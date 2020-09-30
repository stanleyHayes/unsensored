import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import CommentReply from "./reply";

const ReplyList = ({replies, message}) => {

    const useStyles = makeStyles(theme => {
        return {
            noRepliesContainer: {
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
            container: {
                minHeight: "86vh"
            }
        }
    });

    const classes = useStyles();

    return (
        <Grid container={true} className={classes.container} spacing={2}>
            {
                replies.length ? (
                    replies.map(reply => {
                        return (
                            <Grid key={reply._id} item={true} xs={12}>
                                <CommentReply reply={reply}/>
                            </Grid>
                        )
                    })
                ) : (
                    <Grid
                        className={classes.noRepliesContainer}
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
                                {message || 'Be the first to reply'}
                            </Typography>
                            <Box className={classes.imageContainer}>
                                <img
                                    className={classes.image}
                                    alt="no replies logo"
                                    src={`${process.env.PUBLIC_URL}/images/404.svg`}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                )
            }
        </Grid>
    )
}

export default ReplyList;