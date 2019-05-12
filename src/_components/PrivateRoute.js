import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../_services/authenticationService';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            console.log("no currentUser in localstorage!");
            return <Redirect to={{ pathname: '/BillyDev_Demo/login', state: { from: props.location } }} />
        }

        // authorised so return component
          console.log('Private Router : authorizied ok!, props is:'+JSON.stringify(props));
        return <Component {...props} />
    }} />
)

export default PrivateRoute