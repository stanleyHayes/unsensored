import React, {useEffect, useState} from "react";
import {
    CardContent,
    Container,
    Grid,
    Typography,
    Card,
    Avatar,
    CardHeader,
    Paper,
    Tabs,
    Tab,
    Divider, IconButton
} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import {makeStyles} from "@material-ui/styles";
import ArticleList from "../../components/shared/article-list";
import LikeList from "../../components/shared/like-list";
import CommentList from "../../components/shared/comment-list";
import ReplyList from "../../components/shared/reply-list";
import {Edit} from "@material-ui/icons";
import {Link, useParams} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {getUserProfile} from "../../redux/users/user-action-creators";

const ProfilePage = ({currentUser, token, user}) => {

    const useStyles = makeStyles(theme => {
        return {
            card: {
                borderRadius: 8,
                borderWidth: 2
            },
            icon: {
                color: '#aaaaaa'
            },
            link: {
                textDecoration: "none"
            }
        }
    });

    const classes = useStyles();

    const [index, setSelectedIndex] = useState(0);

    const handleSelectedTab = index => {
        setSelectedIndex(index);
    }

    const getTabDetail = index => {
        switch (index) {
            case 0:
                return <ArticleList articles={[]}/>
            case 1:
                return <LikeList likes={[]}/>
            case 2:
                return <CommentList comments={[]}/>
            case 3:
                return <ReplyList replies={[]}/>
            default:
                return <ArticleList articles={[]}/>
        }
    }

    const {userId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfile(userId, token));
    }, [dispatch, token, userId]);

    const isLoggedInUser = !!(user && currentUser && user._id === currentUser._id);


    return (
        <Layout>
            <Container maxWidth="md">
                <Grid container={true} justify="center">
                    <Grid item={true}>
                        <Card elevation={0}>
                            <CardHeader
                                avatar={
                                    user && user.avatar ?
                                        <Avatar src={user.avatar} className={classes.avatar}/>
                                        :
                                        <Avatar>
                                            <Typography
                                                variant="h5"
                                                align="center">
                                                {user && user.name[0][0]}
                                            </Typography>
                                        </Avatar>
                                }
                                title={<Typography variant="h6"
                                                   className={classes.name}>{user && user.name}</Typography>}
                                subheader={user && user.username}
                                action={
                                    isLoggedInUser ?
                                        <Link className={classes.link} to={`/edit-profile`}>
                                            <IconButton>
                                                <Edit className={classes.icon}/>
                                            </IconButton>
                                        </Link>
                                        :
                                        null
                                }
                            />
                            <Divider variant="fullWidth"/>
                            <CardContent>
                                <Paper className={classes.container} variant="elevation" elevation={0}>
                                    <Tabs scrollButtons="on" value={index}
                                          onChange={(event, index) => handleSelectedTab(index)}
                                          variant="fullWidth">
                                        <Tab
                                            value={0}
                                            selected={index === 0}
                                            label="Articles"
                                        />

                                        <Tab
                                            value={1}
                                            selected={index === 1}
                                            label="Likes"
                                        />

                                        <Tab
                                            value={2}
                                            selected={index === 2}
                                            label="Comments"
                                        />

                                        <Tab
                                            value={3}
                                            selected={index === 3}
                                            label="Replies"
                                        />
                                    </Tabs>
                                </Paper>
                                <div className={classes.scroll}>
                                    {getTabDetail(index)}
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        user: state.users.user
    }
}
export default connect(mapStateToProps)(ProfilePage);