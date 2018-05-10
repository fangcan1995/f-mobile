import React, { Component } from 'react';

import './trade-history-page.less';
import TradeCard from '../../components/trade-card/trade-card';
import Filter from '../../components/filter/filter';


class TradeHistoryPage extends Component {
    render () {
        return (
            <div className="trade-history">
                <TradeCard isTrade={true} />
                <TradeCard isTrade={true} />
                <TradeCard isTrade={true} />
                <Filter />
            </div>
        );
    }
}

export default TradeHistoryPage;