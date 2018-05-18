import cFetch from '../libs/cFetch';


export const getMyTransfer = (status = 0, month = '') => {
    console.log(status, month);
    let url = `http://172.16.1.221:9070/members/investments/transfer?access_token=5ba2cd28-37de-4d7c-9c57-230ffb2d2629&status=${status}&month=${month}`;
    return {
        type: 'GET_MYTRANSFER',
        async payload() {
            let res = await cFetch(url, {
                method: 'GET'
            });
            const { code, data } = res;
            if(code == 0) {
                return data.list;
            }
            else {
                throw res;
            }
        }
    }
}