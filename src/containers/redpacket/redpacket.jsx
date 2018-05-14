import React, { Component } from 'react';
import { connect } from 'react-redux';  

import RedCoupon from '../../components/redCoupon/redCoupon';
import Filter from '../../components/filter/filter';
import './RedPacket.less';

import { getRedpacket } from '../../actions/redpacket';

class RedPacket extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount () {
        const { getRedpacket } = this.props;
        getRedpacket();
    }

    render() {
        const { redpacketsList } = this.props;

        return (
            <div className="couponList">
                {
                    redpacketsList.map((list, i) => {
                        return (
                            <RedCoupon type='rp' data={{status: '1'}}  key={i}/>
                        )
                    })
                }
                <RedCoupon type='rp' data={{status: '1'}}/>
                <RedCoupon type='cp'/>
                <RedCoupon type='cp' invalid={true}/>
                <RedCoupon type='cp' invalid={true}/>
                <RedCoupon type='cp' invalid={true}/>
                <RedCoupon type='cp' invalid={true}/>
                <RedCoupon type='cp' invalid={true}/>
                <RedCoupon type='cp' invalid={true}/>
                <Filter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { redpacket } = state.toJS();
    console.log(redpacket);
    return {
        redpacketsList: state.toJS().redpacket.redpacketsList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRedpacket: () => {
            dispatch(getRedpacket());
        }
    }
    
}

RedPacket = connect(
    mapStateToProps, 
    mapDispatchToProps
)(RedPacket);

export default RedPacket;