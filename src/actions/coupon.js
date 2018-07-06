import cFetch from '../libs/cFetch';
import { Toast } from 'antd-mobile';



export const getCouponList = (status = '', month = '') => {
    return {
        type: 'GET_COUPON',
        async payload() {
            const res = await cFetch(`app/members/memberRateCoupons/list?rcStatus=${status}&productCategory=${month}`, {
                method: 'GET',
            }).catch(err => {
                Toast.fail(err.message, 2.5)
            });;
            const { code, data } = res;
            if (code == 0) {
                return data || [];
            } else {
                throw res;
            }
        }
    };
};