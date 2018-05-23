import cFetch from '../libs/cFetch';
let urls='http://172.16.7.3:9070/';
import parseJson2URL from './../libs/parseJson2URL';


export const  getrewardsList = (params) => {
    console.log('aaa222111444442')
    params = parseJson2URL(params)
    return {
      type: 'rewards/GET_REWARDS_LIST',
      async payload() {
        const res = await cFetch(`${urls}members/memberRedEnvelopes/list?${params}` , { method: 'GET' },true);
        const { code, data } = res;
        if ( code == 0 ) {
            console.log(data)
            let mod = [
                {
                    "id": "1",
                    "reTypeName": "现金红包",
                    "reAmount": 100,
                    "useLimit": 1,
                    "productCategory": 0,
                    "productCategoryName": "所有产品",
                    "useMinAmount": 1000,
                    "isStacking": 1,
                    "reStatus": 0,
                    "reStatusName": "未激活"
                  },
                  {
                    "id": "10",
                    "reTypeName": "现金红包",
                    "reAmount": 100,
                    "useLimit": 1,
                    "productCategory": 3,
                    "productCategoryName": "3个月定期产品",
                    "useMinAmount": 1000,
                    "isStacking": 1,
                    "reStatus": 1,
                    "beginTime": "2018-01-16 11:27:33",
                    "endTime": "2018-06-06 14:44:04",
                    "reStatusName": "未使用"
                  },
                  {
                    "id": "11",
                    "reTypeName": "现金红包",
                    "reAmount": 100,
                    "useLimit": 1,
                    "productCategory": 3,
                    "productCategoryName": "3个月定期产品",
                    "useMinAmount": 1000,
                    "isStacking": 1,
                    "reStatus": 2,
                    "beginTime": "2018-01-16 11:27:33",
                    "endTime": "2018-06-06 14:44:04",
                    "reStatusName": "已使用"
                  },
                  {
                    "id": "12",
                    "reTypeName": "现金红包",
                    "reAmount": 100,
                    "useLimit": 1,
                    "productCategory": 0,
                    "productCategoryName": "所有产品",
                    "useMinAmount": 1000,
                    "isStacking": 1,
                    "reStatus": 3,
                    "beginTime": "2018-01-16 11:27:33",
                    "endTime": "2018-06-06 14:44:04",
                    "reStatusName": "已过期"
                  },
                  {
                    beginTime:"2018-01-16 11:27:33",
                    endTime:"2018-06-06 14:49:23",
                    id:"10",
                    isStacking:1,
                    productCategory:0,
                    productCategoryName:"所有产品",
                    rcAmount:100,
                    rcLength:2,
                    rcStatus:2,
                    rcStatusName:"已使用",
                    useLimit:1,
                    useMinAmount:1000
                  }
            ]
          return mod || {};
        } else {
          throw res;
        }
      }
    }
  }

  export const setRewards = cd => {
    console.log(cd)
    return {
      type: 'rewards/SET_REWARDS',
      payload: cd,
    }
  }
