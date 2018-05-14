import { LOGIN, LOGOUT,LOGINCODE } from '../actions-type/auth';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';
import cookie from 'js-cookie';
let URL_JIALIN ='http://172.16.1.234:8020/';

export const loginUser = (params) => {
  return {
    type: LOGIN,
    // async/await配合promise处理异步
    async payload() {
      const token = await cFetch(URL_JIALIN + 'uaa/login', {
        method: 'POST',
        headers:new Headers({
          'Content-Type': 'application/json'
        }),
        body:JSON.stringify(params), 
        credentials: 'include' }, false);
      const { token_type, access_token } = token;
      
      const res = await cFetch(URL_JIALIN + 'uaa/oauth/member/info', { headers: { 'Authorization': `${token_type} ${access_token}` } });
      const { code, data } = res;
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

export const authCode = () => {
  return {
    type: LOGINCODE,
    async payload(){
        let res= await cFetch(`${URL_JIALIN}/uaa/code/image/string`, {           
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