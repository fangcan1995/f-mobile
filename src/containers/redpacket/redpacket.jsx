import React, { Component } from 'react';
import { connect } from 'react-redux';  
import { Toast } from 'antd-mobile';

import RedCoupon from '../../components/redCoupon/redCoupon';
import Filter from '../../components/filter/filter';
import NoItems from '../../components/no-items/no-items';
import './redpacket.less';

import { getRedpacket } from '../../actions/redpacket';

class RedPacket extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount () {
        const { getRedpacket } = this.props;
        getRedpacket();
    }

    componentWillReceiveProps(nextProps) {
        Toast.loading('Loading', 0);
        nextProps.isFetching === false && Toast.hide();
    }

    render() {
        const { redpacketsList, match, getRedpacket } = this.props;
        let type = match.url === '/mobile/redpacket' ? 'rp' : 'cp';
        return (
            <div className="couponList">
                {
                    redpacketsList.length > 0 ? redpacketsList.map((list) => {
                        return (
                            <RedCoupon data={list} key={list.id} type={type} />
                        )
                    })
                    : <NoItems />
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
        isFetching: redpacket.isFetching,
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