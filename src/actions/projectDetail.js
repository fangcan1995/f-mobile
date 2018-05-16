import cFetch from '../libs/cFetch';
//import parseJson2URL from './../libs/parseJson2URL';

  export const  getProjectInfo = (params) => {
    console.log('a3444444')
    // params = parseJson2URL(params) 
    return {
      type: 'project/GET_PROJECT_INFO',
      async payload() {
        const res = await cFetch(`invest/projects/info/${params}` , { method: 'GET' },false);
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