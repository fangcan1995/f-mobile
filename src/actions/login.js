import {LOGINPASSWORD } from '../actions-type/auth';
import cFetch from './../libs/cFetch';
let URL ='http://172.16.1.234:9070';

export const login = (params) => {
  return {
    type: LOGINPASSWORD,
    async payload(){
        let res= await cFetch(`${urls}/uaa/login`, {           
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body:params
        });
        const { code,data }=res;
        if(code==0){
            console.log(data)
            return data || {};
        }else{
            throw res;
        }

    } 
  };
};
