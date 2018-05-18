import cFetch from '../libs/cFetch';



export const getCouponList = (status = 0, month = '') => {
    let url = `http://172.16.7.3:9070/members/memberRateCoupons?access_token=acffa56d-f1e1-46f8-8df2-7d82d3cb65cd&rcStatus=${status}&month=${month}`;
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