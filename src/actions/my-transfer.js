import cFetch from '../libs/cFetch';


export const getMyTransfer = (status = 0, month = '') => {
    console.log(status, month);
    let url = `http://172.16.7.3:9070/members/investments/transfer?status=${status}&month=${month}`;
    return {
        type: 'GET_MYTRANSFER',
        async payload() {
            let res = await cFetch(url, {
                method: 'GET'
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