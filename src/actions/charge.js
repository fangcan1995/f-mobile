import cFetch from '../libs/cFetch';
import { Toast } from 'antd-mobile';

export const getCharge = (chargeNum) => {
    return {
        type: 'GET_CHARGE',
        async payload() {
            let res =  await cFetch(`app/payment/fuiou/deposit?transAmt=${chargeNum}&appType=${4}`, {
                method: 'GET'
            }).catch(err => {
                Toast.info(err.message, 2.5);
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