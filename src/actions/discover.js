import { DISCOVER } from '../actions-type/discover';
import cFetch from './../libs/cFetch';
import {urls,token} from '../libs/utils';
import parseJson2URL from './../libs/parseJson2URL';
import cookie from 'js-cookie';
let URL ='http://172.16.7.4:8020/app';


export const discover = (ajaxData) => {
  return {
    type: DISCOVER,
    async payload(){
        let res= await cFetch(`${URL}/discovery/adverts`, {           
            method: 'GET', 
            body:JSON.stringify(ajaxData),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log(res)
        // if(res.imageCode){
        //     console.log(res)
        //     return res || {};
        // }else{
        //     throw res;
        // }

    } 
  };
};