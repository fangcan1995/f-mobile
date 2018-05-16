import cFetch from '../libs/cFetch';



export const  getDetails = (params) => {
    console.log('aaa222111111')
    return {
      type: 'detail/GET_DETAILS',
      async payload() {
        const res = await cFetch(`/invest/projects/loan/${params}` , { method: 'GET' },false);
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