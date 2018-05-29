import cFetch from '../libs/cFetch';
import { Toast } from 'antd-mobile';


export const getTradeList = (month='') => {
    let url = `app/payment/fuiou/tradeRecords?month=${month}`;
    return {
        type: 'GET_TRADELIST',
        async payload() {
            let res = await cFetch(url, {
                method: 'GET'
            }).catch(err => {
                Toast.fail(err.message, 2.5)
            });
            const { code, data } = res;
            if(code == 0) {
                return data.list || [];
            }
            else {
                throw res;
            }
        }
    }
}