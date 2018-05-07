import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './personalPage.less';


const PersonalPage = (props) => {
    return (
        <div className="personalPage">
            <dl>
                <dd>
                    <div className="leftTitle">头像设置</div>
                    <span className="rightAction">
                        <Link to="/">
                            <span className="icon-arrow"></span>
                            <i className="personIcon"></i>
                        </Link>
                    </span>
                </dd>
            </dl>
            <dl>
                <dd>
                    <div className="leftTitle">绑定手机</div>
                    <span className="rightAction">
                        <Link to="/">
                            <span className="icon-arrow"></span>
                            <span className="actionText">188****1720</span>
                        </Link>
                    </span>
                </dd>
                <dd>
                    <div className="leftTitle">实名认证</div>
                    <span className="rightAction">
                        <Link to="/">
                            <span className="icon-arrow"></span>
                            <span className="actionText">已认证</span>
                        </Link>
                    </span>
                </dd>
            </dl>
            <dl>
                <dd>
                    <div className="leftTitle">风险评估</div>
                    <span className="rightAction">
                        <Link to="/">
                            <span className="icon-arrow"></span>
                            <span className="actionText">稳健性</span>
                        </Link>
                    </span>
                </dd>
                <dd>
                    <div className="leftTitle">银行开户</div>
                    <span className="rightAction">
                        <Link to="/">
                            <span className="icon-arrow"></span>
                            <span className="actionText">已开户</span>
                        </Link>
                    </span>
                </dd>
            </dl>
            <dl>
                <dd>
                    <div className="leftTitle">修改密码</div>
                    <span className="rightAction">
                        <Link to="/">
                            <span className="icon-arrow"></span>
                        </Link>
                    </span>
                </dd>
            </dl>
            <div className="loginOut">退出登录</div>
        </div>
    );
}

export default PersonalPage;