import cFetch from '../libs/cFetch';

let url = `http://172.16.1.221:9070/members/memberRedEnvelopes?access_token=46de422b-553e-4954-9a3c-aa9e8fa9ffe1`

export const getRedpacket = () => {
    return {
        type: 'GET_REDPACKET',
        async payload() {
            const res = await cFetch(url, {
                method: 'GET',
            }, false);
            const { code, data } = res;
            if (code == 0) {
                console.log(res);
                return data.list;
            } else {
                throw res;
            }
        }
    };
};