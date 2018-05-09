import React, { Component } from 'react';

import '../withdraw-page/withdraw-page.less';


class TransferPage extends Component {
    render() {
        const total = 10200;
        return (
            <div className="withdraw">
                <div className="area userInfo">
                    <div className="baseStyle">
                        <div className="label">标的名称</div>
                        <div className="realName">汇车贷-HCD201706090004</div>
                    </div>
                    <div className="baseStyle">
                        <div className="label">投资金额</div>
                        <div className="realName">￥{10200}</div>
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
                </div>
                <div className="textInfo">
                    <p>转让规则说明</p>
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

export default TransferPage;