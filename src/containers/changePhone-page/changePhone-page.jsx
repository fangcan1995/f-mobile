import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { loginUser } from '../../actions/auth';
import './changePhone-page.less';
import changePhone from '../../assets/images/change-phone.png'
class ChangePhonePage extends Component {
	handleClick = (e) => {
		const { loginUser } = this.props;
		loginUser({ accout: 'aaa', password: 'aaa' })
	}
	render() {
		const { auth } = this.props;
		return (
            <div className='changePhone-body'>
               <div className='lable'>
                   您的手机号：
               </div>
               <div className='phone-number'>188****1234</div>
               <div className='img-box'>
                    <img className='changPhoneImg' src={changePhone} alt=""/>
               </div>
               
               <div className='word'>为了您的账户安全，若手机更换修改绑定手机号码</div>
               <button className='login-submit'>修改绑定手机号</button>
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

export default connect(select, mapDispatchToProps)(ChangePhonePage);