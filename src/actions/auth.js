import { LOGIN, LOGOUT,LOGINCODE,SMSLOGINCODE } from '../actions-type/auth';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';
import cookie from 'js-cookie';
let URL ='http://172.16.7.3:8020';
let URL_JIA ='http://172.16.7.3:8020';

export const loginUser = (params) => {
  return {
    type: LOGIN,
    // async/await配合promise处理异步
    async payload() {
      const token = await cFetch(URL+ '/uaa/login'+params, {
        method: 'POST',
        headers:new Headers({
          'Content-Type': 'application/json'
        }),
        body:params, 
        credentials: 'include' }, false);
      const { token_type, access_token } = token;
      console.log(token)
      const res = await cFetch(URL + '/uaa/oauth/member/info', { headers: { 'Authorization': `${token_type} ${access_token}` } });
      const { code, data } = res;
      console.log(res)
      if ( code == 0 ) {
        const { ...user } = data || {};
        cookie.set('token', token);
        cookie.set('user', user);
        return user;
      } else {
        throw res;
      }
    }
  };
};

export const logoutUser = () => {
	return {
		type: LOGOUT,
	}
}
//获取登陆图形验证码
export const authCode = () => {
  return {
    type: LOGINCODE,
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

export const smsCode = (params) => {
  params=parseJson2URL(params)
  return {
    type: SMSLOGINCODE,
    async payload(){
        let res= await cFetch(`${URL}/uaa/code/sms/login?${params}`, {           
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