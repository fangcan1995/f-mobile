import React, { Component } from 'react';
import { connect } from 'react-redux';

import './trade-history-page.less';
import TradeCard from '../../components/trade-card/trade-card';
import Filter from '../../components/filter/filter';
import NoItems from '../../components/no-items/no-items';

import { getTradeList } from '../../actions/trade-history';


class TradeHistoryPage extends Component {

    componentDidMount () {
        const { getTradeList } = this.props;
        getTradeList();
    }

    render () {
        const { match, tradeList } = this.props;
        let isTrade = match.url === '/mobile/trade-history' ? true : false;
        return (
            <div className="trade-history">
                {
                    tradeList.length > 0 
                        ? tradeList.map(item => {
                            return  <TradeCard isTrade={isTrade} data={item} key={item.outSeqNo}/>
                        })
                        : <NoItems />
                }
                <Filter filterConfig={match.url} 
                    result={
                        result => {
                            console.log(
                                result.propTopIndex ? result.propTopIndex : 0,
                                result.propBottomIndex ? result.propBottomIndex : ''
                            );
                        }
                    }
                />
            </div>
        );
    }
}


const mapStateToProps = state => {
    const { tradeHistory } = state.toJS();
    return {
        tradeList: tradeHistory.tradeList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTradeList: () => {
            dispatch(getTradeList());
        }
    }
}

TradeHistoryPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeHistoryPage);

export default TradeHistoryPage;