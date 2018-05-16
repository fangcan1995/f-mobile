import React, { Component } from 'react';
import { connect } from 'react-redux';

import './repay-plan-page.less';

import { getRepayList, getRepayTotal } from '../../actions/repay-plan';


class RepayPlanPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getRepayList, getRepayTotal } = this.props;
        getRepayList();
    }

    render() {
        const { repayList } = this.props;
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
                    {
                        repayList.map((item, i) => {
                            return (
                                <div className="listPart" key={item.earnIssue}>
                                    <div className="title">
                                        <span className="bigTitle">第{item.earnIssue}期</span><span>&nbsp;/共{repayList.length}期</span>
                                    </div>
                                    <div className="content">
                                        <div className="contentLine">
                                            <span>还款日期：<em>{item.earnShdEarnDate}</em></span>
                                            <span>应还利息：<em>￥{item.earnIint}</em></span>
                                        </div>
                                        <div className="contentLine">
                                            <span>应还本金：<em>￥{item.earnCapital}</em></span>
                                            <span>应付罚息：<em>￥{item.lateIint}</em></span>
                                        </div>
                                    </div>
                                    <div className="tag blue">{'还款中'}</div>
                                </div>
                            );
                        })
                    }

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    const { repayPlan } = state.toJS();
    return {
        repayList: repayPlan.repayList,
        repayTotal: repayPlan.repayTotal,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRepayList: () => {
            dispatch(getRepayList());
        },
        getRepayTotal: () => {
            dispatch(getRepayTotal());
        }
    }
}

RepayPlanPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(RepayPlanPage);

export default RepayPlanPage;