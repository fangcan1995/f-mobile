import cFetch from '../libs/cFetch';
import parseJson2URL from './../libs/parseJson2URL';
let urls='http://172.16.7.3:9070/'

// let token = 'fadf442a-e08b-4dd1-9928-e756fc313719'?access_token=${token}
//散标列表
export const  getsubjectList = (params) => {
    params = parseJson2URL(params) 
    return {
      type: 'subject/GET_LIST',
      async payload() {
        let res = await cFetch(`app/invest/projects/loan/page?${params}`, { method: 'GET' },false);
        let { code, data } = res;
        data.istransfer='0';
        if ( code == 0 ) {
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }
  //债转列表
  export const  gettransferList = (params) => {
    params = parseJson2URL(params) 
    return {
      type: 'subject/GET_TRANSFER_LIST',
      async payload() {
        let res = await cFetch(`app/invest/transfer/loan/page?${params}` , { method: 'GET' },false);
        let { code, data } = res;
        data.istransfer='1';
        if ( code == 0 ) {
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }

  export const  getProjectInfo = (params) => {
    // params = parseJson2URL(params) 
    return {
      type: 'subject/GET_PROJECT_INFO',
      async payload() {
        const res = await cFetch(`app/invest/projects/info/${params}` , { method: 'GET' },false);
        const { code, data } = res;
        if ( code == 0 ) {
          return data.list || {};
        } else {
          throw res;
        }
      }
    }
  }