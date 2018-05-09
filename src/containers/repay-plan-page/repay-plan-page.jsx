import React, { Component } from 'react';

import './repay-plan-page.less';


class RepayPlanPage extends Component {

    render() {
        return (
            <div className="repay-plan">
                <div className="totalInfo">
                    <div className="title">{'汇车贷0123456789105355'}</div>
                    <div className="valueBlock">
                        <div className="cell">
                            <div className="value">{'20000.00'}</div>
                            <div className="info">投资总额（ 元 ）</div>
                        </div>
                        <div className="cell">
                            <div className="value">{'20000.00'}</div>
                            <div className="info">预期收益（ 元 ）</div>
                        </div>
                        <div className="cell">
                            <div className="value">{'20000.00'}</div>
                            <div className="info">累计回款（ 元 ）</div>
                        </div>
                    </div>
                    <div className="timeBlock">
                        截止日期：
                        {'2018.05.10'}
                        &nbsp;&nbsp;/&nbsp;
                        下期回款日：
                        {'2017.8.10'}
                    </div>
                    <div className="tag">还款中</div>
                </div>
                <div className="listBlock">
                    <div className="listPart">
                        <div className="title">
                            <span className="bigTitle">第{1}期</span><span>&nbsp;/共{12}期</span>
                        </div>
                        <div className="content">
                            <div className="contentLine">
                                <span>还款日期：<em>{'2017.06.10'}</em></span>
                                <span>应还利息：<em>￥{'100.00'}</em></span>
                            </div>
                            <div className="contentLine">
                                <span>应还本金：<em>￥{'0.00'}</em></span>
                                <span>应付罚息：<em>￥{'0.00'}</em></span>
                            </div>
                        </div>
                        <div className="tag blue">{'还款中'}</div>
                    </div>
                    <div className="listPart">
                        <div className="title">
                            <span className="bigTitle">第{1}期</span><span>&nbsp;/共{12}期</span>
                        </div>
                        <div className="content">
                            <div className="contentLine">
                                <span>还款日期：<em>{'2017.06.10'}</em></span>
                                <span>应还利息：<em>￥{'100.00'}</em></span>
                            </div>
                            <div className="contentLine">
                                <span>应还本金：<em>￥{'0.00'}</em></span>
                                <span>应付罚息：<em>￥{'0.00'}</em></span>
                            </div>
                        </div>
                        <div className="tag blue">{'还款中'}</div>
                    </div>
                    <div className="listPart">
                        <div className="title">
                            <span className="bigTitle">第{1}期</span><span>&nbsp;/共{12}期</span>
                        </div>
                        <div className="content">
                            <div className="contentLine">
                                <span>还款日期：<em>{'2017.06.10'}</em></span>
                                <span>应还利息：<em>￥{'100.00'}</em></span>
                            </div>
                            <div className="contentLine">
                                <span>应还本金：<em>￥{'0.00'}</em></span>
                                <span>应付罚息：<em>￥{'0.00'}</em></span>
                            </div>
                        </div>
                        <div className="tag blue">{'还款中'}</div>
                    </div>
                </div>
            </div>
        );
    }

}

export default RepayPlanPage;