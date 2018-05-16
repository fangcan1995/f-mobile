import { RETRIEVEPSD,RETRIEVEPSDCODE,SMSRETRIEVEPSDCODE } from '../actions-type/auth';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';
import cookie from 'js-cookie';
let URL ='http://172.16.7.3:8020';
let access_token='?access_token=fadf442a-e08b-4dd1-9928-e756fc313719'


export const retrievePassword = (params) => {
  return {
    type: RETRIEVEPSD,
    async payload(){
        let res= await cFetch(`${URL}/uaa/oauth/forget/password?${params}`, {           
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body:params,
            credentials: 'include' 
        });
        if ( res.code == 0 ) {
            console.log(res.data)
          return res.data || [];
        } else {
          throw res;
        }

    } 
  };
};

//获取修改密码图形验证码
export const retrievePasswordCode = () => {
    return {
        type: RETRIEVEPSDCODE,
        async payload(){
            let res= await cFetch(`${URL}/uaa/code/image/string`, {           
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            console.log(res)
            if(res.imageCode){
                console.log(res)
                return res || {};
            }else{
                throw res;
            }
        } 
    };
};

//获取短信验证码

export const smsRetrievePasswordCode = (params) => {
    params=parseJson2URL(params)
    return {
      type: SMSRETRIEVEPSDCODE,
      async payload(){
          let res= await cFetch(`${URL}/uaa/code/sms/forget/password?${params}`, {           
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