import { DISCOVER } from '../actions-type/discover';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';
import cookie from 'js-cookie';

export const discover = (ajaxData) => {
  ajaxData= parseJson2URL(ajaxData)
  return {
    type: DISCOVER,
    async payload(){
        let res= await cFetch(`app/discovery/adverts?${ajaxData}`, {           
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        },false);
        if ( res.code == 0 ) {
          return res.data || [];
        } else {
          throw res;
        }
    } 
  };
};