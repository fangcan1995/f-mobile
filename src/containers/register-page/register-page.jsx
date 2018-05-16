import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { register,registerCode,smsRegisterCode } from '../../actions/register';
import { Link } from 'react-router-dom';
import './register-page.less';
import { isTel } from '../../libs/utils';
import bbhLogo from '../../assets/images/bbh-logo.png';
let params = {
    send_terminal: 'iPhone',
}
class RegisterPage extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            invite_code:'',
            register_token:'',
            register_code:'',
            is_read:true,
            send_terminal:'iPhone',
            passwordName:'icon-show-password',
            passwordType:'password',
            verifyCodeCd:''
        }
    }
	handleClick = (e) => {
		const { loginUser } = this.props;
		loginUser({ accout: 'aaa', password: 'aaa' })
    }
    handleChange (type, e) {
        console.log(type);
        this.setState({
            [type]: e.target.value
        });
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
            console.log(this.props)
            let smsRegisterCodeData={
                username:this.state.username,
                image_code: this.props.register.registerCode.imageCode,
                send_terminal: 'iPhone',

            }
            const { dispatch } = this.props;
            dispatch(smsRegisterCode(smsRegisterCodeData));
            console.log(this.props)
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
    handleSubmit(){
        console.log(this.props)
        if(!this.state.username){
            alert('请输入手机号')
            return false
        }
        else if(!isTel(this.state.username)){
            alert('请输入正确手机号')
            return false;
        }
        else if(!this.state.password){
            alert('请输入登陆密码')
            return false;
        }
        else if(!this.state.register_code){
            alert('请输入短信验证码')
            return false
        }
        else{
            let submitData = {...{image_code:this.props.register.registerCode.registerCode},...params};
            submitData.username=this.state.username;
            submitData.password=this.state.password;
            console.log(submitData)
            const { dispatch } = this.props;
            dispatch(loginUser(submitData));
        }
    }
    componentDidMount() {       
        const { dispatch } = this.props;
        dispatch(registerCode());
       
    }
	render() {
		const { register } = this.props;
		return (
            <div className='login-body'>
                <div className='logo-box'>
                    <Link to='/'>
                        <img src={bbhLogo} className='bbh-logo'/>
                    </Link>    
                </div>
                <div className='page-title'>
                    注册
                </div>
                <form className='login-form'>
                    <div className='login-box login-name-box'>
                        <i className='icon-telnum'></i>
                        <input type="text" className='login-name' placeholder='请输入手机号' onChange={this.handleChange.bind(this, 'username')} value={this.state.username}/>
                    </div>
                    <div className='login-box login-password-box'>
                        <i className='icon-password'></i>
                        <input type={`${this.state.passwordType}`} className='login-password' placeholder='请输入登录密码' onChange={this.handleChange.bind(this, 'password')} value={this.state.password}/>
                        <i className={`${this.state.passwordName} icon-password-right`} onClick={this.changeType.bind(this)}></i>
                    </div>
                    <div className='login-box login-password-box'>
                        <i className='icon-message-code'></i>
                        <input type="text" className='login-password' placeholder='请输入短信验证码' onChange={this.handleChange.bind(this, 'register_code')} value={this.state.register_code}/>
                        <button type='button' className='get-Messcode' disabled={this.state.verifyCodeCd} onClick={this.getMessageCode.bind(this)}>{this.state.verifyCodeCd||'获取验证码'}</button>
                    </div>
                    <div className='login-box login-password-box'>
                        <i className='icon-invite-code'></i>
                        <input type="text" className='login-name' placeholder='请输入邀请码（选填）' onChange={this.handleChange.bind(this, 'invite_code')} value={this.state.invite_code}/>
                    </div>
                    <div className='login-password-box'>
                        <button className='login-submit' type='button' onClick={this.handleSubmit.bind(this)}>注册</button>
                    </div>
                    
                </form>   
                <div className='agreement'>
                    <p>注册即表示您已同意<span>《用户注册及服务协议》</span></p>
                    <p>已有账号？<Link to='/login'><span>请登陆</span></Link></p>
                </div>         
            </div>
			)
	}
	
}

function select(state) {
  const { register } = state.toJS();
  return {
    register
  };
}



export default connect(select)(RegisterPage);