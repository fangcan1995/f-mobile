import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { loginUser } from '../../actions/auth';
import './dynamic-page.less';
import bbhLogo from '../../assets/images/bbh-logo.png'
class DynamicPage extends Component {
	handleClick = (e) => {
		const { loginUser } = this.props;
		loginUser({ accout: 'aaa', password: 'aaa' })
	}
	render() {
		const { auth } = this.props;
		return (
					<div className="dynamic-body">
						<div className="main">
							<ul className="tab-title">
								<li className="l active tabClass">媒体报道</li>
								<li className="l tabClass">公司动态</li>
								<li className='l border-li'></li>
							</ul>
							<div className="dynamic-content" id='active-content'>
								<dl className="dynamic-list">
									<dt className="l"><img src={bbhLogo} alt="" /></dt>
									<dd>
										<h3>银保监会一号文“剑指”占字占字占字占字</h3>
										<p className="list-content">我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
										<p className="time-p"><i className="icon-time"></i>&nbsp;&nbsp;&nbsp;发布时间：2017-10-20</p>
									</dd>
								</dl>
								<dl className="dynamic-list">
									<dt className="l"><img src={bbhLogo} alt="" /></dt>
									<dd>
										<h3>银保监会一号文“剑指”占字占字占字占字</h3>
										<p className="list-content">我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
										<p className="time-p"><i className="icon-time"></i>&nbsp;&nbsp;&nbsp;发布时间：2017-10-20</p>
									</dd>
								</dl>
								<dl className="dynamic-list">
									<dt className="l"><img src={bbhLogo} alt="" /></dt>
									<dd>
										<h3>银保监会一号文“剑指”占字占字占字占字</h3>
										<p className="list-content">我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</p>
										<p className="time-p"><i className="icon-time"></i>&nbsp;&nbsp;&nbsp;发布时间：2017-10-20</p>
									</dd>
								</dl>
							</div>
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
  loginUser,
}, dispatch)

export default connect(select, mapDispatchToProps)(DynamicPage);