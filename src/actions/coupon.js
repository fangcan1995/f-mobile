import cFetch from '../libs/cFetch';

let url = `http://172.16.7.3:9070/members/memberRateCoupons?access_token=3f022ea4-470d-44c3-85b3-8552ddfc0b41`;

export const getCouponList = () => {
    return {
        type: 'GET_COUPON',
        async payload() {
            const res = await cFetch(url, {
                method: 'GET',
            }, false);
            const { code, data } = res;
            if (code == 0) {
                return data.list;
            } else {
                throw res;
            }
        }
    };
};