import React, { Component, Fragment }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { personal,getFuiou } from '../../actions/personal';
import { auth,logoutUser } from '../../actions/auth';
import {mdPhone,setBrowserTitle} from '../../libs/utils';
import  { Toast } from 'antd-mobile';
import './personal-page.less';
let ajaxData={
	adType:'7',
	putEnv:'2',
    number:''
}
class PersonalContainer extends Component {
    componentDidMount(){
        setBrowserTitle('个人中心')
        if(this.props.match.params.id){
            
            let id=this.props.match.params.id.split('_')[1]
            switch(id)
                {
                case '0000':
                    Toast.success('开户成功',1)
                    this.props.history.push('/mobile/personal')
                break;
                case '9999':
                    Toast.fail('开户失败',1)
                    this.props.history.push('/mobile/personal')
                break;
                case '5343':
                    Toast.fail('已经开户',1)
                    this.props.history.push('/mobile/personal')
                break;

                }
        }
        
		const { dispatch } = this.props;
        dispatch(personal(ajaxData));
    }
    logout(){
        const { dispatch } = this.props;
        dispatch(logoutUser())
        .then(res=>{
            Toast.success('已登出',1,()=>{
                this.props.history.push('/mobile/login')
            })
            
        })
        .catch(res=>{
            Toast.fail('登出失败',1)
        })
    }
    bindCard(){

        const { dispatch,personal } = this.props;
        console.log(personal)
        if(personal.personal.certificationStatus==0){
            Toast.fail('请进行实名认证',1)
        }else if(personal.personal.tradepasswordStatus){
            Toast.fail('请设置交易密码',1)
        }else{
            dispatch(getFuiou(4))
            .then(res=>{
                document.getElementById('webReg').action=res.value.data.url;
                document.getElementById('webReg').submit();
            
            })
            .catch(err=>{
                Toast.fail(err.message,1)
            })
        }
        
    }
    tradePassword(){
        this.props.history.push('/mobile/tradePassword')
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        const getPersonal = nextProps.personal.getPersonal;
        if(getPersonal){
            Toast.loading('loading...',0)
        }else{
            Toast.hide()
        }
    }
    render () {
        const { personal,auth } = this.props;
        let personalObj=this.props.personal.personal;
        personalObj.userName=this.props.auth.userInfo.userName;
        let toOthersInfo=personal.fuiouData.data;
        return (
            <div className="personalPage">
                <form name="webReg" id="webReg" method="post">
                    <input type="hidden" name="mchnt_cd" value={toOthersInfo.mchnt_cd} />
                    <input type="hidden" name="mchnt_txn_ssn" value={toOthersInfo.mchnt_txn_ssn} />
                    <input type="hidden" name="user_id_from" value={toOthersInfo.user_id_from} />
                    <input type="hidden" name="mobile_no" value={toOthersInfo.mobile_no} />
                    <input type="hidden" name="cust_nm" value={toOthersInfo.cust_nm} />
                    <input type="hidden" name="certif_tp" value={toOthersInfo.certif_tp} />
                    <input type="hidden" name="certif_id" value={toOthersInfo.certif_id} />
                    <input type="hidden" name="email" value={toOthersInfo.email} />
                    <input type="hidden" name="city_id" value={toOthersInfo.city_id} />
                    <input type="hidden" name="parent_bank_id" value={toOthersInfo.parent_bank_id} />
                    <input type="hidden" name="bank_nm" value={toOthersInfo.bank_nm} />
                    <input type="hidden" name="capAcntNo" value={toOthersInfo.capAcntNo} />
                    <input type="hidden" name="page_notify_url" value={toOthersInfo.page_notify_url} />
                    <input type="hidden" name="back_notify_url" value={toOthersInfo.back_notify_url} />
                    <input type="hidden" name="signature" value={toOthersInfo.signature} />
                    <input type="hidden" name="ver" value={toOthersInfo.ver} />
                </form>
                <dl>
                    <dd>
                        <div className="leftTitle">头像设置</div>
                        <span className="rightAction">
                            <Link to="/">
                                <span className="icon-arrow"></span>
                                <img className="personIcon" src={personalObj.photo} />
                            </Link>
                        </span>
                    </dd>
                </dl>
                <dl>
                    {/* <dd>
                        <div className="leftTitle">绑定手机</div>
                        <span className="rightAction">
                            <Link to="/changePhone">
                                <span className="icon-arrow"></span>
                                <span className="actionText">{mdPhone(personalObj.userName)}</span>
                            </Link>
                        </span>
                    </dd> */}
                    <dd>
                        <div className="leftTitle">实名认证</div>
                        <span className="rightAction">
                            {
                                personalObj.certificationStatus==0
                                    ? (
                                        <Link to="/mobile/certification">
                                            <span className="icon-arrow"></span>
                                            <span className="actionText">{'未认证'}</span>
                                        </Link>
                                    )
                                    :(
                                        <a href="javascript:void(0)"    >
                                            <span className="icon-arrow"></span>
                                            <span className="actionText">{'已认证'}</span>
                                        </a>
                                    )
                            }
                        </span>
                    </dd>
                </dl>
                <dl>
                    <dd>
                        <div className="leftTitle">风险评估</div>
                        <span className="rightAction">
                            <Link to= { personalObj.riskStatus =='1'?"/mobile/riskEvaluationResult":'/mobile/authentication' }>
                                <span className="icon-arrow"></span>
                                <span className="actionText">{personalObj.riskStatus  =='0'?'未评估':'已评估'}</span>
                            </Link>
                        </span>
                    </dd>
                    <dd>
                        <div className="leftTitle">银行开户</div>
                        <span className="rightAction" onClick={this.bindCard.bind(this)}>
                                <span className="icon-arrow r"></span>
                                <span className="actionText r">{personalObj.openAccountStatus=='0'?'未开户':'已开户'}</span>
                        </span>
                    </dd>
                    <dd>
                        <div className="leftTitle">交易密码</div>
                        <span className="rightAction" onClick={this.tradePassword.bind(this)}>
                                <span className="icon-arrow r"></span>
                                <span className="actionText r">{personalObj.tradepasswordStatus=='0'?'未设置':'修改'}</span>
                        </span>
                    </dd>
                </dl>
                <dl>
                    <dd>
                        <div className="leftTitle">修改密码</div>
                        <span className="rightAction">
                            <Link to="/mobile/changePassword">
                                <span className="icon-arrow"></span>
                            </Link>
                        </span>
                    </dd>
                    {/* <dd>
                        <div className="leftTitle">设置交易密码</div>
                        <span className="rightAction">
                            <Link to="/mobile/tradePassword">
                                <span className="icon-arrow"></span>
                            </Link>
                        </span>
                    </dd> */}
                </dl>
                <div className="loginOut" onClick={this.logout.bind(this)}>退出登录</div>
            </div>
        );
    }
}
function select(state) {
    const { personal,auth } = state.toJS();
    return {
        personal,
        auth
    };
  }
  
export default connect(select)(PersonalContainer);

//export default PersonalContainer;