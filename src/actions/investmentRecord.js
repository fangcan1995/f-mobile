import cFetch from '../libs/cFetch';
import parseJson2URL from './../libs/parseJson2URL';
let urls='http://172.16.7.3:9070/'

  export const  getInvestRecords = (params) => {
    console.log('a3555555')
    params = parseJson2URL(params) 
    return {
      type: 'invest/GET_INVEST_RECORDS',
      async payload() {
        const res = await cFetch(`${urls}invest/projects/record?${params}` , { method: 'GET' },false);
        const { code, data } = res;
        if ( code == 0 ) {
            console.log(data)
          return data.list || {};
        } else {
          throw res;
        }
      }
    }
  }