import {LOGINPASSWORD } from '../actions-type/auth';
import cFetch from './../libs/cFetch';
let URL ='http://172.16.1.234:9070';

export const login = (params) => {
  return {
    type: LOGINPASSWORD,
    async payload:function(){
        let res=cFetch
    } 
  };
};
