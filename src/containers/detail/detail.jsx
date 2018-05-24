import React, { Component } from 'react';
import { getDetails, getMyInfo, setMoney, postInvest, setProfit } from '../../actions/detail';
import { connect } from 'react-redux';
import { loginUser , authCode} from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { Modal, Toast } from 'antd-mobile';
import { hex_md5 } from '../../libs/md5'
import './detail.less'

class Detail extends Component{
    state = {
        money: 0,
        sumMoney:0,
        checked:false,
        button:'',
        profit:0.00,
        reward:'选择系统奖励',
        modal1: false,
        minInvestAmount:0,
        minInvestAmount2:0
      };
      
      componentDidMount(){
		const { getDetails, getMyInfo, authCode, setMoney, setProfit } = this.props;
        getDetails(this.props.match.params.id).then(res=>{
            console.log(res);
            this.setState({
                minInvestAmount:res.value.minInvestAmount,
                minInvestAmount2:res.value.minInvestAmount,
            })
            setMoney(res.value.minInvestAmount)
            setProfit(res.value.minInvestAmount*(res.value.annualRate/12*res.value.loanExpiry)*0.01)
        });
        if(this.props.auth.isAuthenticated){
            getMyInfo()
        }
        authCode()
        this.setState({
            money:this.state.minInvestAmount
        })
    }
    handleProjectClick(e){
        this.props.history.push(`/projectDetail/${e}`)
    }
    handleRecordsClick(e){
        this.props.history.push(`/investment-records/${e}`)
    }

    handleMinusClick(){
        const { detail, setMoney, setProfit } = this.props;
        if(this.state.money<=this.state.minInvestAmount2){
            Modal.alert(`投资金额不能小于起投金额${this.state.minInvestAmount2}`,'请重新输入有效金额', [
                {
                    text: '确认',
                    onPress: () => {
                        setMoney(this.state.minInvestAmount)
                        setProfit((this.state.minInvestAmount)*(detail.projectDetails.annualRate/12*detail.projectDetails.loanExpiry)*0.01 )
                        this.props.history.push('/detail')
                    }
                }
            ]);
            return 
        }
        this.setState({
            money:this.state.money-100,
            minInvestAmount:this.state.minInvestAmount-100,
            profit:(this.state.money-100)*(detail.projectDetails.annualRate/12*detail.projectDetails.loanExpiry)*0.01     
        })
        setMoney(this.state.money-100);
        setProfit((this.state.money-100)*(detail.projectDetails.annualRate/12*detail.projectDetails.loanExpiry)*0.01 )
    }
    handlePlusClick(){
        const { detail, setMoney, setProfit } = this.props;
        if(this.state.money>=this.state.sumMoney||this.state.money>=this.props.detail.projectDetails.surplusAmount||this.state.money>=this.props.detail.projectDetails.maxInvestAmount){
            Modal.alert(`投资金额超过可用余额或超过最大可投金额`,'请重新输入有效金额', [
                {
                    text: '确认',
                    onPress: () => {
                        setMoney(this.state.minInvestAmount)
                        setProfit((this.state.minInvestAmount)*(detail.projectDetails.annualRate/12*detail.projectDetails.loanExpiry)*0.01 )
                        this.props.history.push('/detail')
                    }
                }
            ]);
            
            return 
        }
        this.setState({
            money:this.state.money+100,    
            minInvestAmount:this.state.minInvestAmount+100,        
            profit:(this.state.money+100)*(detail.projectDetails.annualRate/12*detail.projectDetails.loanExpiry)*0.01    
        })
        console.log(this.state.money)
        setMoney(this.state.money+100)
        setProfit((this.state.money+100)*(detail.projectDetails.annualRate/12*detail.projectDetails.loanExpiry)*0.01 )
    }
    handleAllClick(){
        const { detail, setMoney, setProfit } = this.props;
        this.setState({
            money:this.state.sumMoney,
            minInvestAmount:this.state.sumMoney,
            profit:(this.state.sumMoney)*(detail.projectDetails.annualRate/12*detail.projectDetails.loanExpiry)*0.01 
        })
        setMoney(this.state.sumMoney)
        setProfit((this.state.sumMoney)*(detail.projectDetails.annualRate/12*detail.projectDetails.loanExpiry)*0.01 )
    }
    handleAgreeClick(){
        if(this.state.checked){
            this.setState({
                checked:!this.state.checked,
                button:''
            })
        }else{
            this.setState({
                checked:!this.state.checked,
                button:'active'
            })
        }
    }
    
