import cFetch from '../libs/cFetch';

//let getMyInfoUrl = 'http://172.16.1.221:9070/accounts/my/info?access_token=0df8249f-b5cf-4ee1-b9bf-f42b0cf1762a';
let getMyInfoUrl = 'http://172.16.1.225:9070/payment/fuiou/balance?access_token=d1d95671-ff8f-4de5-af6f-f21ed4d0e25f';

export const getMyInfo = () => {
    return {
        type: 'GET_MYINFO',
        async payload() {
            let res = await cFetch(getMyInfoUrl, {
                method: 'GET',
            }, false);
            const { code, data } = res;
            if (code == 0) {
                return data;
            } else {
                throw res;
            }
        }
    }
}