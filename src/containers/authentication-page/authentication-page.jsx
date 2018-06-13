import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Immutable from "immutable";
import { riskEvaluation, syncRiskEvaluation,submitCertification } from "../../actions/personal";
import { Toast } from "antd-mobile";
import "./authentication-page.less";
import parseQueryString from '../../libs/parseQueryString'

class AuthenticationPage extends Component {
  constructor(props) {
    super(props);
  }
  handleClick(value, index) {
    const { dispatch, personal } = this.props;
    personal.riskEvaluation.data[index].answer = value;
    dispatch(syncRiskEvaluation(personal.riskEvaluation));
  }
  componentDidMount() {
    const { dispatch, personal } = this.props;
    dispatch(riskEvaluation(personal.riskEvaluation));
  }
  handleSubmit(){
    let isSubmit=true;
    const { personal } = this.props;
    const { history, location } = this.props;
    const { redirect } = parseQueryString(location.search);
    
    let array=[];
    personal.riskEvaluation.data.map(item=>{
      if(!item.answer){
        Toast.info('请完善风险评估');
        isSubmit=false;
        return false;
      }
      let obj={};
      obj.answerCode=item.answer;
      obj.questionId=item.examId;
      array.push(obj)
    })
    let submitData={
      globalSearch:'',
      sortBy:'',
      pageNum:'1',
      pageSize:'1000',
      riskResultId:'',
      questionAndAnswerDtoList:array,

    }
    if(isSubmit){
      const { dispatch } = this.props;
      dispatch(submitCertification(submitData))
      .then(res=>{
        Toast.success(res.value.message,1,()=>{
          // this.props.history.push('/mobile/personal')
          history.push(redirect ? decodeURIComponent(redirect) : '/mobile/personal')
        });
      })
      .catch(err=>{
        Toast.fail(err.message,1)
      })
    }
  }
  render() {
    const { personal } = this.props;
    let list = personal.riskEvaluation.data;
    return (
      <div className="authentication-body">
        <h2 className="assessTitle">风险评估问卷</h2>
        <div className="assessConent">
          <h3>一、问卷内容</h3>
          <p>
            为了便于您了解自身的风险承受能力，选择合适的出借标的和服务，请您填写以下风险承受能力评估问卷。下列问题可协助评估您对出借标的和服务的风险承受能力，请您根据自身情况认真选择。
            评估结果仅供参考，不构成出借建议。为了及时了解您的风险承受能力，我们建议您持续做好动态评估。
          </p>
        </div>
        <div className="question">
          {list.map((item, index) => {
            return (
              <dl key={item.examCode}>
                <dt>{item.examCode + "." + item.examName}</dt>
                <dd>
                  <ul>
                    {item.answersDtoList.map((childItem, childIndex) => {
                      return (
                        <li
                          className={
                            item.answer == childItem.answerCode
                              ? "liActive"
                              : ""
                          }
                          key={childItem.answerCode}
                          onClick={this.handleClick.bind(
                            this,
                            childItem.answerCode,
                            index
                          )}
                        >
                          {childItem.answerCode + "." + childItem.answer}
                        </li>
                      );
                    })}
                  </ul>
                </dd>
              </dl>
            );
          })}
          <button type="button" className="submitBtn" onClick={this.handleSubmit.bind(this)}>
            立即评估
          </button>
        </div>
      </div>
    );
  }
}

function select(state) {
  const { personal } = state.toJS();
  return {
    personal
  };
}

export default connect(select)(AuthenticationPage);
