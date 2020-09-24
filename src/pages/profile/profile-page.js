import React, {useState} from "react";
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

const ProfilePage = ({user}) => {

    const dummyUser = {
        name: 'Stanley Hayford',
        username: 'sahayford',
        avatar: '/images/swastika.svg'
    }

    const {name, username, avatar} = dummyUser;

    const useStyles = makeStyles(theme => {
        return {
            card: {
                borderRadius: 8,
                borderWidth: 2
            },
            banner: {
                height: 250,
                objectFit: 'cover'
            },
            grid: {
                marginBottom: 8
            },
            dot: {
                fontWeight: 900,
                borderRadius: '50%'
            },
            info: {
                color: "#777777"
            },
            name: {
                cursor: "pointer"
            },
            title: {
                cursor: "pointer",
                fontWeight: 400,
                textTransform: 'uppercase'
            },
            icon: {
                color: '#aaaaaa'
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
                return <ArticleList/>
            case 1:
                return <LikeList/>
            case 2:
                return <CommentList/>
            case 3:
                return <ReplyList/>
            default:
                return <ArticleList/>
        }
    }

    return (
        <Layout>
            <Container maxWidth="md">
                <Grid container={true} justify="center">
                    <Grid item={true}>
                        <Card elevation={0}>
                            <CardHeader
                                avatar={avatar ? <Avatar src={avatar} className={classes.avatar}/> : <Avatar>
                                    <Typography variant="h5" align="center"> {name[0][0]}</Typography>
                                </Avatar>}
                                title={<Typography variant="h6" className={classes.name}>{name}</Typography>}
                                subheader={username}
                                action={<IconButton><Edit className={classes.icon} /></IconButton>}
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

export default ProfilePage;