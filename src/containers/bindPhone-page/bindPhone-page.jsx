import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { retrievePasswordUser } from '../../actions/auth';
import { isTel } from '../../libs/utils';
import './../retrievePassword-page/retrievePassword-page.less';
class BindPhonePage extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            verify_code:'',
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
            alert('请输入手机号')
            return false;            
        }
        else if(!isTel(this.state.username)){
            alert('请输入正确手机号')
            return false;
        }else{
            let time=60;
            let timeInt= setInterval(()=>{ 
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
    handleSubmit(){
        if(!this.state.username){
            alert('请输入手机号')
            return false;            
        }
        else if(!isTel(this.state.username)){
            alert('请输入正确手机号')
            return false;
        }
        else if(!this.state.verify_code){
            alert('请输入短信验证码')
            return false;
        }else{

        }
    }
	render() {
		const { auth } = this.props;
		return (
            <div className='retrievePassword-body'>
               <form className='retrievePassword-form'>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>手机号</label>
                        <input type="text" className='retrievePassword-name' placeholder='请输入手机号' onChange={this.handleChange.bind(this, 'username')}/>
                    </div>
                    <div className='retrievePassword-box retrievePassword-password-box'>
                        <label>验证码</label>
                        <input type="text" className='retrievePassword-password' placeholder='请输入短信验证码' onChange={this.handleChange.bind(this, 'verify_code')}/>
                        <button type='button' className='get-Messcode' disabled={this.state.verifyCodeCd} onClick={this.getMessageCode.bind(this)}>{this.state.verifyCodeCd||'获取验证码'}</button>
                    </div>              
                </form> 
                <div className='retrievePassword-password-box'>
                    <button className='retrievePassword-submit' type='button' onClick={this.handleSubmit.bind(this)}>绑定手机</button>
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

export default connect(select, mapDispatchToProps)(BindPhonePage);