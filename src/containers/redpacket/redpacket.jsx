import React, { Component } from 'react';

import RedCoupon from '../../components/redCoupon/redCoupon';
import Filter from '../../components/filter/filter';
import FilterButton from '../../components/filter/filter-button';
import './RedPacket.less';

class RedPacket extends Component {
    render() {
        return (
            <div className="couponList">
                <RedCoupon type='rp' data={{status: '1'}}/>
                <RedCoupon type='cp'/>
                <RedCoupon type='cp' invalid={true}/>
                <FilterButton />
                <Filter />
            </div>
        );
    }
}

export default RedPacket;