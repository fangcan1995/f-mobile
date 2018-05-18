import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { loginUser,authCode } from '../../actions/auth';
import './login-page.less';
import { Link } from 'react-router-dom';
import { hex_md5 } from '../../libs/md5';
import parseJson2URL from '../../libs/parseJson2URL'; 
import {parseQueryString} from '../../libs/utils';
import bbhLogo from '../../assets/images/bbh-logo.png';
import  { Toast } from 'antd-mobile';
let params = {
    client_id: 'member',
    client_secret: 'secret',
    grant_type: 'password',
    send_terminal: 'iPhone',
}
class LoginPage extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            passwordName:'icon-show-password',
            passwordType:'password'
        }
    }
    handleSubmit(){
        if(!this.state.username){
            Toast.info('请输入手机号或用户名')
            return false
        }else if(!this.state.password){
            Toast.info('请输入密码')
            return false
        }else{
            let submitData = {...{image_code:this.props.auth.loginCode.imageCode},...params};
            submitData.username=this.state.username;
            submitData.password=hex_md5(this.state.password);
            submitData=`?${parseJson2URL(submitData)}`
            console.log(submitData)
            const { dispatch } = this.props;
            dispatch(loginUser(submitData))
            .then(res=>{
                const { history, location } = this.props;
                const { redirect } = parseQueryString(location.search);
                history.push(redirect ? decodeURIComponent(redirect) : '/')
                dispatch(authCode());
            })
            .catch(err=>{
                Toast.fail(err.msg,1)
            })
        }
    }

    handleChange (type, e) {
        console.log(type);
        this.setState({
            [type]: e.target.value
        });
    }
    changeType(e){
        if(this.state.passwordName=='icon-show-password'){
            this.setState({
                passwordName: 'icon-hide-password',
                passwordType:'text'
            });
        }else{
            this.setState({
                passwordName: 'icon-show-password',
                passwordType:'password'
            });
        }       
    }
    componentDidMount() {       
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
                        <i className='icon-username'></i>
                        <input type="text" className='login-name' placeholder='请输入手机号/用户名' onChange={this.handleChange.bind(this, 'username')} value={this.state.username}/>
                    </div>
                    <div className='login-box login-password-box'>
                        <i className='icon-password'></i>
                        <input type={`${this.state.passwordType}`} className='login-password' placeholder='请输入密码' onChange={this.handleChange.bind(this, 'password')} value={this.state.password}/>
                        <i className={`${this.state.passwordName} icon-password-right`} onClick={this.changeType.bind(this)}></i>
                    </div>
                    <div className='login-password-box'>
                        <button type='button' className='login-submit' onClick={this.handleSubmit.bind(this)}>登录</button>
                    </div>
                    
                </form>
                <div className='other-login'>
                    <div className='border-box'></div>
                    <div className='user-other'>使用其他登陆方式</div>
                </div>
                <ul className='login-way'>
                    <li className='l'>
                         <Link to='/loginMessage'>
                            <i className='icon-wechat-border'></i><br />
                            <span>微信登陆</span>
                        </Link>
                    </li>
                    <li className='l'>
                        <Link to='/loginMessage'>
                            <i className='icon-message-special'></i><br />
                            <span>短信登录</span>
                        </Link>   
                    </li>
                </ul>
                <div className='todo-other'>
                    <div className='l li'>
                        <Link to='/retrievePassword'>
                            忘记密码
                        </Link>
                    </div>
                    <div className='l li'>
                        <Link to='/register'>
                            注册账号
                        </Link>    
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



export default connect(select)(LoginPage);