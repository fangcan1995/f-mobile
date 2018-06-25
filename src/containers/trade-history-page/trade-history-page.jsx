import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast, PullToRefresh } from 'antd-mobile';

import './trade-history-page.less';
import TradeCard from '../../components/trade-card/trade-card';
import Filter from '../../components/filter/filter';
import NoItems from '../../components/no-items/no-items';

import { getTradeList } from '../../actions/trade-history';


class TradeHistoryPage extends Component {

    constructor(props) {
        super(props);
        this.pageNum = 1;
        this.state = {
            height: document.documentElement.clientHeight,
            refreshing: false,
            list: [],
            params: {
                type: '',
                month: 0,
            }
        }
    }

    componentDidMount() {
        const { getTradeList } = this.props;
        getTradeList().then(res => {
            this.setState({
                list: res.value.list,
                pages: res.value.pages
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        Toast.loading('Loading', 0);
        nextProps.isFetching === false && Toast.hide();
    }

    getTrade() {
        const { getTradeList } = this.props;
        this.pageNum++;
        if(this.pageNum <= this.state.pages) {
            getTradeList({
                ...this.state.params,
                pageNum: this.pageNum
            }).then(res => {
                this.setState({
                    list: [...this.state.list].concat(res.value.list)
                });
            })
        }
    }

    render() {
        const { match, getTradeList } = this.props;
        let isTrade = match.url === '/mobile/trade-history' ? true : false;
        return (
            <div className="trade-history">
                <PullToRefresh 
                    damping={60}
                    ref={el => this.ptr = el}
                    style={{height: this.state.height, overflow: 'auto'}}
                    direction={'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={this.getTrade.bind(this)}
                >
                    {
                        this.state.list.length > 0
                            ? this.state.list.map(item => {
                                return <TradeCard isTrade={isTrade} data={item} key={item.outSeqNo} />
                            })
                            : <NoItems />
                    }
                </PullToRefresh>
                <Filter filterConfig={match.url}
                    result={
                        result => {
                            console.log(
                                result.propTopIndex ? result.propTopIndex : '',
                                result.propBottomIndex ? result.propBottomIndex : 0
                            );
                            getTradeList({
                                type: result.propTopIndex ? result.propTopIndex : '',
                                month: result.propBottomIndex ? result.propBottomIndex : 0,
                                pageNum: 1
                            }).then(res => {
                                this.setState({
                                    params: {
                                        type: result.propTopIndex ? result.propTopIndex : '',
                                        month: result.propBottomIndex ? result.propBottomIndex : 0,
                                    },
                                    list: res.value.list,
                                    pages: res.value.pages
                                })
                            });
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
        tradeData: tradeHistory.tradeData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTradeList: (params) => {
            return dispatch(getTradeList(params));
        }
    }
}

TradeHistoryPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeHistoryPage);

export default TradeHistoryPage;