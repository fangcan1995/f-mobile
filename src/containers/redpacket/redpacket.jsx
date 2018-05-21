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
        const { redpacketsList, match, getRedpacket } = this.props;
        let type = match.url === '/redpacket' ? 'rp' : 'cp';
        return (
            <div className="couponList">
                {
                    redpacketsList.length > 0 ? redpacketsList.map((list) => {
                        return (
                            <RedCoupon data={list} key={list.id} type={type} />
                        )
                    })
                    : '暂无数据'
                }
                <Filter filterConfig={match.url} 
                    result={
                        result => {
                            getRedpacket(
                                result.propTopIndex ? result.propTopIndex : 0,
                                result.propBottomIndex ? result.propBottomIndex : ''
                            )
                        }
                    }
                />
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
        getRedpacket: (status, month) => {
            dispatch(getRedpacket(status, month));
        }
    }
    
}

RedPacket = connect(
    mapStateToProps, 
    mapDispatchToProps
)(RedPacket);

export default RedPacket;