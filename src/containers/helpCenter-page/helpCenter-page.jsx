import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { loginUser } from '../../actions/auth';
import './helpCenter-page.less';
import bbhLogo from '../../assets/images/bbh-logo.png'
class HelpCenterPage extends Component {
	handleClick = (e) => {
		const { loginUser } = this.props;
		loginUser({ accout: 'aaa', password: 'aaa' })
	}
	render() {
		const { auth } = this.props;
		return (
            <div className="helpCenter-body">
				<div className="main">
					<ul className="tab-title">
						<li className="l active tabClass">法律法规</li>
						<li className="l tabClass">常规问题</li>
						<li className='l border-li'></li>
					</ul>
					<div className="dynamic-content">
						<ul className="dynamic-list" id='active-content'>
							<li>
								<h3>银保监会一号文“剑指”占字占字占字占字占字占字占字占字占字占字占字占字</h3>
								<p className="time-p"><i className="icon-time"></i>&nbsp;&nbsp;&nbsp;发布时间：2017-10-20</p>
							</li>
							<li>
								<h3>银保监会一号文“剑指”占字占字占字占字占字占字占字占字占字占字占字占字</h3>
								<p className="time-p"><i className="icon-time"></i>&nbsp;&nbsp;&nbsp;发布时间：2017-10-20</p>
							</li>
							<li>
								<h3>银保监会一号文“剑指”占字占字占字占字占字占字占字占字占字占字占字占字</h3>
								<p className="time-p"><i className="icon-time"></i>&nbsp;&nbsp;&nbsp;发布时间：2017-10-20</p>
							</li>
						</ul>
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

export default connect(select, mapDispatchToProps)(HelpCenterPage);