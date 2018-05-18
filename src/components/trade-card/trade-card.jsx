import React from 'react';


import './trade-card.less';

const TradeCard = ({ isTrade, data }) => {
    const fullClass =  isTrade ? 'full' : '';
    let tagColor = null;
    switch(data.transStatusName) {
        case '已转出':
            tagColor = 'green';
            break;
        case '未通过':
            tagColor = 'red';
            break;
        default: 
            tagColor = 'blue';
            break;

    }
    return (
        <div className={`trade-card ${fullClass}`}>
            <div className="title">{data.proName}</div>
            <div className="time">{data.applyTime}</div>
            <div className="value">{data.transAmt}</div>
            <div className={`tag ${tagColor}`}>{data.transStatusName}</div>
            { isTrade 
                ? <div className="action">投资</div>
                : null
            }
        </div>
    );
}

export default TradeCard;