import { REGISTER,REGISTERCODE,SMSREGISTERCODE } from '../actions-type/auth';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';
import cookie from 'js-cookie';
let URL ='http://172.16.7.3:8020';
let access_token='?access_token=fadf442a-e08b-4dd1-9928-e756fc313719'


export const register = (ajaxData) => {
  ajaxData= parseJson2URL(ajaxData);
  console.log(ajaxData)
  return {
    type: REGISTER,
    async payload(){
        let res= await cFetch(`${URL}/discovery/adverts?${ajaxData}`, {           
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
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

//获取注册图形验证码
export const registerCode = () => {
  return {
    type: REGISTERCODE,
    async payload(){
        let res= await cFetch(`${URL}/uaa/code/image/string`, {           
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
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

export const smsRegisterCode = (params) => {
  params=parseJson2URL(params)
  return {
    type: SMSREGISTERCODE,
    async payload(){
        let res= await cFetch(`${URL}/uaa/code/sms/register?${params}`, {           
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
            
        },false);
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