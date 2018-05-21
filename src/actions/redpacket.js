import cFetch from '../libs/cFetch';



export const getRedpacket = (status = 0, month = '') => {
    let url = `http://172.16.7.3:9070/members/memberRedEnvelopes?reStatus=${status}&month=${month}`;
    return {
        type: 'GET_REDPACKET',
        async payload() {
            const res = await cFetch(url, {
                method: 'GET',
            });
            const { code, data } = res;
            if (code == 0) {
                return data.list || [];
            } else {
                throw res;
            }
        }
    };
};