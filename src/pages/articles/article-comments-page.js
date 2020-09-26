import React, {useEffect, useState} from "react";
import {Container, Grid, TextField, Paper, Fab, LinearProgress, Divider} from "@material-ui/core";
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
                backgroundColor: '#efefef'
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
                    <Grid item={true}>
                        <CommentList comments={comments}/>
                    </Grid>
                </Grid>
            </Container>
            <Paper className={classes.input} square={true} variant="elevation" elevation={1}>
                <Divider variant="fullWidth"/>
                <form onSubmit={handleCommentSubmit}>
                    <Grid
                        spacing={1}
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
                                className={classes.textField}
                                onChange={handleTextChange}
                                margin="normal"
                                name="text"
                                value={text}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item={true} xs={2}>
                            <Fab
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