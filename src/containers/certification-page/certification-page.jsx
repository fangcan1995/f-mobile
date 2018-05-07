import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { retrievePasswordUser } from '../../actions/auth';
import './../retrievePassword-page/retrievePassword-page.less';
class CertificationPage extends Component {
	handleClick = (e) => {
		const { retrievePasswordUser } = this.props;
		retrievePasswordUser({ accout: 'aaa', password: 'aaa' })
	}
	render() {
		const { auth } = this.props;
		return (
            <div className='retrievePassword-body'>
               <form className='retrievePassword-form'>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>真实姓名</label>
                        <input type="text" className='retrievePassword-name' placeholder='请输入真实姓名'/>
                    </div>
                    <div className='retrievePassword-box retrievePassword-name-box'>
                        <label>身份证号</label>
                        <input type="text" className='retrievePassword-name' placeholder='请输入身份证号'/>
                    </div>
              
                </form> 
                <div className='retrievePassword-password-box'>
                    <button className='retrievePassword-submit'>提交审核</button>
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