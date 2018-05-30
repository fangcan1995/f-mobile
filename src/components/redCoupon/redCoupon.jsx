import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './redCoupon.less';


const RedCoupon = ({ type, data }) => {

    data = data ? data : {};
    // rp 红包 cp 加息券 fail 失效
    //status 1 未激活 2 已使用 3 已过期
    let colorClass;
    let toUseDOM;
    let statusDOM;
    let status = type === 'rp' ? data.reStatus : data.rcStatus; 
    switch (status) {
        case 0:
            toUseDOM = <div className="toUse"><Link to="/mobile/personal">点击立即激活</Link></div>;
            statusDOM = <div className="status inactive"></div>;
            colorClass = type === 'rp' ? 'redpacket' : 'coupon';
            break;
        case 2:
            toUseDOM = null;
            statusDOM = <div className="status used"></div>;
            colorClass = 'fail'
            break;
        case 3:
            toUseDOM = null;
            statusDOM = <div className="status invalid"></div>;
            colorClass = 'fail'
            break;
        default:
            toUseDOM = <div className="toUse"><Link to="/mobile/subjectList">点击立即使用</Link></div>;
            statusDOM = <div className="status"></div>;
            colorClass = type === 'rp' ? 'redpacket' : 'coupon';
            break;
    }

    return (
        <div className={`couponBaseStyle ${colorClass}`}>
            <div className="couponInfo">
                <span className="title">
                    {type === 'rp' && '￥'}
                    {type === 'cp' && '+'}
                    <span className="value">{type === 'rp' ? data.reAmount : data.rcAmount}</span>
                    {type === 'cp' && '%'}
                </span>
                <span className="canuse">{data.productCategoryName}</span>
            </div>
            <div className="intro">{data.reTypeName}</div>
            <div className="endTime">截止日期：{data.endTime ? data.endTime.split(' ')[0] : '暂无期限'}</div>
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