import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { loginUser } from '../../actions/auth';
import './subjectList-page.less';
import FooterTab from '../../components/footer-tab/footer-tab';
import earnings from '../../assets/images/earnings.png';
class SubjectListPage extends Component {
	handleClick = (e) => {
		const { loginUser } = this.props;
		loginUser({ accout: 'aaa', password: 'aaa' })
	}
	render() {
		const { auth } = this.props;
		return (
            <div className="subjectList-body footer-tab-body">
				<div className="main footer-tab-content">
					<ul className="tab-title">
						<li className="l active tabClass">散标</li>
						<li className="l tabClass">债转</li>
						<li className='l border-li'></li>
						<li className='r contact-li'><i className='icon-contact'></i></li>
					</ul>
					<ul className='filter-list'>
						<li>
							默认
						</li>
						<li className='active'>
							收益率<i className='icon-up-arrow'></i>
							<i className='icon-down-arrow'></i>
						</li>
						<li>
							期限<i className='icon-up-arrow'></i>
							<i className='icon-down-arrow'></i>
						</li>
					</ul>
					<ul className='content-list'>
							<li>
								<div className='title'>
									<div className='subject-name l'>汇车贷0123456789</div>
									<div className='tag-list r'>按月付息，到期还本</div>
								</div>
								<div className='yield'>
									<div className='money l'>
											预计年化收益率&nbsp;<span className='number'>12</span><span className='unit'>%</span>
									</div>
									<div className='deadline r'>
											期限：&nbsp;<span className='number'>12</span><span className='unit'>个月</span>
									</div>
								</div>
								<div className='residue'>
									<div className='percent l'>
											<div className='none-line'></div>
											<div className='reality-line'></div>
											<div className='percent-number'>75%</div>
									</div>
									<div className='residue-money r'>
											剩余金额：&nbsp;<span className='unit'>￥</span><span className='number'>1000</span>
									</div>
								</div>
							</li>
							<li>
								<img src={earnings} alt=""/>
								<div className='title'>
									<div className='subject-name l'>汇车贷0123456789</div>
									<div className='tag-list r'>按月付息，到期还本</div>
									<div className='tag-list r'>加息</div>
								</div>
								<div className='yield'>
									<div className='money l'>
											预计年化收益率&nbsp;<span className='number'>8+2</span><span className='unit'>%</span>
									</div>
									<div className='deadline r'>
											期限：&nbsp;<span className='number'>12</span><span className='unit'>个月</span>
									</div>
								</div>
								<div className='residue'>
									<div className='percent l'>
											<div className='none-line'></div>
											<div className='reality-line'></div>
											<div className='percent-number'>75%</div>
									</div>
									<div className='residue-money r'>
											剩余金额：&nbsp;<span className='unit'>￥</span><span className='number'>1000</span>
									</div>
								</div>
							</li>
					</ul>
				</div>
				<div className='footer-tab-parent'>
					<FooterTab></FooterTab>
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

export default connect(select, mapDispatchToProps)(SubjectListPage);