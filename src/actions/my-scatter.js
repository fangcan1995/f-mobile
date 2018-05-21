import cFetch from '../libs/cFetch';


export const getMyScatter = (status = 0, month = '') => {
    console.log(status, month);
    let url = `http://172.16.1.221:9070/members/investments/projects?status=${status}&month=${month}`;
    return {
        type: 'GET_MYSCATTER',
        async payload() {
            let res = await cFetch(url, {
                method: 'GET'
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