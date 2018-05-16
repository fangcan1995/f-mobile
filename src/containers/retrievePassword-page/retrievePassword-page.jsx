import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { retrievePasswordUser } from '../../actions/auth';
import './retrievePassword-page.less';
class RetrievePasswordPage extends Component {
	handleClick = (e) => {
		const { retrievePasswordUser } = this.props;
		retrievePasswordUser({ accout: 'aaa', password: 'aaa' })
	}
	render() {
		const { auth } = this.props;
		return (
            <div className='retrievePassword-body'>
               <form className='retrievePassword-form'>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>手机号</label>
                        <input type="text" className='retrievePassword-name' placeholder='请输入手机号'/>
                    </div>
                    <div className='retrievePassword-box retrievePassword-password-box'>
                        <label>验证码</label>
                        <input type="text" className='retrievePassword-password' placeholder='请输入短信验证码'/>
                        <button className='get-Messcode' type='button'>获取验证码</button>
                    </div>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>新密码</label>
                        <input type="password" className='retrievePassword-name' placeholder='请设置你的新密码'/>
                    </div>                
                </form> 
                <div className='retrievePassword-password-box'>
                    <button className='retrievePassword-submit'>确定</button>
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
  retrievePasswordUser,
}, dispatch)

export default connect(select, mapDispatchToProps)(RetrievePasswordPage);