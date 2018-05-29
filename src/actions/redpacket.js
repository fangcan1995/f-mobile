import cFetch from '../libs/cFetch';
import { Toast } from 'antd-mobile';



export const getRedpacket = (status = 0, month = '') => {
    return {
        type: 'GET_REDPACKET',
        async payload() {
            const res = await cFetch(`app/members/memberRedEnvelopes?reStatus=${status}&month=${month}`, {
                method: 'GET',
            }).catch(err => {
                Toast.fail(err.message, 2.5)
            });;
            const { code, data } = res;
            if (code == 0) {
                return data.list || [];
            } else {
                throw res;
            }
        }
    };
};