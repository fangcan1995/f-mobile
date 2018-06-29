import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { loginUser } from '../../actions/auth';
import { getsubjectList, gettransferList } from "../../actions/subjectList";
import './subjectList-page.less';
import FooterTab from '../../components/footer-tab/footer-tab';
import earnings from '../../assets/images/earnings.png';
import finish from '../../assets/images/finish.png';
import full from '../../assets/images/full.png';
import { PullToRefresh } from "antd-mobile";

let cred = {
	sortBy: null,
	pageSize: 5,
	pageNum: 1
}
class SubjectListPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			borderClass: "one",
			tabClassOne: "active",
			tabClassTwo: "",
			liClassOne: 'active',
			liClassTwo: '',
			liClassThr: '',
			list: [],
			arrow: 0,
			otherArrow: 0,
			refreshing: false,
			height: document.documentElement.clientHeight,
			distanceToRefresh: 25,
			down: false,
			hasMore: true,
		};
	}
	handleClick(type) {
		const { subjectList } = this.props;
		if (type == 1) {
			this.setState({
				borderClass: "one",
				tabClassOne: "active",
				tabClassTwo: "",
				hasMore: true,
			});
			const { subjectList } = this.props;
			cred.pageNum = 1
			cred.pageSize = 5
			this.getsubjectList(cred)
			this.setState({
				list: subjectList.projectList.list
			})
		} else {
			cred.pageNum = 1
			cred.pageSize = 5
			this.setState({
				borderClass: "two",
				tabClassOne: "",
				tabClassTwo: "active",
				hasMore: true,
			});
			this.setState({
				list: subjectList.transferList.list
			})
		}
	}
	handleLiClick(type) {
		const { subjectList } = this.props;
		if (type == 1) {
			this.setState({
				liClassOne: 'active',
				liClassTwo: '',
				liClassThr: '',
				arrow: 0,
				otherArrow: 0,
				hasMore: true,
			});
			if (this.state.tabClassOne) {
				cred = {
					sortBy: null,
					pageNum: 1,
					pageSize: 5
				}
				this.getsubjectList(cred)
				this.setState({
					list: subjectList.projectList.list
				})
			} else {
				cred = {
					sortBy: null,
					pageNum: 1,
					pageSize: 5
				}
				this.gettransferList(cred)
				this.setState({
					list: subjectList.transferList.list
				})
			}

		} else if (type == 2) {
			if (this.state.arrow == 1) {
				this.setState({
					arrow: 2,
				})
			} else {
				this.setState({
					arrow: 1,
				})
			}
			this.setState({
				liClassOne: '',
				liClassTwo: 'active',
				liClassThr: '',
				hasMore: true,
			});
			if (this.state.tabClassOne) {
				if (this.state.arrow == 1) {
					cred = {
						sortBy: '-annualRate',
						pageNum: 1,
						pageSize: 5
					}
					this.getsubjectList(cred)
					this.setState({
						list: subjectList.projectList.list,
						otherArrow: 0,
					})
				} else {
					// cred.sortBy = 
					cred = {
						sortBy: 'annualRate',
						pageNum: 1,
						pageSize: 5
					}
					this.getsubjectList(cred)
					this.setState({
						list: subjectList.projectList.list,
						otherArrow: 0,
					})
				}
			} else {
				if (this.state.arrow == 1) {
					// cred.sortBy = 
					cred = {
						sortBy: '-annualRate',
						pageNum: 1,
						pageSize: 5
					}
					this.gettransferList(cred)
					this.setState({
						list: subjectList.transferList.list,
						otherArrow: 0,
					})
				} else {
					// cred.sortBy = 
					cred = {
						sortBy: 'annualRate',
						pageNum: 1,
						pageSize: 5
					}
					this.gettransferList(cred)
					this.setState({
						list: subjectList.transferList.list,
						otherArrow: 0,
					})
				}
			}
		} else {
			if (this.state.otherArrow == 1) {
				this.setState({
					otherArrow: 2
				})
			} else {
				this.setState({
					otherArrow: 1
				})
			}
			if (this.state.tabClassOne) {
				if (this.state.otherArrow == 1) {
					// cred.sortBy = 
					cred = {
						sortBy: '-loanExpiry',
						pageNum: 1,
						pageSize: 5
					}
					this.getsubjectList(cred)
					this.setState({
						list: subjectList.projectList.list,
						arrow: 0,
					})
				} else {
					// cred.sortBy = 
					cred = {
						sortBy: 'loanExpiry',
						pageNum: 1,
						pageSize: 5
					}
					this.getsubjectList(cred)
					this.setState({
						list: subjectList.projectList.list,
						arrow: 0,
					})
				}
			} else {
				if (this.state.otherArrow == 1) {
					// cred.sortBy = 
					cred = {
						sortBy: '-loanExpiry',
						pageNum: 1,
						pageSize: 5
					}
					this.gettransferList(cred)
					this.setState({
						list: subjectList.transferList.list,
						arrow: 0,
					})
				} else {
					cred.sortBy =
						cred = {
							sortBy: 'loanExpiry',
							pageNum: 1,
							pageSize: 5
						}
					this.gettransferList(cred)
					this.setState({
						list: subjectList.transferList.list,
						arrow: 0,
					})
				}
			}
			this.setState({
				liClassOne: '',
				liClassTwo: '',
				liClassThr: 'active',
				hasMore: true,
			});
		}
	}
	componentDidMount() {
		cred.pageNum = 1
		this.getsubjectList(cred)
		this.gettransferList(cred);
		const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
		setTimeout(() => this.setState({
			height: hei,
		}), 0);
	}
	componentWillReceiveProps(nextProps) {
		const { subjectList } = nextProps;
		if (cred.pageNum == 1) {

			if (this.state.tabClassOne) {
				this.setState({
					list: subjectList.projectList.list
				})
			} else {
				this.setState({
					list: subjectList.transferList.list
				})
			}
		} else {
		}
	}
	getsubjectList(e) {
		const { getsubjectList } = this.props;
		return getsubjectList(e)
	}
	gettransferList(e) {
		const { gettransferList } = this.props;
		return gettransferList(e)
	}
	handleDetailClick(e, q) {
		this.props.history.push(`/mobile/detail/${q}/${e}`)
	}
	getNewData() {
		cred.pageNum++;
		this.setState({ refreshing: true });
		const { subjectList } = this.props;
		if (this.state.borderClass == "one") {
			if (cred.pageNum <= this.props.subjectList.projectList.pages) {
				this.getsubjectList(cred).then(res => {
					this.setState({
						list: [...this.state.list, ...res.value.list],
						// hasMore: false
					})
				}).then(() => {
					this.setState({
						// refreshing:false
						// hasMore: false
					})
				}).catch(() => {
					this.setState({
						hasMore: false
					})
				})
			} else {
				this.setState({
					down: true,
					hasMore: false,
					refreshing: false
				})
				return
			}
		} else {
			if (cred.pageNum <= this.props.subjectList.transferList.pages) {
				// this.setState({ refreshing: true });
				this.gettransferList(cred).then(res => {
					console.log(res)
					this.setState({
						list: [...this.state.list, ...res.value.list],
						// hasMore: false
					})
				}).catch(() => {
					this.setState({
						hasMore: false,
						refreshing: false
					})
				})
			} else {
				this.setState({
					down: true,
					hasMore: false,
					refreshing: false
				})
				return
			}
		}

	}
	render() {
		const { auth, subjectList } = this.props;
		return (
			<div className="subjectList-body">
				<div className="main footer-tab-content subList">
					<ul className="tab-title">
						<li
							className={`l tabClass ${this.state.tabClassOne}`}
							onClick={this.handleClick.bind(this, "1")}
						>散标
						</li>
						<li
							className={`l tabClass ${this.state.tabClassTwo}`}
							onClick={this.handleClick.bind(this, "2")}
						>债转
						</li>
						<li className={`l border-li ${this.state.borderClass}`} />
					</ul>
					<ul className={`filter-list `}>
						<li className={this.state.liClassOne}
							onClick={this.handleLiClick.bind(this, '1')}>
							默认
						</li>
						<li className={this.state.liClassTwo}
							onClick={this.handleLiClick.bind(this, '2')}>
							收益率<i className={`icon-up-arrow ${this.state.arrow == 1 ? 'active' : ''}`}></i>
							<i className={`icon-down-arrow ${this.state.arrow == 2 ? 'active' : ''}`}></i>
						</li>
						<li className={this.state.liClassThr}
							onClick={this.handleLiClick.bind(this, '3')}>
							期限<i className={`icon-up-arrow ${this.state.otherArrow == 1 ? 'active' : ''}`}></i>
							<i className={`icon-down-arrow ${this.state.otherArrow == 2 ? 'active' : ''}`}></i>
						</li>
					</ul>
					<ul className='content-list'>
						<PullToRefresh
							ref={el => (this.ptr = el)}
							style={{ height: this.state.height, overflow: "auto" }}
							direction={"up"}
							indicator={this.state.down ? { deactivate: '没有更多数据了' } : { deactivate: '上拉加载更多' }}
							// distanceToRefresh={this.state.distanceToRefresh}
							refreshing={this.state.refreshing}
							onRefresh={this.getNewData.bind(this)}
						>

							{
								this.state.list.length ?
									this.state.list.map(item => {
										return (
											<li key={item.id} onClick={this.handleDetailClick.bind(this, item.id, item.projectId ? 1 : 0)}>
												{
													item.statusString == '收益中' ? <img src={earnings} alt="" /> : ''
												}
												{
													item.statusString == '已结清' ? <img src={finish} alt="" /> : ''
												}
												{
													item.statusString == '提前还款' ? <img src={finish} alt="" /> : ''
												}
												{
													item.statusString == '已流标' ? <img src={finish} alt="" /> : ''
												}
												{
													item.statusString == '满标审核' ? <img src={full} alt="" /> : ''
												}
												{
													item.statusString == '满标待审核' ? <img src={full} alt="" /> : ''
												}
												{
													item.statusString == '已划转' ? <img src={full} alt="" /> : ''
												}
												{
													item.statusString == '待满标划转' ? <img src={full} alt="" /> : ''
												}

												<div className='title'>
													<div className='subject-name l'>{item.project ? item.project.name : item.transNo}</div><br />
													<div className='tag-list r'>{item.refundWayString}</div>
													<div className='tag-list r'>加息</div>
												</div>
												<div className='yield'>
													<div className='money l'>
														预计年化收益率&nbsp;<span className='number'>{item.annualRate}{item.raiseRate ? `+${item.raiseRate}` : ''}</span><span className='unit'>%</span>
													</div>
													<div className='deadline r'>
														期限：&nbsp;<span className='number'>{item.loanExpiry ? item.loanExpiry : item.transferPeriod}</span><span className='unit'>个月</span>
													</div>
												</div>
												<div className='residue'>
													<div className='percent l'>
														<div className='none-line'><div className='reality-line' style={{ width: `${item.investmentProgress}%` }}></div></div>

														<div className='percent-number'>{item.investmentProgress}%</div>
													</div>
													<div className='residue-money r'>
														剩余金额：&nbsp;<span className='unit'>￥</span><span className='number'>{item.surplusAmount}</span>
													</div>
												</div>
											</li>
										)
									})
									: <div className='onLoad'>加载中...</div>
							}
							{
								this.state.hasMore ? <div></div> : <div>已经到底部了^-^```</div>
							}
						</PullToRefresh>
					</ul>
				</div>
				<div className='footer-tab-parent'>
					{/* <FooterTab></FooterTab> */}
				</div>
			</div>
		)
	}

}

function select(state) {
	const { auth, subjectList } = state.toJS();
	return {
		auth,
		subjectList
	};
}

const mapDispatchToProps = dispatch =>
	bindActionCreators({
		loginUser,
		getsubjectList,
		gettransferList,
	}, dispatch)

export default connect(select, mapDispatchToProps)(SubjectListPage);