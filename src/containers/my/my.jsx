import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { isWeiXin, setBrowserTitle } from '../../libs/utils';

import touxiang from '../../assets/images/home-list4.png';
import './my.less'
import FooterTab from '../../components/footer-tab/footer-tab';
import './my.less';

import { getMyInfo } from '../../actions/my';

class My extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(isWeiXin());
        setBrowserTitle('我的');
        const { getMyInfo, match, history } = this.props;
        getMyInfo();
        if(match.params.callback) {
            switch(match.params.callback) {
                case 'pay_9999': 
                    this.showToast('操作失败', 2.5);
                    history.push('/mobile/my');
                    break;
                case 'pay_0000':
                    this.showToast('操作成功', 2.5);
                    history.push('/mobile/my');
                    break;
            }
        }
    }

    showToast(text, time) {
        Toast.info(text, time);
    }

    render() {
        const { myInfo, match } = this.props;
        console.log(myInfo)
        return (
            <div id='my' className='footer-tab-body'>
                <div className='footer-tab-content'>
                    <div className='my-nav'>
                        <div className='my'>我的
                            <span><i className='icon-message'></i></span>
                        </div>
                        <div className='base-info'>
                            <Link to='/mobile/personal'>
                                <img src={touxiang} /><div className='tital'><span className='name'>{myInfo.userName}</span><span className='greet'>您好，</span></div>
                            </Link>
                        </div>
                        <Link to="/mobile/my-assets">
                            <div className='money'>
                                {
                                    myInfo.availableBalance !== undefined
                                        ? (parseFloat(myInfo.availableBalance) + parseFloat(myInfo.freezingAmount) + parseFloat(myInfo.investAmount)).toFixed(2)
                                        : 0..toFixed(2)

                                }
                                <p>资产总额（元）</p>
                            </div>
                            <div className='show'>
                                <div className='yesterday'>
                                    {
                                        myInfo.dayIncome !== undefined
                                            ? parseFloat(myInfo.dayIncome).toFixed(2)
                                            : 0..toFixed(2)
                                    }
                                    <p>昨日收益（元）</p>
                                </div>
                                <div className='sum'>
                                    {
                                        myInfo.monthsIncome !== undefined
                                            ? parseFloat(myInfo.monthsIncome).toFixed(2)
                                            : 0..toFixed(2)
                                    }
                                    <p>累计收益（元）</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='my-card'>
                        <Link to="/mobile/redpacket">
                            <div className='left'>
                                <i className='icon-redpacket'></i>
                                红包
                                <span>
                                    {
                                        myInfo.memberRedInfo && myInfo.memberRedInfo.amountSum !== undefined 
                                            ? parseFloat(myInfo.memberRedInfo.amountSum).toFixed(2)
                                            : 0..toFixed(2)
                                    }
                                </span>
                                元
                            </div>
                        </Link>
                        <Link to="/mobile/coupon">
                            <div className='right'>
                                <i className='icon-coupon'></i>
                                加息券
                                <span>
                                    {
                                        myInfo.memberCoupon && myInfo.memberCoupon.number !== undefined 
                                            ? myInfo.memberCoupon.number
                                            : 0
                                    }
                                </span>
                                张
                        </div>
                        </Link>
                    </div>
                    <div className='container'>
                        <div className='my-count'>
                            账户余额：
                            <span>￥
                                {
                                    myInfo.accountBalance !== undefined 
                                        ? parseFloat(myInfo.accountBalance).toFixed(2)
                                        : 0..toFixed(2)
                                }
                            </span>
                        </div>
                        <div className='buttom'>
                            <Link to="/mobile/charge"><div className='left'>充值</div></Link>
                            <Link to="/mobile/withdraw"><div className='right'>提现</div></Link>
                        </div>
                        <div className='list'>
                            <div className='list-item'>
                                <i className='icon-about'></i><span>超级合伙人</span><i className='icon-arrow right'></i>
                            </div>
                            <Link to="/mobile/my-scatter">
                                <div className='list-item'>
                                    <i className='icon-scatter'></i><span>我的散标</span><i className='icon-arrow right'></i>
                                </div>
                            </Link>
                            <Link to="/mobile/my-agreement">
                                <div className='list-item'>
                                    <i className='icon-agreement'></i><span>我的合同</span><i className='icon-arrow right'></i>
                                </div>
                            </Link>
                            <Link to="/mobile/my-transfer">
                                <div className='list-item'>
                                    <i className='icon-transfer'></i><span>我的转让</span><i className='icon-arrow right'></i>
                                </div>
                            </Link>
                            <Link to="/mobile/trade-history">
                                <div className='list-item'>
                                    <i className='icon-invest-history'></i><span>交易记录</span><i className='icon-arrow right'></i>
                                </div>
                            </Link>
                        </div>
                        <div className='contact'>
                            <p>
                                <i className='icon-tel'></i><span>0411-84609588</span>（工作日：8:30~17:30）
                            </p>
                            <div className = 'contact-icon'>
                                <div className = 'left'><i className = 'icon-consult-fill'></i>咨询在线客服<span>喵宝</span></div>
                                <div className = 'right'><i className = 'icon-wechat-fill'></i>微信搜索<span>“巴巴汇金服”</span></div>
                            </div>
                        </div>
                    </div>
                </div>    
                <div className='footer-tab-parent'>
					<FooterTab></FooterTab>
				</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { my } = state.toJS();
    return {
        myInfo: my.myInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMyInfo: () => {
            dispatch(getMyInfo());
        }
    }
}

My = connect(
    mapStateToProps,
    mapDispatchToProps
)(My);

export default My;