import React, {useEffect, useState} from "react";
import {Container, Grid, TextField, Paper, Fab, LinearProgress} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import {makeStyles} from "@material-ui/styles";
import {SendRounded} from "@material-ui/icons";
import {connect, useDispatch} from 'react-redux';
import CommentList from "../../components/shared/comment-list";
import {createComment, getCommentsByArticle} from "../../redux/comments/comments-action-creators";
import {useParams} from "react-router-dom";


const ArticleCommentsPage = ({comments, loading, token}) => {

    const useStyles = makeStyles(theme => {
        return {
            content: {
                flexGrow: 1
            },
            input: {
                position: 'fixed',
                bottom: 0,
                zIndex: 10,
                right: 0,
                left: 0,
                paddingLeft: 8,
                paddingRight: 8,
            },
            container: {
                minHeight: '90vh'
            },
            fab: {
                backgroundColor: theme.palette.primary.main,
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
            },
            textField: {
                borderRadius: 32
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

    const {articleId} = useParams();

    const handleCommentSubmit = event => {

        event.preventDefault();

        if (!text) {
            setError({...error, text: 'comment field required'});
            return;
        } else {
            setError({...error, text: null});
        }
        let comment = {
            article: articleId,
            text
        }
        dispatch(createComment(comment, token));
        setText("");
    }

    useEffect(() => {
        dispatch(getCommentsByArticle(articleId, token));
    }, [articleId, dispatch, token]);

    return (
        <Layout>
            {loading && <LinearProgress variant="query"/>}
            <Container maxWidth="md" className={classes.container}>
                <Grid container={true} className={classes.gridContainer} justify="center">
                    <Grid item={true} xs={12}>
                        <CommentList comments={comments}/>
                    </Grid>
                </Grid>
                <Paper className={classes.input} square={true} variant="elevation" elevation={1}>
                    <form onSubmit={handleCommentSubmit}>
                        <Grid
                            spacing={2}
                            container={true}
                            alignItems="center"
                            justify="space-between">
                            <Grid xs={10} item={true}>
                                <TextField
                                    fullWidth={true}
                                    required={true}
                                    type="text"
                                    placeholder="Type comment here..."
                                    label="Comment"
                                    multiline={true}
                                    onChange={handleTextChange}
                                    margin="dense"
                                    name="text"
                                    value={text}
                                    variant="outlined"
                                    style={{borderRadius: 32, borderWidth: 4}}
                                />
                            </Grid>
                            <Grid item={true} xs={2}>
                                <Fab
                                    size="small"
                                    variant="round"
                                    className={classes.fab}
                                    fullWidth={true}
                                    onClick={handleCommentSubmit}>
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
        comments: state.comments.comments,
        loading: state.comments.loading,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(ArticleCommentsPage);