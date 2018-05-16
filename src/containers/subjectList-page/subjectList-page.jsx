import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { loginUser } from '../../actions/auth';
import { getsubjectList, gettransferList } from "../../actions/subjectList";
import './subjectList-page.less';
import FooterTab from '../../components/footer-tab/footer-tab';
import earnings from '../../assets/images/earnings.png';
import finish from '../../assets/images/finish.png';
import full from '../../assets/images/full.png';
class SubjectListPage extends Component {
	constructor() {
		super();
		this.state = {
		  borderClass: "one",
		  tabClassOne: "active",
		  tabClassTwo: "",
		  liClassOne: 'active',
		  liClassTwo: '',
		  liClassThr:'',
		  list:[],
		  arrow:0,
		  otherArrow:0
		};
	  }
	  handleClick(type) {
		const { subjectList } = this.props;
		if (type == 1) {
		  this.setState({
			borderClass: "one",
			tabClassOne: "active",
			tabClassTwo: ""
		  });
		  this.setState({
			  list:subjectList.list
		  })
		} else {
		  this.setState({
			borderClass: "two",
			tabClassOne: "",
			tabClassTwo: "active"
		  });
		  this.setState({
			list:subjectList.transferList
		})
		}
	  }
	handleLiClick(type) {
		const { subjectList } = this.props;
		if (type == 1) {
		  this.setState({
			liClassOne: 'active',
			liClassTwo: '',
			liClassThr:'',
			arrow:0,
			otherArrow:0
		  });
		  console.log(this.state)
		  if(this.state.tabClassOne){
			  console.log(11111111111)
			this.getsubjectList()
			this.setState({
				list:subjectList.list
			})
		  }else{
			console.log(222222222222222)
			console.log(subjectList.transferList)
			this.gettransferList()
			this.setState({
				list:subjectList.transferList
			})  
		  }
		  
		} else if(type == 2){
			if(this.state.arrow==1){
				this.setState({
					arrow:2,
				})
			}else{
				this.setState({
					arrow:1,
				})
			}
		  this.setState({
			liClassOne: '',
			liClassTwo: 'active',
			liClassThr:'',
		  });
		  if(this.state.tabClassOne){
				if(this.state.arrow==1){
					const cred = {
								sortBy:'-annualRate'
							}
					this.getsubjectList(cred)
					this.setState({
							list:subjectList.list,
							otherArrow:0,
					})
					}else{
					const cred = {
								sortBy:'annualRate'
							}
					this.getsubjectList(cred)
					this.setState({
							list:subjectList.list,
							otherArrow:0,
					})
				}
		  	}else{
				if(this.state.arrow==1){
					const cred = {
								sortBy:'-annualRate'
							}
					this.gettransferList(cred)
					this.setState({
							list:subjectList.transferList,
							otherArrow:0,
					})
					}else{
					const cred = {
								sortBy:'annualRate'
							}
					this.gettransferList(cred)
					this.setState({
							list:subjectList.transferList,
							otherArrow:0,
					})
				}
			}	
		} else{
			if(this.state.otherArrow==1){
				this.setState({
					otherArrow:2
				})
			}else{
				this.setState({
					otherArrow:1
				})
			}
			if(this.state.tabClassOne){
				if(this.state.otherArrow==1){
					const cred = {
						sortBy:'-loanExpiry'
					}
					this.getsubjectList(cred)
					this.setState({
						list:subjectList.list,
						arrow:0,
					})
				}else{
					const cred = {
						sortBy:'loanExpiry'
					}
					this.getsubjectList(cred)
					this.setState({
						list:subjectList.list,
						arrow:0,
					})
				}
			}else{
				if(this.state.otherArrow==1){
					const cred = {
						sortBy:'-loanExpiry'
					}
					this.gettransferList(cred)
					this.setState({
						list:subjectList.transferList,
						arrow:0,
					})
				}else{
					const cred = {
						sortBy:'loanExpiry'
					}
					this.gettransferList(cred)
					this.setState({
						list:subjectList.transferList,
						arrow:0,
					})
				}
			}
			this.setState({
				liClassOne: '',
				liClassTwo: '',
				liClassThr:'active',
			});
		}
	}
	componentDidMount () {	
		this.getsubjectList()
		this.gettransferList()
	}
	componentWillReceiveProps (nextProps) {
		console.log(nextProps)
		const { subjectList } = nextProps;
		if(this.state.tabClassOne){
			this.setState({
				list:subjectList.list
			})
		}else{
			this.setState({
				list:subjectList.transferList
			})
		}
		
	}
	getsubjectList(e){
		const { getsubjectList } = this.props;
		getsubjectList(e)
	}
	gettransferList(e){
		const { gettransferList } = this.props;
		gettransferList(e)
	}
	render() {
		const { auth, subjectList } = this.props;
		console.log(this.state.list)
		return (
            <div className="subjectList-body footer-tab-body">
				<div className="main footer-tab-content">
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
							收益率<i className={`icon-up-arrow ${this.state.arrow==1?'active':''}`}></i>
							<i className={`icon-down-arrow ${this.state.arrow==2?'active':''}`}></i>
						</li>
						<li className={this.state.liClassThr}
						onClick={this.handleLiClick.bind(this, '3')}>
							期限<i className={`icon-up-arrow ${this.state.otherArrow==1?'active':''}`}></i>
							<i className={`icon-down-arrow ${this.state.otherArrow==2?'active':''}`}></i>
						</li>
					</ul>
					<ul className='content-list'>
						{
							this.state.list.map(item=>{
								return (
									<li key = {item.id} >
									{ 
										item.statusString == '收益中'?<img src={earnings} alt=""/>:''
									}
									{
										item.statusString == '已结清'?<img src={finish} alt=""/>:''
									}
									{
										item.statusString == '提前还款'?<img src={finish} alt=""/>:''
									}
									{
										item.statusString == '满标审核'?<img src={full} alt=""/>:''
									}
									{
										item.statusString == '待满标划转'?<img src={full} alt=""/>:''
									}
									
										<div className='title'>
											<div className='subject-name l'>{item.project.name}</div>
											<div className='tag-list r'>{item.refundWayString}</div>
											<div className='tag-list r'>加息</div>
										</div>
										<div className='yield'>
											<div className='money l'>
													预计年化收益率&nbsp;<span className='number'>{item.annualRate }</span><span className='unit'>%</span>
											</div>
											<div className='deadline r'>
													期限：&nbsp;<span className='number'>{item.loanExpiry}</span><span className='unit'>个月</span>
											</div>
										</div>
										<div className='residue'>
											<div className='percent l'>
													<div className='none-line'><div className='reality-line' style={{width: `${item.investmentProgress}%`}}></div></div>
													
													<div className='percent-number'>{item.investmentProgress}%</div>
											</div>
											<div className='residue-money r'>
													剩余金额：&nbsp;<span className='unit'>￥</span><span className='number'>{item.surplusAmount}</span>
											</div>
										</div>
									</li>
								)
							})
						}
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