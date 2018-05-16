import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';
import { REGISTER,REGISTERCODE,SMSREGISTERCODE } from '../actions-type/auth';

const initialState = fromJS({
    isFetching: false,
    registerInfo:{},
    registerCode:{},
    smsRegisterCode:{},
    
});

export default createReducer(initialState, {

  //注册
  [`${REGISTER}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${REGISTER}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    registerInfo: action.payload
  }),
  [`${REGISTER}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  //图形验证码
  [`${REGISTERCODE}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${REGISTERCODE}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    registerCode: action.payload
  }),
  [`${REGISTERCODE}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  //获取短信验证吗
  [`${SMSREGISTERCODE}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${SMSREGISTERCODE}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    smsRegisterCode: action.payload
  }),
  [`${SMSREGISTERCODE}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})
