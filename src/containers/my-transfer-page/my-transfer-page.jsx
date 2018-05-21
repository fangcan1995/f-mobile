import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import './my-transfer-page.less';
import TradeCard from '../../components/trade-card/trade-card';
import Filter from '../../components/filter/filter';

import { getMyTransfer } from '../../actions/my-transfer';


class MyTransferPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getMyTransfer } = this.props;
        getMyTransfer();
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
                    : '暂无数据'
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