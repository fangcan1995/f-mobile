import cFetch from '../libs/cFetch';
let urls='http://172.16.1.221:9070/';
import parseJson2URL from './../libs/parseJson2URL';


export const  getrewardsList = (params) => {
    params = parseJson2URL(params)
    return {
      type: 'rewards/GET_REWARDS_LIST',
      async payload() {
        const res = await cFetch(`app/members/memberRewards/list?${params}` , { method: 'GET' },true);
        //'http://172.16.1.221:9070/'
        const { code, data } = res;
        if ( code == 0 ) {
            // let mod = [
            //     {
            //         "id": "1",
            //         "reTypeName": "现金红包",
            //         "reAmount": 100,
            //         "useLimit": 1,
            //         "productCategory": 0,
            //         "productCategoryName": "所有产品",
            //         "useMinAmount": 1000,
            //         "isStacking": 1,
            //         "reStatus": 0,
            //         "reStatusName": "未激活"
            //       },
            //       {
            //         "id": "10",
            //         "reTypeName": "现金红包",
            //         "reAmount": 100,
            //         "useLimit": 1,
            //         "productCategory": 3,
            //         "productCategoryName": "3个月定期产品",
            //         "useMinAmount": 1000,
            //         "isStacking": 1,
            //         "reStatus": 1,
            //         "beginTime": "2018-01-16 11:27:33",
            //         "endTime": "2018-06-06 14:44:04",
            //         "reStatusName": "未使用"
            //       },
            //       {
            //         "id": "11",
            //         "reTypeName": "现金红包",
            //         "reAmount": 100,
            //         "useLimit": 1,
            //         "productCategory": 3,
            //         "productCategoryName": "3个月定期产品",
            //         "useMinAmount": 1000,
            //         "isStacking": 1,
            //         "reStatus": 2,
            //         "beginTime": "2018-01-16 11:27:33",
            //         "endTime": "2018-06-06 14:44:04",
            //         "reStatusName": "已使用"
            //       },
            //       {
            //         "id": "12",
            //         "reTypeName": "现金红包",
            //         "reAmount": 100,
            //         "useLimit": 1,
            //         "productCategory": 0,
            //         "productCategoryName": "所有产品",
            //         "useMinAmount": 1000,
            //         "isStacking": 1,
            //         "reStatus": 3,
            //         "beginTime": "2018-01-16 11:27:33",
            //         "endTime": "2018-06-06 14:44:04",
            //         "reStatusName": "已过期"
            //       },
            //       {
            //         beginTime:"2018-01-16 11:27:33",
            //         endTime:"2018-06-06 14:49:23",
            //         id:"10",
            //         isStacking:1,
            //         productCategory:0,
            //         productCategoryName:"所有产品",
            //         rcAmount:100,
            //         rcLength:2,
            //         rcStatus:2,
            //         rcStatusName:"已使用",
            //         useLimit:1,
            //         useMinAmount:1000
            //       }
            // ]
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }

  export const setRewards = cd => {
    return {
      type: 'rewards/SET_REWARDS',
      payload: cd,
    }
  }

  export const setRedEnvelopeId = cd => {
    return {
      type: 'rewards/SET_RED_ID',
      payload: cd,
    }
  }

  export const setRateCouponId = cd => {
    return {
      type: 'rewards/SET_RATE_ID',
      payload: cd,
    }
  }
