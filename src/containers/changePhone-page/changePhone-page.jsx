import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { loginUser } from '../../actions/auth';
import './changePhone-page.less';
import {mdPhone} from '../../libs/utils';
import changePhone from '../../assets/images/change-phone.png'
class ChangePhonePage extends Component {
	render() {
		const { auth } = this.props;
		return (
            <div className='changePhone-body'>
               <div className='lable'>
                   您的手机号：
               </div>
               <div className='phone-number'>{mdPhone(this.props.auth.userInfo.userName)}</div>
               <div className='img-box'>
                    <img className='changPhoneImg' src={changePhone} alt=""/>
               </div>
               
               <div className='word'>为了您的账户安全，若手机更换修改绑定手机号码</div>
               <Link to="/mobile/bindPhone"><button className='login-submit'>修改绑定手机号</button></Link>
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


export default connect(select)(ChangePhonePage);