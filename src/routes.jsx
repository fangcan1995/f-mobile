import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
import DiscoverDetailPage from './containers/discoverDetail-page/discoverDetail-page';
import HelpCenterPage from './containers/helpCenter-page/helpCenter-page';
import CouponPage from './containers/coupon-page/coupon-page';
import WithdrawPage from './containers/withdraw-page/withdraw-page';
import TransferPage from './containers/transfer-page/transfer-page';
import ChargePage from './containers/charge-page/charge-page';
import MyAssetsPage from './containers/my-assets-page/my-assets-page';
import MyAgreementPage from './containers/my-agreement-page/my-agreement-page';
import MyScatterPage from './containers/my-scatter-page/my-scatter-page';
import TradeHistoryPage from './containers/trade-history-page/trade-history-page';
import MyTransferPage from './containers/my-transfer-page/my-transfer-page';
import RepayPlanPage from './containers/repay-plan-page/repay-plan-page';
import Detail from './containers/detail/detail'
import ProjectDetail from './containers/projectDetail/projectDetail'
import InvestmentRecords from './containers/investment-records/investment-records'
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
            {/* add by zhiqiang */}
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/loginMessage" component={LoginMessagePage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/retrievePassword" component={RetrievePasswordPage} />
            <Route exact path="/authentication" component={AuthenticationPage} />
            <Route exact path="/bindPhone" component={BindPhonePage} />
            <Route exact path="/certification" component={CertificationPage} />
            <Route exact path="/changePassword" component={ChangePasswordPage} />
            <Route exact path="/changePhone" component={ChangePhonePage} />
            <Route exact path="/discover" component={DiscoverPage} />
            <Route exact path="/helpCenter" component={HelpCenterPage} />
            <Route exact path="/detail" component={Detail} />
            <Route exact path="/dynamic" component={DynamicPage} />
            <Route exact path="/subjectList" component={SubjectListPage} />
            <Route exact path="/discoverDetail/:id" component={DiscoverDetailPage} />

            {/* add by ShadowCover */}
            <Route exact path="/personal" component={PersonalContainer} />
            <Route exact path="/redpacket" component={RedPacket} />
            <Route exact path="/coupon" component={CouponPage} />
            <Route exact path="/withdraw" component={WithdrawPage} />
            <Route exact path="/transfer" component={TransferPage} />
            <Route exact path="/charge" component={ChargePage} />
            <Route exact path="/my-assets" component={MyAssetsPage} />
            <Route exact path="/my-agreement" component={MyAgreementPage} />
            <Route exact path="/my-scatter" component={MyScatterPage} />
            <Route exact path="/trade-history" component={TradeHistoryPage} />
            <Route exact path="/my-transfer" component={MyTransferPage} />
            <Route exact path="/repay-plan/:proId" component={RepayPlanPage} />

            {/* add by fangcan */}
            <Route path="/detail/:id" render={
                ( props ) => {
                    const {match} = props
                    return (
                        <Detail match={match} {...props}/>
                    );
                }
            } />
            <Route exact path="/my" component={My} />
            <Route exact path='/projectDetail/:id' component = {ProjectDetail}/>
            <Route exact path='/investment-records/:id' component = {InvestmentRecords}/>
            <Redirect to = '/home' />
        </Switch>
    </App>
);