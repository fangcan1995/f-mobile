import { RETRIEVEPSD,RETRIEVEPSDCODE,SMSRETRIEVEPSDCODE } from '../actions-type/auth';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';
import cookie from 'js-cookie';
let URL ='http://172.16.7.3:9070';
let access_token='?access_token=fadf442a-e08b-4dd1-9928-e756fc313719'


export const retrievePassword = (ajaxData) => {
  ajaxData= parseJson2URL(ajaxData);
  console.log(ajaxData)
  return {
    type: RETRIEVEPSD,
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

//获取登陆图形验证码
export const retrievePasswordCode = () => {
  return {
    type: RETRIEVEPSDCODE,
    async payload(){
        let res= await cFetch(`${URL_JIALIN}uaa/code/image/string`, {           
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

export const smsRetrievePasswordCode = (params) => {
  params=parseJson2URL(params)
  return {
    type: SMSRETRIEVEPSDCODE,
    async payload(){
        let res= await cFetch(`${URL_JIALIN}uaa/code/sms/login?${params}`, {           
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