import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import App from './components/app/app';
import HomePage from './containers/home-page/home-page';
import LoginPage from './containers/login-page/login-page';
import PersonalContainer from './containers/personal-page/personal-page';
import RedPacket from './containers/redpacket/redpacket';
import LoginMessagePage from './containers/login-message-page/login-message-page';
import RegisterPage from './containers/register-page/register-page';
import RetrievePasswordPage from './containers/retrievePassword-page/retrievePassword-page';
import AuthenticationPage from './containers/authentication-page/authentication-page';
import BindPhonePage from './containers/bindPhone-page/bindPhone-page';
import CertificationPage from './containers/certification-page/certification-page';
import ChangePasswordPage from './containers/changePassword-page/changePassword-page';
import ChangePhonePage from './containers/changePhone-page/changePhone-page';
import DiscoverPage from './containers/discover-page/discover-page';
import HelpCenterPage from './containers/helpCenter-page/helpCenter-page';
import Detail from './containers/detail/detail'
import My from './containers/my/my'
import DynamicPage from './containers/dynamic-page/dynamic-page';
import SubjectListPage from './containers/subjectList-page/subjectList-page';

const userIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => state.getIn(['auth', 'isAuthenticated']),
    wrapperDisplayName: 'UserIsAuthenticated'
})

export default (
    <App>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/loginMessage" component={LoginMessagePage} />
            <Route exact path="/personal" component={PersonalContainer} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/retrievePassword" component={RetrievePasswordPage} />
            <Route exact path="/authentication" component={AuthenticationPage} />
            <Route exact path="/bindPhone" component={BindPhonePage} />
            <Route exact path="/certification" component={CertificationPage} />
            <Route exact path="/changePassword" component={ChangePasswordPage} />
            <Route exact path="/redpacket" component={RedPacket} />
            <Route exact path="/changePhone" component={ChangePhonePage} />
            <Route exact path="/discover" component={DiscoverPage} />
            <Route exact path="/helpCenter" component={HelpCenterPage} />
            <Route exact path="/detail" component={Detail} />
            <Route exact path="/my" component={My} />
            <Route exact path="/dynamic" component={DynamicPage} />
            <Route exact path="/subjectList" component={SubjectListPage} />
        </Switch>
    </App>
);