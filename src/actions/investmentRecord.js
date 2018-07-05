import cFetch from '../libs/cFetch';
import parseJson2URL from './../libs/parseJson2URL';
let urls='http://172.16.7.3:9070/'
//散标的投资记录
  export const  getInvestRecords = (params) => {
    params = parseJson2URL(params) 
    return {
      type: 'invest/GET_INVEST_RECORDS',
      async payload() {
        const res = await cFetch(`app/invest/projects/record?${params}` , { method: 'GET' },false);
        const { code, data } = res;
        if ( code == 0 ) {
          return data.list || {};
        } else {
          throw res;
        }
      }
    }
  }
//债转标的投资记录
  export const  getTransferInvestRecords = (params) => {
    params = parseJson2URL(params) 
    return {
      type: 'invest/GET_INVEST_RECORDS',
      async payload() {
        const res = await cFetch(`app/invest/transfer/record?${params}` , { method: 'GET' },false);
        const { code, data } = res;
        if ( code == 0 ) {
          return data.list || {};
        } else {
          throw res;
        }
      }
    }
  }