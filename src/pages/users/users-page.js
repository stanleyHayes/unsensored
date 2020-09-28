import React, {useEffect} from "react";
import {Container, Grid, LinearProgress, Typography} from "@material-ui/core";
import {connect, useDispatch} from "react-redux";
import Layout from "../../components/layout/layout";
import {getUsers} from "../../redux/users/user-action-creators";
import User from "../../components/shared/user";
import {makeStyles} from "@material-ui/styles";

const UsersPage = ({users, loading, token}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(token))
    }, [dispatch, token]);

    const useStyles = makeStyles(theme => {
        return {
            noUsersContainer: {
                height: '80vh'
            },
            image: {
                width: '40%',
                height: '40%'
            },
            imageContainer: {
                textAlign: 'center',
                marginTop: 32
            },
            container: {
                marginTop: 32
            }
        }
    });

    const classes = useStyles();

    return (
        <Layout>
            <Container maxWidth="md">
                {loading && <LinearProgress variant="query"/>}
                <Grid container={true} spacing={4} className={classes.container}>
                    {
                        users && users.length ? (
                            users.map((user, index) => {
                                return (
                                    <Grid key={index} item={true} xs={12}>
                                        <User user={user}/>
                                    </Grid>
                                )
                            })
                        ) : (
                            <Grid item={true}
                                  container={true}
                                  alignItems="center"
                                  className={classes.noUsersContainer}>
                                <Grid item={true} xs={12}>
                                    <Typography align="center" variant="h6">No users available</Typography>
                                    <div className={classes.imageContainer}>
                                        <img
                                            className={classes.image}
                                            alt="no articles icon"
                                            src={`${process.env.PUBLIC_URL}/images/swastika.svg`}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
            </Container>
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users.users,
        loading: state.users.loading,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(UsersPage);