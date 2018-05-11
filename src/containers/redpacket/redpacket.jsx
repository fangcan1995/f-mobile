import React, { Component } from 'react';
import { connect } from 'react-redux';  

import RedCoupon from '../../components/redCoupon/redCoupon';
import Filter from '../../components/filter/filter';
import './RedPacket.less';

class RedPacket extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount () {
        console.log(this.props);
    }

    render() {
        return (
            <div className="couponList">
                <RedCoupon type='rp' data={{status: '1'}}/>
                <RedCoupon type='cp'/>
                <RedCoupon type='cp' invalid={true}/>
                <Filter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth } = state.toJS();
    return {
        auth
    }
};

const mapDispatchToProps = (state) => {
    
}

RedPacket = connect(
    mapStateToProps, 
    //mapDispatchToProps
)(RedPacket);

export default RedPacket;