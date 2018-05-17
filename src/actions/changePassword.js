import { CHANGEPASSWORD } from '../actions-type/auth';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';
let URL ='http://172.16.7.3:8020';

export const changePassword = (params) => {
  params=parseJson2URL(params);
  console.log(params);
  return {
      type: 'mySettings/password/FETCH',
      async payload() {
          const res = await cFetch(`${URL}/uaa/oauth/password?${params}`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: ``,
              },
              true);
          let type=``;
          (res.code == 0)?type='success':type='error';
          console.log('修改密码返回的结果');
          console.log(res);
          return {
              postResult: {
                  code:res.code,
                  type:type,
                  message:res.message||``,
                  description:res.data||``,
              }
          };
      }
  }
};