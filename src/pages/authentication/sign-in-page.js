import React, {useState} from "react";
import {CardContent, Container, Grid, Card, TextField, Button, Typography, LinearProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, connect} from "react-redux";
import {signIn} from "../../redux/auth/auth-action-creator";

const SignInPage = ({loading}) => {

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
                minHeight: "100vh",
                backgroundImage: 'linear-gradient(to bottom right, dark-red, red)'
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
    const {username, password} = user;

    const handleUserChange = event => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const dispatch = useDispatch();
    const history = useHistory();

    const handleUserSubmit = event => {
        event.preventDefault();

        if(!username){
            setError({...error, name: 'name required'});
            return;
        }else {
            setError({...error, name: null});
        }

        if(!password){
            setError({...error, password: 'password required'});
            return;
        }else {
            setError({...error, password: null});
        }
        dispatch(signIn(history, user));
    }


    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Grid className={classes.gridContainer} container={true} justify="center" alignItems="center">
                    <Grid item={true} xs={12} md={6} lg={5}>
                        <form>
                            <Card square={true} variant="outlined" className={classes.card}>
                                {loading && <LinearProgress variant="query" /> }
                                <CardContent>
                                    <div className={classes.imageContainer}>
                                        <img className={classes.logo} alt="Uncensored logo" src={`${process.env.PUBLIC_URL}/images/swastika.svg`} />
                                    </div>
                                    <Typography className={classes.title} variant="h3" align="center">Uncensored</Typography>
                                    <Typography variant="h6" className={classes.subtitle} align="center">Unrestricted Knowledge</Typography>

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

                                    <Link className={classes.link} to="/auth/forgot-password">
                                        <Button fullWidth={true} variant="text" className={classes.textButton}
                                                size="small">
                                            Forgot Password?
                                        </Button>
                                    </Link>


                                    <Button fullWidth={true} onClick={handleUserSubmit} variant="outlined"
                                            className={classes.button}
                                            size="large">
                                        Sign In
                                    </Button>

                                    <Link className={classes.link} to="/auth/register">
                                        <Button fullWidth={true} variant="text" className={classes.textButton}
                                                size="small">
                                            Don't have an account? Sign Up
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
export default connect(mapStateToProps) (SignInPage);