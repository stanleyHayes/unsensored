import React, {useState} from "react";
import {CardContent, Container, Grid, Card, LinearProgress, TextField, Typography, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Link, useHistory} from "react-router-dom";
import validator from "validator";
import {connect, useDispatch} from "react-redux";
import {signUp} from "../../redux/auth/auth-action-creator";

const SignUpPage = ({loading}) => {

    const useStyles = makeStyles(theme => {
        return {
            card: {
                borderWidth: 2
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
                borderColor: "#777777",
                marginTop: 8,
                marginBottom: 8,
                color: "#555555",
                backgroundColor: "white",
                transition: "all 500ms ease-in-out",
                '&:hover': {
                    backgroundColor: "#f0f2f5",
                    color: "#333333"
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
            }
        }
    });
    const classes = useStyles();

    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    const {name, email, username, password, confirmPassword} = user;
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

        if (!password) {
            setError({...error, password: 'password required'});
            return;
        } else {
            setError({...error, password: null});
        }

        if (!confirmPassword) {
            setError({...error, confirmPassword: 'password required'});
            return;
        } else {
            setError({...error, confirmPassword: null});
        }

        if (confirmPassword !== password) {
            setError({...error, confirmPassword: 'password mismatch', password: 'password mismatch'});
            return;
        } else {
            setError({...error, confirmPassword: null, password: null});
        }
        dispatch(signUp(history, user));
    }

    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Grid className={classes.gridContainer} container={true} justify="center" alignItems="center">
                    <Grid item={true} xs={12} md={6} lg={5}>
                        <form>
                            <Card square={true} variant="outlined" className={classes.card}>
                                {loading && <LinearProgress variant="query"/>}
                                <CardContent>
                                    <div className={classes.imageContainer}>
                                        <img className={classes.logo} alt="WeChat logo"
                                             src={`${process.env.PUBLIC_URL}/images/message.svg`}/>
                                    </div>
                                    <Typography className={classes.title} variant="h3"
                                                align="center">WeChat</Typography>
                                    <Typography variant="h6" className={classes.subtitle} align="center">Stay
                                        Connected</Typography>

                                    <TextField
                                        fullWidth={true}
                                        onChange={handleUserChange}
                                        name="name"
                                        required={true}
                                        helperText={error.name}
                                        error={Boolean(error.name)}
                                        label="Name"
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
                                        placeholder="Enter username"
                                        variant="outlined"
                                        className={classes.textField}
                                        margin="normal"
                                        value={username}
                                    />

                                    <TextField
                                        fullWidth={true}
                                        onChange={handleUserChange}
                                        name="password"
                                        required={true}
                                        helperText={error.password}
                                        error={Boolean(error.password)}
                                        label="Password"
                                        type="password"
                                        placeholder="Enter password"
                                        variant="outlined"
                                        className={classes.textField}
                                        margin="normal"
                                        value={password}
                                    />

                                    <TextField
                                        fullWidth={true}
                                        onChange={handleUserChange}
                                        name="confirmPassword"
                                        required={true}
                                        helperText={error.confirmPassword}
                                        error={Boolean(error.confirmPassword)}
                                        label="Confirm Password"
                                        placeholder="Confirm password"
                                        variant="outlined"
                                        className={classes.textField}
                                        margin="normal"
                                        value={confirmPassword}
                                        type="password"
                                    />

                                    <Button fullWidth={true} onClick={handleUserSubmit} variant="outlined"
                                            className={classes.button}
                                            size="large">
                                        Sign Up
                                    </Button>

                                    <Link className={classes.link} to="/auth/login">
                                        <Button fullWidth={true} variant="text" className={classes.textButton}
                                                size="large">
                                            Already have an account? Sign In
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps)(SignUpPage);