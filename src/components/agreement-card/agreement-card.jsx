import React, { Componnet } from 'react';
import { Link } from 'react-router-dom';

import './agreement-card.less';

const AgreementCard = ({ isFull, data }) => {
    const fullClass = isFull ? 'full' : '';
    let actionDOM = null;
    switch (data.investStatusName) {
        case '回款中':
            actionDOM = isFull
                ? (
                    <div className="cardAction">
                        <div className="actionButton active"><Link to="/mobile/transfer">转让</Link></div>
                        <div className="actionButton active"><Link to={`/mobile/repay-plan/${data.investId}`}>回款计划</Link></div>
                        <div className="actionButton active"><Link to="/mobile">项目合同</Link></div>
                    </div>
                )
                : actionDOM;
            break;
        case '招标中':
            actionDOM = isFull
                ? (
                    <div className="cardAction">
                        <div className="actionButton">转让</div>
                        <div className="actionButton active"><Link to={`/mobile/repay-plan/${data.investId}`}>回款计划</Link></div>
                        <div className="actionButton">项目合同</div>
                    </div>
                )
                : actionDOM;
            break;
        case '已结清':
            actionDOM = isFull
                ? (
                    <div className="cardAction">
                        <div className="actionButton">转让</div>
                        <div className="actionButton active"><Link to={`/mobile/repay-plan/${data.investId}`}>回款计划</Link></div>
                        <div className="actionButton active"><Link to="/mobile">项目合同</Link></div>
                    </div>
                )
                : actionDOM;
            break;
    }
    return (
        <div className={`cardBody ${fullClass}`}>
            <div className="cardInfo">
                <div className="title">{data.proName ? data.proName : ''}</div>
                <div className="valueBlock">
                    <div className="cell">
                        <div className="value">{data.investAmt ? data.investAmt : '0.00'}</div>
                        <div className="info">投资总额（ 元 ）</div>
                    </div>
                    <div className="cell">
                        <div className="value">{data.expectedEarns ? data.expectedEarns : '0.00'}</div>
                        <div className="info">预期收益（ 元 ）</div>
                    </div>
                    <div className="cell">
                        <div className="value">{data.rePaymentsTotals ? data.rePaymentsTotals : '0.00'}</div>
                        <div className="info">累计回款（ 元 ）</div>
                    </div>
                </div>
                <div className="timeBlock">
                    截止日期：
                    <span>{data.dueDate ? data.dueDate.split(' ')[0] : '--'}</span>
                    &nbsp;&nbsp;/&nbsp;
                    下期汇款日：
                    <span>{data.nextRePaymentsDate ? data.nextRePaymentsDate.split(' ')[0] : '--'}</span>
                </div>
                <div className="tag blue">{data.investStatusName ? data.investStatusName : ''}</div>
            </div>
            {
                actionDOM
            }

        </div>
    );
}

export default AgreementCard;