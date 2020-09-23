import React from "react";
import {Grid, LinearProgress, Typography} from "@material-ui/core";
import Layout from "../../components/layout/layout";
import {connect} from 'react-redux';
import Article from "../../components/shared/article";
import {makeStyles} from "@material-ui/styles";

const TrendingPage = ({loading, trending}) => {

    const useStyles = makeStyles(theme => {
        return {
            noArticlesContainer: {
                height: '80vh'
            },
            image: {
                width: '40%',
                height: '40%'
            },
            imageContainer: {
                textAlign: 'center',
                marginTop: 32
            }
        }
    });

    const classes = useStyles();

    return (
        <Layout>
            {loading && <LinearProgress variant="query"/>}
            <Grid container={true} spacing={4}>
                {
                    trending && trending.length ? (
                        trending.map(article => {
                            return (
                                <Grid item={true} xs={12} md={6} lg={4}>
                                    <Article article={article}/>
                                </Grid>
                            )
                        })
                    ) : (
                        <Grid item={true}
                              container={true}
                              alignItems="center"
                              className={classes.noArticlesContainer}>
                            <Grid item={true} xs={12}>
                                <Typography align="center" variant="h6">No Trending Articles</Typography>
                                <div className={classes.imageContainer}>
                                    <img
                                        className={classes.image}
                                        alt="no articles icon"
                                        src={`${process.env.PUBLIC_URL}/images/internet.svg`}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
        </Layout>
    )
}

const mapStateToProps = state => {

    console.log(state);

    return {
        loading: state.articles.loading,
        trending: state.articles.trending
    }
}

export default connect(mapStateToProps)(TrendingPage);