import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';

//修改交密码
export const setTradePassword = (params) => {
  params=parseJson2URL(params);
  return {
      type: 'trade/SET_PASSWORD',
      async payload() {
          const res = await cFetch(`uaa/oauth/trade/password?${params}`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: ``,
              },
              true);
          let type=``;
          (res.code == 0)?type='success':type='error';
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


//获取短信验证码

export const getTradePassCode = (params) => {
    params=parseJson2URL(params)
    return {
      type: 'trade/GET_TRADE_CODE',
      async payload(){
          let res= await cFetch(`uaa/code/sms/trade/password?${params}`, {           
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