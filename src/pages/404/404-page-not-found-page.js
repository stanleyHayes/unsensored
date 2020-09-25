import React from "react";
import Layout from "../../components/layout/layout";
import {Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const PageNotFound = () => {

    const useStyles = makeStyles(theme => {
        return {
            logo: {
                width: '40%',
                height: '40%'
            },
            imageContainer: {
                textAlign: "center",
                marginTop: 32
            },
            container: {
                minHeight: '86vh'
            }
        }
    });

    const classes = useStyles();

    return (
        <Layout>
            <Container className={classes.container}>
                <Grid container={true} justify="center" className={classes.container} alignItems="center">
                    <Grid item={true}>
                        <Typography align="center" variant="h1" gutterBottom={true}>404</Typography>
                        <Typography align="center" variant="h5" gutterBottom={true}>Page Not Found</Typography>
                        <div className={classes.imageContainer}>
                            <img
                                className={classes.logo}
                                src={`${process.env.PUBLIC_URL}/images/404.svg`}
                                alt="404 logo"/>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default PageNotFound;