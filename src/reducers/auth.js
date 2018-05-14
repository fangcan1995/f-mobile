import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';
import { LOGIN, LOGOUT,LOGINCODE } from '../actions-type/auth';

const initialState = fromJS({
	isFetching: false,
	isAuthenticated: !!cookie.get('token'),
  userInfo: cookie.getJSON('userInfo') || {},
  loginCode:{}
});

export default createReducer(initialState, {

  //登陆
  [`${LOGIN}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
    isAuthenticated: false,
  }),
  [`${LOGIN}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: true,
    userInfo: action.payload
  }),
  [`${LOGIN}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: false,
    errorMessage: action.message
  }),


 //登出
  [`${LOGOUT}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
    // isAuthenticated: true,
  }),
  [`${LOGOUT}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: false,
  }),

  [`${LOGOUT}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    // isAuthenticated: true,
    errorMessage: action.message
  }),


  //获取图形验证码
  [`${LOGINCODE}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${LOGINCODE}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    loginCode:action.payload,
  }),

  [`${LOGINCODE}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})
