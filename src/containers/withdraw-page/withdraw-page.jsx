import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';

import './withdraw-page.less';

import { getMyInfo, getMyCertification } from '../../actions/my';
import { getWithdraw } from '../../actions/withdraw';


class WithdrawPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            withdrawNum: '',
            formHidden: {
                InnerSeqNo: '',
                action_url: '',
                amt: '',
                back_notify_url: '',
                login_id: '',
                mchnt_cd: '',
                mchnt_txn_ssn: '',
                page_notify_url: '',
                signature: '',
                url: '',
            }
        }
    }

    componentDidMount() {
        const { getMyCertification, getMyInfo } = this.props;
        getMyInfo();
        getMyCertification();
    }

    componentDidUpdate() {
        const { myCertification, myInfo, history } = this.props;
        if(myCertification.idNumberStatus === '1') {
            Toast.info('您还没有实名认证！', 2.5);
            history.push('/mobile/personal');
        }
        else if(myCertification.bankNoStatus === '1'){
            Toast.info('您还没有开户！', 2.5);
            history.push('/mobile/personal');
        }
    }

    handleWithdraw() {
        const { getWithdraw } = this.props;
        const { myInfo } = this.props;
        console.log(myInfo.availableBalance)
        if(myInfo.availableBalance === '0.00') {
            Toast.info('您的可用余额不足！', 2.5);
        }
        else {
            getWithdraw(this.state.withdrawNum)
            .then(res => {
                console.log(res);
                this.setState({
                    formHidden: {
                        ...this.state.formHidden,
                        ...res.value
                    }
                });
            }).then(res => {
                this.form.submit();
            });
        }
        
        
    }

    handleChange(e) {
        this.setState({
            withdrawNum: e.target.value,
        });
    }

    withdrawAll() {
        const { myInfo } = this.props;
        if(myInfo.availableBalance === '0.00') {
            Toast.info('您的可用余额不足！', 2.5);
        }
        else {
            this.setState({
                withdrawNum: myInfo.availableBalance,
            });
        }
        
    }


    render() {
        const { myCertification, myInfo } = this.props;
        const { formHidden } = this.state;
        return (
            <div className="withdraw">
                <div className="area userInfo">
                    <div className="baseStyle">
                        <div className="label">提现账户</div>
                        <div className="realName">{myCertification.trueName}（实名认证姓名）</div>
                    </div>
                    <div className="baseStyle">
                        <div className="label">银行卡号</div>
                        <div className="realName">{myCertification.bankNo}</div>
                    </div>
                </div>
                <div className="area withdrawArea">
                    <div className="baseStyle">
                        <label className="symbol">￥
                            <input type="text"
                                placeholder={`最多取出${myInfo.availableBalance ? myInfo.availableBalance : '0.00'}元`}
                                value={this.state.withdrawNum === 0..toFixed(2) ? '' : this.state.withdrawNum}
                                onChange={this.handleChange.bind(this)}
                            />
                            <span className="withdrawTotal" onClick={this.withdrawAll.bind(this)}>全部取出</span>
                        </label>
                    </div>
                    <div className="tip">
                        <p>手续费 {'0.00'} 元</p>
                    </div>
                </div>
                <div className="textInfo">
                    <p>1. 需完成实名认证并绑定银行卡后，才能进行提现操作；</p>
                    <p>2. 提现申请成功后，资金预计T+1个工作日到账，实际以富友支付处理时效为准；</p>
                </div>
                <div className="withdrawButton" onClick={this.handleWithdraw.bind(this)}>提交审核</div>
                <div className="contactBlock">
                    <p>
                        如有问题可拨打客服热线
                        <a>0411-84609588</a>咨询
                        <br/>
                        或咨询在线客服
                        <a>喵宝</a>
                    </p>
                </div>
                <form name="FuiouCash" id="FuiouCash" method="post" action={formHidden.url} ref={form => this.form = form} style={{display: 'none'}} >
                    <input type="hidden" name="mchnt_cd" value={formHidden.mchnt_cd} />
                    <input type="hidden" name="mchnt_txn_ssn" value={formHidden.mchnt_txn_ssn} />
                    <input type="hidden" name="login_id" value={formHidden.login_id} />
                    <input type="hidden" name="amt" value={formHidden.amt} />
                    <input type="hidden" name="page_notify_url" value={formHidden.page_notify_url} />
                    <input type="hidden" name="back_notify_url" value={formHidden.back_notify_url} />
                    <input type="hidden" name="signature" value={formHidden.signature} />
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { my } = state.toJS();
    return {
        myCertification: my.myCertification,
        myInfo: my.myInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getMyInfo: () => {
            dispatch(getMyInfo());
        },
        getMyCertification: () => {
            dispatch(getMyCertification());
        },
        getWithdraw: (withdrawNum) => {
            return dispatch(getWithdraw(withdrawNum));
        }
    }
};




WithdrawPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(WithdrawPage);

export default WithdrawPage;