import cFetch from '../libs/cFetch';

export const getWithdraw = (withdrawNum) => {
    return {
        type: 'GET_WITHDRAW',
        async payload() {
            let res =  await cFetch(`app/payment/fuiou/cash?transAmt=${withdrawNum}&appType=${4}`, {
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