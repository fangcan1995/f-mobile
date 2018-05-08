import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { loginUser } from '../../actions/auth';
import './login-message-page.less';
import bbhLogo from '../../assets/images/bbh-logo.png'
class LoginMessagePage extends Component {
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
                    登录
                </div>
                <form className='login-form'>
                    <div className='login-box login-name-box'>
                        <i className='icon-telnum'></i>
                        <input type="text" className='login-name' placeholder='请输入手机号'/>
                    </div>
                    <div className='login-box login-password-box'>
                        <i className='icon-password'></i>
                        <input type="text" className='login-password' placeholder='请输入短信验证码'/>
                        <span className='get-Messcode'>获取验证码</span>
                    </div>
                    <div className='login-password-box'>
                        <button className='login-submit'>登录</button>
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