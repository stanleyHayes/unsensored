import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import Article from "./article";
import {makeStyles} from "@material-ui/styles";

const ArticleList = ({articles, message}) => {

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
            },
            container: {
                marginTop: 32
            }
        }
    });

    const classes = useStyles();

    return (
        <Grid container={true} spacing={4} className={classes.container}>
            {
                articles && articles.length ? (
                    articles.map((article, index) => {
                        return (
                            <Grid key={index} item={true} xs={12}>
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
                            <Typography align="center" variant="h6">
                                {message || 'no articles available'}
                            </Typography>
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
    )
}

export default ArticleList;