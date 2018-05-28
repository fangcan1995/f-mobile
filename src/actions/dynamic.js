import { DYNAMIC } from '../actions-type/discover';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';

export const dynamic = (id,ajaxData) => {
    ajaxData=parseJson2URL(ajaxData)
    return {
      type: DYNAMIC,
      async payload(){
          let res= await cFetch(`app/discovery/affiches/${id}?${ajaxData}`, {           
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

  export const clearData=()=>{
    return {
      type: DYNAMIC,
      payload() {
          return {
            list:''
          }
      }
    };
  }
