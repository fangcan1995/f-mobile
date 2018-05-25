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
            case '/mobile/home'.indexOf(url) === 0:
                setBrowserTitle('首页');
                break;
            case '/mobile/login'.indexOf(url) === 0:
                setBrowserTitle('登录');
                break;
            case '/mobile/loginMessage'.indexOf(url) === 0:
                setBrowserTitle('登录');
                break;
            case '/mobile/retrievePassword'.indexOf(url) === 0:
                setBrowserTitle('找回密码');
                break;
            case '/mobile/authentication'.indexOf(url) === 0:
                setBrowserTitle('风险评估');
                break;
            case '/mobile/bindPhone'.indexOf(url) === 0:
                setBrowserTitle('绑定手机');
                break;
            case '/mobile/certification'.indexOf(url) === 0:
                setBrowserTitle('实名认证');
                break;
            case '/mobile/changePassword'.indexOf(url) === 0:
                setBrowserTitle('修改密码');
                break;
            case '/mobile/changePhone'.indexOf(url) === 0:
                setBrowserTitle('修改手机');
                break;
            case '/mobile/discover'.indexOf(url) === 0:
                setBrowserTitle('发现');
                break;
            case '/mobile/dynamic'.indexOf(url) === 0:
                setBrowserTitle('巴巴汇动态');
                break;
            case '/mobile/subjectList'.indexOf(url) === 0:
                setBrowserTitle('投资列表');
                break;
            case '/mobile/discoverDetail'.indexOf(url) === 0:
                setBrowserTitle('详情');
                break;
            case '/mobile/riskEvaluationResult'.indexOf(url) === 0:
                setBrowserTitle('评估结果');
                break;
            case '/mobile/personal'.indexOf(url) === 0:
                setBrowserTitle('个人中心');
                break;
            case '/mobile/redpacket'.indexOf(url) === 0:
                setBrowserTitle('红包管理');
                break;
            case '/mobile/coupon'.indexOf(url) === 0:
                setBrowserTitle('加息券管理');
                break;
            case '/mobile/transfer'.indexOf(url) === 0:
                setBrowserTitle('转让标的');
                break;
            case '/mobile/my-assets'.indexOf(url) === 0:
                setBrowserTitle('我的资产');
                break;
            case '/mobile/my-agreement'.indexOf(url) === 0:
                setBrowserTitle('我的合同');
                break;
            case '/mobile/my-scatter'.indexOf(url) === 0:
                setBrowserTitle('我的投资');
                break;
            case '/mobile/trade-history'.indexOf(url) === 0:
                setBrowserTitle('交易记录');
                break;
            case '/mobile/my-transfer'.indexOf(url) === 0:
                setBrowserTitle('我的转让');
                break;
            case '/mobile/repay-plan'.indexOf(url) === 0:
                setBrowserTitle('回款计划');
                break;
            case '/mobile/withdraw'.indexOf(url) === 0:
                setBrowserTitle('提现');
                break;
            case '/mobile/charge'.indexOf(url) === 0:
                setBrowserTitle('充值');
                break;
            case '/mobile/detail'.indexOf(url) === 0:
                setBrowserTitle('标的详情');
                break;
            case '/mobile/my'.indexOf(url) === 0:
                setBrowserTitle('我的');
                break;
            case '/mobile/projectDetail'.indexOf(url) === 0:
                setBrowserTitle('项目详情');
                break;
            case '/mobile/investment-records'.indexOf(url) === 0:
                setBrowserTitle('投资记录');
                break;
            case '/mobile/rewards'.indexOf(url) === 0:
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