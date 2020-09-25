import React from "react";
import {Grid, Toolbar, Typography, AppBar, Button, Container, IconButton} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {AddCircleRounded, ExitToApp, Lock, Person} from "@material-ui/icons";

const DesktopHeader = () => {

    const useStyles = makeStyles(theme => {
        return {
            link: {
                textDecoration: "none",
                color: "white"
            },
            button: {
                color: "white"
            }
        }
    });

    const classes = useStyles();

    return (
        <AppBar square={true} variant="outlined">
            <Toolbar variant="regular">
                <Container>
                    <Grid container={true} justify="space-between" alignItems="center">
                        <Grid item={true} lg={2}>
                            <Typography variant="h5">
                                <Link className={classes.link} to="/">Uncensored</Link>
                            </Typography>
                        </Grid>
                        <Grid item={true} container={true} justify="center" alignItems="center" lg={8} spacing={1}>
                            <Grid item={true}>
                                <Button>
                                    <Link className={classes.link} to="/">
                                        Timeline
                                    </Link>
                                </Button>
                            </Grid>

                            <Grid item={true}>
                                <Button>
                                    <Link className={classes.link} to="/articles">
                                        My Articles
                                    </Link>
                                </Button>
                            </Grid>

                            <Grid item={true}>
                                <Button startIcon={<AddCircleRounded className={classes.button}/>}>
                                    <Link className={classes.link} to="/article/new">
                                        Create
                                    </Link>
                                </Button>
                            </Grid>

                            <Grid item={true}>
                                <Button>
                                    <Link className={classes.link} to="/trending">
                                        Trending
                                    </Link>
                                </Button>
                            </Grid>

                            <Grid item={true}>
                                <Button>
                                    <Link className={classes.link} to="/search">
                                        Search
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item={true} lg={2}>
                            <IconButton>
                                <Link to={`/profile/sahayford`} className={classes.link}>
                                    <Person className={classes.button}/>
                                </Link>
                            </IconButton>
                            <IconButton>
                                <Link to={`/auth/change-password`} className={classes.link}>
                                    <Lock className={classes.button}/>
                                </Link>
                            </IconButton>
                            <IconButton>
                                <Link to={`/auth/login`} className={classes.link}>
                                    <ExitToApp className={classes.button}/>
                                </Link>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default DesktopHeader;