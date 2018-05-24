import cFetch from '../libs/cFetch';


export const getTradeList = () => {
    let url = `payment/fuiou/tradeRecords`;
    return {
        type: 'GET_TRADELIST',
        async payload() {
            let res = await cFetch(url, {
                method: 'GET'
            }, true, 'http://172.16.1.225:9070/');
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