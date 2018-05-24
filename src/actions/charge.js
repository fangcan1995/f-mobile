import cFetch from '../libs/cFetch';

export const getCharge = (chargeNum) => {
    return {
        type: 'GET_CHARGE',
        async payload() {
            let res =  await cFetch(`app/payment/fuiou/deposit?transAmt=${chargeNum}&appType=${4}`, {
                method: 'GET'
            })
            const { code, data } = res;
            if(code == 0) {
                //console.log(data);
                return data;
            }
            else {
                throw res;
            }
        }
    }
}