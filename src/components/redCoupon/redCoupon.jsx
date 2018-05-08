import React, { Component } from 'react';

import './redCoupon.less';


const RedCoupon = ({ type, invalid, data }) => {
    data = data ? data : {};
    // rp 红包 cp 加息券 fail 失效
    //status 1 未激活 2 已使用 3 已过期
    let colorClass;
    let toUseDOM;
    let statusDOM;
    switch (true) {
        case type === 'rp' && !invalid:
            colorClass = 'redpacket';
            break;
        case type === 'cp' && !invalid:
            colorClass = 'coupon';
            break;
        default:
            colorClass = 'fail';
            break;
    }
    
    switch (data.status) {
        case '1':
            toUseDOM = <div className="toUse">点击立即激活</div>;
            statusDOM = <div className="status inactive"></div>;
            break;
        case '2':
            toUseDOM = null;
            statusDOM = <div className="status used"></div>;
            break;
        case '3':
            toUseDOM = null;
            statusDOM = <div className="status invalid"></div>;
            break;
        default:
            toUseDOM = <div className="toUse">点击立即使用</div>;
            statusDOM = <div className="status"></div>;
            break;
    }

    return (
        <div className={`baseStyle ${colorClass}`}>
            <div className="couponInfo">
                <span className="title">
                    {type === 'rp' && '￥'}
                    {type === 'cp' && '+'}
                    <span className="value">{data.val}</span>
                    {type === 'cp' && '%'}
                </span>
                <span className="canuse">{data.canuse}</span>
            </div>
            <div className="intro">红包说明</div>
            <div className="endTime">截止日期:{data.endTime}</div>
            {
                toUseDOM
            }
            {
                statusDOM
            }
        </div>
    );
}

export default RedCoupon;