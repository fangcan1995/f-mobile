import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { certification } from '../../actions/personal';
import { isIdCard } from '../../libs/utils';
import './../retrievePassword-page/retrievePassword-page.less';
import  { Toast } from 'antd-mobile';
class CertificationPage extends Component {
	constructor(){
        super();
        this.state={
            tureName:'',
            idNumber:'',
        }
    }
    handleSubmit(){
        console.log(this.props)
        if(!this.state.tureName){
            Toast.info('请输入真实姓名')
            return false
        }
        else if(!this.state.idNumber){
            Toast.info('请输入身份证号')
            return false
        }else if(!isIdCard(this.state.idNumber)){
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
                    this.props.history.goBack()
                })               
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