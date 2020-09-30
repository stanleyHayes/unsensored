import React, {useEffect} from "react";
import {Route, Redirect, useHistory, useRouteMatch} from "react-router-dom";
import {TOKEN_KEY} from "../../constants/constants";
import {useDispatch} from "react-redux";
import {getLoggedInUser} from "../../redux/auth/auth-action-creator";

const ProtectedRoute = ({component: Component, ...rest}) => {

    let token = localStorage.getItem(TOKEN_KEY);

    const dispatch = useDispatch();
    const history = useHistory();
    const {url} = useRouteMatch();

    useEffect(() => {
        if (!token) {
            return history.push('/auth/login');
        }
        dispatch(getLoggedInUser(history, token, url));
    }, [dispatch, history, token, url]);

    return (
        <Route {...rest} render={({location, ...others}) => {
            if (token) {
                return <Component {...others}/>
            } else {
                return <Redirect to="/auth/login" from={location}/>
            }
        }}/>
    )
}

export default ProtectedRoute;