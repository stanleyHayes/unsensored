import React from "react";
import {Route, Redirect} from "react-router-dom";
import {TOKEN_KEY} from "../../constants/constants";

const ProtectedRoute = ({component: Component, ...rest}) => {

    let token = localStorage.getItem(TOKEN_KEY);

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