    handlePostClick(){
        const {detail, postInvest, auth, rewards, setMoney, setProfit} = this.props;
        const prompt = Modal.prompt;
        if(!this.state.checked){
            console.log('false')
            return
        }
        if(this.state.money<this.state.minInvestAmount){
            console.log(22222222)
            Modal.alert(`投资金额不能小于${this.state.minInvestAmount}元`,'请重新输入有效金额', [
                {
                    text: '确认',
                    onPress: () => {
                        setMoney(this.state.minInvestAmount)
                        setProfit((this.state.minInvestAmount)*(detail.projectDetails.annualRate/12*detail.projectDetails.loanExpiry)*0.01 )
                        this.props.history.push('/detail')
                    }
                }
            ]);
            
            return 
        }
        if(this.state,money>detail.projectDetails.maxInvestAmount||this.state.money>detail.projectDetails.surplusAmount){
            const minmoney = detail.projectDetails.maxInvestAmount<detail.projectDetails.surplusAmount?detail.projectDetails.maxInvestAmount:detail.projectDetails.surplusAmount;
            const massage = detail.projectDetails.maxInvestAmount<detail.projectDetails.surplusAmount?'投资额度超过单笔':''
            Toast.fail(massage,1)
        }
        let cred = {
            validationCode:auth.loginCode,
            projectId:detail.projectDetails.id,
            investAmt:this.state.money,
            redEnvelopeId:rewards.redEnvelopeId,
            rateCouponId:rewards.rateCouponId,
            validationCode:auth.loginCode.imageCode,
            investWay:rewards.investWay,
        }
        if(detail.projectDetails.noviceLoan==1){
            if(detail.myInfo.noviceStatus==1){
                if(1){//是否实名认证detail.myInfo.trueName
                    if(1){//是否进行风险评估detail.myInfo.riskStatus==0
                        if(1){//是否开户detail.myInfo.openAccountStatus
                            console.log(prompt)
                            prompt(
                                '交易密码',
                                '请输入交易密码',
                                [
                                  { text: '取消' },
                                  { text: '确认', onPress: password => {
                                    console.log(`密码为:${password}`)
                                    password = hex_md5(password)
                                    cred = {
                                        password,
                                        ...cred
                                    }
                                    postInvest(cred).then(res=>{
                                        console.log('wwwwwww')
                                    }).catch(err=>{
                                        console.log('wwwwwww2')
                                        Toast.fail(err.msg,1)
                                    })
                                    }
                                  },
                                ],
                                'secure-text',
                              )
                            
                        }else{
                            Modal.alert('您还未开户','去开户', [
                                {
                                    text: '确认',
                                    onPress: () => {
                                        console.log(1111)
                                        this.props.history.push('/personal')
                                    }
                                }
                            ]); 
                            return 
                        }
                    }else{
                        Modal.alert('您还未进行风险评估','请进行评估', [
                            {
                                text: '确认',
                                onPress: () => {
                                    console.log(1111)
                                    this.props.history.push('/authentication')
                                }
                            }
                        ]); 
                        return 
                    }
                }else{
                    Modal.alert('您还未进行实名认证','请实名认证', [
                        {
                            text: '确认',
                            onPress: () => {
                                console.log(1111)
                                this.props.history.push('/certification')
                            }
                        }
                    ]); 
                    return 
                }
            }else{
                Modal.alert('您不是新手，无法投资新手标','请重新选择其他标的', [
                    {
                        text: '确认',
                        onPress: () => {
                            this.props.history.push('/subjectList')
                        }
                    }
                ]);
            }
        }
    };
    handleLoginClick(){
        this.props.history.push('/login')
    }

    handleSelectClick(e){
        this.props.history.push(`/rewards/${e}`)
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({
            sumMoney:nextProps.detail.myInfo.availableBalance,
            money:nextProps.detail.money,
            profit:nextProps.detail.profit,
        })
    }
    render(){
        const { auth , detail } = this.props;
        console.log(detail,this.props);
        return (
            <div id='detail'>
                <div className = 'warpper'>
                    <div className = 'content'>
                        <div className = 'nav'>
                            <div className = 'nav-tital'>
                                {detail.projectDetails.annualRate}%<br/><span>预计年化收益率</span>
                            </div>
                            <div className = 'plus'>加息</div>
                            <div className = 'clear'></div>
                            <ul className = 'show-massage'>
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
                                    <div className="progress__bar--cur" style={{width: `${detail.projectDetails.investmentProgress}%`}}>
                                        <div className = 'num'>{detail.projectDetails.investmentProgress}
                                            <span className = 'triangle'></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'main'>
                            <div className = 'card'>
                                <p>可用余额：
                                    <span className = 'left'>{this.state.sumMoney}</span>
                                    <span className = 'right' onClick = {this.handleAllClick.bind(this)}>全投</span>
                                </p>
                                <div className className = 'money'>
                                    <span className = 'minus' onClick = {this.handleMinusClick.bind(this)}><i className = 'icon-minus'></i></span>
                                    <div className = 'number'>{this.state.minInvestAmount}</div>
                                    <span className = 'plus' onClick = {this.handlePlusClick.bind(this)}><i className = 'icon-plus'></i></span>
                                </div>
                                <div className = 'sum'>参考收益：
                                    <span>￥{this.state.profit}</span>
                                </div>
                            </div>
                            <div className = 'list'>
                                <div className = 'list-item'>
                                    <i className = 'icon-coupon left'></i>
                                    <div className = 'item-content'>系统奖励
                                        <span onClick = { this.handleSelectClick.bind(this,detail.projectDetails.id)}>{this.props.rewards.reward}</span>
                                    </div>
                                    <i className = 'icon-arrow right'></i>
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
                            <div className = 'i-list'>
                                <div className = 'i-list-item' onClick={this.handleProjectClick.bind(this,detail.projectDetails.id)}>
                                    <i className = 'icon-item-detail icon'></i>
                                    <p>项目详情</p>
                                </div>
                                <div className = 'i-list-item' onClick={this.handleRecordsClick.bind(this,detail.projectDetails.id)}>
                                    <i className = 'icon-invest-history icon'></i>
                                    <p>投资记录</p>
                                </div>
                                <div className = 'i-list-item' >
                                    <i className = 'icon-danger-control icon'></i>
                                    <p>风险提示</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = 'footer'>
                    {
                        auth.isAuthenticated?
                        <div>
                            <div className = 'checkbox'>
                                <label className = 'tips'>
                                    <input type = 'checkbox' onClick = {this.handleAgreeClick.bind(this)}/>我已阅读并同意
                                    <span className= 'agreement'><a href=''>《投资协议》</a>、<a href=''>《网络借贷风险和禁止性行为提示》</a></span>
                                </label>
                            </div>
                            <div className = {`button ${this.state.button}` } onClick = {this.handlePostClick.bind(this)}>立即投资</div>
                        </div>
                        :
                        <div className = {`button active` } onClick = {this.handleLoginClick.bind(this)}>立即登录</div>
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