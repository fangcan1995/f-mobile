import cFetch from '../libs/cFetch';

export const getRepayPlan = (proId) => {
    return {
        type: 'GET_REPAYPLAN',
        async payload() {
            let res = await cFetch(`app/members/investments/receiving/${proId}`, {
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