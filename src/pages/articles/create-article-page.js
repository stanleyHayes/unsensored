import React, {useState} from "react";
import {Box, Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import {makeStyles} from "@material-ui/styles";
import {Editor} from "@tinymce/tinymce-react";

const CreateArticlePage = () => {

    const [article, setArticle] = useState({});
    const [error, setError] = useState({});
    const {title, summary, text} = article;

    const handleArticleChange = event => {
        setArticle({...article, [event.target.name]: event.target.value});
    }

    const handleArticleSubmit = event => {
        event.preventDefault();

        console.log(article)
        if(!title){
            return setError({...error, title: 'article title required'});
        }else {
            setError({...error, title: null});
        }

        if(!summary){
            return setError({...error, summary: 'article summary required'});
        }else {
            setError({...error, summary: null});
        }

        if(!text){
            return setError({...error, text: 'article detail required'});
        }else {
            setError({...error, text: null});
        }
        console.log(article);
    }


    const handleSave = event => {
        event.preventDefault();


    }
    const useStyles = makeStyles(theme => {
        return {
            textField: {
                marginBottom: 16
            },
            button: {
                paddingTop: 16,
                paddingBottom: 16,
                borderRadius: 0,
                borderWidth: 2,
                borderColor: theme.palette.primary.light,
                marginTop: 8,
                marginBottom: 8,
                color: "white",
                backgroundColor: theme.palette.primary.main,
                transition: "all 500ms ease-in-out",
                '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                    color: "white"
                }
            },

            save: {
                paddingTop: 16,
                paddingBottom: 16,
                borderRadius: 0,
                borderWidth: 2,
                borderColor: "#5555f5",
                marginTop: 8,
                marginBottom: 8,
                color: "white",
                backgroundColor: "darkblue",
                transition: "all 500ms ease-in-out",
                '&:hover': {
                    backgroundColor: "#5555f5",
                    color: "white"
                }
            },
            box: {
                marginTop: 24,
                marginBottom: 24
            }
        }
    });

    const classes = useStyles();


    return (
        <Layout>
            <Container>
                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={8}>
                        <form onSubmit={handleArticleSubmit}>
                            <TextField
                                value={title}
                                label="Article Title"
                                placeholder="Enter article title"
                                onChange={handleArticleChange}
                                fullWidth={true}
                                name="title"
                                required={true}
                                margin="normal"
                                helperText={error.title || ''}
                                error={Boolean(error.title)}
                                variant="outlined"
                                className={classes.textField}
                            />

                            <Box  className={classes.box}>
                                <Typography variant="body1" gutterBottom={true}>Article Summary</Typography>
                                <Editor
                                    value={summary}
                                    tagName="summary"
                                    textareaName="summary"
                                    apiKey="4k98mzlrjhgnes2exbqtgbhevplum3c0c6czfodsu2s5mpqk"
                                    initialValue=""
                                    init={{
                                        height: 200,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image',
                                            'charmap print preview anchor help',
                                            'searchreplace visualblocks code',
                                            'insertdatetime media table paste wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help'
                                    }}
                                    onChange={handleArticleChange}
                                />
                            </Box>

                            <Box className={classes.box}>
                                <Typography variant="body1" gutterBottom={true}>Article Detail</Typography>
                                <Editor
                                    value={text}
                                    tagName="text"
                                    textareaName="text"
                                    apiKey="4k98mzlrjhgnes2exbqtgbhevplum3c0c6czfodsu2s5mpqk"
                                    initialValue=""
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image',
                                            'charmap print preview anchor help',
                                            'searchreplace visualblocks code',
                                            'insertdatetime media table paste wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help'
                                    }}
                                    onChange={handleArticleChange}
                                />
                            </Box>

                            <Grid container={true} spacing={2}>
                                <Grid item={true} xs={4}>
                                    <Button onClick={handleSave} fullWidth={true} size="large" variant="outlined" className={classes.save}>
                                        Save
                                    </Button>
                                </Grid>
                                <Grid item={true} xs={8}>
                                    <Button onClick={handleArticleSubmit} size="large" fullWidth={true} variant="outlined" className={classes.button}>
                                        Publish
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default CreateArticlePage;