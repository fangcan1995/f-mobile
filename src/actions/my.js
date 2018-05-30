import cFetch from '../libs/cFetch';
import { Toast } from 'antd-mobile';


export const getMyInfo = () => {
    return {
        type: 'GET_MYINFO',
        async payload() {
            let res = await cFetch('app/accounts/my/info', {
                method: 'GET',
            }).catch(err => {
                Toast.fail(err.message, 2.5)
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
            }).catch(err => {
                Toast.fail(err.message, 2.5)
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

export const getMyAll = () => {
    return {
        type: 'GET_MYALL',
        async payload() {
            let myAll = Promise.all([getMyInfo().payload(), getMyCertification().payload()]);
            return myAll.then(res => {
                return res;
            }).catch(err => {
                Toast.fail(err.message, 2.5)
            });
        }
    }
}