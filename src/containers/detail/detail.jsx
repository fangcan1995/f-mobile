import React, { Component } from 'react';
import { getDetails, getMyInfo, setMoney, postInvest, setProfit, getTransferDetails } from '../../actions/detail';
import StepperInput from '../../components/stepperInput/stepperInput';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser, authCode } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { Modal, Toast, Button } from 'antd-mobile';
import { hex_md5 } from '../../libs/md5'
import Rewards from '../rewards/rewards'
import './detail.less'

let cred = {}//投资的参数对象
let rate;//标的的利率
class Detail extends Component {
    state = {
        money: 0,//输入框中的钱
        sumMoney: 0,//账户可用余额
        checked: false,//是否选择同意协议
        button: '',//按钮样式
        profit: 0.00,//参考收益
        reward: '选择系统奖励',//选择红包红包
        minInvestAmount: 0,//标的的最低起投金额
        minInvestAmount2: 0,//保存标的最开始的最低起投金额，并且不会修改这个金额
        tips: '',//输入框的提示语
        code: 100,//输入框的返回码
        Modal: false,//选择红包的模态框是否打开
        rateCouponId: '',//选用加息券时投资传的是加息券的ID
        redEnvelopeId: '',//选用红包时投资传的是红包的ID
        status: null,//散标的的状态
        transStatus: null,//债转标的状态
        statusString: ''//标的状态话术
    };

