import cFetch from '../libs/cFetch';



export const getCouponList = (status = 0, month = '') => {
    return {
        type: 'GET_COUPON',
        async payload() {
            const res = await cFetch(`app/members/memberRateCoupons?rcStatus=${status}&month=${month}`, {
                method: 'GET',
            });
            const { code, data } = res;
            if (code == 0) {
                return data.list || [];
            } else {
                throw res;
            }
        }
    };
};