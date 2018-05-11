import cFetch from '../libs/cFetch';

let urls='http://172.16.7.3:9070'

export const  getAdverts = () => {
    console.log('aaa11111')
    return {
      type: 'homePage/GET_ADVERTS',
      async payload() {
        const res = await cFetch(`${urls}/homes/adverts` , { method: 'GET' },false);
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