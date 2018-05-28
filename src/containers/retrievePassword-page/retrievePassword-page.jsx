import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { retrievePassword,retrievePasswordCode,smsRetrievePasswordCode } from '../../actions/retrievePassword';
import { isTel,istruePsd } from '../../libs/utils';
import './retrievePassword-page.less';
import { hex_md5 } from '../../libs/md5';
import parseJson2URL from '../../libs/parseJson2URL'; 
import {parseQueryString,setBrowserTitle} from '../../libs/utils';
import  { Toast } from 'antd-mobile';

const params = {
    client_id: 'member',
    client_secret: 'secret',
    grant_type: 'password',
    send_terminal: 'iPhone',
  }
class RetrievePasswordPage extends Component {
	constructor(){
        super();
        this.state={
            username:'',
            password:'',
            forget_password_code:'',
            verifyCodeCd:''
        }
    }
    handleChange (type, e) {
        this.setState({
            [type]: e.target.value
        });
    }
    getMessageCode(e){

        if(!this.state.username){
            Toast.info('请输入手机号')
            return false;            
        }
        else if(!isTel(this.state.username)){
            Toast.info('请输入正确手机号')
            return false;
        }else{
            console.log(this.props)
            let smsRetrievePasswordData={
                username:this.state.username,
                image_code: this.props.retrievePassword.retrievePasswordCode.imageCode,
                send_terminal: 'iPhone',
            }
            const { dispatch } = this.props;
            dispatch(smsRetrievePasswordCode(smsRetrievePasswordData))
            .then(res=>{
                const { dispatch } = this.props;
                dispatch(retrievePasswordCode());
                console.log(res)
                this.setTime();
            })
            .catch(res=>{
                const { dispatch } = this.props;
                dispatch(retrievePasswordCode());    
                
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
    handleSubmit(){
        console.log(this.props)
        if(!this.state.username){
            Toast.info('请输入手机号')
            return false
        }
        else if(!isTel(this.state.username)){
            Toast.info('请输入正确手机号')
            return false;
        }
        else if(!this.state.forget_password_code){
            Toast.info('请输入短信验证码')
            return false
        }
        else if(!this.state.password){
            Toast.info('请输入新密码')
            return false
        }
        else if(!istruePsd(this.state.password)){
            Toast.info('密码长度为6-16位，必须包含数字、字母、符号')
            return false
        }
        else{
            console.log(this.props)
            let submitData = {...{image_code:this.props.retrievePassword.retrievePasswordCode.imageCode},...params};
            submitData.username=this.state.username;
            submitData.password=hex_md5(this.state.password);
            submitData.forget_password_code=this.state.forget_password_code;
            submitData.forget_password_token=this.props.retrievePassword.smsRetrievePasswordCode.token
            console.log(submitData)
            submitData=`?${parseJson2URL(submitData)}`
            console.log(submitData)
            const { dispatch } = this.props;
            dispatch(retrievePassword(submitData))
            .then(res=>{
                this.props.history.push('/mobile/login')
            })
            .catch(err=>{
                Toast.fail(err.message,1)
            })
        }
    }
    componentDidMount() { 
        setBrowserTitle('找回密码')      
        const { dispatch } = this.props;
        dispatch(retrievePasswordCode());
       
    }
	render() {
		const { retrievePassword } = this.props;
		return (
            <div className='retrievePassword-body'>
               <form className='retrievePassword-form'>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>手机号</label>
                        <input type="text" className='retrievePassword-name' placeholder='请输入手机号' onChange={this.handleChange.bind(this, 'username')} value={this.state.username}/>
                    </div>
                    <div className='retrievePassword-box retrievePassword-password-box'>
                        <label>验证码</label>
                        <input type="text" className='retrievePassword-password' placeholder='请输入短信验证码' onChange={this.handleChange.bind(this, 'forget_password_code')} value={this.state.forget_password_code}/>
                        <button className='get-Messcode' type='button' disabled={this.state.verifyCodeCd} onClick={this.getMessageCode.bind(this)}>{this.state.verifyCodeCd||'获取验证码'}</button>
                    </div>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>新密码</label>
                        <input type="password" className='retrievePassword-name' placeholder='请设置你的新密码' onChange={this.handleChange.bind(this, 'password')} value={this.state.password}/>
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
  const { retrievePassword } = state.toJS();
  return {
    retrievePassword
  };
}


export default connect(select)(RetrievePasswordPage);