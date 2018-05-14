import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { discover } from '../../actions/discover';
import './discover-page.less';
import FooterTab from '../../components/footer-tab/footer-tab';
import bbhLogo from '../../assets/images/bbh-logo.png';
let ajaxData={
	adType:'7',
    number:''
}
let list=[];
class DiscoverPage extends Component {
	componentDidMount(){
		const { dispatch } = this.props;
        dispatch(discover(ajaxData));
		console.log(this.props)
	}
	render() {
		const { discover } = this.props;
		return (
            <div className="discover-body footer-tab-body">
				<div className='footer-tab-content'>
					<div className='header'>
						<div className='title'>发现</div>
						<div className='header-list'>
							<div className='li'>
								<a href="##">
									<i className="icon-redpacket"></i>
									<div className='list-label'>分享得红包</div>
								</a>
							</div>
							<div className='li'>
								<a href="##">
									<i className="icon-activity"></i>
									<div className='list-label'>巴巴汇动态</div>
								</a>
							</div>
							<div className='li'>
								<a href="https://www.baba88.com/a/app/more/companyIntroduce">
									<i className="icon-about"></i>
									<div className='list-label'>关于巴巴汇</div>
								</a>
							</div>
							<div className='li'>
								<a href="##">
									<i className="icon-help"></i>
									<div className='list-label'>帮助中心</div>
								</a>
							</div>
							<div className='li'>
								<a href="https://www.sobot.com/chat/h5/index.html?sysNum=5c3913e80fbf4388aa19109113c92fa4&groupId=86b3b620fb034e62863b9c115d99c737&source=2">
									<i className="icon-contact"></i>
									<div className='list-label'>联系客服</div>
								</a>
							</div>
							<div className='li'>
								<a href="##">
									<i className="icon-wechat-nc"></i>
									<div className='list-label'>关注微信</div>
								</a>
							</div>
						</div>
					</div> 
					<ul>
						<li className='activity-list'>
							<img src={bbhLogo} className='activity-img' />
							<div className='activity-shadel'></div>
							<div className='activity-word'>
								<h3>活动标题</h3>
								<p>活动内容活动内容活动内容活动内容活动内容活动内容活动内容</p>
							</div>						
						</li>
						<li className='activity-list'>
							<img src={bbhLogo} className='activity-img' />
							<div className='activity-shadel'></div>
							<div className='activity-word'>
								<h3>活动标题</h3>
								<p>活动内容活动内容活动内容活动内容活动内容活动内容活动内容</p>
							</div>						
						</li>
						<li className='activity-list'>
							<img src={bbhLogo} className='activity-img' />
							<div className='activity-shadel'></div>
							<div className='activity-word'>
								<h3>活动标题</h3>
								<p>活动内容活动内容活动内容活动内容活动内容活动内容活动内容</p>
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
  const { discover } = state.toJS();
  return {
    discover
  };
}

const mapDispatchToProps = dispatch => 
bindActionCreators({
	discover,
}, dispatch)

export default connect(select, mapDispatchToProps)(DiscoverPage);