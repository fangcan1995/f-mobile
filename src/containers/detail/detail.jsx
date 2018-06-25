import React, { Component } from 'react';
import { getDetails, getMyInfo, setMoney, postInvest, setProfit } from '../../actions/detail';
import StepperInput from '../../components/stepperInput/stepperInput';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser, authCode } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { Modal, Toast, Button } from 'antd-mobile';
import { hex_md5 } from '../../libs/md5'
import './detail.less'

let cred = {}
class Detail extends Component {
    state = {
        money: 0,
        sumMoney: 0,
        checked: false,
        button: '',
        profit: 0.00,
        reward: '选择系统奖励',
        modal1: false,
        minInvestAmount: 0,
        minInvestAmount2: 0,
        tips: '',
        code: 100,
        allMoney: null,
    };

    componentDidMount() {
        const { getDetails, getMyInfo, authCode, setMoney, setProfit } = this.props;
        if (this.props.detail.isFetching) {
            Toast.loading('loading')
        }
        getDetails(this.props.match.params.id).then(res => {
            const rate = res.value.raiseRate ? res.value.raiseRate + res.value.annualRate : res.value.annualRate
            this.setState({
                money: res.value.minInvestAmount,
                minInvestAmount2: res.value.minInvestAmount,
                profit: res.value.minInvestAmount * (rate / 12 * res.value.loanExpiry) * 0.01
            })
            setMoney(res.value.minInvestAmount);
            setProfit(res.value.minInvestAmount * (rate / 12 * res.value.loanExpiry) * 0.01)
        });

        if (this.props.auth.isAuthenticated) {
            getMyInfo().then(res => {
                this.setState({
                    sumMoney: res.value.availableBalance
                })
            })
        }
        this.setState({
            money: this.state.minInvestAmount
        })
    }
    handleProjectClick(e) {
        this.props.history.push(`/mobile/projectDetail/${e}`)
    }
    handleRecordsClick(e) {
        this.props.history.push(`/mobile/investment-records/${e}`)
    }

