import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { loginUser,authCode,smsCode } from '../../actions/auth';
import { isTel } from '../../libs/utils';
import './login-message-page.less';
import bbhLogo from '../../assets/images/bbh-logo.png';
import parseJson2URL from '../../libs/parseJson2URL'; 
import {parseQueryString,setBrowserTitle} from '../../libs/utils';
import { Link } from 'react-router-dom';
import  { Toast } from 'antd-mobile';
let params = {
    client_id: 'member',
    client_secret: 'secret',
    send_terminal: 'iPhone',
}
class LoginMessagePage extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            verify_code:'',
            verifyCodeCd:''
        }
    }
    handleChange (type, e) {
        this.setState({
            [type]: e.target.value
        });
    }
    handleSubmit(){
        if(!this.state.username){
            Toast.info('请输入手机号')
            return false;            
        }
        else if(!isTel(this.state.username)){
            Toast.info('请输入正确手机号')
            return false;
        }
        else if(!this.state.verify_code){
            Toast.info('请输入短信验证码')
            return false;
        }else{
            let submitData = {...{image_code:this.props.auth.loginCode.imageCode},...params};
            submitData.username=this.state.username;
            submitData.verify_code=this.state.verify_code;
            submitData.verify_token=this.props.auth.smsLoginCode.token;
            submitData=`?${parseJson2URL(submitData)}`           
            const { dispatch } = this.props;
            dispatch(loginUser(submitData))
            .then(res=>{
                const { history, location } = this.props;
                const { redirect } = parseQueryString(location.search);
                history.push(redirect ? decodeURIComponent(redirect) : '/')
                dispatch(authCode());
            })
            .catch(err=>{
                const { dispatch } = this.props;
                dispatch(authCode());  
                Toast.fail(err.message,1)
            })
        }
    }
    setTime(){
        let time=180;
        var timeInt= setInterval(()=>{ 
            if(time>0){
                time--;
                if(this.mounted){
                    this.setState({
                        verifyCodeCd:time
                    })
                }  
            }else{                               
                if(this.mounted){
                    this.setState({
                        verifyCodeCd:''
                    })
                } 
                clearInterval(timeInt)
            }           
        },1000) 
    }
    componentWillMount(){
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    getMessageCode(e){
        if(!this.state.username){
            Toast.info('请输入手机号')
            return false;            
        }
        else if(!isTel(this.state.username)){
            Toast.info('请输入正确手机号')
            return false;
        }else{
            let smsCodeData={
                username:this.state.username,
                image_code: this.props.auth.loginCode.imageCode,
                send_terminal: 'iPhone',

            }
            const { dispatch } = this.props;
            dispatch(smsCode(smsCodeData))
            .then(res=>{
                const { dispatch } = this.props;
                dispatch(authCode());
                this.setTime();
            })
            .catch(res=>{
                Toast.fail(res.message,1)
            })
  
        }           
    }
    componentDidMount() {    
        setBrowserTitle('登 录')   
        const { dispatch } = this.props;
        dispatch(authCode());      
    }

	render() {
		const { auth } = this.props;
		return (
            <div className='login-body'>
                <div className='logo-box'>
                    <Link to='/'>
                    <img src={bbhLogo} className='bbh-logo'/>
                    </Link>
                </div>
                <div className='page-title'>
                    登录
                </div>
                <form className='login-form'>
                    <div className='login-box login-name-box'>
                        <i className='icon-telnum'></i>
                        <input type="text" className='login-name' placeholder='请输入手机号' onChange={this.handleChange.bind(this, 'username')}/>
                    </div>
                    <div className='login-box login-password-box'>
                        <i className='icon-password'></i>
                        <input type="text" className='login-password' placeholder='请输入短信验证码' onChange={this.handleChange.bind(this, 'verify_code')}/>
                        <button type='button' className='get-Messcode' disabled={this.state.verifyCodeCd} onClick={this.getMessageCode.bind(this)}>{this.state.verifyCodeCd||'获取验证码'}</button>
                    </div>
                    <div className='login-password-box'>
                        <button className='login-submit' type='button' onClick={this.handleSubmit.bind(this)}>登录</button>
                    </div> 
                    
                </form>
            </div>
			)
	}
	
}

function select(state) {
  const { auth } = state.toJS();
  return {
    auth
  };
}

export default connect(select)(LoginMessagePage);