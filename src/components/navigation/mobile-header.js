import React from "react";
import {AppBar, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {AddCircleRounded, Menu, Person} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";

const MobileHeader = ({handleOpen}) => {

    const useStyles = makeStyles(theme => {
        return {
            icon: {
                color: 'white'
            },
            link: {
                textDecoration: "none"
            }
        }
    });

    const classes = useStyles();

    const handleClick = () => {
        handleOpen();
    }

    return (
        <AppBar square={true} variant="outlined">
            <Toolbar variant="regular">
                <Grid container={true} justify="space-around" alignItems="center" spacing={2}>
                    <Grid item={true} xs={2}>
                        <IconButton>
                            <Menu className={classes.icon} onClick={handleClick}/>
                        </IconButton>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography variant="h6">Uncensored</Typography>
                    </Grid>

                    <Grid item={true} xs={4}>
                        <Link to="/articles/new" className={classes.link}>
                            <IconButton>
                                <AddCircleRounded className={classes.icon}/>
                            </IconButton>
                        </Link>

                        <Link to={`/profile/stanley`} className={classes.link}>
                            <IconButton>
                                <Person className={classes.icon}/>
                            </IconButton>
                        </Link>
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default MobileHeader;