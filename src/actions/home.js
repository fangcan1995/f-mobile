import cFetch from '../libs/cFetch';

let urls='http://172.16.7.3:9070/'
// let token = 'fadf442a-e08b-4dd1-9928-e756fc313719'
//获取轮播和随机广告
export const  getAdverts = () => {
    return {
      type: 'homePage/GET_ADVERTS',
      async payload() {
        const res = await cFetch(`app/homes/adverts` , { method: 'GET' },false);
        const { code, data } = res;
        if ( code == 0 ) {
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }
//首页的标的
  export const  getProject = () => {
    return {
      type: 'homePage/GET_PROJECT',
      async payload() {
        const res = await cFetch(`app/homes/projects` , { method: 'GET' },false);
        const { code, data } = res;
        if ( code == 0 ) {
          return data || {};
        } else {
          throw res;
        }
      }
    }
  }