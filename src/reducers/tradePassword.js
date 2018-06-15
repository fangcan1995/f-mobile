import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';

const initialState = fromJS({
	isFetching: false,
    tradePassword:{},
    trade_password_token:{},
    errorMessage:''
});

export default createReducer(initialState, {

  //设置交易密码
  [`trade/SET_PASSWORD_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`trade/SET_PASSWORD_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    tradePassword:action.payload,
  }),

  [`trade/SET_PASSWORD_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  //获取短信验证码
  [`trade/GET_TRADE_CODE_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`trade/GET_TRADE_CODE_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    trade_password_token:action.payload,
  }),

  [`trade/GET_TRADE_CODE_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})