import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { isWeiXin, setBrowserTitle } from '../../libs/utils';

/* export default withRouter((props) => {
    console.log(props);
    return (
        <div id="app">
            {props.children}
        </div>
    );
}); */

class App extends Component {
    constructor(props) {
        super(props);
    }

    changeTitle(url) {
        switch (true) {
            case url.indexOf('/mobile/home') === 0:
                setBrowserTitle('首页');
                break;
            case url.indexOf('/mobile/login') === 0:
                setBrowserTitle('登录');
                break;
            case url.indexOf('/mobile/loginMessage') === 0:
                setBrowserTitle('登录');
                break;
            case url.indexOf('/mobile/retrievePassword') === 0:
                setBrowserTitle('找回密码');
                break;
            case url.indexOf('/mobile/authentication') === 0:
                setBrowserTitle('风险评估');
                break;
            case url.indexOf('/mobile/bindPhone') === 0:
                setBrowserTitle('绑定手机');
                break;
            case url.indexOf('/mobile/certification') === 0:
                setBrowserTitle('实名认证');
                break;
            case url.indexOf('/mobile/changePassword') === 0:
                setBrowserTitle('修改密码');
                break;
            case url.indexOf('/mobile/changePhone') === 0:
                setBrowserTitle('修改手机');
                break;
            case url.indexOf('/mobile/discover') === 0:
                setBrowserTitle('发现');
                break;
            case url.indexOf('/mobile/dynamic') === 0:
                setBrowserTitle('巴巴汇动态');
                break;
            case url.indexOf('/mobile/subjectList') === 0:
                setBrowserTitle('投资列表');
                break;
            case url.indexOf('/mobile/discoverDetail') === 0:
                setBrowserTitle('详情');
                break;
            case url.indexOf('/mobile/riskEvaluationResult') === 0:
                setBrowserTitle('评估结果');
                break;
            case url.indexOf('/mobile/personal') === 0:
                setBrowserTitle('个人中心');
                break;
            case url.indexOf('/mobile/redpacket') === 0:
                setBrowserTitle('红包管理');
                break;
            case url.indexOf('/mobile/coupon') === 0:
                setBrowserTitle('加息券管理');
                break;
            case url.indexOf('/mobile/transfer') === 0:
                setBrowserTitle('转让标的');
                break;
            case url.indexOf('/mobile/my-assets') === 0:
                setBrowserTitle('我的资产');
                break;
            case url.indexOf('/mobile/my-agreement') === 0:
                setBrowserTitle('我的合同');
                break;
            case url.indexOf('/mobile/my-scatter') === 0:
                setBrowserTitle('我的投资');
                break;
            case url.indexOf('/mobile/trade-history') === 0:
                setBrowserTitle('交易记录');
                break;
            case url.indexOf('/mobile/my-transfer') === 0:
                setBrowserTitle('我的转让');
                break;
            case url.indexOf('/mobile/repay-plan') === 0:
                setBrowserTitle('回款计划');
                break;
            case url.indexOf('/mobile/withdraw') === 0:
                setBrowserTitle('提现');
                break;
            case url.indexOf('/mobile/charge') === 0:
                setBrowserTitle('充值');
                break;
            case url.indexOf('/mobile/detail') === 0:
                setBrowserTitle('标的详情');
                break;
            case url.indexOf('/mobile/detail') === 0:
                setBrowserTitle('标的详情');
                break;
            case url.indexOf('/mobile/my') === 0:
                setBrowserTitle('我的');
                break;
            case url.indexOf('/mobile/projectDetail') === 0:
                setBrowserTitle('项目详情');
                break;
            case url.indexOf('/mobile/investment-records') === 0:
                setBrowserTitle('投资记录');
                break;
            case url.indexOf('/mobile/rewards') === 0:
                setBrowserTitle('系统奖励');
                break;
        }
    }

    componentDidMount() {
        const { location } = this.props;
        this.changeTitle(location.pathname);
    }

    componentDidUpdate() {
        const { location } = this.props;
        this.changeTitle(location.pathname);
    }

    render() {
        return (
            <div id="app">
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(App);