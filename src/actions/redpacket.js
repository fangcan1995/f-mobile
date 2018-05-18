import cFetch from '../libs/cFetch';



export const getRedpacket = (status = 0, month = '') => {
    let url = `http://172.16.7.3:9070/members/memberRedEnvelopes?access_token=acffa56d-f1e1-46f8-8df2-7d82d3cb65cd&reStatus=${status}&month=${month}`;
    return {
        type: 'GET_REDPACKET',
        async payload() {
            const res = await cFetch(url, {
                method: 'GET',
            }, false);
            const { code, data } = res;
            if (code == 0) {
                return data.list;
            } else {
                throw res;
            }
        }
    };
};