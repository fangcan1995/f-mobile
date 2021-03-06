import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { certification } from '../../actions/personal';
import { isIdCard,realnameRegExp } from '../../libs/utils';
import './../retrievePassword-page/retrievePassword-page.less';
import  { Toast } from 'antd-mobile';
import parseQueryString from '../../libs/parseQueryString'
class CertificationPage extends Component {
	constructor(){
        super();
        this.state={
            tureName:'',
            idNumber:'',
        }
    }
    handleSubmit(){
        const { personal } = this.props;
        const { history, location } = this.props;
        const { redirect } = parseQueryString(location.search);
        if(!this.state.tureName){
            Toast.info('请输入真实姓名')
            return false
        }
        else if(!this.state.idNumber){
            Toast.info('请输入身份证号')
            return false
        }
        else if(!realnameRegExp(this.state.tureName)){
            Toast.info('请输入2-6位汉字')
            return false
        }
        else if(!isIdCard(this.state.idNumber)){
            Toast.info('请输入正确的身份证号')
            return false
        }
        else{
            let ajaxData={
                tureName:this.state.tureName,
                idNumber:this.state.idNumber,
            }
            const { dispatch } = this.props;
            dispatch(certification(ajaxData))
            .then(res=>{
                Toast.success('认证成功',1,()=>{
                    // this.props.history.push('/mobile/personal')
                    history.push(redirect ? decodeURIComponent(redirect) : '/mobile/personal')
                })               
            })
            .catch(err=>{
                Toast.fail(err.message,1)
            })
        }
       

    }

    handleChange (type, e) {
        this.setState({
            [type]: e.target.value
        });
    }
	render() {
		const { personal } = this.props;
		return (
            <div className='retrievePassword-body'>
               <form className='retrievePassword-form'>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>真实姓名</label>
                        <input type="text" className='retrievePassword-name' placeholder='请输入真实姓名' onChange={this.handleChange.bind(this, 'tureName')} value={this.state.tureName}/>
                    </div>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>身份证号</label>
                        <input type="text" className='retrievePassword-name' placeholder='请输入身份证号' onChange={this.handleChange.bind(this, 'idNumber')} value={this.state.idNumber}/>
                    </div>
              
                </form> 
                <div className='retrievePassword-password-box'>
                    <button className='retrievePassword-submit'  type='button' onClick={this.handleSubmit.bind(this)}>提交审核</button>
                </div>
            </div>
			)
	}
	
}

function select(state) {
  const { personal } = state.toJS();
  return {
    personal
  };
}

export default connect(select)(CertificationPage);