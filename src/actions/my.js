import cFetch from '../libs/cFetch';


export const getMyInfo = () => {
    return {
        type: 'GET_MYINFO',
        async payload() {
            let res = await cFetch('app/accounts/my/info', {
                method: 'GET',
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


export const getMyCertification = () => {
    return {
        type: 'GET_MYCERTIFICATION',
        async payload() {
            let res = await cFetch(`app/members/certification`, {
                method: 'GET'
            });
            const { code, data } = res;
            if(code == 0) {
                return data;
            }
            else {
                throw res;
            }
        }
    }
}