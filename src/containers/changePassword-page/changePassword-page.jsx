import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import './../retrievePassword-page/retrievePassword-page.less';
import { hex_md5 } from '../../libs/md5';
import { changePassword } from '../../actions/changePassword'
import  { Toast } from 'antd-mobile';
import {setBrowserTitle,istruePsd } from '../../libs/utils';
class ChangePasswordPage extends Component {
	constructor(){
        super();
        this.state={
            password:'',
            newPassword:'',        
            confirmPassword:'',
            passwordName:'icon-show-password',
            passwordType:'password',
            newPasswordName:'icon-show-password',
            newPasswordType:'password',
            confimPasswordName:'icon-show-password',
            confimPasswordType:'password',
        }
        
    }
    componentDidMount() {
        setBrowserTitle('修改密码')
      }
    handleChange (type, e) {
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
        if(!this.state.newPassword){
            Toast.info('请输入原密码')
            return false
        }
        else if(!this.state.newPassword){
            Toast.info('请输入新密码')
            return false
        }
        else if(!istruePsd(this.state.newPassword)){
            Toast.info('密码长度为6-16位，必须包含数字、字母、符号');
            return false;
        }
        else if(!this.state.confirmPassword){
            Toast.info('请输入确认密码')
            return false
        }      
        else if(this.state.newPassword != this.state.confirmPassword){
            Toast.info('两次输入密码不一致')
            return false
        }
        else{
            let appInfo={
                type:`member`,
                username:this.props.auth.userInfo.userName,
                old_password:hex_md5(this.state.password),
                new_password:hex_md5(this.state.newPassword),
            }
            const { dispatch } = this.props;
            dispatch(changePassword(appInfo))
            .then(res=>{
                Toast.success('修改密码成功',1,()=>{
                    this.props.history.push('/mobile/login')
                })
                
            })
            .catch(err=>{
                Toast.fail('修改密码失败',1)
            })
        }
       

    }
	render() {
		const { auth,changePassword } = this.props;
		return (
            <div className='retrievePassword-body'>
               <form className='retrievePassword-form'>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>原密码</label>
                        <input type={`${this.state.passwordType}`} className='retrievePassword-password' placeholder='请输入密码' onChange={this.handleChange.bind(this, 'password')} value={this.state.password}/>
                        <i className={`${this.state.passwordName} icon-password-right`} onClick={this.changeType.bind(this,'passwordName','passwordType')}></i>                    
                    </div>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>新密码</label>
                        <input type={`${this.state.newPasswordType}`} className='retrievePassword-password' placeholder='请输入密码' onChange={this.handleChange.bind(this, 'newPassword')} value={this.state.newPassword}/>
                        <i className={`${this.state.newPasswordName} icon-password-right`} onClick={this.changeType.bind(this,'newPasswordName','newPasswordType')}></i>                    
                    </div>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>确认密码</label>
                        <input type={`${this.state.confimPasswordType}`} className='retrievePassword-password' placeholder='请输入密码' onChange={this.handleChange.bind(this, 'confirmPassword')} value={this.state.confirmPassword}/>
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
  const { auth,changePassword } = state.toJS();
  return {
    changePassword,
    auth
  };
}


export default connect(select)(ChangePasswordPage);