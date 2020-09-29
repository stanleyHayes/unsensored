import React, {useState} from "react";
import {Container, Divider, Grid, Hidden, SwipeableDrawer} from "@material-ui/core";
import MobileLayout from "./mobile-layout";
import DesktopLayout from "./desktop-layout";
import MobileHeader from "../navigation/mobile-header";
import DesktopHeader from "../navigation/desktop-header";
import BottomNavBar from "../navigation/bottom-navbar";
import {makeStyles} from "@material-ui/styles";
import DrawerContent from "../navigation/drawer-content";

const Layout = ({children}) => {

    const useStyles = makeStyles(theme => {
        return {
            content: {
                flexGrow: 1,
                paddingTop: 64,
                paddingBottom: 72
            },
            desktopContent: {
                paddingTop: 96,
                paddingBottom: 72
            },
            bottom: {
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0
            },
            root: {
                backgroundColor: "#f0f2f5"
            }
        }
    });

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true)
    }
    return (
        <div className={classes.root}>
            <Hidden only={['lg', 'xl']}>
                <MobileLayout>
                    <Grid container={true} direction="column">
                        <Grid item={true} xs={12}>
                            <MobileHeader handleOpen={handleOpen}/>
                        </Grid>
                        <Grid item={true} className={classes.content} xs={12}>
                            <div>
                                {children}
                            </div>
                        </Grid>
                        <Grid item={true} className={classes.bottom} xs={12}>
                            <Divider variant="fullWidth"/>
                            <BottomNavBar/>
                        </Grid>
                    </Grid>
                </MobileLayout>
            </Hidden>

            <Hidden mdDown={true}>
                <DesktopLayout>
                    <DesktopHeader/>
                    <Container className={classes.desktopContent}>
                        {children}
                    </Container>
                </DesktopLayout>
            </Hidden>

            <SwipeableDrawer
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}>
                <DrawerContent handleClose={handleClose}/>
            </SwipeableDrawer>
        </div>
    )
}

export default Layout;