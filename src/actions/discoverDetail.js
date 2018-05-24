import { DISCOVERDETAIL } from '../actions-type/discover';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';


export const discoverDeail = (id) => {
  return {
    type: DISCOVERDETAIL,
    async payload(){
        let res= await cFetch(`discovery/afficheInfo/${id}`, {           
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if ( res.code == 0 ) {
            console.log(res.data)
          return res.data || {};
        } else {
          throw res;
        }

    } 
  };
};