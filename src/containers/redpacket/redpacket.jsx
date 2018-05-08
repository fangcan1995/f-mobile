import React, { Component } from 'react';

import RedCoupon from '../../components/redCoupon/redCoupon';
import './RedPacket.less';

class RedPacket extends Component {
    render() {
        return (
            <div className="couponList">
                <RedCoupon type='rp' />
                <RedCoupon type='cp' />
                <RedCoupon type='cp' invalid={true}/>
            </div>
        );
    }
}

export default RedPacket;