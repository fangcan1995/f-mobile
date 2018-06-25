import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { register,registerCode,smsRegisterCode } from '../../actions/register';
import { Link } from 'react-router-dom';
import './register-page.less';
import { isTel,istruePsd } from '../../libs/utils';
import { hex_md5 } from '../../libs/md5';
import parseJson2URL from '../../libs/parseJson2URL'; 
import {parseQueryString} from '../../libs/utils';
import bbhLogo from '../../assets/images/bbh-logo.png';
import  { Toast } from 'antd-mobile';
let params = {
    send_terminal: 'iPhone',
    is_read:true
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
    handleChange (type, e) {
        this.setState({
            [type]: e.target.value
        });
    }
    getMessageCode(e){
        e.stopPropagation();
        if(!this.state.username){
            Toast.info('请输入手机号')
            return false;            
        }
        else if(!isTel(this.state.username)){
            Toast.info('请输入正确手机号')
            return false;
        }
        else{
            let smsRegisterCodeData={
                username:this.state.username,
                image_code: this.props.register.registerCode.image_code,
                send_terminal: 'iPhone',
                image_token:this.props.register.registerCode.image_token,

            }
            const { dispatch } = this.props;
            dispatch(smsRegisterCode(smsRegisterCodeData))
            .then(res=>{
                localStorage.setItem('smsRegisterCode',this.props.register.smsRegisterCode.token)
                const { dispatch } = this.props;
                dispatch(registerCode());
                this.setTime();
            })
            .catch(res=>{
                const { dispatch } = this.props;
                dispatch(registerCode());
                Toast.fail(res.message,1)
            })           
        }
                   
    }
    setTime(){
        let time=180;
        var timeInt= setInterval(()=>{ 
            if(time>0){
                time--;
                if(this.mounted){
                    this.setState({
                        verifyCodeCd:time
                    })
                }  
            }else{                               
                if(this.mounted){
                    this.setState({
                        verifyCodeCd:''
                    })
                } 
                clearInterval(timeInt)
            }           
        },1000) 
    }
    componentWillMount(){
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    changeType(e){
        e.stopPropagation();
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
        if(!this.state.username){
            Toast.info('请输入手机号')
            return false
        }
        else if(!isTel(this.state.username)){
            Toast.info('请输入正确手机号')
            return false;
        }
        else if(!this.state.password){
            Toast.info('请输入登陆密码')
            return false;
        }
        else if(!this.state.register_code){
            Toast.info('请输入短信验证码')
            return false
        }
        else if(!istruePsd(this.state.password)){
            Toast.info('密码长度为6-16位，必须包含数字、字母、英文符号');
            return false;
        }
        else{
            let submitData = {...{image_code:this.props.register.registerCode.image_code},...params};
            submitData.image_token=this.props.register.registerCode.image_token
            submitData.username=this.state.username;
            submitData.password=hex_md5(this.state.password);
            submitData.register_code=this.state.register_code;
            submitData.invite_code=this.state.invite_code;
            submitData.register_token=this.props.register.smsRegisterCode.token || localStorage.getItem('smsRegisterCode')
            submitData=`?${parseJson2URL(submitData)}`
            const { dispatch } = this.props;
            dispatch(register(submitData))
            .then(res=>{
                Toast.success('注册成功',1,()=>{
                    this.props.history.push('/mobile/login')
                })
                
            })
            .catch(err=>{
                const { dispatch } = this.props;
                dispatch(registerCode());
                Toast.fail(err.message)
            })
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
                    <p>注册即表示您已同意<Link to='/mobile/protocol/6'><span>《用户注册及服务协议》</span></Link></p>
                    <p>已有账号？<Link to='/mobile/login'><span>请登陆</span></Link></p>
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