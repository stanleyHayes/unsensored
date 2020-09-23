import React from "react";
import {AppBar, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";

const MobileHeader = ({handleOpen}) => {

    const useStyles = makeStyles(theme => {
        return {
            icon: {
                color: 'white'
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
                <Grid container={true} justify="flex-start" alignItems="center" spacing={2}>
                    <Grid item={true}>
                        <IconButton>
                            <Menu className={classes.icon} onClick={handleClick}/>
                        </IconButton>
                    </Grid>
                    <Grid item={true}>
                        <Typography variant="h6">Uncensored</Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default MobileHeader;