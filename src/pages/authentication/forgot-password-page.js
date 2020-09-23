import React, {useState} from "react";
import {CardContent, Container, Grid, Card, TextField, Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import validator from "validator";

const ForgotPasswordPage = () => {

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
            instruction: {
                color: "#555555",
                marginTop: 8,
                marginBottom: 8
            }
        }
    });

    const classes = useStyles();

    const [user, setUser] = useState({});
    const [error, setError] = useState({});

    const{email} = user;

    const handleUserChange = event => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const handleUserSubmit = event => {
        event.preventDefault();

        if(!email){
            setError({...error, email: 'email required'});
            return;
        }else {
            setError({...error, email: null});
        }

        if(!validator.isEmail(email)){
            setError({...error, email: 'invalid email'});
            return;
        }else {
            setError({...error, email: null});
        }

        console.log(user);
    }


    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Grid className={classes.gridContainer} container={true} justify="center" alignItems="center">
                    <Grid item={true} xs={12} md={6} lg={5}>
                        <form>
                            <Card square={true} variant="outlined" className={classes.card}>
                                <CardContent>
                                    <Typography className={classes.title} variant="h3" align="center">WeChat</Typography>
                                    <Typography variant="h6" className={classes.subtitle} align="center">Change Password</Typography>

                                    <TextField
                                        fullWidth={true}
                                        onChange={handleUserChange}
                                        name="email"
                                        required={true}
                                        helperText={error.name}
                                        error={Boolean(error.name)}
                                        label="Email"
                                        type="email"
                                        placeholder="Enter email"
                                        variant="outlined"
                                        className={classes.textField}
                                        margin="normal"
                                        value={email}
                                    />

                                    <Button fullWidth={true} onClick={handleUserSubmit} variant="outlined"
                                            className={classes.button}
                                            size="large">
                                        Recover Password
                                    </Button>

                                    <Typography className={classes.instruction} align="center">
                                        A password recovery link will be sent to the email you provided above
                                    </Typography>
                                </CardContent>
                            </Card>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default ForgotPasswordPage;