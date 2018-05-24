import cFetch from '../libs/cFetch';

let urls='http://172.16.7.3:9070/'
// let token = 'fadf442a-e08b-4dd1-9928-e756fc313719'
export const  getAdverts = () => {
    console.log('aaa11111')
    return {
      type: 'homePage/GET_ADVERTS',
      async payload() {
        const res = await cFetch(`app/homes/adverts` , { method: 'GET' },false);
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

  export const  getProject = () => {
    console.log('aaa2222')
    return {
      type: 'homePage/GET_PROJECT',
      async payload() {
        const res = await cFetch(`app/homes/projects` , { method: 'GET' },false);
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