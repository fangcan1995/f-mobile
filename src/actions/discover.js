import { DISCOVER } from '../actions-type/discover';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';
import cookie from 'js-cookie';

export const discover = (ajaxData) => {
  ajaxData= parseJson2URL(ajaxData)
  console.log(ajaxData)
  return {
    type: DISCOVER,
    async payload(){
        let res= await cFetch(`discovery/adverts?${ajaxData}`, {           
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if ( res.code == 0 ) {
            console.log(res.data)
          return res.data || [];
        } else {
          throw res;
        }
    } 
  };
};