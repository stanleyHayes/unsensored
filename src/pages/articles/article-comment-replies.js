import React, {useState} from "react";
import {Container, Grid, TextField, Paper, Fab, LinearProgress} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import {makeStyles} from "@material-ui/styles";
import {SendRounded} from "@material-ui/icons";
import {connect} from 'react-redux';
import ReplyList from "../../components/shared/reply-list";

const ArticleCommentRepliesPage = ({replies, loading}) => {

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
                paddingRight: 8
            },
            container: {
                minHeight: '90vh'
            },
            fab: {
                backgroundColor: theme.palette.primary.light
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

    const handleTextChange = event => {
        setText(event.target.value);
    }

    const handleReplySubmit = event => {

        event.preventDefault();

        if (!text) {
            setError({...error, text: 'reply field required'});
            return;
        } else {
            setError({...error, text: null});
        }
        console.log(text);
    }


    return (
        <Layout>
            {loading && <LinearProgress variant="query"/>}
            <Container maxWidth="md" className={classes.container}>
                <Grid container={true} className={classes.gridContainer}>
                    <Grid item={true}>
                        <ReplyList replies={replies}/>
                    </Grid>
                </Grid>
                <Paper className={classes.input} square={true} variant="elevation" elevation={1}>
                    <form onSubmit={handleReplySubmit}>
                        <Grid
                            spacing={2}
                            container={true}
                            alignItems="center"
                            justify="space-around">
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
        loading: state.replies.loading
    }
}

export default connect(mapStateToProps)(ArticleCommentRepliesPage);