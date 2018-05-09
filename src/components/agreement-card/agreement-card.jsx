import React, { Componnet } from 'react';

import './agreement-card.less';

const AgreementCard = ({ isFull }) => {
    const fullClass = isFull ? 'full' : ''
    return (
        <div className={`cardBody ${fullClass}`}>
            <div className="cardInfo">
                <div className="title">{'汇车贷0123456789'}</div>
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
                    <span>{'2015.05.10'}</span>
                    &nbsp;&nbsp;/&nbsp;
                    下期汇款日：
                    <span>{'2017.11.10'}</span>
                </div>
                <div className="tag blue">{'回款中'}</div>
            </div>
            <div className="cardAction">
                <div className="actionButton">转让</div>
                <div className="actionButton active">回款计划</div>
                <div className="actionButton active">项目合同</div>
            </div>
        </div>
    );
}

export default AgreementCard;