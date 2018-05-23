import React, { Component } from 'react';
import { connect } from 'react-redux';

import './withdraw-page.less';

import { getMyInfo } from '../../actions/my';
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
        const { getMyInfo } = this.props;
        getMyInfo();
    }

    handleWithdraw() {
        const { getWithdraw } = this.props;
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
            })
        
    }

    handleChange(e) {
        this.setState({
            withdrawNum: e.target.value,
        });
    }

    render() {
        const total = 10200;
        const { formHidden } = this.state;
        return (
            <div className="withdraw">
                <div className="area userInfo">
                    <div className="baseStyle">
                        <div className="label">提现账户</div>
                        <div className="realName">用户姓名（实名认证姓名）</div>
                    </div>
                    <div className="baseStyle">
                        <div className="label">银行卡号</div>
                        <div className="realName">6225 8888 8888 8888</div>
                    </div>
                </div>
                <div className="area withdrawArea">
                    <div className="baseStyle">
                        <label className="symbol">￥
                            <input type="text"
                                placeholder={`最多取出${total}元`}
                                value={this.state.withdrawNum === 0..toFixed(2) ? '' : this.state.withdrawNum}
                                onChange={this.handleChange.bind(this)}
                            //disabled={myInfo.availableBalance === undefined}
                            />
                            <span className="withdrawTotal">全部取出</span>
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
        myInfo: my.myInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getMyInfo: () => {
            dispatch(getMyInfo());
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