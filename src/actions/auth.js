import { LOGIN, LOGOUT,LOGINCODE,SMSLOGINCODE } from '../actions-type/auth';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';
import cookie from 'js-cookie';
let URL ='http://172.16.7.3:8020';
//let URL ='http://172.16.1.234:8020';

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
//退出登陆
export const logoutUser = () => {
  
	return {
		type: LOGOUT,
    async payload() {
      const token = cookie.getJSON('token') || {};
      const { access_token } = token;
      const params = `${URL}/uaa/oauth/logout?${parseJson2URL({ access_token })}`;
      const res = await cFetch('' + params, { method: 'POST', body: params });
      const { code, message: msg } = res;
      if ( code == 0 ) {
        cookie.remove('token');
        cookie.remove('user');
        return msg;
      } else {
        throw res;
      }
    }
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

export const smsCode = (params) => {
  params=parseJson2URL(params)
  return {
    type: SMSLOGINCODE,
    async payload(){
        let res= await cFetch(`${URL}/uaa/code/sms/login?${params}`, {           
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