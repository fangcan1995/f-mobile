import cFetch from '../libs/cFetch';
import { Toast } from 'antd-mobile';


export const getMyScatter = ({status, month, pageNum} = {status: 0, month: '', pageNum: 1}) => {
    return {
        type: 'GET_MYSCATTER',
        async payload() {
            let res = await cFetch(`app/members/investments/projects?status=${status}&month=${month}&pageNum=${pageNum}&sortBy=-createTime`, {
                method: 'GET'
            }).catch(err => {
                Toast.fail(err.message, 2.5)
            });
            const { code, data } = res;
            if(code == 0) {
                return {
                    pageNum: data.pageNum,
                    pages: data.pages,
                    list: data.list
                }
            } 
            else {
                throw res;
            }
        }
    }
}

export const getTransfer = (id) => {
    return {
        type: 'TRANSFER',
        async payload() {
            let res = await cFetch(`app/transfer/apply/info?investId=${id}`, {
                method: 'GET'
            }).catch(err => {
                Toast.fail(err.message, 2.5)
            });
            console.log(res)
            const { code, data } = res;
            if(code == 0) {
                return data || {};
            } 
            else {
                throw res;
            }
        }
    }
}

export const applyTransfer = (params) => {
    return {
        type: 'APPLYTRANSFER',
        async payload() {
            let res = await cFetch(`app/transfer/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(params),
            }).catch(err => {              
                Toast.fail(err.message, 2.5);
                return err;
            });
            const { code, data } = res;
            if(code == 0) {
                return data || {};
            } 
            else {
                throw res;
            }
        }
    }
}