    handleMinusClick() {
        const { detail, setMoney, setProfit } = this.props;
        const rate = detail.projectDetails.raiseRate ? detail.projectDetails.annualRate + detail.projectDetails.raiseRate : detail.projectDetails.annualRate
        if (this.state.money <= this.state.minInvestAmount2) {
            Toast.fail(`投资金额不能小于起投金额${this.state.minInvestAmount2}`, 1)
            return
        }
        this.setState({
            money: this.state.money - 100,
            profit: (this.state.money - 100) * (rate / 12 * detail.projectDetails.loanExpiry) * 0.01
        })
        setMoney(this.state.money - 100);
        setProfit((this.state.money - 100) * (rate / 12 * detail.projectDetails.loanExpiry) * 0.01)
    }
    handlePlusClick() {
        const { detail, setMoney, setProfit } = this.props;
        const rate = detail.projectDetails.raiseRate ? detail.projectDetails.annualRate + detail.projectDetails.raiseRate : detail.projectDetails.annualRate
        if (detail.myInfo.availableBalance <= 0) {
            Modal.alert('您的可用余额不足', '去充值', [
                {
                    text: '确认',
                    onPress: () => {
                        this.props.history.push('/mobile/charge')
                    }
                }
            ]);
            return
        }
        if (detail.projectDetails.surplusAmount == 0) {
            Modal.alert(`该标的已经投满`, '请重新选择其他标的', [
                {
                    text: '确认',
                    onPress: () => {
                        this.props.history.push('/mobile/subjectList')
                    }
                }
            ]);
            return
        }
        if (this.state.money >= this.state.sumMoney || this.state.money >= this.props.detail.projectDetails.surplusAmount || this.state.money >= this.props.detail.projectDetails.maxInvestAmount) {
            Toast.fail(`投资金额不能超过可用余额或最大可投金额以及标的剩余可投金额`)
            return
        }
        this.setState({
            money: this.state.money + 100,
            profit: (this.state.money + 100) * (rate / 12 * detail.projectDetails.loanExpiry) * 0.01
        })
        console.log(this.state.money)
        setMoney(this.state.money + 100)
        setProfit((this.state.money + 100) * (rate / 12 * detail.projectDetails.loanExpiry) * 0.01)
    }
    handleAllClick() {
        const { detail, setMoney, setProfit } = this.props;
        const rate = detail.projectDetails.raiseRate ? detail.projectDetails.annualRate + detail.projectDetails.raiseRate : detail.projectDetails.annualRate
        let sumMoney = this.state.sumMoney < detail.projectDetails.surplusAmount ? this.state.sumMoney : detail.projectDetails.surplusAmount;
        sumMoney = sumMoney < detail.projectDetails.maxInvestAmount ? sumMoney : detail.projectDetails.maxInvestAmount
        this.setState({
            money: sumMoney,
            profit: sumMoney * (rate / 12 * detail.projectDetails.loanExpiry) * 0.01,
            allMoney: this.state.sumMoney,
            code: 100,
            tips: ''
        })
        setMoney(sumMoney)
        setProfit(sumMoney * (rate / 12 * detail.projectDetails.loanExpiry) * 0.01)
    }
    handleAgreeClick() {
        if (this.state.checked) {
            this.setState({
                checked: !this.state.checked,
                button: ''
            })
        } else {
            this.setState({
                checked: !this.state.checked,
                button: 'active'
            })
        }
    }
    PostInvest() {
        const { detail, postInvest, auth, rewards, setMoney, setProfit } = this.props;
        const prompt = Modal.prompt;
        if (detail.projectDetails.noviceLoan == 1) {
            if (detail.myInfo.noviceStatus == 1) {
                if (detail.myInfo.tradepasswordStatus == '1') {//是否实设置交易密码detail.myInfo.tradepasswordStatus
                    if (detail.myInfo.trueName) {//是否实名认证detail.myInfo.trueName
                        if (detail.myInfo.riskStatus == '1') {//是否进行风险评估detail.myInfo.riskStatus==1
                            if (detail.myInfo.openAccountStatus) {//是否开户detail.myInfo.openAccountStatus
                                prompt(
                                    '交易密码',
                                    '请输入交易密码',
                                    [
                                        { text: '取消' },
                                        {
                                            text: '确认', onPress: password => {
                                                let tradePassword = hex_md5(password)
                                                cred = {
                                                    tradePassword,
                                                    ...cred
                                                }
                                                Toast.loading('请稍等', 1, () => {
                                                    console.log(cred)

                                                    postInvest(cred, 0)
                                                        .then(res => {
                                                            Toast.info(res.value.message, 2, () => {
                                                                const { getDetails, getMyInfo } = this.props;
                                                                getDetails(this.props.match.params.id)
                                                                getMyInfo()
                                                            })
                                                            // Toast.hide()
                                                        }).catch(err => {
                                                            console.log(err)
                                                        })

                                                });

                                            }
                                        },
                                    ],
                                    'secure-text',
                                )

                            } else {
                                Modal.alert('您还未开户', '去开户', [
                                    {
                                        text: '确认',
                                        onPress: () => {
                                            this.props.history.push(`/mobile/personal?redirect=%2Fmobile%2Fdetail%2F${detail.projectDetails.id}`)
                                        }
                                    }
                                ]);
                                return
                            }
                        } else {
                            Modal.alert('您还未进行风险评估', '请进行评估', [
                                {
                                    text: '确认',
                                    onPress: () => {
                                        this.props.history.push(`/mobile/authentication?redirect=%2Fmobile%2Fdetail%2F${detail.projectDetails.id}`)
                                    }
                                }
                            ]);
                            return
                        }
                    } else {
                        Modal.alert('您还未进行实名认证', '请实名认证', [
                            {
                                text: '确认',
                                onPress: () => {
                                    this.props.history.push(`/mobile/certification?redirect=%2Fmobile%2Fdetail%2F${detail.projectDetails.id}`)
                                }
                            }
                        ]);
                        return
                    }
                } else {
                    Modal.alert(`您还未设置交易密码`, '去设置交易密码', [
                        {
                            text: '确认',
                            onPress: () => {
                                this.props.history.push(`/mobile/tradePassword?redirect=%2Fmobile%2Fdetail%2F${detail.projectDetails.id}`)
                            }
                        }
                    ]);
                    return
                }

            } else {
                Modal.alert('您不是新手，无法投资新手标', '请重新选择其他标的', [
                    {
                        text: '确认',
                        onPress: () => {
                            this.props.history.push('/mobile/subjectList')
                        }
                    }
                ]);
            }
        } else {
            console.log(detail)
            if (detail.myInfo.tradepasswordStatus == '1') {//是否实设置交易密码detail.myInfo.tradepasswordStatus
                if (detail.myInfo.trueName) {//是否实名认证detail.myInfo.trueName
                    if (detail.myInfo.riskStatus == '1') {//是否进行风险评估detail.myInfo.riskStatus==1
                        if (detail.myInfo.openAccountStatus) {//是否开户detail.myInfo.openAccountStatus
                            prompt(
                                '交易密码',
                                '请输入交易密码',
                                [
                                    { text: '取消' },
                                    {
                                        text: '确认', onPress: password => {
                                            let tradePassword = hex_md5(password)
                                            cred = {
                                                tradePassword,
                                                ...cred
                                            }
                                            Toast.loading('请稍等', 1, () => {
                                                console.log(cred)

                                                postInvest(cred, 0)
                                                    .then(res => {
                                                        Toast.info(res.value.message, 2, () => {
                                                            const { getDetails, getMyInfo } = this.props;
                                                            getDetails(this.props.match.params.id)
                                                            getMyInfo()
                                                        })
                                                        // Toast.hide()
                                                    }).catch(err => {
                                                        console.log(err)
                                                    })

                                            });

                                        }
                                    },
                                ],
                                'secure-text',
                            )
                            return
                        } else {
                            Modal.alert('您还未开户', '去开户', [
                                {
                                    text: '确认',
                                    onPress: () => {
                                        this.props.history.push(`/mobile/personal?redirect=%2Fmobile%2Fdetail%2F${detail.projectDetails.id}`)
                                    }
                                }
                            ]);
                            return
                        }
                    } else {
                        Modal.alert('您还未进行风险评估', '请进行评估', [
                            {
                                text: '确认',
                                onPress: () => {
                                    console.log(detail)
                                    this.props.history.push(`/mobile/authentication?redirect=%2Fmobile%2Fdetail%2F${detail.projectDetails.id}`)
                                }
                            }
                        ]);
                        return
                    }
                } else {
                    Modal.alert('您还未进行实名认证', '请实名认证', [
                        {
                            text: '确认',
                            onPress: () => {
                                this.props.history.push(`/mobile/certification?redirect=%2Fmobile%2Fdetail%2F${detail.projectDetails.id}`)
                            }
                        }
                    ]);
                    return
                }
            } else {
                Modal.alert(`您还未设置交易密码`, '去设置交易密码', [
                    {
                        text: '确认',
                        onPress: () => {
                            this.props.history.push(`/mobile/tradePassword?redirect=%2Fmobile%2Fdetail%2F${detail.projectDetails.id}`)
                        }
                    }
                ]);
                return
            }
        }
    }
    handlePostClick() {
        const { detail, postInvest, auth, rewards, setMoney, setProfit } = this.props;
        const prompt = Modal.prompt;
        let restMoney = detail.projectDetails.surplusAmount - this.state.money;
        cred = {
            validationCode: auth.loginCode,
            projectId: detail.projectDetails.id,
            investAmt: this.state.money,
            redEnvelopeId: rewards.redEnvelopeId,
            rateCouponId: rewards.rateCouponId,
            validationCode: auth.loginCode.imageCode,
            investWay: rewards.investWay,
            isTransfer: false,
            transfer: false,
        }
        if (!this.state.checked) {
            return
        }

        if (detail.projectDetails.surplusAmount == 0) {
            Modal.alert(`该标的已经投满`, '请重新选择其他标的', [
                {
                    text: '确认',
                    onPress: () => {
                        this.props.history.push('/mobile/subjectList')
                    }
                }
            ]);
            return
        }
        if (this.state.money === detail.projectDetails.surplusAmount) {
            this.PostInvest()
            return
        }
        if (this.state.money < this.state.minInvestAmount) {

            Modal.alert(`投资金额不能小于${this.state.minInvestAmount}元`, '请重新输入有效金额', [
                {
                    text: '确认',
                    onPress: () => {
                        setMoney(this.state.minInvestAmount)
                        setProfit((this.state.minInvestAmount) * (detail.projectDetails.annualRate / 12 * detail.projectDetails.loanExpiry) * 0.01)
                    }
                }
            ]);

            return
        }
        if (this.state.money > detail.projectDetails.maxInvestAmount || this.state.money > detail.projectDetails.surplusAmount) {
            const minmoney = detail.projectDetails.maxInvestAmount < detail.projectDetails.surplusAmount ? detail.projectDetails.maxInvestAmount : detail.projectDetails.surplusAmount;
            const massage = detail.projectDetails.maxInvestAmount < detail.projectDetails.surplusAmount ? '投资额度超过单笔最大额度' : '投资额度超过标的剩余可投金额'
            Modal.alert(`${massage + minmoney}`, '请重新输入有效金额', [
                {
                    text: '确认',
                    onPress: () => {
                        setMoney(minmoney)
                        setProfit(minmoney * (detail.projectDetails.annualRate / 12 * detail.projectDetails.loanExpiry) * 0.01)
                    }
                }
            ]);
            return
        }

        if (restMoney < detail.projectDetails.minInvestAmount) {
            Modal.alert(`投资后剩余金额不能小于起投金额${detail.projectDetails.minInvestAmount}`, `请投满剩余金额${detail.projectDetails.surplusAmount}或留出最少投资金额${detail.projectDetails.minInvestAmount}`, [
                {
                    text: '确认',
                    onPress: () => {
                        setMoney(detail.projectDetails.surplusAmount)
                        setProfit(detail.projectDetails.surplusAmount * (detail.projectDetails.annualRate / 12 * detail.projectDetails.loanExpiry) * 0.01)
                    }
                }
            ]);
            return
        }
        this.PostInvest()
    };

