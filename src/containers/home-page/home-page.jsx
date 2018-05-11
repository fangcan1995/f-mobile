import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import ReactSwipe from 'react-swipe';
import ReactSwiper from 'reactjs-swiper';
import { loginUser } from '../../actions/auth';
import { getAdverts } from '../../actions/home';
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
	componentDidMount(){

	}
	render() {
		const { auth ,home } = this.props;
		const items = [{
			image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci1.jpg',
			title: '图片1',
			link: 'http://jd.com'
		  }, {
			image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci2.jpg',
			title: '图片2',
		  }, {
			image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci3.jpg',
			title: '图片3',
			link: 'http://jd.com'
		  }, {
			image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci4.jpg',
			title: '图片4',
		  }];
		 
		  let swiperOptions = {
				preloadImages: true,
				autoplay: 1000,
				autoplayDisableOnInteraction: false
			}; 
			 
		return (
			<div className="home-page home-body footer-tab-body" id="home-page">
				<div className='home-content footer-tab-content'>
				<div className='page-title'>
						首页
				</div>
				<div className='banner'>
					<ReactSwiper swiperOptions={swiperOptions} showPagination items={items} className="swiper" />
				</div>
				<ul className='other-list'>
					<li>
							<img src={homeList1} alt=""/>
							<div className='list-label'>平台介绍</div>
					</li>
					<li>
							<img src={homeList2} alt=""/>
							<div className='list-label'>平台介绍</div>
					</li>
					<li>
							<img src={homeList3} alt=""/>
							<div className='list-label'>平台介绍</div>
					</li>
					<li>
							<img src={homeList4} alt=""/>
							<div className='list-label'>平台介绍</div>
					</li>

				</ul>
				<div className='greenhand'>
					<img src={newPerson} alt=""/>
					<div className='greenhand-content'>
						<Link to='/detail'>
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
										预计年化收益率&nbsp;&nbsp;&nbsp;<span className='number'>8+2</span><span className='unit'>%</span>
								</div>
								<div className='deadline r'>
										期限&nbsp;&nbsp;&nbsp;<span className='number'>3</span><span className='unit'>个月</span>
								</div>
							</div>
						</Link>
					</div>
					<div className='greenhand-content'>
						<div className='tag'>
							<label className='l'>优质推荐</label>
							<ul className='l'>
								<li className='l'>加息</li>
							</ul>
						</div>
						<div className='yield'>
							<div className='money l'>
									预计年化收益率&nbsp;&nbsp;&nbsp;<span className='number'>8+2</span><span className='unit'>%</span>
							</div>
							<div className='deadline r'>
									期限&nbsp;&nbsp;&nbsp;<span className='number'>3</span><span className='unit'>个月</span>
							</div>
						</div>
					</div>
					<div className='greenhand-content'>
						<div className='tag'>
							<label className='l'>其他</label>
							<ul className='l'>
								<li className='l'>加息</li>
							</ul>
						</div>
						<div className='yield'>
							<div className='money l'>
									预计年化收益率&nbsp;&nbsp;&nbsp;<span className='number'>8+2</span><span className='unit'>%</span>
							</div>
							<div className='deadline r'>
									期限&nbsp;&nbsp;&nbsp;<span className='number'>3</span><span className='unit'>个月</span>
							</div>
						</div>
					</div>
					
				</div>
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
	auth,
	home
  };
}

const mapDispatchToProps = dispatch => 
bindActionCreators({
  loginUser,
  getAdverts,
}, dispatch)

export default connect(select, mapDispatchToProps)(HomePage);