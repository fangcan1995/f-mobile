import React, { Component } from 'react';
import { connect } from 'react-redux';

import './repay-plan-page.less';

import { getRepayPlan } from '../../actions/repay-plan';


class RepayPlanPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getRepayPlan, match } = this.props;
        getRepayPlan(match.params.proId);
    }

    render() {
        const { repayData } = this.props;
        return (
            <div className="repay-plan">
                <div className="totalInfo">
                    {
                        repayData.proName
                            ? (
                                <div>
                                    <div className="title">{repayData.proName ? repayData.proName : '--'}</div>
                                    <div className="valueBlock">
                                        <div className="cell">
                                            <div className="value">{repayData.investAmt ? repayData.investAmt : '--'}</div>
                                            <div className="info">投资总额（ 元 ）</div>
                                        </div>
                                        <div className="cell">
                                            <div className="value">{repayData.expectedEarns ? repayData.expectedEarns : '--'}</div>
                                            <div className="info">预期收益（ 元 ）</div>
                                        </div>
                                        <div className="cell">
                                            <div className="value">{repayData.rePaymentsTotals ? repayData.rePaymentsTotals : '--'}</div>
                                            <div className="info">累计回款（ 元 ）</div>
                                        </div>
                                    </div>
                                    <div className="timeBlock">
                                        截止日期：
                                        {repayData.dueDate ? repayData.dueDate.split(' ')[0] : '--'}
                                        &nbsp;&nbsp;/&nbsp;
                                        下期回款日：
                                        {repayData.nextRePaymentsDate ? repayData.nextRePaymentsDate.split(' ')[0] : '--'}
                                    </div>
                                    <div className="tag">{repayData.investStatusName ? repayData.investStatusName : '--'}</div>
                                </div>
                            )
                            : <h1 className="noData">暂无数据</h1>
                    }
                </div>
                <div className="listBlock">
                    {
                        repayData.earnPlanDetailsDtos && repayData.earnPlanDetailsDtos.length > 0 ? repayData.earnPlanDetailsDtos.map((item, i) => {
                            return (
                                <div className="listPart" key={item.earnIssue}>
                                    <div className="title">
                                        <span className="bigTitle">第{item.earnIssue}期</span><span>&nbsp;/共{repayData.earnPlanDetailsDtos.length}期</span>
                                    </div>
                                    <div className="content">
                                        <div className="contentLine">
                                            <span>还款日期：<em>{item.earnShdEarnDate ? item.earnShdEarnDate.split(' ')[0] : '--'}</em></span>
                                            <span>应还利息：<em>￥{item.earnIint ? item.earnIint : '--'}</em></span>
                                        </div>
                                        <div className="contentLine">
                                            <span>应还本金：<em>￥{item.earnCapital ? item.earnCapital : '--'}</em></span>
                                            <span>应付罚息：<em>￥{item.lateIint ? item.lateIint : '--'}</em></span>
                                        </div>
                                    </div>
                                    <div className="tag blue">{item.earnStatusName ? item.earnStatusName : '--'}</div>
                                </div>
                            );
                        })
                        : '暂无数据'
                    }

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    const { repayPlan } = state.toJS();
    return {
        repayData: repayPlan.repayData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRepayPlan: (proId) => {
            dispatch(getRepayPlan(proId));
        }
    }
}

RepayPlanPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(RepayPlanPage);

export default RepayPlanPage;