import { PERSONAL } from "../actions-type/personal";
import cFetch from "./../libs/cFetch";
import { urls, token } from "../libs/utils";
import parseJson2URL from "./../libs/parseJson2URL";
import cookie from "js-cookie";
let URL = "http://172.16.7.3:9070";

export const personal = ajaxData => {
  ajaxData = parseJson2URL(ajaxData);
  console.log(ajaxData);
  return {
    type: PERSONAL,
    async payload() {
      let res = await cFetch(`${URL}/discovery/adverts?${ajaxData}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (res.code == 0) {
        console.log(res.data);
        let mock = {
          isCertification: "1", //是否实名认证（0：未实名；1：已实名）
          isOpenAccount: "1", //是否开户（0：未开户；1：已开户）
          isRisk: "0", //是否风险测评（0：否；1：是）
          isSetTradepassword: "1", //是否设置交易密码（0：未设置；1：已设置）
          isNovice: "1", //是否新手（0：否；1：是）
          treeName: "张三", //真实姓名
          idNumber: "", //身份证号
          photo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526468590341&di=6308210c13a5ed555004c0937b540e17&imgtype=0&src=http%3A%2F%2Fa3.topitme.com%2F3%2Ffd%2Fa0%2F11280468511bba0fd3l.jpg", //头像
          riskLevel: "", //风险测评等级
          surplusAmount: 1000000, //剩余投资限额
          availableBalance: 100, //账户可用余额
          bankName: "", //开户行
          bankNo: "", //银行卡号
          memberRedInfo: { number: 1, amountSum: 1000 }, //红包信息
          memberCoupon: { number: 1, amountSum: 0 } //加息券信息
        };
        return mock || {};
      } else {
        throw res;
      }
    }
  };
};
