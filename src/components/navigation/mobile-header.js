import React from "react";
import {AppBar, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {AddCircleRounded, Menu, Person} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

const MobileHeader = ({handleOpen, currentUser}) => {

    const useStyles = makeStyles(theme => {
        return {
            icon: {
                color: 'white'
            },
            link: {
                textDecoration: "none",
                color: "white"
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
                <Grid container={true} justify="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={1}>
                        <IconButton>
                            <Menu className={classes.icon} onClick={handleClick}/>
                        </IconButton>
                    </Grid>
                    <Grid container={true} justify="center" item={true} xs={7}>
                        <Typography variant="body1">
                            <Link to="/" className={classes.link}>
                                Uncensored
                            </Link>
                        </Typography>
                    </Grid>

                    <Grid item={true} xs={4}>
                        <Link to="/article/new" className={classes.link}>
                            <IconButton>
                                <AddCircleRounded className={classes.icon}/>
                            </IconButton>
                        </Link>

                        <Link to={`/profile/${currentUser && currentUser._id}`} className={classes.link}>
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


const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser
    }
}
export default connect(mapStateToProps)(MobileHeader);