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
    let objData=personal.getRiskEvaluationResult;
		return (
            <div className='riskEvaluationResult-body'>
               <div className='lable'>
                   风险评估结果：
               </div>
               <ul>
                 <li>
                    <label>评测等级：</label>
                    <span>{objData.riskLevel}</span>
                  </li>
                  <li>
                    <label>获得称号：</label>
                      <span>{objData.name}</span>             
                  </li>
                  <li>
                    <label>投资最大额度：</label>
                    <span>{objData.investTotal}</span>
                  </li>
                  <li>
                    <label>剩余可投金额：</label>
                    <span>{objData.surplusInvestTotal}</span>
                  </li>
               </ul>
               <Link to="/mobile/authentication"><button className='login-submit'>重新评估</button></Link>
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