import cFetch from '../libs/cFetch';


export const getMyScatter = (status = 0, month = '') => {
    console.log(status, month);
    return {
        type: 'GET_MYSCATTER',
        async payload() {
            let res = await cFetch(`app/members/investments/projects?status=${status}&month=${month}`, {
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