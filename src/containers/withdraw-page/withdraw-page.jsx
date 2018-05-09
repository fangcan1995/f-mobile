import React, { Component } from 'react';

import './withdraw-page.less';


class WithdrawPage extends Component {
    render() {
        const total = 10200;
        return (
            <div className="withdraw">
                <div className="area userInfo">
                    <div className="baseStyle">
                        <div className="label">提现账户</div>
                        <div className="realName">用户姓名（实名认证姓名）</div>
                    </div>
                    <div className="baseStyle">
                        <div className="label">银行卡号</div>
                        <div className="realName">6225 8888 8888 8888</div>
                    </div>
                </div>
                <div className="area withdrawArea">
                    <div className="baseStyle">
                        <label className="symbol">￥
                            <input type="text"
                                placeholder={`最多取出${total}元`}
                            />
                            <span className="withdrawTotal">全部取出</span>
                        </label>
                    </div>
                    <div className="tip">
                        <p>手续费 {'0.00'} 元</p>
                    </div>
                </div>
                <div className="textInfo">
                    <p>1. 需完成实名认证并绑定银行卡后，才能进行提现操作；</p>
                    <p>2. 提现申请成功后，资金预计T+1个工作日到账，实际以富友支付处理时效为准；</p>
                </div>
                <div className="withdrawButton">提交审核</div>
                <div className="contactBlock">
                    <p>
                        如有问题可拨打客服热线
                        <a>0411-84609588</a>咨询
                        <br/>
                        或咨询在线客服
                        <a>喵宝</a>
                    </p>
                </div>
            </div>
        );
    }
}

export default WithdrawPage;