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
        console.log(this.props);
        const { redpacketsList, match } = this.props;
        let type = match.url === '/redpacket' ? 'rp' : 'cp';
        return (
            <div className="couponList">
                {
                    redpacketsList.map((list) => {
                        return (
                            <RedCoupon data={list} key={list.id} type={type} />
                        )
                    })
                }
                <Filter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { redpacket } = state.toJS();
    return {
        redpacketsList: redpacket.redpacketsList
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