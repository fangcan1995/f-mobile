import cFetch from '../libs/cFetch';

// let token = 'fadf442a-e08b-4dd1-9928-e756fc313719'?access_token=${token}

export const  getsubjectList = (params) => {
    console.log('aaa222111111')
    return {
      type: 'subject/GET_LIST',
      async payload() {
        const res = await cFetch(`/invest/projects/loan/page` , { method: 'GET' },false);
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