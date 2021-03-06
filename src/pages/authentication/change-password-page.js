import React, {useState} from "react";
import {CardContent, Container, Grid, Card, TextField, Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Layout from "../../components/layout/layout";

const ChangePasswordPage = () => {

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
            root: {
                minHeight: "86vh"
            },
            container: {
                height: "86vh"
            },
            gridContainer: {
                height: '86vh'
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
            }
        }
    });

    const classes = useStyles();

    const [user, setUser] = useState({});
    const [error, setError] = useState({});

    const {currentPassword, newPassword, confirmPassword} = user;

    const handleUserChange = event => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const handleUserSubmit = event => {
        event.preventDefault();

        if (!currentPassword) {
            setError({...error, password: 'password required'});
            return;
        } else {
            setError({...error, password: null});
        }

        if (!newPassword) {
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

        if (confirmPassword !== newPassword) {
            setError({...error, confirmPassword: 'password mismatch', newPassword: 'password mismatch'});
            return;
        } else {
            setError({...error, confirmPassword: null, newPassword: null});
        }

        console.log(user);
    }


    return (
        <Layout>
            <div className={classes.root}>
                <Container className={classes.container}>
                    <Grid className={classes.gridContainer} container={true} justify="center" alignItems="center">
                        <Grid item={true} xs={12} md={6} lg={5}>
                            <form>
                                <Card square={true} variant="outlined" className={classes.card}>
                                    <CardContent>
                                        <Typography className={classes.title} variant="h3"
                                                    align="center">Uncensored</Typography>
                                        <Typography variant="h6" className={classes.subtitle} align="center">Change
                                            Password</Typography>

                                        <TextField
                                            fullWidth={true}
                                            onChange={handleUserChange}
                                            name="currentPassword"
                                            required={true}
                                            helperText={error.password}
                                            error={Boolean(error.password)}
                                            label="Current Password"
                                            type="password"
                                            placeholder="Current password"
                                            variant="outlined"
                                            className={classes.textField}
                                            margin="normal"
                                            value={currentPassword}
                                        />

                                        <TextField
                                            fullWidth={true}
                                            onChange={handleUserChange}
                                            name="newPassword"
                                            required={true}
                                            helperText={error.newPassword}
                                            error={Boolean(error.newPassword)}
                                            label="New Password"
                                            type="password"
                                            placeholder="New password"
                                            variant="outlined"
                                            className={classes.textField}
                                            margin="normal"
                                            value={newPassword}
                                        />

                                        <TextField
                                            fullWidth={true}
                                            onChange={handleUserChange}
                                            name="confirmPassword"
                                            required={true}
                                            helperText={error.confirmPassword}
                                            error={Boolean(error.confirmPassword)}
                                            label="Confirm Password"
                                            type="password"
                                            placeholder="Confirm password"
                                            variant="outlined"
                                            className={classes.textField}
                                            margin="normal"
                                            value={confirmPassword}
                                        />

                                        <Button fullWidth={true} onClick={handleUserSubmit} variant="outlined"
                                                className={classes.button}
                                                size="large">
                                            Change Password
                                        </Button>
                                    </CardContent>
                                </Card>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Layout>
    )
}

export default ChangePasswordPage;