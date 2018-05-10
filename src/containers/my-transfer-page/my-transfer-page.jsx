import React, { Component } from 'react';

import './my-transfer-page.less';
import TradeCard from '../../components/trade-card/trade-card';
import Filter from '../../components/filter/filter';


class MyTransferPage extends Component {
    render () {
        return (
            <div className="trade-history">
                <TradeCard isTrade={false} />
                <TradeCard />
                <TradeCard />
                <Filter />
            </div>
        );
    }
}

export default MyTransferPage;