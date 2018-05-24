import cFetch from '../libs/cFetch';



export const getRedpacket = (status = 0, month = '') => {
    return {
        type: 'GET_REDPACKET',
        async payload() {
            const res = await cFetch(`app/members/memberRedEnvelopes?reStatus=${status}&month=${month}`, {
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