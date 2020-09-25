import React from "react";
import {
    Container,
    Button,
    Divider,
    Grid,
    Typography, Avatar
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {
    Close,
    Edit,
    ExitToApp,
    HomeOutlined,
    Person,
    ShoppingCartOutlined,
    Warning
} from "@material-ui/icons";
import {connect} from 'react-redux';

const DrawerContent = ({handleClose, currentUser}) => {

    const useStyles = makeStyles(theme => {
        return {
            link: {
                textDecoration: "none",
                color: "#333333",
                textTransform: "uppercase",
                '&:hover': {
                    color: "#333333"
                },
                fontSize: 16,
                fontWeight: 500
            },
            divider: {
                marginTop: 8,
                marginBottom: 8
            },
            container: {
                paddingLeft: 52,
                paddingRight: 52,
                paddingTop: 16,
                paddingBottom: 16,
                backgroundColor: "#fefefe"
            },
            icon: {
                color: "#333333"
            },
            button: {
                paddingTop: 8,
                paddingBottom: 8
            },
            avatar: {
                height: 200,
                width: 200,
                borderRadius: '50%'
            },
            gridContainer: {
                height: 250
            },
            summary: {
                marginLeft: -15
            },
            closeButton: {
                backgroundColor: theme.palette.primary.main,
                color: "white",
                paddingTop: 4,
                paddingBottom: 4,
                borderRadius: 0,
                '&:active': {
                    color: theme.palette.primary.light
                }
            }, closeIcon: {
                color: "white"
            },
            brand: {
                fontWeight: "bold"
            }
        }
    });

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid
                container={true}
                justify="flex-end"
                alignItems="center">
                <Grid item={true}>
                    <Button
                        variant="outlined"
                        className={classes.closeButton}
                        onClick={() => handleClose()}
                        endIcon={<Close className={classes.closeIcon}/>}>
                        Close
                    </Button>
                </Grid>
            </Grid>

            <Grid
                className={classes.gridContainer}
                container={true}
                justify="center"
                alignItems="center">
                <Grid item={true}>
                    {currentUser && currentUser.avatar ? <Avatar src={currentUser.avatar} className={classes.avatar}/>
                        :
                        <Avatar src={`${process.env.PUBLIC_URL}/images/user.svg`} className={classes.avatar}/>
                    }
                </Grid>
            </Grid>
            <Grid container={true} justify="center">
                <Grid item={true} xs={12}>
                    <Typography className={classes.brand} gutterBottom={true} align="center"
                                variant="h5">{currentUser && currentUser.name}</Typography>
                    <Typography align="center" variant="body2">{currentUser && currentUser.username}</Typography>
                </Grid>

                <Grid item={true} xs={12}>
                    <Divider className={classes.divider} variant="fullWidth"/>
                </Grid>

                <Grid item={true} xs={12}>
                    <Button
                        className={classes.button}
                        fullWidth={false}
                        size="large"
                        startIcon={<HomeOutlined className={classes.icon}/>}>
                        <Link className={classes.link} to="/">
                            Home
                        </Link>
                    </Button>

                    <Divider className={classes.divider} variant="fullWidth"/>

                    <Button
                        className={classes.button}
                        fullWidth={false}
                        size="large"
                        startIcon={<Person className={classes.icon}/>}>
                        <Link className={classes.link} to="/profile/stanley">
                            Profile
                        </Link>
                    </Button>

                    <Divider className={classes.divider} variant="fullWidth"/>

                </Grid>

                <Grid item={true} xs={12}>
                    <Button
                        className={classes.button}
                        fullWidth={false}
                        size="large"
                        startIcon={<Edit className={classes.icon}/>}>
                        <Link className={classes.link} to="/edit-profile">
                            Edit Profile
                        </Link>
                    </Button>

                    <Divider className={classes.divider} variant="fullWidth"/>

                    <Button
                        className={classes.button}
                        fullWidth={false}
                        size="large"
                        startIcon={<ShoppingCartOutlined className={classes.icon}/>}>
                        <Link className={classes.link} to="/auth/change-password">
                            Change Password
                        </Link>
                    </Button>

                    <Divider className={classes.divider} variant="fullWidth"/>

                    <Button
                        className={classes.button}
                        fullWidth={false}
                        size="large"
                        startIcon={<ExitToApp className={classes.icon}/>}>
                        Logout
                    </Button>

                    <Divider className={classes.divider} variant="fullWidth"/>

                    <Button
                        className={classes.button}
                        fullWidth={false}
                        size="large"
                        startIcon={<Warning className={classes.icon}/>}>
                        Delete Account
                    </Button>
                </Grid>

            </Grid>

        </Container>
    )
}

const mapStateToProps = state => {

    return {
        currentUser: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(DrawerContent);