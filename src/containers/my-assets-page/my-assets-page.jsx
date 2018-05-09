import React, { Component } from 'react';

import './my-assets-page.less';

class MyAssetsPage extends Component {
    render() {
        return (
            <div className="myAssets">
                <div className="chartArea"></div>
                <div className="chartInfo">
                    <div className="infoLine">
                        <div className="title">
                            <div className="color colorAccount"></div>
                            账户余额
                        </div>
                        <div className="val">￥10000</div>
                    </div>
                    <div className="infoLine">
                        <div className="title">
                            <div className="color colorAlready"></div>
                            已投金额
                        </div>
                        <div className="val">￥10000</div>
                    </div>
                    <div className="infoLine">
                        <div className="title">
                            <div className="color colorFreeze"></div>
                            冻结金额
                        </div>
                        <div className="val">￥10000</div>
                    </div>
                </div>
                <div className="chartAction">
                    <button>投资</button>
                    <button className="charge">充值</button>
                </div>
            </div>
        );
    }
}

export default MyAssetsPage;