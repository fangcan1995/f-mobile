import { PERSONAL,CERTIFICATION,RISKEVALUATION,SYNCRISKEVALUATION,SUBMITRISKEVALUATION,RISKEVALUATIONRESULT,FUIOUDATA } from "../actions-type/personal";
import cFetch from "./../libs/cFetch";
import { urls, token } from "../libs/utils";
import parseJson2URL from "./../libs/parseJson2URL";
import cookie from "js-cookie";

//获取个人中心数据
export const personal = () => {

  return {
    type: PERSONAL,
    async payload() {
      let res = await cFetch(`app/accounts/my/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (res.code == 0) {
        return res.data || {};
      } else {
        throw res;
      }
    }
  };
};

//实名验证

export const certification = (params) => {
  return {
    type: CERTIFICATION,
    async payload(){
        let res= await cFetch(`app/members/auth`, {           
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(params),
            // credentials: 'include' 
        });
        if ( res.code == 0 ) {
          return res || {};
        } else {
          throw res;
        }
    } 
  };
};

//获取风险评估问题
export const riskEvaluation = () => {
  return {
    type: RISKEVALUATION,
    async payload(){
        let res= await cFetch(`app/members/riskEvaluation`, {           
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },

            // credentials: 'include' 
        });
        if ( res.code == 0 ) {
          return res || {};
        } else {
          throw res;
        }
    } 
  };
};

//修改评估问题
export const syncRiskEvaluation = (params) => {
  return {
    type: SYNCRISKEVALUATION,
    payload() {
        return params
    }
  };
};

//提交风险测评结果
export const submitCertification = (params) => {
  return {
    type: SUBMITRISKEVALUATION,
    async payload(){
        let res= await cFetch(`app/members/riskEvaluation`, {           
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(params),
        });
        if ( res.code == 0 ) {
          return res || {};
        } else {
          throw res;
        }
    } 
  };
};

//获取风险评估结果
export const riskEvaluationResult = () => {
  return {
    type: RISKEVALUATIONRESULT,
    async payload(){
        let res= await cFetch(`app/members/riskEvaluation/result`, {           
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },

            // credentials: 'include' 
        });
        if ( res.code == 0 ) {
          return res.data || {};
        } else {
          throw res;
        }
    } 
  };
};

//获取前往富有接口的数据

export const getFuiou = (type) => {
  return {
    type: FUIOUDATA,
    async payload(){
        let res= await cFetch(`app/payment/fuiou/account?appType=${type}`, {           
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },

            // credentials: 'include' 
        });
        if ( res.code == 0 ) {
          return res || {};
        } else {
          throw res;
        }
    } 
  };
};

