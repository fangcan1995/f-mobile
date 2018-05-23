import React, { Component } from 'react';
import { getDetails, getMyInfo, setMoney, postInvest } from '../../actions/detail';
import { connect } from 'react-redux';
import { loginUser , authCode} from '../../actions/auth';
import { bindActionCreators } from 'redux';
import {  Modal } from 'antd-mobile';
import './detail.less'

class Detail extends Component{
    state = {
        money: 0,
        sumMoney:0,
        checked:false,
        button:'',
        profit:'0.00',
        reward:'选择系统奖励'
      };
      componentDidMount(){
		const { getDetails, getMyInfo, authCode } = this.props;
        getDetails(this.props.match.params.id);
        if(this.props.auth.isAuthenticated){
            getMyInfo()
        }
        authCode()
    }
    handleProjectClick(e){
        this.props.history.push(`/projectDetail/${e}`)
    }
    handleRecordsClick(e){
        this.props.history.push(`/investment-records/${e}`)
    }

    handleMinusClick(){
        const { detail, setMoney } = this.props;
        if(this.state.money<=0){
            return 
        }
        this.setState({
            money:this.state.money-100,
            profit:(this.state.money-100)*(detail.projectDetails.annualRate/12*detail.projectDetails.loanExpiry)/100     
        })
        setMoney(this.state.money-100)
    }
    handlePlusClick(){
        const { detail, setMoney } = this.props;
        if(this.state.money>=this.state.sumMoney){
            return 
        }
        this.setState({
            money:this.state.money+100,            
            profit:(this.state.money+100)*(detail.projectDetails.annualRate/12*detail.projectDetails.loanExpiry)/100    
        })
        setMoney(this.state.money+100)
    }
    handleAllClick(){
        const { detail, setMoney } = this.props;
        this.setState({
            money:this.state.sumMoney,
            profit:(this.state.sumMoney)*(detail.projectDetails.annualRate/12*detail.projectDetails.loanExpiry)/100 
        })
        setMoney(this.state.sumMoney)
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
        const {detail, postInvest, auth} = this.props;
        if(!this.state.checked){
            console.log('false')
            return
        }
        const cred = {
            validationCode:auth.loginCode,
            projectId:detail.projectDetails.id,
            investAmt:this.state.money,
        }
        if(detail.projectDetails.noviceStatus==1){
            if(detail.myInfo.noviceStatus==1){
                if(detail.myInfo.trueName){//是否实名认证
                    if(detail.myInfo.riskStatus==0){//是否进行风险评估
                        if(detail.myInfo.openAccountStatus){//是否开户
                            postInvest()
                        }
                    }
                }
            }else{
                Modal.alert('您不是新手，无法投资新手标','请重新选择其他标的' [
                    {
                        text: 'OK',
                        onPress: () => {
                            this.props.history.push('/subjectList')
                        }
                    }
                ]);
            }
        }
    }
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
                                    <div className = 'number'>{this.state.money}</div>
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
  }, dispatch)
  
  export default connect(select, mapDispatchToProps)(Detail);