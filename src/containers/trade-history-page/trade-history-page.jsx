import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';

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

    componentWillReceiveProps(nextProps) {
        Toast.loading('Loading', 0);
        nextProps.isFetching === false && Toast.hide();
    }

    render () {
        const { match, tradeList, getTradeList } = this.props;
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
                            getTradeList(result.propBottomIndex ? result.propBottomIndex : '');
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
        isFetching: tradeHistory.isFetching,
        tradeList: tradeHistory.tradeList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTradeList: (month) => {
            dispatch(getTradeList(month));
        }
    }
}

TradeHistoryPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeHistoryPage);

export default TradeHistoryPage;