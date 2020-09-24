import React, {useState} from "react";
import {Box, Button, Container, Grid, TextField, Typography, Chip, CardContent, Card} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import {makeStyles} from "@material-ui/styles";
import {Editor} from "@tinymce/tinymce-react";
import ImageUploader from 'react-images-upload';
import {red} from "@material-ui/core/colors";
import {Close} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {createArticle} from "../../redux/articles/articles-action-creator";
import {useHistory} from 'react-router-dom';
import {TOKEN} from "../../constants/constants";


const CreateArticlePage = () => {

    const [article, setArticle] = useState({});
    const [banner, setBanner] = useState(null);
    const [error, setError] = useState({});
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();
    const {title, summary, text} = article;

    const handleArticleChange = event => {
        setArticle({...article, [event.target.name]: event.target.value});
    }

    const handleTagChange = event => {
        setTag(event.target.value);
    }

    const handleTagRemove = t => {
        setTags(tags.filter(tag => tag !== t));
    }

    const handleTagAdd = () => {
        setTags([...tags, tag]);
        setTag("");
    }

    const handleArticleSubmit = event => {
        event.preventDefault();

        if (!title) {
            return setError({...error, title: 'article title required'});
        } else {
            setError({...error, title: null});
        }

        if (!summary) {
            return setError({...error, summary: 'article summary required'});
        } else {
            setError({...error, summary: null});
        }

        if (!text) {
            return setError({...error, text: 'article detail required'});
        } else {
            setError({...error, text: null});
        }

        let formData = new FormData();
        formData.append("banner", banner);
        formData.append("text", text);
        formData.append("summary", text);
        formData.append("title", title);
        formData.append("tags", JSON.stringify(tags));
        formData.append("published", true);
        formData.append("publishedDate", Date.now());

        dispatch(createArticle(formData, TOKEN, history));
    }

    const handleSave = event => {
        event.preventDefault();


    }
    const handleTextChange = (content, editor) => {
        setArticle({...article, text: content});
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
            },
            uploadBannerButton: {
                backgroundColor: theme.palette.primary.main
            },
            buttonTag: {
                backgroundColor: theme.palette.primary.light,
                paddingTop: 8,
                paddingBottom: 8,
                color: "white",
                borderRadius: 0,
                '&:active': {
                    backgroundColor: theme.palette.primary.main,
                }
            },
            noTags: {},
            card: {
                width: '100%'
            }
        }
    });

    const classes = useStyles();

    const handleArticleBannerChange = (picture) => {
        setBanner(picture[0]);
    }

    return (
        <Layout>
            <Container>
                <Grid container={true} justify="center">
                    <Grid item={true} xs={12} md={8}>
                        <form onSubmit={handleArticleSubmit}>

                            <ImageUploader
                                withIcon={true}
                                withLabel={true}
                                withPreview={true}
                                onChange={handleArticleBannerChange}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                singleImage={true}
                                buttonText="Choose article banner"
                                buttonStyles={{backgroundColor: red["900"]}}
                                fileContainerStyle={{borderWidth: 2, borderColor: "#777777", borderRadius: 32}}
                            />
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

                            <TextField
                                value={summary}
                                label="Article Summary"
                                placeholder="Enter article summary"
                                onChange={handleArticleChange}
                                fullWidth={true}
                                name="summary"
                                required={true}
                                multiline={true}
                                rows={5}
                                margin="normal"
                                helperText={error.summary || ''}
                                error={Boolean(error.summary)}
                                variant="outlined"
                                className={classes.textField}
                            />

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
                                    onEditorChange={handleTextChange}
                                />
                            </Box>

                            <Grid container={true} spacing={2} alignItems="center">
                                <Grid item={true} xs={10}>
                                    <TextField
                                        value={tag}
                                        label="Article Tag"
                                        placeholder="Enter article summary"
                                        onChange={handleTagChange}
                                        fullWidth={true}
                                        name="tag"
                                        required={true}
                                        margin="normal"
                                        helperText={error.tag || ''}
                                        error={Boolean(error.tag)}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item={true} xs={2}>
                                    <Button
                                        onClick={handleTagAdd}
                                        fullWidth={true}
                                        size="large"
                                        variant="outlined"
                                        className={classes.buttonTag}>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid container={true} spacing={2}>
                                {
                                    tags.length ? (
                                        tags.map((tag, index) => {
                                            return (
                                                <Grid key={index} item={true}>
                                                    <Chip onClick={() => handleTagRemove(tag)} label={tag}
                                                          clickable={true} icon={<Close/>}/>
                                                </Grid>
                                            )
                                        })
                                    ) : (
                                        <Grid item={true} xs={12} className={classes.noTags}>
                                            <Card className={classes.card} variant="outlined">
                                                <CardContent>
                                                    <Typography variant="body1" align="center">No Tags</Typography>
                                                </CardContent>
                                            </Card>

                                        </Grid>
                                    )
                                }
                            </Grid>

                            <Grid container={true} spacing={2}>
                                <Grid item={true} xs={4}>
                                    <Button onClick={handleSave} fullWidth={true} size="large" variant="outlined"
                                            className={classes.save}>
                                        Save
                                    </Button>
                                </Grid>
                                <Grid item={true} xs={8}>
                                    <Button onClick={handleArticleSubmit} size="large" fullWidth={true}
                                            variant="outlined" className={classes.button}>
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