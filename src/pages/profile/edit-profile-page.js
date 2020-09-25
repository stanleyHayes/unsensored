import React, {useState} from "react";
import {CardContent, Container, Grid, Card, TextField, Button, LinearProgress} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import {makeStyles} from "@material-ui/styles";
import {useHistory} from "react-router-dom";
import {useDispatch, connect} from "react-redux";
import validator from "validator";
import ReactImageUploader from 'react-images-upload';
import {updateUserProfile} from "../../redux/auth/auth-action-creator";

const EditProfilePage = ({currentUser, loading, token}) => {

    const useStyles = makeStyles(theme => {
        return {
            card: {
                borderWidth: 2,
                marginTop: 64,
                marginBottom: 64
            },
            textField: {
                marginTop: 8,
                marginBottom: 8
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
            textButton: {
                marginTop: 8,
                marginBottom: 8
            },
            link: {
                textDecoration: "none"
            },
            root: {
                minHeight: "100vh"
            },
            container: {
                height: "100vh"
            },
            gridContainer: {
                height: '100vh'
            },
            title: {
                color: "#333333",
                marginTop: 8,
                marginBottom: 8
            },
            subtitle: {
                color: "#555555",
                marginTop: 8,
                marginBottom: 8
            },
            logo: {
                width: 100,
                height: 100,
                marginTop: 8,
                marginBottom: 8
            },
            imageContainer: {
                textAlign: "center"
            },
            uploadButton: {
                borderRadius: 24,
                backgroundColor: theme.palette.primary.light,
                color: "white"
            }
        }
    });
    const classes = useStyles();

    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState({});
    const {name, email, username} = user;
    const history = useHistory();
    const dispatch = useDispatch();

    const handleUserChange = event => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const handleUserSubmit = event => {
        event.preventDefault();
        if (!name) {
            setError({...error, name: 'name required'});
            return;
        } else {
            setError({...error, name: null});
        }

        if (!email) {
            setError({...error, email: 'email required'});
            return;
        } else {
            setError({...error, email: null});
        }

        if (!validator.isEmail(email)) {
            setError({...error, email: 'invalid email'});
            return;
        } else {
            setError({...error, email: null});
        }

        if (!username) {
            setError({...error, username: 'username required'});
            return;
        } else {
            setError({...error, username: null});
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("username", username);
        if (avatar) {
            formData.append("avatar", avatar);
        }
        dispatch(updateUserProfile(formData, currentUser._id, token, history))
    }

    const handleImageSelected = (files, pictures) => {
        setAvatar(files[0]);
    }


    return (
        <Layout>
            {loading && <LinearProgress variant="query"/>}
            <Container maxWidth="md">
                <Grid container={true}>
                    <Grid item={true}>
                        <form onSubmit={handleUserSubmit}>
                            <Card elevation={0}>
                                <CardContent>

                                    <ReactImageUploader
                                        withIcon={true}
                                        maxFileSize={2000000}
                                        withLabel={true}
                                        withPreview={true}
                                        singleImage={true}
                                        onChange={handleImageSelected}
                                        buttonText="upload avatar"
                                        fileSizeError="File too large"
                                        label="Avatar"
                                        imgExtension={['.png', '.jpg', '.gif', '.jpeg']}
                                        buttonStyles={classes.uploadButton}
                                    />

                                    <TextField
                                        fullWidth={true}
                                        onChange={handleUserChange}
                                        name="name"
                                        required={true}
                                        helperText={error.name}
                                        error={Boolean(error.name)}
                                        label="Name"
                                        defaultValue={currentUser && currentUser.name}
                                        placeholder="Enter name"
                                        variant="outlined"
                                        className={classes.textField}
                                        margin="normal"
                                        value={name}
                                    />

                                    <TextField
                                        fullWidth={true}
                                        onChange={handleUserChange}
                                        name="email"
                                        required={true}
                                        helperText={error.email}
                                        error={Boolean(error.email)}
                                        label="Email"
                                        defaultValue={currentUser && currentUser.email}
                                        type="email"
                                        placeholder="Enter email"
                                        variant="outlined"
                                        className={classes.textField}
                                        margin="normal"
                                        value={email}
                                    />

                                    <TextField
                                        fullWidth={true}
                                        onChange={handleUserChange}
                                        name="username"
                                        required={true}
                                        helperText={error.username}
                                        error={Boolean(error.username)}
                                        label="Username"
                                        defaultValue={currentUser && currentUser.username}
                                        placeholder="Enter username"
                                        variant="outlined"
                                        className={classes.textField}
                                        margin="normal"
                                        value={username}
                                    />


                                    <Button fullWidth={true} onClick={handleUserSubmit} variant="outlined"
                                            className={classes.button}
                                            size="large">
                                        Save Profile
                                    </Button>

                                </CardContent>
                            </Card>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        currentUser: state.auth.currentUser,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(EditProfilePage);