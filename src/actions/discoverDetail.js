import { DISCOVERDETAIL } from '../actions-type/discover';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';


export const discoverDeail = (id) => {
  return {
    type: DISCOVERDETAIL,
    async payload(){
        let res= await cFetch(`app/discovery/afficheInfo/${id}`, {           
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        },false);
        if ( res.code == 0 ) {
          return res.data || {};
        } else {
          throw res;
        }

    } 
  };
};