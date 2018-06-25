import cFetch from '../libs/cFetch';
let urls='http://172.16.7.3:9070/'
import { Toast } from 'antd-mobile';

export const  getDetails = (params) => {
    return {
      type: 'detail/GET_DETAILS',
      async payload() {
        const res = await cFetch(`app/invest/projects/loan/${params}` , { method: 'GET' },false);
        const { code, data } = res;
        if ( code == 0 ) {
            // data.surplusAmount=500
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }
  // 获取个人信息
  export const  getMyInfo = (params) => {
    return {
      type: 'detail/GET_MY_INFO',
      async payload() {
        const res = await cFetch(`app/accounts/my/info` , { method: 'GET' },true);
        const { code, data } = res;
        if ( code == 0 ) {
            //'http://172.16.1.221:9070/'
            // let mok = {             
            //     accountBalance:0,
            //     availableBalance:10000,
            //     customServicePhone
            //     :
            //     "400-024-0909",
            //     freezingAmount
            //     :
            //     0,
            //     investAmount
            //     :
            //     0,
            //     memberCoupon
            //     :
            //     {number: 0, rateSum: 0},
            //     memberIdentity
            //     :
            //     1,
            //     memberIdentityString
            //     :
            //     "超级合伙人",
            //     memberRedInfo
            //     :
            //     {number: 0, amountSum: 0},
            //     noviceStatus
            //     :
            //     1,
            //     openAccountStatus
            //     :
            //     0,
            //     riskStatus
            //     :
            //     "1",
            //     userName
            //     :
            //     "15666666666"
            //                 }
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }
  // 设置投资金额
  export const setMoney = cd => {
    return {
      type: 'detail/SET_MONEY',
      payload: cd,
    }
  }

// 保存投资预期利润
export const setProfit = cd => {
  return {
    type: 'detail/SET_PROFIT',
    payload: cd,
  }
}
  //提交投资

  export const postInvest = (params,times) => {
    return {
      type: 'detail/POST_INVEST',
      async payload(){
          return await cFetch(`invest/invest`, {           
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json'
              },
              body:JSON.stringify(params),
          },true).then(res=>{
            //'http://172.16.1.228:9090/'
             if ( res.code == 0 ) {
                  Toast.success(res.message,1)
                return res || {};
              } else {
                throw res;
              }
          })
          .catch(err=>{
            err.msg=101;
            let type=``;
            console.log('返回第'+(times+1)+'次请求的结果');
            if((times+1)===5){
              err.msg=102;
              Toast.fail(err.message,1)
            }
            // Toast.loading(err.message,1)
            return {
                code:err.code,
                type:type,
                message:err.message||``,
                userCode:err.msg,
                times:times+1
            }
          });
          
      } 
    };
  };
