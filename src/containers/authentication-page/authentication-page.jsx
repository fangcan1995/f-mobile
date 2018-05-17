import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { retrievePasswordUser } from '../../actions/auth';
import './../retrievePassword-page/retrievePassword-page.less';
import  { Toast } from 'antd-mobile';
class AuthenticationPage extends Component {
    constructor(){
        super();
        this.state={
            password:''
        }
    }
    handleChange (type, e) {
        this.setState({
            [type]: e.target.value
        });
    }
    handleSubmit(){
        if(!this.state.password){
            Toast.info('请输入正确的密码')
            return false;            
        }
        else{

        }
    }
	render() {
		const { auth } = this.props;
		return (
            <div className='retrievePassword-body'>
               <form className='retrievePassword-form'>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>登陆密码</label>
                        <input type="password" className='retrievePassword-name' placeholder='请输入登陆密码' onChange={this.handleChange.bind(this, 'password')}/>
                    </div>                
                </form> 
                <div className='retrievePassword-password-box'>
                    <Link to="/changePassword"><button className='retrievePassword-submit' type='button' onClick={this.handleSubmit.bind(this)}>验证</button></Link>
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

export default connect(select, mapDispatchToProps)(AuthenticationPage);