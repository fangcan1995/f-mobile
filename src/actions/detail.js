import cFetch from '../libs/cFetch';
let urls='http://172.16.7.3:9070/'


export const  getDetails = (params) => {
    console.log('aaa222111111')
    return {
      type: 'detail/GET_DETAILS',
      async payload() {
        const res = await cFetch(`${urls}invest/projects/loan/${params}` , { method: 'GET' },false);
        const { code, data } = res;
        if ( code == 0 ) {
            console.log(data)
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }
  // 获取个人信息
  export const  getMyInfo = (params) => {
    console.log('aaa22211113333')
    return {
      type: 'detail/GET_MY_INFO',
      async payload() {
        const res = await cFetch(`${urls}accounts/my/info` , { method: 'GET' },true);
        const { code, data } = res;
        if ( code == 0 ) {
            console.log(data)
            let mok = {             
                accountBalance:0,
                availableBalance:10000,
                customServicePhone
                :
                "400-024-0909",
                freezingAmount
                :
                0,
                investAmount
                :
                0,
                memberCoupon
                :
                {number: 0, rateSum: 0},
                memberIdentity
                :
                1,
                memberIdentityString
                :
                "超级合伙人",
                memberRedInfo
                :
                {number: 0, amountSum: 0},
                noviceStatus
                :
                1,
                openAccountStatus
                :
                0,
                riskStatus
                :
                "1",
                userName
                :
                "15666666666"
                            }
          return mok || {};
        } else {
          throw res;
        }
      }
    }
  }
  // 设置投资金额
  export const setMoney = cd => {
    console.log(cd)
    return {
      type: 'detail/SET_MONEY',
      payload: cd,
    }
  }

// 保存投资预期利润
export const setProfit = cd => {
  console.log(cd)
  return {
    type: 'detail/SET_PROFIT',
    payload: cd,
  }
}
  //提交投资

  export const postInvest = (params) => {
    return {
      type: 'detail/POST_INVEST',
      async payload(){
          let res= await cFetch(`${urls}invest/invest`, {           
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json'
              },
              body:JSON.stringify(params),
          },true);
          if ( res.code == 0 ) {
              console.log(res.data)
            return res || {};
          } else {
            throw res;
          }
      } 
    };
  };
