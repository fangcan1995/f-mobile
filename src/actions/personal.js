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
        // let mock = {
        //   isCertification: "1", //是否实名认证（0：未实名；1：已实名）
        //   openAccountStatus: "1", //是否开户（0：未开户；1：已开户）
        //   riskStatus : "0", //是否风险测评（0：否；1：是）
        //   isSetTradepassword: "1", //是否设置交易密码（0：未设置；1：已设置）
        //   isNovice: "1", //是否新手（0：否；1：是）
        //   treeName: "张三", //真实姓名
        //   idNumber: "", //身份证号
        //   photo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526468590341&di=6308210c13a5ed555004c0937b540e17&imgtype=0&src=http%3A%2F%2Fa3.topitme.com%2F3%2Ffd%2Fa0%2F11280468511bba0fd3l.jpg", //头像
        //   riskLevel: "1", //风险测评等级
        //   surplusAmount: 1000000, //剩余投资限额
        //   availableBalance: 100, //账户可用余额
        //   bankName: "", //开户行
        //   bankNo: "", //银行卡号
        //   memberRedInfo: { number: 1, amountSum: 1000 }, //红包信息
        //   memberCoupon: { number: 1, amountSum: 0 } //加息券信息
        // };
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

