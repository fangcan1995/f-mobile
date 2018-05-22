import cFetch from '../libs/cFetch';

export const getCharge = (chargeNum) => {
    let url = `http://172.16.1.252:9070/payment/fuiou/deposit?transAmt=${chargeNum}&appType=${4}`;
    return {
        type: 'GET_CHARGE',
        async payload() {
            let res =  await cFetch(url, {
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