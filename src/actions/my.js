import cFetch from '../libs/cFetch';

let getMyInfoUrl = 'http://172.16.7.3:9070/accounts/my/info';
//let getMyInfoUrl = 'http://172.16.7.3:9070/payment/fuiou/balance';

export const getMyInfo = () => {
    return {
        type: 'GET_MYINFO',
        async payload() {
            let res = await cFetch(getMyInfoUrl, {
                method: 'GET',
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