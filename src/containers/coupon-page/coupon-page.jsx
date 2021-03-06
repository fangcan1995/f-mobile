import React, { Component } from 'react';
import { connect } from 'react-redux';  
import { Toast } from 'antd-mobile';

import RedCoupon from '../../components/redCoupon/redCoupon';
import Filter from '../../components/filter/filter';
import NoItems from '../../components/no-items/no-items';
import '../redpacket/redpacket.less';

import { getCouponList } from '../../actions/coupon';

class CouponPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getCouponList } = this.props;
        getCouponList();
    }

    componentWillReceiveProps(nextProps) {
        Toast.loading('Loading', 0);
        nextProps.isFetching === false && Toast.hide();
    }

    render() {
        const { couponList, match, getCouponList } = this.props;
        let type = match.url === '/mobile/redpacket' ? 'rp' : 'cp';
        return (
            <div className="couponList">
                {
                    couponList.length > 0 ? couponList.map(item => {
                        return <RedCoupon type={type} data={item} key={item.id}/>
                    })
                    : <NoItems />
                }
                <Filter filterConfig={match.url} 
                    result={
                        result => {
                            getCouponList(
                                result.propTopIndex || result.propTopIndex == 0 ? result.propTopIndex : '',
                                result.propBottomIndex ? result.propBottomIndex : ''
                            )
                        }
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { coupon } = state.toJS();
    return {
        isFetching: coupon.isFetching,
        couponList: coupon.couponList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCouponList: (status, month) => {
            dispatch(getCouponList(status, month));
        }
    }
}

CouponPage = connect(
    mapStateToProps, 
    mapDispatchToProps
)(CouponPage);

export default CouponPage;