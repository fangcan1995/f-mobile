import cFetch from '../libs/cFetch';
import { Toast } from 'antd-mobile';


export const getTradeList = (type = '', month = 0) => {
    let url = `/payment/fuiou/tradeRecords?payType=${type}&month=${month}&sortBy=-createTime`;
    return {
        type: 'GET_TRADELIST',
        async payload() {
            let res = await cFetch(url, {
                method: 'GET'
            }, true, 'http://172.16.1.225:9070').catch(err => {
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