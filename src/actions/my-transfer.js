import cFetch from '../libs/cFetch';
import { Toast } from 'antd-mobile';


export const getMyTransfer = (status = 0, month = '') => {
    console.log(status, month);
    return {
        type: 'GET_MYTRANSFER',
        async payload() {
            let res = await cFetch(`app/members/investments/transfer?status=${status}&month=${month}`, {
                method: 'GET'
            }).catch(err => {
                Toast.fail(err.message, 2.5)
            });
            const { code, data } = res;
            console.log(data);
            if(code == 0) {
                return data.list || [];
            }
            else {
                throw res;
            }
        }
    }
}