import cFetch from '../libs/cFetch';

export const getRepayPlan = (proId) => {
    let url = `http://172.16.1.221:9070/members/investments/receiving/${proId}?access_token=a0c68d76-6d7b-47e2-90ef-5129eef0b6a8`;
    //let url = `http://172.16.1.221:9070/members/investments/receiving/025eb854-efdc-4752-b105-0a5da1991600?access_token=5ba2cd28-37de-4d7c-9c57-230ffb2d2629`;
    return {
        type: 'GET_REPAYPLAN',
        async payload() {
            let res = await cFetch(url, {
                method: 'GET'
            });
            const { code, data } = res;
            if (code == 0) {
                return data;
            } else {
                throw res;
            }
        }
    }
}