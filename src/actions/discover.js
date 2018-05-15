import { DISCOVER } from '../actions-type/discover';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';
import cookie from 'js-cookie';
let URL ='http://172.16.7.3:9070';
let access_token='?access_token=fadf442a-e08b-4dd1-9928-e756fc313719'


export const discover = (ajaxData) => {
  ajaxData= parseJson2URL(ajaxData)
  console.log(ajaxData)
  return {
    type: DISCOVER,
    async payload(){
        let res= await cFetch(`${URL}/discovery/adverts?${ajaxData}`, {           
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