    componentDidMount() {
        const { getDetails, getMyInfo, authCode, setMoney, setProfit, getTransferDetails } = this.props;
        console.log(this.props.match)
        if (this.props.detail.isFetching) {
            Toast.loading('loading')
        }
        if (this.props.match.params.type == 0) {//散标的type值为0，债转的type为1
            cred.isTransfer = false,
                cred.transfer = false
            getDetails(this.props.match.params.id).then(res => {//页面加载时获取散标的详细信息
                rate = res.value.raiseRate ? res.value.raiseRate + res.value.annualRate : res.value.annualRate;
                const minInvestAmount = res.value.minInvestAmount < res.value.surplusAmount ? res.value.minInvestAmount : res.value.surplusAmount;
                this.setState({
                    money: minInvestAmount,
                    minInvestAmount2: res.value.minInvestAmount,
                    profit: minInvestAmount * (rate / 12 * res.value.loanExpiry) * 0.01,
                    statusString: res.value.statusString,
                    status: res.value.status
                })
                setMoney(res.value.minInvestAmount);//保存最低投资额度到redux
                setProfit(res.value.minInvestAmount * (rate / 12 * res.value.loanExpiry) * 0.01)//保存最低投资额度的利润到redux
            });
        } else {
            cred.isTransfer = true,
                cred.transfer = true,
                getTransferDetails(this.props.match.params.id).then(res => {//页面加载时获取债转标的详细信息
                    console.log(res)
                    rate = res.value.raiseRate ? res.value.raiseRate + res.value.annualRate : res.value.annualRate;
                    const minInvestAmount = res.value.minInvestAmount < res.value.surplusAmount ? res.value.minInvestAmount : res.value.surplusAmount;
                    cred.transferProjectId = res.value.id
                    this.setState({
                        money: minInvestAmount,
                        minInvestAmount2: res.value.minInvestAmount,
                        profit: minInvestAmount * (rate / 12 * res.value.transferPeriod) * 0.01,
                        statusString: res.value.statusString,
                        transStatus: res.value.transStatus
                    })
                    setMoney(res.value.minInvestAmount);
                    setProfit(res.value.minInvestAmount * (rate / 12 * res.value.transferPeriod) * 0.01)
                });
        }
        if (this.props.auth.isAuthenticated) {//登录状态设置账户可用余额到页面
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
    handleProjectClick(e) {//查看项目详情
        this.props.history.push(`/mobile/projectDetail/${e}`)
    }
    handleRecordsClick(e, q) {//查看投资记录
        this.props.history.push(`/mobile/investment-records/${e}/${q}`)
    }

    handleAllClick() {//全投
        console.log(this.props)
        const { detail, setMoney, setProfit, auth } = this.props;
        console.log(detail)
        if (auth.isAuthenticated) {
            rate = detail.projectDetails.raiseRate ? detail.projectDetails.annualRate + detail.projectDetails.raiseRate : detail.projectDetails.annualRate
            let sumMoney = this.state.sumMoney < detail.projectDetails.surplusAmount ? this.state.sumMoney : detail.projectDetails.surplusAmount;
            sumMoney = sumMoney < detail.projectDetails.maxInvestAmount ? sumMoney : detail.projectDetails.maxInvestAmount;//全投金额是账户可用余额，标的剩余投资额以及标的最大投资额中最小的额度
            console.log(sumMoney,detail.projectDetails.minInvestAmount)
            if(sumMoney>detail.projectDetails.minInvestAmount){
                sumMoney = Math.floor(sumMoney / detail.projectDetails.minInvestAmount) * detail.projectDetails.minInvestAmount
            }
            this.setState({
                money: sumMoney,
                profit: sumMoney * (rate / 12 * (detail.projectDetails.loanExpiry || detail.projectDetails.transferPeriod)) * 0.01,
                code: 100,
                tips: ''
            })
            setMoney(sumMoney)
            setProfit(sumMoney * (rate / 12 * detail.projectDetails.loanExpiry) * 0.01)
        } else {
            Toast.info('请登录', 2, () => {
                let redirect = location.pathname
                location.href = '/mobile/login?redirect=' + redirect;
            })
        }

    }
    handleAgreeClick() {//同意协议
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
    PostInvest() {//投资
        const { detail, postInvest, auth, rewards, setMoney, setProfit } = this.props;
        const prompt = Modal.prompt;
        if (detail.projectDetails.noviceLoan == 1) {//是否是新手标
            if (detail.myInfo.noviceStatus == 1) {//是否是新手
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
                                                // cred = {
                                                //     tradePassword,
                                                //     ...cred
                                                // }
                                                cred.tradePassword=tradePassword
                                                postInvest(cred, 0)
                                                    .then(res => {
                                                        Toast.info(res.value.message, 2, () => {
                                                            const { getDetails, getMyInfo, getTransferDetails } = this.props;
                                                            this.props.match.params.type == '0' ? getDetails(this.props.match.params.id) : getTransferDetails(this.props.match.params.id)
                                                            getMyInfo()
                                                            this.setState({
                                                                money: detail.projectDetails.minInvestAmount,
                                                                profit: detail.projectDetails.minInvestAmount * (rate / 12 * (detail.projectDetails.loanExpiry || detail.projectDetails.transferPeriod)) * 0.01,
                                                                reward: '选择系统奖励',
                                                                button: 'active'
                                                            })
                                                        })
                                                    }).catch(err => {
                                                        console.log(err)
                                                    })

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
            if (detail.myInfo.tradepasswordStatus == '1') {//是否实设置交易密码detail.myInfo.tradepasswordStatus
                if (detail.myInfo.trueName) {//是否实名认证detail.myInfo.trueName
                    if (detail.myInfo.riskStatus == '1') {//是否进行风险评估detail.myInfo.riskStatus==1
                        if (detail.myInfo.openAccountStatus) {//是否开户detail.myInfo.openAccountStatus
                            this.setState({
                                button: '',
                            })
                            prompt(
                                '交易密码',
                                '请输入交易密码',
                                [
                                    {
                                        text: '取消', onPress: password => {
                                            this.setState({
                                                button: 'active'
                                            })
                                        }
                                    },
                                    {
                                        text: '确认', onPress: password => {
                                            let tradePassword = hex_md5(password)
                                            // cred = {
                                            //     tradePassword:tradePassword,
                                            //     ...cred
                                            // }
                                            cred.tradePassword=tradePassword
                                            postInvest(cred, 0)
                                                .then(res => {
                                                    Toast.info(res.value.message, 2, () => {
                                                        const { getDetails, getMyInfo, getTransferDetails } = this.props;
                                                        console.log(this.props.match.params.type)
                                                        if (this.props.match.params.type == '1') {
                                                            getTransferDetails(this.props.match.params.id)
                                                        } else {
                                                            getDetails(this.props.match.params.id)
                                                        }
                                                        getMyInfo()
                                                        this.setState({
                                                            money: detail.projectDetails.minInvestAmount,
                                                            reward: '选择系统奖励',
                                                            profit: detail.projectDetails.minInvestAmount * (rate / 12 * (detail.projectDetails.loanExpiry || detail.projectDetails.transferPeriod)) * 0.01,
                                                            button: 'active'
                                                        })
                                                    })
                                                }).catch(err => {
                                                    console.log(err)
                                                })
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
        let creds = {//投资的参数
            validationCode: auth.loginCode,
            projectId: detail.projectDetails.id,
            investAmt: this.state.money,
            rewardId: this.state.rateCouponId || this.state.redEnvelopeId,
            validationCode: auth.loginCode.imageCode,
            investWay: rewards.investWay,
        }
        cred = { ...cred, ...creds }
        if (!this.state.checked) {
            return
        }
        if (detail.myInfo.availableBalance < this.state.money || this.state.money==0) {
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
        if (detail.isGetInfo) {//投资后的loading
            Toast.loading('loading...', 0)
        } else {
            Toast.hide()
        }

        if (postResult.userCode === 101 && postResult.times < 5 && !isPosting) {//处理并发，暂定5次请求
            console.log('在这里发第' + (postResult.times + 1) + '次请求');
            postInvest(cred, postResult.times)
        }
    }
    handleLoginClick() {//登录
        this.props.history.push('/mobile/login')
    }

    handleSelectClick(e) {//选择系统奖励
        this.setState({
            Modal: !this.state.Modal
        })
    }
   
    render() {
        const { auth, detail } = this.props;
        // const rate = detail.projectDetails.raiseRate ? detail.projectDetails.annualRate + detail.projectDetails.raiseRate : detail.projectDetails.annualRate
        const maxInvestAmount = detail.projectDetails.surplusAmount < detail.projectDetails.maxInvestAmount ? detail.projectDetails.surplusAmount : detail.projectDetails.maxInvestAmount
        const minInvestAmount = detail.projectDetails.surplusAmount < detail.projectDetails.minInvestAmount ? detail.projectDetails.surplusAmount : detail.projectDetails.minInvestAmount
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
                                <li>{detail.projectDetails.loanExpiry || detail.projectDetails.transferPeriod}
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
                                <StepperInput config={{
                                    defaultValue: minInvestAmount, //默认金额
                                    money: this.state.money,//传给子组件的输入框的金额
                                    min: minInvestAmount,//子组件需要最小投资额度
                                    max: maxInvestAmount,//子组件需要最大投资额度
                                    step: detail.projectDetails.minInvestAmount,//子组件需要的步长
                                    surplusAmount: detail.projectDetails.surplusAmount,//该项目的剩余投资额度
                                    setMoney: this.props.setMoney,//把父组件的设置金额的方法传到子组件
                                    setProfit: this.props.setProfit,//把父组件的设置利率的方法传到子组件
                                    availableBalance: detail.myInfo.availableBalance,//把该个人的账户可用额度传到子组件
                                    callback: (obj) => {//子组件的回调中设置父组件的状态
                                        this.setState({
                                            tips: obj.tips,
                                            money: parseFloat(obj.value),
                                            code: obj.code,
                                            profit: obj.value * (rate / 12 * (detail.projectDetails.loanExpiry || detail.projectDetails.transferPeriod)) * 0.01,
                                            reward: '选择系统奖励',
                                            rateCouponId: '',
                                            redEnvelopeId: '',
                                        });
                                    }
                                }} {...this.props} key={detail.projectDetails.minInvestAmount}></StepperInput>
                                <div className='sum'>参考收益：
                                    <span>￥{this.state.profit.toFixed(2)}</span>
                                </div>
                                <div className="tips__area">
                                    {this.state.tips != '' ? <span className="errorMessages">{this.state.tips}</span>
                                        : ''}
                                </div>
                            </div>
                            {
                                this.props.match.params.type==0?
                                <div className='list'>
                                    <div className='list-item'>
                                        <i className='icon-coupon left'></i>
                                        <div className='item-content'>系统奖励
                                            <span onClick={this.handleSelectClick.bind(this, detail.projectDetails.id)}>{this.state.reward}</span>
                                        </div>
                                        <i className='icon-arrow right'></i>
                                    </div>
                                </div>
                                :
                                <div className='list'>
                                </div>

                            }
                            
                            <div className='i-list'>
                                <div className='i-list-item' onClick={this.handleProjectClick.bind(this, detail.projectDetails.projectId ? detail.projectDetails.projectId : detail.projectDetails.id)}>
                                    <i className='icon-item-detail icon'></i>
                                    <p>项目详情</p>
                                </div>
                                <div className='i-list-item' onClick={this.handleRecordsClick.bind(this, this.props.match.params.type, detail.projectDetails.id)}>
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
                                    <Button type="primary" onClick={this.handlePostClick.bind(this)} disabled={this.state.code != 100 || !this.state.button || (this.state.status != 2 && this.state.transStatus != 2)}>{(this.state.status == 2 || this.state.transStatus == 2) ? '立即投资' : this.state.statusString}</Button>
                                </div>
                                :
                                <div className={`button active`} onClick={this.handleLoginClick.bind(this)}>立即登录</div>
                        }

                    </div>
                </div>
                {
                    this.state.Modal ?
                        <Rewards config={{
                            projectId: detail.projectDetails.id,//项目ID
                            money: this.state.money,//已输入的金额
                            handleSelectClickL: this.handleSelectClick.bind(this),//关闭奖励的方法
                            profit: detail.profit,//利润
                            callback: (obj) => {//回调中设置父组件状态
                                this.setState({
                                    reward: obj.reward,
                                    rateCouponId: obj.rateCouponId,
                                    redEnvelopeId: obj.redEnvelopeId,
                                    profit: obj.profit
                                });
                                cred.rewardType = obj.rewardType; 
                            }
                        }}

                        ></Rewards>
                        : ''
                }
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
        setProfit,
        getTransferDetails
    }, dispatch)

export default connect(select, mapDispatchToProps)(Detail);