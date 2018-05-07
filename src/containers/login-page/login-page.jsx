import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { loginUser } from '../../actions/auth';
import './login-page.less';
import bbhLogo from '../../assets/images/bbh-logo.png'
class LoginPage extends Component {
	handleClick = (e) => {
		const { loginUser } = this.props;
		loginUser({ accout: 'aaa', password: 'aaa' })
	}
	render() {
		const { auth } = this.props;
		return (
            <div className='login-body'>
                <div className='logo-box'>
                    <img src={bbhLogo} className='bbh-logo'/>
                </div>
                <div className='page-title'>
                    登陆
                </div>
                <form className='login-form'>
                    <div className='login-box login-name-box'>
                        <i className='icon-username'></i>
                        <input type="text" className='login-name' placeholder='请输入手机号/用户名'/>
                    </div>
                    <div className='login-box login-password-box'>
                        <i className='icon-password'></i>
                        <input type="password" className='login-password' placeholder='请输入密码'/>
                        <i className='icon-show-password'></i>
                    </div>
                    <div className='login-password-box'>
                        <button className='login-submit'>登陆</button>
                    </div>
                    
                </form>
                <div className='other-login'>
                    <div className='border-box'></div>
                    <div className='user-other'>使用其他登陆方式</div>
                </div>
                <ul className='login-way'>
                    <li className='l'>
                        <i className='icon-wechat-border'></i><br />
                        <span>微信登陆</span>
                    </li>
                    <li className='l'>
                        <i className='icon-message-special'></i><br />
                        <span>短信登录</span>
                    </li>
                </ul>
                <div className='todo-other'>
                    <div className='l li'>
                        忘记密码
                    </div>
                    <div className='l li'>
                        注册账号
                    </div>
                </div>
                
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

export default connect(select, mapDispatchToProps)(LoginPage);