import cFetch from '../libs/cFetch';
import { Toast } from 'antd-mobile';


export const getMyScatter = (status = 0, month = '') => {
    console.log(status, month);
    return {
        type: 'GET_MYSCATTER',
        async payload() {
            let res = await cFetch(`app/members/investments/projects?status=${status}&month=${month}`, {
                method: 'GET'
            }).catch(err => {
                Toast.fail(err.message, 2.5)
            });
            const { code, data } = res;
            if(code == 0) {
                return data.list || [];
            } 
            else {
                throw res;
            }
        }
    }
}