import cFetch from '../libs/cFetch';

export const getRepayList = () => {
    let url = 'http://172.16.7.3:9070/members/investments/receiving/025eb854-efdc-4752-b105-0a5da1991600?access_token=45f6c3b7-4fae-4b25-94d6-3d247c1d8362';
    return {
        type: 'GET_REPAYLIST',
        async payload() {
            let res = await cFetch(url, {
                method: 'GET'
            });
            const { code, data } = res;
            console.log(data);
            if (code == 0) {
                return data;
            } else {
                throw res;
            }
        }
    }
}

export const getRepayTotal = () => {
    return {
        type: 'GET_REPAYTOTAL',
        async payload() {
            let res = await cFetch(url, {
                method: 'GET'
            });
            const { code, data } = res;
            console.log(data);
            if (code == 0) {
                return data;
            } else {
                throw res;
            }
        }
    }
}