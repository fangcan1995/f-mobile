import cFetch from '../libs/cFetch';

export const getWithdraw = (withdrawNum) => {
    let url = `http://172.16.7.3:9070/payment/fuiou/cash?transAmt=${withdrawNum}&appType=${4}`;
    return {
        type: 'GET_WITHDRAW',
        async payload() {
            let res =  await cFetch(url, {
                method: 'GET'
            })
            const { code, data } = res;
            if(code == 0) {
                return data;
            }
            else {
                throw res;
            }
        }
    }
}