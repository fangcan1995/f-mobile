import React from 'react';


import './trade-card.less';

const TradeCard = ({ isTrade }) => {
    const fullClass =  isTrade ? 'full' : '';
    return (
        <div className={`trade-card ${fullClass}`}>
            <div className="title">汇车贷0123456789项目投资</div>
            <div className="time">2017.10.24   15:48</div>
            <div className="value">50000</div>
            <div className="tag blue">冻结中</div>
            { isTrade 
                ? <div className="action">投资</div>
                : null
            }
        </div>
    );
}

export default TradeCard;