    componentDidUpdate() {
        const { detail, postInvest } = this.props;
        let { postResult, isPosting } = detail;
        if (detail.isGetInfo) {
            Toast.loading('loading...', 0)
        } else {
            Toast.hide()
        }

        if (postResult.userCode === 101 && postResult.times < 5 && !isPosting) {
            console.log('在这里发第' + (postResult.times + 1) + '次请求');
            postInvest(cred, postResult.times)
        }
    }
    handleLoginClick() {
        this.props.history.push('/mobile/login')
    }

    handleSelectClick(e) {
        this.props.history.push(`/mobile/rewards/${e}`)
    }
    // componentWillReceiveProps(nextProps){
    //     this.setState({
    //         sumMoney:nextProps.detail.myInfo.availableBalance||0,
    //         money:nextProps.detail.money,
    //         profit:nextProps.detail.profit,
    //     })
    // }
    render() {
        const { auth, detail } = this.props;
        const rate = detail.projectDetails.raiseRate ? detail.projectDetails.annualRate + detail.projectDetails.raiseRate : detail.projectDetails.annualRate
        const maxInvestAmount = detail.projectDetails.surplusAmount < detail.projectDetails.maxInvestAmount ? detail.projectDetails.surplusAmount : detail.projectDetails.maxInvestAmount
        const minInvestAmount = detail.projectDetails.surplusAmount < detail.projectDetails.minInvestAmount ? detail.projectDetails.surplusAmount : detail.projectDetails.minInvestAmount
        console.log(detail)
        return (
            <div id='detail'>
                <div className='warpper'>
                    <div className='content'>
                        <div className='nav'>
                            <div className='nav-tital'>
                                {detail.projectDetails.annualRate}{detail.projectDetails.raiseRate ? `+${detail.projectDetails.raiseRate}` : ''}%<br /><span>预计年化收益率</span>
                            </div>
                            {
                                detail.projectDetails.raiseRate ? <div className='plus'>加息</div> : ''
                            }

                            <div className='clear'></div>
                            <ul className='show-massage'>
                                <li>{detail.projectDetails.surplusAmount}
                                    <p>剩余金额（元）</p>
                                </li>
                                <li>{detail.projectDetails.loanExpiry}
                                    <p>期限（月）</p>
                                </li>
                                <li>{detail.projectDetails.minInvestAmount}
                                    <p>起投金额（元）</p>
                                </li>
                            </ul>
                            <div className="progress">
                                <div className="progress__bar">
                                    <div className="progress__bar--cur" style={{ width: `${detail.projectDetails.investmentProgress}%` }}>
                                        <div className='num'>{detail.projectDetails.investmentProgress}
                                            <span className='triangle'></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='main'>
                            <div className='card'>
                                <p>可用余额：
                                    <span className='left'>{detail.myInfo.availableBalance}</span>
                                    <span className='right' onClick={this.handleAllClick.bind(this)}>全投</span>
                                </p>
                                {/* <div className className = 'money'>
                                    <span className = 'minus' onClick = {this.handleMinusClick.bind(this)}><i className = 'icon-minus'></i></span>
                                    <div className = 'number'>{this.state.money}</div>
                                    <span className = 'plus' onClick = {this.handlePlusClick.bind(this)}><i className = 'icon-plus'></i></span>
                                </div> */}
                                <StepperInput config={{
                                    defaultValue: minInvestAmount, //默认金额
                                    // returnAmount:investInfo.returnAmount,
                                    money: this.state.money,
                                    min: minInvestAmount,
                                    max: maxInvestAmount,
                                    step: detail.projectDetails.minInvestAmount,
                                    surplusAmount: detail.projectDetails.surplusAmount,
                                    setMoney: this.props.setMoney,
                                    callback: (obj) => {
                                        this.setState({
                                            tips: obj.tips,
                                            money: parseFloat(obj.value),
                                            code: obj.code,
                                            profit: obj.value * (rate / 12 * detail.projectDetails.loanExpiry) * 0.01
                                        });
                                    }
                                }} key={detail.projectDetails.minInvestAmount}></StepperInput>
                                <div className='sum'>参考收益：
                                    <span>￥{this.state.profit}</span>
                                </div>
                                <div className="tips__area">
                                    {this.state.tips != '' ? <span className="errorMessages">{this.state.tips}</span>
                                        : ''}
                                </div>
                            </div>
                            <div className='list'>
                                <div className='list-item'>
                                    <i className='icon-coupon left'></i>
                                    <div className='item-content'>系统奖励
                                        <span onClick={this.handleSelectClick.bind(this, detail.projectDetails.id)}>{this.props.rewards.reward}</span>
                                    </div>
                                    <i className='icon-arrow right'></i>
                                </div>
                                {/* <div className = 'list-item'>
                                    <i className = 'icon-redpacket left'></i>
                                    <div className = 'item-content'>红包
                                        <span>无可用返现红包</span>
                                    </div>
                                    <i className = 'icon-arrow right'></i>
                                </div>
                                <div className = 'plan'>
                                    已按最优方案匹配奖励
                                </div> */}
                            </div>
                            <div className='i-list'>
                                <div className='i-list-item' onClick={this.handleProjectClick.bind(this, detail.projectDetails.id)}>
                                    <i className='icon-item-detail icon'></i>
                                    <p>项目详情</p>
                                </div>
                                <div className='i-list-item' onClick={this.handleRecordsClick.bind(this, detail.projectDetails.id)}>
                                    <i className='icon-invest-history icon'></i>
                                    <p>投资记录</p>
                                </div>
                                <div className='i-list-item' >
                                    <i className='icon-danger-control icon'></i>
                                    <p><Link to='/mobile/protocol/16'>风险提示</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='footer'>
                        {
                            auth.isAuthenticated ?
                                <div>
                                    <div className='checkbox'>
                                        <label className='tips'>
                                            <input type='checkbox' onClick={this.handleAgreeClick.bind(this)} />我已阅读并同意
                                    <span className='agreement'><Link to='/mobile/protocol/4'>《投资协议》</Link>、<Link to='/mobile/protocol/3'>《网络借贷风险和禁止性行为提示》</Link></span>
                                        </label>
                                    </div>
                                    {/* <div className = {`button ${this.state.button}` } onClick = {this.handlePostClick.bind(this)}>立即投资</div> */}
                                    <Button type="primary" onClick={this.handlePostClick.bind(this)} disabled={this.state.code != 100 || !this.state.button}>立即投资</Button>
                                </div>
                                :
                                <div className={`button active`} onClick={this.handleLoginClick.bind(this)}>立即登录</div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

function select(state) {
    const { auth, detail, rewards } = state.toJS();
    return {
        auth,
        detail,
        rewards
    };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        loginUser,
        getDetails,
        getMyInfo,
        setMoney,
        postInvest,
        authCode,
        setProfit
    }, dispatch)

export default connect(select, mapDispatchToProps)(Detail);