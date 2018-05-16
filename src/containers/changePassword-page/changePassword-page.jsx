import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { retrievePasswordUser } from '../../actions/auth';
import './../retrievePassword-page/retrievePassword-page.less';
class ChangePasswordPage extends Component {
	constructor(){
        super();
        this.state={
            password:'',
            confirmPassword:'',
            newPasswordName:'icon-show-password',
            newPasswordType:'password',
            confimPasswordName:'icon-show-password',
            confimPasswordType:'password',
        }
        
    }
    handleChange (type, e) {
        console.log(type);
        this.setState({
            [type]: e.target.value
        });
    }
    changeType(name,type,e){
        if(this.state[name]=='icon-show-password'){
            this.setState({
                [name]: 'icon-hide-password',
                [type]:'text'
            });
        }else{
            this.setState({
                [name]: 'icon-show-password',
                [type]:'password'
            });
        }       
    }
    handleSubmit(){
        console.log(this.props)
        if(!this.state.password){
            alert('请输入新密码')
            return false
        }else if(!this.state.confirmPassword){
            alert('请输入确认密码')
            return false
        }
        else if(this.state.password != this.state.confirmPassword){
            alert('两次输入密码不一致')
            return false
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
                        <label>新密码</label>
                        <input type={`${this.state.newPasswordType}`} className='retrievePassword-password' placeholder='请输入密码' onChange={this.handleChange.bind(this, 'password')}/>
                        <i className={`${this.state.newPasswordName} icon-password-right`} onClick={this.changeType.bind(this,'newPasswordName','newPasswordType')}></i>                    </div>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>确认密码</label>
                        <input type={`${this.state.confimPasswordType}`} className='retrievePassword-password' placeholder='请输入密码' onChange={this.handleChange.bind(this, 'confirmPassword')}/>
                        <i className={`${this.state.confimPasswordName} icon-password-right`} onClick={this.changeType.bind(this,'confimPasswordName','confimPasswordType')}></i>
                    </div>                                    
                </form> 
                <div className='retrievePassword-password-box'>
                    <button className='retrievePassword-submit' type='button' onClick={this.handleSubmit.bind(this)}>确定</button>
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

export default connect(select, mapDispatchToProps)(ChangePasswordPage);