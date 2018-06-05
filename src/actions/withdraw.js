import cFetch from '../libs/cFetch';
import { Toast } from 'antd-mobile';

export const getWithdraw = (withdrawNum, tradePwd) => {
    return {
        type: 'GET_WITHDRAW',
        async payload() {
            let res =  await cFetch(`app/payment/fuiou/cash?transAmt=${withdrawNum}&tradePwd=${tradePwd}&appType=${4}`, {
                method: 'GET'
            }).catch(err => {
                Toast.info(err.message, 2.5)
            });
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