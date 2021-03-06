import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import FooterTab from '../footer-tab/footer-tab';

import './app.less';
import orientation from './../../assets/images/orientation.jpg';
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
        this.state={
            showContent:true
        }
    }

    changeTitle(url) {
        switch (true) {
            case url.indexOf('/mobile/home') === 0:
                setBrowserTitle('首页');
                break;
            case url.indexOf('/mobile/register') === 0:
                setBrowserTitle('注册');
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
            case url.indexOf('/mobile/discDetail') === 0:
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
                setBrowserTitle('我的散标');
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
            case url.indexOf('/mobile/protocol') === 0:
                setBrowserTitle('协议');
                break;  
            case url.indexOf('/mobile/tradePassword') === 0:
                setBrowserTitle('设置交易密码');
                break;       
        }
    }

    componentDidMount() {
        const { location } = this.props;
        this.changeTitle(location.pathname);
        this.orientationChange();
    }
    orientationChange(){
        window.addEventListener('orientationchange',()=>{  
            //这里可以根据orientation做相应的处理  
            if(window.orientation==90||window.orientation==-90){

                this.setState({
                    showContent:false
                })               
            }else{
                this.setState({
                    showContent:true
                })               
            }
        },false); 
    }

    componentDidUpdate() {
        const { location } = this.props;
        this.changeTitle(location.pathname);
    }

    render() {
        return (
            <div id="app">
                {
                    this.state.showContent?
                    (
                        <div className='all-content'>
                            <div id="content">{this.props.children}</div>
                            <FooterTab></FooterTab>
                        </div>                                           
                    )
                    :(
                    <img className='orientationBox' src={orientation} alt=""/>
                    )
                    
                }
                
                
                {/* <div className='footer-tab-parent'>
                    <FooterTab></FooterTab>
                </div> */}
            </div>
        );
    }
}

export default withRouter(App);