import React, { Component } from 'react';

import RedCoupon from '../../components/redCoupon/redCoupon';
import Filter from '../../components/filter/filter';
import '../redpacket/redpacket.less';

class CouponPage extends Component {
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

export default CouponPage;