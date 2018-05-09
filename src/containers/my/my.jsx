import React, { Component } from 'react';
import touxiang from '../../assets/images/home-list4.png'
import './my.less'

class My extends Component{
    render(){
        return (
            <div id = 'my'>
                <div className = 'my-nav'>
                    <div className = 'my'>我的
                        <span><i className = 'icon-message'></i></span>
                    </div>
                    <div className = 'base-info'>
                        <img src={touxiang}/><div className = 'tital'><span className = 'name'>二狗子 </span><span className = 'greet'>先生，您好</span></div>
                    </div>
                    <div className = 'money'>20000.00
                        <p>资产总额（元）</p>
                    </div>
                    <div className = 'show'>
                        <div className = 'yesterday'>5.30
                            <p>昨日收益（元）</p>
                        </div>
                        <div className = 'sum'>126.30
                            <p>累计收益（元）</p>
                        </div>
                    </div>                       
                </div>
                <div className = 'my-card'>
                    <div className ='left'>
                        <i className = 'icon-redpacket'></i>红包<span>888.00</span>元
                    </div>
                    <div className = 'right'>
                        <i className = 'icon-coupon'></i>加息券<span>10</span>张
                    </div>
                </div>
                <div className = 'container'>
                    <div className = 'my-count'>
                        账户余额：
                        <span>￥888.00</span>
                    </div>
                    <div className = 'buttom'>
                        <div className = 'left'>充值</div>
                        <div className = 'right'>提现</div>
                    </div>
                    <div className = 'list'>
                        <div className = 'list-item'>
                            <i className = 'icon-about'></i><span>超级合伙人</span><i className = 'icon-arrow right'></i>
                        </div>
                        <div className = 'list-item'>
                            <i className = 'icon-scatter'></i><span>我的散标</span><i className = 'icon-arrow right'></i>
                        </div>
                        <div className = 'list-item'>
                            <i className = 'icon-agreement'></i><span>我的合同</span><i className = 'icon-arrow right'></i>
                        </div>
                        <div className = 'list-item'>
                            <i className = 'icon-transfer'></i><span>我的转让</span><i className = 'icon-arrow right'></i>
                        </div>
                        <div className = 'list-item'>
                            <i className = 'icon-invest-history'></i><span>交易记录</span><i className = 'icon-arrow right'></i>
                        </div>
                    </div>
                    <div className = 'contact'>
                        <p>
                            <i className = 'icon-tel'></i><span>0411-84609588</span>（工作日：8:30~17:30）
                        </p>
                        <p>
                            <div className = 'left'><i className = 'icon-consult-fill'></i><span>喵宝</span>（工作日：8:30~17:30）</div>
                            <div className = 'right'><i className = 'icon-wechat-fill'></i><span>“巴巴汇金服”</span>（工作日：8:30~17:30）</div>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default My