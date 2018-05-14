import React, { Component } from 'react';
import { getDetails } from '../../actions/detail';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import './detail.less'

class Detail extends Component{
    state = {
        percent: 75,
      };
      componentDidMount(){
		const { getDetails } = this.props;
		getDetails(this.props.match.params.id)
	}
    render(){
        const { auth , detail } = this.props;
        console.log(detail);
        return (
            <div id='detail'>
                <div className = 'warpper'>
                    <div className = 'content'>
                        <div className = 'nav'>
                            <div className = 'nav-tital'>
                                {detail.project.annualRate}%<br/><span>预计年化收益率</span>
                            </div>
                            <div className = 'plus'>加息</div>
                            <div className = 'clear'></div>
                            <ul className = 'show-massage'>
                                <li>{detail.project.surplusAmount}
                                    <p>剩余金额（元）</p>
                                </li>
                                <li>{detail.project.loanExpiry}
                                    <p>期限（月）</p>
                                </li>
                                <li>{detail.project.minInvestAmount}
                                    <p>起投金额（元）</p>
                                </li>
                            </ul>
                            <div className="progress">
                                <div className="progress__bar">
                                    <div className="progress__bar--cur" style={{width: `${detail.project.investmentProgress}%`}}>
                                        <div className = 'num'>{detail.project.investmentProgress}
                                            <span className = 'triangle'></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'main'>
                            <div className = 'card'>
                                <p>账户余额：
                                    <span className = 'left'>￥10000</span>
                                    <span className = 'right'>全投</span>
                                </p>
                                <div className className = 'money'>
                                    <span className = 'minus'><i className = 'icon-minus'></i></span>
                                    <div className = 'number'>1000</div>
                                    <span className = 'plus'><i className = 'icon-plus'></i></span>
                                </div>
                                <div className = 'sum'>预计收益：
                                    <span>￥100.10</span>
                                </div>
                            </div>
                            <div className = 'list'>
                                <div className = 'list-item'>
                                    <i className = 'icon-coupon left'></i>
                                    <div className = 'item-content'>加息券
                                        <span>无可用加息券</span>
                                    </div>
                                    <i className = 'icon-arrow right'></i>
                                </div>
                                <div className = 'list-item'>
                                    <i className = 'icon-redpacket left'></i>
                                    <div className = 'item-content'>红包
                                        <span>无可用返现红包</span>
                                    </div>
                                    <i className = 'icon-arrow right'></i>
                                </div>
                                <div className = 'plan'>
                                    已按最优方案匹配奖励
                                </div>
                            </div>
                            <div className = 'i-list'>
                                <div className = 'i-list-item'>
                                    <i className = 'icon-item-detail icon'></i>
                                    <p>项目详情</p>
                                </div>
                                <div className = 'i-list-item'>
                                    <i className = 'icon-invest-history icon'></i>
                                    <p>投资记录</p>
                                </div>
                                <div className = 'i-list-item'>
                                    <i className = 'icon-danger-control icon'></i>
                                    <p>风险提示</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = 'footer'>
                        <div className = 'checkbox'>
                            <label className = 'tips'>
                                <input type = 'checkbox'/>我已阅读并同意
                                <span className= 'agreement'><a href=''>《投资协议》</a>、<a href=''>《网络借贷风险和禁止性行为提示》</a></span>
                            </label>
                        </div>
                        <div className = 'button'>立即投资</div>
                    </div>
                </div>
            </div>
        )
    }
}

function select(state) {
    const { auth, detail } = state.toJS();
    return {
      auth,
      detail
    };
  }
  
  const mapDispatchToProps = dispatch => 
  bindActionCreators({
    loginUser,
    getDetails,
  }, dispatch)
  
  export default connect(select, mapDispatchToProps)(Detail);