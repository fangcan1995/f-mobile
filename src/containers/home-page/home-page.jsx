import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import ReactSwipe from 'react-swipe';
import ReactSwiper from 'reactjs-swiper';
import { loginUser } from '../../actions/auth';
import { getAdverts, getProject } from '../../actions/home';
import { isWeiXin } from '../../libs/utils';
import './home-page.less';
import FooterTab from '../../components/footer-tab/footer-tab';
import homeList1 from './../../assets/images/home-list1.png';
import homeList2 from './../../assets/images/home-list2.png';
import homeList3 from './../../assets/images/home-list3.png';
import homeList4 from './../../assets/images/home-list4.png';
import newPerson from './../../assets/images/new-person.png';
class HomePage extends Component {
	
	handleClick = (e) => {
		const { loginUser } = this.props;
		loginUser({ accout: 'aaa', password: 'aaa' })
	}
	handleLeftSwipe = (e)=> {
		console.log(e);
	  }
	componentDidMount () {
		const { getAdverts, getProject } = this.props;
		getAdverts()
		getProject()
	}
	handleBannerClick (e) {
		window.location.href=e
	}

	handleDetailClick (e) {
		this.props.history.push(`/mobile/detail/${e}`)
	}
	handleAdClick (e) {
		window.location.href=e
	}
	render() {
		const { auth ,home } = this.props;
		console.log(this.props)
		// const items = [{
		// 	image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci1.jpg',
		// 	title: '图片1',
		// 	link: 'http://jd.com'
		//   }, {
		// 	image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci2.jpg',
		// 	title: '图片2',
		//   }, {
		// 	image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci3.jpg',
		// 	title: '图片3',
		// 	link: 'http://jd.com'
		//   }, {
		// 	image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci4.jpg',
		// 	title: '图片4',
		//   }];
		 
		  let swiperOptions = {
				speed: 400,
				auto: 3000,
				disableScroll: false,
				stopPropagation: false,
				continuous: true
			}; 
			 
		return (
			<div className="home-page home-body" id="home-page">
				<div className='home-content footer-tab-content'>
				{
                    !isWeiXin() ? 
                        <div className='page-title'>
						    首页
                        </div>
                        : null
                }
				<div className='banner'>
					<ReactSwipe swipeOptions={swiperOptions} showPagination className="swiper" key={home.adverts.carouselList.length}>
						{
							home.adverts.carouselList.map((item)=>{
								return (
									<img src={item.imgsrc} key={item.id} onClick={this.handleBannerClick.bind(this,item.imgurl)}/>
								)
							})
						}
					</ReactSwipe>
				</div>
				<ul className='other-list'>
					
					{
						home.adverts.randomList.map(item=>{
							return (
								<li key={item.id} onClick={this.handleAdClick.bind(this,item.imgurl)}>
										<img src={item.imgsrc} alt={item.title}/>
								</li>
							)
						})
					}

				</ul>
				<div className='greenhand'>
					{
						home.project.advertList.length?<img src={home.project.advertList[0].imgsrc} alt={home.project.advertList[0].title} />
						:
						<img src={newPerson} alt='' />
					}
					
					<div className='greenhand-content'>
						{
							home.project.noviceList.length?
							<div>
								{
									home.project.noviceList.map(item=>{
										return (
											<div key={item.id} onClick = {this.handleDetailClick.bind(this,item.id)}>
												<div className='tag'>
													<label className='l'>新手专享</label>
													<ul className='l'>
														<li className='l'>加息</li>
														<li className='l'>限额1万元</li>
														<li className='l'>限投一次</li>
													</ul>
													
												</div>
												<div className='yield'>
													<div className='money l'>
															预计年化收益率&nbsp;&nbsp;&nbsp;<span className='number'>{item.annualRate}</span><span className='unit'>%</span>
													</div>
													<div className='deadline r'>
															期限&nbsp;&nbsp;&nbsp;<span className='number'>{item.loanExpiry}</span><span className='unit'>个月</span>
													</div>
												</div>
											</div>	
										)
									})
								}
								
							</div>
							:''
						}
					</div>
						{
							home.project.standardList.length?
							<div>
								{
									home.project.standardList.map(item=>{
										return (
											<div key = {item.id} className='greenhand-content' onClick = {this.handleDetailClick.bind(this,item.id)}>
												<div className='tag'>
													<label className='l'>优质推荐</label>
													<ul className='l'>
														<li className='l'>加息</li>
													</ul>
												</div>
												<div className='yield'>
													<div className='money l'>
															预计年化收益率&nbsp;&nbsp;&nbsp;<span className='number'>{item.annualRate}</span><span className='unit'>%</span>
													</div>
													<div className='deadline r'>
															期限&nbsp;&nbsp;&nbsp;<span className='number'>{item.loanExpiry}</span><span className='unit'>个月</span>
													</div>
												</div>
											</div>
										)
									})
								}
							</div>
								:''
						}
				</div>
				</div>
				<div className='footer-tab-parent'>
					{/* <FooterTab></FooterTab> */}
				</div>

			</div>
			)
	}
	
}

function select(state) {
  const { auth, home } = state.toJS();
  return {
	auth,
	home
  };
}

const mapDispatchToProps = dispatch => 
bindActionCreators({
  loginUser,
  getAdverts,
  getProject,
}, dispatch)

export default connect(select, mapDispatchToProps)(HomePage);