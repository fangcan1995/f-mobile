import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import App from './components/app/app';
import HomePage from './containers/home-page/home-page';

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.getIn(['auth', 'isAuthenticated']),
  wrapperDisplayName: 'UserIsAuthenticated'
})

export default (
    <App>
    	<Switch>
    		<Route exact path="/" component={HomePage} />
    	</Switch>
    </App>
);