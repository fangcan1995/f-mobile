import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { retrievePasswordUser } from '../../actions/auth';
import { isIdCard } from '../../libs/utils';
import './../retrievePassword-page/retrievePassword-page.less';
class CertificationPage extends Component {
	constructor(){
        super();
        this.state={
            realName:'',
            IDcard:'',
        }
    }
    handleSubmit(){
        console.log(this.props)
        if(!this.state.realName){
            alert('请输入真实姓名')
            return false
        }
        else if(!this.state.IDcard){
            alert('请输入身份证号')
            return false
        }else if(!isIdCard(this.state.IDcard)){
            alert('请输入正确的身份证号')
            return false
        }
        else{
            
        }
       

    }

    handleChange (type, e) {
        console.log(type);
        this.setState({
            [type]: e.target.value
        });
    }
	render() {
		const { auth } = this.props;
		return (
            <div className='retrievePassword-body'>
               <form className='retrievePassword-form'>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>真实姓名</label>
                        <input type="text" className='retrievePassword-name' placeholder='请输入真实姓名' onChange={this.handleChange.bind(this, 'realName')} value={this.state.realName}/>
                    </div>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>身份证号</label>
                        <input type="text" className='retrievePassword-name' placeholder='请输入身份证号' onChange={this.handleChange.bind(this, 'IDcard')} value={this.state.IDcard}/>
                    </div>
              
                </form> 
                <div className='retrievePassword-password-box'>
                    <Link to="/"><button className='retrievePassword-submit'  type='button' onClick={this.handleSubmit.bind(this)}>提交审核</button></Link>
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

export default connect(select, mapDispatchToProps)(CertificationPage);