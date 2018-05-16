import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../withdraw-page/withdraw-page.less';


import { getMyInfo } from '../../actions/my';


class ChargePage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getMyInfo } = this.props;
        getMyInfo();
    }

    render() {
        const total = 10200;
        return (
            <div className="withdraw">
                <div className="area withdrawArea">
                    <div className="baseStyle">
                        <label className="symbol">￥
                            <input type="text"
                                placeholder="请输入充值金额"
                            />
                            <span className="inputTip">手续费 {'0.00'} 元</span>
                        </label>
                    </div>
                    <div className="canuse">
                        <span>可用余额 {'0.00'} 元</span>
                        <span>充值后余额 {'0.00'} 元</span>
                    </div>
                </div>
                <div className="textInfo">
                    <p>1. 需完成实名认证并绑定银行卡后，才能进行充值操作；</p>
                    <p>2. 请使用借记卡充值，信用卡无法充值；</p>
                    <p>3. 充值服务手续费0元；</p>
                    <p>4. 充值金额将会在充值成功后10-15分钟内到账，请耐心等候；</p>
                    <p>5. 单笔充值金额需大于或等于10元；</p>
                    <p>6. 单笔充值如果超出银行卡支付限额，可以拆分金额多次充值；</p>
                    <p>7. 每日的充值限额依据各银行限额为准，请注意您的银行卡充值限制，以免造成不便；</p>
                </div>
                <div className="withdrawButton">充值</div>
                <div className="contactBlock">
                    <p>
                        如有问题可拨打客服热线
                        <a>0411-84609588</a>咨询
                        <br />
                        或咨询在线客服
                        <a>喵宝</a>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { my } = state.toJS();
    return {
        myInfo: my.myInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMyInfo: () => {
            dispatch(getMyInfo());
        }
    }
}

ChargePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChargePage);

export default ChargePage;