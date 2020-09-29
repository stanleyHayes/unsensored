import React, {useEffect, useState} from "react";
import {Container, Grid, TextField, Paper, Fab, LinearProgress} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import {makeStyles} from "@material-ui/styles";
import {SendRounded} from "@material-ui/icons";
import {connect, useDispatch} from 'react-redux';
import ReplyList from "../../components/shared/reply-list";
import {useParams} from "react-router-dom";
import {createReply, getRepliesByComment} from "../../redux/replies/replies-action-creators";

const ArticleCommentRepliesPage = ({replies, loading, token}) => {

    const useStyles = makeStyles(theme => {
        return {
            content: {
                flexGrow: 1
            },
            input: {
                position: 'fixed',
                bottom: 5,
                zIndex: 10,
                paddingLeft: 8,
                paddingRight: 8,
                left: 0,
                right: 0,
                [theme.breakpoints.up("lg")]: {
                    left: '25%',
                    right: '25%'
                }
            },
            container: {
                minHeight: '90vh'
            },
            fab: {
                backgroundColor: theme.palette.primary.light,
                '&:hover': {
                    backgroundColor: theme.palette.primary.light
                },
                '&:active': {
                    backgroundColor: theme.palette.primary.light,
                }
            },
            icon: {
                color: "white"
            },
            gridContainer: {
                marginBottom: 16
            }
        }
    });

    const classes = useStyles();

    const [text, setText] = useState("");
    const [error, setError] = useState({});
    const dispatch = useDispatch();

    const handleTextChange = event => {
        setText(event.target.value);
    }

    const {commentId, articleId} = useParams();

    const handleReplySubmit = event => {

        event.preventDefault();

        if (!text) {
            setError({...error, text: 'reply field required'});
            return;
        } else {
            setError({...error, text: null});
        }
        let reply = {
            comment: commentId,
            article: articleId,
            text
        };
        dispatch(createReply(reply, token));
        setText("");
    }

    useEffect(() => {
        dispatch(getRepliesByComment(commentId, token));
    }, [commentId, dispatch, token]);


    return (
        <Layout>
            {loading && <LinearProgress variant="query"/>}
            <Container maxWidth="sm" className={classes.container}>
                <Grid container={true} className={classes.gridContainer} justify="center">
                    <Grid item={true} xs={12}>
                        <ReplyList replies={replies}/>
                    </Grid>
                </Grid>
                <Paper className={classes.input} square={true} variant="outlined" elevation={1}>
                    <form  onSubmit={handleReplySubmit}>
                        <Grid
                            spacing={2}
                            container={true}
                            alignItems="center"
                            justify="center">
                            <Grid xs={10} lg={11} item={true}>
                                <TextField
                                    fullWidth={true}
                                    required={true}
                                    type="text"
                                    placeholder="Type reply here..."
                                    label="Reply"
                                    multiline={true}
                                    rowsMax={5}
                                    className={classes.textField}
                                    onChange={handleTextChange}
                                    margin="dense"
                                    name="text"
                                    value={text}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item={true} xs={2} lg={1}>
                                <Fab
                                    size="small"
                                    variant="round"
                                    className={classes.fab}
                                    fullWidth={true}
                                    onClick={handleReplySubmit}>
                                    <SendRounded className={classes.icon}/>
                                </Fab>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        replies: state.replies.replies,
        loading: state.replies.loading,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(ArticleCommentRepliesPage);