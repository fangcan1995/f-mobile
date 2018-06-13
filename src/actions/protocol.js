import { PROTOCOL } from '../actions-type/protocol';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';


export const protocol = (id) => {
  return {
    type: PROTOCOL,
    async payload(){
        let res= await cFetch(`app/information/subjects/${id}`, {           
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if ( res.code == 0 ) {
          return res.data || {};
        } else {
          throw res;
        }

    } 
  };
};