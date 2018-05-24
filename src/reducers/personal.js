import { createReducer } from "redux-immutablejs";
import { fromJS } from "immutable";
import cookie from "js-cookie";
import {
  PERSONAL,
  CERTIFICATION,
  RISKEVALUATION,
  SYNCRISKEVALUATION,
  SUBMITRISKEVALUATION,
  RISKEVALUATIONRESULT,
  FUIOUDATA
} from "../actions-type/personal";

const initialState = fromJS({
  isFetching: false,
  personal: {},
  certification: {},
  riskEvaluation: {
    data: []
  },
  riskEvaluationResult: {},
  getRiskEvaluationResult:{
  },
  fuiouData:{
    data:{}
  }
});

export default createReducer(initialState, {
  //获取发现首页数据
  [`${PERSONAL}_PENDING`]: (state, action) =>
    state.merge({
      isFetching: true
    }),
  [`${PERSONAL}_FULFILLED`]: (state, action) =>
    state.merge({
      isFetching: false,
      personal: action.payload
    }),

  [`${PERSONAL}_REJECTED`]: (state, action) =>
    state.merge({
      isFetching: false,
      errorMessage: action.message
    }),

  //实名认证
  [`${CERTIFICATION}_PENDING`]: (state, action) =>
    state.merge({
      isFetching: true
    }),
  [`${CERTIFICATION}_FULFILLED`]: (state, action) =>
    state.merge({
      isFetching: false,
      certification: action.payload
    }),

  [`${CERTIFICATION}_REJECTED`]: (state, action) =>
    state.merge({
      isFetching: false,
      errorMessage: action.message
    }),

  //获取风险评估数据
  [`${RISKEVALUATION}_PENDING`]: (state, action) =>
    state.merge({
      isFetching: true
    }),
  [`${RISKEVALUATION}_FULFILLED`]: (state, action) =>
    state.merge({
      isFetching: false,
      riskEvaluation: action.payload
    }),

  [`${RISKEVALUATION}_REJECTED`]: (state, action) =>
    state.merge({
      isFetching: false,
      errorMessage: action.message
    }),
  //修改风险评估数据
  [`${SYNCRISKEVALUATION}`]: (state, action) =>
    state.mergeDeep({
      riskEvaluation: action.payload
    }),

  //提交风险评估数据
  [`${SUBMITRISKEVALUATION}_PENDING`]: (state, action) =>
    state.merge({
      isFetching: true
    }),
  [`${SUBMITRISKEVALUATION}_FULFILLED`]: (state, action) =>
    state.merge({
      isFetching: false,
      riskEvaluationResult: action.payload
    }),

  [`${SUBMITRISKEVALUATION}_REJECTED`]: (state, action) =>
    state.merge({
      isFetching: false,
      errorMessage: action.message
    }),

  //获取风险评估数据
  [`${RISKEVALUATIONRESULT}_PENDING`]: (state, action) =>
    state.merge({
      isFetching: true
    }),
  [`${RISKEVALUATIONRESULT}_FULFILLED`]: (state, action) =>
    state.merge({
      isFetching: false,
      getRiskEvaluationResult: action.payload
    }),

  [`${RISKEVALUATIONRESULT}_REJECTED`]: (state, action) =>
    state.merge({
      isFetching: false,
      errorMessage: action.message
    }),

  //获取富有数据
  [`${FUIOUDATA}_PENDING`]: (state, action) =>
    state.merge({
      isFetching: true
    }),
  [`${FUIOUDATA}_FULFILLED`]: (state, action) =>
    state.merge({
      isFetching: false,
      fuiouData: action.payload
    }),

  [`${FUIOUDATA}_REJECTED`]: (state, action) =>
    state.merge({
      isFetching: false,
      errorMessage: action.message
    })  
});
