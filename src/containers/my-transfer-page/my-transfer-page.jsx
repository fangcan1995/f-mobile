import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Toast } from 'antd-mobile';

import './my-transfer-page.less';
import TradeCard from '../../components/trade-card/trade-card';
import Filter from '../../components/filter/filter';
import NoItems from '../../components/no-items/no-items';

import { getMyTransfer } from '../../actions/my-transfer';


class MyTransferPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getMyTransfer } = this.props;
        getMyTransfer();
    }

    componentWillReceiveProps(nextProps) {
        Toast.loading('Loading', 0);
        nextProps.isFetching === false && Toast.hide();
    }

    render () {
        const { transferList, match, getMyTransfer } = this.props;
        const url = match.url;
        return (
            <div className="trade-history">
                {
                    transferList.length > 0 ? transferList.map((item, i) => {
                        return <TradeCard isTrade={false} key={i} data={item}/>
                    })
                    : <NoItems />
                }
                <Filter filterConfig={url}
                    result={
                        result => {
                            getMyTransfer(
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
    const { myTransfer } = state.toJS();
    return {
        isFetching: myTransfer.isFetching,
        transferList: myTransfer.tranferList
    };
}

const mapDispatchToProps = dispatch => ({
    getMyTransfer: (status, month) => {
        dispatch(getMyTransfer(status, month))
    }
});

MyTransferPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyTransferPage);

export default MyTransferPage;