import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { loginUser } from '../../actions/auth';
import { isTel } from '../../libs/utils';
import './login-message-page.less';
import bbhLogo from '../../assets/images/bbh-logo.png';
import { Link } from 'react-router-dom';
let params = {
    client_id: 'member',
    client_secret: 'secret',
    send_terminal: 'iPhone',
    erify_token:''
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
            alert('请输入手机号')
            return false;            
        }
        else if(!isTel(this.state.username)){
            alert('请输入正确手机号')
            return false;
        }
        else if(!this.state.verify_code){
            alert('请输入短信验证码')
            return false;
        }else{
            let submitData = {...{image_code:this.props.auth.loginCode.imageCode},...params};
            submitData.username=this.state.username;
            submitData.password=this.state.password;
            console.log(submitData)
            const { dispatch } = this.props;
            dispatch(loginUser(submitData));
        }
    }
    getMessageCode(e){
        if(!this.state.username){
            alert('请输入手机号')
            return false;            
        }
        else if(!isTel(this.state.username)){
            alert('请输入正确手机号')
            return false;
        }else{
            let time=60;
            let timeInt= setInterval(()=>{ 
                console.log(time)
                if(time>0){
                    time--;
                    this.setState({
                        verifyCodeCd:time
                    })
                }else{               
                    this.setState({
                        verifyCodeCd:''
                    })
                    clearInterval(timeInt)
                }           
            },1000)   
        }           
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

const mapDispatchToProps = dispatch => 
bindActionCreators({
  loginUser,
}, dispatch)

export default connect(select, mapDispatchToProps)(LoginMessagePage);