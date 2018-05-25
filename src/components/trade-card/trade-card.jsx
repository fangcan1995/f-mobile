import React from 'react';


import './trade-card.less';

const TradeCard = ({ isTrade, data }) => {
    const fullClass =  isTrade ? 'full' : '';
    let tagColor = null;

    switch(data.transStatusName || data.transState) {
        case '已转出':
            tagColor = 'green';
            break;
        case '成功':
            tagColor = 'green';
            break;
        case '未通过':
            tagColor = 'red';
            break;
        case '失败':
            tagColor = 'red';
            break;
        default: 
            tagColor = 'blue';
            break;

    }
    return (
        <div className={`trade-card ${fullClass}`}>
            <div className="title">{!isTrade ? data.proName : data.payType}</div>
            <div className="time">{!isTrade ? data.applyTime : data.createTime}</div>
            <div className="value">{!isTrade ? data.transAmt : (data.amountState === '1' ? data.transAmt : `-${data.transAmt}`)}</div>
            <div className={`tag ${tagColor}`}>{!isTrade ? data.transStatusName : data.transState}</div>
            { isTrade 
                ? <div className="action">{data.payType}</div>
                : null
            }
        </div>
    );
}

export default TradeCard;