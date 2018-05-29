import { REGISTER,REGISTERCODE,SMSREGISTERCODE } from '../actions-type/auth';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';
import cookie from 'js-cookie';

export const register = (params) => {
  return {
    type: REGISTER,
    async payload(){
        let res= await cFetch(`uaa/register${params}`, {           
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body:params,
            credentials: 'include' 
        },false);
        if ( res.code == 0 ) {
          return res.data || [];
        } else {
          throw res;
        }
    } 
  };
};

//获取注册图形验证码
export const registerCode = () => {
    return {
        type: REGISTERCODE,
        async payload(){
            let res= await cFetch(`uaa/code/image/string`, {           
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if(res.imageCode){
                return res || {};
            }else{
                throw res;
            }
    
        } 
      };
};

//获取短信验证码

export const smsRegisterCode = (params) => {
    params=parseJson2URL(params)
    return {
      type: SMSREGISTERCODE,
      async payload(){
          let res= await cFetch(`uaa/code/sms/register?${params}`, {           
              credentials: 'include'
          },false);
          const { code, data } = res;
          if(code==0){
            return data || {};
          }else{
              throw res;
          }
  
      } 
    };
};