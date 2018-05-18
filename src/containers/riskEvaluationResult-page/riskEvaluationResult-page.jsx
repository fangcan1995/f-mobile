import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { riskEvaluationResult } from '../../actions/personal';
import './riskEvaluationResult-page.less';
import {mdPhone} from '../../libs/utils';
import changePhone from '../../assets/images/change-phone.png'
class RiskEvaluationResultPage extends Component {
  componentDidMount(){
		const { dispatch } = this.props;
    dispatch(riskEvaluationResult());
    }
	render() {
    const { personal } = this.props;
    console.log(personal)
    let ristObj=personal.getRiskEvaluationResult.data.requireEval
		return (
            <div className='riskEvaluationResult-body'>
               <div className='lable'>
                   风险评估结果：
               </div>
               <div className='phone-number'>{ristObj}</div>
               {/* <div className='word'>为了您的账户安全，若手机更换修改绑定手机号码</div> */}
               <Link to="/authentication"><button className='login-submit'>重新评估</button></Link>
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


export default connect(select)(RiskEvaluationResultPage);