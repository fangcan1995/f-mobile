import React, { Component } from 'react';

import './redCoupon.less';


const RedCoupon = ({ type, invalid, data }) => {
    // rp 红包 cp 加息券 fail 失效
    let colorClass;
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
    return (
        <div className={`baseStyle ${colorClass}`}>
            <div className="couponInfo">
                <span className="title">
                    { type === 'rp' && '￥' }
                    { type === 'cp' && '+' }
                    <span className="value">300</span>
                    { type === 'cp' && '%' }
                </span>
                <span className="canuse">散标3万可用</span>
            </div>
            <div className="intro">红包说明</div>
            <div className="endTime">截止日期:2017.12.12</div>
            <div className="toUse">点击立即使用</div>
        </div>
    );
}

export default RedCoupon;