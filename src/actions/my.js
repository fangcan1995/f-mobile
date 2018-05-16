import cFetch from '../libs/cFetch';

let getMyInfoUrl = 'http://172.16.7.3:9070/accounts/my/info?access_token=45f6c3b7-4fae-4b25-94d6-3d247c1d8362';

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