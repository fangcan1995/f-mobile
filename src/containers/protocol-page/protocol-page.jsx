import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { protocol } from '../../actions/protocol';
import './protocol-page.less';
import { Link } from 'react-router-dom';

class ProtocolPage extends Component {
	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(protocol(this.props.match.params.id));
	}
	render() {
		const { protocol } = this.props;
		console.log(protocol)
		let pageData=protocol.protocol
		return (
            <div className="protocol-body">
				<h2>{pageData.subjectName}</h2>
				<div className='protocol-content'  dangerouslySetInnerHTML={{__html: pageData.content}}></div>
	        </div>
			)
	}
	
}

function select(state) {
  const { protocol } = state.toJS();
  return {
    protocol
  };
}


export default connect(select)(ProtocolPage);