import cFetch from '../libs/cFetch';
import { Toast } from 'antd-mobile';

export const getRepayPlan = (proId) => {
    return {
        type: 'GET_REPAYPLAN',
        async payload() {
            let res = await cFetch(`app/members/investments/receiving/${proId}`, {
                method: 'GET'
            }).catch(err => {
                Toast.fail(err.message, 2.5)
            });
            const { code, data } = res;
            if (code == 0) {
                return data;
            } else {
                throw res;
            }
        }
    }
}