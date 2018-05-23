import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { discoverDeail } from '../../actions/discoverDetail';
import './discoverDetail-page.less';
import { Link } from 'react-router-dom';
import {setBrowserTitle} from '../../libs/utils';

class DiscoverDetailPage extends Component {
	componentDidMount(){
		setBrowserTitle('详 情')
		const { dispatch } = this.props;
        dispatch(discoverDeail(this.props.match.params.id));
	}
	render() {
		const { discoverDeail } = this.props;
		console.log(this.props)
		let obj = this.props.discoverDeail.discoverDeail;
		return (
            <div className="discoverDetail-body">
				<h2>{obj.title}</h2>
				<div className='discoverDetail-time'>
					<i className="icon-time" />&nbsp;&nbsp;&nbsp;发布时间：{obj.createTime}
				</div>
				<div className='discoverDetail-content'  dangerouslySetInnerHTML={{__html: obj.affContent}}></div>
	        </div>
			)
	}
	
}

function select(state) {
  const { discoverDeail } = state.toJS();
  return {
    discoverDeail
  };
}


export default connect(select)(DiscoverDetailPage);